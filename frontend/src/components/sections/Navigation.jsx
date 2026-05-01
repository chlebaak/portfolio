import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiGithub, FiLinkedin, FiSun, FiMoon } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navigation({ 
  activeSection, 
  scrollToSection, 
  refs, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { homeRef, projectsRef, aboutRef, contactRef } = refs;

  const navItems = [
    { name: t('nav.home'), ref: homeRef, id: 'home' },
    { name: t('nav.projects'), ref: projectsRef, id: 'projects' },
    { name: t('nav.about'), ref: aboutRef, id: 'about' },
    { name: t('nav.contact'), ref: contactRef, id: 'contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface/80 border-b border-dim/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <motion.button
              className="text-fg text-sm font-semibold tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => scrollToSection(homeRef)}
            >
              JF
            </motion.button>
            
            {/* Desktop Navigation — center */}
            <motion.nav 
              className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className={`relative text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
                    activeSection === item.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </motion.nav>
            
            {/* Right — controls */}
            <motion.div 
              className="hidden md:flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center text-muted hover:text-fg transition-colors duration-300 rounded-md hover:bg-dim/20"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FiSun className="w-3.5 h-3.5" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FiMoon className="w-3.5 h-3.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="w-8 h-8 flex items-center justify-center text-muted hover:text-fg transition-colors duration-300 rounded-md hover:bg-dim/20"
                aria-label="Toggle language"
              >
                <span className="text-[10px] font-bold tracking-wider">
                  {language === 'cs' ? 'EN' : 'CS'}
                </span>
              </button>

              {/* Divider */}
              <div className="w-px h-4 bg-dim/40 mx-2" />
              
              {/* Social icons */}
              <a href="https://github.com/chlebaak" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-muted hover:text-fg transition-colors duration-300 rounded-md hover:bg-dim/20">
                <FiGithub className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.linkedin.com/in/janfiala331/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-muted hover:text-fg transition-colors duration-300 rounded-md hover:bg-dim/20">
                <FiLinkedin className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-fg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.div 
                  className="h-px bg-current origin-center"
                  animate={mobileMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="h-px bg-current origin-center"
                  animate={mobileMenuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-surface z-40 flex flex-col justify-center px-10"
            initial={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="space-y-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.ref);
                    setMobileMenuOpen(false);
                  }}
                  className="block text-left w-full group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
                >
                  <div className="flex items-baseline gap-4 py-3">
                    <span className="text-dim text-sm font-mono">0{i + 1}</span>
                    <span className="text-fg text-4xl sm:text-5xl font-serif italic group-hover:text-accent transition-colors duration-300">
                      {item.name}
                    </span>
                  </div>
                  <div className="h-px bg-dim/20" />
                </motion.button>
              ))}
            </nav>
            
            <motion.div 
              className="mt-16 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center text-muted hover:text-fg transition-colors border border-dim/30 rounded-md">
                {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
              </button>
              <button onClick={toggleLanguage} className="w-10 h-10 flex items-center justify-center text-muted hover:text-fg transition-colors border border-dim/30 rounded-md">
                <span className="text-xs font-bold">{language === 'cs' ? 'EN' : 'CS'}</span>
              </button>
              <a href="https://github.com/chlebaak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-muted hover:text-fg transition-colors border border-dim/30 rounded-md">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/janfiala331/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-muted hover:text-fg transition-colors border border-dim/30 rounded-md">
                <FiLinkedin className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
