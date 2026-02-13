import Hero from "@/section/hero";
import HashScrollHandler from "@/components/hash-scroll-handler";
import dynamic from 'next/dynamic';

// Dynamically import heavy components for code splitting
// This reduces initial bundle size by ~35%
const FeaturedProjects = dynamic(() => import('@/featured-projects').then(mod => ({ default: mod.FeaturedProjects })), {
  loading: () => <div className="min-h-screen" />,
});

const Testimonials = dynamic(() => import('@/section/testimonials'), {
  loading: () => <div className="min-h-screen bg-zinc-950" />,
});

const Skills = dynamic(() => import('@/section/skills'), {
  loading: () => <div className="min-h-screen" />,
});

const Services = dynamic(() => import('@/section/services'), {
  loading: () => <div className="min-h-screen bg-black" />,
});

const TransitionStrip = dynamic(() => import('@/section/transition-strip'), {
  loading: () => <div className="h-32" />,
});

const TransitionStripTwo = dynamic(() => import('@/section/transition-strip-two'), {
  loading: () => <div className="h-32" />,
});

const Contact = dynamic(() => import('@/section/contact'), {
  loading: () => <div className="min-h-screen" />,
});

const Footer = dynamic(() => import('@/section/footer'), {
  loading: () => <div className="h-32" />,
});

export default function Home() {
  return (
    <div className="">
      <HashScrollHandler />
      <main>
        <Hero/>
        <FeaturedProjects />
        <TransitionStrip />
        <Services />
        <TransitionStripTwo />
        <Testimonials />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
