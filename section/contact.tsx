'use client'

import { Linkedin, Instagram, Calendar } from 'lucide-react'
import { useState, FormEvent } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group relative">
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl md:text-3xl font-light text-white outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-700 disabled:opacity-50"
                  placeholder="NAME"
                />
            </div>
            <div className="group relative">
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl md:text-3xl font-light text-white outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-700 disabled:opacity-50"
                  placeholder="EMAIL"
                />
            </div>
          </div>
          
          <div className="group relative">
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                disabled={status === 'loading'}
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl md:text-3xl font-light text-white outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-700 resize-none disabled:opacity-50"
                placeholder="MESSAGE"
            ></textarea>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="px-6 py-4 bg-green-500/10 border border-green-500/20 rounded text-green-400 font-mono text-sm">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}
          
          {status === 'error' && (
            <div className="px-6 py-4 bg-red-500/10 border border-red-500/20 rounded text-red-400 font-mono text-sm">
              ✗ {errorMessage || 'Failed to send message. Please try again.'}
            </div>
          )}
          
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

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="px-12 py-4 bg-white text-black text-sm font-mono uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all cursor-pointer w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? 'Sending...' : 'Send Transmission'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
