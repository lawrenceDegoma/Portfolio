import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';

export default function Home(){
  return(
    <main>
      <AboutMe />

      <div className="flex justify-center mt-10">
        <a href="#projects" className="mt-10 animate-bounce text-3xl cursor-pointer">
          ↓
        </a>
      </div>
      
      <section id="projects" className="mt-32 w-full">
        <Projects />
      </section>
    </main>
  ); 
}

