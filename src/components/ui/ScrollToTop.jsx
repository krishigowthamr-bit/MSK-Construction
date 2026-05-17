import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

export default function ScrollToTop() {
  // ✅ Initialize from actual scroll position — not hardcoded false
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > 400 : false
  );

  useEffect(() => {
    const sync = () => setVisible(window.scrollY > 400);
    // ✅ Run immediately on mount
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: 'calc(86px + env(safe-area-inset-bottom, 0px))',
            right: 'calc(20px + env(safe-area-inset-right, 0px))',
            zIndex: 55,
            width: '44px',
            height: '44px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #E8C97A, #C9A84C, #9A7A2E)',
            color: '#0F0F0F',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(201,168,76,0.45)',
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
        >
          <HiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
