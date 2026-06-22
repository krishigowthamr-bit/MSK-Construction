import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';
import LeadPopup from '../components/ui/LeadPopup';
import { HiHome, HiChevronRight, HiX, HiArrowRight, HiPhotograph } from 'react-icons/hi';

const CATEGORIES = ['All', 'Villa', 'Farm House', 'Residence', 'Commercial', 'Interior', 'Renovation'];

const PROJECTS = [
  { id:1,  title:'Palatial G+2 Luxury Home',           location:'Adityaram Township, Sholinganallur', category:'Villa',       area:'4,200 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80' },
  { id:2,  title:'Elite G+2 Farmhouse',                location:'Mugaiyur ECR, Chennai',              category:'Farm House',  area:'8,500 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { id:3,  title:'Elegant G+1 Residence',              location:'Vandalur, Chennai',                  category:'Residence',   area:'2,800 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { id:4,  title:'Luxury G+2 Villa',                   location:'Sholinganallur, Chennai',            category:'Villa',       area:'5,200 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80' },
  { id:5,  title:'Compact G+1 Urban Home',             location:'West Tambaram, Chennai',             category:'Residence',   area:'1,800 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80' },
  { id:6,  title:'Premium Cityside Residence',         location:'West Tambaram, Chennai',             category:'Residence',   area:'2,400 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
  { id:7,  title:'Commercial Building',                location:'Mogappair, Chennai',                 category:'Commercial',  area:'12,000 sq.ft',year:'2024', img:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id:8,  title:'Contemporary Family Home',           location:'Manapakkam, Chennai',                category:'Residence',   area:'3,100 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80' },
  { id:9,  title:'Vertical Living Residence',          location:'Navalur, Chennai',                   category:'Residence',   area:'2,600 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80' },
  { id:10, title:'Premium Interior Transformation',    location:'Vengaivasal, Chennai',               category:'Interior',    area:'2,200 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { id:11, title:'Premium Interior Project',           location:'Porur, Chennai',                     category:'Interior',    area:'1,950 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80' },
  { id:12, title:'Elegant Coastal Home',               location:'Uthandi, Chennai',                   category:'Villa',       area:'4,800 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80' },
  { id:13, title:'Elevated Suburban Home',             location:'Madhavaram, Chennai',                category:'Residence',   area:'2,900 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80' },
  { id:14, title:'Elite G+1 Family Home',              location:'Pallikaranai, Chennai',              category:'Residence',   area:'2,100 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80' },
  { id:15, title:'Premium G+2 Villa',                  location:'Sholinganallur, Chennai',            category:'Villa',       area:'4,600 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80' },
  { id:16, title:'Modern Family Home',                 location:'Tambaram East, Chennai',             category:'Residence',   area:'2,350 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80' },
  { id:17, title:'Commercial Space',                   location:'Thazhambur, Chennai',                category:'Commercial',  area:'8,500 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { id:18, title:'Premium Residence',                  location:'Thazhambur, Chennai',                category:'Residence',   area:'3,200 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80' },
  { id:19, title:'Elite Home',                         location:'Ottiyambakkam, Chennai',             category:'Villa',       area:'3,800 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80' },
  { id:20, title:'G+1 Luxury Independent House',       location:'Mudichur, Chennai',                  category:'Residence',   area:'2,700 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80' },
  { id:21, title:'Premium G+1 Villa Project',          location:'Chengalpattu, Chennai',              category:'Villa',       area:'3,400 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80' },
  { id:22, title:'G+2 Independent House Project',      location:'Perungalathur, Chennai',             category:'Residence',   area:'3,600 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
  { id:23, title:'Premium Interior Styling',           location:'Vengaivasal, Chennai',               category:'Interior',    area:'3,000 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80' },
  { id:24, title:'G+2 Residential Apartment',          location:'Nanganallur, Chennai',               category:'Residence',   area:'4,100 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id:25, title:'G+1 House Renovation Project',       location:'Ottiyambakam, Chennai',              category:'Renovation',  area:'1,600 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  { id:26, title:'G+2 Modern Living Home',             location:'Akkarai, Chennai',                   category:'Residence',   area:'3,900 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80' },
  { id:27, title:'G+3 Urban Residence',                location:'Pudupakkam, Chennai',                category:'Residence',   area:'5,100 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&q=80' },
  { id:28, title:'Contemporary Residential Home',      location:'Padur, Chennai',                     category:'Villa',       area:'4,000 sq.ft', year:'2024', img:'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80' },
  { id:29, title:'Modern G+2 Home',                    location:'Semmenchery, Chennai',               category:'Residence',   area:'3,300 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=800&q=80' },
  { id:30, title:'Sophisticated Family Home',          location:'Irumbuliyur, Tambaram',              category:'Residence',   area:'2,500 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80' },
  { id:31, title:'Green Meadows Farm House',           location:'Chevella, Hyderabad',                category:'Farm House',  area:'9,500 sq.ft', year:'2023', img:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' },
  { id:32, title:'Luxury Farm Retreat',                location:'ECR, Chennai',                       category:'Farm House',  area:'11,000 sq.ft',year:'2024', img:'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80' },
];

const INITIAL_COUNT = 12;

const progressStages = [
  { title: 'Site Cleared', query: 'construction-site-preparation' },
  { title: 'Bhoomi Pooja Ceremony', query: 'house-construction-ceremony' },
  { title: 'Foundation Started', query: 'building-foundation-construction' },
  { title: 'Footings Laid', query: 'foundation-steel-construction' },
  { title: 'Column & Slab Work', query: 'concrete-column-slab-construction' },
  { title: 'Elevation Work', query: 'modern-house-construction-exterior' },
  { title: 'Interior View', query: 'luxury-home-interior-construction' },
  { title: 'Modular Kitchen Setup', query: 'modern-modular-kitchen-interior' },
  { title: 'Final Elevation Touchups', query: 'modern-villa-exterior-finishing' },
];

const slugify = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getProjectGallery = (project) => [
  { title: 'Completed Home Front View', img: project.img },
  ...progressStages.map((stage, index) => ({
    title: stage.title,
    img: `https://source.unsplash.com/900x650/?${stage.query},${project.category.toLowerCase()},construction&sig=${project.id}-${index}`,
  })),
];

const PROJECT_DETAILS = PROJECTS.map((project) => ({
  ...project,
  slug: slugify(`${project.title}-${project.location}`),
  floors: project.title.match(/G\+\d/)?.[0] || (project.category === 'Commercial' ? 'Multi Floor' : 'G+1'),
  facing: ['East', 'North', 'West', 'South'][project.id % 4],
  packageName: project.category === 'Villa' || project.category === 'Farm House' ? 'Premium' : project.category === 'Interior' ? 'Interior' : 'Standard',
  plotSize: project.category === 'Commercial' ? 'Commercial Plot' : `${30 + project.id} x ${45 + project.id}`,
  status: Number(project.year) >= 2024 ? 'Ongoing' : 'Completed',
  description: `${project.title} in ${project.location} showcases MSK Construction's attention to durable structure, elegant planning, and finish quality. The project combines practical layouts, natural light, and refined material choices for a comfortable ${project.category.toLowerCase()} experience.`,
  gallery: getProjectGallery(project),
}));

function ProjectCard({ project, index, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
      className="group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(201,168,76,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
      }}
      whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
    >
      {/* Image */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title} gallery`}
        style={{ position: 'relative', overflow: 'hidden', height: '240px', width: '100%', border: 'none', padding: 0, background: 'transparent', cursor: 'pointer', display: 'block' }}
      >
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          opacity: 0, transition: 'opacity 0.4s',
        }}
          className="card-overlay"
        />
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          background: 'rgba(8,8,8,0.74)',
          border: '1px solid rgba(201,168,76,0.45)',
          color: '#E8C97A',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: 0.92,
          pointerEvents: 'none',
        }}>
          <HiPhotograph /> View Gallery
        </div>
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          padding: '4px 12px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(201,168,76,0.4)',
          fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#C9A84C', fontFamily: 'Jost, sans-serif', fontWeight: 500,
          borderRadius: '2px',
        }}>
          {project.category}
        </div>
        {/* Year badge */}
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          padding: '4px 10px',
          background: 'rgba(201,168,76,0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(201,168,76,0.3)',
          fontSize: '10px', letterSpacing: '0.1em',
          color: '#E8C97A', fontFamily: 'Jost, sans-serif',
          borderRadius: '2px',
        }}>
          {project.year}
        </div>
      </button>

      {/* Info */}
      <div style={{ padding: '20px 22px 22px' }}>
        <h3 style={{
          color: '#fff', fontSize: '15.5px', fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 500, lineHeight: 1.35, marginBottom: '8px',
          letterSpacing: '0.01em',
        }}>
          {project.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12.5px', fontFamily: 'Jost, sans-serif', fontWeight: 300, marginBottom: '14px' }}>
          📍 {project.location}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#C9A84C', fontSize: '12px', fontFamily: 'Jost, sans-serif', letterSpacing: '0.05em' }}>
            {project.area}
          </span>
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`Open ${project.title} details`}
            style={{
            width: '32px', height: '32px',
            border: '1px solid rgba(201,168,76,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#C9A84C', fontSize: '14px',
            transition: 'background 0.25s, border-color 0.25s',
            borderRadius: '2px',
            background: 'transparent',
            cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
          >
            <HiArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectPopup({ project, detailsOpen, onClose, onViewDetails, onBack }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        background: 'rgba(4,4,4,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onClick={event => event.stopPropagation()}
        style={{
          width: 'min(1080px, 100%)',
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          background: '#101010',
          border: '1px solid rgba(201,168,76,0.22)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.75)',
        }}
      >
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '18px',
          padding: '18px 20px',
          background: 'rgba(16,16,16,0.97)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div>
            <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '5px' }}>
              {detailsOpen ? 'Project Gallery' : 'Project Preview'}
            </p>
            <h3 className="font-display" style={{ color: '#fff', fontSize: 'clamp(1.35rem, 3vw, 2rem)', fontWeight: 300, lineHeight: 1.2 }}>
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project popup"
            style={{
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'transparent',
              color: '#fff',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <HiX style={{ fontSize: '22px' }} />
          </button>
        </div>

        {!detailsOpen ? (
          <div className="project-modal-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(300px, 0.85fr)' }}>
            <div style={{ minHeight: '380px', background: '#080808' }}>
              <img
                src={project.img}
                alt={project.title}
                style={{ width: '100%', height: '100%', minHeight: '380px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '28px' }}>
              <div>
                <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  {project.category} / {project.status}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8, marginBottom: '22px' }}>
                  {project.description}
                </p>
                <div style={{ display: 'grid', gap: '13px' }}>
                  {[
                    ['Location', project.location],
                    ['Built Area', project.area],
                    ['Floors', project.floors],
                    ['Facing', project.facing],
                    ['Package', project.packageName],
                    ['Year', project.year],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '18px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</span>
                      <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '13px', textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={onViewDetails}
                className="btn-gold"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '9px',
                  width: '100%',
                  padding: '15px',
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <HiPhotograph /> View Details
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '22px' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7, maxWidth: '660px' }}>
                Complete image sequence for {project.location}, including exterior, site progress, structure, and finishing views.
              </p>
              <button
                type="button"
                onClick={onBack}
                style={{
                  padding: '10px 16px',
                  border: '1px solid rgba(201,168,76,0.42)',
                  background: 'transparent',
                  color: '#E8C97A',
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Back to Preview
              </button>
            </div>

            <div className="project-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {project.gallery.map((item, index) => (
                <div key={`${item.title}-${index}`} style={{ position: 'relative', aspectRatio: index === 0 ? '16 / 11' : '4 / 3', overflow: 'hidden', background: '#080808', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <img src={item.img} alt={`${project.title} - ${item.title}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '28px 12px 12px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.82), transparent)',
                  }}>
                    <span style={{ color: '#E8C97A', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filtered = activeCategory === 'All'
    ? PROJECT_DETAILS
    : PROJECT_DETAILS.filter(p => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset count when category changes
  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_COUNT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setDetailsOpen(false);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setDetailsOpen(false);
  };

  return (
    <div style={{ background: '#0F0F0F', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=80"
          alt="Our Projects"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.65) 60%, rgba(8,8,8,0.85) 100%)',
        }} />
        {/* Gold bottom edge */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(to right, transparent, #C9A84C, transparent)',
        }} />

        {/* Text */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '0 24px', paddingTop: '88px',
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '20px',
            fontSize: '12px', fontFamily: 'Jost, sans-serif',
            color: 'rgba(255,255,255,0.45)',
          }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
            >
              <HiHome style={{ fontSize: '14px' }} /> Home
            </Link>
            <HiChevronRight style={{ fontSize: '12px', color: '#C9A84C' }} />
            <span style={{ color: '#C9A84C' }}>Projects</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}
          >
            <div style={{ width: '40px', height: '1px', background: '#C9A84C' }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'Jost, sans-serif', fontWeight: 500 }}>
              Our Portfolio
            </span>
            <div style={{ width: '40px', height: '1px', background: '#C9A84C' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 300, color: '#fff', lineHeight: 1.1,
              letterSpacing: '0.01em',
            }}
          >
            Featured <span style={{
              background: 'linear-gradient(135deg, #E8C97A, #C9A84C, #9A7A2E)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}>Projects</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'rgba(255,255,255,0.5)', fontSize: '15px', fontWeight: 300,
              fontFamily: 'Jost, sans-serif', marginTop: '14px', maxWidth: '520px',
              lineHeight: 1.7,
            }}
          >
            Explore our portfolio of luxury residences, farm houses, commercial buildings, and premium interiors across Chennai.
          </motion.p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 100px', boxSizing: 'border-box' }}>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1px', background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: '2px', marginBottom: '52px',
            overflow: 'hidden',
          }}
        >
          {[
            { num: '200+', label: 'Projects' },
            { num: '15+', label: 'Years' },
            { num: '500+', label: 'Happy Clients' },
            { num: '7', label: 'Categories' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '22px 16px', textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 500, background: 'linear-gradient(135deg, #E8C97A, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '4px' }}>{s.num}</p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Jost, sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px', alignItems: 'center' }}
        >
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Jost, sans-serif', marginRight: '4px' }}>Filter:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              style={{
                padding: '8px 20px',
                fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: 'Jost, sans-serif', fontWeight: 500,
                cursor: 'pointer', borderRadius: '2px', border: 'none',
                transition: 'all 0.25s ease',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #E8C97A, #C9A84C, #9A7A2E)'
                  : 'rgba(255,255,255,0.04)',
                color: activeCategory === cat ? '#0F0F0F' : 'rgba(255,255,255,0.5)',
                boxShadow: activeCategory === cat ? '0 4px 20px rgba(201,168,76,0.3)' : 'none',
                outline: activeCategory === cat ? 'none' : '1px solid rgba(201,168,76,0.15)',
              }}
              onMouseEnter={e => { if (activeCategory !== cat) { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.outline = '1px solid rgba(201,168,76,0.4)'; } }}
              onMouseLeave={e => { if (activeCategory !== cat) { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.outline = '1px solid rgba(201,168,76,0.15)'; } }}
            >
              {cat}
              {cat !== 'All' && (
                <span style={{ marginLeft: '6px', fontSize: '10px', opacity: 0.6 }}>
                  ({PROJECTS.filter(p => p.category === cat).length})
                </span>
              )}
              {cat === 'All' && (
                <span style={{ marginLeft: '6px', fontSize: '10px', opacity: 0.6 }}>
                  ({PROJECTS.length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Result count */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            Showing <span style={{ color: '#C9A84C', fontWeight: 500 }}>{visible.length}</span> of <span style={{ color: '#C9A84C', fontWeight: 500 }}>{filtered.length}</span> projects
            {activeCategory !== 'All' && <span> in <span style={{ color: '#C9A84C' }}>{activeCategory}</span></span>}
          </p>
        </div>

        {/* Projects grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          <AnimatePresence>
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpen={openProject} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: '52px' }}
          >
            <button
              onClick={() => setVisibleCount(v => v + 12)}
              style={{
                padding: '14px 48px',
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#E8C97A',
                fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: 'Jost, sans-serif', fontWeight: 500,
                cursor: 'pointer', borderRadius: '2px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Load More Projects ({filtered.length - visibleCount} remaining)
            </button>
          </motion.div>
        )}

        {/* All loaded message */}
        {!hasMore && filtered.length > INITIAL_COUNT && (
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Jost, sans-serif' }}>All Projects Loaded</span>
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
            </div>
          </div>
        )}

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: '80px',
            padding: '52px 40px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '2px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'Jost, sans-serif', marginBottom: '14px' }}>Start Your Project</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
            Ready to Build Your <span style={{ background: 'linear-gradient(135deg, #E8C97A, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>Dream Home?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', fontFamily: 'Jost, sans-serif', fontWeight: 300, maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Let our expert team bring your vision to life. Get a free consultation today.
          </p>
          <button
            onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 350); }}
            style={{
              display: 'inline-block', padding: '14px 44px',
              background: 'linear-gradient(135deg, #E8C97A, #C9A84C, #9A7A2E)',
              color: '#0F0F0F', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'Jost, sans-serif', fontWeight: 600,
              border: 'none', borderRadius: '2px', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(201,168,76,0.3)', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Get Free Consultation
          </button>
        </motion.div>
      </div>

      <Footer />
      <ScrollToTop />
      <LeadPopup />

      <AnimatePresence>
        {selectedProject && (
          <ProjectPopup
            project={selectedProject}
            detailsOpen={detailsOpen}
            onClose={closeProject}
            onViewDetails={() => setDetailsOpen(true)}
            onBack={() => setDetailsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
