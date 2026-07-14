"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowDown } from "reicon-react";
import Image from "next/image";
import Scene3D from "@/app/components/three/Scene3D";
import FloatingGeometry from "@/app/components/three/FloatingGeometry";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean fade-in on load (no pin — hero stays at top permanently)
      const heroItems = contentRef.current?.querySelectorAll("[data-hero]");
      if (heroItems) {
        gsap.fromTo(
          heroItems,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
    >
      {/* 3D background — always visible (Scene3D handles fixed positioning internally) */}
      <div className="absolute inset-0 -z-10">
        <Scene3D>
          <FloatingGeometry type="torusKnot" color="#a855f7" position={[-2.5, 1, -1]} size={0.4} />
          <FloatingGeometry type="icosahedron" color="#22d3ee" position={[2.8, -0.5, -1.5]} size={0.3} />
          <FloatingGeometry type="octahedron" color="#00f0ff" position={[0, -1.5, -2]} size={0.25} />
        </Scene3D>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Photo */}
        <div data-hero className="flex justify-center lg:justify-end order-2 lg:order-1">
          <div className="photo-ring w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 relative overflow-hidden rounded-full">
            <Image
              src="/profile-photo.jpg"
              alt="Luis Felipe Díaz"
              width={320}
              height={320}
              className="w-full h-full object-cover rounded-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-full" />
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <p
            data-hero
            className="font-mono text-xs md:text-sm tracking-[.3em] uppercase text-neon mb-4"
          >
            Full Stack Developer
          </p>

          <h1 data-hero className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9] mb-6">
            <span className="shimmer-text">Luis Felipe</span>
            <br />
            <span className="text-foreground">Díaz</span>
          </h1>

          <p
            data-hero
            className="text-base md:text-lg text-muted font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
          >
            Arquitectura limpia · Código que impacta
            <br />
            <span className="text-neon font-medium">
              3 años construyendo el futuro digital
            </span>
          </p>

          <div
            data-hero
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="btn-neon flex items-center gap-2 text-sm group"
            >
              Ver Proyectos
              <ArrowRight size={16} weight="Outline" className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-full border border-white/15 text-foreground/70 font-medium text-sm hover:bg-white/5 hover:border-white/25 transition-all duration-300 flex items-center gap-2"
            >
              Contáctame
              <ArrowRight size={16} weight="Outline" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="font-mono text-[10px] text-white/20 tracking-[.3em] uppercase">Scroll</span>
        <ArrowDown size={14} weight="Outline" className="text-white/20 float-anim" />
      </div>
    </section>
  );
}
