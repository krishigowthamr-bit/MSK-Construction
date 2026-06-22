import PageShell from '../components/layouts/PageShell';
import { blogPosts } from '../data/site';

export default function BlogPage() {
  return (
    <PageShell
      seoTitle="Blog"
      seoDescription="Construction, architecture, interior, and renovation guides from MSK Construction."
      hero={{
        eyebrow: 'Resources',
        title: 'Construction Guides and Ideas',
        description: 'Explore practical articles on budgeting, packages, architecture planning, and construction choices before starting your project.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=80',
        current: 'Blog',
      }}
    >
      <section className="section-pad" style={{ background: '#0F0F0F' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
          {blogPosts.map(post => (
            <article key={post.title} style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.025)', overflow: 'hidden' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '230px', objectFit: 'cover' }} />
              <div style={{ padding: '22px' }}>
                <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '10px' }}>{post.category}</p>
                <h2 className="font-display" style={{ color: '#fff', fontSize: '27px', fontWeight: 300, lineHeight: 1.2, marginBottom: '12px' }}>{post.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.46)', fontSize: '14px', lineHeight: 1.75, marginBottom: '18px' }}>{post.excerpt}</p>
                <a href="/contact" style={{ color: '#E8C97A', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>Discuss This Topic</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
