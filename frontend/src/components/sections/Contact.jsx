import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedLine, MagneticButton } from '../GSAPComponents';

function ContactForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const formRef = useRef();
  
  const COOLDOWN_TIME = 60000;
  const MAX_ATTEMPTS = 3;
  const HOUR_MS = 60 * 60 * 1000;

  const checkRateLimit = () => {
    const now = Date.now();
    const attempts = JSON.parse(localStorage.getItem('emailAttempts') || '[]');
    const recentAttempts = attempts.filter(timestamp => now - timestamp < HOUR_MS);
    localStorage.setItem('emailAttempts', JSON.stringify(recentAttempts));
    
    if (recentAttempts.length >= MAX_ATTEMPTS) return false;
    
    const lastAttempt = localStorage.getItem('lastEmailAttempt');
    if (lastAttempt && now - parseInt(lastAttempt) < COOLDOWN_TIME) {
      const remaining = COOLDOWN_TIME - (now - parseInt(lastAttempt));
      setCooldownRemaining(Math.ceil(remaining / 1000));
      return false;
    }
    
    return true;
  };

  const recordAttempt = () => {
    const now = Date.now();
    const attempts = JSON.parse(localStorage.getItem('emailAttempts') || '[]');
    attempts.push(now);
    localStorage.setItem('emailAttempts', JSON.stringify(attempts));
    localStorage.setItem('lastEmailAttempt', now.toString());
  };

  useEffect(() => {
    let interval;
    if (cooldownRemaining > 0) {
      interval = setInterval(() => {
        setCooldownRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
           return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.website) {
      setSubmitStatus("honeypot");
      return;
    }
    
    if (!checkRateLimit()) {
      setSubmitStatus(cooldownRemaining > 0 ? "cooldown" : "rateLimit");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    recordAttempt();

    emailjs
      .sendForm("service_2yp7s7k", "template_xu7xrj9", formRef.current, "1zn4cKqrcAjcGKLdv")
      .then(() => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "", website: "" });
      })
      .catch((error) => {
        console.error("Email send failed:", error);
        setSubmitStatus("error");
      })
      .finally(() => setIsSubmitting(false));
  };

  const inputClasses = "w-full bg-transparent border-b border-[#4a4640]/50 px-0 py-4 text-[#f0ece2] text-sm placeholder-[#4a4640] focus:outline-none focus:border-[#e8562a] transition-colors duration-300";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="label block mb-2">{t('common.name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder={t('common.yourName')}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="label block mb-2">{t('contact.email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder={t('common.yourEmail')}
            required
          />
        </div>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        id="website"
        name="website"
        value={formData.website}
        onChange={handleChange}
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', tabIndex: -1 }}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="message" className="label block mb-2">{t('contact.formMessage')}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className={`${inputClasses} resize-none`}
          placeholder={t('common.tellMeAbout')}
          required
        />
      </div>

      {submitStatus === "success" && (
        <div className="py-4 border-l-2 border-green-500 pl-4">
          <p className="text-green-400 text-sm font-medium">{t('common.messageSentSuccess')}</p>
          <p className="text-[#8a8578] text-xs mt-1">{t('common.getBackWithin')}</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="py-4 border-l-2 border-red-500 pl-4">
          <p className="text-red-400 text-sm font-medium">{t('common.failedToSend')}</p>
          <p className="text-[#8a8578] text-xs mt-1">{t('common.tryAgainOrContact')}</p>
        </div>
      )}

      {submitStatus === "cooldown" && (
        <div className="py-4 border-l-2 border-yellow-500 pl-4">
          <p className="text-yellow-400 text-sm font-medium">
             {language === 'cs' ? 'Příliš rychlé odesílání' : 'Too fast sending'}
          </p>
        </div>
      )}

      <MagneticButton
        type="submit"
        disabled={isSubmitting || cooldownRemaining > 0}
        className="w-full bg-[#e8562a] text-[#f0ece2] py-4 px-6 rounded-none font-semibold text-sm tracking-wider uppercase hover:bg-[#d14a22] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-[#f0ece2]/20 border-t-[#f0ece2] rounded-full animate-spin" />
            <span>{t('common.sending')}</span>
          </>
        ) : cooldownRemaining > 0 ? (
          <span>{language === 'cs' ? `Počkejte ${cooldownRemaining}s` : `Wait ${cooldownRemaining}s`}</span>
        ) : (
          <>
            <span>{t('contact.formButton')}</span>
            <HiOutlineArrowNarrowRight className="w-5 h-5" />
          </>
        )}
      </MagneticButton>
    </form>
  );
}

export default function Contact({ sectionRef }) {
  const { t } = useLanguage();

  return (
    <section id="contact" ref={sectionRef} className="py-32 sm:py-40 relative px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Big Headline — two-line with accent */}
        <motion.div 
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="label text-[#e8562a] block mb-4">{t('contact.subtitle')}</span>
          <h2 className="display-lg text-[#f0ece2]">
            {t('contact.title')}
          </h2>
          <h2 className="display-lg font-serif italic text-[#e8562a]">
            {t('contact.titleAccent')}
          </h2>
        </motion.div>

        <AnimatedLine className="mb-16 lg:mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left — Contact Info */}
          <motion.div
            className="lg:col-span-5 space-y-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#8a8578] text-base lg:text-lg leading-[1.8]">
              {t('contact.infoDesc')}
            </p>

            <div className="space-y-5">
              <a href="mailto:janfiala331@gmail.com" className="flex items-center gap-4 text-[#f0ece2] hover:text-[#e8562a] transition-colors duration-300 group">
                <FiMail className="w-4 h-4 text-[#e8562a]" />
                <span className="text-sm font-medium">janfiala331@gmail.com</span>
              </a>
              <a href="tel:+420733164585" className="flex items-center gap-4 text-[#f0ece2] hover:text-[#e8562a] transition-colors duration-300 group">
                <FiPhone className="w-4 h-4 text-[#e8562a]" />
                <span className="text-sm font-medium">+420 733 164 585</span>
              </a>
              <div className="flex items-center gap-4 text-[#8a8578]">
                <FiMapPin className="w-4 h-4 text-[#e8562a]" />
                <span className="text-sm font-medium">{t('contact.location')}</span>
              </div>
            </div>

            <div>
              <h4 className="label mb-4">{t('contact.connect')}</h4>
              <div className="flex gap-3">
                {[
                  { Icon: FiGithub, href: "https://github.com/chlebaak" },
                  { Icon: FiLinkedin, href: "https://www.linkedin.com/in/janfiala331/" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-[#4a4640]/50 flex items-center justify-center text-[#8a8578] hover:text-[#f0ece2] hover:border-[#e8562a] hover:bg-[#e8562a]/10 transition-all duration-300"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Available badge */}
            <div className="flex items-center gap-3 py-4 border-t border-[#4a4640]/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[#8a8578] text-sm">{t('common.currentlyAccepting')}</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#f0ece2] mb-2 tracking-tight">
                {t('contact.formTitle')}
              </h3>
              <p className="text-[#8a8578] text-sm">
                {t('contact.formDesc')}
              </p>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
