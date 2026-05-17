import { FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const links = {
  'Quick Links': ['Home', 'About Us', 'Services', 'Projects', 'Process', 'Contact'],
  'Services': ['Architecture', 'Construction', 'Interior Design', 'Renovation', 'Consultation', 'Project Management'],
};

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 border border-[#C9A84C] flex items-center justify-center">
                  <span className="font-display text-lg font-bold gold-text">LC</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#C9A84C]" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold tracking-wide text-white leading-none">LUXE</p>
                <p className="text-[9px] tracking-[0.25em] text-[#C9A84C] uppercase leading-none mt-0.5">CONSTRUCT</p>
              </div>
            </div>
            <p className="text-white/35 text-[13px] font-light leading-relaxed mb-8">
              Building luxury homes and commercial spaces with excellence, precision, and unmatched craftsmanship for over 15 years.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-[#C9A84C]/20 flex items-center justify-center text-white/30 text-sm hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-6 font-medium">{heading}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollTo(item.split(' ')[0])}
                      className="text-white/35 text-[13px] font-light hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <HiArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-6 font-medium">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1">Address</p>
                <p className="text-white/40 text-[13px] font-light leading-relaxed">4th Floor, Cyber Towers, HITEC City, Hyderabad — 500081</p>
              </div>
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1">Phone</p>
                <p className="text-white/40 text-[13px] font-light">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1">Email</p>
                <p className="text-[#C9A84C]/70 text-[13px] font-light">hello@luxeconstruct.in</p>
              </div>
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1">Hours</p>
                <p className="text-white/40 text-[13px] font-light">Mon – Sat: 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[12px] font-light tracking-wide">
            © {new Date().getFullYear()} Luxe Construct. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
              <a key={item} href="#" className="text-white/20 text-[11px] tracking-wide hover:text-[#C9A84C]/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
