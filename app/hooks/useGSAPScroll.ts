"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/app/lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up a single GSAP ScrollTrigger that tracks overall page scroll
 * progress (0→1) and writes it to `scrollState.progress`.
 *
 * This is the SOURCE OF TRUTH for scroll-driven 3D effects. Both DOM
 * animations (existing GSAP timelines) and the 3D particle system
 * read from this shared state.
 */
export function useGSAPScroll() {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    // Create a single ScrollTrigger that tracks the entire page
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    // Smooth scroll tick on rAF
    const tick = () => {
      scrollState.tick(0.05);
      animId = requestAnimationFrame(tick);
    };
    let animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      // Only kill the one we created — NOT all ScrollTriggers!
      st.kill();
    };
  }, []);
}
