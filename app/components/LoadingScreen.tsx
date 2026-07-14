"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "fading" | "gone">("loading");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Allow keyboard/click to skip the loading screen early
  const handleSkip = useCallback(() => {
    setPhase((prev) => (prev === "loading" ? "fading" : prev));
  }, []);

  useEffect(() => {
    // Respect reduced motion — skip the loading screen entirely
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setPhase("gone");
      return;
    }

    // Minimum display time (prevents flash on fast loads)
    const MIN_DISPLAY = 2000;
    const MAX_DISPLAY = 6000;

    const startTime = performance.now();

    const resolve = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY - elapsed);

      setTimeout(() => {
        setPhase("fading");
      }, remaining);
    };

    // If the page is already loaded, resolve with min time
    if (document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", resolve);
    }

    // Safety net: force-hide after MAX_DISPLAY
    const safetyTimer = setTimeout(() => {
      setPhase("fading");
    }, MAX_DISPLAY);

    return () => {
      window.removeEventListener("load", resolve);
      clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "fading" || !overlayRef.current) return;

    const overlay = overlayRef.current;

    // Add pointer-events: none immediately so users can interact with the page underneath
    overlay.style.pointerEvents = "none";

    // Fade out
    overlay.style.transition =
      "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    requestAnimationFrame(() => {
      overlay.style.opacity = "0";
    });

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setPhase("gone");
    }, 900);

    return () => clearTimeout(removeTimer);
  }, [phase]);

  // Gone — don't render anything
  if (phase === "gone") return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Cargando portfolio"
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background"
      onClick={handleSkip}
      onKeyDown={(e) => {
        // Don't trap Tab — let keyboard users navigate
        if (e.key === "Tab") return;
        e.preventDefault();
        handleSkip();
      }}
      tabIndex={0}
    >
      {/* LFD. Logo */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Glow ring behind logo */}
        <div className="absolute inset-0 -m-16 rounded-full bg-neon/5 blur-[80px] loader-glow" />

        {/* Logo text */}
        <span
          className="relative font-mono text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[.15em] text-foreground select-none"
          aria-hidden="true"
        >
          <span className="text-neon">LFD</span>
          <span className="text-foreground/80">.</span>
        </span>

        {/* Animated tagline */}
        <p className="relative font-mono text-xs md:text-sm tracking-[.35em] uppercase text-muted/60 loader-tagline">
          Cargando experiencia...
        </p>

        {/* Loading dots */}
        <div className="relative flex items-center gap-2" aria-hidden="true">
          <span
            className="w-2 h-2 rounded-full bg-neon/60 loader-dot"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-neon/60 loader-dot"
            style={{ animationDelay: "200ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-neon/60 loader-dot"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>

      {/* Skip hint */}
      <p className="absolute bottom-8 font-mono text-[10px] tracking-[.2em] text-white/10">
        Presiona cualquier tecla para continuar
      </p>
    </div>
  );
}
