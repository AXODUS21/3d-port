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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      
      if (!track || !section) return

      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        // Reverse Horizontal Scroll: Start at the END (Right) and scroll to BEGINNING (Left)
        // This makes the content move from Left to Right visual direction as you scroll down
        
        gsap.fromTo(track, 
          { 
            x: () => -(track.scrollWidth - window.innerWidth) 
          },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="relative bg-zinc-950 h-[300vh]" // Explicit scroll height
    >
        
      {/* Sticky Viewport - Solid Background to prevent clipping */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden bg-zinc-950 z-30">
        
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Large BACKGROUND TEXT */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 pointer-events-none opacity-[0.03] select-none">
             <h2 className="text-[20vw] font-black text-white whitespace-nowrap">
                CAPABILITIES
            </h2>
        </div>

        {/* Header - Now Relative Flex Item taking real space */}
        <div className="w-full pt-16 px-8 md:px-16 z-20 pointer-events-none mix-blend-difference shrink-0">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-px bg-white/50" />
            <span className="text-sm font-mono text-white/50 tracking-[0.2em]">03 // CAPABILITIES</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Technical<br/>Arsenal
          </h2>
        </div>

        {/* Scroll Track - Takes remaining space */}
        <div 
          ref={trackRef}
          className="flex-1 flex gap-8 px-8 md:px-[20vw] overflow-x-auto md:overflow-visible items-center hide-scrollbar relative z-10"
        >
          {skillsData.map((skill, index) => (
            <div 
              key={skill.id}
              className="relative shrink-0 w-[85vw] md:w-[550px] h-[550px] md:h-[450px] bg-zinc-900/40 border border-white/10 backdrop-blur-sm group hover:border-white/30 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2 group-hover:text-zinc-200 transition-colors">
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
              <div className="p-8 flex-1">
                  <div className="grid grid-cols-2 gap-4 h-full content-start">
                     {skill.technologies.map((tech, i) => (
                        <div key={i} className="flex items-center gap-3 group/tech">
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

        {/* Decoder Line */}
        <div className="absolute bottom-16 left-0 w-full flex justify-center pointer-events-none opacity-50">
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">
                Scroll to Inspect Modules
            </div>
        </div>

      </div>
    </section>
  )
}

export default Skills
