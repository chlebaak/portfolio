import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useLanguage } from '../../context/LanguageContext';
import { SplitText } from '../AdvancedGSAP';
import { MagneticButton } from '../GSAPComponents';
import GlassCard from '../GlassCard';

export default function About({ sectionRef }) {
  const { t } = useLanguage();

  return (
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10 w-full max-w-7xl">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30 block mb-6">
            {t('about.subtitle')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mb-6">
            {t('about.title')}
          </h2>
          <div className="w-24 h-px bg-[rgba(128,0,32,0.4)] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Description */}
          <GlassCard delay={0.1} className="lg:col-span-12 p-10 lg:p-16 text-center shadow-[0_0_50px_rgba(255,255,255,0.02)]">
            <motion.div
              className="inline-block mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass-panel text-white px-6 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-[rgba(128,0,32,0.4)] shadow-[0_0_15px_rgba(128,0,32,0.1)]">
                {t('about.badge')}
              </div>
            </motion.div>

            <SplitText className="text-3xl sm:text-4xl lg:text-6xl font-extralight text-white mb-8 leading-[1.1] max-w-4xl mx-auto">
              {t('about.heading')}
            </SplitText>
            
            <p className="text-white/50 text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto mt-6">
              {t('about.description')}
            </p>
          </GlassCard>

          {/* Skills Section */}
          <GlassCard delay={0.2} className="lg:col-span-6 p-10">
            <div className="inline-flex items-center gap-4 mb-10">
              <div className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center">
                <span className="text-xl">💻</span>
              </div>
              <h4 className="text-2xl font-light text-white tracking-wide">{t('about.skills')}</h4>
            </div>
            
            <div className="space-y-4">
              {['Vite / React / Next.js', 'JavaScript / C#', 'Tailwind CSS', 'Node.js / Express.js', 'UI/UX Design', 'PostgreSQL'].map((skill) => (
                <div
                  key={skill}
                  className="glass-panel border-white/5 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-white/80 font-medium tracking-wide">{skill}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Experience Section */}
          <GlassCard delay={0.3} className="lg:col-span-6 p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-4 mb-10">
                <div className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center">
                  <span className="text-xl">💼</span>
                </div>
                <h4 className="text-2xl font-light text-white tracking-wide">{t('about.experience')}</h4>
              </div>
              
              <div className="space-y-4 relative">
                <div className="absolute left-3.5 top-5 bottom-5 w-px bg-white/10" />
                {[
                  { company: 'DPMÚL', role: 'Internship', period: '2023' },
                  { company: 'DS Smith', role: 'Internship', period: '2024' }
                ].map((exp, index) => (
                  <motion.div
                    key={exp.company}
                    className="relative pl-12 py-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="absolute left-[11px] top-[26px] w-2 h-2 bg-white/40 rounded-full" />
                    <div className="glass-panel rounded-xl p-5 hover:bg-white/10 transition-colors">
                      <h5 className="text-white font-medium text-lg mb-1">{exp.role} <span className="text-white/40 font-light">at {exp.company}</span></h5>
                      <p className="text-white/40 text-sm tracking-widest font-semibold">{exp.period}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 w-full">
              <MagneticButton className="magnetic-button w-full group inline-flex items-center justify-center gap-3 bg-[#800020] text-white px-8 py-5 rounded-xl font-semibold transition-all duration-300 hover:bg-[#9a1535] shadow-[0_0_20px_rgba(128,0,32,0.3)]">
                <span className="text-sm tracking-widest uppercase">{t('about.download')}</span>
                <HiOutlineArrowNarrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </MagneticButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
