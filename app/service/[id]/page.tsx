'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react'
import TransitionLink from '@/components/transition-link'
import { useLenis } from '@/components/smooth-scroll'

export default function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const lenis = useLenis()
  const { id } = use(params)

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [lenis])

  // Mock Data for Services matches IDs from section/services.tsx
  // IDs: "01" (Brand), "02" (UI/UX), "03" (Web Dev), "04" (3D)
  const services: Record<string, any> = {
    "01": {
      title: "Brand Design",
      subtitle: "Identity & Strategy",
      description: "We build distinct brand identities that resonate with your audience. From logo design to comprehensive style guides, we ensure your brand communicates its value clearly and consistently.",
      process: [
        { title: "Discovery", desc: "Understanding your core values, audience, and market position." },
        { title: "Strategy", desc: "Defining the visual direction and communication pillars." },
        { title: "Identity Creation", desc: "Crafting the logo, typography, and color systems." },
        { title: "Guidelines", desc: "Documenting usage to ensure consistency across all media." }
      ],
      deliverables: ["Logo Suite", "Brand Guidelines", "Typography System", "Social Media Assets", "Stationery Design"],
      icon: <Layers className="w-12 h-12 text-zinc-400" />
    },
    "02": {
      title: "UI/UX Design",
      subtitle: "Digital Product Architecture",
      description: "Designing intuitive and aesthetically pleasing user interfaces that drive engagement. We prioritize user journey and accessibility above all to create seamless digital experiences.",
      process: [
        { title: "User Research", desc: "Analyzing user behaviors and pain points." },
        { title: "Wireframing", desc: "Structuring the information architecture and flow." },
        { title: "Prototyping", desc: "Creating interactive high-fidelity mockups." },
        { title: "Testing", desc: "Validating with real users to refine the experience." }
      ],
      deliverables: ["User/Customer Journey Maps", "Wireframes", "High-fidelity UI", "Interactive Prototypes", "Design System"],
      icon: <Cpu className="w-12 h-12 text-zinc-400" />
    },
    "03": {
      title: "Web Development",
      subtitle: "Front-end & CMS",
      description: "We implement optimized code without compromising beautiful design. We provide immersive experiences with 3D and animations while achieving high Core Web Vitals scores.",
      process: [
        { title: "Technical Planner", desc: "Selecting the right stack and architecture." },
        { title: "Development", desc: "Clean, component-based coding with modern frameworks." },
        { title: "Integration", desc: "Connecting CMS, APIs, and backend services." },
        { title: "Optimization", desc: "Ensuring lighting fast load times and SEO." }
      ],
      deliverables: ["Responsive Website", "CMS Integration", "SEO Optimization", "Performance Report", "Source Code"],
      icon: <Code2 className="w-12 h-12 text-zinc-400" />
    },
    "04": {
      title: "3D & Motion",
      subtitle: "Immersive Experiences",
      description: "We create immersive worldviews using advanced technologies such as WebGL, AR, and Infographics. We enhance brand experiences through stunning creative content.",
      process: [
        { title: "Storyboarding", desc: "Visualizing the narrative and motion flow." },
        { title: "Modeling & Assets", desc: "Creating high-quality 3D assets and environments." },
        { title: "Animation", desc: "Bringing the scene to life with fluid motion." },
        { title: "Rendering & Comp", desc: "Final polish, lighting, and post-processing." }
      ],
      deliverables: ["WebGL Experience", "Product Renders", "Motion Graphics", "AR Assets", "Explainer Videos"],
      icon: <Layers className="w-12 h-12 text-zinc-400" />
    }
  }

  const service = services[id] || services["01"]

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white/20">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <TransitionLink
            href="/#services"
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Services</span>
          </TransitionLink>
          
          <div className="font-mono text-sm text-zinc-500 uppercase tracking-widest hidden md:block">
            Service Details // {id}
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20">
        
        {/* Hero Section */}
        <section className="px-6 mb-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-start md:items-end mb-12">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-zinc-800 rounded-full bg-zinc-900/50">
                            {service.icon}
                            <span className="font-mono text-sm uppercase tracking-wider text-zinc-300">{service.subtitle}</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                            {service.title.split('\n').map((line: string, i: number) => (
                                <span key={i} className="block">{line}</span>
                            ))}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl">
                            {service.description}
                        </p>
                    </div>
                </div>
                
                <div className="w-full h-[1px] bg-zinc-800" />
            </div>
        </section>

        {/* Process Grid */}
        <section className="px-6 mb-32">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 mb-16">
                    <h2 className="text-3xl font-bold uppercase tracking-tight flex-shrink-0 w-64">
                        Our Process
                    </h2>
                    <p className="text-zinc-500 max-w-lg">
                        A systematic approach ensures consistent quality. We break down complex challenges into manageable steps, keeping you involved at every stage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {service.process.map((step: any, index: number) => (
                        <div key={index} className="relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-800 group-hover:bg-white transition-colors duration-500" />
                            <div className="pt-8">
                                <span className="font-mono text-4xl text-zinc-700 block mb-4 group-hover:text-white transition-colors duration-300">
                                    0{index + 1}
                                </span>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Deliverables Section */}
        <section className="px-6 mb-32 bg-zinc-900/30 py-24 border-y border-zinc-900">
             <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                 <div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">
                        What you<br/>receive
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        Beyond just the final output, we provide comprehensive documentation and assets to ensure you can maintain and scale your project effectively.
                    </p>
                    <TransitionLink href="/#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-sm uppercase font-bold tracking-widest hover:bg-zinc-200 transition-colors">
                        Start Project <ArrowLeft className="w-4 h-4 rotate-180" />
                    </TransitionLink>
                 </div>

                 <div className="bg-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-white/10 transition-colors duration-700" />
                    <ul className="space-y-4 relative z-10">
                        {service.deliverables.map((item: string, i: number) => (
                            <li key={i} className="flex items-center gap-4 text-lg text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-zinc-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                 </div>
             </div>
        </section>

      </main>
    </div>
  )
}
