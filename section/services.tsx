'use client'

import React, { useEffect, useRef, useState } from 'react'

// Simple scroll listener is enough for this "sticky section" pattern.

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      id: "01",
      title: "Web Development",
      description: "Building fast, responsive, and accessible websites using modern frameworks and best practices. We focus on clean code and scalable architecture.",
      gradient: "from-blue-600/20 via-indigo-900/20 to-black"
    },
    {
        id: "02",
      title: "3D Experiences",
      description: "Creating immersive 3D web experiences with Three.js and WebGL. Turn passive viewers into active participants with interactive storytelling.",
      gradient: "from-purple-600/20 via-pink-900/20 to-black"
    },
    {
        id: "03",
      title: "UI/UX Design",
      description: "Designing intuitive and aesthetically pleasing user interfaces that drive engagement. We prioritize user journey and accessibility above all.",
      gradient: "from-orange-600/20 via-red-900/20 to-black"
    },
    {
        id: "04",
      title: "Technical Strategy",
      description: "Consulting on architecture, tech stack selection, and scalability planning. We help businesses make informed decisions for long-term success.",
      gradient: "from-emerald-600/20 via-teal-900/20 to-black"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we are scrolled through the section
      // The section starts scrolling when top reaches 0 (or slightly before/after depending on sticky)
      // We want to map the scroll progress to the service index.
      
      // We have services.length items. 
      // Let's say the total scrollable height is (services.length + 1) * windowHeight (handled by CSS height)
      // effectively we want to switch when we scroll past each "page"
      
      const scrollDistance = -top;
      const sectionHeight = height - windowHeight; // available scrollable distance
      
      if (sectionHeight <= 0) return;

      // Determine index based on scroll position
      // We want the changes to happen as we scroll through.
      const rawIndex = Math.floor((scrollDistance / sectionHeight) * services.length);
      const clampedIndex = Math.max(0, Math.min(services.length - 1, rawIndex));
      
      setActiveIndex(clampedIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [services.length]);

  return (
    <section 
        ref={containerRef} 
        id="services" 
        className="relative bg-zinc-950"
        style={{ height: `${(services.length + 1) * 100}vh` }} // Make the section tall enough to scroll through
    >
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Dynamic Background */}
        {services.map((service, index) => (
             <div 
                key={service.id}
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-opacity duration-1000 ease-in-out ${
                    activeIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
             />
        ))}
        
        {/* Static Background Elements */}
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />


        {/* Centered Fixed Card */}
        <div className="relative z-10 max-w-2xl w-full mx-6 h-[500px] flex flex-col justify-center"> 
             {/* The card container itself doesn't move, but content inside transitions */}
            
            <div className="bg-zinc-950/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-12 h-full relative group hover:border-white/20 transition-colors duration-500">
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-[200px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                 {/* Content Wrapper with Roulette Transition */}
                <div className="relative h-full flex flex-col justify-between">
                    
                    {/* Top Tag */}
                    <div className="h-10 overflow-hidden relative">
                         {services.map((service, index) => (
                            <span 
                                key={service.id}
                                className={`absolute top-0 left-0 inline-block text-zinc-500 font-mono text-sm tracking-widest border border-zinc-800 px-3 py-1 rounded-full uppercase transition-all duration-500 ease-out transform ${
                                    activeIndex === index 
                                    ? 'opacity-100 translate-y-0' 
                                    : activeIndex > index 
                                        ? 'opacity-0 -translate-y-8' 
                                        : 'opacity-0 translate-y-8'
                                }`}
                            >
                                Step {service.id}
                            </span>
                        ))}
                    </div>


                    {/* Title & Desc */}
                    <div className="relative flex-1 py-8">
                        {services.map((service, index) => (
                             <div 
                                key={service.id}
                                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-out transform flex flex-col justify-center h-full ${
                                    activeIndex === index 
                                    ? 'opacity-100 translate-y-0 blur-0' 
                                    : activeIndex > index 
                                        ? 'opacity-0 -translate-y-12 blur-sm' 
                                        : 'opacity-0 translate-y-12 blur-sm'
                                }`}
                             >
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                    {service.title}
                                </h3>
                                
                                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Button */}
                    <div className="mt-auto h-8 overflow-hidden relative">
                        <div className="flex items-center gap-4 text-sm font-medium text-white/50 group-hover:text-white transition-colors cursor-pointer">
                             <span className="uppercase tracking-widest">Read Details</span>
                             <div className="w-8 h-[1px] bg-current" />
                        </div>
                    </div>

                </div>

            </div>

        </div>

        {/* Large Background Text (Optional - can be static or change) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
             <h2 className="text-[12rem] md:text-[20rem] font-bold tracking-tighter text-white/2 select-none whitespace-nowrap">
                SERVICES
            </h2>
        </div>

      </div>
    </section>
  )
}

export default Services
