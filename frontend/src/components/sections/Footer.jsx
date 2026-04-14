import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer({ scrollToSection, refs }) {
  const { t } = useLanguage();
  const { homeRef, projectsRef, aboutRef, contactRef } = refs;

  return (
    <footer className="relative overflow-hidden">
      {/* Innovative Top Border Design */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(128,0,32,0.4)] to-transparent" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 w-full max-w-7xl">
        <div className="pt-24 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-12">
          
          <motion.div
            className="lg:col-span-2 space-y-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <motion.div
                className="group cursor-pointer inline-block"
                whileHover={{ scale: 1.02 }}
                onClick={() => scrollToSection(homeRef)}
              >
                <div className="text-4xl sm:text-5xl font-extralight tracking-widest mb-4 flex items-center">
                  <span className="text-white">JAN</span>
                  <span className="text-white/30 ml-4">FIALA</span>
                </div>
                <div className="w-24 h-px bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>

              <p className="text-white/40 text-lg leading-relaxed max-w-md font-light">
                {t('footer.description')}
              </p>

              <div className="inline-flex items-center gap-3 px-5 py-3 glass-panel rounded-full border border-white/5">
                <div className="w-2 h-2 bg-[#800020] rounded-full animate-pulse shadow-[0_0_10px_rgba(128,0,32,0.8)]" />
                <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">{t('common.available')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.3em]">
              {t('footer.navigation')}
            </h4>
            
            <nav className="space-y-5">
              {[
                { name: t('nav.home'), ref: homeRef, num: '01' },
                { name: t('nav.projects'), ref: projectsRef, num: '02' },
                { name: t('nav.about'), ref: aboutRef, num: '03' },
                { name: t('nav.contact'), ref: contactRef, num: '04' },
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className="group flex items-center gap-6 text-left w-full hover:translate-x-2 transition-transform duration-300"
                >
                  <span className="text-white/20 text-[10px] font-mono">{item.num}</span>
                  <span className="text-white/50 group-hover:text-white font-medium tracking-widest uppercase text-xs transition-colors duration-300">
                    {item.name}
                  </span>
                  <div className="flex-1 h-px bg-white/5 group-hover:bg-white/20 transition-colors duration-300" />
                </motion.button>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.3em] mb-6">
                {t('footer.connect')}
              </h4>
              <div className="space-y-4">
                <a href="mailto:janfiala331@gmail.com" className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors duration-300">
                  <FiMail className="w-4 h-4" />
                  <span className="text-xs tracking-widest uppercase font-medium">{t('contact.email')}</span>
                </a>
                <a href="tel:+420733164585" className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors duration-300">
                  <FiPhone className="w-4 h-4" />
                  <span className="text-xs tracking-widest uppercase font-medium">{t('contact.phone')}</span>
                </a>
                <div className="flex items-center gap-4 text-white/50">
                  <FiMapPin className="w-4 h-4" />
                  <span className="text-xs tracking-widest uppercase font-medium">{t('common.czechRepublic')}</span>
                </div>
              </div>
            </div>

            <div>
               <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.3em] mb-6">
                {t('footer.follow')}
              </h4>
              <div className="flex gap-4">
                {[
                  { Icon: FiGithub, href: "https://github.com/chlebaak" },
                  { Icon: FiLinkedin, href: "https://www.linkedin.com/in/janfiala331/" },
                  { Icon: FiInstagram, href: "#" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <social.Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pt-8 pb-10 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">
                © {new Date().getFullYear()} Jan Fiala
              </p>
              <div className="w-px h-3 bg-white/20" />
              <p className="text-white/30 text-[10px] tracking-widest uppercase">
                {t('footer.rights')}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-white/30 text-[10px] tracking-widest uppercase hidden sm:block">
                {t('footer.design')}
              </p>
              
              <motion.button
                onClick={() => scrollToSection(homeRef)}
                className="group flex items-center gap-3 px-5 py-2.5 bg-[#800020] text-white rounded-full hover:bg-[#9a1535] transition-colors duration-300 shadow-[0_0_15px_rgba(128,0,32,0.2)]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[10px] font-bold tracking-widest uppercase">{t('footer.backToTop')}</span>
                <motion.div
                  className="w-3 h-3 flex items-center justify-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
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
  );
}
