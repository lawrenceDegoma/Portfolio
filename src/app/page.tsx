import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectsNew from '../components/ProjectsNew';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <ProjectsNew />
      <Contact />
    </main>
  );
}
