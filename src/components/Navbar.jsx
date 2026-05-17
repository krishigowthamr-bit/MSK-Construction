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

function goTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

function DropdownMenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
          className="nb-dropdown"
        >
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="nb-dropdown-item"
              onClick={e => { e.preventDefault(); goTo(item.href); }}
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
      <a href={item.href} className="nb-link"
        onClick={e => { e.preventDefault(); goTo(item.href); }}>
        {item.label}
      </a>
    );
  }
  return (
    <div ref={ref} className="nb-item"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button className={`nb-link nb-link-btn${open ? ' nb-link-active' : ''}`}
        onClick={() => setOpen(!open)}>
        {item.label}
        <HiChevronDown className={`nb-chevron${open ? ' nb-chevron-open' : ''}`} />
      </button>
      <DropdownMenu items={item.dropdown} isOpen={open} />
    </div>
  );
}

export default function Navbar() {
  // ✅ Initialize directly from window.scrollY so first render is already correct
  const [scrollY, setScrollY] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY : 0
  );
  const navRef = useRef();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const sync = (y) => {
      setScrollY(y);
      if (navRef.current) {
        navRef.current.classList.toggle('nb-nav-top', y > 38);
      }
    };

    // ✅ Run immediately on mount so classes are set before first paint
    sync(window.scrollY);

    const onScroll = () => sync(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const topbarGone = scrollY > 38;
  const navSolid   = scrollY > 20;

  return (
    <>
      {/* TOPBAR — CSS hides on mobile, JS slides away on scroll */}
      <div className={`nb-topbar${topbarGone ? ' nb-topbar-hidden' : ''}`}>
        <div className="nb-topbar-left">
          <a href="tel:+919360959094" className="nb-topbar-link"><HiPhone /> +91 93609 59094</a>
          <a href="tel:+917200094121" className="nb-topbar-link"><HiPhone /> +91 72000 94121</a>
          <span className="nb-topbar-sep">|</span>
          <span className="nb-topbar-hours">MON – SAT: 9AM – 7PM</span>
        </div>
        <div className="nb-topbar-right">
          {[
            { I: FaInstagram, href: 'https://instagram.com/jrm__construction' },
            { I: FaYoutube,   href: 'https://youtube.com/@jrmconstruction' },
            { I: FaLinkedinIn,href: 'https://linkedin.com/company/jrmconstruction' },
            { I: FaFacebookF, href: 'https://facebook.com/people/JRM-Construction/100089640972724' },
          ].map(({ I, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="nb-topbar-social"><I /></a>
          ))}
        </div>
      </div>

      {/* MAIN NAV — top controlled purely by CSS classes */}
      <nav ref={navRef} className={`nb-nav${topbarGone ? ' nb-nav-top' : ''}${navSolid ? ' nb-nav-solid' : ''}`}>
        <div className="nb-inner">

          {/* Logo */}
          <div className="nb-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="nb-logo-box">
              <span className="nb-logo-text font-display gold-text">MSK</span>
              <div className="nb-logo-dot" />
            </div>
            <div className="nb-logo-name">
              <span className="nb-logo-title font-display">MSK</span>
              <span className="nb-logo-sub">CONSTRUCTION</span>
            </div>
          </div>

          {/* Desktop links — CSS shows only on lg+ */}
          <div className="nb-links">
            {navItems.map((item, i) => <NavItem key={i} item={item} />)}
          </div>

          {/* Desktop CTA — CSS shows only on lg+ */}
          <div className="nb-cta">
            <a href="tel:+919360959094" className="nb-phone">
              <HiPhone /> +91 93609 59094
            </a>
            <button className="btn-gold nb-consult" onClick={() => goTo('#contact')}>
              Free Consultation
            </button>
          </div>

          {/* Hamburger — CSS shows only on mobile */}
          <button
            className="nb-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nb-mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nb-mobile-inner">
              {navItems.map((item, i) => (
                <div key={i} className="nb-mobile-row">
                  {item.dropdown ? (
                    <>
                      <button
                        className="nb-mobile-btn"
                        onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                      >
                        {item.label}
                        <HiChevronDown className={`nb-chevron${mobileExpanded === i ? ' nb-chevron-open' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="nb-mobile-sub"
                          >
                            {item.dropdown.map((sub, j) => (
                              <a key={j} href={sub.href} className="nb-mobile-sub-link"
                                onClick={e => { e.preventDefault(); goTo(sub.href); setMobileOpen(false); }}>
                                {sub.icon && <span>{sub.icon}</span>}
                                {sub.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href={item.href} className="nb-mobile-link"
                      onClick={e => { e.preventDefault(); goTo(item.href); setMobileOpen(false); }}>
                      {item.label}
                    </a>
                  )}
                </div>
              ))}

              <div className="nb-mobile-footer">
                <a href="tel:+919360959094" className="nb-mobile-phone"><HiPhone /> +91 93609 59094</a>
                <button className="btn-gold nb-mobile-consult"
                  onClick={() => { goTo('#contact'); setMobileOpen(false); }}>
                  Get Free Consultation
                </button>
                <div className="nb-mobile-socials">
                  {[FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF].map((I, i) => (
                    <a key={i} href="#" className="nb-mobile-social"><I /></a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP */}
      <a href="https://wa.me/919360959094" target="_blank" rel="noopener noreferrer"
        className="nb-whatsapp" aria-label="WhatsApp">
        <FaWhatsapp className="nb-wa-icon" />
        <span className="nb-wa-label">Chat with us</span>
      </a>
    </>
  );
}
