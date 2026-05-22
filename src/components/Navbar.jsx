import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown, HiPhone } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const navItems = [
  {
    label: 'Company',
    dropdown: [
      { label: 'About Us',              href: '#about'    },
      { label: 'Why MSK',               href: '#about'    },
      { label: 'Awards & Certifications',href: '#awards'  },
      { label: 'Career',                href: '#contact'  },
      { label: 'Vendor Registration',   href: '#contact'  },
    ],
  },
  {
    label: 'Services',
    dropdown: [
      { label: 'Architecture',    href: '#services', icon: '🏛' },
      { label: 'Construction',    href: '#services', icon: '🏗' },
      { label: 'Interior Design', href: '#services', icon: '🛋' },
      { label: 'Renovation',      href: '#services', icon: '🔨' },
    ],
  },
  { label: 'Projects', href: '#projects' },
  {
    label: 'Packages',
    dropdown: [
      { label: 'Basic Package',    href: '#contact' },
      { label: 'Standard Package', href: '#contact' },
      { label: 'Premium Package',  href: '#contact' },
      { label: 'Luxury Package',   href: '#contact' },
    ],
  },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Blog',                href: '#about'   },
      { label: 'Construction Guide',  href: '#process' },
      { label: 'Cost Calculator',     href: '#contact' },
      { label: 'FAQ',                 href: '#contact' },
    ],
  },
  { label: 'Contact Us', href: '#contact' },
];

function goTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Desktop dropdown ── */
function Dropdown({ items, open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute', top: 'calc(100% + 10px)', left: '50%',
            transform: 'translateX(-50%)',
            minWidth: '210px', margin: 0, padding: 0, listStyle: 'none',
            background: '#fff',
            border: '1px solid #e8e8e8',
            borderRadius: '6px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            zIndex: 9999, overflow: 'hidden',
          }}
        >
          {items.map((item, i) => (
            <li key={i} style={{ borderBottom: i < items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
              <a
                href={item.href}
                onClick={e => { e.preventDefault(); goTo(item.href); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 18px',
                  fontSize: '13.5px', color: '#444',
                  textDecoration: 'none',
                  fontFamily: 'Jost, sans-serif', fontWeight: 400,
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff8ee'; e.currentTarget.style.color = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#444'; }}
              >
                {item.icon && <span style={{ fontSize: '14px' }}>{item.icon}</span>}
                {item.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

function NavLink({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const baseStyle = {
    display: 'flex', alignItems: 'center', gap: '4px',
    fontSize: '14.5px', fontWeight: 400, letterSpacing: '0.01em',
    fontFamily: 'Jost, sans-serif',
    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
    textDecoration: 'none',
    color: open ? '#C9A84C' : 'rgba(255,255,255,0.82)',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s',
  };

  if (!item.dropdown) {
    return (
      <a href={item.href}
        onClick={e => { e.preventDefault(); goTo(item.href); }}
        style={baseStyle}
        onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.82)'}
      >{item.label}</a>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button style={baseStyle} onClick={() => setOpen(!open)}>
        {item.label}
        <HiChevronDown style={{ fontSize: '13px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>
      <Dropdown items={item.dropdown} open={open} />
    </div>
  );
}

/* ── Main export ── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' ? window.scrollY > 10 : false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState(null);
  const navRef = useRef();

  useEffect(() => {
    const sync = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      // Toggle CSS class on nav for top-position transition (desktop only)
      if (navRef.current) {
        navRef.current.classList.toggle('nb-scrolled', y > 36);
      }
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);

  return (
    <>
      {/* ═══ TOP INFO BAR — desktop only ═══ */}
      <div style={{
        display: 'none', /* shown via CSS media query */
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        height: '36px',
        background: '#1a1a2e',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        fontSize: '11.5px',
        fontFamily: 'Jost, sans-serif',
        transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
        opacity: scrolled ? 0 : 1,
        transition: 'transform 0.3s ease, opacity 0.25s ease',
        pointerEvents: scrolled ? 'none' : 'auto',
      }} className="nb-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'rgba(255,255,255,0.55)' }}>
          <a href="tel:+919360959094" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
          ><HiPhone /> +91 93609 59094</a>
          <a href="tel:+917200094121" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
          ><HiPhone /> +91 72000 94121</a>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '10px' }}>MON – SAT: 9AM – 7PM</span>
        </div>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {[
            { I: FaInstagram,  h: 'https://www.instagram.com/msk__construction/' },
            { I: FaYoutube,    h: 'https://www.youtube.com/@mskconstruction' },
            { I: FaLinkedinIn, h: 'https://in.linkedin.com/company/mskconstruction' },
            { I: FaFacebookF,  h: '#' },
          ].map(({ I, h }, i) => (
            <a key={i} href={h} target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            ><I /></a>
          ))}
        </div>
      </div>

      {/* ═══ MAIN NAVBAR ═══
          White background like JRM
          Logo left | Nav center | Phone CTA right */}
      <nav
        ref={navRef}
        className="nb-main"
        style={{
          position: 'fixed', left: 0, right: 0, zIndex: 50,
          background: scrolled ? 'rgba(8,8,8,0.97)' : 'rgba(10,10,10,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
          transition: 'box-shadow 0.3s, border-color 0.3s, top 0.3s',
        }}
      >
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 28px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: '88px',
          boxSizing: 'border-box',
        }}>

          {/* ── LOGO (exactly like JRM — full logo image) ── */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/msk-logo.png"
              alt="MSK Construction — Construct Your Future"
              style={{
                height: '80px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>

          {/* ── DESKTOP NAV LINKS (center) ── */}
          <div className="nb-links" style={{
            display: 'none', /* CSS shows on desktop */
            alignItems: 'center',
            gap: '32px',
            flex: 1,
            justifyContent: 'center',
          }}>
            {navItems.map((item, i) => <NavLink key={i} item={item} />)}
          </div>

          {/* ── DESKTOP CTA: phone button like JRM ── */}
          <div className="nb-cta" style={{
            display: 'none', /* CSS shows on desktop */
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <a
              href="tel:+919360959094"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px',
                border: '2px solid #C9A84C',
                borderRadius: '4px',
                color: '#C9A84C',
                fontSize: '13.5px', fontWeight: 500,
                fontFamily: 'Jost, sans-serif',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'background 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
            >
              <HiPhone style={{ fontSize: '15px' }} />
              +91 93609 59094
            </a>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            className="nb-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'flex', /* CSS hides on desktop */
              alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px',
              color: '#ffffff',
              fontSize: '28px', lineHeight: 1,
              opacity: 1, visibility: 'visible',
            }}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* ═══ MOBILE MENU ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 48,
              background: 'rgba(8,8,8,0.99)',
              overflowY: 'auto',
              paddingTop: '88px',
            }}
          >
            {/* Mobile logo */}
            <div style={{ padding: '20px 24px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center' }}>
              <img src="/msk-logo.png" alt="MSK Construction" style={{ height: '90px', width: 'auto', objectFit: 'contain', marginBottom: '16px' }} />
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
                          width: '100%', padding: '15px 0',
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'rgba(255,255,255,0.8)', fontSize: '15px', fontWeight: 400,
                          fontFamily: 'Jost, sans-serif', textAlign: 'left',
                        }}
                      >
                        {item.label}
                        <HiChevronDown style={{
                          color: '#C9A84C', fontSize: '16px',
                          transition: 'transform 0.2s',
                          transform: mobileExp === i ? 'rotate(180deg)' : 'rotate(0)',
                          flexShrink: 0,
                        }} />
                      </button>
                      <AnimatePresence>
                        {mobileExp === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden', paddingLeft: '14px', paddingBottom: '8px' }}
                          >
                            {item.dropdown.map((sub, j) => (
                              <a key={j} href={sub.href}
                                onClick={e => { e.preventDefault(); goTo(sub.href); setMobileOpen(false); }}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '8px',
                                  padding: '10px 0',
                                  fontSize: '14px', color: 'rgba(255,255,255,0.5)',
                                  textDecoration: 'none', fontFamily: 'Jost, sans-serif',
                                  transition: 'color 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
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
                      onClick={e => { e.preventDefault(); goTo(item.href); setMobileOpen(false); }}
                      style={{
                        display: 'block', padding: '15px 0',
                        color: '#222', fontSize: '15px', fontWeight: 400,
                        fontFamily: 'Jost, sans-serif', textDecoration: 'none',
                      }}
                    >{item.label}</a>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a href="tel:+919360959094"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    padding: '14px',
                    border: '2px solid #C9A84C', borderRadius: '4px',
                    color: '#C9A84C', fontSize: '15px', fontWeight: 500,
                    fontFamily: 'Jost, sans-serif', textDecoration: 'none',
                  }}
                >
                  <HiPhone /> +91 93609 59094
                </a>
                <button
                  onClick={() => { goTo('#contact'); setMobileOpen(false); }}
                  style={{
                    padding: '14px',
                    background: 'linear-gradient(135deg, #E8C97A, #C9A84C)',
                    color: '#0F0F0F', fontSize: '13px', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    border: 'none', borderRadius: '4px', cursor: 'pointer',
                    fontFamily: 'Jost, sans-serif',
                  }}
                >
                  Get Free Consultation
                </button>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '28px' }}>
                {[FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF].map((Icon, i) => (
                  <a key={i} href="#"
                    style={{ width: '38px', height: '38px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '16px', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.borderColor = '#C9A84C'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; }}
                  ><Icon /></a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ WHATSAPP BUTTON ═══ */}
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
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '11px 18px',
          borderRadius: '50px',
          background: '#25D366', color: '#fff',
          fontSize: '13px', fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          fontFamily: 'Jost, sans-serif',
          transition: 'transform 0.2s, box-shadow 0.2s',
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
