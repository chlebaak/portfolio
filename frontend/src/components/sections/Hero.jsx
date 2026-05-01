import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { MagneticButton, AnimatedCounter, AnimatedLine } from '../GSAPComponents';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero({ sectionRef, projectsRef, contactRef, scrollToSection }) {
  const { t } = useLanguage();

  return (
    <section id="home" ref={sectionRef} className="min-h-[100svh] relative flex flex-col justify-between px-6 lg:px-10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Label */}
        <motion.div
          className="mb-6 lg:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="label text-accent">{t('hero.badge')}</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="mb-10 lg:mb-14">
          <motion.h1
            className="display-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="block text-fg">{t('hero.title1')}</span>
            <span className="block font-serif italic text-fg">{t('hero.title2')}</span>
            <span className="block text-dim">{t('hero.title3')}</span>
          </motion.h1>
        </div>

        <AnimatedLine className="max-w-xl mb-10 lg:mb-14" />

        {/* Description + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end">
          <div className="lg:col-span-5">
            <motion.p
              className="text-muted text-base lg:text-lg leading-[1.8] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton
                className="group px-8 py-4 bg-accent text-white rounded-none font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-accent-hover transition-colors duration-300"
                onClick={() => scrollToSection(projectsRef)}
              >
                {t('hero.cta1')}
                <HiOutlineArrowNarrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </MagneticButton>

              <MagneticButton
                className="px-8 py-4 rounded-none border border-dim text-fg font-medium text-sm tracking-wider uppercase hover:border-muted hover:bg-fg/5 transition-all duration-300"
                onClick={() => scrollToSection(contactRef)}
              >
                {t('hero.cta2')}
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — philosophy quote + stats */}
          <div className="lg:col-span-7 lg:pl-10">
            <motion.p
              className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-fg/15 leading-snug mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              "{t('hero.philosophy')}"
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-10 lg:gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { value: 4, label: t('common.years') },
                { value: 20, label: t('common.projects') },
                { value: 5, label: t('common.clients') }
              ].map((stat, index) => (
                <div key={index}>
                  <span className="text-4xl lg:text-5xl font-bold text-fg tracking-tighter block mb-1">
                    <AnimatedCounter target={stat.value} />
                    <span className="text-dim">+</span>
                  </span>
                  <span className="label text-[10px]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="flex items-center gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.div
          className="w-px h-10 bg-dim origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="label text-[10px]">{t('hero.scroll')}</span>
      </motion.div>
    </section>
  );
}
