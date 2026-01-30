'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import TransitionLink from '@/components/transition-link'

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  
  // Sample project data - in a real app, you'd fetch this based on the ID
  const projects: Record<string, any> = {
    '1': {
      title: "NEON VERTEX",
      category: "Interactive 3D Experience",
      year: "2025",
      description: "A revolutionary web graphics engine capable of rendering millions of particles in real-time. Designed for next-generation data visualization and immersive storytelling.",
      fullDescription: "NEON VERTEX represents a breakthrough in web-based 3D rendering technology. Built from the ground up with performance in mind, it leverages WebGL 2.0 and custom shader pipelines to achieve unprecedented particle counts and frame rates. The engine includes a sophisticated LOD system, spatial partitioning, and GPU-accelerated physics simulation.",
      tags: ["WebGL", "Three.js", "React Fiber"],
      challenge: "Creating a performant particle system that could handle millions of particles while maintaining 60fps across different devices.",
      solution: "Implemented instanced rendering, compute shaders for physics calculations, and a custom culling system that only renders visible particles.",
      results: ["10M+ particles at 60fps", "50% reduction in memory usage", "Cross-platform compatibility"],
    },
    '2': {
      title: "AETHER FINANCE",
      category: "DeFi Dashboard",
      year: "2025",
      description: "Institutional-grade diversified portfolio management with real-time analytics and prediction markets.",
      fullDescription: "AETHER FINANCE is a comprehensive DeFi platform built on Solana, offering institutional investors a sophisticated suite of tools for portfolio management, risk analysis, and automated trading strategies. The platform processes thousands of transactions per second with sub-millisecond latency.",
      tags: ["Solana", "Rust", "Next.js"],
      challenge: "Building a real-time financial dashboard that could handle high-frequency updates while maintaining data accuracy.",
      solution: "Developed a custom WebSocket infrastructure with optimistic updates and conflict resolution, backed by Solana's high-throughput blockchain.",
      results: ["$50M+ in managed assets", "99.99% uptime", "Sub-100ms update latency"],
    },
    '3': {
      title: "SYNTH OS",
      category: "Web Operating System",
      year: "2024",
      description: "A fully functional cloud operating system that lives in the browser.",
      fullDescription: "SYNTH OS reimagines what's possible in the browser by creating a complete operating system experience. It features a virtual file system, process management, window manager, and a suite of native applications all running entirely in the browser using WebAssembly.",
      tags: ["TypeScript", "WASM", "System Design"],
      challenge: "Creating a responsive, multi-tasking environment within the constraints of a web browser.",
      solution: "Built a custom virtual machine using WebAssembly, implemented cooperative multitasking, and created a virtual file system with IndexedDB persistence.",
      results: ["100K+ active users", "50+ integrated apps", "Featured on HackerNews"],
    },
    '4': {
      title: "VOID RUNNER",
      category: "Browser Game",
      year: "2024",
      description: "Cyberpunk infinite runner featuring procedural generation and reactive audio synthesis.",
      fullDescription: "VOID RUNNER is an infinite runner game that pushes the boundaries of what's achievable with vanilla JavaScript and the Canvas API. The game features procedurally generated levels, reactive audio that responds to gameplay, and a custom physics engine—all without external game engines.",
      tags: ["Canvas API", "WebAudio", "Procedural"],
      challenge: "Achieving console-quality performance and audio in a browser game without using established game engines.",
      solution: "Implemented a custom rendering pipeline with object pooling, developed a procedural generation system with seed-based reproducibility, and created a reactive audio engine using Web Audio API.",
      results: ["500K+ plays", "4.8/5 rating", "Featured on gaming blogs"],
    },
  }

  const project = projects[params.id] || projects['1']

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <TransitionLink
            href="/"
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Home</span>
          </TransitionLink>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </button>
            <button className="p-2 text-zinc-400 hover:text-white transition-colors">
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="text-zinc-500 font-mono text-sm tracking-wider">{project.category} • {project.year}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
            {project.title}
          </h1>
          <p className="text-2xl text-zinc-400 max-w-3xl font-light leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Project Image */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 flex items-center justify-center">
              <span className="text-zinc-700 font-mono text-2xl">PROJECT_PREVIEW.jpg</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">The Solution</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {project.solution}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Results</h2>
              <ul className="space-y-4">
                {project.results.map((result: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-zinc-300 text-lg">
                    <span className="text-zinc-600 mt-1">▸</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400 font-mono uppercase tracking-wider border border-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-4">Year</h3>
              <p className="text-2xl font-bold">{project.year}</p>
            </div>

            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-4">Category</h3>
              <p className="text-lg text-zinc-300">{project.category}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Interested in working together?</h2>
          <TransitionLink
            href="/#contact"
            className="px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all duration-300 inline-flex items-center gap-3 hover:scale-105"
          >
            <span>Get in Touch</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </TransitionLink>
        </div>
      </section>
    </div>
  )
}
