export const profile = {
  name: "Luis Felipe Díaz",
  title: "Full Stack Developer",
  tagline: "Arquitectura limpia • Código que impacta",
  email: "diazf7583@gmail.com",
  phone: "+57 305 3924819",
  location: "Barranquilla, Colombia",
  englishLevel: "B1 (75%)",
  photoPlaceholder: "/profile-photo.jpg", // Replace with actual photo
  github: "https://github.com/LFDIAZDEV2209",
  linkedin: "https://www.linkedin.com/in/luis-d%C3%ADaz-dev/",
  summary:
    "Ingeniero de Sistemas en formación y Desarrollador Full Stack con 3 años de experiencia creando aplicaciones web, móviles y sistemas de automatización. Apasionado por la arquitectura limpia, DDD y microservicios. Experto en integración cloud (Azure, AWS) y desarrollo de chatbots con IA.",
};

export const skills = [
  { name: "TypeScript", category: "language", level: 95 },
  { name: "JavaScript", category: "language", level: 92 },
  { name: "Python", category: "language", level: 82 },
  { name: "PHP", category: "language", level: 75 },
  { name: "C#", category: "language", level: 88 },
  { name: "React", category: "frontend", level: 95 },
  { name: "Next.js", category: "frontend", level: 92 },
  { name: "Vue.js", category: "frontend", level: 80 },
  { name: "Angular", category: "frontend", level: 78 },
  { name: "Tailwind CSS", category: "frontend", level: 90 },
  { name: "React Native", category: "mobile", level: 85 },
  { name: "Node.js", category: "backend", level: 92 },
  { name: "NestJS", category: "backend", level: 88 },
  { name: "Express", category: "backend", level: 88 },
  { name: ".NET", category: "backend", level: 85 },
  { name: "PostgreSQL", category: "database", level: 88 },
  { name: "SQL Server", category: "database", level: 85 },
  { name: "MySQL", category: "database", level: 82 },
  { name: "MongoDB", category: "database", level: 80 },
  { name: "Entity Framework", category: "orm", level: 85 },
  { name: "Prisma", category: "orm", level: 82 },
  { name: "Dapper", category: "orm", level: 80 },
  { name: "Docker", category: "devops", level: 85 },
  { name: "Git", category: "tools", level: 90 },
  { name: "RabbitMQ", category: "tools", level: 78 },
  { name: "n8n", category: "tools", level: 75 },
  { name: "Azure", category: "cloud", level: 82 },
  { name: "AWS", category: "cloud", level: 80 },
  { name: "Clean Architecture", category: "methodology", level: 88 },
  { name: "DDD / Hexagonal", category: "methodology", level: 85 },
];

export const experience = [
  {
    company: "Fya Tech",
    role: "Full Stack Developer",
    period: "Mar 2026 — Presente",
    description:
      "Lideré el desarrollo técnico de una plataforma para el sector salud, incluyendo portal IPS y dashboard administrativo. Optimicé consultas SQL y administré infraestructura AWS.",
    tech: ["React", "Node.js", "AWS", "SQL Server", "TypeScript"],
  },
  {
    company: "Tidelit",
    role: "Full Stack Developer",
    period: "Dic 2025 — Mar 2026",
    description:
      "Desarrollé funcionalidades móviles con React Native y dashboards web administrativos. Implementé gestión de recursos AWS S3 y persistencia de estados.",
    tech: ["React Native", "TypeScript", "AWS S3", "Node.js"],
  },
  {
    company: "Arcetec",
    role: "Software Developer",
    period: "Sep 2025 — Nov 2025",
    description:
      "Desarrollé Web APIs con arquitectura hexagonal, chatbots WhatsApp integrados con IA y automatización de tareas.",
    tech: [".NET", "C#", "Python", "n8n", "WhatsApp API"],
  },
  {
    company: "Solvo",
    role: "Software Developer",
    period: "May 2025 — Nov 2025",
    description:
      "Desarrollo full stack en IA Academy & ClonAi, optimizando rendimiento UI, diseñando componentes React y automatizando procesos con Python y n8n.",
    tech: ["React", "Python", "n8n", "TypeScript", "Node.js"],
  },
  {
    company: "CampusDev | Campuslands",
    role: "Full Stack Developer",
    period: "Ene 2025 — May 2025",
    description:
      "Inicié como intern y crecí a Desarrollador Full Stack. Trabajé con React, Node.js, Express y metodologías Agile.",
    tech: ["React", "Node.js", "Express", "TypeScript", "Agile"],
  },
];

export const education = [
  {
    institution: "UNIMINUTO",
    degree: "Ingeniería de Sistemas",
    period: "2025 — Presente",
    description: "Formación en ingeniería de software y sistemas de información.",
  },
  {
    institution: "Campuslands",
    degree: "Técnico en Desarrollo de Software",
    period: "2025",
    description:
      "Formación intensiva en desarrollo de software full stack con enfoque en tecnologías modernas y buenas prácticas.",
  },
];

export const projects = [
  {
    title: "Plataforma IPS Salud",
    description:
      "Plataforma integral para el sector salud con portal web IPS y dashboard administrativo para gestión de pacientes, citas y expedientes.",
    tech: ["React", "Node.js", "AWS", "SQL Server", "TypeScript"],
    url: "https://orisut.com",
    urlLabel: "Web IPS",
    url2: "https://atena.orisut.com",
    urlLabel2: "Admin Dashboard",
    type: "work",
    featured: true,
  },
  {
    title: "Exo-Track",
    description:
      "Plataforma de declaraciones de renta para clientes y escaneo de archivo exógena DIAN para administradores. Automatización de procesos tributarios.",
    tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Docker"],
    url: "https://exo-track.netlify.app",
    github: "https://github.com/LFDIAZDEV2209/exo-track-front",
    githubBack: "https://github.com/LFDIAZDEV2209/exo-track-back",
    type: "personal",
    featured: true,
  },
  {
    title: "Liora",
    description:
      "E-commerce moderno con catálogo de productos, carrito de compras y panel administrativo. Diseñado para una experiencia de compra premium.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    image: "/liora.png",
    url: "https://shop-classy.netlify.app",
    github: "https://github.com/LFDIAZDEV2209/shop-classy",
    type: "personal",
    featured: false,
  },
  {
    title: "Pranalatam",
    description:
      "Plataforma corporativa para empresa de logística y comercio internacional. Gestión de envíos y seguimiento en tiempo real.",
    tech: ["Angular", "Node.js", "TypeScript", "MySQL"],
    image: "/pranalatam.png",
    url: "https://pranalatam.netlify.app",
    github: "https://github.com/LFDIAZDEV2209/pranalatam",
    type: "personal",
    featured: false,
  },
  {
    title: "Liceo Patria",
    description:
      "Portal institucional para colegio con información académica, galería de eventos y sistema de comunicación con padres de familia.",
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    image: "/liceo.png",
    url: "https://propuesta-liceo-patria.vercel.app",
    github: "https://github.com/LFDIAZDEV2209/propuesta-liceo-patria",
    type: "personal",
    featured: false,
  },
  {
    title: "Heroes Cards",
    description:
      "Aplicación interactiva de colección de cartas de héroes con datos consumidos desde API JSON. Búsqueda, filtros y detalles de cada personaje.",
    tech: ["React", "TypeScript", "CSS Modules"],
    image: "/heroes.png",
    url: "https://heroes-cards.netlify.app",
    github: "https://github.com/LFDIAZDEV2209/heroes-cards-json",
    type: "personal",
    featured: false,
  },
  {
    title: "Arena Fighter",
    description:
      "Juego de arena de héroes con sistema de combates y leaderboard. Interfaz dinámica y animaciones fluidas.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "/arena.png",
    url: "https://arena-heroes.netlify.app",
    github: "https://github.com/LFDIAZDEV2209/arena-heroes",
    type: "personal",
    featured: false,
  },
  {
    title: "LMS Platform",
    description:
      "Plataforma de gestión de aprendizaje con cursos, evaluaciones y seguimiento de progreso para estudiantes y administradores.",
    tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL"],
    image: "/lms.png",
    url: "https://lms-portal-web.netlify.app",
    github: "https://github.com/LFDIAZDEV2209/LMS-PORTAL",
    type: "personal",
    featured: false,
  },
];
