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
        scrollSnapType: 'y mandatory',
        scrollPaddingTop: '0px',
        overscrollBehavior: 'none'
      }}
    >
      
      {/* Section Header - Sticky */}
      <div className="sticky top-0 z-0 h-screen flex flex-col items-center justify-center text-center pointer-events-none">
         <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter text-zinc-900 select-none ">
            Featured Projects
         </h2>
      </div>

      <div className="relative z-10 -mt-[100vh]">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="sticky top-0 h-screen w-full"
            style={{
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              willChange: 'transform'
            }}
          >
            {/* Clickable Wrapper - Full Screen */}
            <TransitionLink 
                href={`/project/${project.id}`}
                className="block w-full h-full relative group cursor-pointer overflow-hidden"
            >
                {/* Background Image */}
                <div 
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                {/* Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} opacity-90 transition-opacity duration-500 group-hover:opacity-80`} />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40" />

                {/* Content Container - Full Screen with Padding */}
                <div className="relative z-10 w-full h-full p-8 md:p-20 flex flex-col justify-between">
                    
                    {/* Top Bar */}
                    <div className="flex justify-between items-start border-b border-white/10 pb-6">
                        <div className="flex flex-col">
                            <span className="text-zinc-300 font-mono text-xs tracking-[0.2em] uppercase mb-2">Project {String(project.id).padStart(2, '0')}</span>
                            <span className="text-white font-bold text-xl tracking-tight">{project.year}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
                            <span className="font-mono text-xs uppercase tracking-widest">Explore Case Study</span>
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Main Content - Bottom Aligned */}
                    <div className="max-w-4xl">
                        <div className="overflow-hidden mb-4">
                            <h3 className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase transform translate-y-0 transition-transform duration-500">
                                {project.title}
                            </h3>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
                            <div className="flex-1">
                                <p className="text-2xl md:text-3xl text-zinc-200 font-light mb-6">
                                    {project.category}
                                </p>
                                <p className="text-zinc-400 leading-relaxed max-w-xl text-lg md:text-xl line-clamp-3 group-hover:text-white transition-colors duration-300">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 content-end">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300 font-mono uppercase tracking-wider group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionLink>
          </div>
        ))}
      </div>
      
      {/* Spacer for bottom */}
      <div className="h-screen bg-transparent pointer-events-none" />
      
    </section>
  )
}

export default FeaturedProjects
