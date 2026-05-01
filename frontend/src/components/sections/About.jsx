import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useLanguage } from '../../context/LanguageContext';
import { MagneticButton, AnimatedLine } from '../GSAPComponents';
import pfp from '../../assets/image0.jpg';

export default function About({ sectionRef }) {
  const { t } = useLanguage();

  return (
    <section id="about" ref={sectionRef} className="py-32 sm:py-40 relative px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="label text-[#e8562a] block mb-4">{t('about.subtitle')}</span>
          <h2 className="display-lg text-[#f0ece2]">{t('about.title')}</h2>
        </motion.div>

        <AnimatedLine className="mb-16 lg:mb-20" />

        {/* Big italic heading — full width */}
        <motion.h3
          className="text-3xl sm:text-4xl lg:text-[3.25rem] font-serif italic text-[#f0ece2] leading-[1.2] mb-16 lg:mb-24 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t('about.heading')}
        </motion.h3>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Left — Text Content */}
          <div className="lg:col-span-7 space-y-14">

            {/* Two paragraphs — story */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-base lg:text-lg text-[#8a8578] leading-[1.8]">
                {t('about.description')}
              </p>
              <p className="text-base lg:text-lg text-[#8a8578] leading-[1.8]">
                {t('about.description2')}
              </p>
            </motion.div>

            {/* Approach — new section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h4 className="label mb-6">{t('about.approach')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                {(t('about.approachItems') || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 bg-[#e8562a] rounded-full shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="text-[#f0ece2] text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="label mb-6">{t('about.skills')}</h4>
              <p className="text-[#f0ece2]/80 text-sm leading-loose tracking-wide">
                React · Next.js · JavaScript · TypeScript · C# · Node.js · Express · PostgreSQL · Tailwind CSS · Figma · Git · UI/UX
              </p>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <h4 className="label mb-6">{t('about.experience')}</h4>
              <div className="space-y-3">
                {[
                  { company: 'DPMÚL', role: 'Internship', period: '2023' },
                  { company: 'DS Smith', role: 'Internship', period: '2024' }
                ].map((exp) => (
                  <div key={exp.company} className="flex items-baseline gap-4 group py-1">
                    <span className="text-[#e8562a] text-xs font-mono shrink-0 w-10">{exp.period}</span>
                    <div className="flex-1 h-px bg-[#4a4640]/30 group-hover:bg-[#e8562a]/30 transition-colors mt-2" />
                    <span className="text-[#f0ece2] font-medium text-sm shrink-0">
                      {exp.role} <span className="text-[#8a8578] font-normal">— {exp.company}</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Download CV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MagneticButton className="group inline-flex items-center gap-3 px-8 py-4 bg-[#f0ece2] text-[#0a0a0a] rounded-none font-semibold text-sm tracking-wider uppercase hover:bg-[#e8562a] hover:text-[#f0ece2] transition-colors duration-300">
                <span>{t('about.download')}</span>
                <HiOutlineArrowNarrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — Portrait + Badge */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden group sticky top-24">
              <img
                src={pfp}
                alt="Jan Fiala"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#0a0a0a]/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* Badge overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-[#0a0a0a]/80 backdrop-blur-sm px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#f0ece2] text-base font-semibold tracking-tight">Jan Fiala</p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] text-[#8a8578] uppercase tracking-wider font-medium">{t('common.available')}</span>
                    </div>
                  </div>
                  <p className="text-[#8a8578] text-xs tracking-wide">{t('common.jobTitle')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
