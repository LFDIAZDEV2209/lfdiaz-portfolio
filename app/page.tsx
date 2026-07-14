import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import EducationSection from "./sections/EducationSection";
import ContactSection from "./sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <TestimonialsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
