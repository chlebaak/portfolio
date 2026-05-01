import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedLine } from '../GSAPComponents';
import project1Image from '../../assets/project1.png';
import project2Image from '../../assets/image.png';
import project3Image from '../../assets/project3.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Knihotok",
    category: "Full stack",
    description: "Kompletní sociální síť pro čtenáře knih s možností sdílení oblíbených knih, recenzí a komentářů.",
    image: project1Image,
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind"],
    url: "https://knihotok.vercel.app/",
  },
  {
    id: 2,
    title: "Refugio",
    category: "Frontend",
    description: "Moderní a responzivní webová stránka pro restauraci Refugio, vytvořená s důrazem na uživatelskou přívětivost.",
    image: project2Image,
    tech: ["React", "Vite", "Tailwind", "JavaScript", "Figma"],
    url: "https://refugio-ruddy.vercel.app",
  },
  {
    id: 3,
    title: "AI Analyst",
    category: "Full stack",
    description: "Aplikace pro analýzu jednotlivých akcií a stavbu portfolia za pomoci umělé inteligence Google Gemini.",
    image: project3Image,
    tech: ["Next.js", "React", "Tailwind", "AI", "Recharts"],
    url: "https://trading-six-ecru.vercel.app/",
  },
];

function ProjectCard({ project, index }) {
  const { t } = useLanguage();
  const imageRef = useRef();
  const { title, category, description, image, tech, url } = project;

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    const animation = gsap.fromTo(el, 
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      }
    );

    return () => animation.kill();
  }, []);

  return (
    <motion.div 
      className="group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {/* Project header */}
        <div className="flex items-baseline gap-4 mb-5">
          <span className="text-accent text-xs font-mono tracking-wider">0{index + 1}</span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-fg tracking-tight group-hover:text-accent transition-colors duration-500">
            {title}
          </h3>
          <span className="text-dim text-xs tracking-[0.15em] uppercase font-medium hidden sm:inline">— {category}</span>
        </div>

        {/* Image */}
        <div className="aspect-[16/10] relative overflow-hidden mb-5 bg-elevated">
          <img
            ref={imageRef}
            src={image}
            alt={title}
            className="w-full h-[120%] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] will-change-transform"
            style={{ objectPosition: 'center top' }}
            loading="lazy"
          />
          {/* These overlays stay dark regardless of theme since they're on images */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="absolute inset-0 flex items-end p-6 lg:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-black/80 backdrop-blur-sm px-5 py-4 max-w-md">
              <p className="text-white text-sm leading-relaxed mb-3">{description}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {tech.map((item, i) => (
                  <span key={item} className="text-[10px] text-white/60 font-medium tracking-wider uppercase">
                    {item}{i < tech.length - 1 && <span className="text-white/30 ml-3">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted group-hover:text-accent transition-colors duration-300">
            <span className="text-xs tracking-[0.15em] uppercase font-semibold">{t('common.viewProject')}</span>
            <HiOutlineArrowNarrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
          <div className="hidden sm:flex gap-x-3">
            {tech.slice(0, 3).map((item) => (
              <span key={item} className="text-[10px] text-dim font-medium tracking-wider uppercase">
                {item}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects({ sectionRef }) {
  const { t } = useLanguage();

  return (
    <section id="projects" ref={sectionRef} className="py-32 sm:py-40 relative px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-16 lg:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-end"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="label text-accent block mb-4">{t('projects.subtitle')}</span>
            <h2 className="display-lg text-fg">{t('projects.title')}</h2>
          </div>
          <p className="text-muted text-base lg:text-lg leading-relaxed lg:text-right">
            {t('projects.description')}
          </p>
        </motion.div>

        <AnimatedLine className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
