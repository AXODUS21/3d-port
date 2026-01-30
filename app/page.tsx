import Hero from "@/section/hero";
import FeaturedProjects from "@/section/featured-projects";
import Experiences from "@/section/experiences";
import Testimonials from "@/section/testimonials";
import Skills from "@/section/skills";
import Services from "@/section/services";
import Contact from "@/section/contact";
import Footer from "@/section/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main>
        <Hero/>
        <FeaturedProjects />
        <Experiences />
        <Services />
        <Testimonials />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
