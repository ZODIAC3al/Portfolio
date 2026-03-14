import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Experience from './components/Experience';

export default function App() {
  return (
    <>
      {/* Ambient glow orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Services />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
