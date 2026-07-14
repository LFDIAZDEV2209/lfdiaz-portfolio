"use client";

import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";

interface Scene3DProps {
  children?: React.ReactNode;
  cameraPosition?: [number, number, number];
  particleField?: boolean;
}

function SceneContent({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      {children}
    </>
  );
}

export default function Scene3D({
  children,
  cameraPosition = [0, 0, 4],
  particleField = true,
}: Scene3DProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
      >
        <SceneContent>
          {particleField && <ParticleField />}
          {children}
        </SceneContent>
      </Canvas>
    </div>
  );
}
