"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import { testimonials } from "@/app/data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinEnd = "+=80%";

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: pinEnd,
        pin: true,
        scrub: 0.7,
        fastScrollEnd: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=10%",
          end: pinEnd,
          scrub: 0.7,
          fastScrollEnd: true,
        },
      });

      const items = contentRef.current?.querySelectorAll("[data-tm]");
      if (items) {
        tl.fromTo(
          items,
          { y: 40, opacity: 0, rotateX: 5 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" }
        );
      }

      tl.fromTo(
        contentRef.current,
        { yPercent: 5 },
        { yPercent: -5, ease: "none" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={sectionRef} className="pin-section relative">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-neon-purple/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <div data-tm className="mb-10">
            <p className="font-mono text-xs tracking-[.3em] text-neon mb-3">&lt;Testimonios&gt;</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
              Lo que dicen <span className="gradient-text">de mí</span>
            </h2>
          </div>

          <div data-tm className="glass-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            <FiMessageCircle size={32} className="text-neon/30 mb-4 mx-auto" />

            <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon/30 to-neon-purple/30 flex items-center justify-center">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <FiUser size={20} className="text-neon/60" />
                )}
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="font-mono text-[10px] text-muted tracking-wider">{t.role}</p>
              </div>
            </div>

            {/* Dots */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Testimonio ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === current ? "bg-neon w-6" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
