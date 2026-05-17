import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../animations/variants';
import { FaMedal, FaAward, FaStar } from 'react-icons/fa';
import { MdVerifiedUser, MdOutlineEmojiEvents } from 'react-icons/md';
import { BsShieldCheck } from 'react-icons/bs';

const awards = [
  {
    icon: <BsShieldCheck className="text-4xl" />,
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management System',
    description: 'Internationally certified for our rigorous quality management processes across all construction phases.',
    year: '2018',
  },
  {
    icon: <FaAward className="text-4xl" />,
    title: 'Top Architecture Firm',
    subtitle: 'Regional Excellence Award',
    description: 'Recognized as one of the top 10 architecture and construction firms in Telangana for 3 consecutive years.',
    year: '2022',
  },
  {
    icon: <MdOutlineEmojiEvents className="text-4xl" />,
    title: 'Excellence in Construction',
    subtitle: 'National Build Awards',
    description: 'National recognition for our exemplary standards in luxury residential and commercial construction.',
    year: '2023',
  },
  {
    icon: <FaStar className="text-4xl" />,
    title: 'Best Luxury Developer',
    subtitle: 'Real Estate & Housing Summit',
    description: 'Awarded best luxury real estate developer for delivering superlative homes with consistent quality.',
    year: '2023',
  },
  {
    icon: <FaMedal className="text-4xl" />,
    title: 'Green Building Award',
    subtitle: 'Sustainable Construction Council',
    description: 'Honored for our commitment to eco-conscious building practices and sustainable material sourcing.',
    year: '2024',
  },
  {
    icon: <MdVerifiedUser className="text-4xl" />,
    title: '5-Star Client Rating',
    subtitle: '200+ Verified Reviews',
    description: 'Consistently maintaining a 5-star rating across all platforms based on verified client feedback.',
    year: 'Ongoing',
  },
];

export default function Awards() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="awards" className="section-pad" style={{ background: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="section-eyebrow">Recognition & Trust</span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2 className="font-display font-light text-white leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Awards & <span className="gold-text italic">Certifications</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-[15px] font-light">
            Industry recognition that reflects our unwavering commitment to quality, innovation, and client satisfaction.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {awards.map((award, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative p-8 rounded-sm overflow-hidden cursor-default transition-all duration-400"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.1)' }}
              whileHover={{ borderColor: 'rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.03)' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at top left, rgba(201,168,76,0.08) 0%, transparent 60%)'
              }} />

              {/* Year badge */}
              <div className="absolute top-6 right-6 text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/50 font-medium">
                {award.year}
              </div>

              <div className="text-[#C9A84C]/60 group-hover:text-[#C9A84C] transition-all duration-300 mb-6 group-hover:scale-110 transform inline-block" style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0))' }}>
                <style>{`.group:hover .glow-icon { filter: drop-shadow(0 0 12px rgba(201,168,76,0.5)); }`}</style>
                <span className="glow-icon block">{award.icon}</span>
              </div>

              <h3 className="font-display text-xl font-medium text-white mb-1">{award.title}</h3>
              <p className="text-[#C9A84C] text-xs tracking-[0.1em] uppercase mb-4">{award.subtitle}</p>
              <p className="text-white/40 text-[13px] font-light leading-relaxed">{award.description}</p>

              {/* Bottom line */}
              <div className="mt-6 w-0 group-hover:w-full h-px bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
