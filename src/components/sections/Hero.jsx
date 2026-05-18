import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { HiArrowRight } from 'react-icons/hi';
import { FaMedal, FaAward } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';
import { BsBuilding } from 'react-icons/bs';

const stats = [
  { icon: <BsBuilding />, num: '15+', label: 'Years Experience' },
  { icon: <FaAward />,    num: '200+', label: 'Projects Done' },
  { icon: <MdVerifiedUser />, num: 'ISO', label: 'Certified Firm' },
  { icon: <FaMedal />,    num: 'A+', label: 'Premium Quality' },
];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',          /* never exceed viewport */
        maxWidth: '100vw',
        overflow: 'hidden',     /* clip anything that bleeds out */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1800&q=80"
          alt="Luxury construction"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="eager"
          fetchpriority="high"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,10,10,0.93) 0%, rgba(10,10,10,0.72) 50%, rgba(10,10,10,0.90) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
          background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 100%)',
        }} />
      </div>

      {/* Decorative vertical line */}
      <div style={{
        position: 'absolute', top: 0, right: '10%', width: '1px', height: '100%', zIndex: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '120px 24px 64px',   /* top pad accounts for navbar on mobile */
        boxSizing: 'border-box',
      }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '800px' }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <div style={{ width: '36px', height: '1px', background: '#C9A84C', flexShrink: 0 }} />
            <span className="section-eyebrow">Premium Construction &amp; Architecture</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '24px' }}
          >
            Building <span className="gold-text" style={{ fontStyle: 'italic' }}>Luxury Homes</span>
            <br />with Excellence
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: '17px', fontWeight: 300, lineHeight: 1.8, maxWidth: '560px', marginBottom: '44px', letterSpacing: '0.01em' }}
          >
            We transform architectural visions into extraordinary realities. From concept to
            completion, every detail crafted with unmatched precision and premium craftsmanship.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '64px' }}>
            <button
              className="btn-gold"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 36px' }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Projects <HiArrowRight />
            </button>
            <button
              className="btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 36px' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Free Consultation
            </button>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '500px' }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass"
                style={{ padding: '20px', borderRadius: '2px', cursor: 'default' }}
              >
                <div style={{ color: '#C9A84C', fontSize: '20px', marginBottom: '10px' }}>{s.icon}</div>
                <div className="gold-text font-display" style={{ fontSize: '28px', fontWeight: 500, lineHeight: 1 }}>{s.num}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
      >
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <div className="floating" style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
      </motion.div>
    </section>
  );
}
