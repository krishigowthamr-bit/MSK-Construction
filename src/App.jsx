import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Process from './components/sections/Process';
import Awards from './components/sections/Awards';
import Testimonials from './components/sections/Testimonials';
import Stats from './components/sections/Stats';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      {/* Hero is full-screen so it handles its own top padding internally */}
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
