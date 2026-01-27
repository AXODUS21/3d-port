import React from 'react'

const Testimonials = () => {
  return (
    <section id="testimonials" className="min-h-screen py-20 px-8 flex flex-col items-center justify-center bg-black text-white relative">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center tracking-tight bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse"></div>
                <div>
                  <div className="h-4 w-24 bg-zinc-800 rounded mb-2"></div>
                  <div className="h-3 w-16 bg-zinc-800/50 rounded"></div>
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                "This is a placeholder for a glowing testimonial. The work delivered was exceptional, on time, and exceeded all expectations. dynamic communication and top-tier results."
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
