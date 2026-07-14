"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "reicon-react";
import { education } from "@/app/data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=70%",
        pin: true,
        scrub: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=70%",
          scrub: 1,
        },
      });

      const items = contentRef.current?.querySelectorAll("[data-edu]");
      if (items) {
        tl.fromTo(
          items,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "power2.out" }
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
    <section id="education" ref={sectionRef} className="pin-section relative">
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          <div data-edu className="mb-12">
            <p className="font-mono text-xs tracking-[.3em] text-neon mb-3">&lt;05&gt;</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
              Formación <span className="gradient-text">Académica</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {education.map((edu) => (
              <div key={edu.institution} data-edu className="glass-card rounded-2xl p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                    <Award size={22} weight="Outline" className="text-neon" />
                  </div>
                  <span className="font-mono text-[11px] text-neon tracking-wider">{edu.period}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h3>
                <p className="text-sm text-neon-purple font-semibold mb-3">{edu.institution}</p>
                <p className="text-sm text-muted leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
