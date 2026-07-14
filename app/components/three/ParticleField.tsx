"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import * as THREE from "three";

const PARTICLE_COUNT = 8000;
const CURSOR_STRENGTH = 0.3;

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

    float pulse = 0.7 + 0.3 * sin(position.y * 1.5 + uTime * 0.4);
    vAlpha = pulse;

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

  // ── 1. Sample anchor positions + colors + sizes + float offsets ──
  const anchorRef = useRef<Float32Array | null>(null);
  const floatSeedRef = useRef<Float32Array | null>(null);

  const { colors, sizes, anchorPositions, floatSeeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);
    const seed = new Float32Array(PARTICLE_COUNT);

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

    let rngSeed = 42;
    const rng = () => {
      rngSeed = (rngSeed * 16807) % 2147483647;
      return (rngSeed - 1) / 2147483646;
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
      seed[i] = rng() * Math.PI * 2; // unique phase per particle
    }

    geo.dispose();
    mat.dispose();

    return {
      colors: col,
      sizes: siz,
      anchorPositions: pos,
      floatSeeds: seed,
    };
  }, []);

  useEffect(() => {
    anchorRef.current = anchorPositions;
    floatSeedRef.current = floatSeeds;
  }, [anchorPositions, floatSeeds]);

  // ── 2. Uniforms ──
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(size.width / viewport.width, 2) },
    }),
    [size.width, viewport.width]
  );

  // ── 3. Cursor tracking ──
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

  // ── 4. CPU position recalc every frame ──
  useFrame((_, delta) => {
    if (!pointsRef.current || !materialRef.current || !geometryRef.current) return;

    const posAttr = geometryRef.current.attributes.position;
    const positionArray = posAttr.array as Float32Array;
    const anchors = anchorRef.current;
    const seeds = floatSeedRef.current;
    if (!anchors || !seeds) return;

    timerRef.current.update();
    const time = timerRef.current.getElapsed() * 0.5;

    const clampedDelta = Math.min(delta * 60, 1);

    // Spring cursor toward target
    cursorRef.current.x +=
      (targetCursorRef.current.x - cursorRef.current.x) *
      0.08 *
      clampedDelta;
    cursorRef.current.y +=
      (targetCursorRef.current.y - cursorRef.current.y) *
      0.08 *
      clampedDelta;

    const cx = cursorRef.current.x * 0.4;
    const cy = -cursorRef.current.y * 0.4;

    // ── Pure decorative float — no scroll morph ──
    // Each particle orbits gently around its anchor using its unique phase.
    // Amplitude increases slightly with distance from origin for a breathing effect.
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const ax = anchors[i3];
      const ay = anchors[i3 + 1];
      const az = anchors[i3 + 2];

      const phase = seeds[i];
      const distFactor = 0.5 + Math.abs(ax) * 0.3;

      // Gentle 3D float: each axis gets a slightly different frequency
      const floatX = Math.sin(time * 0.6 + phase) * 0.1 * distFactor;
      const floatY = Math.sin(time * 0.5 + phase * 1.3) * 0.1 * distFactor;
      const floatZ = Math.cos(time * 0.4 + phase * 0.7) * 0.1 * distFactor;

      let px = ax + floatX;
      let py = ay + floatY;
      const pz = az + floatZ;

      // Cursor push: particles near the cursor get displaced
      const dx = px - cx;
      const dy = py - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.exp(-dist * 0.8) * CURSOR_STRENGTH;
      px += cx * influence;
      py += cy * influence;

      positionArray[i3] = px;
      positionArray[i3 + 1] = py;
      positionArray[i3 + 2] = pz;
    }

    posAttr.needsUpdate = true;

    // Update uniforms
    materialRef.current.uniforms.uTime.value = time;

    // Gentle rotation — very subtle for a calm float feel
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = Math.sin(time * 0.08) * 0.03;
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
