"use client"

import React from "react"
import { TimelineDemo } from "./timeline-demo"

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Experience
            </h2>
            <p className="mt-4 text-muted-foreground">
              My professional journey
            </p>
          </div>
          
          <div className="mt-8">
            <TimelineDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
