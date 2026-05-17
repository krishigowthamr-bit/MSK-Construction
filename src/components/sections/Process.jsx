import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../animations/variants';
import { BsChatDots, BsFileEarmarkCheck, BsPencilSquare, BsTools, BsHouseCheck } from 'react-icons/bs';

const steps = [
  {
    icon: <BsChatDots />,
    step: '01',
    title: 'Initial Discussion',
    description: 'We begin with a comprehensive consultation to understand your vision, requirements, lifestyle preferences, and budget parameters.',
  },
  {
    icon: <BsFileEarmarkCheck />,
    step: '02',
    title: 'Agreement & Planning',
    description: 'A detailed project agreement is formalized covering scope, timelines, milestones, and transparent cost breakdowns with no hidden charges.',
  },
  {
    icon: <BsPencilSquare />,
    step: '03',
    title: 'Design Finalization',
    description: 'Our architects and designers craft detailed blueprints, 3D renders, and material selections for your review and approval.',
  },
  {
    icon: <BsTools />,
    step: '04',
    title: 'Execution',
    description: 'Construction commences with our expert team, regular progress reports, and strict quality control at every phase of the build.',
  },
  {
    icon: <BsHouseCheck />,
    step: '05',
    title: 'Handover',
    description: 'Your dream home is delivered with a complete walkthrough, documentation package, and our comprehensive post-handover warranty.',
  },
];

export default function Process() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="section-pad relative overflow-hidden" style={{ background: '#111111' }}>
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5" style={{
        background: 'radial-gradient(ellipse at top right, #C9A84C, transparent 60%)'
      }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="section-eyebrow">How We Work</span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2 className="font-display font-light text-white leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Our <span className="gold-text italic">Construction Process</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-[15px] font-light">
            A proven, transparent five-step process designed to deliver your dream home on time and beyond expectations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-0 right-0 h-px hidden lg:block" style={{
            background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), rgba(201,168,76,0.3), rgba(201,168,76,0.3), transparent)'
          }} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative text-center group"
              >
                {/* Icon circle */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-all duration-400 group-hover:scale-110"
                    style={{
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: '#C9A84C',
                    }}
                  >
                    {step.icon}
                  </div>
                  {/* Step number */}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold"
                    style={{ background: '#C9A84C', color: '#0F0F0F' }}
                  >
                    {i + 1}
                  </div>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{
                    boxShadow: '0 0 30px rgba(201,168,76,0.3)'
                  }} />
                </div>

                <h3 className="font-display text-lg font-medium text-white mb-3 group-hover:gold-text transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/40 text-[13px] font-light leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow connector on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 text-[#C9A84C]/30 z-10">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
