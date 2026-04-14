import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FiMapPin } from 'react-icons/fi';
import { RevealText, MagneticButton } from '../GSAPComponents';
import GlassCard from '../GlassCard';
import { useLanguage } from '../../context/LanguageContext';
import pfp from '../../assets/image0.jpg';

export default function Hero({ sectionRef, projectsRef, contactRef, scrollToSection }) {
  const { t } = useLanguage();

  return (
    <section id="home" ref={sectionRef} className="min-h-[100svh] relative overflow-hidden pt-28 pb-12 flex items-center">

      <div className="container mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
            
            {/* Main Hero Card - Spans 2 columns */}
            <GlassCard delay={0.1} className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center min-h-[400px]">
              <div className="relative z-10">
                <motion.div
                  className="inline-block mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="glass-panel text-white text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/20">
                    {t('hero.badge')}
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-5xl xl:text-7xl font-extralight tracking-tight leading-none mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <RevealText className="text-white block">{t('hero.title1')}</RevealText>
                  <RevealText className="text-white block">{t('hero.title2')}</RevealText>
                  <RevealText className="text-white/40 block">{t('hero.title3')}</RevealText>
                </motion.h1>

                <motion.p
                  className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg font-light"
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
                    className="magnetic-button group px-8 py-4 bg-white text-black rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all duration-300"
                    onClick={() => scrollToSection(projectsRef)}
                  >
                    {t('hero.cta1')}
                    <HiOutlineArrowNarrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </MagneticButton>

                  <MagneticButton
                    className="magnetic-button px-8 py-4 rounded-2xl border border-white/20 text-white font-medium hover:bg-white/10 backdrop-blur-md transition-all duration-300"
                    onClick={() => scrollToSection(contactRef)}
                  >
                    {t('hero.cta2')}
                  </MagneticButton>
                </motion.div>
              </div>
            </GlassCard>

            {/* Profile Card */}
            <GlassCard delay={0.2} className="p-8 flex flex-col items-center justify-center text-center">
              <div className="relative w-48 h-48 mb-8 mx-auto group perspective-1000"> 
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 group-hover:border-white/50 transition-all duration-700">
                  <img 
                    src={pfp}
                    alt="Jan Fiala"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Elegant status indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center border border-white/20">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
              </div>
              
              <h3 className="text-white font-medium text-2xl tracking-wide mb-1">Jan Fiala</h3>
              <p className="text-white/40 text-sm tracking-widest uppercase mb-6">{t('common.jobTitle')}</p>
              
              <div className="flex items-center justify-center gap-2 mb-6 glass-panel px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse blur-[1px]" />
                <span className="text-white/70 text-xs font-semibold tracking-wider uppercase">{t('common.available')}</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-white/30 text-xs tracking-widest uppercase">
                <FiMapPin className="w-3.5 h-3.5" />
                <span>{t('common.czechRepublic')}</span>
              </div>
            </GlassCard>

            {/* Stats Card */}
            <GlassCard delay={0.3} className="p-6 flex flex-col justify-center">
              <h4 className="text-white/30 text-xs font-semibold uppercase tracking-[0.2em] mb-6 block text-center">
                {t('common.statistics')}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 4, label: t('common.years') },
                  { value: 20, label: t('common.projects') },
                  { value: 5, label: t('common.clients') }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-3xl font-extralight text-white mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                      <span className="counter text-gradient" data-target={stat.value}>{stat.value}</span>
                      <span className="text-white/40">+</span>
                    </div>
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-semibold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Tech Stack Card */}
            <GlassCard delay={0.4} className="lg:col-span-2 p-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-white/80 font-medium text-lg flex items-center gap-3">
                  <div className="w-8 h-8 glass-panel rounded-xl flex items-center justify-center">
                    <span className="text-sm">⚡</span>       
                  </div>
                  {t('common.techStack')}
                </h4>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'HTML', 'CSS', 'Tailwind', 'Node.js', 'JS', 'TS', 'PostgreSQL', 'SQL', 'C#', '.NET', "Figma", "Git"].map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="glass-panel rounded-lg px-4 py-2 hover:bg-white/10 transition-colors duration-300 border border-white/5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-white/70 text-xs tracking-wider">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
            
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex items-center justify-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-12 glass-panel relative overflow-hidden rounded-full">
                <motion.div
                  className="w-full h-1/2 bg-white absolute top-0"
                  animate={{ y: [0, 48, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
