import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown, HiPhone } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { companyInfo } from '../data/site';

/* ─────────────────────────────────────────
   NAV ITEMS
   isRoute: true  → React Router navigation
   href: '#id'    → smooth scroll to section on homepage
───────────────────────────────────────── */
const navItems = [
  {
    label: 'Company',
    dropdown: [
      { label: 'About', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Career', href: '/career' },
      { label: 'Vendor Registration', href: '/vendor-registration' },
    ],
  },
  {
    label: 'Services',
    dropdown: [
      { label: 'Construction', href: '/services/construction' },
      { label: 'Architecture', href: '/services/architecture' },
      { label: 'Interior',     href: '/services/interior' },
      { label: 'Renovation',   href: '/services/renovation' },
    ],
  },
  { label: 'Projects',   href: '/projects', isRoute: true },
  {
    label: 'Packages',
    dropdown: [
      { label: 'Construction Packages', href: '/packages' },
      { label: 'Basic Package', href: '/packages' },
      { label: 'Mid-Range Package', href: '/packages' },
      { label: 'Premium Package', href: '/packages' },
      { label: 'Cost Estimator', href: '/services/construction/cost-estimator-chennai' },
    ],
  },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/contact' },
      { label: 'Construction Guide', href: '/blog' },
      { label: 'Google Reviews', href: '/contact' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
];

/* ─────────────────────────────────────────
   UNIVERSAL NAVIGATION HOOK
   • If href starts with '/' → React Router push
   • If already on '/'       → smooth scroll to #id
   • If on another page      → navigate to '/' then scroll after mount
───────────────────────────────────────── */
function useNavAction() {
  const navigate  = useNavigate();
  const location  = useLocation();

  return function navTo(href) {
    // External route (e.g. /projects)
    if (href.startsWith('/') && !href.startsWith('/#')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    const id = href.replace('#', '');

    if (location.pathname === '/') {
      // Already on homepage — just scroll
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On another page — go home then scroll
      navigate('/');
      // Wait for DOM to mount then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  };
}

/* ─────────────────────────────────────────
   DESKTOP DROPDOWN
───────────────────────────────────────── */
function Dropdown({ items, open, onNavigate }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute', top: 'calc(100% + 12px)', left: '50%',
            transform: 'translateX(-50%)',
            minWidth: '210px', margin: 0, padding: 0, listStyle: 'none',
            background: '#111', border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '4px', boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            zIndex: 9999, overflow: 'hidden',
          }}
        >
          {items.map((item, i) => (
            <li key={i} style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <button
                onClick={() => onNavigate(item.href)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '12px 20px', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13.5px', color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'Jost, sans-serif', fontWeight: 400,
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.color = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.label}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   SINGLE DESKTOP NAV LINK
───────────────────────────────────────── */
function NavLink({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const baseStyle = {
    display: 'flex', alignItems: 'center', gap: '4px',
    fontSize: '14px', fontWeight: 400, letterSpacing: '0.02em',
    fontFamily: 'Jost, sans-serif',
    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
    color: 'rgba(255,255,255,0.82)', whiteSpace: 'nowrap',
    transition: 'color 0.2s', textDecoration: 'none',
  };

  if (!item.dropdown) {
    return (
      <button
        onClick={() => onNavigate(item.href)}
        style={baseStyle}
        onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.82)'}
      >
        {item.label}
      </button>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        style={{ ...baseStyle, color: open ? '#C9A84C' : 'rgba(255,255,255,0.82)' }}
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <HiChevronDown style={{ fontSize: '12px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>
      <Dropdown items={item.dropdown} open={open} onNavigate={(href) => { setOpen(false); onNavigate(href); }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' ? window.scrollY > 10 : false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState(null);
  const navRef = useRef();
  const navTo = useNavAction();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setMobileExp(null); }, [location.pathname]);

  useEffect(() => {
    const sync = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (navRef.current) navRef.current.classList.toggle('nb-scrolled', y > 36);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);

  const handleMobileNav = (href) => {
    setMobileOpen(false);
    setMobileExp(null);
    navTo(href);
  };

  return (
    <>
      {/* ══ DESKTOP TOP INFO BAR ══ */}
      <div className="nb-topbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        height: '36px', background: '#080808',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', fontSize: '11.5px', fontFamily: 'Jost, sans-serif',
        transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
        opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? 'none' : 'auto',
        transition: 'transform 0.3s ease, opacity 0.25s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'rgba(255,255,255,0.5)' }}>
          <a href={`tel:${companyInfo.phoneHref}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          ><HiPhone /> {companyInfo.phone}</a>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '10px' }}>MON – SAT: 9AM – 7PM</span>
        </div>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {[
            { I: FaInstagram,  h: 'https://www.instagram.com/msk__construction/' },
            { I: FaYoutube,    h: 'https://www.youtube.com/@mskconstruction' },
            { I: FaLinkedinIn, h: 'https://in.linkedin.com/company/mskconstruction' },
            { I: FaFacebookF,  h: '#' },
          ].map(({ I, h }, i) => (
            <a key={i} href={h} target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            ><I /></a>
          ))}
        </div>
      </div>

      {/* ══ MAIN NAV ══ */}
      <nav ref={navRef} className="nb-main" style={{
        position: 'fixed', left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(8,8,8,0.97)' : 'rgba(10,10,10,0.82)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '80px', boxSizing: 'border-box',
        }}>

          {/* Logo */}
          <button
            onClick={() => navTo('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'flex', alignItems: 'center' }}
          >
            <img src="/msk-logo.png" alt="MSK Construction"
              style={{ height: '72px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </button>

          {/* Desktop links */}
          <div className="nb-links" style={{ display: 'none', alignItems: 'center', gap: '28px', flex: 1, justifyContent: 'center' }}>
            {navItems.map((item, i) => (
              <NavLink key={i} item={item} onNavigate={navTo} />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nb-cta" style={{ display: 'none', alignItems: 'center', flexShrink: 0 }}>
            <a href={`tel:${companyInfo.phoneHref}`} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', border: '1px solid rgba(201,168,76,0.5)',
              borderRadius: '3px', color: '#C9A84C', fontSize: '13px', fontWeight: 500,
              fontFamily: 'Jost, sans-serif', textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
            >
              <HiPhone style={{ fontSize: '15px' }} /> {companyInfo.phone}
            </a>
          </div>

          {/* Hamburger */}
          <button className="nb-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px',
              color: '#ffffff', fontSize: '28px', lineHeight: 1,
              opacity: 1, visibility: 'visible',
            }}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ══ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 48,
              background: 'rgba(8,8,8,0.99)', overflowY: 'auto', paddingTop: '80px',
            }}
          >
            {/* Mobile logo */}
            <div style={{ padding: '20px 24px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center' }}>
              <img src="/msk-logo.png" alt="MSK Construction"
                style={{ height: '80px', width: 'auto', objectFit: 'contain', marginBottom: '16px' }} />
            </div>

            <div style={{ padding: '0 24px 80px' }}>
              {navItems.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileExp(mobileExp === i ? null : i)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', padding: '16px 0', background: 'none', border: 'none',
                          cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontSize: '15px',
                          fontFamily: 'Jost, sans-serif', fontWeight: 400, textAlign: 'left',
                        }}
                      >
                        {item.label}
                        <HiChevronDown style={{
                          color: '#C9A84C', fontSize: '16px', flexShrink: 0,
                          transition: 'transform 0.2s',
                          transform: mobileExp === i ? 'rotate(180deg)' : 'rotate(0)',
                        }} />
                      </button>
                      <AnimatePresence>
                        {mobileExp === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden', paddingLeft: '12px', paddingBottom: '8px' }}
                          >
                            {item.dropdown.map((sub, j) => (
                              <button key={j}
                                onClick={() => handleMobileNav(sub.href)}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '8px',
                                  width: '100%', padding: '11px 0', background: 'none', border: 'none',
                                  cursor: 'pointer', textAlign: 'left',
                                  fontSize: '14px', color: 'rgba(255,255,255,0.5)',
                                  fontFamily: 'Jost, sans-serif', transition: 'color 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                              >
                                {sub.icon && <span>{sub.icon}</span>}
                                {sub.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => handleMobileNav(item.href)}
                      style={{
                        display: 'block', width: '100%', padding: '16px 0', textAlign: 'left',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.85)', fontSize: '15px',
                        fontFamily: 'Jost, sans-serif', fontWeight: 400,
                      }}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}

              <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a href={`tel:${companyInfo.phoneHref}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px', border: '1px solid rgba(201,168,76,0.5)',
                  borderRadius: '3px', color: '#C9A84C', fontSize: '15px',
                  fontFamily: 'Jost, sans-serif', textDecoration: 'none',
                }}>
                  <HiPhone /> {companyInfo.phone}
                </a>
                <button
                  onClick={() => handleMobileNav('#contact')}
                  style={{
                    padding: '14px', background: 'linear-gradient(135deg, #E8C97A, #C9A84C)',
                    color: '#0F0F0F', fontSize: '13px', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    border: 'none', borderRadius: '3px', cursor: 'pointer',
                    fontFamily: 'Jost, sans-serif',
                  }}
                >
                  Get Free Consultation
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                {[
                  { I: FaInstagram,  h: 'https://www.instagram.com/msk__construction/' },
                  { I: FaYoutube,    h: 'https://www.youtube.com/@mskconstruction' },
                  { I: FaLinkedinIn, h: 'https://in.linkedin.com/company/mskconstruction' },
                  { I: FaFacebookF,  h: '#' },
                ].map(({ I, h }, i) => (
                  <a key={i} href={h} target="_blank" rel="noopener noreferrer"
                    style={{
                      width: '40px', height: '40px', border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.35)', fontSize: '16px', textDecoration: 'none',
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; }}
                  ><I /></a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ WHATSAPP FLOAT ══ */}
      <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
          right: 'calc(20px + env(safe-area-inset-right, 0px))',
          zIndex: 55, display: 'flex', alignItems: 'center', gap: '8px',
          padding: '11px 18px', borderRadius: '50px',
          background: '#25D366', color: '#fff',
          fontSize: '13px', fontWeight: 600, textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          fontFamily: 'Jost, sans-serif', transition: 'transform 0.2s, box-shadow 0.2s',
          maxWidth: 'calc(100vw - 40px)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)'; }}
      >
        <FaWhatsapp style={{ fontSize: '20px', flexShrink: 0 }} />
        <span className="wa-label">Chat with us</span>
      </a>
    </>
  );
}
