import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-armory-darker">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-armory-dark via-armory-darker to-black opacity-90" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-armory-blue rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Scanning Lines */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-armory-blue to-transparent opacity-50"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-armory-blue opacity-30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-armory-blue opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-armory-blue opacity-30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-armory-blue opacity-30" />
    </div>
  );
};

export default AnimatedBackground;
