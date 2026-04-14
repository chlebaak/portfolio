import { motion } from 'framer-motion';

export default function GlassCard({ children, className = "", delay = 0, style, ...props }) {
  return (
    <motion.div
      className={`glass-card overflow-hidden relative group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: delay }}
      style={style}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </motion.div>
  );
}
