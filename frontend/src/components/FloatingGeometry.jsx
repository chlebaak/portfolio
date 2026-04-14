import { motion } from 'framer-motion';

export default function FloatingGeometry() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      
      {/* Main Center Glow — white */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

      {/* Top Left Accent — subtle deep crimson glow */}
      <motion.div 
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(128,0,32,0.08)_0%,transparent_60%)]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom Right Accent — white with a hint of warmth */}
      <motion.div 
        className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(200,50,50,0.05)_0%,transparent_60%)]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [1, 0.5, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Geometric Grid overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
        }}
      />

      {/* Slowly sweeping diagonal highlight */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(128,0,32,0.02) 45%, rgba(255,255,255,0.025) 50%, rgba(128,0,32,0.02) 55%, transparent 100%)',
          backgroundSize: '300% 300%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
