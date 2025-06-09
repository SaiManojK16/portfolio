"use client"

import { Suspense, useCallback } from 'react'
import dynamic from 'next/dynamic'
import About from "@/components/about"
import Contact from "@/components/contact"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Hero from "@/components/hero"
import { Skills } from "@/components/skills"
import { SuccessMessage } from './success-message'

// Dynamically import the Projects component since it's usually larger
const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading projects...</div>
})

export default function HomeContent() {
  // Memoize section wrapper to prevent unnecessary re-renders
  const SectionWrapper = useCallback(({ id, children }: { id: string, children: React.ReactNode }) => (
    <section 
      id={id} 
      className="min-h-screen py-20 will-change-transform"
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  ), [])

  return (
    <div className="flex flex-col w-full">
      <Suspense fallback={null}>
        <SuccessMessage />
      </Suspense>

      {/* Hero Section */}
      <section id="home" className="min-h-screen will-change-transform">
        <Hero />
      </section>

      {/* Content Sections */}
      <div>
        {/* About Section */}
        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        {/* Experience Section */}
        <SectionWrapper id="experience">
          <Experience />
        </SectionWrapper>

        {/* Projects Section */}
        <SectionWrapper id="projects">
          <Suspense fallback={<div>Loading projects...</div>}>
            <Projects />
          </Suspense>
        </SectionWrapper>

        {/* Skills Section */}
        <SectionWrapper id="skills">
          <Skills />
        </SectionWrapper>

        {/* Education Section */}
        <SectionWrapper id="education">
          <Education />
        </SectionWrapper>

        {/* Contact Section */}
        <section id="contact" className="will-change-transform">
          <Contact />
        </section>
      </div>
    </div>
  )
} 