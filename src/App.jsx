import './index.css';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));

// Scroll to top on route change
function ScrollToTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNav />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0F0F0F' }} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services/:type" element={<ServicePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/services/construction/packages" element={<PackagesPage />} />
          <Route path="/services/construction/cost-estimator-chennai" element={<PackagesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/career" element={<ContactPage />} />
          <Route path="/vendor-registration" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
