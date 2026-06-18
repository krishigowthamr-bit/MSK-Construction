import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';
import {
  HiChevronRight,
  HiClipboardList,
  HiHome,
  HiPhotograph,
  HiPlus,
  HiTrash,
} from 'react-icons/hi';

const STORAGE_KEY = 'msk-admin-projects';

const initialForm = {
  title: '',
  category: 'Residence',
  location: '',
  area: '',
  year: new Date().getFullYear().toString(),
  status: 'Planning',
  image: '',
  description: '',
};

const categories = ['Residence', 'Villa', 'Farm House', 'Commercial', 'Interior', 'Renovation'];
const statuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];

function loadProjects() {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export default function AdminPage() {
  const [form, setForm] = useState(initialForm);
  const [projects, setProjects] = useState(() => loadProjects());
  const [saved, setSaved] = useState(false);

  const stats = useMemo(() => {
    const completed = projects.filter(project => project.status === 'Completed').length;
    const active = projects.filter(project => project.status === 'In Progress').length;

    return [
      { label: 'Saved Projects', value: projects.length },
      { label: 'Active Sites', value: active },
      { label: 'Completed', value: completed },
    ];
  }, [projects]);

  const updateForm = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const saveProjects = (nextProjects) => {
    setProjects(nextProjects);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProjects));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const project = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    saveProjects([project, ...projects]);
    setForm(initialForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const removeProject = (id) => {
    saveProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div style={{ background: '#0F0F0F', minHeight: '100vh' }}>
      <Navbar />

      <main>
        <section style={{ position: 'relative', padding: '160px 24px 76px', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(135deg, rgba(8,8,8,0.92), rgba(8,8,8,0.75)), url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0F0F0F 0%, transparent 45%)' }} />

          <div style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '18px',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '12px',
            }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <HiHome /> Home
              </Link>
              <HiChevronRight style={{ color: '#C9A84C' }} />
              <span style={{ color: '#C9A84C' }}>Admin</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              style={{ maxWidth: '720px' }}
            >
              <span className="section-eyebrow">Project Management</span>
              <h1 className="font-display" style={{
                color: '#fff',
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                marginTop: '14px',
                marginBottom: '18px',
              }}>
                Admin <span className="gold-text" style={{ fontStyle: 'italic' }}>Entry Form</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.8, maxWidth: '620px' }}>
                Add project records, image references, and construction status details from one focused panel.
              </p>
            </motion.div>
          </div>
        </section>

        <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px 96px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            marginBottom: '28px',
            border: '1px solid rgba(201,168,76,0.13)',
            background: 'rgba(201,168,76,0.1)',
          }}>
            {stats.map(stat => (
              <div key={stat.label} style={{ background: 'rgba(255,255,255,0.025)', padding: '22px 24px' }}>
                <p className="font-display" style={{ color: '#E8C97A', fontSize: '34px', lineHeight: 1, marginBottom: '6px' }}>{stat.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(300px, 0.75fr)', gap: '28px' }} className="admin-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.025)', padding: '30px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '26px' }}>
                <div>
                  <p className="section-eyebrow">Create Entry</p>
                  <h2 className="font-display" style={{ color: '#fff', fontSize: '32px', fontWeight: 300, marginTop: '6px' }}>Project Details</h2>
                </div>
                <HiClipboardList style={{ color: '#C9A84C', fontSize: '34px', flexShrink: 0 }} />
              </div>

              {saved && (
                <div style={{
                  border: '1px solid rgba(37,211,102,0.32)',
                  background: 'rgba(37,211,102,0.08)',
                  color: '#9AF0BA',
                  padding: '12px 14px',
                  marginBottom: '22px',
                  fontSize: '13px',
                }}>
                  Project entry saved in this browser.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-x-6">
                  <div className="form-field">
                    <input value={form.title} onChange={e => updateForm('title', e.target.value)} type="text" placeholder=" " required />
                    <label>Project Title</label>
                  </div>
                  <div className="form-field">
                    <select value={form.category} onChange={e => updateForm('category', e.target.value)} className="admin-select" required>
                      {categories.map(category => <option key={category} value={category}>{category}</option>)}
                    </select>
                    <label>Category</label>
                  </div>
                  <div className="form-field">
                    <input value={form.location} onChange={e => updateForm('location', e.target.value)} type="text" placeholder=" " required />
                    <label>Location</label>
                  </div>
                  <div className="form-field">
                    <input value={form.area} onChange={e => updateForm('area', e.target.value)} type="text" placeholder=" " required />
                    <label>Built Area</label>
                  </div>
                  <div className="form-field">
                    <input value={form.year} onChange={e => updateForm('year', e.target.value)} type="number" min="2000" max="2100" placeholder=" " required />
                    <label>Year</label>
                  </div>
                  <div className="form-field">
                    <select value={form.status} onChange={e => updateForm('status', e.target.value)} className="admin-select" required>
                      {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <label>Status</label>
                  </div>
                </div>

                <div className="form-field">
                  <input value={form.image} onChange={e => updateForm('image', e.target.value)} type="url" placeholder=" " />
                  <label>Image URL</label>
                </div>

                <div className="form-field">
                  <textarea value={form.description} onChange={e => updateForm('description', e.target.value)} rows="5" placeholder=" " required />
                  <label>Project Description</label>
                </div>

                <button type="submit" className="btn-gold" style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '16px',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}>
                  <HiPlus /> Save Project
                </button>
              </form>
            </motion.div>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.025)', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <HiPhotograph style={{ color: '#C9A84C', fontSize: '22px' }} />
                  <h3 className="font-display" style={{ color: '#fff', fontSize: '24px', fontWeight: 300 }}>Live Preview</h3>
                </div>

                <div style={{ height: '170px', background: '#151515', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '18px' }}>
                  {form.image ? (
                    <img src={form.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.24)', fontSize: '13px' }}>
                      Image preview
                    </div>
                  )}
                </div>

                <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '8px' }}>{form.category}</p>
                <h4 className="font-display" style={{ color: '#fff', fontSize: '26px', fontWeight: 300, lineHeight: 1.2, marginBottom: '8px' }}>
                  {form.title || 'Project title'}
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px', lineHeight: 1.7 }}>
                  {form.location || 'Location'} {form.area ? `- ${form.area}` : ''}
                </p>
              </div>

              <div style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.025)', padding: '24px' }}>
                <h3 className="font-display" style={{ color: '#fff', fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Recent Entries</h3>
                {projects.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.36)', fontSize: '13px', lineHeight: 1.7 }}>
                    Saved projects will appear here after you submit the form.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {projects.slice(0, 5).map(project => (
                      <div key={project.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                        <div>
                          <p style={{ color: '#fff', fontSize: '14px', marginBottom: '4px' }}>{project.title}</p>
                          <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: '12px' }}>{project.status} - {project.year}</p>
                        </div>
                        <button type="button" onClick={() => removeProject(project.id)} aria-label={`Remove ${project.title}`} style={{
                          width: '34px',
                          height: '34px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255,255,255,0.12)',
                          background: 'transparent',
                          color: 'rgba(255,255,255,0.48)',
                          cursor: 'pointer',
                        }}>
                          <HiTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
