"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experiencia" },
  { id: "projects", label: "Proyectos" },
  { id: "education", label: "Educación" },
  { id: "contact", label: "Contacto" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;

      // Show/hide based on scroll direction
      setVisible(sy < 80 || sy < lastScrollY.current);
      lastScrollY.current = sy;

      // Active section (offset from top)
      let current = "hero";
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      aria-label="Navegación principal"
    >
      <div className="max-w-5xl mx-auto px-4 pt-4">
        <div className="glass-card rounded-2xl px-4 py-2 flex items-center justify-between backdrop-blur-2xl bg-background/70 border-white/10">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, "hero")}
            aria-label="Ir al inicio"
            className="font-mono text-xs tracking-[.2em] text-neon font-semibold cursor-pointer no-underline"
          >
            LFD.
          </a>

          {/* Links */}
          <div className="flex items-center gap-1">
            {SECTIONS.slice(1).map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollTo(e, id)}
                aria-current={active === id ? "true" : undefined}
                className={`relative px-3 py-1.5 rounded-lg font-mono text-[11px] tracking-wider transition-all duration-300 cursor-pointer no-underline ${
                  active === id
                    ? "text-neon bg-neon/10"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {label}
                {active === id && (
                  <span className="absolute -bottom-px left-2 right-2 h-px bg-neon/50 rounded-full" aria-hidden="true" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
