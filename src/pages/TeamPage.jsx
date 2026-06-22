import PageShell from '../components/layouts/PageShell';
import { teamMembers } from '../data/site';

export default function TeamPage() {
  return (
    <PageShell
      seoTitle="Team"
      seoDescription="Meet the MSK Construction team behind construction, architecture, planning, and site execution."
      hero={{
        eyebrow: 'Our Team',
        title: 'Meet the Experts Behind Your Dream Spaces',
        description: 'Our team brings design, planning, project management, procurement, and site execution together under one coordinated process.',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1800&q=80',
        current: 'Team',
      }}
    >
      <section className="section-pad" style={{ background: '#0F0F0F' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '18px' }}>
          {teamMembers.map(([name, role, quote], index) => (
            <article key={name} style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.025)', overflow: 'hidden' }}>
              <img src={`https://images.unsplash.com/photo-${['1560250097-0b93528c311a','1573496359142-b8d87734a5a2','1519085360753-af0119f7cbe7','1580489944761-15a19d654956'][index % 4]}?w=700&q=80`} alt={name} style={{ width: '100%', height: '230px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h2 className="font-display" style={{ color: '#fff', fontSize: '24px', fontWeight: 300 }}>{name}</h2>
                <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 0 12px' }}>{role}</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.7 }}>{quote}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
