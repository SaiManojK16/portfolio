"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Lens } from "@/components/ui/lens";
import {
  SiPython,
  SiJavascript,
  SiOpenjdk as SiJava,
  SiC,
  SiMysql,
  SiTensorflow,
  SiScikitlearn,
  SiOpencv,
  SiHuggingface,
  SiLangchain,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiTableau,
  SiGit,
  SiJupyter,
  SiFigma,
  SiUnity,
  SiBlender,
  SiPostman,
  SiReact,
  SiNodedotjs,
  SiFastapi,
  SiFlask,
  SiPrisma,
  SiAmazon as SiAmazonaws,
  SiDocker,
  SiKubernetes,
  SiExpress,
  SiGithubactions,
  SiJenkins,
  SiFlutter,
} from "react-icons/si";
import { IconDatabase, IconBrain, IconVideo, IconChartBar } from "@tabler/icons-react";

const skillCategories = [
  {
    title: "Languages",
    description: "Programming languages that form the foundation of application development, ranging from general-purpose languages to specialized ones.",
    skills: [
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "Java", icon: <SiJava className="text-[#007396]" /> },
      { name: "C", icon: <SiC className="text-[#A8B9CC]" /> },
      { name: "SQL", icon: <IconDatabase className="text-[#4479A1]" /> },
    ],
  },
  {
    title: "AI/ML",
    description: "Tools and frameworks for machine learning, deep learning, and artificial intelligence development.",
    skills: [
      { name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" /> },
      { name: "Hugging Face", icon: <SiHuggingface className="text-[#FFD21E]" /> },
      { name: "OpenCV", icon: <SiOpencv className="text-[#5C3EE8]" /> },
      { name: "Scikit-learn", icon: <SiScikitlearn className="text-[#F7931E]" /> },
      { name: "LangChain", icon: <SiLangchain className="text-[#3178C6]" /> },
      { name: "FAISS", icon: <IconBrain className="text-[#00ADD8]" /> },
      { name: "ChromaDB", icon: <IconDatabase className="text-[#6B4FBB]" /> },
    ],
  },
  {
    title: "Web & Backend",
    description: "Technologies for building modern web applications and robust backend services.",
    skills: [
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
      { name: "Express", icon: <SiExpress className="text-[#000000] dark:text-white" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
      { name: "Flask", icon: <SiFlask className="text-[#000000]" /> },
      { name: "Prisma", icon: <SiPrisma className="text-[#2D3748]" /> },
      { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" /> },
    ],
  },
  {
    title: "DevOps/Cloud",
    description: "Cloud platforms and tools for deployment, containerization, and infrastructure management.",
    skills: [
      { name: "AWS", icon: <SiAmazonaws className="text-[#FF9900]" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "Kubernetes", icon: <SiKubernetes className="text-[#326CE5]" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
      { name: "Jenkins", icon: <SiJenkins className="text-[#D24939]" /> },
    ],
  },
  {
    title: "Databases & Tools",
    description: "Database systems and development tools for data management and visualization.",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
      { name: "Power BI", icon: <IconChartBar className="text-[#F2C811]" /> },
      { name: "Tableau", icon: <SiTableau className="text-[#E97627]" /> },
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "Jupyter", icon: <SiJupyter className="text-[#F37626]" /> },
    ],
  },
  {
    title: "Design & Misc",
    description: "Design tools and additional technologies for comprehensive development.",
    skills: [
      { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
      { name: "Unity", icon: <SiUnity className="text-[#000000]" /> },
      { name: "Blender", icon: <SiBlender className="text-[#F5792A]" /> },
      { name: "Mux", icon: <IconVideo className="text-[#FF2D55]" /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
      { name: "Gradio", icon: <IconBrain className="text-[#FF9D00]" /> },
    ],
  },
];

const SkillIcon = ({ skill }: { skill: { name: string; icon: React.ReactNode } }) => {
  return (
    <div className="group flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors mb-2">
        <div className="text-xl">
          {skill.icon}
        </div>
      </div>
      <span className="text-xs text-center font-medium text-gray-600 dark:text-gray-300">
        {skill.name}
      </span>
    </div>
  );
};

const SkillGrid = ({ category }: { category: typeof skillCategories[0] }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative z-10">
      <Lens hovering={hovering} setHovering={setHovering} lensSize={120} zoomFactor={1.3}>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-black/20">
          {category.skills.map((skill) => (
            <SkillIcon 
              key={skill.name} 
              skill={skill}
            />
          ))}
        </div>
      </Lens>
      <motion.div
        animate={{
          filter: hovering ? "blur(2px)" : "blur(0px)",
        }}
        className="mt-6 relative z-20"
      >
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          {category.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {category.description}
        </p>
      </motion.div>
    </div>
  );
};

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="relative rounded-2xl overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6"
            >
              <SkillGrid category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}