import React from 'react'

const Services = () => {
  const services = [
    {
      id: "01",
      title: "Web Development",
      description: "Building fast, responsive, and accessible websites using modern frameworks and best practices. We focus on clean code and scalable architecture.",
      color: "from-blue-600/20 to-indigo-900/20"
    },
    {
        id: "02",
      title: "3D Experiences",
      description: "Creating immersive 3D web experiences with Three.js and WebGL. Turn passive viewers into active participants with interactive storytelling.",
      color: "from-purple-600/20 to-pink-900/20"
    },
    {
        id: "03",
      title: "UI/UX Design",
      description: "Designing intuitive and aesthetically pleasing user interfaces that drive engagement. We prioritize user journey and accessibility above all.",
      color: "from-orange-600/20 to-red-900/20"
    },
    {
        id: "04",
      title: "Technical Strategy",
      description: "Consulting on architecture, tech stack selection, and scalability planning. We help businesses make informed decisions for long-term success.",
      color: "from-emerald-600/20 to-teal-900/20"
    }
  ]

  return (
    <section id="services" className="relative bg-zinc-950">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-8xl md:text-[12rem] font-bold tracking-tighter text-zinc-900/50 select-none">
            SERVICES
          </h2>
      </div>

        <div className="relative -mt-[100vh] z-10">
            {services.map((service, index) => (
                <div key={index} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    
                    {/* Blurred Background Layer */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 animate-in fade-in duration-700`} />
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r ${service.color} rounded-full blur-[120px] opacity-40`} />
                    <div className="absolute inset-0 backdrop-blur-[100px]" />

                    {/* Card */}
                    <div className="relative z-10 max-w-2xl w-full mx-6 p-12 bg-zinc-950/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden group hover:border-white/20 transition-colors">
                        <div className="absolute top-0 right-0 p-[200px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <span className="inline-block text-zinc-500 font-mono mb-6 text-sm tracking-widest border border-zinc-800 px-3 py-1 rounded-full uppercase">
                            Step {service.id}
                        </span>

                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            {service.title}
                        </h3>
                        
                        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
                            {service.description}
                        </p>

                        <div className="mt-8 flex items-center gap-4 text-sm font-medium text-white/50 group-hover:text-white transition-colors cursor-pointer">
                            <span className="uppercase tracking-widest">Read Details</span>
                            <div className="w-8 h-[1px] bg-current" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Bottom Spacer */}
        <div className="h-[20vh] bg-transparent" />
    </section>
  )
}

export default Services
