import { useState, useEffect, useRef } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import SmoothScroller from "./components/SmoothScroller";
import { GSAPAnimationProvider } from "./components/GSAPAnimations";
import { 
  CustomCursor, 
  FloatingParticles, 
  GSAPLoadingScreen,
  AdvancedGSAPAnimations
} from "./components/AdvancedGSAP";
import { ScrollProgress } from "./components/GSAPComponents";

import Navigation from "./components/sections/Navigation";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import FloatingGeometry from "./components/FloatingGeometry";


function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // References to sections
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Scroll spy - observe which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [homeRef, projectsRef, aboutRef, contactRef];
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      clearTimeout(timer);
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const refs = { homeRef, projectsRef, aboutRef, contactRef };

  if (isLoading) {
    return <GSAPLoadingScreen />;
  }

  return (
    <div className="min-h-[100svh] relative cursor-none antialiased selection:bg-white/20 selection:text-white">
      {/* Global fixed ambient background */}
      <FloatingGeometry />

      <AdvancedGSAPAnimations />
      <CustomCursor />
      <FloatingParticles count={10} />
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
    <SmoothScroller>
      <LanguageProvider>
        <GSAPAnimationProvider>
          <AppContent />
        </GSAPAnimationProvider>
      </LanguageProvider>
    </SmoothScroller>
  );
}
