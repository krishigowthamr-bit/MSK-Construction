import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed z-50 w-11 h-11 flex items-center justify-center text-[#0F0F0F] text-lg transition-all duration-300"
          style={{
            bottom: '90px',
            right: '24px',
            background: 'linear-gradient(135deg, #E8C97A, #C9A84C, #9A7A2E)',
            boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
            borderRadius: '4px',
          }}
          whileHover={{ scale: 1.08, boxShadow: '0 8px 30px rgba(201,168,76,0.6)' }}
          whileTap={{ scale: 0.95 }}
        >
          <HiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
