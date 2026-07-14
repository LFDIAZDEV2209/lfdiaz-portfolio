"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGeometryProps {
  type?: "torus" | "icosahedron" | "octahedron" | "torusKnot";
  color?: string;
  position?: [number, number, number];
  size?: number;
  wireframe?: boolean;
}

export default function FloatingGeometry({
  type = "torusKnot",
  color = "#00f0ff",
  position = [0, 0, 0],
  size = 1,
  wireframe = true,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    switch (type) {
      case "torus":
        return new THREE.TorusGeometry(size, size * 0.3, 16, 64);
      case "icosahedron":
        return new THREE.IcosahedronGeometry(size, 0);
      case "octahedron":
        return new THREE.OctahedronGeometry(size, 0);
      case "torusKnot":
      default:
        return new THREE.TorusKnotGeometry(size, size * 0.3, 64, 16);
    }
  }, [type, size]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;

    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.z += delta * 0.1;

    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(timeRef.current * 0.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}
