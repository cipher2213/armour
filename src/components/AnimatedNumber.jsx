import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedNumber = ({ 
  value, 
  duration = 0.8, 
  className = '', 
  decimals = 0,
  prefix = '',
  suffix = ''
}) => {
  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0 
  });
  const display = useTransform(spring, (current) => 
    prefix + current.toFixed(decimals) + suffix
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  );
};

export default AnimatedNumber;
