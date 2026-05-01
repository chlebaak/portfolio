import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer({ scrollToSection, refs }) {
  const { t } = useLanguage();
  const { homeRef } = refs;

  return (
    <footer className="relative px-6 lg:px-10 pb-6">
      {/* Divider */}
      <div className="max-w-7xl mx-auto h-px bg-[#4a4640]/30" />

      {/* Tagline — big serif italic */}
      <div className="max-w-7xl mx-auto py-16 lg:py-24">
        <motion.p
          className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#f0ece2]/10 leading-snug max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t('footer.tagline')}
        </motion.p>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto h-px bg-[#4a4640]/20 mb-6" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection(homeRef)}
              className="text-[#f0ece2] text-sm font-semibold tracking-wider uppercase hover:text-[#e8562a] transition-colors duration-300"
            >
              JF
            </button>
            <span className="text-[#4a4640] text-[11px]">
              © {new Date().getFullYear()} Jan Fiala
            </span>
            <span className="text-[#4a4640]/40 text-[11px] hidden sm:inline">—</span>
            <span className="text-[#4a4640] text-[11px] hidden sm:inline">
              {t('footer.rights')}
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <a href="https://github.com/chlebaak" target="_blank" rel="noopener noreferrer" className="text-[#8a8578] hover:text-[#e8562a] transition-colors duration-300">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/janfiala331/" target="_blank" rel="noopener noreferrer" className="text-[#8a8578] hover:text-[#e8562a] transition-colors duration-300">
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>

            <motion.button
              onClick={() => scrollToSection(homeRef)}
              className="text-[#8a8578] hover:text-[#e8562a] transition-colors duration-300 flex items-center gap-2"
              whileHover={{ y: -2 }}
            >
              <span className="text-[10px] font-semibold tracking-wider uppercase">{t('footer.backToTop')}</span>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
