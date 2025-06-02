"use client"

import { motion } from "framer-motion"
import { IconBriefcase, IconUser } from "@tabler/icons-react"
import About from "@/components/about"
import { ContainerTextFlip } from "@/components/ui/container-text-flip"
import { Highlight } from "@/components/ui/hero-highlight"
import { Timeline } from "@/components/ui/timeline"

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

const timelineData = [
  {
    year: "2025–Present",
    title: "Full Stack Web & Mobile Developer",
    company: "MARVLS, LLC @ Siena College",
    location: "Remote",
    description: [
      "Spearheading the end-to-end development of an interactive AR-based educational platform as part of the MARVLS research initiative.",
      "Designing and deploying a full-stack website from scratch to showcase and support AR learning experiences.",
      "Building mobile applications using Flutter for both iOS and Android, integrating real-time AR models with educational content.",
      "Developing and optimizing 3D AR experiences using Unity for interactive STEM visualizations.",
    ],
  },
  {
    year: "2024–2025",
    title: "Data Structures Grader",
    company: "SUNY Albany",
    location: "Albany, NY",
    description: [
      "Evaluated weekly programming submissions for 50+ undergraduates with 99% accuracy.",
      "Automated grading using Python, reducing manual effort by 40%.",
    ],
  },
  {
    year: "2022",
    title: "Machine Learning Intern",
    company: "Phoenix Global",
    location: "Remote",
    description: [
      "Trained CNNs in TensorFlow to classify medical CT images, improving accuracy by 15%.",
      "Collaborated with data scientists and healthcare experts, validating model reliability on 5,000 clinical samples.",
    ],
  },
  {
    year: "2019–2022",
    title: "Computer Graphics Lab Assistant",
    company: "GITAM University",
    location: "India",
    description: [
      "Supported 10+ OpenGL projects, managing lab setups for 50+ students.",
      "Mentored students on graphics projects, improving success rates by 25%.",
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto">
      {/* About Section */}
      <motion.section
        initial="initial"
        animate="animate"
        className="mb-20 mt-28"
      >
        <motion.div custom={0} variants={fadeInUp} className="flex items-center gap-2 mb-6">
          <IconUser className="w-6 h-6" />
          <h2 className="text-2xl md:text-3xl font-bold">About Me</h2>
        </motion.div>
        <motion.div custom={1} variants={fadeInUp} className="max-w-none">
          <p className="text-lg text-muted-foreground">
            I'm a Full-Stack Developer and AI/ML Engineer with a Master's in Computer and Information Science, currently based in the vibrant tech landscape of New York. I don't just build software—I build with intention. Whether I'm designing scalable platforms using the MERN stack or deploying intelligent ML pipelines with TensorFlow, my focus is on creating systems that are fast, scalable, and genuinely impactful. With FastAPI, Docker, and AWS as part of my daily toolkit, I turn complex ideas into smooth, user-centric experiences.<br/><br/>
            Efficiency isn't just a goal—it's my favorite challenge. I thrive on optimizing data flow, automating processes, and removing friction wherever I find it. From setting up seamless CI/CD pipelines to spinning up cloud infrastructure with AWS Lambda, EC2, S3, and RDS, I've led systems that work smarter, not harder. And yes, I'm the type who quietly celebrates a perfect deploy and a log with zero errors.<br/><br/>
            Beyond the code, I bring curiosity, collaboration, and just the right amount of caffeine. I work best in teams that are passionate about solving real problems—and having fun doing it. Whether it's brainstorming features on a whiteboard, pair-programming through a tricky bug, or experimenting with AI to make something just a bit cooler, I'm all in. If you're looking for someone who's equal parts engineer, optimizer, and creative thinker—I might just be who you're looking for.
          </p>
        </motion.div>
      </motion.section>

      {/* Skills Section */}
      <About />

      {/* Timeline Section */}
      <div className="mb-20">
        <Timeline
          data={timelineData.map((item) => ({
            title: item.year,
            content: (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-neutral-900 dark:text-white">{item.title}</span>
                    {item.location && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                        {item.location}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">{item.company}</div>
                  <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300 pl-4">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </div>
  )
} 