"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Server, Database, Cloud, Wifi, Cpu, Globe, Award } from "reicon-react";
import { skills } from "@/app/data/profile";
import { getTechIcon } from "@/app/components/TechIcons";

gsap.registerPlugin(ScrollTrigger);

const categoryMeta: Record<string, { icon: typeof Code; color: string; label: string }> = {
  language: { icon: Code, color: "#00f0ff", label: "Lenguajes" },
  frontend: { icon: Globe, color: "#a855f7", label: "Frontend" },
  backend: { icon: Server, color: "#22d3ee", label: "Backend" },
  mobile: { icon: Cpu, color: "#06b6d4", label: "Mobile" },
  database: { icon: Database, color: "#00f0ff", label: "Bases de Datos" },
  devops: { icon: Cloud, color: "#a855f7", label: "DevOps" },
  cloud: { icon: Cloud, color: "#22d3ee", label: "Cloud" },
  orm: { icon: Database, color: "#06b6d4", label: "ORMs" },
  tools: { icon: Wifi, color: "#00f0ff", label: "Herramientas" },
  methodology: { icon: Award, color: "#a855f7", label: "Metodologías" },
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinEnd = "+=100%";

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: pinEnd,
        pin: true,
        scrub: 0.7,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: pinEnd,
          scrub: 0.7,
        },
      });

      const items = contentRef.current?.querySelectorAll("[data-sk]");
      if (items) {
        // Skills: stagger + flip + hue shift — unique pattern
        tl.fromTo(
          items,
          { y: -30, opacity: 0, rotation: -2, scale: 0.95 },
          { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.35, stagger: 0.04, ease: "back.out(1.2)" }
        );
      }

      // Continuous parallax — keeps section alive during scroll
      tl.fromTo(
        contentRef.current,
        { yPercent: 5 },
        { yPercent: -5, ease: "none" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" ref={sectionRef} className="pin-section relative">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-neon-purple/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div data-sk className="mb-12">
            <p className="font-mono text-xs tracking-[.3em] text-neon mb-3">&lt;02&gt;</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
              Tech <span className="gradient-text">Stack</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const meta = categoryMeta[cat] ?? { icon: Code, color: "#00f0ff", label: cat };
              const CatIcon = meta.icon;
              const catSkills = skills.filter((s) => s.category === cat);
              return (
                <div key={cat} data-sk className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
                    <CatIcon size={18} weight="Outline" color={meta.color} />
                    <h3
                      className="font-mono text-xs tracking-[.2em] uppercase font-semibold"
                      style={{ color: meta.color }}
                    >
                      {meta.label}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {catSkills.map((sk) => {
                      const TechIcon = getTechIcon(sk.name);
                      return (
                        <span
                          key={sk.name}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 rounded-xl border border-white/5 hover:border-white/15 hover:bg-white/10 transition-all duration-300 cursor-default group"
                        >
                          <span className="group-hover:scale-110 transition-transform w-4 h-4 flex items-center justify-center">
                            <TechIcon size={16} />
                          </span>
                          <span className="text-xs text-foreground/70 group-hover:text-foreground/90 transition-colors font-medium">
                            {sk.name}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
