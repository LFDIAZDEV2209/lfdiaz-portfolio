"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { profile, projects, skills, experience } from "@/app/data/profile";

// ── Command definitions ──
interface CommandDef {
  desc: string;
  run: (args: string[]) => string | string[];
}

const COMMANDS: Record<string, CommandDef> = {
  help: {
    desc: "Muestra esta ayuda",
    run: () => [
      "",
      "  ╔══════════════════════════════════════════╗",
      "  ║        LFD.TERMINAL v1.0.0              ║",
      "  ╚══════════════════════════════════════════╝",
      "",
      "  Comandos disponibles:",
      "",
      ...Object.entries(COMMANDS)
        .filter(([k]) => k !== "help")
        .map(([k, v]) => `    ${k.padEnd(16)} ${v.desc}`),
      "    help".padEnd(16) + " Muestra esta ayuda",
      "",
      "  Tip: Presiona ↑ para ver historial de comandos.",
      "  Presiona ESC o ` para cerrar la terminal.",
      "",
    ],
  },
  whoami: {
    desc: "Información del desarrollador",
    run: () => [
      "",
      `  ${profile.name}`,
      `  ${profile.title}`,
      `  📍 ${profile.location}`,
      `  📧 ${profile.email}`,
      `  🌐 ${profile.github}`,
      `  💼 ${profile.linkedin}`,
      "",
      `  "${profile.summary.substring(0, 80)}..."`,
      "",
    ],
  },
  banner: {
    desc: "Muestra el banner de bienvenida",
    run: () => WELCOME_BANNER,
  },
  projects: {
    desc: "Lista los proyectos destacados",
    run: () => [
      "",
      "  PROYECTOS DESTACADOS",
      "  ────────────────────",
      ...projects
        .filter((p) => p.featured)
        .map(
          (p) =>
            `    [${p.type === "work" ? "🏢" : "👤"}] ${p.title} — ${p.impact}`
        ),
      "",
      `  Total: ${projects.length} proyectos (${projects.filter((p) => p.featured).length} destacados)`,
      "",
    ],
  },
  skills: {
    desc: "Muestra las habilidades técnicas",
    run: () => {
      const cats: Record<string, { name: string; level: number }[]> = {};
      skills.forEach((s) => {
        if (!cats[s.category]) cats[s.category] = [];
        cats[s.category].push(s);
      });
      return [
        "",
        ...Object.entries(cats).map(([cat, items]) => {
          const bar = items
            .map((s) => {
              const filled = Math.round(s.level / 20);
              return `${s.name.padEnd(16)} [${"█".repeat(filled)}${"░".repeat(5 - filled)}] ${s.level}%`;
            })
            .join("\n");
          return `  ── ${cat.toUpperCase()} ──\n${bar}`;
        }),
        "",
      ];
    },
  },
  experience: {
    desc: "Muestra la experiencia laboral",
    run: () => [
      "",
      ...experience.map(
        (e) =>
          `  [${e.period}] ${e.role} @ ${e.company}\n    ${e.description.substring(0, 100)}...`
      ),
      "",
    ],
  },
  email: {
    desc: "Muestra información de contacto",
    run: () => [
      "",
      `  📧 ${profile.email}`,
      `  📱 ${profile.phone}`,
      `  Puedes escribirme directamente a ${profile.email}`,
      "",
    ],
  },
  clear: {
    desc: "Limpia la terminal",
    run: () => [],
  },
  theme: {
    desc: "Cambia el tema (dark | light)",
    run: (args) => {
      if (args.length === 0) return ["  Uso: theme [dark | light]"];
      const t = args[0].toLowerCase();
      if (t !== "dark" && t !== "light") return [`  Tema "${t}" no reconocido. Usa dark o light.`];
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(t);
      localStorage.setItem("theme", t);
      // Force ThemeProvider to re-sync by dispatching a custom event
      window.dispatchEvent(new CustomEvent("terminal-theme", { detail: t }));
      return [`  ✓ Tema cambiado a "${t}"`];
    },
  },
  github: {
    desc: "Abre GitHub en nueva pestaña",
    run: () => {
      window.open(profile.github, "_blank", "noopener");
      return ["  Abriendo GitHub..."];
    },
  },
  linkedin: {
    desc: "Abre LinkedIn en nueva pestaña",
    run: () => {
      window.open(profile.linkedin, "_blank", "noopener");
      return ["  Abriendo LinkedIn..."];
    },
  },
  sudo: {
    desc: "Comando secreto 🤫",
    run: () => [
      "",
      "  ╔══════════════════════════════════════════╗",
      "  ║         ACCESO CONCEDIDO                ║",
      "  ║   'Con grandes poderes...'              ║",
      "  ║                                        ║",
      "  ║   Luis Felipe Díaz — Full Stack Dev     ║",
      "  ║   Contrátame: diazf7583@gmail.com      ║",
      "  ╚══════════════════════════════════════════╝",
      "",
    ],
  },
  neofetch: {
    desc: "System info del desarrollador",
    run: () => [
      "",
      `  ╭──────────────────────────────────╮`,
      `  │  ${profile.name.padEnd(32)} │`,
      `  ├──────────────────────────────────┤`,
      `  │  OS:        Human v28            │`,
      `  │  Shell:     Bilingual (ES/EN)    │`,
      `  │  Editor:    VS Code + Neovim     │`,
      `  │  Stack:     React · Node · .NET  │`,
      `  │  Cloud:     Azure · AWS          │`,
      `  │  Exp:       3+ years             │`,
      `  │  Location:  ${profile.location.padEnd(18)} │`,
      `  │  Status:    Open to work         │`,
      `  ╰──────────────────────────────────╯`,
      "",
    ],
  },
  matrix: {
    desc: "💚 Alterna el efecto Matrix (lluvia verde sobre el portfolio)",
    run: () => {
      document.body.classList.toggle("matrix-rain");
      const isActive = document.body.classList.contains("matrix-rain");
      return [
        "",
        isActive
          ? "  💚 Modo Matrix ACTIVADO"
          : "  Modo Matrix DESACTIVADO",
        "",
        isActive
          ? "  El efecto Matrix agrega una sutil lluvia de código verde sobre todo"
          : "  El efecto visual ha sido desactivado.",
        isActive
          ? "  el portfolio. Vuelve a escribir 'matrix' para desactivarlo."
          : "",
        "",
      ];
    },
  },
  goto: {
    desc: "Navega a una sección del portfolio",
    run: (args) => {
      const section = args[0]?.toLowerCase();
      const valid = ["about", "skills", "experience", "projects", "testimonials", "education", "contact"];
      if (!section || !valid.includes(section)) {
        return [
          "  Uso: goto [sección]",
          `  Secciones: ${valid.join(", ")}`,
        ];
      }
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      return [`  ➜ Navegando a "${section}"...`];
    },
  },
  ls: {
    desc: "Lista los directorios del portfolio",
    run: () => [
      "",
      "  about/        skills/       experience/",
      "  projects/     testimonials/ education/",
      "  contact/      README.md",
      "",
      "  Usa 'goto [sección]' para navegar.",
      "",
    ],
  },
  cat: {
    desc: "Muestra el contenido de un archivo",
    run: (args) => {
      if (args.length === 0) return ["  Uso: cat [archivo]", "  Archivos: README.md, about.md, skills.md"];
      const file = args[0].toLowerCase();
      if (file === "readme.md" || file === "readme") {
        return [
          "",
          "  # Luis Felipe Díaz — Portfolio",
          "",
          "  Full Stack Developer especializado en Clean Architecture,",
          "  DDD y Microservicios. 3+ años de experiencia.",
          "",
          "  Stack principal: TypeScript · React · Node.js · .NET",
          "  Cloud: Azure · AWS",
          "",
        ];
      }
      return [`  cat: ${file}: No such file or directory`];
    },
  },
  date: {
    desc: "Muestra la fecha y hora actual",
    run: () => [`  ${new Date().toLocaleString("es-CO")}`],
  },
};

const WELCOME_BANNER = [
  "",
  "  ╔══════════════════════════════════════════╗",
  "  ║      LFD.TERMINAL — v1.0.0              ║",
  "  ║      Portfolio de Luis Felipe Díaz       ║",
  "  ╚══════════════════════════════════════════╝",
  "",
  "  Escribe 'help' para ver los comandos disponibles.",
  "  Presiona ESC o ` para cerrar.",
  "",
];

export default function TerminalEmulator() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // ── Toggle on backtick ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~" || (e.ctrlKey && e.key === "ñ")) {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) {
            // Close
            setLines([]);
            setHistoryIdx(-1);
            setInput("");
            document.body.style.overflow = "";
          } else {
            // Open
            setLines(WELCOME_BANNER);
            document.body.style.overflow = "hidden";
            // Focus input after opening animation
            setTimeout(() => inputRef.current?.focus(), 150);
          }
          return !prev;
        });
      }
      // ESC to close
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
        (document.activeElement as HTMLElement)?.blur();
        return;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // ── Auto-focus input when opened ──
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  // ── Auto-scroll to bottom when lines change (like a real terminal) ──
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  // ── Execute command (ref-based to avoid useCallback dependency on lines) ──
  const linesRef = useRef(lines);
  linesRef.current = lines;

  const execute = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const currentLines = linesRef.current;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    // Parse cmd and args
    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newLines: string[] = [...currentLines, `  $ ${trimmed}`];

    if (cmdName === "clear") {
      setLines([]);
      return;
    }

    const command = COMMANDS[cmdName];
    if (command) {
      const output = command.run(args);
      setLines([...newLines, ...(Array.isArray(output) ? output : [output])]);
    } else {
      setLines([
        ...newLines,
        `  Comando no encontrado: ${cmdName}. Escribe 'help' para ver los comandos disponibles.`,
      ]);
    }
  }, []);

  // ── Handle form submit ──
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(input);
    setInput("");
  };

  // ── Handle keydown in input ──
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    }
  };

  // ── Clean up overflow on unmount ──
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("matrix-rain");
    };
  }, []);

  // Close on overlay click
  const close = useCallback(() => {
    document.body.classList.remove("matrix-rain");
    setOpen(false);
    setLines([]);
    setHistoryIdx(-1);
    setInput("");
    document.body.style.overflow = "";
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      {/* Trigger hint — visible on ALL devices */}
      {!open && (
        <>
          {/* Desktop: large kbd hint positioned at bottom-center */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[998] hidden md:flex flex-col items-center gap-2">
            <kbd className="px-3 py-1.5 text-xs font-mono bg-black/70 text-neon/70 border border-neon/20 rounded-lg backdrop-blur-md shadow-lg shadow-neon/5 animate-pulse cursor-pointer transition-all duration-300 hover:bg-black/80 hover:border-neon/40 hover:text-neon"
              onClick={() => {
                setOpen(true);
                setLines(WELCOME_BANNER);
                document.body.style.overflow = "hidden";
                setTimeout(() => inputRef.current?.focus(), 200);
              }}
              title="Haz clic o presiona ` para abrir"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                Presiona <span className="px-1.5 py-0.5 bg-white/10 rounded text-[11px] font-bold">`</span> para abrir terminal
              </span>
            </kbd>
            <span className="font-mono text-[9px] text-white/10 tracking-widest">O haz clic aquí</span>
          </div>

          {/* Mobile: floating button + small label */}
          <div className="fixed bottom-6 right-6 z-[998] md:hidden flex flex-col items-end gap-1.5">
            <button
              onClick={() => {
                setOpen(true);
                setLines(WELCOME_BANNER);
                document.body.style.overflow = "hidden";
                setTimeout(() => inputRef.current?.focus(), 200);
              }}
              className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-neon shadow-lg shadow-neon/10 motion-safe:animate-pulse transition-all duration-300 active:scale-90"
              aria-label="Abrir terminal"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </button>
            <span className="terminal-hint-label font-mono text-[9px] text-white/20 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm whitespace-nowrap">
              Tap para terminal
            </span>
          </div>
        </>
      )}

      {/* Overlay */}
      <div
        className={`terminal-overlay fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: open ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0)",
          backdropFilter: open ? "blur(8px)" : "blur(0px)",
        }}
        onClick={handleOverlayClick}
      >
        {/* Terminal window */}
        <div
          ref={terminalRef}
          className={`w-full max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden border transition-all duration-300 ${
            open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
          style={{
            borderColor: "rgba(0, 240, 255, 0.15)",
            boxShadow: open
              ? "0 0 60px rgba(0, 240, 255, 0.08), 0 0 120px rgba(0, 240, 255, 0.04)"
              : "none",
          }}
        >
          {/* Title bar */}
          <div
            className="terminal-titlebar flex items-center gap-2 px-4 py-2.5 select-none"
            style={{
              background: "rgba(10, 10, 30, 0.95)",
              borderBottom: "1px solid rgba(0, 240, 255, 0.1)",
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="font-mono text-[11px] text-white/20 tracking-wider ml-2">
              LFD.TERMINAL — Portfolio v1.0.0
            </span>
            <button
              onClick={close}
              className="ml-auto font-mono text-xs text-white/20 hover:text-white/60 transition-colors cursor-pointer"
              aria-label="Cerrar terminal"
            >
              ✕
            </button>
          </div>

          {/* Terminal body */}
          <div
            ref={bodyRef}
            className="terminal-body p-4 md:p-6 overflow-y-auto font-mono text-sm leading-relaxed"
            style={{
              background: "rgba(5, 5, 20, 0.97)",
              color: "#00f0ff",
              maxHeight: "calc(80vh - 44px)",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 240, 255, 0.15) transparent",
            }}
          >
            {/* Output lines */}
            {lines.map((line, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap ${
                  line.startsWith("  ╔") || line.startsWith("  ║") || line.startsWith("  ╚")
                    ? "text-neon/60"
                    : line.startsWith("  $")
                      ? "text-white/70"
                      : line.startsWith("  ✓")
                        ? "text-green-400"
                        : line.startsWith("  💚")
                          ? "text-green-400"
                          : "text-neon/80"
                }`}
                style={{
                  textShadow: line.startsWith("  ╔") || line.startsWith("  ║") || line.startsWith("  ╚")
                    ? "0 0 4px rgba(0, 240, 255, 0.15)"
                    : "none",
                }}
              >
                {line || "\u00A0"}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-1">
              <span className="text-neon shrink-0" style={{ textShadow: "0 0 6px rgba(0, 240, 255, 0.3)" }}>
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white/90 font-mono text-sm"
                style={{ caretColor: "#00f0ff" }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Comando de terminal"
              />
              {/* Blinking cursor indicator */}
              <span
                className="w-2 h-4 bg-neon/70 animate-pulse rounded-sm"
                style={{ animationDuration: "1s" }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
