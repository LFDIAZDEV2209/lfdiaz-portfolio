"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe } from "reicon-react";
import Image from "next/image";
import { projects, profile } from "@/app/data/profile";
import { getTechIcon } from "@/app/components/TechIcons";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
        },
      });

      const items = contentRef.current?.querySelectorAll("[data-prj]");
      if (items) {
        tl.fromTo(
          items,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }
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
    <section id="projects" ref={sectionRef} className="pin-section relative">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon/10 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div data-prj className="mb-12">
            <p className="font-mono text-xs tracking-[.3em] text-neon mb-3">&lt;04&gt;</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
              Proyectos <span className="gradient-text">Destacados</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <div
                key={p.title}
                data-prj
                className={`glass-card rounded-2xl overflow-hidden flex flex-col ${
                  p.featured ? "md:col-span-2" : ""
                }`}
              >
                {/* Image (if available) */}
                {p.image && (
                  <div className="relative w-full h-44 md:h-52 overflow-hidden bg-black/40">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                        p.type === "work"
                          ? "bg-neon/10 text-neon border-neon/20"
                          : "bg-neon-purple/10 text-neon-purple border-neon-purple/20"
                      }`}
                    >
                      {p.type === "work" ? "Laboral" : "Personal"}
                    </span>
                    {p.featured && (
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-white/5 text-white/40 rounded-full border border-white/10">
                        Destacado
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                    {p.description}
                  </p>

                  {/* Tech tags with icons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.map((t) => {
                      const TechIcon = getTechIcon(t);
                      return (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] bg-white/5 text-white/50 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                          <TechIcon size={12} />
                          {t}
                        </span>
                      );
                    })}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
                    {/* Demo URL */}
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-neon transition-colors"
                      >
                        <Globe size={12} weight="Outline" />
                        {p.urlLabel || "Demo"}
                      </a>
                    )}
                    {/* Second URL (e.g. admin dashboard) */}
                    {p.url2 && (
                      <a
                        href={p.url2}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-neon transition-colors"
                      >
                        <Globe size={12} weight="Outline" />
                        {p.urlLabel2 || "Admin"}
                      </a>
                    )}
                    {/* GitHub */}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} - Frontend en GitHub`}
                        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-neon transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Frontend
                      </a>
                    )}
                    {p.githubBack && (
                      <a
                        href={p.githubBack}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} - Backend en GitHub`}
                        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-neon transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Backend
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* GitHub CTA */}
          <div data-prj className="mt-10 text-center">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Más proyectos en GitHub (abrir en nueva pestaña)"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-muted hover:border-neon/40 hover:text-neon transition-all duration-300 text-sm group"
            >
              <svg className="w-4.5 h-4.5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Más proyectos en GitHub
              <ArrowRight size={14} weight="Outline" className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
