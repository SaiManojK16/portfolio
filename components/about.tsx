"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover"

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Column */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="aspect-square w-full max-w-[500px] mx-auto">
              <div className="relative">
                <DirectionAwareHover
                  imageUrl="/portfolio/images/Me.jpg"
                  className="border-4 border-border"
                  imageClassName="object-cover object-[center_15%]"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className="relative w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl opacity-20" />
            <div className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-foreground">About Me</h1>
                <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-muted-foreground">
                  <p>
                    I'm a Full-Stack Developer and AI/ML Engineer with a Master's in Computer and Information Science, crafting digital experiences from New York. With a focus on intention and impact, I specialize in building scalable platforms and intelligent systems that are fast, intuitive, and genuinely useful. Whether it's developing robust applications or implementing ML solutions, I turn complex ideas into smooth, user-centric experiences.
                  </p>
                  <p>
                    Efficiency and innovation drive my approach to problem-solving. From streamlining workflows to deploying adaptive systems, I thrive on creating solutions that work smarter, not harder. I bring a blend of technical expertise, collaborative spirit, and creative thinking to every project—whether it's architecting new features, optimizing performance, or exploring the boundaries of what's possible with emerging technologies.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
