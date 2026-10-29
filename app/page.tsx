import Image from "next/image";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Projects from "./Components/Project";
import Experience from "./Components/Experience";
import Skills from "./Components/Skills.";
import Education from "./Components/Education";
import Contact from "./Components/Contact";
import Resume from "./Components/Resume";

export default function Home() {
  return (
    <>
   <Hero/>
   <About/>
   <Resume/>
   <Skills/>
   <Projects/>
   <Experience/>
   <Education/>
   <Contact/>
   </>
  )
}
