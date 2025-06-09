"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandPython,
  IconBrandNodejs,
  IconDatabase,
  IconBrandPrisma,
  IconBrandOpenai,
  IconBrain,
  IconVideo,
  IconEye,
  IconServer,
  IconBrandFirebase,
  IconChartBar,
  IconRobot,
  IconMessages,
  IconScale,
  IconChevronLeft,
  IconChevronRight,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const ProjectCard = React.memo(
  ({
    project,
    index,
    hovered,
    setHovered,
  }: {
    project: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-xl relative overflow-hidden h-[28rem] w-full transition-all duration-300 ease-out",
        project.gradient,
        hovered !== null && hovered !== index && "blur-sm scale-[0.97] opacity-50"
      )}
    >
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-muted">
              {project.icon}
            </div>
            <span className="text-sm font-medium text-muted-foreground">{project.category}</span>
          </div>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <IconBrandGithub className="h-5 w-5" />
          </a>
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-3">
          {project.title}
        </h3>

        <div className="space-y-2 mb-6">
          {project.description.map((point: string, i: number) => (
            <p key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="mt-1">•</span>
              {point}
            </p>
          ))}
        </div>

        <div className="mt-auto">
          <div className="text-sm font-medium text-muted-foreground mb-2">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.techIcons.map((Icon: any, i: number) => (
              <div key={i} className="p-1.5 rounded-md bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);

ProjectCard.displayName = "ProjectCard";

const projects = [
  {
    category: "Full Stack Development",
    title: "AI-Powered Course Management Platform",
    description: [
      "Built academic platform with assignment submission, real-time collaboration, and structured student–teacher interaction",
      "Integrated secure code execution and AI-powered document editor for coursework and grading workflows"
    ],
    icon: <IconBrandNextjs className="h-6 w-6" />,
    link: "https://github.com/SaiManojK16/Course_Platform",
    techIcons: [IconBrandNextjs, IconBrandPrisma, IconBrandOpenai, IconBrain, IconVideo],
    gradient: "bg-card dark:bg-card/80 border border-border",
  },
  {
    category: "AI & Computer Vision",
    title: "WearMe – AI Outfit Recommendation",
    description: [
      "Built AI styling assistant recommending weather-based outfits with fabric, color, and occasion matching",
      "Used MERN, FastAPI, TensorFlow with a wardrobe dashboard for full-stack personalization"
    ],
    icon: <IconBrandReact className="h-6 w-6" />,
    link: "https://github.com/SaiManojK16/se",
    techIcons: [IconBrandReact, IconServer, IconEye, IconBrain, IconRobot],
    gradient: "bg-card dark:bg-card/80 border border-border",
  },
  {
    category: "Machine Learning",
    title: "DocP – AI Document Parsing",
    description: [
      "Developed OCR + NLP parser improving data accuracy by 20%",
      "Built AI-powered dashboards reducing decision-making time by 30%",
      "Featured as Best Project at University Showcase"
    ],
    icon: <IconBrandPython className="h-6 w-6" />,
    link: "https://github.com/sudarshan-lab/DocP-Document-Parsing",
    techIcons: [IconBrandPython, IconEye, IconChartBar, IconBrain, IconScale],
    gradient: "bg-card dark:bg-card/80 border border-border",
  },
  {
    category: "Web Development",
    title: "ChoreWise – Task Automation",
    description: [
      "Mobile app for roommates to manage and assign chores",
      "Includes real-time chat and reduced household conflict by 40%"
    ],
    icon: <IconBrandNodejs className="h-6 w-6" />,
    link: "https://github.com/SaiManojK16/SE-DOCP",
    techIcons: [IconBrandReact, IconBrandNodejs, IconBrandFirebase, IconMessages],
    gradient: "bg-card dark:bg-card/80 border border-border",
  },
  {
    category: "Full Stack Development",
    title: "Tried & Tasted – AI Meal Planner",
    description: [
      "Built full-stack platform to plan meals, auto-generate shopping lists, and scale recipes",
      "Personalized with SQL logic and AI assistance using PHP, MySQL, TensorFlow, and OCR"
    ],
    icon: <IconDatabase className="h-6 w-6" />,
    link: "https://github.com/SaiManojK16/Temp",
    techIcons: [IconDatabase, IconBrain, IconEye, IconScale, IconRobot],
    gradient: "bg-card dark:bg-card/80 border border-border",
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout>();
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Setup intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setCurrentIndex(index);
          }
        }
      });
    }, options);

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Handle auto-scrolling
  useEffect(() => {
    if (!autoScroll) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      return;
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const nextIndex = (currentIndex + 1) % projects.length;
        const cardWidth = scrollContainerRef.current.offsetWidth;
        
        scrollContainerRef.current.scrollTo({
          left: nextIndex * (cardWidth + 32),
          behavior: 'smooth'
        });
        
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [autoScroll, currentIndex]);

  // Pause auto-scroll on user interaction
  const handleInteraction = () => {
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 5000);
  };

  // Touch navigation
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    handleInteraction();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      const nextIndex = diff > 0 
        ? Math.min(projects.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);

      if (scrollContainerRef.current) {
        const cardWidth = scrollContainerRef.current.offsetWidth;
        scrollContainerRef.current.scrollTo({
          left: nextIndex * (cardWidth + 32),
          behavior: 'smooth'
        });
        setCurrentIndex(nextIndex);
      }
      setTouchStart(null);
    }
  };

  // Fix the ref callback type
  const setProjectRef = (el: HTMLDivElement | null, index: number) => {
    projectRefs.current[index] = el;
  };

  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white/90 text-center mb-4">
          Featured Projects
        </h2>
        <p className="text-gray-600 dark:text-white/60 text-center max-w-3xl mx-auto mb-16 text-xl">
          A showcase of my work in AI, web development, and software engineering.
        </p>
        
        <div className="relative group">
          {/* Project Counter */}
          <div className="absolute top-4 right-4 z-20 bg-black/20 dark:bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-black dark:text-white">
            {currentIndex + 1} / {projects.length}
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide"
            onMouseEnter={handleInteraction}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onWheel={handleInteraction}
          >
            {projects.map((project, index) => (
              <div 
                key={project.title} 
                ref={(el) => setProjectRef(el, index)}
                className="flex-none snap-center"
                style={{ width: 'min(100%, 450px)' }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  hovered={hovered}
                  setHovered={setHovered}
                />
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {projects.map((project, index) => (
              <button
                key={index}
                className={cn(
                  "group flex items-center gap-2 py-2 px-3 rounded-full transition-all duration-300",
                  currentIndex === index 
                    ? "bg-black/10 dark:bg-white/10" 
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => {
                  handleInteraction();
                  if (scrollContainerRef.current) {
                    const cardWidth = scrollContainerRef.current.offsetWidth;
                    scrollContainerRef.current.scrollTo({
                      left: index * (cardWidth + 32),
                      behavior: 'smooth'
                    });
                    setCurrentIndex(index);
                  }
                }}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index 
                    ? "bg-black dark:bg-white w-6" 
                    : "bg-black/30 dark:bg-white/30"
                )} />
                <span className={cn(
                  "text-sm text-black/70 dark:text-white/70 transition-all duration-300",
                  currentIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                  {project.title.split('–')[0].trim()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this to your global CSS file (globals.css)
// .scrollbar-hide::-webkit-scrollbar {
//     display: none;
// }