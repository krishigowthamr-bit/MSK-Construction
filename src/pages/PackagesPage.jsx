import PageShell from '../components/layouts/PageShell';
import FAQAccordion from '../components/ui/FAQAccordion';
import { constructionPackages, faqs } from '../data/site';

export default function PackagesPage() {
  return (
    <PageShell
      seoTitle="Construction Packages"
      seoDescription="Compare MSK Construction packages with starting prices, inclusions, and consultation options."
      hero={{
        eyebrow: 'Construction Packages',
        title: 'Transparent Packages for Every Build',
        description: 'Choose from practical, mid-range, and premium construction packages based on your budget, finish level, and project goals.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=80',
        current: 'Packages',
      }}
    >
      <section className="section-pad" style={{ background: '#0F0F0F' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {constructionPackages.map(pkg => (
              <article key={pkg.name} style={{ border: '1px solid rgba(201,168,76,0.18)', background: 'rgba(255,255,255,0.025)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div>
                  <p className="section-eyebrow" style={{ marginBottom: '10px' }}>{pkg.name}</p>
                  <h2 className="font-display" style={{ color: '#fff', fontSize: '32px', fontWeight: 300, marginBottom: '8px' }}>{pkg.price}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '14px', lineHeight: 1.75 }}>{pkg.description}</p>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                  {pkg.features.map(feature => (
                    <li key={feature} style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="btn-gold" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '13px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Get This Package
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#111111' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '34px' }}>
            <p className="section-eyebrow" style={{ marginBottom: '12px' }}>FAQ</p>
            <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>Package Questions</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </PageShell>
  );
}
