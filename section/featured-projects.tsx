import React from 'react'

const FeaturedProjects = () => {
  return (
    <section id="work" className="min-h-screen py-20 px-8 flex flex-col items-center justify-center bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-6xl w-full z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center tracking-tight bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group relative aspect-video bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-zinc-500 font-medium">Project Preview {item}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Project Title {item}</h3>
                <p className="text-sm text-zinc-300">A brief description of the project and the technologies used.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
