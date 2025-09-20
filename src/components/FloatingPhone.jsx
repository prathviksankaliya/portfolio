import React from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt } from 'react-icons/fa';
import './FloatingPhone.css';

const FloatingPhone = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      className="floating-phone"
      onClick={scrollToTop}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaMobileAlt />
      </motion.div>
    </motion.button>
  );
};

export default FloatingPhone;