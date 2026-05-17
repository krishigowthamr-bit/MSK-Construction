import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '../../animations/variants';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa';

const socials = [
  { icon: <FaInstagram />, href: '#' },
  { icon: <FaLinkedinIn />, href: '#' },
  { icon: <FaFacebookF />, href: '#' },
  { icon: <FaYoutube />, href: '#' },
];

export default function Contact() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="section-pad" style={{ background: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="section-eyebrow">Get In Touch</span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2 className="font-display font-light text-white leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Start Your <span className="gold-text italic">Dream Project</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-[15px] font-light">
            Reach out to discuss your vision. Our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="space-y-8 mb-12">
              {[
                { icon: <HiLocationMarker />, label: 'Our Office', value: '4th Floor, Cyber Towers, HITEC City, Hyderabad — 500081' },
                { icon: <HiPhone />, label: 'Phone', value: '+91 98765 43210' },
                { icon: <HiMail />, label: 'Email', value: 'hello@mskconstruct.in' },
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 flex-shrink-0 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">{item.label}</p>
                    <p className="text-white/60 text-[14px] font-light leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Follow Us</p>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center text-white/40 hover:text-[#C9A84C] hover:border-[#C9A84C]/60 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative image */}
            <div className="mt-10 img-zoom rounded-sm overflow-hidden h-48 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
                alt="Office"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="p-8 md:p-10 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.12)' }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-[#C9A84C] text-5xl mb-6">✓</div>
                  <h3 className="font-display text-2xl text-white mb-3">Thank You!</h3>
                  <p className="text-white/50 text-[14px]">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-x-6">
                    <div className="form-field">
                      <input
                        type="text"
                        placeholder=" "
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        required
                      />
                      <label>Your Full Name</label>
                    </div>
                    <div className="form-field">
                      <input
                        type="email"
                        placeholder=" "
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        required
                      />
                      <label>Email Address</label>
                    </div>
                    <div className="form-field">
                      <input
                        type="tel"
                        placeholder=" "
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                      />
                      <label>Phone Number</label>
                    </div>
                    <div className="form-field">
                      <input
                        type="text"
                        placeholder=" "
                        value={form.service}
                        onChange={e => setForm({...form, service: e.target.value})}
                      />
                      <label>Service Interested In</label>
                    </div>
                  </div>
                  <div className="form-field">
                    <textarea
                      rows="5"
                      placeholder=" "
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      required
                    />
                    <label>Tell Us About Your Project</label>
                  </div>
                  <button type="submit" className="btn-gold w-full py-4 text-sm tracking-[0.15em] uppercase mt-2">
                    Send Message — Get Free Consultation
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
