import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../animations/variants';
import { BsBuilding, BsRulers, BsHouseDoor, BsBrush } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi';

const services = [
  {
    icon: <BsRulers className="text-3xl" />,
    title: 'Architecture & Design',
    description: 'Award-winning architectural designs that balance aesthetics, functionality, and sustainability. We craft blueprints that breathe life into your vision.',
    features: ['Conceptual Design', 'Structural Planning', '3D Visualization', 'Green Architecture'],
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
  },
  {
    icon: <BsBuilding className="text-3xl" />,
    title: 'Construction',
    description: 'End-to-end construction management with ISO-certified processes, premium materials, and an expert workforce ensuring timely, quality delivery.',
    features: ['Project Management', 'Quality Assurance', 'On-Time Delivery', 'Safety Standards'],
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80',
  },
  {
    icon: <BsBrush className="text-3xl" />,
    title: 'Interior Design',
    description: 'Transform empty spaces into curated living experiences. Our interior specialists blend luxury materials with your personal aesthetic.',
    features: ['Space Planning', 'Custom Furniture', 'Lighting Design', 'Material Curation'],
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
  },
  {
    icon: <BsHouseDoor className="text-3xl" />,
    title: 'Renovation',
    description: 'Breathe new life into existing spaces with our comprehensive renovation services. From single rooms to complete property transformations.',
    features: ['Home Remodeling', 'Facade Restoration', 'Smart Home Integration', 'Landscaping'],
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80',
  },
];

function ServiceCard({ service, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-sm cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(201,168,76,0.1)',
        transition: 'all 0.4s ease',
      }}
      whileHover={{ y: -8 }}
    >
      {/* Hover bg image */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.7) 100%)' }} />
      </div>

      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-sm pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #C9A84C, transparent, #C9A84C)', padding: '1px' }}
      />

      <div className="relative z-10 p-8">
        {/* Number */}
        <p className="font-display text-7xl font-medium absolute top-6 right-8 text-white/5 group-hover:text-[#C9A84C]/10 transition-colors duration-300 leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </p>

        {/* Icon */}
        <div className="text-[#C9A84C] mb-6 transition-transform duration-300 group-hover:scale-110">
          {service.icon}
        </div>

        <h3 className="font-display text-2xl font-medium text-white mb-4 leading-tight">
          {service.title}
        </h3>
        <p className="text-white/45 text-sm font-light leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="space-y-2 mb-8">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-[13px] text-white/40 font-light">
              <span className="w-1 h-1 bg-[#C9A84C] rounded-full flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-[#C9A84C] text-xs tracking-[0.15em] uppercase font-medium group-hover:gap-4 transition-all duration-300">
          <span>Learn More</span>
          <HiArrowRight />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section-pad" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="section-eyebrow">What We Offer</span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2 className="font-display font-light text-white leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Our <span className="gold-text italic">Core Services</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-[15px] font-light leading-relaxed">
            From groundbreaking to final finishes, we offer comprehensive construction and design services tailored to your vision.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
