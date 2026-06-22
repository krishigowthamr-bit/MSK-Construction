import PageShell from '../components/layouts/PageShell';
import { teamMembers } from '../data/site';

export default function TeamPage() {
  return (
    <PageShell
      seoTitle="Team"
      seoDescription="Meet the proprietor personally handling MSK Construction enquiries, site visits, and project execution."
      hero={{
        eyebrow: 'Founder Led',
        title: 'Meet the Person Behind MSK Construction',
        description: 'MSK Construction is currently handled directly by its proprietor, giving every client a clear single point of contact from enquiry to project updates.',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1800&q=80',
        current: 'Team',
      }}
    >
      <section className="section-pad" style={{ background: '#0F0F0F' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', padding: '0 24px' }}>
          {teamMembers.map(({ name, role, quote, photo }) => (
            <article key={name} style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.025)', overflow: 'hidden' }}>
              <img src={photo} alt={name} style={{ width: '100%', height: '560px', objectFit: 'cover', objectPosition: 'center top' }} />
              <div style={{ padding: '24px' }}>
                <h2 className="font-display" style={{ color: '#fff', fontSize: '30px', fontWeight: 300 }}>{name}</h2>
                <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 0 12px' }}>{role}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8 }}>{quote}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
