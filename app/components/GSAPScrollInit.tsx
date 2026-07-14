"use client";

import { useGSAPScroll } from "@/app/hooks/useGSAPScroll";

/**
 * Client component that initializes the GSAP ScrollTrigger
 * that drives the global scroll state for 3D effects.
 * Place this in the server layout.
 */
export default function GSAPScrollInit() {
  useGSAPScroll();
  return null;
}
