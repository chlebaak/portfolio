import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { BiMenuAltRight } from 'react-icons/bi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import logo from '../../assets/logo_vector.png';
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
    { name: t('nav.home'), ref: homeRef },
    { name: t('nav.projects'), ref: projectsRef },
    { name: t('nav.about'), ref: aboutRef },
    { name: t('nav.contact'), ref: contactRef }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 backdrop-blur-3xl bg-black/40 border-b border-white/5 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => scrollToSection(homeRef)}
            >
              <motion.img 
                src={logo} 
                alt="Jan Fiala" 
                className="h-8 w-8 filter invert opacity-90"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
              <div className="text-xl font-light tracking-[0.2em]">
                <span className="text-white">JAN</span>
                <span className="text-white/40 ml-2">FIALA</span>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <motion.nav 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navItems.map((item) => (
                <motion.button 
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className={`relative text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${
                    activeSection === item.name.toLowerCase() 
                      ? 'text-white' 
                      : 'text-white/40 hover:text-white'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                  {activeSection === item.name.toLowerCase() && (
                    <motion.div 
                      className="absolute -bottom-3 left-0 right-0 h-px bg-[#800020]"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.nav>
            
            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-white/50 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGlobe className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-widest">
                  {language === 'cs' ? 'EN' : 'CS'}
                </span>
              </motion.button>
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
                {[
                  { icon: <FiGithub />, href: "https://github.com/chlebaak" },
                  { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/janfiala331/" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-white/40 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white/60 hover:text-white rounded-md transition-colors"
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
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex flex-col h-full px-6 py-24" onClick={(e) => e.stopPropagation()}>
              <nav className="flex-1 flex flex-col justify-center space-y-8">
                {navItems.map((item, i) => (
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
                      className="text-3xl sm:text-4xl font-light text-white group-hover:text-white/60 transition-colors flex items-center"
                      whileHover={{ x: 10 }}
                    >
                      <span className="uppercase tracking-widest text-lg">{item.name}</span>
                      <motion.span
                        className="ml-4 opacity-0 group-hover:opacity-100"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <HiOutlineArrowNarrowRight className="w-6 h-6" />
                      </motion.span>
                    </motion.div>
                  </motion.button>
                ))}
              </nav>
              
              <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-white/50"
                >
                  <FiGlobe className="w-5 h-5" />
                  <span className="text-sm tracking-widest">{language === 'cs' ? 'EN' : 'CS'}</span>
                </motion.button>

                <div className="flex space-x-6">
                  {[
                    { icon: <FiGithub />, href: "https://github.com/chlebaak" },
                    { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/janfiala331/" },
                    { icon: <FiInstagram />, href: "#" }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
