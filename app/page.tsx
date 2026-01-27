import Hero from "@/section/hero";
import FeaturedProjects from "@/section/featured-projects";
import Testimonials from "@/section/testimonials";
import Skills from "@/section/skills";
import Services from "@/section/services";
import Contact from "@/section/contact";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main>
        <Hero/>
        <FeaturedProjects />
        <Testimonials />
        <Skills />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
