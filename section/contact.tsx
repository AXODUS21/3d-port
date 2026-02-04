import { Linkedin, Instagram, Calendar } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen py-32 px-8 flex flex-col items-center justify-center bg-zinc-950 text-white relative border-t border-zinc-900">
      
      <div className="max-w-4xl w-full">
         <div className="flex items-end justify-between mb-16">
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-zinc-100">
              GET IN<br/>TOUCH
            </h2>
            <div className="hidden md:block text-right">
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-2">
                    [ START_COMMUNICATION ]
                </p>
                <p className="text-zinc-400 text-lg">
                    Always open for a conversation
                </p>
            </div>
         </div>

        <form className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group relative">
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl md:text-3xl font-light text-white outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-700"
                  placeholder="NAME"
                />
            </div>
            <div className="group relative">
                <input 
                  type="email" 
                  required
                  className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl md:text-3xl font-light text-white outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-700"
                  placeholder="EMAIL"
                />
            </div>
          </div>
          
          <div className="group relative">
            <textarea 
                rows={4}
                required
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl md:text-3xl font-light text-white outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-700 resize-none"
                placeholder="MESSAGE"
            ></textarea>
          </div>
          
          <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-12 gap-8">
            <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/axellerosh-lubi/" target='_blank' className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <Linkedin className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    <span className="font-mono text-xs hidden md:block tracking-wider">LINKEDIN</span>
                </a>
                <a href="https://www.instagram.com/axellerosh?igsh=amZud2VlOTgyaGVt&utm_source=qr" target='_blank' className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <Instagram className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    <span className="font-mono text-xs hidden md:block tracking-wider">INSTAGRAM</span>
                </a>
                <a href="https://calendly.com/lubi-axellerosh/30min" target='_blank' className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <Calendar className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    <span className="font-mono text-xs hidden md:block tracking-wider">CALENDLY</span>
                </a>
            </div>

            <button className="px-12 py-4 bg-white text-black text-sm font-mono uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all cursor-pointer w-full md:w-auto">
                Send Transmission
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
