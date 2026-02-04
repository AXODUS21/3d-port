'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Database, PenTool, Cloud, Settings } from 'lucide-react'

interface SkillCategory {
  id: string
  category: string
  icon: any
  description: string
  technologies: string[]
  codeSnippet: string
  color: string
}

const skillsData: SkillCategory[] = [
  {
    id: "01",
    category: "Frontend Engineering",
    icon: Terminal,
    description: "Architecting immersive, reactive interfaces.",
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js", "GSAP"],
    color: "bg-blue-500",
    codeSnippet: `const Interface = () => {
  return (
    <ImmersiveView 
      quality="ultra"
      physics={true}
    />
  )
}`
  },
  {
    id: "02",
    category: "Backend Systems",
    icon: Database,
    description: "Designing scalable, fault-tolerant infrastructure.",
    technologies: ["Node.js", "PostgreSQL", "Supabase", "REST API","MongoDB", "Firebase", "Express  "],
    color: "bg-emerald-500",
    codeSnippet: `async function query() {
  const data = await db
    .from('reality')
    .select('*')
    .limit(Infinity)
  return data
}`
  },
  {
    id: "03",
    category: "Creative Design",
    icon: PenTool,
    description: "Bridging the gap between code and aesthetics.",
    technologies: ["Figma", "Blender", "UI/UX", "WebGL"],
    color: "bg-purple-500",
    codeSnippet: `.beauty {
  display: flex;
  justify-content: perfect;
  animation: breathless 2s;
  backdrop-filter: blur(20px);
}`
  },
  {
    id: "04",
    category: "Tools & Platforms",
    icon: Settings,
    description: "Streamlining development workflows with modern tooling.",
    technologies: ["Git", "Github", "Vercel", "Netlify"],
    color: "bg-orange-500",
    codeSnippet: `{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint ."
  }
}`
  }
]

const Skills = () => {
  const [activeId, setActiveId] = useState<string>("01")

  return (
    <section 
      id="skills" 
      className="relative bg-zinc-950 py-24 md:py-32 overflow-hidden min-h-screen flex flex-col justify-center" 
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 h-full flex flex-col">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-px bg-white/50" />
            <span className="text-sm font-mono text-white/50 tracking-[0.2em]">03 // CAPABILITIES</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            System<br/>Modules
          </h2>
        </div>

        {/* Expansion Blades Container */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 w-full lg:h-[600px]">
           {skillsData.map((skill) => {
             const isActive = activeId === skill.id
             return (
               <motion.div
                 key={skill.id}
                 layout
                 onClick={() => setActiveId(skill.id)}
                 onMouseEnter={() => setActiveId(skill.id)}
                 className={`relative rounded-xl overflow-hidden cursor-pointer border transition-colors duration-500 ${isActive ? 'border-white/20' : 'border-white/5 bg-zinc-900/40 hover:border-white/10'}`}
                 initial={false}
                 animate={{
                   flex: isActive ? 3 : 1,
                 }}
                 transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                 }}
               >
                  {/* Background Gradient for Active State */}
                  <div className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : ''}`}>
                      <div className={`absolute inset-0 ${skill.color} opacity-10 blur-3xl`} />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-950/50 to-zinc-950" />
                  </div>

                  {/* Content Wrapper */}
                  <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
                      
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                          <div className={`flex items-center gap-4 ${!isActive && 'lg:flex-col lg:items-start lg:gap-8'}`}>
                             <div className={`p-3 rounded-lg border transition-all duration-500 ${isActive ? `bg-white/10 border-white/20 text-white` : `bg-white/5 border-white/5 text-zinc-500`}`}>
                                <skill.icon size={24} />
                             </div>
                             
                             <motion.div 
                                layout="position"
                                className="flex flex-col"
                             >
                                <span className="font-mono text-xs text-white/40 tracking-widest mb-1">
                                    MOD_{skill.id}
                                </span>
                                <h3 
                                  className={`font-bold uppercase tracking-tight transition-all duration-300 ${isActive ? 'text-2xl md:text-3xl text-white' : 'text-lg text-zinc-400 lg:mt-4'}`}
                                  style={!isActive ? { writingMode: 'vertical-rl', transform: 'rotate(180deg)' } : {}}
                                >
                                    {skill.category}
                                </h3>
                             </motion.div>
                          </div>
                      </div>

                      {/* Active Content Reveal */}
                      <AnimatePresence mode="popLayout">
                         {isActive && (
                             <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="mt-8 lg:mt-0"
                             >
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                                     <div>
                                        <p className="text-zinc-300 text-lg leading-relaxed mb-6 font-light">
                                            {skill.description}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {skill.technologies.map((tech, i) => (
                                                <motion.span
                                                    key={tech}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2 + (i * 0.05) }}
                                                    className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-full text-xs font-mono text-white/80"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                     </div>

                                     {/* Code Snippet Decoration */}
                                     <div className="hidden lg:block bg-black/50 rounded-lg p-4 border border-white/5 font-mono text-xs text-zinc-500 overflow-hidden relative">
                                        <div className="absolute top-2 right-2 flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-500/20" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                                            <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                        </div>
                                        <pre className="mt-4">
                                            <code>{skill.codeSnippet}</code>
                                        </pre>
                                     </div>
                                 </div>
                             </motion.div>
                         )}
                      </AnimatePresence>

                  </div>
               </motion.div>
             )
           })}
        </div>

      </div>
    </section>
  )
}

export default Skills
