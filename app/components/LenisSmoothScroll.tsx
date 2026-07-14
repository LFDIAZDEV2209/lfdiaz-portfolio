"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth scroll provider using Lenis.
 * Integrates with GSAP ScrollTrigger so all scroll-driven
 * animations are buttery smooth like ricardochance.com
 */
export default function LenisSmoothScroll() {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    // 1. Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // 2. Connect Lenis → GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. GSAP ticker drives Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 4. Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.lagSmoothing(1);
    };
  }, []);

  return null;
}
