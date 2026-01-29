const Footer = () => {
  return (
    <footer className="relative bg-zinc-950 py-24 px-8 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Large Text Display with Shared H */}
        <div className="relative flex items-center justify-center">
          {/* Text Stack */}
          <div className="flex flex-col">
            <h2 className="text-[5.75rem] md:text-[8.625rem] lg:text-[11.5rem] font-black tracking-tighter leading-[0.85] text-white uppercase text-right">
              AXELLEROS
            </h2>
            <h2 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter leading-[0.85] text-white uppercase text-right">
              XELLTEC
            </h2>
          </div>
          
          {/* Large Shared H */}
          <div className="relative -ml-4">
            <h2 className="text-[16rem] md:text-[24rem] lg:text-[32rem] font-black tracking-tighter leading-[0.85] text-white uppercase -translate-y-4">
              H
            </h2>
          </div>
        </div>

        {/* Optional: Small footer info */}
        <div className="mt-16 text-center text-zinc-600 font-mono text-sm">
          <p>© 2026 XELLTECH. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
