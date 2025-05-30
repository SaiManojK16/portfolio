"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TypeAnimation } from "react-type-animation"
import ThemeToggle from "./theme-toggle"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Hero() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#030303] transition-colors duration-700">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <ThemeToggle />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span className="text-black/60 dark:text-white/60 whitespace-nowrap">
                Hi, I'm
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-black dark:from-white to-black/80 dark:to-white/80 whitespace-nowrap">
                Sai Manoj Kartala
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <div className="text-base sm:text-lg md:text-xl text-black/40 dark:text-white/40 mb-8 leading-relaxed font-light tracking-[0.2em] min-h-[2em] uppercase">
              <span className="js-only">
                <TypeAnimation
                  sequence={[
                    "Full-Stack Developer",
                    2000,
                    "Machine Learning Engineer",
                    2000,
                    "AI Developer",
                    2000,
                    "Web Developer",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'pre',
                  }}
                />
              </span>
              <noscript>
                <span>Full-Stack Developer | Machine Learning Engineer | AI Developer | Web Developer</span>
              </noscript>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
