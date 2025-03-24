import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe
} from "react-icons/fi";
import { BiMenuAltRight } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import "./App.css";
import emailjs from "@emailjs/browser";
import profileImage from "./assets/jfpfp.jpg"; // Upravte cestu podle vašeho pojmenování
import profileImage2 from "./assets/pfp3.png"; // Upravte cestu podle vašeho pojmenování
import project1Image from "./assets/project1.png";
import logo from "./assets/JF.png";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const LanguageContext = createContext();

  const translations = {
    en: {
      nav: {
        home: "home",
        projects: "projects",
        about: "about",
        contact: "contact",
      },
      hero: {
        badge: "Full stack developer",
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
          "With over 5 years of experience in web development, I specialize in creating engaging digital experiences that connect brands with their audiences. My approach combines clean code with thoughtful design to deliver projects that exceed expectations.",
        skills: "Skills",
        experience: "Experience",
        download: "Download CV",
        badge: "5+ Years Experience",
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
    },
    cs: {
      nav: {
        home: "domů",
        projects: "projekty",
        about: "o mně",
        contact: "kontakt",
      },
      hero: {
        badge: "Full stack vývojář",
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
          "S více než 5 lety zkušeností ve vývoji webových aplikací se specializuji na vytváření poutavých digitálních zážitků, které propojují značky s jejich publikem. Můj přístup kombinuje čistý kód s promyšleným designem, abych dodal projekty překonávající očekávání.",
        skills: "Dovednosti",
        experience: "Zkušenosti",
        download: "Stáhnout CV",
        badge: "5+ let zkušeností",
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
      category: "Web Development",
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
  ];

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Geometrické animované prvky v pozadí */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-white/5"
            animate={{
              rotate: 360,
              borderColor: [
                "rgba(255,255,255,0.05)",
                "rgba(255,255,255,0.2)",
                "rgba(255,255,255,0.05)",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full border border-white/10"
            animate={{
              rotate: -360,
              scale: [1, 1.1, 1],
              borderColor: [
                "rgba(255,255,255,0.1)",
                "rgba(255,255,255,0.2)",
                "rgba(255,255,255,0.1)",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full border border-white/5"
            animate={{
              rotate: 360,
              borderColor: [
                "rgba(255,255,255,0.05)",
                "rgba(255,255,255,0.15)",
                "rgba(255,255,255,0.05)",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Centrální animace */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo animace */}
          <motion.div
            className="relative h-16 mb-12 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Horizontální svítící linka */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-px w-0 bg-white -translate-x-1/2 -translate-y-1/2"
              animate={{ width: ["0%", "100%", "100%", "0%"] }}
              transition={{
                duration: 3,
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity,
              }}
            />

            {/* Animované portfolio logo */}
            <div className="relative flex gap-1">
              {["P", "O", "R", "T", "F", "O", "L", "I", "O"].map(
                (letter, index) => (
                  <motion.span
                    key={index}
                    className="text-3xl font-bold relative inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: [
                        "blur(0px)",
                        index % 3 === 0 ? "blur(1px)" : "blur(0px)",
                        "blur(0px)",
                      ],
                    }}
                    transition={{
                      delay: 0.1 + index * 0.08,
                      duration: 0.4,
                      filter: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror",
                      },
                    }}
                  >
                    {letter}

                    {/* Vertikální svítící linka pod každým písmenem */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-px h-0 bg-white -translate-x-1/2"
                      animate={{
                        height: [0, 8, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.3 + index * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  </motion.span>
                )
              )}
            </div>
          </motion.div>

          {/* Minimalistický loading indikátor */}
          <motion.div
            className="relative w-24 h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {/* Kruhová animace */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray="251"
                strokeDashoffset="251"
                animate={{ strokeDashoffset: [251, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* Pulsující tečka uprostřed */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
          </motion.div>

          {/* Loading text */}
          <motion.span
            className="mt-6 text-xs uppercase tracking-widest text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing
            </motion.span>
          </motion.span>
        </div>

        {/* Doplňková animace v dolní části */}
        <motion.div
          className="absolute bottom-20 inset-x-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="relative w-32 h-px bg-white/10">
            <motion.div
              className="absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-white to-transparent"
              animate={{
                x: [-24, 128, -24],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className="bg-black text-white min-h-screen relative">
        {/* Progress bar - tenčí, čistě v odstínech bílé */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/50 via-white to-white/50 z-50"
          style={{
            scaleX: scrollYProgress,
            opacity: progressOpacity,
            transformOrigin: "0%",
          }}
        />

        {/* Header & Navigation */}
        <header className="fixed top-0 left-0 right-0 backdrop-blur-lg bg-black/60 border-b border-white/5 z-40">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
    <div className="flex justify-between items-center">
      {/* Logo */}
      
      <motion.div 
  className="relative group"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
>
  <div className="flex items-center gap-3">
    <img src={logo} alt="Jan Fiala" className="h-10" />
    <span className="text-xl sm:text-2xl font-bold tracking-tight flex items-center">
      <span className="text-white mr-1">JAN</span>
      <span className="text-white/60">FIALA</span>
    </span>
  </div>
  <motion.span 
    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 origin-left"
    initial={{ scaleX: 0 }}
    whileHover={{ scaleX: 1 }}
    transition={{ duration: 0.3 }}
  />
</motion.div>
      
      {/* Desktop Navigation */}
      <motion.nav 
        className="hidden md:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ul className="flex space-x-1 lg:space-x-2">
          {[
            { name: t('nav.home'), ref: homeRef },
            { name: t('nav.projects'), ref: projectsRef },
            { name: t('nav.about'), ref: aboutRef },
            { name: t('nav.contact'), ref: contactRef }
          ].map((item) => (
            <li key={item.name}>
              <motion.button 
                onClick={() => scrollToSection(item.ref)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wider rounded-full transition-all duration-300 ${
                  activeSection === item.name.toLowerCase() 
                    ? 'text-white bg-white/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 uppercase text-xs">
                  {item.name}
                </span>
                {activeSection === item.name.toLowerCase() && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-full bg-white/10 rounded-full"
                    layoutId="activeNavSection"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            </li>
          ))}
        </ul>
      </motion.nav>
      
      {/* Language toggle + Social icons */}
      <div className="hidden lg:flex items-center space-x-3">
        {/* Language toggle button */}
        <motion.button
          onClick={toggleLanguage}
          className="text-white/50 hover:text-white p-2 transition-colors flex items-center gap-1"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "50%" }}
          whileTap={{ scale: 0.9 }}
        >
          <FiGlobe size={18} />
          <span className="text-xs font-medium ml-1">{language === 'cs' ? 'EN' : 'CS'}</span>
        </motion.button>
        
        {/* Social icons */}
        <motion.a 
          href="https://github.com/chlebaak" 
          className="text-white/50 hover:text-white p-2 transition-colors"
          whileHover={{ scale: 1.2, rotate: 5, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "50%" }}
          whileTap={{ scale: 0.9 }}
        >
          <FiGithub size={18} />
        </motion.a>
        <motion.a 
          href="#" 
          className="text-white/50 hover:text-white p-2 transition-colors"
          whileHover={{ scale: 1.2, rotate: -5, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "50%" }}
          whileTap={{ scale: 0.9 }}
        >
          <FiLinkedin size={18} />
        </motion.a>
      </div>

      {/* Vylepšené tlačítko mobilního menu s výraznějším efektem */}
      <motion.button
        className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {mobileMenuOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl"
            >
              <BiMenuAltRight />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  </div>
</header>

{/* Vylepšené mobilní menu - černobílý design s gradientním pozadím */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-black/98 to-black/95 backdrop-blur-md z-30 flex flex-col"
      initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
      animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
      exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 py-24 h-full flex flex-col justify-between">
        <motion.ul className="space-y-6 pt-6">
          {[
            { name: t('nav.home'), ref: homeRef },
            { name: t('nav.projects'), ref: projectsRef },
            { name: t('nav.about'), ref: aboutRef },
            { name: t('nav.contact'), ref: contactRef }
          ].map((item, i) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              exit={{ opacity: 0, x: -50, transition: { delay: 0 } }}
            >
              <button
                onClick={() => scrollToSection(item.ref)}
                className="text-3xl sm:text-4xl font-light tracking-wide text-left w-full group flex items-center"
              >
                <motion.span
                  className="inline-block text-white/80 group-hover:text-white transition-colors"
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.span>
                <motion.span
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    repeatDelay: 0.2,
                  }}
                >
                  <HiOutlineArrowNarrowRight className="w-6 h-6" />
                </motion.span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
        
        {/* Language toggle for mobile - opraveno pozicování a zvýrazněno */}
        <motion.button
          onClick={toggleLanguage}
          className="fixed top-20 right-6 text-white/80 hover:text-white p-2.5 flex items-center justify-center gap-1.5 bg-white/10 rounded-full border border-white/20"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FiGlobe size={18} />
          <span className="text-xs font-medium">{language === 'cs' ? 'EN' : 'CS'}</span>
        </motion.button>

        {/* Vylepšené sociální ikony s monochromním designem */}
        <motion.div
          className="mt-auto pt-6 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-white/40 text-xs uppercase tracking-widest mb-4">
            {t('footer.connect')}
          </div>
          <div className="flex space-x-5">
            <motion.a
              href="https://github.com/chlebaak"
              className="text-white/70 hover:text-white transition-colors"
              whileHover={{
                y: -5,
                filter:
                  "drop-shadow(0 10px 8px rgba(255, 255, 255, 0.1))",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="#"
              className="text-white/70 hover:text-white transition-colors"
              whileHover={{
                y: -5,
                filter:
                  "drop-shadow(0 10px 8px rgba(255, 255, 255, 0.1))",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FiTwitter className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="#"
              className="text-white/70 hover:text-white transition-colors"
              whileHover={{
                y: -5,
                filter:
                  "drop-shadow(0 10px 8px rgba(255, 255, 255, 0.1))",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLinkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="#"
              className="text-white/70 hover:text-white transition-colors"
              whileHover={{
                y: -5,
                filter:
                  "drop-shadow(0 10px 8px rgba(255, 255, 255, 0.1))",
              }}
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
          {/* Hero Section - minimalistický design s ostrými kontrasty */}
          <section
  id="home"
  ref={homeRef}
  className="min-h-screen flex items-center relative overflow-hidden bg-black"
>
  {/* Optimalizované pozadí elementy - menší blur a bez opakované animace */}
  <div
    className="absolute top-20 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-white/3 rounded-full blur-[60px]"
  />
  <div
    className="absolute bottom-10 right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-white/3 rounded-full blur-[60px]"
  />

  {/* Content container */}
  <div className="container mx-auto px-5 sm:px-8 pt-20 sm:pt-24 z-10">
    <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-16 md:gap-20 lg:gap-28">
      {/* Text content - optimalizováno */}
      <div
        className="flex-1 md:max-w-xl w-full text-center md:text-left"
      >
        {/* Professional badge */}
        <div className="mb-6 inline-block">
          <span className="bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-md">
            {t('hero.badge')}
          </span>
        </div>

        {/* Main heading - redukovaná animace */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 sm:mb-10 leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="block mb-2 sm:mb-3">{t('hero.title1')}</span>
          <span className="block mb-2 sm:mb-3">{t('hero.title2')}</span>
          <span className="block text-white/60">{t('hero.title3')}</span>
        </motion.h1>

        {/* Description - optimalizováno */}
        <p className="text-white/70 mb-10 sm:mb-12 text-base sm:text-lg max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0 leading-relaxed">
          {t('hero.description')}
        </p>

        {/* Buttons - optimalizováno */}
        <div className="flex flex-wrap justify-center md:justify-start gap-5 sm:gap-6">
          {/* Primary CTA */}
          <motion.button
            className="bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold flex items-center gap-2 group shadow-lg shadow-white/5 hover:shadow-white/10 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection(projectsRef)}
          >
            <span>{t('hero.cta1')}</span>
            <span className="bg-black/10 rounded-full p-1 ml-1">
              <HiOutlineArrowNarrowRight className="group-hover:translate-x-1 transition-all duration-300 w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            className="border-2 border-white/20 hover:border-white/40 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/5 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection(contactRef)}
          >
            {t('hero.cta2')}
          </motion.button>
        </div>

        {/* Stats - statické, bez animací */}
        <div className="hidden md:flex gap-6 sm:gap-8 mt-12 sm:mt-16 justify-center md:justify-start">
          <div className="text-center relative">
            <div className="text-xl sm:text-2xl font-bold">5+</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">
              {t('hero.stats.years')}
            </div>
          </div>
          <div className="h-12 w-px bg-white/10"></div>
          <div className="text-center relative">
            <div className="text-xl sm:text-2xl font-bold">50+</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">
              {t('hero.stats.projects')}
            </div>
          </div>
          <div className="h-12 w-px bg-white/10"></div>
          <div className="text-center relative">
            <div className="text-xl sm:text-2xl font-bold">30+</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">
              {t('hero.stats.clients')}
            </div>
          </div>
        </div>
      </div>

      {/* Profile image - optimalizováno */}
      <motion.div
        className="flex-1 md:flex-none md:w-2/5 mt-4 md:mt-0 max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          {/* Jednodušší rámeček bez animace */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/40 via-white/5 to-white/5"></div>

          {/* Hlavní kontejner s profil fotkou */}
          <div className="relative z-10 aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={profileImage}
              alt="Jan Fiala"
              className="w-full h-full object-cover"
            />

            {/* Statický grid pattern místo animovaného efektu */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
          </div>

          {/* Tech tagy - statické na malých obrazovkách, animované jen na větších */}
          <div className="hidden sm:block">
            <div className="absolute -left-8 sm:-left-10 top-8 sm:top-10 bg-black px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs border border-white/10 shadow-xl shadow-black/50">
              React.js
            </div>
            <div className="absolute -right-5 sm:-right-7 top-20 sm:top-24 bg-black px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs border border-white/10 shadow-xl shadow-black/50">
              Tailwind CSS
            </div>
            <div className="absolute -left-5 sm:-left-7 bottom-16 sm:bottom-20 bg-black px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs border border-white/10 shadow-xl shadow-black/50">
              Framer Motion
            </div>
          </div>

          {/* Statické dekorativní elementy */}
          <div className="absolute -top-4 -right-4 w-8 h-8 border border-white/20 rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </div>

    {/* Scroll down indikátor - zjednodušený */}
    <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/40 mb-2 sm:mb-3">
        {t('hero.scroll')}
      </span>
      <div className="relative h-10 sm:h-12 overflow-hidden">
        <span className="block w-px h-full bg-white/20 mx-auto"></span>
        <motion.span
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-5 bg-white rounded-full blur-[1px]"
          animate={{
            y: ["-30%", "130%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  </div>
</section>

{/* Projects Section - optimalizováno */}
<section
  id="projects"
  ref={projectsRef}
  className="py-24 sm:py-32 relative overflow-hidden bg-black border-t border-white/5"
>
  {/* Statické pozadí místo animovaného blur efektu */}
  <div
    className="absolute top-40 right-0 w-64 h-64 bg-white/2 rounded-full blur-[60px]"
  />
  <div
    className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/2 rounded-full blur-[60px]"
  />

  <div className="container mx-auto px-5 sm:px-8 relative z-10">
    {/* Zjednodušený nadpis sekce */}
    <div className="text-center mb-20">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 block mb-4">
        {t('projects.subtitle')}
      </span>
      
      {/* Použití statického SectionHeader místo animovaného */}
      <h2 className="text-4xl sm:text-5xl font-bold relative inline-block">
        {t('projects.title')}
        <span className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-white/5 via-white/60 to-white/5"></span>
      </h2>
      
      <div className="h-px w-24 bg-gradient-to-r from-white/5 via-white/60 to-white/5 mx-auto mt-8" />
    </div>

    {/* Grid projektů - optimalizace načítání */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-10">
      {projects.map((project, index) => (
        <div key={project.id} className="will-change-transform">
          {/* Lazy loaded projekty s optimalizovanou animací */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} // Snížení amount pro dřívější načtení
            transition={{
              duration: 0.4,
              // Omezíme maximální zpoždění, aby se všechny projekty načetly rychleji
              delay: Math.min(index * 0.05, 0.2), 
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        </div>
      ))}
    </div>
  </div>
</section>

          {/* About Section - vylepšený pro větší kontrast */}
          <section
  id="about"
  ref={aboutRef}
  className="py-24 sm:py-32 relative overflow-hidden bg-black border-t border-white/5"
>
  {/* Statické pozadí místo animovaného */}
  <div
    className="absolute top-40 left-20 w-80 h-80 bg-white/3 rounded-full blur-[60px]"
  />

  <div className="container mx-auto px-5 sm:px-8 relative z-10">
    {/* Zjednodušený nadpis sekce */}
    <div className="text-center mb-20">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 block mb-4">
        {t('about.subtitle')}
      </span>
      
      {/* Používáme statický nadpis místo animovaného */}
      <h2 className="text-4xl sm:text-5xl font-bold relative inline-block">
        {t('about.title')}
        <span className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-white/5 via-white/60 to-white/5"></span>
      </h2>
      
      <div className="h-px w-24 bg-gradient-to-r from-white/5 via-white/60 to-white/5 mx-auto mt-8" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
      {/* Optimalizovaný profil fotka container - jediná hlavní animace */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative will-change-transform"
      >
        <div className="relative">
          {/* Statický dekorativní rámeček */}
          <div className="absolute -inset-5 rounded-2xl border border-white/10 z-0" />

          {/* AboutImage component - optimalizován uvnitř komponenty */}
          <div className="relative z-10">
            <AboutImage />
          </div>

          {/* Statický dekorativní blur */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/3 rounded-full blur-md z-0" />

          {/* Experience badge - ponecháme animaci pro lepší UX */}
          <motion.div
            className="absolute -top-6 -right-6 bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg z-20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t('about.badge')}
          </motion.div>
        </div>
      </motion.div>

      {/* Optimalizovaný textový obsah */}
      <div>
        {/* Statický nadpis */}
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          {t('about.heading')}
        </h3>

        {/* Statický popis */}
        <p className="text-white/70 mb-8 text-base sm:text-lg leading-relaxed">
          {t('about.description')}
        </p>

        {/* Skills and experience karty - jedna animace pro celý blok */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {/* Skills karta - zachováváme hover animaci pro lepší UX */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px -10px rgba(0,0,0,0.5)",
            }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold mb-4 flex items-center text-lg">
              <span className="bg-white text-black p-1.5 rounded mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 18V6M6 12l6-6 6 6" />
                </svg>
              </span>
              {t('about.skills')}
            </h4>
            <ul className="text-white/70 space-y-3 pl-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Vite / React / Next.js
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                JavaScript / C#
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Tailwind CSS
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Node.js / Express.js
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                UI/UX Design
              </li>
            </ul>
          </motion.div>

          {/* Experience karta - zachováváme hover animaci pro lepší UX */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px -10px rgba(0,0,0,0.5)",
            }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold mb-4 flex items-center text-lg">
              <span className="bg-white text-black p-1.5 rounded mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="2"
                    y="7"
                    width="20"
                    height="14"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </span>
              {t('about.experience')}
            </h4>
            <ul className="text-white/70 space-y-3 pl-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Internship at DPMÚL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Intership at DS Smith
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Tlačítko CV - zachováváme animaci pro interaktivitu */}
        <motion.button
          className="bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 group shadow-md"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 15px 25px -5px rgba(0,0,0,0.3)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{t('about.download')}</span>
          <span className="bg-black/10 rounded-full p-1 ml-1">
            <HiOutlineArrowNarrowRight className="group-hover:translate-x-1 transition-all duration-300 w-4 h-4" />
          </span>
        </motion.button>
      </div>
    </div>
  </div>
</section>

      {/* Contact Section - optimalizovaná verze */}
<section
  id="contact"
  ref={contactRef}
  className="py-24 sm:py-32 relative overflow-hidden bg-black border-t border-white/5"
>
  {/* Statické pozadí místo animovaného */}
  <div 
    className="absolute top-40 right-10 w-72 h-72 bg-white/3 rounded-full blur-[60px]"
  />
  <div 
    className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/2 rounded-full blur-[60px]"
  />

  <div className="container mx-auto px-5 sm:px-8 relative z-10">
    {/* Zjednodušený nadpis sekce - jedna animace pro celý blok */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 block mb-4"
      >
        {t('contact.subtitle')}
      </span>
      
      <h2 className="text-4xl sm:text-5xl font-bold relative inline-block">
        {t('contact.title')}
        <span className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-white/5 via-white/60 to-white/5"></span>
      </h2>
      
      <div className="h-px w-24 bg-gradient-to-r from-white/5 via-white/60 to-white/5 mx-auto mt-8" />
    </motion.div>

    {/* Kontaktní grid - optimalizovaný */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">
      {/* Kontaktní informace - jedna hlavní animace */}
      <motion.div
        className="bg-white/5 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-white/10 shadow-xl shadow-black/20"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          {t('contact.infoTitle')}
        </h3>

        <p className="text-white/70 mb-10 text-base sm:text-lg leading-relaxed">
          {t('contact.infoDesc')}
        </p>

        <div className="space-y-8 mt-10">
          {/* Optimalizovaná ContactInfo komponenta - použijeme přímo statické prvky */}
          <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
            <div className="w-10 h-10 bg-white/5 text-white/80 flex items-center justify-center rounded-full border border-white/10 shadow-md shadow-black/10">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white/50 mb-1">
                {t('contact.email')}
              </h4>
              <p className="text-white font-medium">janfiala331@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
            <div className="w-10 h-10 bg-white/5 text-white/80 flex items-center justify-center rounded-full border border-white/10 shadow-md shadow-black/10">
              <FiPhone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white/50 mb-1">
                {t('contact.phone')}
              </h4>
              <p className="text-white font-medium">+420 733 164 585</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
            <div className="w-10 h-10 bg-white/5 text-white/80 flex items-center justify-center rounded-full border border-white/10 shadow-md shadow-black/10">
              <FiMapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white/50 mb-1">
                {t('contact.location')}
              </h4>
              <p className="text-white font-medium">{t('contact.location')}</p>
            </div>
          </div>
        </div>

        {/* Sociální media - statický blok s hover efekty */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-white/50 text-xs uppercase tracking-[0.15em] mb-6">
            {t('contact.connect')}
          </div>
          <div className="flex space-x-5">
            {/* Použití mapy pro sociální ikony místo jednotlivých kompnent */}
            {[
              { Icon: FiGithub, href: "https://github.com/chlebaak" },
              { Icon: FiTwitter, href: "#" },
              { Icon: FiLinkedin, href: "#" },
              { Icon: FiInstagram, href: "#" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:-translate-y-2 hover:shadow-lg hover:shadow-black/20 transition-all duration-300 border border-white/10"
              >
                <social.Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Kontaktní formulář - jedna animace */}
      <motion.div
        className="bg-white/5 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-white/10 shadow-xl shadow-black/20"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          {t('contact.formTitle')}
        </h3>

        <p className="text-white/70 mb-10 text-base sm:text-lg leading-relaxed">
          {t('contact.formDesc')}
        </p>

        <ContactForm />
      </motion.div>
    </div>
  </div>
</section>
        </main>

        {/* Elegantní Footer s vylepšeným černobílým designem */}
        <footer className="py-16 sm:py-20 relative overflow-hidden bg-black border-t border-white/10">
  {/* Statické pozadí místo animovaného */}
  <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/2 rounded-full blur-[60px]" />
  <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-[60px]" />

  <div className="container mx-auto px-6 sm:px-8 relative z-10">
    {/* Statický oddělovač */}
    <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-white/5 via-white/30 to-white/5 mx-auto mb-16" />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
      {/* Logo a copyright s jednou společnou animací */}
      <motion.div
        className="flex flex-col items-center md:items-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative group">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center mb-5">
            <span className="text-white mr-1">JAN</span>
            <span className="text-white/50">FIALA</span>
          </div>
          {/* Zachováme hover efekt - důležitý pro UX */}
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-white/40 mb-6 text-sm max-w-xs leading-relaxed">
          {t('footer.description')}
        </p>

        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Jan Fiala. {t('footer.rights')}
        </p>
      </motion.div>

      {/* Navigace a kontakt - jedna animace pro celý blok */}
      <motion.div
        className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/30 mb-5 after:content-[''] after:block after:w-8 after:h-px after:bg-white/20 after:mt-2">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t('nav.home'), ref: homeRef },
                { name: t('nav.projects'), ref: projectsRef },
                { name: t('nav.about'), ref: aboutRef },
                { name: t('nav.contact'), ref: contactRef },
              ].map((item) => (
                <li key={item.name}>
                  {/* Zachován hover efekt pro lepší UX */}
                  <motion.button
                    onClick={() => scrollToSection(item.ref)}
                    className="text-white/50 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-1.5 group"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="h-px w-0 bg-white group-hover:w-4 transition-all duration-300"></span>
                    {item.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/30 mb-5 after:content-[''] after:block after:w-8 after:h-px after:bg-white/20 after:mt-2">
              {t('footer.connect')}
            </h4>
            <div className="space-y-4">
              {/* Kontaktní odkazy - statické s hover efektem */}
              <a
                href="mailto:janfiala331@gmail.com"
                className="text-white/50 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2.5 group hover:translate-x-1"
              >
                <span className="w-5 h-5 flex items-center justify-center text-white/40 group-hover:text-white">
                  <FiMail size={14} />
                </span>
                janfiala331@gmail.com
              </a>

              <a
                href="tel:+420733164585"
                className="text-white/50 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2.5 group hover:translate-x-1"
              >
                <span className="w-5 h-5 flex items-center justify-center text-white/40 group-hover:text-white">
                  <FiPhone size={14} />
                </span>
                +420 733 164 585
              </a>

              <a
                href="#"
                className="text-white/50 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2.5 group hover:translate-x-1"
              >
                <span className="w-5 h-5 flex items-center justify-center text-white/40 group-hover:text-white">
                  <FiMapPin size={14} />
                </span>
                {t('contact.location')}
              </a>
            </div>
          </div>

          {/* Sociální sítě - jedna animace pro celý blok */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/30 mb-5 after:content-[''] after:block after:w-8 after:h-px after:bg-white/20 after:mt-2">
              {t('footer.follow')}
            </h4>
            <div className="flex items-center gap-4">
              {/* Sociální ikony se zachovaným hover efektem */}
              {[
                { icon: <FiGithub className="w-4 h-4" />, href: "https://github.com/chlebaak" },
                { icon: <FiTwitter className="w-4 h-4" />, href: "#" },
                { icon: <FiLinkedin className="w-4 h-4" />, href: "#" },
                { icon: <FiInstagram className="w-4 h-4" />, href: "https://www.instagram.com/honzafiala_/" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px -5px rgba(0,0,0,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Statická oddělovací linka */}
    <div className="h-px w-full bg-white/5 my-12" />

    {/* Footer spodní část - statická */}
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <p className="text-white/30 text-xs">
        {t('footer.design')}
      </p>
    </div>
  </div>

  {/* "Nahoru" tlačítko - zachována animace pro lepší UX */}
  <motion.div
    className="absolute right-6 sm:right-10 bottom-10 sm:bottom-12"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <motion.button
      onClick={() => scrollToSection(homeRef)}
      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-500"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </motion.button>
  </motion.div>
</footer>
      </div>
    </LanguageContext.Provider>
  );
}

// Reusable Components
function SectionHeader({ title }) {
  return (
    <motion.h2
      className="text-4xl sm:text-5xl font-bold relative inline-block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {title}
      <motion.span
        className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-white/5 via-white/60 to-white/5"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.h2>
  );
}

function ProjectCard({ project }) {
  const { title, category, description, image, tech, url } = project;

  return (
    <div className="group relative will-change-transform">
      {/* Základní obal bez vícenásobných animací */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -5 }} // Zjednodušený hover efekt
        className="h-full"
      >
        {/* Project image container s jednou animací */}
        <div
          className="aspect-video rounded-xl overflow-hidden relative mb-5 border border-white/10 bg-black shadow-lg shadow-black/30 transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.01]"
        >
          {/* Obrázek projektu */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            loading="lazy" // Lazy loading pro lepší výkon
          />

          {/* Statický Category badge */}
          <div className="absolute top-4 left-4 py-1 px-3 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] text-white/80 font-medium tracking-wider z-10">
            {category}
          </div>

          {/* Overlay s informacemi - bez vnitřních animací */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
            <div>
              <h3 className="text-xl font-medium mb-2 text-white">{title}</h3>
              <p className="text-white/70 text-sm mb-5 line-clamp-2">
                {description}
              </p>

              {/* Tech stack pills - statické */}
              <div className="flex flex-wrap gap-2 mb-5">
                {tech.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] py-0.5 px-2 bg-white/5 rounded-full border border-white/10 text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Tlačítko - zachována interaktivita */}
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 group/btn transform-gpu shadow-lg shadow-black/20 w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Project</span>
                <span className="bg-black/10 rounded-full p-1">
                  <HiOutlineArrowNarrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Project info below thumbnail - statické */}
        <div className="space-y-2">
          <div className="h-px w-8 bg-white/20 mb-3"></div>
          <h3 className="font-medium text-xl text-white group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-white/60 text-sm">{category}</p>
        </div>

        {/* Hover indicator dot - bez zbytečné animace */}
        <div className="absolute -bottom-1 left-0 w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </motion.div>
    </div>
  );
}

function AboutImage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      className="relative will-change-transform"
    >
      {/* Hlavní kontejner - jediná animace pro hlavní obsah */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Zjednodušený efekt vnitřního okraje */}
        <div
          className="absolute inset-3 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 blur-lg z-0"
        />

        {/* Hlavní kontejner s obrázkem */}
        <div className="aspect-square rounded-2xl overflow-hidden relative z-10 border border-white/10 shadow-xl shadow-black/50 bg-black">
          {/* Obrázek */}
          <img
            src={profileImage2}
            alt="Jan Fiala"
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Statický gradient overlay místo animovaného */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

          {/* Omezená verze shine efektu - pouze jedna animace */}
          <motion.div
            className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45"
            animate={{
              left: ["120%", "-120%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatDelay: 8, // Delší pauza mezi opakováním
            }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
        </div>

        {/* Zjednodušené dekorativní prvky - statické */}
        <div className="absolute -bottom-4 -right-4 z-20">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>
        </div>

        {/* Statický kruh místo animovaného */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border border-white/20 rounded-full"></div>

        {/* Statická dekorativní linka místo animované */}
        <div className="absolute -bottom-8 left-1/4 h-px w-1/2 bg-gradient-to-r from-white/5 via-white/40 to-white/5"></div>
      </motion.div>

      {/* Redukované skill badges - ponecháme pouze jednu animaci pro všechny */}
      <motion.div 
        className="absolute -left-12 top-1/3 py-1.5 px-3 rounded-full bg-black backdrop-blur-sm text-white/80 text-xs border border-white/10 shadow-xl shadow-black/30"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Frontend
      </motion.div>

      <motion.div
        className="absolute -right-16 top-2/3 py-1.5 px-3 rounded-full bg-black backdrop-blur-sm text-white/80 text-xs border border-white/10 shadow-xl shadow-black/30"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        UX/UI Design
      </motion.div>
    </div>
  );
}

function ContactInfo({ icon, title, value, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 5 }}
    >
      <div className="w-10 h-10 bg-white/5 text-white/80 flex items-center justify-center rounded-full border border-white/10 shadow-md shadow-black/10">
        {icon}
      </div>
      <div>
        <h4 className="text-sm uppercase tracking-wider text-white/50 mb-1">
          {title}
        </h4>
        <p className="text-white font-medium">{value}</p>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const formRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS služba - nahraďte svými ID
    // Nutno vytvořit účet na https://www.emailjs.com/
    emailjs
      .sendForm(
        "service_2yp7s7k", // Service ID z EmailJS
        "template_xu7xrj9", // Template ID z EmailJS
        formRef.current,
        "1zn4cKqrcAjcGKLdv" // Veřejný klíč z EmailJS
      )
      .then((result) => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
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
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <label
          htmlFor="name"
          className="block text-sm text-white/70 font-medium mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name" // důležité pro EmailJS
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all placeholder-white/20 text-white"
          placeholder="John Doe"
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label
          htmlFor="email"
          className="block text-sm text-white/70 font-medium mb-2"
        >
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email" // důležité pro EmailJS
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all placeholder-white/20 text-white"
          placeholder="john@example.com"
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label
          htmlFor="message"
          className="block text-sm text-white/70 font-medium mb-2"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message" // důležité pro EmailJS
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all placeholder-white/20 text-white resize-none"
          placeholder="How can I help you?"
          required
        ></textarea>
      </motion.div>

      {/* Zobrazení statusu */}
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            className="text-sm px-4 py-3 rounded-lg bg-white/10 border border-green-400/30 text-green-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Message sent successfully! I'll get back to you soon.
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            className="text-sm px-4 py-3 rounded-lg bg-white/10 border border-red-400/30 text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Failed to send message. Please try again or contact me directly.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`bg-white text-black px-7 py-3.5 rounded-full font-medium flex items-center gap-2 group shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 w-full justify-center sm:w-auto ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{
          scale: isSubmitting ? 1 : 1.03,
          y: isSubmitting ? 0 : -2,
        }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <span>Sending...</span>
            <span className="ml-2">
              <svg
                className="animate-spin h-4 w-4 text-black/70"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <span className="bg-black/10 rounded-full p-1 ml-1">
              <HiOutlineArrowNarrowRight className="group-hover:translate-x-1 transition-all duration-300 w-4 h-4" />
            </span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

function SocialIcon({ icon }) {
  return (
    <motion.a
      href="#"
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
      whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.5)" }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-lg">{icon}</div>
    </motion.a>
  );
}

export default App;
