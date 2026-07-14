"use client";

import { useEffect, useRef, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Respect reduced motion — don't show the animated bar
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      // Use rAF to throttle
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollable = docHeight - winHeight;
        const pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
        setProgress(Math.min(pct, 100));
        rafRef.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9997] h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    >
      <div
        className="h-full rounded-r-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #00f0ff, #a855f7, #22d3ee)",
          boxShadow: "0 0 12px rgba(0,240,255,0.4)",
        }}
      />
    </div>
  );
}
