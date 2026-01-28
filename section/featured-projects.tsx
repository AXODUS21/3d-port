'use client'

import React, { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: "NEON VERTEX",
    category: "Interactive 3D Experience",
    description: "A revolutionary web graphics engine capable of rendering millions of particles in real-time. Designed for next-generation data visualization and immersive storytelling.",
    tags: ["WebGL", "Three.js", "React Fiber"],
    year: "2025"
  },
  {
    id: 2,
    title: "AETHER FINANCE",
    category: "DeFi Dashboard",
    description: "Institutional-grade diversified portfolio management with real-time analytics and prediction markets. built on the Solana blockchain for micro-latency updates.",
    tags: ["Solana", "Rust", "Next.js"],
    year: "2025"
  },
  {
    id: 3,
    title: "SYNTH OS",
    category: "Web Operating System",
    description: "A fully functional cloud operating system that lives in the browser. Features a complete file system, window manager, and native-feeling application suite.",
    tags: ["TypeScript", "WASM", "System Desing"],
    year: "2024"
  },
  {
    id: 4,
    title: "VOID RUNNER",
    category: "Browser Game",
    description: "Cyberpunk infinite runner featuring procedural generation and reactive audio synthesis. Pushing the limits of browser performance without external engines.",
    tags: ["Canvas API", "WebAudio", "Procedural"],
    year: "2024"
  }
]

const FeaturedProjects = () => {
  return (
    <section id="work" className="relative bg-zinc-950">
      
      {/* Section Header - Sticky */}
      <div className="sticky top-0 z-0 h-screen flex flex-col items-center justify-center text-center pointer-events-none">
         <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter text-zinc-900 select-none">
            WORK
         </h2>
      </div>

      {/* Stacking Cards */}
      <div className="relative z-10 -mt-[100vh]">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="sticky top-0 h-screen w-full flex items-center justify-center"
          >
            <div className="relative w-full h-full md:w-[90%] md:h-[90%] bg-zinc-900 border border-zinc-800 md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                
                {/* Project Image Placeholder */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full bg-zinc-900 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-zinc-700 font-mono text-xl group-hover:text-zinc-500 transition-colors">
                            INTERFACE_PREVIEW_0{project.id}.jpg
                        </span>
                    </div>
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Project Info */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-between bg-zinc-900/50 backdrop-blur-sm">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-zinc-500 font-mono text-sm tracking-wider">0{project.id} / 04</span>
                            <span className="text-zinc-500 font-mono text-sm tracking-wider">{project.year}</span>
                        </div>
                        
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight tracking-tight">
                            {project.title}
                        </h3>
                        <p className="text-xl text-zinc-400 mb-8 font-light">
                            {project.category}
                        </p>
                        
                        <p className="text-zinc-300 leading-relaxed max-w-md text-lg">
                            {project.description}
                        </p>
                    </div>

                    <div>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400 font-mono uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button className="group flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-white transition-all">
                            <span className="uppercase tracking-widest text-sm font-bold">View Case Study</span>
                            <ArrowUpRight className="w-4 h-4 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </button>
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
