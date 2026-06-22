import PageShell from '../components/layouts/PageShell';
import Contact from '../components/sections/Contact';
import FAQAccordion from '../components/ui/FAQAccordion';
import { faqs } from '../data/site';

export default function ContactPage() {
  return (
    <PageShell
      seoTitle="Contact"
      seoDescription="Contact MSK Construction for construction, architecture, interior, renovation, and package consultation."
      hero={{
        eyebrow: 'Contact Us',
        title: 'Start Your Dream Project',
        description: 'Share your requirement with our team. We will help you understand scope, budget, timeline, and the right next step.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80',
        current: 'Contact',
      }}
      cta={false}
    >
      <Contact />
      <section className="section-pad" style={{ background: '#111111' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '34px' }}>
            <p className="section-eyebrow" style={{ marginBottom: '12px' }}>FAQ</p>
            <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>Before You Contact Us</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </PageShell>
  );
}
