"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, MapPoint, Check } from "reicon-react";
import { profile } from "@/app/data/profile";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setError("");

    try {
      await emailjs.sendForm(
        "service_xxxxx", // ⬅️ Reemplazar con tu Service ID de EmailJS
        "template_xxxxx", // ⬅️ Reemplazar con tu Template ID
        formRef.current,
        "user_xxxxx" // ⬅️ Reemplazar con tu Public Key
      );
      setSent(true);
      formRef.current.reset();
    } catch {
      setError("No se pudo enviar. Escríbeme directamente a diazf7583@gmail.com");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinEnd = "+=90%";

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: pinEnd,
        pin: true,
        scrub: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      });

      const items = contentRef.current?.querySelectorAll("[data-ct]");
      if (items) {
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            stagger: 0.04,
            ease: "back.out(1.4)",
            scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom+=30%",
            toggleActions: "play none none reverse",
            },
          }
        );
      }

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
    <section id="contact" ref={sectionRef} className="pin-section relative bg-background">
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-neon/10 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          <div data-ct className="mb-12">
            <p className="font-mono text-xs tracking-[.3em] text-neon mb-3">&lt;06&gt;</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">Hablemos</h2>
            <p className="text-muted mt-3 text-lg max-w-xl">
              ¿Tienes un proyecto en mente? Estoy abierto a nuevas oportunidades y colaboraciones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Form */}
            <div data-ct>
              <form
                ref={formRef}
                className="glass-card rounded-2xl p-6 space-y-5"
                onSubmit={handleSubmit}
              >
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="font-mono text-[11px] tracking-wider text-white/40 uppercase">Nombre</label>
                  <input
                    id="contact-name"
                    name="from_name"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm placeholder:text-white/20 focus:outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/20 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="font-mono text-[11px] tracking-wider text-white/40 uppercase">Email</label>
                  <input
                    id="contact-email"
                    name="from_email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm placeholder:text-white/20 focus:outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/20 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="font-mono text-[11px] tracking-wider text-white/40 uppercase">Mensaje</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm placeholder:text-white/20 focus:outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/20 transition-all resize-none"
                    required
                  />
                </div>
                {error && (
                  <div className="text-center space-y-2">
                    <p className="text-red-400 text-xs font-mono">{error}</p>
                    <a
                      href={`mailto:${profile.email}?subject=Contacto desde portfolio&body=Hola Luis,`}
                      className="inline-flex items-center gap-1.5 text-xs text-neon hover:text-neon/80 transition-colors font-mono"
                    >
                      ✉️ Escríbeme directamente →
                    </a>
                  </div>
                )}
                {sent ? (
                  <div className="flex flex-col items-center gap-3 py-3">
                    <div className="flex items-center justify-center gap-2 text-neon text-sm font-medium">
                      <Check size={18} weight="Outline" />
                      ¡Mensaje enviado con éxito!
                    </div>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="text-xs text-muted hover:text-neon transition-colors font-mono cursor-pointer"
                    >
                      Enviar otro mensaje →
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    className={`btn-neon w-full flex items-center justify-center gap-2 text-sm ${sending ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {sending ? "Enviando..." : "Enviar Mensaje"}
                    <Send size={16} weight="Outline" />
                  </button>
                )}
              </form>
            </div>

            {/* Info */}
            <div data-ct className="space-y-5">
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-foreground text-sm">Información de contacto</h3>
                <div className="space-y-3">
                  {[
                  { icon: Send, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                  { icon: MapPoint, label: "Ubicación", value: profile.location },
                  ].map(({ icon: Icon, label, value, href }) => {
                    const content = (
                      <div className="flex items-center gap-3 text-sm text-muted hover:text-neon transition-colors group">
                        <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-neon/10 transition-colors">
                          <Icon size={16} weight="Outline" className="text-neon" />
                        </span>
                        <div>
                          <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{label}</p>
                          <p className="text-foreground/80">{value}</p>
                        </div>
                      </div>
                    );
                    return href ? <a key={label} href={href}>{content}</a> : <div key={label}>{content}</div>;
                  })}
                </div>
              </div>

              {/* Social */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-bold text-foreground text-sm mb-4">Redes</h3>
                <div className="flex gap-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub de Luis Felipe Díaz (abrir en nueva pestaña)"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:bg-neon/10 hover:text-neon border border-transparent hover:border-neon/30 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn de Luis Felipe Díaz (abrir en nueva pestaña)"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:bg-neon/10 hover:text-neon border border-transparent hover:border-neon/30 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <p className="font-mono text-[10px] text-white/20 mb-2 tracking-wider">*DATO CURRICULAR</p>
                <p className="text-sm text-muted italic leading-relaxed">
                  &ldquo;Apasionado por construir código limpio y escalable. Cuando no estoy codeando, estoy aprendiendo algo nuevo.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div data-ct className="mt-12 pt-6 border-t border-white/5 text-center">
            <p className="font-mono text-[11px] text-white/20 tracking-wider">
              © {new Date().getFullYear()} Luis Felipe Díaz · Next.js · Three.js · GSAP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
