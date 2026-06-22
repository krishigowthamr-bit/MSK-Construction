import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ScrollToTop from '../ui/ScrollToTop';
import LeadPopup from '../ui/LeadPopup';
import { HiChevronRight, HiHome } from 'react-icons/hi';

export function SEO({ title, description }) {
  useEffect(() => {
    document.title = `${title} | MSK Construction`;
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', description);
    if (!meta.parentElement) document.head.appendChild(meta);
  }, [title, description]);

  return null;
}

export function PageHero({ eyebrow, title, description, image, current }) {
  return (
    <section style={{ position: 'relative', minHeight: '430px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <img src={image} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(6,6,6,0.92), rgba(6,6,6,0.58), rgba(6,6,6,0.86))' }} />
      <div style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto', width: '100%', padding: '150px 24px 72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <HiHome /> Home
          </Link>
          <HiChevronRight style={{ color: '#C9A84C' }} />
          <span style={{ color: '#C9A84C' }}>{current}</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ maxWidth: '760px' }}>
          <span className="section-eyebrow">{eyebrow}</span>
          <h1 className="font-display" style={{ color: '#fff', fontSize: 'clamp(2.4rem, 5vw, 4.6rem)', fontWeight: 300, lineHeight: 1.05, marginTop: '14px', marginBottom: '18px' }}>
            {title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '16px', lineHeight: 1.85, maxWidth: '650px' }}>{description}</p>
        </motion.div>
      </div>
    </section>
  );
}

export function CTASection({ title = 'Ready to Bring Your Vision to Life?', text = 'Get a free consultation with our experts and start your project today.' }) {
  return (
    <section style={{ background: '#0F0F0F', padding: '30px 24px 90px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '48px 28px', border: '1px solid rgba(201,168,76,0.16)', background: 'rgba(255,255,255,0.025)', textAlign: 'center' }}>
        <p className="section-eyebrow" style={{ marginBottom: '12px' }}>Start Your Project</p>
        <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(1.9rem, 4vw, 3.1rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '14px' }}>{title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.46)', fontSize: '15px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 28px' }}>{text}</p>
        <button
          type="button"
          className="btn-gold"
          onClick={() => window.dispatchEvent(new Event('openLeadPopup'))}
          style={{ padding: '14px 34px', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase' }}
        >
          Contact Us for a Free Consultation
        </button>
      </div>
    </section>
  );
}

export default function PageShell({ seoTitle, seoDescription, hero, children, cta = true }) {
  return (
    <div style={{ background: '#0F0F0F', minHeight: '100vh' }}>
      <SEO title={seoTitle} description={seoDescription} />
      <Navbar />
      <main>
        <PageHero {...hero} />
        {children}
        {cta && <CTASection />}
      </main>
      <Footer />
      <ScrollToTop />
      <LeadPopup />
    </div>
  );
}
