import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import { RevealUp } from '../AdvancedGSAP';
import GlassCard from '../GlassCard';

function ContactForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field
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

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-xs font-semibold text-white/50 tracking-widest uppercase">
          {t('common.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          placeholder={t('common.yourName')}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs font-semibold text-white/50 tracking-widest uppercase">
          {t('contact.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          placeholder={t('common.yourEmail')}
          required
        />
      </div>

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

      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs font-semibold text-white/50 tracking-widest uppercase">
          {t('contact.formMessage')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none backdrop-blur-sm"
          placeholder={t('common.tellMeAbout')}
          required
        />
      </div>

      {submitStatus === "success" && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-md">
          <p className="text-green-400 text-sm font-medium">{t('common.messageSentSuccess')}</p>
          <p className="text-white/60 text-xs mt-1">{t('common.getBackWithin')}</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-md">
          <p className="text-red-400 text-sm font-medium">{t('common.failedToSend')}</p>
          <p className="text-white/60 text-xs mt-1">{t('common.tryAgainOrContact')}</p>
        </div>
      )}

      {submitStatus === "cooldown" && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <p className="text-yellow-400 text-sm font-medium">
             {language === 'cs' ? 'Příliš rychlé odesílání' : 'Too fast sending'}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || cooldownRemaining > 0}
        className="w-full bg-white text-black py-4 px-6 rounded-xl font-medium text-sm tracking-widest uppercase hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
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
      </button>
    </form>
  );
}

export default function Contact({ sectionRef }) {
  const { t } = useLanguage();

  return (
    <section id="contact" ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10 w-full max-w-7xl">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30 block mb-6">
            {t('contact.subtitle')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mb-6">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-px bg-white/10 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GlassCard delay={0.1} className="group p-8 text-center" href="mailto:janfiala331@gmail.com" as="a">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-white transition-colors duration-300">
              <FiMail className="w-7 h-7 text-white group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{t('contact.email')}</h3>
            <p className="text-white/50 text-sm mb-4">janfiala331@gmail.com</p>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{t('common.clickToSend')}</div>
          </GlassCard>

          <GlassCard delay={0.2} className="group p-8 text-center" href="tel:+420733164585" as="a">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-white transition-colors duration-300">
              <FiPhone className="w-7 h-7 text-white group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{t('contact.phone')}</h3>
            <p className="text-white/50 text-sm mb-4">+420 733 164 585</p>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{t('common.clickToCall')}</div>
          </GlassCard>

          <GlassCard delay={0.3} className="p-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FiMapPin className="w-7 h-7 text-white" />
            </div>
             <h3 className="text-lg font-medium text-white mb-2">{t('common.location')}</h3>
            <p className="text-white/50 text-sm mb-4">{t('contact.location')}</p>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{t('common.czechRepublic')}</div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          <motion.div
            className="lg:col-span-5 space-y-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <RevealUp>
                <h3 className="text-2xl sm:text-3xl font-light text-white mb-6">
                  {t('contact.infoTitle')}
                </h3>
              </RevealUp>
              <div className="w-12 h-px bg-white/30 mb-8" />
              <p className="text-white/50 text-lg font-light leading-relaxed">
                {t('contact.infoDesc')}
              </p>
            </div>

            <div>
              <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.3em] mb-6">
                {t('contact.connect')}
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
                    className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <GlassCard delay={0.4} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <span className="text-white font-semibold tracking-widest uppercase text-xs">{t('common.available')}</span>
              </div>
              <p className="text-white/50 text-sm font-light">
                {t('common.currentlyAccepting')}
              </p>
            </GlassCard>
          </motion.div>

          <GlassCard delay={0.2} className="lg:col-span-7 p-8 lg:p-12">
            <div className="mb-10">
              <h3 className="text-2xl sm:text-3xl font-light text-white mb-6">
                {t('contact.formTitle')}
              </h3>
              <div className="w-12 h-px bg-white/30 mb-8" />
              <p className="text-white/50 font-light text-lg">
                {t('contact.formDesc')}
              </p>
            </div>
            <ContactForm />
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
