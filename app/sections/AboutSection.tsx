"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, MapPoint, Globe, Star } from "reicon-react";
import { profile, workflowSteps } from "@/app/data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinEnd = "+=80%";

      // 1. Pin — smooth hold, independent of animation speed
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: pinEnd,
        pin: true,
        scrub: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      });

      const items = contentRef.current?.querySelectorAll("[data-abt]");
      if (items) {
        // 2. Items clipPath reveal — plays at NATURAL speed on scroll-enter
        gsap.set(items, { clipPath: "inset(0 100% 0 0)", opacity: 0, scale: 0.97 });
        gsap.to(items, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          scale: 1,
          duration: 0.25,
          stagger: 0.04,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom+=30%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // 3. Parallax — follows scroll subtly (independently of items)
      gsap.fromTo(
        contentRef.current,
        { yPercent: 3 },
        {
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom+=30%",
            end: "top top",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="pin-section relative bg-background">
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

              {/* Filosofía de trabajo */}
              <div data-abt className="glass-card rounded-2xl p-6 space-y-5">
                <h3 className="text-neon font-bold text-lg flex items-center gap-2">
                  <Code size={20} weight="Outline" />
                  Filosofía
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
            </div>
          </div>

          {/* ── Cómo trabajo ── */}
          <div data-abt className="mt-20">
            <div className="mb-8 text-center">
              <p className="font-mono text-xs tracking-[.3em] text-neon mb-3">Cómo trabajo</p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">
                Mi <span className="gradient-text">proceso</span>
              </h3>
              <p className="text-sm text-muted mt-2 max-w-xl mx-auto">
                De la idea a producción: cómo transformo requerimientos en software que escala.
              </p>
            </div>

            <div className="relative grid md:grid-cols-4 gap-4 md:gap-6">
              {/* Connector line on desktop */}
              <div
                className="hidden md:block absolute top-12 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-neon/40 via-neon-purple/40 to-neon-green/40"
                aria-hidden="true"
              />

              {workflowSteps.map((w, i) => (
                <div
                  key={w.step}
                  className="glass-card rounded-2xl p-5 md:p-6 relative"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Step circle */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon/20 to-neon-purple/20 border border-neon/30 flex items-center justify-center mb-4 text-lg">
                    {w.icon}
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-neon/60 mb-1">{w.step}</p>
                  <h4 className="font-bold text-foreground text-sm mb-2">{w.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
