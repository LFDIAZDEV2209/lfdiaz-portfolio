"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import * as THREE from "three";
import { scrollState } from "@/app/lib/scrollState";

const PARTICLE_COUNT = 8000;
const SPRING_STIFFNESS = 0.08;

// Simpler vertex shader — only handles point rendering, colors & alpha.
// All position displacement is now done on the CPU in useFrame.
const vertexShader = `
  attribute vec3 aColor;
  attribute float aSize;
  varying vec3 vColor;
  varying float vAlpha;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vColor = aColor;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projPosition = projectionMatrix * viewPosition;
    gl_Position = projPosition;

    // Pulsing alpha based on particle Y to add depth
    float pulse = 0.7 + 0.3 * sin(position.y * 1.5 + uTime * 0.4);
    vAlpha = pulse;

    // Size attenuation
    gl_PointSize = aSize * uPixelRatio * (2.5 / -viewPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 20.0);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  uniform float uTime;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist);
    float glow = exp(-dist * 6.0) * 0.6;

    float pulse = 0.8 + 0.2 * sin(uTime * 0.5 + dist * 10.0);

    vec3 color = vColor * pulse;
    float finalAlpha = (alpha + glow * 0.5) * vAlpha;

    gl_FragColor = vec4(color, finalAlpha);
  }
`;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const cursorRef = useRef({ x: 0, y: 0 });
  const targetCursorRef = useRef({ x: 0, y: 0 });
  const timerRef = useRef(new THREE.Timer());

  const { size, viewport } = useThree();

  // ── 1. Sample anchor positions + colors + sizes (once) ───────────
  const anchorRef = useRef<Float32Array | null>(null);

  const { colors, sizes, anchorPositions } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);

    const geo = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32);
    const mat = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.updateWorldMatrix(true, false);

    const sampler = new MeshSurfaceSampler(mesh).build();
    const v3 = new THREE.Vector3();

    const palette = [
      new THREE.Color("#00f0ff"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#06b6d4"),
    ];

    let seed = 42;
    const rng = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sampler.sample(v3);
      const i3 = i * 3;
      pos[i3] = v3.x;
      pos[i3 + 1] = v3.y;
      pos[i3 + 2] = v3.z;

      const c = palette[Math.floor(rng() * palette.length)];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;

      siz[i] = rng() * 4 + 1.5;
    }

    geo.dispose();
    mat.dispose();

    return { colors: col, sizes: siz, anchorPositions: pos };
  }, []);

  // Store anchor positions in a ref for fast access in useFrame
  useEffect(() => {
    anchorRef.current = anchorPositions;
  }, [anchorPositions]);

  // ── 2. Uniforms (only time & pixel ratio; scroll/cursor are CPU) ──
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(size.width / viewport.width, 2) },
    }),
    [size.width, viewport.width]
  );

  // ── 3. Cursor tracking ───────────────────────────────────────────
  const handlePointerMove = useCallback((e: PointerEvent) => {
    targetCursorRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  // ── 4. CPU position recalculation every frame ────────────────────
  useFrame((_, delta) => {
    if (!pointsRef.current || !materialRef.current || !geometryRef.current) return;

    const posAttr = geometryRef.current.attributes.position;
    const positionArray = posAttr.array as Float32Array;
    const anchors = anchorRef.current;
    if (!anchors) return;

    // Use THREE.Timer instead of deprecated THREE.Clock
    timerRef.current.update();
    const time = timerRef.current.getElapsed() * 0.5;

    const clampedDelta = Math.min(delta * 60, 1);

    // Spring cursor
    cursorRef.current.x +=
      (targetCursorRef.current.x - cursorRef.current.x) *
      SPRING_STIFFNESS *
      clampedDelta;
    cursorRef.current.y +=
      (targetCursorRef.current.y - cursorRef.current.y) *
      SPRING_STIFFNESS *
      clampedDelta;

    // Read GSAP-driven scroll progress (smooth)
    const sp = scrollState.progress;
    const scrollOffset = sp * 2.0;

    // ── CPU recalc (single pass: scroll morph + cursor push combined) ─
    const cx = cursorRef.current.x * 0.4;
    const cy = -cursorRef.current.y * 0.4;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const ax = anchors[i3];
      const ay = anchors[i3 + 1];
      const az = anchors[i3 + 2];

      // Scroll: particles morph from torus knot → spread cloud
      const waveY = Math.sin(ax * 0.5 + time * 0.3 + scrollOffset) * 0.3 * sp;
      const waveZ = Math.cos(ay * 0.5 + time * 0.2 + scrollOffset) * 0.3 * sp;
      const morphLerp = 1 - sp; // 1 at top, 0 at bottom

      let px = ax * (morphLerp + sp * 1.5) + waveY * 0.3;
      let py = ay * (morphLerp + sp * 1.2) + waveY + sp * 0.5;
      const pz = az * (morphLerp + sp * 1.3) + waveZ;

      // Cursor push: particles near the cursor get displaced
      const dx = px - cx;
      const dy = py - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.exp(-dist * 0.8) * 0.3;
      px += cx * influence;
      py += cy * influence;

      positionArray[i3] = px;
      positionArray[i3 + 1] = py;
      positionArray[i3 + 2] = pz;
    }

    posAttr.needsUpdate = true;

    // Update uniforms
    materialRef.current.uniforms.uTime.value = time;

    // Gentle rotation
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <float32BufferAttribute
          attach="attributes-position"
          args={[anchorPositions, 3]}
        />
        <float32BufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
        <float32BufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
