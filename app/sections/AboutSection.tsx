"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, MapPoint, Globe, Star } from "reicon-react";
import { profile } from "@/app/data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=80%",
        pin: true,
        scrub: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 1,
        },
      });

      const items = contentRef.current?.querySelectorAll("[data-abt]");
      if (items) {
        tl.fromTo(
          items,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
      }

      // Continuous parallax — keeps section alive during scroll
      tl.fromTo(
        contentRef.current,
        { yPercent: 3 },
        { yPercent: -3, ease: "none" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="pin-section relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          {/* Title */}
          <div data-abt className="mb-12">
            <p className="font-mono text-xs tracking-[.3em] text-neon mb-3">&lt;01&gt;</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
              Sobre <span className="gradient-text">mí</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left */}
            <div className="space-y-6">
              <p data-abt className="text-base md:text-lg text-muted leading-relaxed">
                {profile.summary}
              </p>

              <div data-abt className="grid grid-cols-2 gap-3">
                {[
                  { icon: MapPoint, label: "Ubicación", value: profile.location },
                  { icon: Globe, label: "Email", value: profile.email },
                  { icon: Star, label: "Inglés", value: profile.englishLevel },
                  { icon: Code, label: "Teléfono", value: profile.phone },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} weight="Outline" className="text-neon" />
                      <span className="font-mono text-[10px] tracking-wider text-white/30 uppercase">{label}</span>
                    </div>
                    <p className="text-sm text-foreground/90 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5">
              <div data-abt className="glass-card rounded-2xl p-6 space-y-5">
                <h3 className="text-neon font-bold text-lg flex items-center gap-2">
                  <Code size={20} weight="Outline" />
                  Filosofía de trabajo
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Clean Architecture", desc: "Código mantenible y escalable desde el primer commit." },
                    { title: "DDD & Microservicios", desc: "Dominios bien definidos, sistemas desacoplados y resilientes." },
                    { title: "Cloud Native", desc: "Infraestructura en Azure y AWS con despliegues automatizados." },
                  ].map(({ title, desc }) => (
                    <div key={title} className="border-l-2 border-neon/30 pl-4">
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <p className="text-sm text-muted mt-1">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div data-abt className="grid grid-cols-3 gap-3">
                {[
                  { value: "3+", label: "Años exp." },
                  { value: "5", label: "Empresas" },
                  { value: "20+", label: "Proyectos" },
                ].map(({ value, label }) => (
                  <div key={label} className="glass-card rounded-xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-extrabold gradient-text">{value}</p>
                    <p className="text-xs text-muted mt-1 font-mono">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
