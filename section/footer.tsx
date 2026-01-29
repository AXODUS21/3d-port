'use client'

import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative bg-zinc-950 py-24 px-8 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Large Text Display with Shared H */}
        <div className="relative flex items-center justify-center">
          {/* Text Stack */}
          <div className="flex flex-col">
            <motion.h2 
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[5.75rem] md:text-[8.625rem] lg:text-[11.5rem] font-black tracking-tighter leading-[0.85] text-white uppercase text-right"
            >
              AXELLEROS
            </motion.h2>
            <motion.h2 
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter leading-[0.85] text-white uppercase text-right"
            >
              XELLTEC
            </motion.h2>
          </div>
          
          {/* Large Shared H */}
          <div className="relative -ml-4">
            <motion.h2 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              viewport={{ once: true }}
              className="text-[16rem] md:text-[24rem] lg:text-[32rem] font-black tracking-tighter leading-[0.85] text-white uppercase -translate-y-4"
            >
              H
            </motion.h2>
          </div>
        </div>

        {/* Optional: Small footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-zinc-600 font-mono text-sm"
        >
          <p>© 2026 XELLTECH. ALL RIGHTS RESERVED.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
