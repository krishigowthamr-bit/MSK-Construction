import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../animations/variants';
import { HiArrowRight } from 'react-icons/hi';

const categories = ['All', 'Villas', 'Farm Houses', 'Residences', 'Commercial'];

const projects = [
  {
    id: 1,
    title: 'The Pallazo Estate',
    category: 'Villas',
    location: 'Jubilee Hills, Hyderabad',
    area: '6,500 sq.ft',
    img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80',
    large: true,
  },
  {
    id: 2,
    title: 'Serene Valley Farm',
    category: 'Farm Houses',
    location: 'Shamshabad, Hyderabad',
    area: '12,000 sq.ft',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    id: 3,
    title: 'Skyline Residences',
    category: 'Residences',
    location: 'Gachibowli, Hyderabad',
    area: '3,200 sq.ft',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    id: 4,
    title: 'The Meridian Tower',
    category: 'Commercial',
    location: 'HITEC City, Hyderabad',
    area: '45,000 sq.ft',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    large: true,
  },
  {
    id: 5,
    title: 'Amber Ridge Villa',
    category: 'Villas',
    location: 'Banjara Hills, Hyderabad',
    area: '8,200 sq.ft',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  },
  {
    id: 6,
    title: 'Green Meadows Farm',
    category: 'Farm Houses',
    location: 'Chevella, Hyderabad',
    area: '9,500 sq.ft',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
];

function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={`group relative img-zoom rounded-sm overflow-hidden ${project.large ? 'md:col-span-2 h-80 md:h-96' : 'h-72'}`}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-400 opacity-0 group-hover:opacity-100">
        <span className="inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase border border-[#C9A84C]/60 text-[#C9A84C] mb-3">
          {project.category}
        </span>
        <h3 className="font-display text-xl font-medium text-white mb-1">{project.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs">{project.location}</p>
            <p className="text-white/40 text-xs">{project.area}</p>
          </div>
          <div className="w-10 h-10 border border-[#C9A84C]/50 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-black transition-all duration-300">
            <HiArrowRight />
          </div>
        </div>
      </div>

      {/* Category badge - always visible */}
      <div className="absolute top-4 left-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <span className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase bg-black/60 backdrop-blur text-[#C9A84C] border border-[#C9A84C]/30">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="section-pad" style={{ background: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="section-eyebrow">Our Portfolio</span>
            </div>
            <h2 className="font-display font-light text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Featured <span className="gold-text italic">Projects</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm font-light leading-relaxed mt-4 md:mt-0">
            A curated selection of our finest residential and commercial constructions.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 text-xs tracking-[0.12em] uppercase transition-all duration-300 rounded-sm ${
                active === cat
                  ? 'btn-gold'
                  : 'border border-white/10 text-white/40 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <button className="btn-outline text-xs tracking-[0.15em] uppercase px-12 py-4">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}
