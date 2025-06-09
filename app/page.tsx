"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Suspense } from 'react'
import About from "@/components/about"
import ContactHeader from "@/components/contact-header"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import { motion } from "framer-motion"
import { IconUser, IconBriefcase } from "@tabler/icons-react"
import { Skills } from "@/components/skills"
import HomeContent from "@/components/home-content"

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
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
