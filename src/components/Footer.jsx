import { FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiArrowRight, HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';

const links = {
  'Quick Links': [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  'Our Services': [
    { label: 'Architecture', href: '#services' },
    { label: 'Construction', href: '#services' },
    { label: 'Interior Design', href: '#services' },
    { label: 'Renovation', href: '#services' },
    { label: 'Consultation', href: '#contact' },
    { label: 'Project Management', href: '#process' },
  ],
};

const socials = [
  { Icon: FaInstagram,  href: 'https://www.instagram.com/msk__construction/', label: 'Instagram' },
  { Icon: FaYoutube,    href: 'https://www.youtube.com/@mskconstruction',      label: 'YouTube' },
  { Icon: FaLinkedinIn, href: 'https://in.linkedin.com/company/mskconstruction', label: 'LinkedIn' },
  { Icon: FaFacebookF,  href: '#',                                              label: 'Facebook' },
  { Icon: FaWhatsapp,   href: 'https://wa.me/919360959094',                    label: 'WhatsApp' },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const navTo = (href) => {
    if (href.startsWith('/') && !href.startsWith('/#')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }
    const id = href.replace('#', '');
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  };

  return (
    <footer style={{ background: '#060606', borderTop: '1px solid rgba(201,168,76,0.12)' }}>

      {/* Top footer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 48px', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>

          {/* Brand column — real logo */}
          <div style={{ gridColumn: 'span 1' }}>
            {/* Real MSK Logo */}
            <div
              style={{ marginBottom: '24px', cursor: 'pointer', display: 'inline-block' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/msk-logo.png"
                alt="MSK Construction"
                style={{ height: '90px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>

            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontWeight: 300, lineHeight: 1.9, marginBottom: '28px', fontFamily: 'Jost, sans-serif' }}>
              Building luxury homes and commercial spaces with excellence, precision, and unmatched craftsmanship. Construct Your Future with MSK.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px', height: '36px',
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'color 0.25s, border-color 0.25s',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '20px', fontFamily: 'Jost, sans-serif', fontWeight: 500 }}>
                {heading}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={e => { e.preventDefault(); navTo(item.href); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontWeight: 300, textDecoration: 'none', fontFamily: 'Jost, sans-serif', transition: 'color 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.querySelector('.arrow').style.opacity = '1'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.querySelector('.arrow').style.opacity = '0'; }}
                    >
                      <HiArrowRight className="arrow" style={{ fontSize: '10px', opacity: 0, transition: 'opacity 0.2s', flexShrink: 0 }} />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '20px', fontFamily: 'Jost, sans-serif', fontWeight: 500 }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: <HiLocationMarker />, label: 'Address', value: 'Chennai, Tamil Nadu, India' },
                { icon: <HiPhone />, label: 'Phone', value: '+91 93609 59094' },
                { icon: <HiPhone />, label: 'Phone', value: '+91 72000 94121' },
                { icon: <HiMail />, label: 'Email', value: 'info@mskconstruction.in' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#C9A84C', fontSize: '15px', marginTop: '1px', flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2px', fontFamily: 'Jost, sans-serif' }}>{c.label}</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 300, fontFamily: 'Jost, sans-serif' }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', boxSizing: 'border-box' }}>
          {/* Logo small in bottom bar */}
          <img
            src="/msk-logo.png"
            alt="MSK Construction"
            style={{ height: '36px', width: 'auto', objectFit: 'contain', opacity: 0.6 }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
              © {new Date().getFullYear()} MSK Construction. All rights reserved.
            </p>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
            <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '12px', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
              Construct Your Future
            </p>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
              <a key={item} href="#"
                style={{ color: 'rgba(255,255,255,0.18)', fontSize: '11px', fontFamily: 'Jost, sans-serif', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(201,168,76,0.6)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.18)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
