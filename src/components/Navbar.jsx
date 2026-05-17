import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown, HiPhone } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const TOPBAR_HEIGHT = 36; // px — keep in sync with top: TOPBAR_HEIGHT on main nav

const navItems = [
  {
    label: 'Company',
    dropdown: [
      { label: 'About Us', href: '#about' },
      { label: 'Why JRM', href: '#about' },
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

function DropdownMenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 mt-3 w-52 rounded-sm overflow-hidden"
          style={{
            background: '#181818',
            border: '1px solid rgba(201,168,76,0.22)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            zIndex: 9999,
          }}
        >
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={e => {
                e.preventDefault();
                const el = document.querySelector(item.href);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-3 px-5 py-3 text-[13px] text-white/60 hover:text-[#C9A84C] hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-0"
            >
              {item.icon && <span className="text-sm">{item.icon}</span>}
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
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!item.dropdown) {
    return (
      <a
        href={item.href}
        onClick={e => {
          e.preventDefault();
          const el = document.querySelector(item.href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="text-[13px] tracking-wide text-white/75 hover:text-[#C9A84C] transition-colors duration-200 font-light relative group"
      >
        {item.label}
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
      </a>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1.5 text-[13px] tracking-wide text-white/75 hover:text-[#C9A84C] transition-colors duration-200 font-light"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <HiChevronDown
          className="text-xs transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </button>
      <DropdownMenu items={item.dropdown} isOpen={open} />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    // Hide topbar + collapse nav when scrolled past topbar height
    const onScroll = () => setScrolled(window.scrollY > TOPBAR_HEIGHT);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── TOP BAR (z-50, always behind nothing) ── */}
      <div
        className="hidden lg:flex fixed top-0 left-0 right-0 items-center justify-between px-8 text-[11px] transition-all duration-300"
        style={{
          height: `${TOPBAR_HEIGHT}px`,
          background: '#0a0a0a',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          zIndex: 60,               // higher than main nav
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'opacity 0.3s, transform 0.3s',
        }}
      >
        <div className="flex items-center gap-6 text-white/40">
          <a href="tel:+919360959094" className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
            <HiPhone /> +91 93609 59094
          </a>
          <a href="tel:+917200094121" className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
            <HiPhone /> +91 72000 94121
          </a>
          <span className="text-white/20">|</span>
          <span className="text-white/30 tracking-[0.18em] uppercase text-[10px]">MON – SAT: 9AM – 7PM</span>
        </div>
        <div className="flex items-center gap-4">
          {[
            { icon: <FaInstagram />, href: 'https://www.instagram.com/msk__construction/' },
            { icon: <FaYoutube />, href: 'https://www.youtube.com/@mskconstruction' },
            { icon: <FaLinkedinIn />, href: 'https://in.linkedin.com/company/mskconstruction' },
            { icon: <FaFacebookF />, href: 'https://www.facebook.com/people/JRM-Construction/100089640972724/' },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-white/35 hover:text-[#C9A84C] transition-colors duration-200 text-sm">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── MAIN NAV (z-40, sits below topbar, slides up on scroll) ── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed left-0 right-0 transition-all duration-300"
        style={{
          // When not scrolled: sits just below the 36px topbar
          // When scrolled: snaps to top-0 (topbar hidden via transform)
          top: scrolled ? 0 : `${TOPBAR_HEIGHT}px`,
          zIndex: 50,
          background: scrolled ? 'rgba(8,8,8,0.98)' : 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,168,76,0.13)',
          padding: scrolled ? '12px 0' : '16px 0',
          transition: 'top 0.3s ease, padding 0.3s ease, background 0.3s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer flex-shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ border: '1px solid #C9A84C' }}
              >
                <span className="font-display text-sm font-bold gold-text leading-none">JRM</span>
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C9A84C]" />
            </div>
            <div className="leading-none">
              <p className="font-display text-[17px] font-semibold tracking-wider text-white">JRM</p>
              <p className="text-[8px] tracking-[0.22em] text-[#C9A84C] uppercase mt-0.5">CONSTRUCTION</p>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, i) => <NavItem key={i} item={item} />)}
          </div>

          {/* Right side: phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+919360959094"
              className="flex items-center gap-2 text-[#C9A84C] hover:text-[#E8C97A] transition-colors"
            >
              <HiPhone className="text-base" />
              <span className="text-[12px] tracking-wide font-light">+91 93609 59094</span>
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-gold text-[11px] tracking-[0.14em] uppercase px-6 py-3"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white text-2xl p-1 ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 overflow-y-auto"
            style={{ background: 'rgba(8,8,8,0.99)', paddingTop: '75px', zIndex: 45 }}
          >
            <div className="px-6 py-6">
              {navItems.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {item.dropdown ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full py-4 text-white/80 text-[15px] font-light tracking-wide"
                        onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                      >
                        {item.label}
                        <HiChevronDown
                          className="transition-transform duration-200 text-[#C9A84C]"
                          style={{ transform: mobileExpanded === i ? 'rotate(180deg)' : 'rotate(0)' }}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 pb-2"
                          >
                            {item.dropdown.map((sub, j) => (
                              <a
                                key={j}
                                href={sub.href}
                                onClick={e => {
                                  e.preventDefault();
                                  scrollTo(sub.href);
                                  setMobileOpen(false);
                                }}
                                className="flex items-center gap-2 py-2.5 text-[13px] text-white/45 hover:text-[#C9A84C] transition-colors"
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
                    <a
                      href={item.href}
                      onClick={e => {
                        e.preventDefault();
                        scrollTo(item.href);
                        setMobileOpen(false);
                      }}
                      className="block py-4 text-white/80 text-[15px] font-light tracking-wide"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+919360959094"
                  className="flex items-center gap-3 text-[#C9A84C] text-[15px]"
                >
                  <HiPhone /> +91 93609 59094
                </a>
                <button
                  onClick={() => { scrollTo('#contact'); setMobileOpen(false); }}
                  className="btn-gold text-sm tracking-widest uppercase py-4 w-full"
                >
                  Get Free Consultation
                </button>
              </div>

              <div className="flex gap-5 mt-8 pb-8">
                {[FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF].map((Icon, i) => (
                  <a key={i} href="#" className="text-white/30 text-xl hover:text-[#C9A84C] transition-colors">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WHATSAPP FLOAT (bottom-right, fixed position) ── */}
      <a
        href="https://wa.me/919360959094"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 55,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          borderRadius: '50px',
          background: '#25D366',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 500,
          textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(37,211,102,0.45)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          fontFamily: 'Jost, sans-serif',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 30px rgba(37,211,102,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.45)'; }}
      >
        <FaWhatsapp style={{ fontSize: '20px' }} />
        <span className="hidden sm:inline">Chat with us</span>
      </a>
    </>
  );
}
