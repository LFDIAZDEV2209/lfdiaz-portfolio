"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "reicon-react";
import { experience } from "@/app/data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      });

      const items = contentRef.current?.querySelectorAll("[data-exp]");
      if (items) {
        tl.fromTo(
          items,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "power2.out" }
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
    <section id="experience" ref={sectionRef} className="pin-section relative">
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-neon/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          <div data-exp className="mb-12">
            <p className="font-mono text-xs tracking-[.3em] text-neon mb-3">&lt;03&gt;</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
              Experiencia <span className="gradient-text">Laboral</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon/40 via-neon-purple/30 to-transparent" />

            {experience.map((exp, i) => (
              <div
                key={exp.company}
                data-exp
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-14 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-0 w-3 h-3 rounded-full bg-neon shadow-[0_0_12px_rgba(0,240,255,.6)] z-10" />

                <div
                  className={`flex-1 pl-8 md:pl-0 ${
                    i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Briefcase size={14} weight="Outline" className="text-neon" />
                      <span className="font-mono text-xs text-neon tracking-wider">{exp.period}</span>
                      {exp.company === "Fya Tech" && (
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-neon/15 text-neon rounded-full border border-neon/25">
                          Actual
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{exp.role}</h3>
                    <p className="text-sm text-neon-purple font-semibold mb-3">{exp.company}</p>
                    <p className="text-sm text-muted leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 font-mono text-[11px] bg-white/5 text-white/50 rounded-full border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
