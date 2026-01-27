import React from 'react'

const Skills = () => {
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", 
    "Three.js", "TailwindCSS", "PostgreSQL", "GraphQL",
    "Figma", "Blender", "AWS", "Docker"
  ]

  return (
    <section id="skills" className="min-h-[80vh] py-20 px-8 flex flex-col items-center justify-center bg-zinc-950 text-white relative">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tight bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Skills & Tech
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-600 hover:text-white hover:bg-zinc-800 transition-all duration-300 cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
