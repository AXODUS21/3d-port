import Hero from "@/section/hero";
import FeaturedProjects from "@/section/featured-projects";
import Testimonials from "@/section/testimonials";
import Skills from "@/section/skills";
import Services from "@/section/services";
import Contact from "@/section/contact";
import Footer from "@/section/footer";
import Image from "next/image";
import HashScrollHandler from "@/components/hash-scroll-handler";

export default function Home() {
  return (
    <div className="">
      <HashScrollHandler />
      <main>
        <Hero/>
        <FeaturedProjects />
        <Services />
        <Testimonials />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
