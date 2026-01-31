import React from 'react'
import TransitionLink from '@/components/transition-link'

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateStaticParams() {
    return [
      { id: '01' },
      { id: '02' },
      { id: '03' },
      { id: '04' },
    ]
}

const ServiceDetail = async ({ params }: PageProps) => {
  const { id } = await params
  
  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
        
        {/* Placeholder Content */}
        <div className="z-10 text-center max-w-2xl px-6">
            <span className="font-mono text-sm tracking-widest text-zinc-500 mb-4 block uppercase">Service Detail</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                SERVICE {id}
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                This implies a more comprehensive detail page for the selected service.
                Content would be dynamically loaded based on ID: {id}.
            </p>
            
            <TransitionLink href="/#services" className="mt-12 inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-white/70 transition-colors">
                Back to Services
            </TransitionLink>
        </div>

        {/* Background Noise/Decoration */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

    </div>
  )
}

export default ServiceDetail
