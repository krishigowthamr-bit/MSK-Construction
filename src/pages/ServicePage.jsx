import { useParams } from 'react-router-dom';
import PageShell from '../components/layouts/PageShell';
import FAQAccordion from '../components/ui/FAQAccordion';
import Testimonials from '../components/sections/Testimonials';
import { faqs, servicePages } from '../data/site';

export default function ServicePage() {
  const { type = 'construction' } = useParams();
  const page = servicePages[type] || servicePages.construction;

  return (
    <PageShell
      seoTitle={page.title}
      seoDescription={page.summary}
      hero={{ eyebrow: page.eyebrow, title: page.title, description: page.summary, image: page.image, current: page.title }}
    >
      <section className="section-pad" style={{ background: '#0F0F0F' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1px', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.12)', marginBottom: '54px' }}>
            {page.highlights.map(item => (
              <div key={item} style={{ background: 'rgba(255,255,255,0.025)', padding: '22px 18px', textAlign: 'center' }}>
                <p style={{ color: '#E8C97A', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{item}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '28px' }}>
            {page.sections.map((section, index) => (
              <div key={section.title} className="service-detail-grid" style={{ display: 'grid', gridTemplateColumns: index % 2 === 0 ? '0.85fr 1.15fr' : '1.15fr 0.85fr', gap: '34px', alignItems: 'center' }}>
                <div style={{ order: index % 2 === 0 ? 0 : 1 }}>
                  <p className="section-eyebrow" style={{ marginBottom: '12px' }}>0{index + 1}</p>
                  <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '14px' }}>{section.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.85 }}>{section.text}</p>
                </div>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {section.items.map(item => (
                    <div key={item} style={{ border: '1px solid rgba(201,168,76,0.14)', background: 'rgba(255,255,255,0.025)', padding: '18px 20px', color: 'rgba(255,255,255,0.76)', fontSize: '14px' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#111111' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '38px' }}>
            <p className="section-eyebrow" style={{ marginBottom: '12px' }}>Packages</p>
            <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>Tailored Options for Every Need</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '18px' }}>
            {page.packages.map(pkg => (
              <div key={pkg} style={{ border: '1px solid rgba(201,168,76,0.16)', background: 'rgba(255,255,255,0.025)', padding: '24px' }}>
                <h3 className="font-display" style={{ color: '#fff', fontSize: '26px', fontWeight: 300, marginBottom: '8px' }}>{pkg}</h3>
                <p style={{ color: 'rgba(255,255,255,0.46)', fontSize: '14px', lineHeight: 1.7 }}>Structured scope, clear deliverables, and guided consultation.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section-pad" style={{ background: '#0F0F0F' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '34px' }}>
            <p className="section-eyebrow" style={{ marginBottom: '12px' }}>FAQ</p>
            <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>Questions Clients Ask</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </PageShell>
  );
}
