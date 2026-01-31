'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Terminal, Cpu, PenTool, Database, Cloud, Layers } from 'lucide-react'

interface SkillCategory {
  id: string
  category: string
  icon: React.ElementType
  description: string
  technologies: string[]
}

const skillsData: SkillCategory[] = [
  {
    id: "01",
    category: "Frontend Engineering",
    icon: Terminal,
    description: "Crafting responsive, high-performance user interfaces with modern reactive framworks.",
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP", "Three.js"]
  },
  {
    id: "02",
    category: "Backend Architecture",
    icon: Database,
    description: "Building scalable server-side systems, APIs, and real-time data pipelines.",
    technologies: ["Node.js", "PostgreSQL", "Supabase", "GraphQL", "Python", "Redis", "Edge Functions"]
  },
  {
    id: "03",
    category: "Design & Creative",
    icon: PenTool,
    description: "Translating brand vision into digital reality through atomic design systems.",
    technologies: ["Figma", "Blender", "Adobe CC", "UI/UX", "Motion Design", "Visual Identity"]
  },
  {
    id: "04",
    category: "DevOps & Cloud",
    icon: Cloud,
    description: "Ensuring reliability and velocity through automated CI/CD and cloud infrastructure.",
    technologies: ["Docker", "AWS", "Vercel", "Git CI/CD", "Kubernetes", "Turborepo"]
  }
]

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Memoize duplicated data to ensure seamless looping (x4 for safety on large screens)
  const infiniteSkills = [...skillsData, ...skillsData, ...skillsData, ...skillsData]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Calculate total width of one set of items to determine duration
    // But simplest box-standard infinite scroll is just linear movement
    // Let's use a simple distinct GSAP animation
    const ctx = gsap.context(() => {
        const totalWidth = track.scrollWidth / 2 // Approximate since we duplicated many times, but actually we just need to move by 1/4th if we duplicated 4 times? 
        // Better approach: Measure width of the *original* set. 
        // Just moving the whole track from 0 to -50% and repeating works perfectly if we have 2 sets. 
        // With 4 sets, we can move from 0 to -25% (one full set width) and repeat.
        
        // Let's rely on the fact that we have enough duplicates.
        // We move purely by percentage of the track width for simplicity if items are uniform, 
        // but items might have gaps.
        
        gsap.to(track, {
            xPercent: -50, // Move halfway. We need at least 2 full copies. infiniteSkills has 4 copies.
            // If we move -50%, we move past 2 copies. So we need to ensure the visual loop is perfect.
            // Actually, if we have 4 copies, moving -25% is safest as it replaces the first set with determining second set.
            ease: "none",
            duration: 20, // Adjust speed here
            repeat: -1,
        })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseEnter = () => {
    gsap.getTweensOf(trackRef.current).forEach(t => t.pause())
  }
  
  const handleMouseLeave = () => {
    gsap.getTweensOf(trackRef.current).forEach(t => t.resume())
  }

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="relative bg-zinc-950 py-32 overflow-hidden flex flex-col justify-center min-h-screen" 
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Large BACKGROUND TEXT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.03] select-none">
           <h2 className="text-[20vw] font-black text-white whitespace-nowrap">
              CAPABILITIES
          </h2>
      </div>

      {/* Header */}
      <div className="container mx-auto px-8 md:px-16 mb-16 z-20 relative mix-blend-difference">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-px bg-white/50" />
          <span className="text-sm font-mono text-white/50 tracking-[0.2em]">03 // CAPABILITIES</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
          Technical<br/>Arsenal
        </h2>
      </div>

      {/* Scroll Track */}
      <div 
        className="w-full overflow-hidden z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={trackRef}
          className="flex gap-8 w-max px-4"
        >
          {infiniteSkills.map((skill, index) => (
            <div 
              key={`${skill.id}-${index}`}
              className="relative shrink-0 w-[85vw] md:w-[450px] h-[450px] bg-zinc-900/40 border border-white/10 backdrop-blur-sm group hover:border-white/30 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2 group-hover:text-zinc-200 transition-colors">
                        {skill.category}
                    </h3>
                    <p className="text-zinc-500 font-mono text-xs max-w-[280px]">
                        {skill.description}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-white/10 rounded-sm">
                        <skill.icon className="text-zinc-400 group-hover:text-white transition-colors" size={24} />
                  </div>
              </div>

              {/* Technologies Grid */}
              <div className="p-6 flex-1">
                  <div className="grid grid-cols-2 gap-3 h-full content-start">
                     {skill.technologies.map((tech, i) => (
                        <div key={i} className="flex items-center gap-2 group/tech">
                             <div className="w-1.5 h-1.5 bg-zinc-700 rounded-sm group-hover/tech:bg-white transition-colors" />
                             <span className="text-zinc-400 font-mono text-sm group-hover/tech:text-zinc-200 transition-colors">
                                {tech}
                             </span>
                        </div>
                     ))}
                  </div>
              </div>

              {/* ID Tag Bottom */}
               <div className="absolute bottom-4 right-4 text-[10px] font-mono text-zinc-600 border border-zinc-800 px-2 py-1 bg-zinc-900">
                  SYS_MOD_{skill.id}
               </div>

              {/* Tech Accents */}
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
              
            </div>
          ))}
        </div>
      </div>

      {/* Decoder Line */}
      <div className="w-full flex justify-center mt-12 opacity-50">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">
              Hover to Pause / Analysis Mode
          </div>
      </div>
    </section>
  )
}

export default Skills
