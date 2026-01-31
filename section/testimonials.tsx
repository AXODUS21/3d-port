'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Pause, Maximize2, X, Volume2, VolumeX, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  type: 'video' | 'text'
  videoUrl?: string
  thumbnail?: string
  text?: string
  author: string
  role: string
  company: string
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    type: 'video',
    videoUrl: '/testimonials/video1.mp4',
    thumbnail: '/testimonials/thumb1.jpg',
    author: "Sarah Jenning",
    role: "Product Director",
    company: "Vertex Labs"
  },
  {
    id: 2,
    type: 'text',
    text: "Absolutely mind-blowing technical execution. The transition from the loading state to the hero section is the smoothest I've ever seen.",
    author: "Marcus Chen",
    role: "CTO",
    company: "Nebula Stream"
  },
  {
    id: 3,
    type: 'video',
    videoUrl: '/testimonials/video2.mp4',
    thumbnail: '/testimonials/thumb2.jpg',
    author: "Elena Rodriguez",
    role: "Founder",
    company: "Prism Digital"
  },
  {
    id: 4,
    type: 'text',
    text: "The design system built for us was scalable, beautiful, and easy to maintain. A perfect blend of engineering and artistic vision.",
    author: "David Kim",
    role: "VP of Engineering",
    company: "Flux OS"
  },
  {
    id: 5,
    type: 'video',
    videoUrl: '/testimonials/video3.mp4',
    thumbnail: '/testimonials/thumb3.jpg',
    author: "James Thorne",
    role: "Co-Founder",
    company: "Aether Finance"
  },
  {
    id: 6,
    type: 'text',
    text: "Working with this team transformed our digital presence. The attention to detail and creative solutions exceeded all expectations.",
    author: "Lisa Wang",
    role: "Marketing Lead",
    company: "Quantum Dynamics"
  },
  {
    id: 7,
    type: 'text',
    text: "Revolutionary approach to web development. They delivered a platform that handles millions of users without breaking a sweat.",
    author: "Alex Thompson",
    role: "Tech Lead",
    company: "CloudScale"
  }
]

// Duplicate data for infinite loop
const infiniteTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData]

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null) // ID is now string (composite)
  const [modalVideo, setModalVideo] = useState<Testimonial | null>(null)
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set()) // Track muted state by unique composite ID
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map()) // Map uses composite ID

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const ctx = gsap.context(() => {
        // Infinite scroll animation - Right to Left
        // Use xPercent -50 to consistent with Skills section. 
        // We have 4 sets. -50% moves past 2 sets. 
        // This ensures smooth looping and correct direction.
        
        // Infinite scroll animation - Left to Right
        // To move Right seamlessly, we start at -50% (shifted left, showing duplicate sets 3 & 4)
        // and animate to 0 (start, showing sets 1 & 2).
        // Since Set 1 and Set 3 are identical, the loop is invisible.
        
        gsap.fromTo(track, 
          { 
            xPercent: -50 
          },
          {
            xPercent: 0, 
            ease: "none",
            duration: 80, 
            repeat: -1,
          }
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getCompositeId = (id: number, index: number) => `${id}-${index}`

  const togglePlay = (compositeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current.get(compositeId)
    if (!video) return

    if (playingVideo === compositeId) {
      video.pause()
      setPlayingVideo(null)
    } else {
      // Pause all others
      videoRefs.current.forEach((v, id) => {
        if (id !== compositeId) {
          v.pause()
        }
      })
      video.play()
      setPlayingVideo(compositeId)
    }
  }

  const toggleMute = (compositeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current.get(compositeId)
    if (!video) return

    const newMuted = new Set(mutedVideos)
    if (mutedVideos.has(compositeId)) {
      newMuted.delete(compositeId)
      video.muted = false
    } else {
      newMuted.add(compositeId)
      video.muted = true
    }
    setMutedVideos(newMuted)
  }

  const handleOpenModal = (testimonial: Testimonial, compositeId: string) => {
     // Pause the instance video first
     const video = videoRefs.current.get(compositeId)
     if (video) video.pause()
     setPlayingVideo(null)
     
     setModalVideo(testimonial)
  }

  const closeModal = () => {
    setModalVideo(null)
  }

  const handleMouseEnter = () => {
    gsap.getTweensOf(trackRef.current).forEach(t => t.pause())
  }
  
  const handleMouseLeave = () => {
    gsap.getTweensOf(trackRef.current).forEach(t => t.resume())
  }

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className="relative bg-zinc-950 py-32 overflow-hidden flex flex-col justify-center min-h-screen"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Section Header */}
      <div className="container mx-auto px-8 md:px-16 mb-16 z-20 relative mix-blend-difference">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-px bg-white/50" />
          <span className="text-sm font-mono text-white/50 tracking-[0.2em]">04 // TESTIMONIALS</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
          Client<br/>Database
        </h2>
      </div>

        {/* The Track */}
        <div 
          className="w-full overflow-hidden z-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={trackRef}
            className="flex gap-8 w-max px-4"
            style={{ willChange: 'transform' }}
          >
             {infiniteTestimonials.map((item, index) => {
               const compositeId = getCompositeId(item.id, index)
               return (
                 <div 
                   key={compositeId}
                   className="relative shrink-0 w-[85vw] md:w-[500px] h-[500px] md:h-[400px] bg-zinc-900/40 border border-white/10 backdrop-blur-sm group hover:border-white/30 transition-colors duration-500 flex flex-col"
                 >
                    {/* ID Tag */}
                    <div className="absolute -top-3 left-4 bg-zinc-950 px-2 text-[10px] font-mono text-zinc-500 border border-zinc-800">
                      {String(item.id).padStart(3, '0')}
                    </div>
    
                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
    
                    {item.type === 'video' ? (
                      // Video Card Layout
                      <div className="relative w-full h-full overflow-hidden">
                        <video
                          ref={(el) => {
                             if (el) {
                               videoRefs.current.set(compositeId, el)
                               // Set initial muted state if needed (or default to keys)
                             } else {
                               videoRefs.current.delete(compositeId)
                             }
                          }}
                          src={item.videoUrl}
                          poster={item.thumbnail}
                          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                          loop
                          playsInline
                          onEnded={() => setPlayingVideo(null)}
                          onClick={() => handleOpenModal(item, compositeId)}
                        />
                        
                        {/* Overlay UI */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
                        
                        {/* Play Button Center */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                           <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                              {playingVideo === compositeId ? <Pause className="text-white fill-white" size={20} /> : <Play className="text-white fill-white" size={20} />}
                           </div>
                        </div>
    
                        {/* Controls */}
                        <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <button onClick={(e) => togglePlay(compositeId, e)} className="p-2 hover:bg-white/10 rounded-full transition"><Play size={16} className="text-white" /></button>
                           <button onClick={(e) => toggleMute(compositeId, e)} className="p-2 hover:bg-white/10 rounded-full transition">{mutedVideos.has(compositeId) ? <VolumeX size={16} className="text-white"/> : <Volume2 size={16} className="text-white"/>}</button>
                           <button onClick={() => handleOpenModal(item, compositeId)} className="p-2 hover:bg-white/10 rounded-full transition"><Maximize2 size={16} className="text-white"/></button>
                        </div>
    
                        {/* Bottom Info */}
                        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/10 bg-zinc-950/50 backdrop-blur-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-mono uppercase tracking-wider text-sm">{item.author}</h3>
                                    <p className="text-zinc-500 font-mono text-xs">{item.role} @ {item.company}</p>
                                </div>
                                <div className="text-xs font-mono text-zinc-600 bg-zinc-900 px-2 py-1 rounded">
                                  VIDEO_LOG
                                </div>
                            </div>
                        </div>
                      </div>
                    ) : (
                       // Text Card Layout
                       <div className="relative w-full h-full p-8 flex flex-col justify-between">
                          <Quote className="text-zinc-700" size={48} />
                          
                          <div className="flex-1 flex items-center my-6">
                            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
                              "{item.text}"
                            </p>
                          </div>
    
                          <div className="border-t border-zinc-800 pt-6 flex items-center gap-4">
                             <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center font-mono text-zinc-500 font-bold">
                                {item.author.charAt(0)}
                             </div>
                             <div>
                                <h3 className="text-white font-mono uppercase tracking-wider text-sm">{item.author}</h3>
                                <p className="text-zinc-500 font-mono text-xs">{item.role} / {item.company}</p>
                             </div>
                          </div>
                       </div>
                    )}
                 </div>
               )
             })}
          </div>
          
          {/* Progress Bar (Decorative) */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-zinc-800">
             <div className="h-full bg-white/20 w-[20%] animate-pulse" />
          </div>
  
        </div>
  
        {modalVideo && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 p-4 hover:bg-white/10 rounded-full transition-colors group"
            >
              <X className="w-8 h-8 text-zinc-500 group-hover:text-white transition-colors" />
            </button>
  
            <div className="relative w-full max-w-6xl aspect-video border border-zinc-800 bg-zinc-900" onClick={(e) => e.stopPropagation()}>
              <video
                className="w-full h-full"
                controls
                autoPlay
                src={modalVideo.videoUrl}
              />
               <div className="absolute top-0 left-0 px-4 py-2 bg-black border-r border-b border-zinc-800 text-xs font-mono text-zinc-500">
                 PLAYBACK_MODE // {modalVideo.id.toString().padStart(3, '0')}
              </div>
            </div>
          </div>
        )}
    </section>
  )
}

export default Testimonials
