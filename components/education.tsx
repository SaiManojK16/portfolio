"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { IconBrandGithub, IconSchool, IconTrophy, IconFilter } from "@tabler/icons-react"
import { ResponsiveImage } from "@/components/ui/responsive-image"

export default function Education() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState<'all' | 'education' | 'achievement'>('all')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout>()
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const educationData = [
    {
      type: "education",
      title: "M.S. in Computer Science",
      institution: "SUNY Albany",
      location: "Albany, NY",
      period: "2024-2025",
      details: {
        gpa: "3.49",
        description: "Specializing in Software Engineering and Artificial Intelligence",
        courses: ["AI", "ML", "OS", "Data Structures", "Databases", "Software Engineering"]
      },
      image: "/portfolio/images/UAlbany.jpg",
      imageAlt: "SUNY Albany Campus",
      gradient: "bg-card dark:bg-card/80 border border-border",
      icon: <IconSchool className="h-6 w-6" />
    },
    {
      type: "education",
      title: "B.Tech in Computer Science",
      institution: "GITAM University",
      location: "India",
      period: "2019-2023",
      details: {
      gpa: "3.65",
        description: "Graduated with Distinction in Computer Science Engineering",
        courses: ["Data Structures", "Algorithms", "Computer Graphics", "Database Systems", "Web Development"]
      },
      image: "/portfolio/images/Graduation.JPG",
      imageAlt: "Graduation Ceremony",
      gradient: "bg-card dark:bg-card/80 border border-border",
      icon: <IconSchool className="h-6 w-6" />
    },
    {
      type: "achievement",
      title: "Top Achiever Award",
      institution: "GITAM University",
      period: "2023",
      details: {
        description: "Awarded for outstanding academic performance",
        highlights: [
          "Recognized among top 5% of graduating class",
          "Excellence in academic and extracurricular activities"
        ]
      },
      image: "/portfolio/images/Top Achiever Award.JPG",
      imageAlt: "Top Achiever Award Ceremony",
      gradient: "bg-card dark:bg-card/80 border border-border",
      icon: <IconTrophy className="h-6 w-6" />
    },
    {
      type: "achievement",
      title: "Featured Project: DocP",
      institution: "SUNY Albany Showcase",
      period: "2024",
      details: {
        description: "Selected for university-wide project showcase",
        highlights: [
          "Innovative document processing solution",
          "Recognition for technical excellence"
        ]
      },
      image: "/portfolio/images/showcase.jpeg",
      imageAlt: "DocP Project Showcase",
      gradient: "bg-card dark:bg-card/80 border border-border",
      icon: <IconTrophy className="h-6 w-6" />
    }
  ]

  const filteredData = educationData.filter(item => 
    filter === 'all' ? true : item.type === filter
  )

  // Reset current index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [filter])

  // Setup intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex(
            (ref) => ref === entry.target
          )
          if (index !== -1) {
            setCurrentIndex(index)
          }
        }
      })
    }, options)

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Handle auto-scrolling
  useEffect(() => {
    if (!autoScroll) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
      return
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const nextIndex = (currentIndex + 1) % filteredData.length
        const cardWidth = scrollContainerRef.current.offsetWidth
        
        scrollContainerRef.current.scrollTo({
          left: nextIndex * (cardWidth + 32),
          behavior: 'smooth'
        })
        
        setCurrentIndex(nextIndex)
      }
    }, 3000)

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [autoScroll, currentIndex, filteredData.length])

  // Pause auto-scroll on user interaction
  const handleInteraction = () => {
    setAutoScroll(false)
    setTimeout(() => setAutoScroll(true), 5000)
  }

  // Touch navigation
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
    handleInteraction()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
    
    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      const nextIndex = diff > 0 
        ? Math.min(filteredData.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1)

      if (scrollContainerRef.current) {
        const cardWidth = scrollContainerRef.current.offsetWidth
        scrollContainerRef.current.scrollTo({
          left: nextIndex * (cardWidth + 32),
          behavior: 'smooth'
        })
        setCurrentIndex(nextIndex)
      }
      setTouchStart(null)
    }
  }

  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el
  }

  const CardComponent = React.memo(
    ({ data, index }: { data: any; index: number }) => (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-xl relative w-full transition-all duration-300 ease-out p-3 md:p-4 h-[450px] md:h-[500px] flex flex-col",
          data.gradient,
          hovered === index && "scale-[1.02]"
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="p-1 md:p-1.5 rounded-lg bg-muted">
              {data.icon}
            </div>
            <span className="text-[10px] md:text-xs font-medium text-muted-foreground">
              {data.type === "education" ? "Education" : "Achievement"}
            </span>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground">{data.period}</span>
        </div>

        <div className="space-y-2 md:space-y-3 flex-grow">
          <div>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-0.5 md:mb-1 line-clamp-2">
              {data.title}
            </h3>
            <p className="text-xs md:text-sm text-primary font-medium">{data.institution}</p>
            {data.location && (
              <p className="text-[10px] md:text-xs text-muted-foreground">{data.location}</p>
            )}
          </div>

          <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
            <ResponsiveImage
              src={data.image}
              alt={data.imageAlt}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>

          <div className="flex-grow">
            {data.details.gpa ? (
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-[10px] md:text-xs text-muted-foreground">GPA: {data.details.gpa}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">{data.details.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[10px] md:text-xs mb-1">Key Courses</h4>
                  <div className="flex flex-wrap gap-1">
                    {data.details.courses.map((course: string, i: number) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 text-[8px] md:text-[10px] rounded-full bg-muted text-muted-foreground"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 md:space-y-2">
                <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">{data.details.description}</p>
                <div className="space-y-1">
                  {data.details.highlights.map((highlight: string, i: number) => (
                    <p key={i} className="text-[10px] md:text-xs text-muted-foreground flex items-start gap-1 line-clamp-2">
                      <span className="mt-0.5">•</span>
                      {highlight}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  )

  CardComponent.displayName = "CardComponent"

  return (
    <section id="education" className="min-h-screen flex flex-col py-8 overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white/90 mb-2">
            Education & Achievements
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
            My academic journey and notable accomplishments
          </p>
        </div>

        {/* Filter Section - Optimized for mobile */}
        <div className="flex justify-center mb-6 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-card dark:bg-card/80 rounded-full p-1">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300",
                filter === 'all' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter('education')}
              className={cn(
                "px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1 md:gap-1.5",
                filter === 'education' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
            >
              <IconSchool className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Education</span>
            </button>
            <button
              onClick={() => setFilter('achievement')}
              className={cn(
                "px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1 md:gap-1.5",
                filter === 'achievement' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
            >
              <IconTrophy className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Achievements</span>
            </button>
          </div>
        </div>

        <div className="relative group w-full">
          {/* Counter - Optimized for mobile */}
          <div className="absolute top-2 md:top-4 right-2 md:right-4 z-20 bg-black/20 dark:bg-white/20 backdrop-blur-sm px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium text-black dark:text-white">
            {currentIndex + 1} / {filteredData.length}
          </div>

          <div className="flex justify-center w-full relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory no-scrollbar w-full"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onMouseEnter={handleInteraction}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onWheel={handleInteraction}
            >
              <div className="pl-[max(16px,calc((100%-350px)/2))]" />
              {filteredData.length === 0 ? (
                <div className="flex items-center justify-center w-full py-8">
                  <p className="text-sm text-muted-foreground">No items to display</p>
                </div>
              ) : (
                <>
                  {filteredData.map((item, index) => (
                    <div 
                      key={item.title} 
                      ref={(el) => setItemRef(el, index)}
                      className="flex-none snap-center"
                      style={{ 
                        width: 'min(350px, calc(100vw - 48px))',
                        scrollSnapAlign: 'center'
                      }}
                    >
                      <CardComponent
                        data={item}
                        index={index}
                      />
                    </div>
                  ))}
                </>
              )}
              <div className="pr-[max(16px,calc((100%-350px)/2))]" />
            </div>
          </div>

          {/* Navigation Dots - Optimized for mobile */}
          <div className="flex justify-center items-center gap-1.5 md:gap-2 mt-2">
            {filteredData.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "group flex items-center gap-1 md:gap-1.5 py-1 md:py-1.5 px-1.5 md:px-2 rounded-full transition-all duration-300",
                  currentIndex === index 
                    ? "bg-black/10 dark:bg-white/10" 
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => {
                  handleInteraction()
                  if (scrollContainerRef.current) {
                    const cardWidth = Math.min(350, window.innerWidth - 48)
                    const containerWidth = scrollContainerRef.current.offsetWidth
                    const scrollPosition = index * (cardWidth + 16) - (containerWidth - cardWidth) / 2
                    scrollContainerRef.current.scrollTo({
                      left: scrollPosition,
                      behavior: 'smooth'
                    })
                    setCurrentIndex(index)
                  }
                }}
              >
                <div className={cn(
                  "w-1 md:w-1.5 h-1 md:h-1.5 rounded-full transition-all duration-300",
                  currentIndex === index 
                    ? "bg-black dark:bg-white w-3 md:w-4" 
                    : "bg-black/30 dark:bg-white/30"
                )} />
                <span className={cn(
                  "text-[10px] md:text-xs text-black/70 dark:text-white/70 transition-all duration-300",
                  currentIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                  {item.title.split('–')[0].trim()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
