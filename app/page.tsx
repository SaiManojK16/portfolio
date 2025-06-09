"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import About from "@/components/about"
import ContactHeader from "@/components/contact-header"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import { motion } from "framer-motion"
import { IconUser, IconBriefcase } from "@tabler/icons-react"
import { Skills } from "@/components/skills"

export default function HomePage() {
  const searchParams = useSearchParams()
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    }),
  }
  
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'success') {
      toast.success('Message sent successfully!', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        },
        description: 'Thank you for your message. I will get back to you as soon as possible.'
      })
    }
  }, [searchParams])

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section id="home" className="min-h-screen">
        <Hero />
      </section>

      {/* Content Sections */}
      <div>
        {/* About Section */}
        <section id="about" className="min-h-screen py-20">
          <div className="container mx-auto px-4">
            <About />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen py-20">
          <div className="container mx-auto px-4">
            <motion.section
              initial="initial"
              animate="animate"
              className="mb-20"
            >
              <motion.div custom={0} variants={fadeInUp} className="flex items-center gap-2 mb-6">
              </motion.div>
              <Experience />
            </motion.section>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20">
          <Projects />
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen py-20">
          <Skills />
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen py-20">
          <Education />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactHeader />
        </section>
      </div>
    </div>
  )
}
