import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import Process from '../components/sections/Process';
import Awards from '../components/sections/Awards';
import Testimonials from '../components/sections/Testimonials';
import Stats from '../components/sections/Stats';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';

export default function HomePage() {
  return (
    <div style={{ background: '#0F0F0F' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Stats />
        <Awards />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
