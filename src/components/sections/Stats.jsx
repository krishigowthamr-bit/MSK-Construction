import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../animations/variants';

function AnimCounter({ target, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const dur = 2000;
    const step = target / (dur / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

const stats = [
  { target: 200, suffix: '+', label: 'Projects Completed', sub: 'Across residential & commercial' },
  { target: 500, suffix: '+', label: 'Happy Clients', sub: 'And counting every day' },
  { target: 15, suffix: '+', label: 'Years Experience', sub: 'Of luxury construction' },
  { target: 24, suffix: '', label: 'Awards Won', sub: 'National & international' },
];

export default function Stats() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* BG image with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=80"
          alt="Construction site"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0.96) 100%)'
        }} />
        {/* Gold tint */}
        <div className="absolute inset-0" style={{ background: 'rgba(201,168,76,0.03)' }} />
      </div>

      {/* Top & bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center group">
              <div className="font-display text-5xl md:text-6xl font-medium gold-text mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                <AnimCounter target={s.target} suffix={s.suffix} />
              </div>
              <p className="text-white font-medium text-base tracking-wide mb-1">{s.label}</p>
              <p className="text-white/35 text-xs font-light tracking-wide">{s.sub}</p>
              {/* Divider */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#C9A84C]/10" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
