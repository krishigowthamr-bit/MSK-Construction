import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '../../animations/variants';
import { HiCheckCircle } from 'react-icons/hi';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const achievements = [
  { num: 200, suffix: '+', label: 'Projects Completed' },
  { num: 15, suffix: '+', label: 'Years of Excellence' },
  { num: 98, suffix: '%', label: 'Client Satisfaction' },
  { num: 50, suffix: '+', label: 'Expert Professionals' },
];

const features = [
  'ISO 9001:2015 Certified Construction',
  'In-house Architecture & Design Team',
  'Transparent Pricing & Timelines',
  'Premium Material Sourcing',
  'Post-Handover Support & Warranty',
  'Sustainable Building Practices',
];

export default function About() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-pad" style={{ background: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Image collage */}
          <motion.div
            ref={ref}
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="img-zoom rounded-sm overflow-hidden h-72 md:h-80">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                  alt="Luxury villa"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-4 mt-10">
                <div className="img-zoom rounded-sm overflow-hidden h-44 md:h-48">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                    alt="Interior design"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="img-zoom rounded-sm overflow-hidden h-44 md:h-48">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
                    alt="Architecture"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 glass border border-[#C9A84C]/30 p-5 rounded-sm hidden md:block"
            >
              <p className="font-display text-4xl gold-text font-medium">15+</p>
              <p className="text-white/50 text-xs tracking-widest uppercase mt-1">Years of Trust</p>
            </motion.div>

            {/* Gold corner accent */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#C9A84C] opacity-60" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="section-eyebrow">Who We Are</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display font-light text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Crafting Spaces That <span className="gold-text italic">Inspire Living</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/50 font-light leading-relaxed mb-4 text-[15px]">
              With over 15 years of experience, Luxe Construct has established itself as the premier construction and architecture firm in the region. We combine cutting-edge technology with timeless craftsmanship.
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/50 font-light leading-relaxed mb-10 text-[15px]">
              Our team of seasoned architects, engineers, and interior designers work in harmony to deliver residences that are not just built — they're curated experiences.
            </motion.p>

            {/* Features */}
            <motion.ul variants={staggerContainer} className="space-y-3 mb-12">
              {features.map((f, i) => (
                <motion.li key={i} variants={fadeUp} className="flex items-center gap-3 text-[14px] text-white/60 font-light">
                  <HiCheckCircle className="text-[#C9A84C] text-base flex-shrink-0" />
                  {f}
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-6 border-t border-white/10 pt-10">
              {achievements.map((a, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <p className="font-display text-4xl gold-text font-medium">
                    <Counter target={a.num} suffix={a.suffix} />
                  </p>
                  <p className="text-white/40 text-xs tracking-widest uppercase mt-1">{a.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
