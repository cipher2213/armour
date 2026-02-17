// Framer Motion Animation Variants Library

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  },
  exit: { x: -100, opacity: 0 }
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  },
  exit: { x: 100, opacity: 0 }
};

export const slideInFromBottom = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  },
  exit: { y: 100, opacity: 0 }
};

export const slideInFromTop = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  },
  exit: { y: -100, opacity: 0 }
};

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
  exit: { scale: 0.8, opacity: 0 }
};

export const glowPulse = {
  initial: { 
    boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)' 
  },
  animate: { 
    boxShadow: [
      '0 0 10px rgba(0, 212, 255, 0.3)',
      '0 0 30px rgba(0, 212, 255, 0.6)',
      '0 0 10px rgba(0, 212, 255, 0.3)',
    ],
    transition: { 
      duration: 2, 
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const scanlineAnimation = {
  initial: { y: '-100%' },
  animate: { 
    y: '100%',
    transition: { 
      duration: 2, 
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.95 }
};

export const holographicShimmer = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear'
    }
  }
};

export const rotateIn = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: { 
    rotateY: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};
