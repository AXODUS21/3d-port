'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Maximize2, X, Volume2, VolumeX, Quote, ArrowLeft, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'

interface Testimonial {
  id: number
  type: 'video' | 'text'
  videoUrl?: string
  thumbnail?: string
  text?: string
  author: string
  role: string
  company: string
  image?: string
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    type: 'video',
    videoUrl: '/testimonials/Oscar Testimonial.mp4',
    author: "Oscar",
    role: "Founder",
    company: "ScaleSet",
    image: "/testimonials/pfp/oscar.jpg"
  },
  {
    id: 2,
    type: 'text',
    text: "A rare talent who combines strategic thinking with flawless execution. Highly recommended.",
    author: "Ilyne Root",
    role: "Founder",
    company: "Smart Brain",
    image: "/testimonials/pfp/SB.jpg"
  },
  {
    id: 3,
    type: 'video',
    videoUrl: '/testimonials/sam video testimonial.mp4',
    author: "Sam",
    role: "Founder",
    company: "Prism Digital",
    image: "/testimonials/pfp/sam.jpg"
  },
  {
    id: 4,
    type: 'text',
    text: "AG Dental Clinic had clear requirements and a strict deadline, which he handled with remarkable efficiency. He took the time to understand our vision and transformed it into a beautiful website that truly reflects our practice. The design is sleek, contemporary, and fully responsive, ensuring accessibility for all our patients.",
    author: "Ged Soldevilla",
    role: "Owner",
    company: "AG Dental Clinic",
    image: "/testimonials/pfp/AG.jpg"
  },
  {
    id: 5,
    type: 'text',
    text: "Our project had specific requirements and a tight deadline, and He managed everything with great efficiency. He took the time to understand our vision and translated it into a stunning website that perfectly represents our brand. The design is modern and responsive.",
    author: "Christian Dimac",
    role: "Tech Lead",
    company: "CloudScale",
    image: "/testimonials/pfp/christian.jpg"
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [unmutedVideos, setUnmutedVideos] = useState<Set<number>>(new Set())
  const [modalVideo, setModalVideo] = useState<Testimonial | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionFromIndex, setTransitionFromIndex] = useState<number | null>(null)
  const [transitionStartProgress, setTransitionStartProgress] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward')
  
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    setIsTransitioning(true)
    setTransitionFromIndex(currentIndex)
    setTransitionStartProgress(progress) // Capture current progress
    setTransitionDirection('forward')
    
    // Fill the current bar to 100% first
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
      setPlayingVideo(null)
      
      // Reset transition state after the new bar starts
      setTimeout(() => {
        setIsTransitioning(false)
        setTransitionFromIndex(null)
        setTransitionStartProgress(0)
      }, 300)
    }, 300)
  }

  const handlePrev = () => {
    setIsTransitioning(true)
    setTransitionFromIndex(currentIndex)
    setTransitionStartProgress(progress) // Capture current progress
    setTransitionDirection('backward')
    
    // Empty the current bar to 0% first (reverse animation)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
      setPlayingVideo(null)
      
      // Reset transition state after the new bar starts
      setTimeout(() => {
        setIsTransitioning(false)
        setTransitionFromIndex(null)
        setTransitionStartProgress(0)
      }, 300)
    }, 300)
  }

  const togglePlay = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current.get(id)
    if (!video) return

    if (playingVideo === id) {
      video.pause()
      setPlayingVideo(null)
    } else {
      // Pause all others
      videoRefs.current.forEach((v, vId) => {
        if (vId !== id) v.pause()
      })
      video.play()
      setPlayingVideo(id)
    }
  }

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current.get(id)
    if (!video) return

    const newUnmuted = new Set(unmutedVideos)
    if (unmutedVideos.has(id)) {
      newUnmuted.delete(id)
      video.muted = true
    } else {
      newUnmuted.add(id)
      video.muted = false
    }
    setUnmutedVideos(newUnmuted)
  }

  const handleOpenModal = (testimonial: Testimonial) => {
     const video = videoRefs.current.get(testimonial.id)
     if (video) video.pause()
     setPlayingVideo(null)
     setModalVideo(testimonial)
  }

  const closeModal = () => {
    setModalVideo(null)
  }

  const [progress, setProgress] = useState(0)

  /* Autoplay Logic */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section is in view
            const currentItem = testimonialsData[currentIndex]
            if (currentItem.type === 'video') {
               const video = videoRefs.current.get(currentItem.id)
               if (video) {
                 video.play().catch(() => {}) // Auto-play might be blocked by browser policies
                 setPlayingVideo(currentItem.id)
               }
            }
          } else {
            // Section left view - pause everything
             setPlayingVideo(null)
             videoRefs.current.forEach(v => v.pause())
          }
        })
      },
      { threshold: 0.5 } // Trigger when 50% visible
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [currentIndex]) // Re-run when index changes to play the new video if visible

  /* Auto-advance Timer (Progress Bar) */
  useEffect(() => {
    setProgress(0)
    const currentItem = testimonialsData[currentIndex]
    let interval: NodeJS.Timeout

    if (currentItem.type === 'text') {
      const startTime = Date.now()
      const duration = 10000 // 10 seconds

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const newProgress = (elapsed / duration) * 100
        
        if (newProgress >= 100) {
          setProgress(100)
          clearInterval(interval)
          handleNext()
        } else {
          setProgress(newProgress)
        }
      }, 50)
    }

    return () => clearInterval(interval)
  }, [currentIndex])

  const handleVideoEnded = () => {
    setPlayingVideo(null)
    handleNext()
  }

  const handleVideoProgress = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget
    if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (modalVideo) return // Don't navigate if modal is open
        if (e.key === 'ArrowLeft') handlePrev()
        if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalVideo])

  return (
    <section 
      ref={containerRef}
      id="testimonials" 
      className="relative bg-zinc-950 py-20 md:py-32 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Navigation & Info */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8 lg:space-y-12">
               <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-white/50" />
                    <span className="text-sm font-mono text-white/50 tracking-[0.2em]">04 // TESTIMONIALS</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                    Client<br/>Database
                  </h2>
               </div>

               <div className="hidden lg:block">
                  <p className="text-zinc-400 text-sm md:text-base max-w-sm leading-relaxed mb-8">
                     Trusted by forward-thinking companies and individuals. I deliver high-performance digital solutions that drive real business growth.
                  </p>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest border border-white/10 w-fit px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Viewing entry {String(currentIndex + 1).padStart(2, '0')} / {String(testimonialsData.length).padStart(2, '0')}</span>
                  </div>
               </div>

               {/* Navigation Controls */}
               <div className="flex items-center gap-4">
                  <button 
                      onClick={handlePrev}
                      className="w-14 h-14 rounded-full border border-white/10 bg-zinc-900/50 hover:bg-white hover:text-black hover:border-white text-white flex items-center justify-center transition-all duration-300 group"
                  >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button 
                      onClick={handleNext}
                      className="w-14 h-14 rounded-full border border-white/10 bg-zinc-900/50 hover:bg-white hover:text-black hover:border-white text-white flex items-center justify-center transition-all duration-300 group"
                  >
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>

            {/* Right Column: Active Card Display */}
            <div className="lg:col-span-8 relative">
                 <div className="relative w-full aspect-4/5 md:aspect-video lg:aspect-video overflow-hidden rounded-sm border border-white/10 bg-zinc-900/20 backdrop-blur-xl">
                      
                      <AnimatePresence mode="wait">
                          <motion.div
                              key={currentIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="absolute inset-0 w-full h-full"
                          >
                               {testimonialsData[currentIndex].type === 'video' ? (
                                   // VIDEO CARD
                                   <div className="relative w-full h-full group">
                                       <video
                                           ref={(el) => {
                                             if (el) videoRefs.current.set(testimonialsData[currentIndex].id, el)
                                             else videoRefs.current.delete(testimonialsData[currentIndex].id)
                                           }}
                                           src={testimonialsData[currentIndex].videoUrl}
                                           poster={testimonialsData[currentIndex].thumbnail}
                                           className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                           // loop // Removed loop to allow auto-advance on end
                                           playsInline
                                           onEnded={handleVideoEnded}
                                           onTimeUpdate={handleVideoProgress}
                                           muted={!unmutedVideos.has(testimonialsData[currentIndex].id)}
                                           onClick={(e) => togglePlay(testimonialsData[currentIndex].id, e)}
                                       />
                                       
                                       <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />

                                       {/* Center Play Button */}
                                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className={`w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${playingVideo === testimonialsData[currentIndex].id ? 'scale-90 opacity-0' : 'scale-100 opacity-100 group-hover:scale-110'}`}>
                                                <Play className="text-white fill-white ml-1" size={32} />
                                            </div>
                                       </div>

                                       <div className="absolute top-6 right-6 flex gap-2 z-20">
                                            <button 
                                                onClick={(e) => toggleMute(testimonialsData[currentIndex].id, e)}
                                                className="p-3 bg-black/50 hover:bg-white hover:text-black border border-white/10 text-white rounded-full backdrop-blur-md transition-colors"
                                            >
                                                {!unmutedVideos.has(testimonialsData[currentIndex].id) ? <VolumeX size={18} /> : <Volume2 size={18}/>}
                                            </button>
                                            <button 
                                                onClick={() => handleOpenModal(testimonialsData[currentIndex])} 
                                                className="p-3 bg-black/50 hover:bg-white hover:text-black border border-white/10 text-white rounded-full backdrop-blur-md transition-colors"
                                            >
                                                <Maximize2 size={18} />
                                            </button>
                                       </div>
                                   </div>
                               ) : (
                                   // TEXT CARD
                                   <div className="w-full h-full p-8 md:p-16 flex flex-col justify-center relative">
                                       <Quote className="absolute top-8 left-8 md:top-12 md:left-12 text-zinc-800 w-16 h-16 md:w-24 md:h-24 opacity-50" strokeWidth={1} />
                                       
                                       <div className="relative z-10 max-w-3xl">
                                            <p className="text-xl md:text-3xl lg:text-4xl text-zinc-100 font-light leading-snug tracking-tight">
                                                "{testimonialsData[currentIndex].text}"
                                            </p>
                                       </div>
                                       
                                       <div className="absolute bottom-0 right-0 p-4 opacity-10">
                                           <div className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-white select-none">
                                               {String(testimonialsData[currentIndex].id).padStart(2, '0')}
                                           </div>
                                       </div>
                                   </div>
                               )}
                          </motion.div>
                      </AnimatePresence>
                      
                      {/* INFO BAR - ALWAYS VISIBLE - OUTSIDE MAIN ANIMATION */}
                      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-linear-to-t from-black to-transparent z-20 flex items-center justify-between pointer-events-none">
                           <div className="flex items-center gap-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`avatar-${currentIndex}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="w-12 h-12 rounded-full border border-white/10 overflow-hidden"
                                    >
                                        {testimonialsData[currentIndex].image ? (
                                            <img 
                                                src={testimonialsData[currentIndex].image} 
                                                alt={testimonialsData[currentIndex].author}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
                                                {testimonialsData[currentIndex].author.charAt(0)}
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                               <div className="overflow-hidden">
                                   <AnimatePresence mode="wait">
                                       <motion.div
                                           key={`info-${currentIndex}`}
                                           initial={{ opacity: 0, x: -20 }}
                                           animate={{ opacity: 1, x: 0 }}
                                           exit={{ opacity: 0, x: 20 }}
                                           transition={{ duration: 0.3, ease: "easeInOut" }}
                                       >
                                           <h3 className="text-white font-mono uppercase tracking-widest text-sm md:text-base font-bold">
                                               {testimonialsData[currentIndex].author}
                                           </h3>
                                           <p className="text-zinc-400 font-mono text-xs md:text-sm">
                                               {testimonialsData[currentIndex].role} @ {testimonialsData[currentIndex].company}
                                           </p>
                                       </motion.div>
                                   </AnimatePresence>
                               </div>
                           </div>
                           
                           <div className="hidden md:block overflow-hidden">
                               <AnimatePresence mode="wait">
                                   <motion.div
                                       key={`badge-${currentIndex}`}
                                       initial={{ opacity: 0, x: 20 }}
                                       animate={{ opacity: 1, x: 0 }}
                                       exit={{ opacity: 0, x: -20 }}
                                       transition={{ duration: 0.3, ease: "easeInOut" }}
                                       className="px-3 py-1 bg-white/10 border border-white/10 rounded text-[10px] font-mono text-white/70 uppercase tracking-widest"
                                   >
                                       {testimonialsData[currentIndex].type === 'video' ? 'Video Review' : 'Verified Quote'}
                                   </motion.div>
                               </AnimatePresence>
                           </div>
                      </div>
                 </div>
                 
                 {/* Progress Line */}
                 <div className="absolute -bottom-10 left-0 w-full flex items-center gap-2">
                     {testimonialsData.map((_, idx) => {
                         const isCurrent = idx === currentIndex
                         const isTransitioningFrom = isTransitioning && idx === transitionFromIndex
                         
                         return (
                             <button 
                                 key={idx}
                                 onClick={() => {
                                 setPlayingVideo(null)
                                     setCurrentIndex(idx)
                                 }}
                                 className={`h-1 flex-1 rounded-full transition-all duration-300 relative overflow-hidden bg-zinc-800 hover:bg-zinc-700`}
                             >
                                {/* Show transitioning bar filling to 100% or emptying to 0% */}
                                {isTransitioningFrom && (
                                    <motion.div 
                                        className="absolute inset-0 bg-white h-full"
                                        initial={{ width: `${transitionStartProgress}%` }}
                                        animate={{ width: transitionDirection === 'forward' ? '100%' : '0%' }}
                                        transition={{ duration: 0.3, ease: transitionDirection === 'forward' ? "easeOut" : "easeIn" }}
                                    />
                                )}
                                
                                {/* Show current bar with normal progress */}
                                {isCurrent && !isTransitioning && (
                                    <div 
                                        className="absolute inset-0 bg-white h-full transition-all duration-100 ease-linear"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}
                                
                                {/* Show new bar starting from 0% during transition */}
                                {isCurrent && isTransitioning && (
                                    <div 
                                        className="absolute inset-0 bg-white h-full transition-all duration-300 ease-in"
                                        style={{ width: '0%' }}
                                    />
                                )}
                             </button>
                         )
                     })}
                 </div>
            </div>

        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 p-4 hover:bg-white/10 rounded-full transition-colors group z-50"
            >
              <X className="w-8 h-8 text-zinc-500 group-hover:text-white transition-colors" />
            </button>
  
            <div className="relative w-full max-w-6xl aspect-video border border-zinc-800 bg-zinc-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <video
                className="w-full h-full"
                controls
                autoPlay
                src={modalVideo.videoUrl}
              />
               <div className="absolute top-0 left-0 px-4 py-2 bg-black border-r border-b border-zinc-800 text-xs font-mono text-zinc-500 flex items-center gap-2">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                 PLAYBACK_MODE // {String(modalVideo.id).padStart(3, '0')}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Testimonials

