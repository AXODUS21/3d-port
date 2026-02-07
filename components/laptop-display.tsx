'use client'

import React from 'react'

export default function LaptopDisplay({ url }: { url: string }) {
  // If no URL is provided, we can show a placeholder or nothing.
  // Assuming url is provided based on page.tsx, but handling empty case is good practice.
  
  return (
    <div className="w-full flex justify-center items-center py-12 md:py-16">
      {/* Laptop Chassis */}
      <div className="relative w-[90vw] max-w-[1600px] mx-auto shadow-2xl">
        
        {/* Lid / Screen Frame */}
        <div className="relative bg-zinc-800 rounded-t-[1.5rem] p-[3%] pb-[1%] shadow-xl ring-1 ring-white/10 md:ring-white/5">
            {/* Webcam / Top Bezel Accents */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[15%] h-[4%] min-h-[16px] bg-zinc-800 rounded-b-xl flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] ring-1 ring-white/20 shadow-[0_0_4px_rgba(255,255,255,0.2)]"></div>
            </div>

            {/* Screen Area (Aspect Video) */}
            <div className="aspect-video bg-zinc-950 relative rounded-md overflow-hidden ring-1 ring-white/5 shadow-inner group">
                {url ? (
                    <div className="w-full h-full overflow-hidden">
                        <iframe 
                            src={url} 
                            className="h-full border-none bg-zinc-950"
                            style={{ width: 'calc(100% + 18px)' }}
                            title="Project Preview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 space-y-4">
                        <div className="w-16 h-16 rounded-full border-2 border-zinc-800 border-dashed animate-spin-slow opacity-20"></div>
                        <p className="font-mono text-sm tracking-widest uppercase opacity-50">No Signal</p>
                    </div>
                )}
                
                {/* Screen Glare / Reflection (Subtle) */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-transparent opacity-30 pointer-events-none mix-blend-overlay"></div>
            </div>
        </div>

        {/* Hinge Area (Visual connector between screen and base) */}
        <div className="h-[2%] w-full bg-zinc-900 relative z-10">
             <div className="absolute inset-x-[5%] top-0 bottom-0 bg-linear-to-b from-black to-[#1a1a1a]"></div>
        </div>

        {/* Base (Bottom Chassis) */}
        <div className="relative h-[12px] md:h-[18px] w-[102%] -left-[1%] bg-zinc-800 rounded-b-[1rem] rounded-t-sm shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] flex justify-center border-t border-white/5">
             {/* Thumb Groove */}
             <div className="w-[12%] h-[40%] bg-zinc-900 rounded-b-md border-white/5 border-b border-x opacity-50"></div>
        </div>

        {/* Ambient Reflection Underneath */}
        <div className="absolute -bottom-4 left-[2%] right-[2%] h-4 bg-black/40 blur-xl rounded-[100%]"></div>
      </div>
    </div>
  )
}
