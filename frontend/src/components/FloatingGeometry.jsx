import { motion } from 'framer-motion';

export default function FloatingGeometry() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      
      {/* 
        Ultra-optimised Ambient Gradients (0% CPU cost compared to CSS blurs).
        Using pure CSS radial gradients instead of heavy filter: blur().
      */}
      
      {/* Main Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

      {/* Top Left Accent */}
      <motion.div 
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_60%)]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom Right Accent */}
      <motion.div 
        className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_60%)]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [1, 0.6, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Static Elegant Geometric Grid overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
        }}
      />

      {/* Slowly sweeping diagonal highlight (Hardware Accelerated) */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.015) 45%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.015) 55%, transparent 100%)',
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
