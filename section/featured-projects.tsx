'use client'

import React, { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import TransitionLink from '@/components/transition-link'

const projects = [
  {
    id: 1,
    title: "NEON VERTEX",
    category: "Interactive 3D Experience",
    description: "A revolutionary web graphics engine capable of rendering millions of particles in real-time. Designed for next-generation data visualization and immersive storytelling.",
    tags: ["WebGL", "Three.js", "React Fiber"],
    year: "2025",
    image: "/projects/Velocity.png",
    bgColor: "from-purple-900/40 to-blue-900/40"
  },
  {
    id: 2,
    title: "AETHER FINANCE",
    category: "DeFi Dashboard",
    description: "Institutional-grade diversified portfolio management with real-time analytics and prediction markets. built on the Solana blockchain for micro-latency updates.",
    tags: ["Solana", "Rust", "Next.js"],
    year: "2025",
    image: "/projects/KTP.png",
    bgColor: "from-emerald-900/40 to-teal-900/40"
  },
  {
    id: 3,
    title: "SYNTH OS",
    category: "Web Operating System",
    description: "A fully functional cloud operating system that lives in the browser. Features a complete file system, window manager, and native-feeling application suite.",
    tags: ["TypeScript", "WASM", "System Desing"],
    year: "2024",
    image: "/projects/SBTLC.png",
    bgColor: "from-orange-900/40 to-red-900/40"
  },
  {
    id: 4,
    title: "VOID RUNNER",
    category: "Browser Game",
    description: "Cyberpunk infinite runner featuring procedural generation and reactive audio synthesis. Pushing the limits of browser performance without external engines.",
    tags: ["Canvas API", "WebAudio", "Procedural"],
    year: "2024",
    image: "/projects/Spooftify.png",
    bgColor: "from-cyan-900/40 to-indigo-900/40"
  },
  {
    id: 5,
    title: "EMAIL SUPERSTARS",
    category: "Marketing Platform",
    description: "Advanced email marketing automation platform with AI-powered content generation and comprehensive analytics dashboard.",
    tags: ["AI", "Analytics", "Automation"],
    year: "2024",
    image: "/projects/Emailsuperstars.png",
    bgColor: "from-pink-900/40 to-rose-900/40"
  }
]

const FeaturedProjects = () => {
  return (
    <section 
      id="work" 
      className="relative bg-zinc-950"
      style={{ 
        scrollSnapType: 'y proximity',
        scrollPaddingTop: '0px'
      }}
    >
      
      {/* Section Header - Sticky */}
      <div className="sticky top-0 z-0 h-screen flex flex-col items-center justify-center text-center pointer-events-none">
         <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter text-zinc-900 select-none">
            WORK
         </h2>
      </div>

      {/* Stacking Cards with Background Images */}
      <div className="relative z-10 -mt-[100vh]">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="sticky top-0 h-screen w-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always'
            }}
          >
            {/* Colored gradient overlay on the background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor}`} />
            
            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Semi-transparent Card */}
            <div className="relative z-10 w-full h-full md:w-[90%] md:h-[90%] border border-white/20 md:rounded-3xl overflow-hidden shadow-2xl">
                {/* Card semi-transparent background */}
                <div className="w-full h-full p-8 md:p-16 flex flex-col justify-between bg-zinc-900/60 backdrop-blur-sm">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-zinc-200 font-mono text-sm tracking-wider">0{project.id} / 05</span>
                            <span className="text-zinc-200 font-mono text-sm tracking-wider">{project.year}</span>
                        </div>
                        
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight tracking-tight">
                            {project.title}
                        </h3>
                        <p className="text-xl text-zinc-100 mb-8 font-light">
                            {project.category}
                        </p>
                        
                        <p className="text-zinc-50 leading-relaxed max-w-md text-lg">
                            {project.description}
                        </p>
                    </div>

                    <div>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-zinc-100 font-mono uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <TransitionLink 
                          href={`/project/${project.id}`}
                          className="group flex items-center gap-2 text-white border-b border-white/50 pb-1 hover:border-white transition-all w-fit"
                        >
                            <span className="uppercase tracking-widest text-sm font-bold">More Details</span>
                            <ArrowUpRight className="w-4 h-4 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </TransitionLink>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Spacer for bottom */}
      <div className="h-screen bg-transparent pointer-events-none" />
      
    </section>
  )
}

export default FeaturedProjects
