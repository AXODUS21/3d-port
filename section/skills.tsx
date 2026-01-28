const Skills = () => {
  const customSkills = [
    {
        category: "Frontend",
        technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP", "Three.js", "WebGL"]
    },
    {
        category: "Backend",
        technologies: ["Node.js", "PostgreSQL", "Supabase", "GraphQL", "Python", "Redis", "Serverless"]
    },
    {
        category: "Design & Tools",
        technologies: ["Figma", "Blender", "Adobe Suite", "Git", "Docker", "AWS", "Vercel"]
    }
  ]

  return (
    <section id="skills" className="min-h-screen py-32 px-8 flex flex-col items-center justify-center bg-zinc-950 text-white relative">
      
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-20 border-b border-zinc-800 pb-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-100">
                CAPABILITIES
            </h2>
            <span className="font-mono text-zinc-500 text-sm tracking-widest uppercase hidden md:inline-block">
                [ TECH_STACK_INIT ]
            </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customSkills.map((group, index) => (
                <div key={index} className="flex flex-col">
                    <h3 className="text-xl font-mono text-zinc-500 mb-8 uppercase tracking-widest border-b border-zinc-900 pb-2">
                        {group.category}
                    </h3>
                    
                    <div className="grid grid-cols-1">
                        {group.technologies.map((tech, i) => (
                            <div 
                                key={i}
                                className="group flex items-center justify-between py-4 border-b border-zinc-900 hover:border-zinc-700 transition-colors cursor-default"
                            >
                                <span className="text-2xl md:text-3xl font-bold text-zinc-700 group-hover:text-white transition-colors duration-300">
                                    {tech}
                                </span>
                                <span className="opacity-0 group-hover:opacity-100 text-zinc-500 font-mono text-xs tracking-widest transition-opacity duration-300">
                                    /// 0{i+1}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
