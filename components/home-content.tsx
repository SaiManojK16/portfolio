"use client"

import { Suspense } from 'react'
import About from "@/components/about"
import ContactHeader from "@/components/contact-header"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import { motion } from "framer-motion"
import { Skills } from "@/components/skills"
import { SuccessMessage } from './success-message'

export default function HomeContent() {
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

  return (
    <div className="flex flex-col w-full">
      <Suspense fallback={null}>
        <SuccessMessage />
      </Suspense>

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