export const profile = {
  name: "Luis Felipe Díaz",
  title: "Full Stack Developer",
  tagline: "Arquitectura limpia • Código que impacta",
  email: "diazf7583@gmail.com",
  phone: "+57 305 3924819",
  location: "Barranquilla, Colombia",
  englishLevel: "B1 (75%)",
  photoPlaceholder: "/profile-photo.jpg", // Replace with actual photo
  githubUsername: "LFDIAZDEV2209",
  github: "https://github.com/LFDIAZDEV2209",
  linkedin: "https://www.linkedin.com/in/luis-d%C3%ADaz-dev/",
  summary:
    "Ingeniero de Sistemas en formación y Desarrollador Full Stack con 3 años de experiencia creando aplicaciones web, móviles y sistemas de automatización. Apasionado por la arquitectura limpia, DDD y microservicios. Experto en integración cloud (Azure, AWS) y desarrollo de chatbots con IA.",
};

export const workflowSteps = [
  {
    step: "01",
    title: "Descubrimiento",
    desc: "Entiendo el negocio, entrevisto stakeholders y mapeo el dominio en diagramas de contexto. Defino requerimientos, restricciones y métricas de éxito.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Arquitectura",
    desc: "Diseño la columna vertebral del sistema: bounded contexts en DDD, aggregates, eventos, y contratos de API. Elijo el stack según el problema — no al revés.",
    icon: "🏗️",
  },
  {
    step: "03",
    title: "Desarrollo",
    desc: "Escribo código limpio con TDD, commits atómicos y PRs revisables. Integración continua, linters, tests automáticos y documentación viva del dominio.",
    icon: "⚡",
  },
  {
    step: "04",
    title: "Entrega & Monitoreo",
    desc: "Despliegue automatizado en cloud (Azure/AWS), monitoreo de performance, logs centralizados y retroalimentación continua para iterar rápido.",
    icon: "🚀",
  },
];

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

export const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "CTO en Fya Tech",
    quote:
      "Trabajar con Luis fue una experiencia excepcional. Su capacidad para traducir requisitos complejos en código limpio y escalable marcó una diferencia enorme en la plataforma IPS. Es el tipo de desarrollador que cualquier equipo quisiera tener.",
    avatar: null,
  },
  {
    name: "Ana Sofía Ramírez",
    role: "Product Manager en Fya Tech",
    quote:
      "Luis no solo escribe código — entiende el negocio. Sus optimizaciones de SQL redujeron los tiempos de carga del dashboard en más de un 35%. Siempre entregando antes de lo esperado.",
    avatar: null,
  },
  {
    name: "David Rincón",
    role: "Lead Developer en Campuslands",
    quote:
      "Vi a Luis crecer de intern a desarrollador full stack en pocos meses. Su dominio de Clean Architecture y TypeScript es impresionante para su nivel de experiencia. Un talento nato.",
    avatar: null,
  },
];

export const projects = [
  {
    title: "Atena IPS — Salud",
    description:
      "Plataforma completa para el sector salud: portal IPS con autogestión de pacientes y dashboard administrativo con analytics en tiempo real. Optimización de consultas SQL redujo tiempos de carga en un 35%.",
    tech: ["React", "Node.js", "AWS", "SQL Server", "TypeScript"],
    url: "https://orisut.com",
    urlLabel: "🌐 Portal IPS",
    url2: "https://atena.orisut.com",
    urlLabel2: "📊 Admin Dashboard",
    type: "work",
    featured: true,
    impact: "35% más rápido · 2,000+ pacientes gestionados",
    problem: "Los IPS del sector salud manejaban expedientes en papel y sistemas obsoletos, generando demoras de hasta 3 días en la gestión de citas y expedientes.",
    solution: "Arquitectura cloud en AWS con React en frontend y Node.js + SQL Server en backend. Dashboard administrativo con métricas en tiempo real y portal de autogestión para pacientes.",
  },
  {
    title: "Exo-Track — Tributario",
    description:
      "Automatización de declaraciones de renta y escaneo de archivo exógena DIAN. Reducción del 60% en tiempo de procesamiento tributario para contadores y sus clientes.",
    tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Docker", "TypeScript"],
    url: "https://exo-track.netlify.app",
    urlLabel: "🔗 App Demo",
    github: "https://github.com/LFDIAZDEV2209/exo-track-front",
    githubBack: "https://github.com/LFDIAZDEV2209/exo-track-back",
    type: "personal",
    featured: true,
    impact: "60% más rápido · Automatización total DIAN",
    problem: "Los procesos de declaración de renta y escaneo exógena DIAN tomaban horas de trabajo manual para contadores, con alto riesgo de error humano.",
    solution: "Dual frontend (cliente + admin) con Next.js y NestJS. Backend modular con PostgreSQL y Docker. Automatización del parsing de archivos exógena DIAN.",
  },
  {
    title: "Liora — E-commerce",
    description:
      "E-commerce moderno con experiencia de compra premium. Carrito persistente, panel admin y checkout optimizado. Diseñado para conversión.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    image: "/liora.png",
    url: "https://shop-classy.netlify.app",
    urlLabel: "🔗 Demo",
    github: "https://github.com/LFDIAZDEV2209/shop-classy",
    type: "personal",
    featured: false,
    impact: "UI/UX premium · Carrito persistente",
  },
  {
    title: "Pranalatam — Logística",
    description:
      "Plataforma corporativa para logística internacional con seguimiento en tiempo real, gestión de envíos y panel de administración.",
    tech: ["Angular", "Node.js", "TypeScript", "MySQL"],
    image: "/pranalatam.png",
    url: "https://pranalatam.netlify.app",
    urlLabel: "🔗 Demo",
    github: "https://github.com/LFDIAZDEV2209/pranalatam",
    type: "personal",
    featured: false,
    impact: "Seguimiento en vivo · Gestión multi-envíos",
  },
  {
    title: "Liceo Patria — Educación",
    description:
      "Portal institucional moderno con galería de eventos, comunicación con padres y sistema de información académica.",
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    image: "/liceo.png",
    url: "https://propuesta-liceo-patria.vercel.app",
    urlLabel: "🔗 Demo",
    github: "https://github.com/LFDIAZDEV2209/propuesta-liceo-patria",
    type: "personal",
    featured: false,
    impact: "Portal responsive · Comunicación integrada",
  },
  {
    title: "Heroes Cards — Juego",
    description:
      "App interactiva de colección de cartas con datos desde API JSON. Búsqueda en vivo, filtros por atributos y vista detalle de cada personaje.",
    tech: ["React", "TypeScript", "CSS Modules"],
    image: "/heroes.png",
    url: "https://heroes-cards.netlify.app",
    urlLabel: "🔗 Demo",
    github: "https://github.com/LFDIAZDEV2209/heroes-cards-json",
    type: "personal",
    featured: false,
    impact: "50+ personajes · Búsqueda en vivo",
  },
  {
    title: "Arena Fighter — Game",
    description:
      "Juego de arena con sistema de combates por turnos, leaderboard en tiempo real y animaciones fluidas. Estado persistente con MongoDB.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "/arena.png",
    url: "https://arena-heroes.netlify.app",
    urlLabel: "🔗 Demo",
    github: "https://github.com/LFDIAZDEV2209/arena-heroes",
    type: "personal",
    featured: false,
    impact: "Combates PvP · Leaderboard global",
  },
  {
    title: "LMS Platform — Educación",
    description:
      "Plataforma de gestión de aprendizaje con cursos interactivos, evaluaciones automáticas y dashboard de progreso para estudiantes y administradores.",
    tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL"],
    image: "/lms.png",
    url: "https://lms-portal-web.netlify.app",
    urlLabel: "🔗 Demo",
    github: "https://github.com/LFDIAZDEV2209/LMS-PORTAL",
    type: "personal",
    featured: false,
    impact: "Cursos interactivos · Progreso en vivo",
  },
];
