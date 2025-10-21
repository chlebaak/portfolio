import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe
} from "react-icons/fi";
import { BiMenuAltRight } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import FloatingGeometry from "./components/FloatingGeometry";
import { 
  ScrollProgress, 
  RevealText, 
  StaggeredList, 
  ParallaxElement, 
  ScaleOnScroll, 
  MagneticButton, 
  AnimatedCounter 
} from "./components/GSAPComponents";
import { 
  AdvancedGSAPAnimations, 
  CustomCursor, 
  FloatingParticles, 
  SplitText,
  RevealUp,
  GSAPLoadingScreen 
} from "./components/AdvancedGSAP";
import { 
  GSAPAnimationProvider, 
  GSAPTimeline 
} from "./components/GSAPAnimations";
import logo from "./assets/logo_vector.png";
import project2Image from "./assets/image.png";
import project1Image from "./assets/project1.png";
import emailjs from "@emailjs/browser";
import "./App.css";
import pfp from "./assets/image0.jpg";

const LanguageContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const translations = {
    en: {
      nav: {
        home: "home",
        projects: "projects",
        about: "about",
        contact: "contact",
      },
      hero: {
        badge: "Frontend developer",
        title1: "Web",
        title2: "Designer &",
        title3: "Developer",
        description:
          "Transforming ideas into exceptional digital experiences through clean code, thoughtful design, and attention to detail.",
        cta1: "View My Work",
        cta2: "Contact Me",
        stats: {
          years: "Years",
          projects: "Projects",
          clients: "Clients",
        },
        scroll: "Scroll down",
      },
      projects: {
        subtitle: "My Work",
        title: "Selected Projects",
        viewAll: "View All Projects",
        viewProject: "View Project",
      },
      about: {
        subtitle: "Who Am I",
        title: "About Me",
        heading: "I'm a passionate developer based in Czech Republic",
        description:
          "With over 4 years of experience in web development, I specialize in creating engaging digital experiences that connect brands with their audiences. My approach combines clean code with thoughtful design to deliver projects that exceed expectations.",
        skills: "Skills",
        experience: "Experience",
        download: "Download CV",
        badge: "4+ Years Experience",
      },
      contact: {
        subtitle: "Say Hello",
        title: "Get In Touch",
        infoTitle: "Contact Information",
        infoDesc:
          "Feel free to reach out if you're looking for a developer, have a question, or just want to connect.",
        email: "Email",
        phone: "Phone",
        location: "Ústí nad Labem, Czech Republic",
        connect: "Connect with me",
        formTitle: "Send Me a Message",
        formDesc:
          "Have a project in mind? Let's discuss how I can help bring your ideas to life.",
        formName: "Your Name",
        formEmail: "Your Email",
        formMessage: "Your Message",
        formButton: "Send Message",
        formSending: "Sending...",
        formSuccess: "Message sent successfully! I'll get back to you soon.",
        formError:
          "Failed to send message. Please try again or contact me directly.",
      },
      footer: {
        description:
          "Crafting elegant digital experiences through clean code and thoughtful design.",
        rights: "All rights reserved.",
        navigation: "Navigation",
        connect: "Connect",
        follow: "Follow",
        design: "Designed with care and attention to detail",
        backToTop: "Back to top",
      },
      common: {
        statistics: "Statistics",
        techStack: "Tech Stack",
        available: "Available for projects",
        jobTitle: "Frontend Developer",
        location: "Location",
        clickToSend: "Click to send",
        clickToCall: "Click to call",
        czechRepublic: "Czech Republic",
        currentlyAccepting: "Currently accepting new freelance projects and collaborations.",
        name: "Name",
        yourName: "Your name",
        yourEmail: "your@email.com",
        tellMeAbout: "Tell me about your project...",
        messageSentSuccess: "Message sent successfully!",
        getBackWithin: "I'll get back to you within 24 hours.",
        failedToSend: "Failed to send message",
        tryAgainOrContact: "Please try again or contact me directly.",
        sending: "Sending...",
        years: "Years",
        projects: "Projects", 
        clients: "Clients",
        viewProject: "View Project",
      },
    },
    cs: {
      nav: {
        home: "DOMŮ",
        projects: "PROJEKTY",
        about: "O MĚ",
        contact: "KONTAKT",
      },
      hero: {
        badge: "Frontend vývojář",
        title1: "Webový",
        title2: "Designér &",
        title3: "Vývojář",
        description:
          "Přetvářím nápady v jedinečné digitální projekty pomocí čistého kódu, promyšleného designu a zaměření na detaily.",
        cta1: "Moje práce",
        cta2: "Kontaktujte mě",
        stats: {
          years: "Let",
          projects: "Projektů",
          clients: "Klientů",
        },
        scroll: "Posunout dolů",
      },
      projects: {
        subtitle: "Moje práce",
        title: "Vybrané projekty",
        viewAll: "Zobrazit všechny projekty",
        viewProject: "Zobrazit projekt",
      },
      about: {
        subtitle: "Kdo jsem",
        title: "O mně",
        heading: "Jsem vášnivý vývojář z České republiky",
        description:
          "S více než 4 lety zkušeností ve vývoji webových aplikací se specializuji na vytváření poutavých digitálních zážitků, které propojují značky s jejich publikem. Můj přístup kombinuje čistý kód s promyšleným designem, abych dodal projekty překonávající očekávání.",
        skills: "Dovednosti",
        experience: "Zkušenosti",
        download: "Stáhnout CV",
        badge: "4+ let zkušeností",
      },
      contact: {
        subtitle: "Řekněte ahoj",
        title: "Kontaktujte mě",
        infoTitle: "Kontaktní informace",
        infoDesc:
          "Neváhejte mě kontaktovat, pokud hledáte vývojáře, máte otázku nebo se jen chcete spojit.",
        email: "Email",
        phone: "Telefon",
        location: "Ústí nad Labem, Česká republika",
        connect: "Spojte se se mnou",
        formTitle: "Pošlete mi zprávu",
        formDesc:
          "Máte v hlavě projekt? Pojďme probrat, jak mohu pomoci přetvořit vaše nápady v realitu.",
        formName: "Vaše jméno",
        formEmail: "Váš email",
        formMessage: "Vaše zpráva",
        formButton: "Odeslat zprávu",
        formSending: "Odesílání...",
        formSuccess: "Zpráva byla úspěšně odeslána! Brzy se vám ozvu.",
        formError:
          "Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo mě kontaktujte přímo.",
      },
      footer: {
        description:
          "Vytvářím elegantní digitální zážitky prostřednictvím čistého kódu a promyšleného designu.",
        rights: "Všechna práva vyhrazena.",
        navigation: "Navigace",
        connect: "Kontakt",
        follow: "Sledujte mě",
        design: "Navrženo s péčí a důrazem na detail",
        backToTop: "Zpět nahoru",
      },
      common: {
        statistics: "Statistiky",
        techStack: "Technologie", 
        available: "Dostupný pro projekty",
        jobTitle: "Frontend Vývojář",
        location: "Lokace",
        clickToSend: "Klikněte pro odeslání",
        clickToCall: "Klikněte pro volání",
        czechRepublic: "Česká republika",
        currentlyAccepting: "V současné době přijímám nové freelance projekty a spolupráce.",
        name: "Jméno",
        yourName: "Vaše jméno",
        yourEmail: "váš@email.cz",
        tellMeAbout: "Napište mi o vašem projektu...",
        messageSentSuccess: "Zpráva byla úspěšně odeslána!",
        getBackWithin: "Ozvu se vám do 24 hodin.",
        failedToSend: "Nepodařilo se odeslat zprávu",
        tryAgainOrContact: "Zkuste to prosím znovu nebo mě kontaktujte přímo.",
        sending: "Odesílání...",
        years: "Let",
        projects: "Projektů",
        clients: "Klientů", 
        viewProject: "Zobrazit projekt",
      },
    },
  };

  // Přidání jazykového stavu
  const [language, setLanguage] = useState(() => {
    // Načtení jazykového nastavení z localStorage nebo výchozí hodnota 'cs'
    return localStorage.getItem("language") || "cs";
  });

  // Funkce pro přepínání jazyka
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "cs" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // Funkce pro získání překladu
  const t = (key) => {
    const keys = key.split(".");
    let translation = translations[language];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key;
      }
    }

    return translation;
  };

  // References to sections
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll animation
  const { scrollYProgress } = useScroll();
  const progressOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1],
    [0, 0.5, 1]
  );
  
  // Parallax transforms
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

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

  const projects = [
    {
      id: 1,
      title: "Sociální síť pro čtenáře",
      category: "Full stack",
      description:
        "Kompletní sociální síť pro čtenáře knih s možností sdílení oblíbených knih, recenzí a komentářů.",
      image: project1Image,
      tech: [
        "React",
        "Node.js/Express.js",
        "Javascript",
        "PosgreSQL",
        "Tailwind CSS",
      ],
      url: "https://knihotok.vercel.app/",
    },
    {
      id: 2,
      title: "Restaurace refugio",
      category: "Frontend",
      description:
        "Moderní a responzivní webová stránka pro restauraci Refugio, vytvořená s důrazem na uživatelskou přívětivost a estetiku.",
      image: project2Image,
      tech: [
        "React/Vite",
        "Tailwind CSS",
        "Javascript",
        "Figma",
      ],
      url: "https://refugio-ruddy.vercel.app",
    },
  ];

  if (isLoading) {
    return (
      <GSAPLoadingScreen />
    );
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <GSAPAnimationProvider>
        <div className="bg-black text-stone-100 min-h-screen relative cursor-none">
          {/* Advanced GSAP Animations */}
          <AdvancedGSAPAnimations />
          
          {/* Custom Cursor */}
          <CustomCursor />
          
          {/* Floating Particles */}
          <FloatingParticles count={10} />
          
          {/* GSAP Scroll Progress */}
          <ScrollProgress />

        {/* Progress bar with earth tones */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-stone-600/50 via-amber-700 to-stone-600/50 z-50"
          style={{
            scaleX: scrollYProgress,
            opacity: progressOpacity,
            transformOrigin: "0%",
          }}
        />

        {/* Modern Black & White Navigation Header */}
<header className="fixed top-0 left-0 right-0 backdrop-blur-md bg-black/90 border-b border-white/10 z-50">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Minimalist Logo */}
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img 
          src={logo} 
          alt="Jan Fiala" 
          className="h-8 w-8"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        />
        <div className="text-xl font-light tracking-wide">
          <span className="text-white">JAN</span>
          <span className="text-gray-400 ml-1">FIALA</span>
        </div>
      </motion.div>
      
      {/* Desktop Navigation */}
      <motion.nav 
        className="hidden md:flex items-center space-x-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          { name: t('nav.home'), ref: homeRef },
          { name: t('nav.projects'), ref: projectsRef },
          { name: t('nav.about'), ref: aboutRef },
          { name: t('nav.contact'), ref: contactRef }
        ].map((item) => (
          <motion.button 
            key={item.name}
            onClick={() => scrollToSection(item.ref)}
            className={`relative text-sm font-medium transition-colors duration-200 ${
              activeSection === item.name.toLowerCase() 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {item.name}
            {activeSection === item.name.toLowerCase() && (
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white"
                layoutId="underline"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </motion.nav>
      
      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Language Toggle */}
        <motion.button
          onClick={toggleLanguage}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiGlobe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {language === 'cs' ? 'EN' : 'CS'}
          </span>
        </motion.button>
        
        {/* Social Icons */}
        <div className="flex items-center space-x-2">
          {[
            { icon: <FiGithub />, href: "https://github.com/chlebaak" },
            { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/janfiala331/" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {mobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✕
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BiMenuAltRight className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  </div>
</header>

{/* Modern Mobile Menu */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div 
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setMobileMenuOpen(false)}
    >
      <div className="flex flex-col h-full px-6 py-20" onClick={(e) => e.stopPropagation()}>
        <nav className="flex-1 flex flex-col justify-center space-y-8">
          {[
            { name: t('nav.home'), ref: homeRef },
            { name: t('nav.projects'), ref: projectsRef },
            { name: t('nav.about'), ref: aboutRef },
            { name: t('nav.contact'), ref: contactRef }
          ].map((item, i) => (
            <motion.button
              key={item.name}
              onClick={() => {
                scrollToSection(item.ref);
                setMobileMenuOpen(false);
              }}
              className="text-left group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <motion.div
                className="text-2xl sm:text-3xl font-light text-white group-hover:text-gray-300 transition-colors duration-200 flex items-center"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{item.name}</span>
                <motion.span
                  className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <HiOutlineArrowNarrowRight className="w-5 h-5" />
                </motion.span>
              </motion.div>
            </motion.button>
          ))}
        </nav>
        
        {/* Language toggle for mobile */}
        <motion.button
          onClick={toggleLanguage}
          className="absolute top-20 right-6 flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-md text-white hover:bg-white/20 transition-colors duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiGlobe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === 'cs' ? 'EN' : 'CS'}</span>
        </motion.button>

        {/* Social icons */}
        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-gray-400 text-xs uppercase tracking-widest mb-4">
            {t('footer.connect')}
          </div>
          <div className="flex space-x-6">
            <motion.a
              href="https://github.com/chlebaak"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub className="w-6 h-6" />
            </motion.a>
           
            <motion.a
              href="https://www.linkedin.com/in/janfiala331/"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLinkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiInstagram className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

        {/* Main Content */}
        <main>
        <section
  id="home"
  ref={homeRef}
  className="min-h-screen relative overflow-hidden bg-black pt-20 pb-12"
>
  {/* 3D Floating Geometry Background */}
  <FloatingGeometry />
  
  {/* Minimal background elements */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900/5" />
    <div className="absolute top-32 left-16 w-px h-20 bg-white/5 rotate-45" />
    <div className="absolute bottom-32 right-20 w-px h-16 bg-white/5 -rotate-45" />
  </div>

  <div className="container mx-auto px-6 lg:px-8 relative z-10 flex items-center min-h-screen">
    <div className="w-full max-w-7xl mx-auto">
      
      {/* Simple Bento Grid - 3x3 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
        
        {/* Main Hero Card - Spans 2 columns */}
        <motion.div
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 flex flex-col justify-center min-h-[400px] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <FloatingGeometry />
          <div className="relative z-10">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="bg-white text-black text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <RevealText className="text-white block">{t('hero.title1')}</RevealText>
              <RevealText className="text-white block">{t('hero.title2')}</RevealText>
              <RevealText className="text-white/60 block">{t('hero.title3')}</RevealText>
            </motion.h1>

            <motion.p
              className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <MagneticButton
                className="magnetic-button group px-8 py-4 bg-white text-black rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-all duration-200"
                onClick={() => scrollToSection(projectsRef)}
              >
                {t('hero.cta1')}
                <HiOutlineArrowNarrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </MagneticButton>

              <MagneticButton
                className="magnetic-button px-8 py-4 rounded-2xl border border-white/30 text-white font-medium hover:bg-white/5 transition-all duration-200"
                onClick={() => scrollToSection(contactRef)}
              >
                {t('hero.cta2')}
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative z-10">
            <div className="relative w-40 h-40 mb-8 mx-auto group"> 
              {/* Sleek gradient ring background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-3xl blur-sm group-hover:blur-none transition-all duration-500" />
              
              {/* Modern profile image container with enhanced effects */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/30 group-hover:border-white/50 transition-all duration-500 shadow-2xl group-hover:shadow-white/10">
                <img 
                  src={pfp}
                  alt="Jan Fiala"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter brightness-105"
                />
                {/* Sophisticated overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Elegant status indicator with glow */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-3 border-black shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-sm" />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-white/20 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-white/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
            </div>
            <h3 className="text-white font-medium text-xl mb-2">Jan Fiala</h3>
            <p className="text-white/60 text-base mb-4">{t('common.jobTitle')}</p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/60 text-sm">{t('common.available')}</span>
            </div>
            
            {/* Location */}
            <div className="flex items-center justify-center gap-2 text-white/50">
              <FiMapPin className="w-4 h-4" />
              <span className="text-sm">{t('common.czechRepublic')}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col justify-center min-h-[200px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-6 text-center">{t('common.statistics')}</h4>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 4, label: t('common.years') },
              { value: 20, label: t('common.projects') },
              { value: 5, label: t('common.clients') }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-light text-white mb-1">
                  <span className="counter" data-target={stat.value}>0</span>
                  <span>+</span>
                </div>
                <span className="text-xs text-white/40 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Card */}
        <motion.div
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center min-h-[260px] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-white font-medium text-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-sm">⚡</span>       
                </div>
                {t('common.techStack')}
              </h4>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Node.js', 'JavaScript', 'Typescript', 'PostgreSQL ', 'SQL', 'C#', '.NET', "Figma", "Git", "PHP", "UI/UX", ].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="bg-white/8 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/12 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-white/85 text-sm font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="flex items-center justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-white/30 mb-3">
            {t('hero.scroll')}
          </span>
          <div className="w-px h-8 bg-white/20 relative">
            <motion.div
              className="w-px h-2 bg-white absolute top-0"
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

{/* Modern Black & White Projects Section */}
<section
  id="projects"
  ref={projectsRef}
  className="section-fade py-20 sm:py-24 relative overflow-hidden bg-black border-t border-white/10"
>
  {/* Minimal background elements with parallax */}
  <div className="absolute inset-0">
    <motion.div
      className="absolute top-32 right-16 w-px h-20 bg-white/5 rotate-45"
      style={{ y: parallaxY1 }}
    />
    <motion.div
      className="absolute bottom-32 left-16 w-px h-16 bg-white/5 -rotate-45"
      style={{ y: parallaxY2 }}
    />
    <motion.div
      className="absolute top-1/2 left-1/3 w-12 h-px bg-white/5"
      style={{ y: parallaxY3 }}
    />
  </div>

  <div className="container mx-auto px-6 lg:px-8 relative z-10">
    {/* Modern Section header */}
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 block mb-6">
        {t('projects.subtitle')}
      </span>
      
      <h2 className="text-reveal text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
        {t('projects.title')}
      </h2>
      
      <div className="w-16 h-px bg-white/20 mx-auto" />
    </motion.div>

    {/* Projects grid - modern layout with GSAP animations */}
    <GSAPTimeline className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {projects.map((project, index) => (
        <div key={project.id} className="project-card-gsap">
          <ProjectCard project={project} index={index} />
        </div>
      ))}
    </GSAPTimeline>
  </div>
</section>

          {/* Modern Black & White About Section */}
          <section
  id="about"
  ref={aboutRef}
  className="section-fade py-20 sm:py-24 relative overflow-hidden bg-black border-t border-white/10"
>
  {/* Minimal geometric background elements */}
  <div className="absolute inset-0">
    <div className="parallax-slow absolute top-20 left-8 w-px h-24 bg-white/5 rotate-45" />
    <div className="parallax-slow absolute bottom-20 right-8 w-px h-20 bg-white/5 -rotate-45" />
    <div className="parallax-slow absolute top-1/2 left-1/4 w-16 h-px bg-white/5" />
    <div className="parallax-slow absolute top-1/3 right-1/3 w-2 h-2 border border-white/10 rotate-45" />
  </div>

  <div className="container mx-auto px-6 lg:px-8 relative z-10">
    {/* Modern Section Header */}
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 block mb-6">
        {t('about.subtitle')}
      </span>
      
      <h2 className="text-reveal text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
        {t('about.title')}
      </h2>
      
      <div className="w-16 h-px bg-white/20 mx-auto" />
    </motion.div>

    {/* Single Column Content Layout */}
    <div className="max-w-4xl mx-auto">
      
      {/* Experience Badge - Centered */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white text-black px-6 py-3 rounded-2xl text-sm font-medium shadow-lg">
          {t('about.badge')}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Modern heading with centered alignment */}
        <div className="mb-12">
          <SplitText className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            {t('about.heading')}
          </SplitText>
          <div className="w-16 h-0.5 bg-white/60 mx-auto mb-8" />
          <p className="text-white/60 text-xl leading-relaxed max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Modern Two-Column Skills & Experience Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          
          {/* Skills Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center">
                  <span className="text-lg">💻</span>
                </div>
                <h4 className="text-2xl font-medium text-white">{t('about.skills')}</h4>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {['Vite / React / Next.js', 'JavaScript / C#', 'Tailwind CSS', 'Node.js / Express.js', 'UI/UX Design', 'PostgreSQL'].map((skill) => (
                <div
                  key={skill}
                  className="skill-item bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <span className="text-white/80 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center">
                  <span className="text-lg">💼</span>
                </div>
                <h4 className="text-2xl font-medium text-white">{t('about.experience')}</h4>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { company: 'DPMÚL', role: 'Internship', period: '2023' },
                { company: 'DS Smith', role: 'Internship', period: '2024' }
              ].map((exp, index) => (
                <motion.div
                  key={exp.company}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div>
                    <h5 className="text-white font-medium">{exp.role} at {exp.company}</h5>
                    <p className="text-white/60 text-sm">{exp.period}</p>
                  </div>
                  <div className="w-3 h-3 bg-white/40 rounded-full" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Modern CTA Button - Centered */}
        <div className="flex justify-center">
          <MagneticButton className="magnetic-button group inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-medium transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:shadow-white/10">
            <span className="text-lg">{t('about.download')}</span>
            <div className="w-6 h-6 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <HiOutlineArrowNarrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Modern Black & White Contact Section */}
<section
  id="contact"
  ref={contactRef}
  className="section-fade py-20 sm:py-24 relative overflow-hidden bg-black border-t border-white/10"
>
  {/* Minimal geometric background elements */}
  <div className="absolute inset-0">
    <div className="parallax-slow absolute top-16 left-16 w-px h-32 bg-white/5 rotate-45" />
    <div className="parallax-slow absolute bottom-16 right-16 w-px h-24 bg-white/5 -rotate-45" />
    <div className="parallax-slow absolute top-1/3 right-1/4 w-20 h-px bg-white/5" />
    <div className="parallax-slow absolute bottom-1/3 left-1/3 w-4 h-4 border border-white/10 rotate-45" />
  </div>

  <div className="container mx-auto px-6 lg:px-8 relative z-10">
    {/* Modern Section Header */}
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 block mb-6">
        {t('contact.subtitle')}
      </span>
      
      <h2 className="text-reveal text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
        {t('contact.title')}
      </h2>
      
      <div className="w-16 h-px bg-white/20 mx-auto" />
    </motion.div>

    {/* Modern Single Column Layout */}
    <div className="max-w-5xl mx-auto">
      
      {/* Contact Methods - Horizontal Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* Email Card */}
        <motion.a
          href="mailto:janfiala331@gmail.com"
          className="group relative bg-black border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FiMail className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{t('contact.email')}</h3>
            <p className="text-white/60 text-sm mb-3">janfiala331@gmail.com</p>
            <div className="text-xs text-white/40 uppercase tracking-wider">{t('common.clickToSend')}</div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.a>

        {/* Phone Card */}
        <motion.a
          href="tel:+420733164585"
          className="group relative bg-black border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FiPhone className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{t('contact.phone')}</h3>
            <p className="text-white/60 text-sm mb-3">+420 733 164 585</p>
            <div className="text-xs text-white/40 uppercase tracking-wider">{t('common.clickToCall')}</div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.a>

        {/* Location Card */}
        <motion.div
          className="group relative bg-black border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FiMapPin className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{t('common.location')}</h3>
            <p className="text-white/60 text-sm mb-3">{t('contact.location')}</p>
            <div className="text-xs text-white/40 uppercase tracking-wider">{t('common.czechRepublic')}</div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.div>
      </motion.div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column - Contact Info */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-8">
            <div>
              <RevealUp>
                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4">
                  {t('contact.infoTitle')}
                </h3>
              </RevealUp>
              <div className="w-12 h-0.5 bg-white/60 mb-6" />
              <p className="text-white/60 text-lg leading-relaxed">
                {t('contact.infoDesc')}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-8">
              <h4 className="text-white/40 text-sm uppercase tracking-[0.2em] mb-6">
                {t('contact.connect')}
              </h4>
              <div className="flex gap-4">
                {[
                  { Icon: FiGithub, href: "https://github.com/chlebaak", label: "GitHub" },
                  { Icon: FiLinkedin, href: "https://www.linkedin.com/in/janfiala331/", label: "LinkedIn" },
                  { Icon: FiInstagram, href: "#", label: "Instagram" }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="group w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <social.Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white font-medium">{t('common.available')}</span>
              </div>
              <p className="text-white/60 text-sm">
                {t('common.currentlyAccepting')}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10">
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-light text-white mb-4">
                {t('contact.formTitle')}
              </h3>
              <div className="w-12 h-0.5 bg-white/60 mb-6" />
              <p className="text-white/60 text-lg leading-relaxed">
                {t('contact.formDesc')}
              </p>
            </div>
            
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>
        </main>

        {/* Revolutionary Modern Footer Design */}
        <footer className="relative overflow-hidden bg-black">
  {/* Innovative Border Design */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
  
  {/* Minimal Geometric Background */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-16 w-1 h-32 bg-white/5 transform rotate-12" />
    <div className="absolute bottom-20 right-16 w-1 h-24 bg-white/5 transform -rotate-12" />
    <div className="absolute top-1/2 left-1/2 w-64 h-px bg-white/5 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
  </div>

  <div className="container mx-auto px-6 lg:px-8 relative z-10">
    
    {/* Main Footer Content - Asymmetrical Grid */}
    <div className="pt-20 pb-12 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
      
      {/* Brand Column - Takes 2 columns on large screens */}
      <motion.div
        className="lg:col-span-2 space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* Innovative Logo Design */}
        <div className="space-y-6">
          <motion.div
            className="group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection(homeRef)}
          >
            <div className="text-4xl sm:text-5xl font-extralight tracking-[-0.02em] mb-4">
              <span className="text-white">JAN</span>
              <span className="text-white/30 ml-2">FIALA</span>
            </div>
            <div className="w-16 h-0.5 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>

          <p className="text-white/50 text-lg leading-relaxed max-w-md">
            {t('footer.description')}
          </p>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl max-w-fit">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30" />
            </div>
            <span className="text-white/80 text-sm font-medium">{t('common.available')}</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Column */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h4 className="text-white/40 text-xs uppercase tracking-[0.3em] mb-8">
          {t('footer.navigation')}
        </h4>
        
        <nav className="space-y-4">
          {[
            { name: t('nav.home'), ref: homeRef, number: '01' },
            { name: t('nav.projects'), ref: projectsRef, number: '02' },
            { name: t('nav.about'), ref: aboutRef, number: '03' },
            { name: t('nav.contact'), ref: contactRef, number: '04' },
          ].map((item) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.ref)}
              className="group flex items-center gap-4 text-left w-full hover:translate-x-2 transition-transform duration-300"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-white/20 text-xs font-mono w-6">{item.number}</span>
              <span className="text-white/60 group-hover:text-white font-medium transition-colors duration-300">
                {item.name}
              </span>
              <div className="flex-1 h-px bg-white/10 group-hover:bg-white/30 transition-colors duration-300" />
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Contact & Social Column */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h4 className="text-white/40 text-xs uppercase tracking-[0.3em]">
          {t('footer.connect')}
        </h4>

        {/* Contact Links - Modern Card Style */}
        <div className="space-y-3">
          <motion.a
            href="mailto:janfiala331@gmail.com"
            className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiMail className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            <span className="text-white/60 group-hover:text-white text-sm font-medium transition-colors">
              {t('contact.email')}
            </span>
          </motion.a>

          <motion.a
            href="tel:+420733164585"
            className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPhone className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            <span className="text-white/60 group-hover:text-white text-sm font-medium transition-colors">
              {t('contact.phone')}
            </span>
          </motion.a>

          <motion.div
            className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl"
          >
            <FiMapPin className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-sm font-medium">
              {t('common.czechRepublic')}
            </span>
          </motion.div>
        </div>

        {/* Social Media - Floating Design */}
        <div className="space-y-4">
          <h5 className="text-white/40 text-xs uppercase tracking-[0.2em]">
            {t('footer.follow')}
          </h5>
          <div className="flex gap-3">
            {[
              { Icon: FiGithub, href: "https://github.com/chlebaak", label: "GitHub" },
              { Icon: FiLinkedin, href: "https://www.linkedin.com/in/janfiala331/", label: "LinkedIn" },
              { Icon: FiInstagram, href: "https://www.instagram.com/honzafiala_/", label: "Instagram" }
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="group relative w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 overflow-hidden"
                whileHover={{ 
                  y: -6, 
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
              >
                <social.Icon className="w-4 h-4 relative z-10" />
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-white/5 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>

    {/* Bottom Section - Modern Minimal */}
    <motion.div
      className="pt-8 pb-8 border-t border-white/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <p className="text-white/30 text-xs font-mono">
            © {new Date().getFullYear()} Jan Fiala
          </p>
          <div className="w-px h-4 bg-white/20" />
          <p className="text-white/30 text-xs">
            {t('footer.rights')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-white/30 text-xs">
            {t('footer.design')}
          </p>
          
          {/* Back to Top - Integrated Design */}
          <motion.button
            onClick={() => scrollToSection(homeRef)}
            className="group flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-medium hover:bg-white/90 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{t('footer.backToTop')}</span>
            <motion.div
              className="w-4 h-4 flex items-center justify-center"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  </div>
</footer>
        </div>
      </GSAPAnimationProvider>
    </LanguageContext.Provider>
  );
}

function ProjectCard({ project }) {
  const { t } = useContext(LanguageContext);
  const { title, category, description, image, tech, url } = project;

  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Modern Project Card */}
      <div className="relative bg-black border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-2">
        
        {/* Project Image */}
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
            {category}
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Title and description */}
          <div className="mb-4">
            <h3 className="text-xl font-light text-white mb-2 group-hover:text-white transition-colors">
              {title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.map((item) => (
              <span
                key={item}
                className="px-2 py-1 text-xs text-white/70 border border-white/20 rounded-md font-medium"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Action button */}
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 group/link"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{t('common.viewProject')}</span>
            <HiOutlineArrowNarrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </motion.a>
        </div>

        {/* Subtle hover indicator */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </motion.div>
  );
}



function ContactForm() {
  const { t, language } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field - should remain empty
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const formRef = useRef();
  
  // Anti-spam ochrana
  const COOLDOWN_TIME = 60000; // 1 minuta v milisekundách
  const MAX_ATTEMPTS = 3; // Maximum 3 pokusy za hodinu
  const HOUR_MS = 60 * 60 * 1000; // 1 hodina v milisekundách

  // Funkce pro kontrolu rate limitu
  const checkRateLimit = () => {
    const now = Date.now();
    const attempts = JSON.parse(localStorage.getItem('emailAttempts') || '[]');
    
    // Vyčistit staré pokusy (starší než 1 hodina)
    const recentAttempts = attempts.filter(timestamp => now - timestamp < HOUR_MS);
    localStorage.setItem('emailAttempts', JSON.stringify(recentAttempts));
    
    // Kontrola počtu pokusů
    if (recentAttempts.length >= MAX_ATTEMPTS) {
      return false;
    }
    
    // Kontrola cooldown periody
    const lastAttempt = localStorage.getItem('lastEmailAttempt');
    if (lastAttempt && now - parseInt(lastAttempt) < COOLDOWN_TIME) {
      const remaining = COOLDOWN_TIME - (now - parseInt(lastAttempt));
      setCooldownRemaining(Math.ceil(remaining / 1000));
      return false;
    }
    
    return true;
  };

  // Funkce pro zaznamenání pokusu
  const recordAttempt = () => {
    const now = Date.now();
    const attempts = JSON.parse(localStorage.getItem('emailAttempts') || '[]');
    attempts.push(now);
    localStorage.setItem('emailAttempts', JSON.stringify(attempts));
    localStorage.setItem('lastEmailAttempt', now.toString());
  };

  // Cooldown timer effect
  useEffect(() => {
    let interval;
    if (cooldownRemaining > 0) {
      interval = setInterval(() => {
        setCooldownRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Honeypot kontrola - pokud je vyplněné, je to bot
    if (formData.website) {
      console.log("Spam bot detected via honeypot");
      setSubmitStatus("honeypot");
      return;
    }
    
    // Anti-spam kontrola
    if (!checkRateLimit()) {
      if (cooldownRemaining > 0) {
        setSubmitStatus("cooldown");
      } else {
        setSubmitStatus("rateLimit");
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Zaznamenat pokus
    recordAttempt();

    // EmailJS service integration
    emailjs
      .sendForm(
        "service_2yp7s7k",
        "template_xu7xrj9",
        formRef.current,
        "1zn4cKqrcAjcGKLdv"
      )
      .then(() => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "", website: "" });
      })
      .catch((error) => {
        console.error("Email send failed:", error);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-white/70">
          {t('common.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
          placeholder={t('common.yourName')}
          required
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white/70">
          {t('contact.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
          placeholder={t('common.yourEmail')}
          required
        />
      </div>

      {/* Honeypot Field - Hidden from users, visible to bots */}
      <input
        type="text"
        id="website"
        name="website"
        value={formData.website}
        onChange={handleChange}
        style={{ 
          position: 'absolute',
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
          tabIndex: -1
        }}
        autoComplete="off"
        placeholder="Leave this field empty"
        aria-hidden="true"
      />

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-white/70">
          {t('contact.formMessage')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200 resize-none"
          placeholder={t('common.tellMeAbout')}
          required
        />
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <p className="text-green-400 text-sm font-medium">{t('common.messageSentSuccess')}</p>
          <p className="text-white/60 text-xs mt-1">{t('common.getBackWithin')}</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400 text-sm font-medium">{t('common.failedToSend')}</p>
          <p className="text-white/60 text-xs mt-1">{t('common.tryAgainOrContact')}</p>
        </div>
      )}

      {submitStatus === "cooldown" && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <p className="text-yellow-400 text-sm font-medium">
            {language === 'cs' ? 'Příliš rychlé odesílání' : 'Too fast sending'}
          </p>
          <p className="text-white/60 text-xs mt-1">
            {language === 'cs' 
              ? `Počkejte prosím ${cooldownRemaining} sekund před dalším pokusem.`
              : `Please wait ${cooldownRemaining} seconds before trying again.`
            }
          </p>
        </div>
      )}

      {submitStatus === "rateLimit" && (
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <p className="text-orange-400 text-sm font-medium">
            {language === 'cs' ? 'Příliš mnoho pokusů' : 'Too many attempts'}
          </p>
          <p className="text-white/60 text-xs mt-1">
            {language === 'cs' 
              ? 'Dosáhli jste maximálního počtu pokusů za hodinu. Zkuste to později.'
              : 'You have reached the maximum number of attempts per hour. Please try again later.'
            }
          </p>
        </div>
      )}

      {submitStatus === "honeypot" && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400 text-sm font-medium">
            {language === 'cs' ? 'Podezřelá aktivita' : 'Suspicious activity'}
          </p>
          <p className="text-white/60 text-xs mt-1">
            {language === 'cs' 
              ? 'Vaše zpráva byla označena jako spam.'
              : 'Your message has been flagged as spam.'
            }
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || cooldownRemaining > 0}
        className="w-full bg-white text-black py-4 px-6 rounded-xl font-medium text-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            <span>{t('common.sending')}</span>
          </>
        ) : cooldownRemaining > 0 ? (
          <>
            <span>
              {language === 'cs' 
                ? `Počkejte ${cooldownRemaining}s` 
                : `Wait ${cooldownRemaining}s`
              }
            </span>
          </>
        ) : (
          <>
            <span>{t('contact.formButton')}</span>
            <HiOutlineArrowNarrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}



export default App;
