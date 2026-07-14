"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Respect prefers-reduced-motion: if enabled, hide custom cursor entirely
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Hide native cursor
    document.body.style.cursor = "none";

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      smoothPos.current.x +=
        (mouseRef.current.x - smoothPos.current.x) * 0.08;
      smoothPos.current.y +=
        (mouseRef.current.y - smoothPos.current.y) * 0.08;

      // Smooth glow
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px) translate(-50%, -50%)`;
      }

      // Dot follows raw position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animId = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Main cursor glow — smooth follower */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Small dot cursor — instant stick */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          width: "4px",
          height: "4px",
          background: "#00f0ff",
          borderRadius: "50%",
          boxShadow: "0 0 6px #00f0ff, 0 0 12px rgba(0,240,255,0.5)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
