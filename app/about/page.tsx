'use client'

import React from 'react'
import TransitionLink from '@/components/transition-link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8">
        <TransitionLink 
          href="/#hero-container"
          className="group flex items-center gap-2 text-zinc-800 hover:text-black transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-sm font-bold">Back to Home</span>
        </TransitionLink>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-8 py-32">
        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-12 text-black">
          About Me
        </h1>

        <div className="space-y-8 text-lg text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-black">Who I Am</h2>
            <p className="mb-4">
              I'm a passionate full-stack developer with expertise in building modern web applications. 
              With a strong foundation in both front-end and back-end technologies, I create seamless 
              digital experiences that solve real-world problems.
            </p>
            <p>
              My journey in web development began 5 years ago, and since then, I've worked with various 
              clients from startups to established businesses, helping them achieve their digital goals.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-black">My Approach</h2>
            <p className="mb-4">
              I believe in creating solutions that are not only visually stunning but also highly functional 
              and user-friendly. Every project I undertake is an opportunity to push the boundaries of what's 
              possible on the web.
            </p>
            <p>
              My development philosophy centers around clean code, scalable architecture, and attention to 
              detail. I'm constantly learning and adapting to new technologies to deliver cutting-edge solutions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-black">Technical Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-black">Front-End</h3>
                <ul className="space-y-2">
                  <li>• React, Next.js, TypeScript</li>
                  <li>• Three.js, WebGL, GSAP</li>
                  <li>• Tailwind CSS, Modern CSS</li>
                  <li>• Responsive & Accessible Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-black">Back-End</h3>
                <ul className="space-y-2">
                  <li>• Node.js, Express</li>
                  <li>• Database Design (SQL & NoSQL)</li>
                  <li>• API Development & Integration</li>
                  <li>• Cloud Services & Deployment</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-black">Beyond Code</h2>
            <p className="mb-4">
              When I'm not coding, you'll find me exploring new design trends, contributing to open-source 
              projects, or sharing knowledge with the developer community through blog posts and tutorials.
            </p>
            <p>
              I'm always excited to take on new challenges and collaborate on innovative projects. 
              Let's create something amazing together!
            </p>
          </section>
        </div>

        {/* CTA Section */}
        <div className="mt-20 pt-12 border-t border-zinc-200">
          <h2 className="text-4xl font-bold tracking-tight mb-6 text-black">Let's Work Together</h2>
          <p className="text-lg text-zinc-700 mb-8">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your vision to life.
          </p>
          <TransitionLink 
            href="/#contact"
            className="group inline-flex items-center gap-2 text-black border-b-2 border-black pb-1 hover:gap-3 transition-all text-lg font-bold"
          >
            <span className="uppercase tracking-widest">Get in Touch</span>
            <ArrowLeft className="w-5 h-5 rotate-180 transform group-hover:translate-x-1 transition-transform" />
          </TransitionLink>
        </div>
      </main>
    </div>
  )
}
