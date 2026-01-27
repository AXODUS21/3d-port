import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="min-h-[80vh] py-20 px-8 flex flex-col items-center justify-center bg-zinc-950 text-white relative">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Let's Talk
        </h2>
        <p className="text-xl text-zinc-400 mb-12">
          Have a project in mind? detailed proposal? or just want to say hi?
        </p>
        
        <form className="flex flex-col gap-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-zinc-600 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
          <textarea 
            placeholder="Message" 
            rows={5}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-zinc-600 transition-colors resize-none"
          ></textarea>
          
          <button className="mt-4 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors self-start">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
