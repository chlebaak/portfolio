import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

export default function Navigation({ 
  activeSection, 
  scrollToSection, 
  refs, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) {
  const { language, toggleLanguage, t } = useLanguage();
  const { homeRef, projectsRef, aboutRef, contactRef } = refs;

  const navItems = [
    { name: t('nav.home'), ref: homeRef, id: 'home' },
    { name: t('nav.projects'), ref: projectsRef, id: 'projects' },
    { name: t('nav.about'), ref: aboutRef, id: 'about' },
    { name: t('nav.contact'), ref: contactRef, id: 'contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.button
              className="text-[#f0ece2] text-sm font-semibold tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => scrollToSection(homeRef)}
            >
              JF
            </motion.button>
            
            {/* Desktop Navigation */}
            <motion.nav 
              className="hidden md:flex items-center gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className="relative text-xs tracking-[0.15em] uppercase font-medium text-[#f0ece2]/60 hover:text-[#f0ece2] transition-colors duration-300"
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#e8562a]"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </motion.nav>
            
            {/* Right — Language + Socials */}
            <motion.div 
              className="hidden md:flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-[#f0ece2]/60 hover:text-[#f0ece2] transition-colors duration-300"
              >
                <FiGlobe className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-wider">
                  {language === 'cs' ? 'EN' : 'CS'}
                </span>
              </button>
              
              <div className="flex items-center gap-4">
                <a href="https://github.com/chlebaak" target="_blank" rel="noopener noreferrer" className="text-[#f0ece2]/60 hover:text-[#f0ece2] transition-colors duration-300">
                  <FiGithub className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/janfiala331/" target="_blank" rel="noopener noreferrer" className="text-[#f0ece2]/60 hover:text-[#f0ece2] transition-colors duration-300">
                  <FiLinkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-[#f0ece2]"
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
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center px-10"
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
                    <span className="text-[#4a4640] text-sm font-mono">0{i + 1}</span>
                    <span className="text-[#f0ece2] text-4xl sm:text-5xl font-serif italic group-hover:text-[#e8562a] transition-colors duration-300">
                      {item.name}
                    </span>
                  </div>
                  <div className="h-px bg-[#4a4640]/20" />
                </motion.button>
              ))}
            </nav>
            
            <motion.div 
              className="mt-16 flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button onClick={toggleLanguage} className="flex items-center gap-2 text-[#8a8578]">
                <FiGlobe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'cs' ? 'EN' : 'CS'}</span>
              </button>
              <a href="https://github.com/chlebaak" target="_blank" rel="noopener noreferrer" className="text-[#8a8578] hover:text-[#f0ece2] transition-colors">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/janfiala331/" target="_blank" rel="noopener noreferrer" className="text-[#8a8578] hover:text-[#f0ece2] transition-colors">
                <FiLinkedin className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
