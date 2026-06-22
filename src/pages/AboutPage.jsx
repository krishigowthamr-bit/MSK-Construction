import PageShell from '../components/layouts/PageShell';
import Awards from '../components/sections/Awards';
import Testimonials from '../components/sections/Testimonials';
import { teamMembers } from '../data/site';

const values = ['Customer-Centric Approach', 'Experienced Team', 'Quality Assurance', 'Timely Delivery', 'Local Expertise'];

export default function AboutPage() {
  return (
    <PageShell
      seoTitle="About MSK Construction"
      seoDescription="Learn about MSK Construction, our founder-led approach, awards, team, and construction values."
      hero={{
        eyebrow: 'About Us',
        title: '15+ Years of Building Excellence',
        description: 'We build lasting relationships through quality construction, practical design thinking, transparent communication, and dependable execution.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80',
        current: 'About',
      }}
    >
      <section className="section-pad" style={{ background: '#0F0F0F' }}>
        <div className="about-page-grid" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '44px', alignItems: 'center' }}>
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80" alt="MSK Construction leadership" style={{ width: '100%', height: '460px', objectFit: 'cover', border: '1px solid rgba(201,168,76,0.14)' }} />
          <div>
            <p className="section-eyebrow" style={{ marginBottom: '12px' }}>Our Story</p>
            <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '18px' }}>Building not just structures, but confidence.</h2>
            <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '15px', lineHeight: 1.9, marginBottom: '24px' }}>
              Our process is designed around clarity: understand the client, plan the scope, align budget and finishes, execute with site discipline, and hand over with care.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {values.map(value => (
                <div key={value} style={{ border: '1px solid rgba(201,168,76,0.14)', background: 'rgba(255,255,255,0.025)', padding: '16px', color: 'rgba(255,255,255,0.76)', fontSize: '13px' }}>
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Awards />

      <section className="section-pad" style={{ background: '#111111' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '38px' }}>
            <p className="section-eyebrow" style={{ marginBottom: '12px' }}>Team</p>
            <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>The People Behind MSK</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '18px' }}>
            {teamMembers.slice(0, 4).map(([name, role, quote], index) => (
              <div key={name} style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.025)', overflow: 'hidden' }}>
                <img src={`https://images.unsplash.com/photo-${['1560250097-0b93528c311a','1573496359142-b8d87734a5a2','1519085360753-af0119f7cbe7','1580489944761-15a19d654956'][index]}?w=700&q=80`} alt={name} style={{ width: '100%', height: '230px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <h3 className="font-display" style={{ color: '#fff', fontSize: '24px', fontWeight: 300 }}>{name}</h3>
                  <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 0 12px' }}>{role}</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.7 }}>{quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </PageShell>
  );
}
