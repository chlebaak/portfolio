import { useState, useEffect, useRef } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { CustomCursor, CursorHoverSetup } from "./components/AdvancedGSAP";
import { ScrollProgress } from "./components/GSAPComponents";

import Navigation from "./components/sections/Navigation";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = [homeRef, projectsRef, aboutRef, contactRef];
    sections.forEach((section) => {
      if (section.current) observer.observe(section.current);
    });

    return () => {
      sections.forEach((section) => {
        if (section.current) observer.unobserve(section.current);
      });
    };
  }, []);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const refs = { homeRef, projectsRef, aboutRef, contactRef };

  return (
    <div className="min-h-[100svh] relative antialiased">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      <CursorHoverSetup />
      <CustomCursor />
      <ScrollProgress />

      <Navigation 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        refs={refs}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        <Hero 
          sectionRef={homeRef} 
          projectsRef={projectsRef} 
          contactRef={contactRef} 
          scrollToSection={scrollToSection} 
        />
        <Projects sectionRef={projectsRef} />
        <About sectionRef={aboutRef} />
        <Contact sectionRef={contactRef} />
      </main>

      <Footer scrollToSection={scrollToSection} refs={refs} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
