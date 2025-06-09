"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TypeAnimation } from "react-type-animation"
import ThemeToggle from "./theme-toggle"
import Link from "next/link"
import { IconDownload, IconMail, IconCheck } from "@tabler/icons-react"

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
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <style jsx global>{`
        .button-base {
          --width: 160px;
          --height: 45px;
          width: var(--width);
          height: var(--height);
          position: relative;
          text-align: center;
          border-radius: 100px;
          font-family: inherit;
          transition: background 0.3s;
        }

        .download-btn {
          background: black;
        }

        .contact-btn {
          background: black;
        }

        .dark .download-btn,
        .dark .contact-btn {
          background: white;
        }

        .button-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: white;
          font-size: 15px;
          font-weight: 500;
        }

        .dark .button-text {
          color: black;
        }

        .button-wrapper,
        .button-text,
        .button-icon {
          overflow: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
        }

        .button-text {
          top: 0
        }

        .button-text,
        .button-icon {
          transition: top 0.5s;
        }

        .button-icon {
          color: white;
          top: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark .button-icon {
          color: black;
        }

        .download-btn:hover,
        .contact-btn:hover {
          background: #333;
        }

        .dark .download-btn:hover,
        .dark .contact-btn:hover {
          background: #f0f0f0;
        }

        .download-btn:hover .button-text,
        .contact-btn:hover .button-text {
          top: -100%;
        }

        .download-btn:hover .button-icon,
        .contact-btn:hover .button-icon {
          top: 0;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <ThemeToggle />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span className="text-black/60 dark:text-white/60 whitespace-nowrap">
                Hi, I'm
              </span>
              <span className="text-black dark:text-white whitespace-nowrap">
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

          <motion.div 
            custom={3} 
            variants={fadeUpVariants} 
            initial="hidden" 
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="button-base download-btn"
            >
              <div className="button-wrapper">
                <div className="button-text">
                  Resume
                  <IconDownload size={20} />
                </div>
                <span className="button-icon">
                  <IconDownload size={24} />
                </span>
              </div>
            </a>
            <Link 
              href="#contact" 
              className="button-base contact-btn"
            >
              <div className="button-wrapper">
                <div className="button-text">
                  Contact me
                  <IconMail size={20} />
                </div>
                <span className="button-icon">
                  <IconMail size={24} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
