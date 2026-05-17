import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { HiArrowRight } from 'react-icons/hi';
import { FaMedal, FaAward } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';
import { BsBuilding } from 'react-icons/bs';

const stats = [
  { icon: <BsBuilding />, num: '15+', label: 'Years Experience' },
  { icon: <FaAward />, num: '200+', label: 'Projects Done' },
  { icon: <MdVerifiedUser />, num: 'ISO', label: 'Certified Firm' },
  { icon: <FaMedal />, num: 'A+', label: 'Premium Quality' },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1800&q=80"
          alt="Luxury construction"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.88) 100%)'
        }} />
        {/* Gold accent overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{
          background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 100%)'
        }} />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 right-0 w-px h-full opacity-10" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />
      <div className="absolute top-40 right-32 hidden xl:block">
        <div className="w-px h-40 bg-[#C9A84C] opacity-20" />
        <div className="w-2 h-2 border border-[#C9A84C] opacity-30 mt-2 ml-[-3px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <span className="section-eyebrow">Premium Construction & Architecture</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-light leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
          >
            Building <span className="gold-text italic">Luxury Homes</span>
            <br />with Excellence
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-white/55 text-lg font-light leading-relaxed max-w-2xl mb-12 tracking-wide"
          >
            We transform architectural visions into extraordinary realities. 
            From concept to completion, every detail crafted with unmatched precision 
            and premium craftsmanship.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-20">
            <button
              className="btn-gold flex items-center gap-3 text-sm tracking-widest uppercase px-10 py-4"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Projects
              <HiArrowRight className="text-base" />
            </button>
            <button
              className="btn-outline flex items-center gap-3 text-sm tracking-widest uppercase px-10 py-4"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Free Consultation
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass rounded-sm p-5 group hover:border-[#C9A84C]/40 transition-all duration-300"
              >
                <div className="text-[#C9A84C] text-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <div className="font-display text-3xl font-medium gold-text mb-1">{s.num}</div>
                <div className="text-white/45 text-xs tracking-widest uppercase font-light">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent floating" />
      </motion.div>
    </section>
  );
}
