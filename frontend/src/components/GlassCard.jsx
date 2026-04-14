import { motion } from 'framer-motion';

export default function GlassCard({ children, className = "", delay = 0, style, ...props }) {
  return (
    <motion.div
      className={`glass-card overflow-hidden relative group hover:border-[rgba(128,0,32,0.25)] hover:shadow-[0_0_30px_rgba(128,0,32,0.06)] transition-all duration-500 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: delay }}
      style={style}
      {...props}
    >
      {/* Subtle red gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(128,0,32,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </motion.div>
  );
}
