import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorEffect from "./components/CursorEffect";
import GSAPScrollInit from "./components/GSAPScrollInit";
import LenisSmoothScroll from "./components/LenisSmoothScroll";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luis Felipe Díaz | Full Stack Developer",
  description:
    "Portfolio profesional de Luis Felipe Díaz - Desarrollador Full Stack especializado en Clean Architecture, DDD y Microservicios. 3 años de experiencia construyendo soluciones escalables.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    ".NET",
    "TypeScript",
    "Desarrollador web",
    "Colombia",
  ],
  openGraph: {
    title: "Luis Felipe Díaz | Full Stack Developer",
    description:
      "Desarrollador Full Stack especializado en Clean Architecture. 3 años de experiencia.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <div className="scanline" />
        <div className="noise-overlay" />
        <CursorEffect />
        <GSAPScrollInit />
        <LenisSmoothScroll />
        <LoadingScreen />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
