import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useLanguage } from '../../context/LanguageContext';
import { GSAPTimeline } from '../GSAPAnimations';
import project1Image from '../../assets/project1.png';
import project2Image from '../../assets/image.png';
import project3Image from '../../assets/project3.png';

const projects = [
  {
    id: 1,
    title: "Sociální síť pro čtenáře",
    category: "Full stack",
    description: "Kompletní sociální síť pro čtenáře knih s možností sdílení oblíbených knih, recenzí a komentářů.",
    image: project1Image,
    tech: ["React", "Node.js/Express.js", "Javascript", "PosgreSQL", "Tailwind CSS"],
    url: "https://knihotok.vercel.app/",
  },
  {
    id: 2,
    title: "Restaurace refugio",
    category: "Frontend",
    description: "Moderní a responzivní webová stránka pro restauraci Refugio, vytvořená s důrazem na uživatelskou přívětivost.",
    image: project2Image,
    tech: ["React/Vite", "Tailwind CSS", "Javascript", "Figma"],
    url: "https://refugio-ruddy.vercel.app",
  },
  {
    id: 3,
    title: "AI Stock Analyst",
    category: "Full stack",
    description: "Aplikace pro analýzu jednotlivých akcií a stavbu portfolia za pomoci umělé inteligence Google Gemini.",
    image: project3Image,
    tech: ["Next.js", "React", "Tailwind CS", "AI", "Recharts"],
    url: "https://trading-six-ecru.vercel.app/",
  },
];

function ProjectCard({ project, index }) {
  const { t } = useLanguage();
  const { title, category, description, image, tech, url } = project;

  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative glass-card overflow-hidden transition-all duration-500 hover:border-[rgba(128,0,32,0.3)] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(128,0,32,0.06)]">
        <div className="aspect-[4/3] relative overflow-hidden bg-black/50">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter hover:brightness-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80" />
          
          <div className="absolute top-4 left-4 border border-[rgba(128,0,32,0.5)] px-3 py-1 bg-[rgba(128,0,32,0.15)] backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded-full">
            {category}
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-light text-white mb-3 group-hover:text-white transition-colors">
              {title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed line-clamp-2 font-light">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {tech.map((item) => (
              <span
                key={item}
                className="px-2 py-1 text-[10px] text-white/50 border border-white/10 rounded tracking-widest uppercase bg-white/5"
              >
                {item}
              </span>
            ))}
          </div>

          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#a63050] hover:text-[#c04565] text-xs tracking-widest uppercase font-semibold transition-colors duration-300 group/link"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{t('common.viewProject')}</span>
            <HiOutlineArrowNarrowRight className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-2" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ sectionRef }) {
  const { t } = useLanguage();

  return (
    <section id="projects" ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30 block mb-6">
            {t('projects.subtitle')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mb-6">
            {t('projects.title')}
          </h2>
          <div className="w-24 h-px bg-[rgba(128,0,32,0.4)] mx-auto" />
        </motion.div>

        <GSAPTimeline className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </GSAPTimeline>
      </div>
    </section>
  );
}
