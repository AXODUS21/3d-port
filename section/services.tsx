import React from 'react'

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Building fast, responsive, and accessible websites using modern frameworks and best practices."
    },
    {
      title: "3D Experiences",
      description: "Creating immersive 3D web experiences with Three.js and WebGL."
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive and aesthetically pleasing user interfaces that drive engagement."
    },
    {
      title: "Technical Strategy",
      description: "Consulting on architecture, tech stack selection, and scalability planning."
    }
  ]

  return (
    <section id="services" className="min-h-screen py-20 px-8 flex flex-col items-center justify-center bg-black text-white relative">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center tracking-tight bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group p-8 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 transition-all duration-300">
               <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-zinc-200">{service.title}</h3>
               <p className="text-zinc-400 group-hover:text-zinc-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
