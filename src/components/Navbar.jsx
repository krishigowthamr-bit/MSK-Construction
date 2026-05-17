import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown, HiPhone } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const navItems = [
  {
    label: 'Company',
    dropdown: [
      { label: 'About Us', href: '#about' },
      { label: 'Why MSK', href: '#about' },
      { label: 'Awards & Certifications', href: '#awards' },
      { label: 'Career', href: '#contact' },
      { label: 'Vendor Registration', href: '#contact' },
    ],
  },
  {
    label: 'Services',
    dropdown: [
      { label: 'Architecture', href: '#services', icon: '🏛' },
      { label: 'Construction', href: '#services', icon: '🏗' },
      { label: 'Interior Design', href: '#services', icon: '🛋' },
      { label: 'Renovation', href: '#services', icon: '🔨' },
    ],
  },
  { label: 'Projects', href: '#projects' },
  {
    label: 'Packages',
    dropdown: [
      { label: 'Basic Package', href: '#contact' },
      { label: 'Standard Package', href: '#contact' },
      { label: 'Premium Package', href: '#contact' },
      { label: 'Luxury Package', href: '#contact' },
    ],
  },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Blog', href: '#about' },
      { label: 'Construction Guide', href: '#process' },
      { label: 'Cost Calculator', href: '#contact' },
      { label: 'FAQ', href: '#contact' },
    ],
  },
];

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Desktop dropdown ── */
function DropdownMenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '12px',
            width: '210px',
            background: '#181818',
            border: '1px solid rgba(201,168,76,0.22)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            zIndex: 9999,
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={e => { e.preventDefault(); scrollTo(item.href); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'color 0.2s, background 0.2s',
                fontFamily: 'Jost, sans-serif',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  if (!item.dropdown) {
    return (
      <a
        href={item.href}
        onClick={e => { e.preventDefault(); scrollTo(item.href); }}
        style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', letterSpacing: '0.04em', fontWeight: 300, fontFamily: 'Jost, sans-serif', transition: 'color 0.2s', position: 'relative' }}
        onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
      >{item.label}</a>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: open ? '#C9A84C' : 'rgba(255,255,255,0.75)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em', fontWeight: 300, fontFamily: 'Jost, sans-serif', padding: 0, transition: 'color 0.2s' }}
      >
        {item.label}
        <HiChevronDown style={{ fontSize: '12px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      <DropdownMenu items={item.dropdown} isOpen={open} />
    </div>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const navRef = useRef();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      // Toggle nav-scrolled class for CSS top transition (desktop only)
      if (navRef.current) {
        if (y > 38) {
          navRef.current.classList.add('nav-scrolled');
        } else {
          navRef.current.classList.remove('nav-scrolled');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Topbar visible only on desktop (CSS hides it on mobile)
  // Topbar slides away after 40px scroll
  const topbarVisible = scrollY < 40;

  // Nav background: transparent at very top, solid after scrolling a bit
  const navSolid = scrollY > 20;

  return (
    <>
      {/* ══════════════════════════════════
          DESKTOP TOPBAR
          - hidden on mobile (display:none via media query)
          - slides up and out when scrolled
      ══════════════════════════════════ */}
      <div className="desktop-topbar" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '38px',
        background: '#080808',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        fontSize: '11px',
        transform: topbarVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: topbarVisible ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.25s ease',
        willChange: 'transform',
        // Hide on mobile via inline media — handled by CSS class below
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: 'rgba(255,255,255,0.4)' }}>
          <a href="tel:+919360959094" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none', fontFamily: 'Jost, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          ><HiPhone /> +91 93609 59094</a>
          <a href="tel:+917200094121" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none', fontFamily: 'Jost, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          ><HiPhone /> +91 72000 94121</a>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '10px', fontFamily: 'Jost, sans-serif' }}>MON – SAT: 9AM – 7PM</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {[
            { icon: FaInstagram, href: 'https://www.instagram.com/jrm__construction/' },
            { icon: FaYoutube, href: 'https://www.youtube.com/@jrmconstruction' },
            { icon: FaLinkedinIn, href: 'https://in.linkedin.com/company/jrmconstruction' },
            { icon: FaFacebookF, href: 'https://www.facebook.com/people/JRM-Construction/100089640972724/' },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            ><Icon /></a>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          MAIN NAVIGATION BAR
          Desktop: top = 38px → 0px on scroll
          Mobile:  top = 0px ALWAYS
      ══════════════════════════════════ */}
      <nav style={{
        position: 'fixed',
        left: 0,
        right: 0,
        zIndex: 50,
        background: navSolid ? 'rgba(8,8,8,0.97)' : 'rgba(10,10,10,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        transition: 'background 0.3s ease',
        willChange: 'transform',
      }}
      // CSS class used to set top differently on mobile vs desktop
      ref={navRef}
      className="main-nav"
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ width: '42px', height: '42px', border: '1px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-display gold-text" style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1 }}>MSK</span>
              </div>
              <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '10px', height: '10px', background: '#C9A84C' }} />
            </div>
            <div style={{ lineHeight: 1 }}>
              <p className="font-display" style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '0.1em', color: '#fff', lineHeight: 1 }}>MSK</p>
              <p style={{ fontSize: '8px', letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase', marginTop: '3px', fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>CONSTRUCTION</p>
            </div>
          </div>

          {/* Desktop nav links — hidden on mobile */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navItems.map((item, i) => <NavItem key={i} item={item} />)}
          </div>

          {/* Desktop CTA — hidden on mobile */}
          <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="tel:+919360959094"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C9A84C', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.04em', fontFamily: 'Jost, sans-serif', fontWeight: 300, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#E8C97A'}
              onMouseLeave={e => e.currentTarget.style.color = '#C9A84C'}
            >
              <HiPhone style={{ fontSize: '15px' }} />
              +91 93609 59094
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-gold"
              style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '12px 24px' }}
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile hamburger — visible only on mobile */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'none', // shown via CSS on mobile
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: '#ffffff',
              fontSize: '26px',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════
          MOBILE SLIDE-IN MENU
      ══════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6,6,6,0.99)',
              zIndex: 48,
              overflowY: 'auto',
              paddingTop: '72px',
            }}
          >
            <div style={{ padding: '16px 24px 80px' }}>
              {navItems.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '15px', fontWeight: 300, letterSpacing: '0.04em', fontFamily: 'Jost, sans-serif', textAlign: 'left' }}
                      >
                        {item.label}
                        <HiChevronDown style={{ color: '#C9A84C', fontSize: '16px', transition: 'transform 0.2s', transform: mobileExpanded === i ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden', paddingLeft: '16px', paddingBottom: '8px' }}
                          >
                            {item.dropdown.map((sub, j) => (
                              <a key={j} href={sub.href}
                                onClick={e => { e.preventDefault(); scrollTo(sub.href); setMobileOpen(false); }}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: 'Jost, sans-serif', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                              >
                                {sub.icon && <span>{sub.icon}</span>}
                                {sub.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href={item.href}
                      onClick={e => { e.preventDefault(); scrollTo(item.href); setMobileOpen(false); }}
                      style={{ display: 'block', padding: '16px 0', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '15px', fontWeight: 300, letterSpacing: '0.04em', fontFamily: 'Jost, sans-serif' }}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}

              <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="tel:+919360959094"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#C9A84C', textDecoration: 'none', fontSize: '15px', fontFamily: 'Jost, sans-serif' }}
                >
                  <HiPhone /> +91 93609 59094
                </a>
                <button
                  onClick={() => { scrollTo('#contact'); setMobileOpen(false); }}
                  className="btn-gold"
                  style={{ width: '100%', padding: '16px', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                >
                  Get Free Consultation
                </button>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginTop: '32px' }}>
                {[FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF].map((Icon, i) => (
                  <a key={i} href="#"
                    style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                  ><Icon /></a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          WHATSAPP FLOAT BUTTON
      ══════════════════════════════════ */}
      <a
        href="https://wa.me/919360959094"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
          right: 'calc(20px + env(safe-area-inset-right, 0px))',
          zIndex: 55,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '11px 18px',
          borderRadius: '50px',
          background: '#25D366',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          fontFamily: 'Jost, sans-serif',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          maxWidth: 'calc(100vw - 40px)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.65)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)'; }}
      >
        <FaWhatsapp style={{ fontSize: '20px', flexShrink: 0 }} />
        <span className="wa-label">Chat with us</span>
      </a>
    </>
  );
}
