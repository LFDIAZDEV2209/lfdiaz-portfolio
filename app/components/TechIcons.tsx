/**
 * Tech icons powered by react-icons/si (SimpleIcons — 3400+ brand icons).
 * Tree-shakeable: only the icons you import end up in the bundle.
 * Falls back to Feather Icons for tech without SimpleIcons (AWS, Azure, SQL Server).
 */
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiNestjs,
  SiAngular,
  SiVuedotjs,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiPrisma,
  SiExpress,
  SiDotnet,
  SiSharp,
  SiRabbitmq,
  SiN8N,
} from "react-icons/si";
import { FiCloud, FiDatabase, FiCode } from "react-icons/fi";
import type { IconType } from "react-icons";

type IconComponent = ((props: { size?: number; className?: string }) => React.ReactNode) & { displayName?: string };

/** Map technology names → icon renderers (case-insensitive fuzzy matched) */
const iconMap: Record<string, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  nestjs: SiNestjs,
  angular: SiAngular,
  vue: SiVuedotjs,
  vuejs: SiVuedotjs,
  python: SiPython,
  php: SiPhp,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  mysql: SiMysql,
  sqlserver: FiDatabase,
  "sql server": FiDatabase,
  docker: SiDocker,
  aws: FiCloud,
  azure: FiCloud,
  git: SiGit,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  prisma: SiPrisma,
  express: SiExpress,
  ".net": SiDotnet,
  "c#": SiSharp,
  csharp: SiSharp,
  rabbitmq: SiRabbitmq,
  "n8n": SiN8N,
};

/**
 * Returns an icon component for a technology name.
 * Uses fuzzy matching: "Next.js" → normalized "nextjs" → SiNextdotjs
 */
export function getTechIcon(name: string): IconComponent {
  const normalized = name
    .toLowerCase()
    .replace(/[^a-z0-9.#]/g, "")
    .replace(/^\./, "");

  // Direct key match
  if (iconMap[normalized]) {
    const Icon = iconMap[normalized];
    const C: IconComponent = (props) => <Icon size={props.size ?? 16} className={props.className} />;
    C.displayName = `TechIcon(${normalized})`;
    return C;
  }

  // Partial match: check if normalized includes a key or vice versa
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      const C: IconComponent = (props) => <Icon size={props.size ?? 16} className={props.className} />;
      C.displayName = `TechIcon(${key})`;
      return C;
    }
  }

  // Fallback
  const C: IconComponent = (props) => <FiCode size={props.size ?? 16} className={props.className} />;
  C.displayName = "TechIcon(Fallback)";
  return C;
}
