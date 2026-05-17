import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Rajesh Muthukumar',
    role: 'Villa Owner, Jubilee Hills',
    image: 'https://i.pravatar.cc/100?img=11',
    rating: 5,
    review: 'Luxe Construct transformed our dream into reality beyond what we imagined. The attention to detail, quality of materials, and the professionalism of the entire team is commendable. Our villa was delivered on time and within budget.',
  },
  {
    name: 'Priya Venkataraman',
    role: 'Home Owner, Banjara Hills',
    image: 'https://i.pravatar.cc/100?img=5',
    rating: 5,
    review: 'From the first consultation to the handover, every interaction was seamless. Their designers perfectly captured our aesthetic vision, and the construction team executed it flawlessly. I would recommend them to anyone seeking a premium home.',
  },
  {
    name: 'Suresh Nair',
    role: 'Commercial Client, HITEC City',
    image: 'https://i.pravatar.cc/100?img=15',
    rating: 5,
    review: 'For our corporate headquarters, we needed a builder who could match our brand prestige. Luxe Construct delivered a world-class facility that impressed every stakeholder. The ISO-certified processes were clearly evident in every phase.',
  },
  {
    name: 'Ananya Krishnamurthy',
    role: 'Farm House Owner, Chevella',
    image: 'https://i.pravatar.cc/100?img=9',
    rating: 5,
    review: 'Our farm house project involved complex terrain and custom architecture. The team handled every challenge with expertise and creativity. The final result is absolutely stunning - a perfect weekend retreat that exceeded all expectations.',
  },
  {
    name: 'Vikram Reddy',
    role: 'Villa Owner, Madhapur',
    image: 'https://i.pravatar.cc/100?img=3',
    rating: 5,
    review: 'The transparency throughout the project was remarkable. Weekly progress reports, clear communication, zero surprises on billing. Luxe Construct is the gold standard in luxury construction. Our family is absolutely thrilled.',
  },
];

export default function Testimonials() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden" style={{ background: '#111111' }}>
      <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(ellipse at center, #C9A84C 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-yellow-600" />
            <span className="section-eyebrow">Client Stories</span>
            <div className="w-8 h-px bg-yellow-600" />
          </div>
          <h2 className="font-display font-light text-white leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            What Our <span className="gold-text italic">Clients Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            style={{ paddingBottom: '50px' }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="p-8 rounded-sm" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.12)', minHeight: '320px' }}>
                  <FaQuoteLeft style={{ color: 'rgba(201,168,76,0.2)', fontSize: '2rem', marginBottom: '1.5rem' }} />
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, j) => <FaStar key={j} style={{ color: '#C9A84C', fontSize: '0.875rem' }} />)}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', fontWeight: 300, lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic' }}>
                    {t.review}
                  </p>
                  <div className="flex items-center gap-4" style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <img src={t.image} alt={t.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(201,168,76,0.3)' }} loading="lazy" />
                    <div>
                      <p style={{ fontWeight: 500, color: '#fff', fontSize: 14 }}>{t.name}</p>
                      <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
