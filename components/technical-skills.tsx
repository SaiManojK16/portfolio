"use client";

import React, { useState } from "react";
import {
  SiPython,
  SiJavascript,
  SiC,
  SiMysql,
  SiTensorflow,
  SiOpencv,
  SiScikitlearn,
  SiReact,
  SiFlask,
  SiNodedotjs,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiPostgresql,
  SiMongodb,
  SiTableau,
  SiGit,
  SiFigma,
  SiUnity,
  SiBlender,
  SiPostman,
  SiFlutter,
  SiExpress,
  SiSelenium,
  SiGithub,
  SiNextdotjs,
} from "react-icons/si";
import { FaDatabase, FaJava, FaAws, FaPowerOff, FaGraduationCap, FaRobot } from "react-icons/fa";
import { BsDatabaseFillGear } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

interface SkillGroup {
  title: string;
  description: string;
  skills: {
    icon: React.ReactNode;
    name: string;
    color?: string;
  }[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    description: "Core programming languages that form the foundation of my software development expertise.",
    skills: [
      { icon: <SiPython size={32} />, name: "Python", color: "#4B8BBE" },
      { icon: <SiJavascript size={32} />, name: "JavaScript", color: "#f7df1e" },
      { icon: <FaJava size={32} />, name: "Java", color: "#f89820" },
      { icon: <SiC size={32} />, name: "C", color: "#283593" },
      { icon: <FaDatabase size={32} />, name: "SQL", color: "#00758F" },
    ],
  },
  {
    title: "AI & Machine Learning",
    description: "Advanced tools and frameworks for implementing artificial intelligence and machine learning solutions.",
    skills: [
      { icon: <SiTensorflow size={32} />, name: "TensorFlow", color: "#FF6F00" },
      { icon: <FaRobot size={32} />, name: "Hugging Face", color: "#FFD21E" },
      { icon: <SiOpencv size={32} />, name: "OpenCV", color: "#5C3EE8" },
      { icon: <SiScikitlearn size={32} />, name: "Scikit-learn", color: "#F7931E" },
      { icon: <BsDatabaseFillGear size={32} />, name: "LangChain", color: "#65E3B0" },
    ],
  },
  {
    title: "Frameworks and Backend",
    description: "Modern frameworks and backend technologies for building scalable web and mobile applications.",
    skills: [
      { icon: <SiReact size={32} />, name: "React", color: "#61DAFB" },
      { icon: <SiNextdotjs size={32} />, name: "Next.js", color: "#ffffff" },
      { icon: <SiFlutter size={32} />, name: "Flutter", color: "#02569B" },
      { icon: <SiNodedotjs size={32} />, name: "Node.js", color: "#339933" },
      { icon: <SiExpress size={32} />, name: "Express.js", color: "#808080" },
      { icon: <SiFlask size={32} />, name: "Flask", color: "#ffffff" },
    ],
  },
  {
    title: "DevOps & Cloud",
    description: "Cloud infrastructure and DevOps tools for deploying and managing scalable applications.",
    skills: [
      { icon: <FaAws size={32} />, name: "AWS", color: "#FF9900" },
      { icon: <SiDocker size={32} />, name: "Docker", color: "#2496ED" },
      { icon: <SiKubernetes size={32} />, name: "Kubernetes", color: "#326CE5" },
      { icon: <SiGithubactions size={32} />, name: "CI/CD", color: "#2088FF" },
    ],
  },
  {
    title: "Databases & Tools",
    description: "Database management systems and development tools for efficient data handling and analysis.",
    skills: [
      { icon: <SiPostgresql size={32} />, name: "PostgreSQL", color: "#336791" },
      { icon: <SiMongodb size={32} />, name: "MongoDB", color: "#47A248" },
      { icon: <SiMysql size={32} />, name: "MySQL", color: "#4479A1" },
      { icon: <SiTableau size={32} />, name: "Tableau", color: "#E97627" },
      { icon: <SiGit size={32} />, name: "Git", color: "#F05032" },
    ],
  },
  {
    title: "IT & Design and Testing",
    description: "Design tools, testing frameworks, and IT infrastructure solutions for comprehensive software development.",
    skills: [
      { icon: <SiFigma size={32} />, name: "Figma", color: "#F24E1E" },
      { icon: <SiUnity size={32} />, name: "Unity", color: "#ffffff" },
      { icon: <SiBlender size={32} />, name: "Blender", color: "#F5792A" },
      { icon: <SiPostman size={32} />, name: "Postman", color: "#FF6C37" },
      { icon: <SiSelenium size={32} />, name: "Selenium", color: "#43B02A" },
      { icon: <SiGithub size={32} />, name: "GitHub", color: "#6e7681" },
    ],
  },
];

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  hovering: boolean;
  setHovering: React.Dispatch<React.SetStateAction<boolean>>;
}

const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.25,
  lensSize = 150,
  isStatic = false,
  hovering,
  setHovering,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillCard = ({ group }: { group: SkillGroup }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative rounded-3xl bg-white/80 dark:bg-[#0F0F0F]/50 p-8 overflow-hidden backdrop-blur-sm border border-gray-200 dark:border-[#2A2A2A] transition-colors duration-300 h-[460px]">
      <Lens zoomFactor={1.25} lensSize={150} hovering={isHovering} setHovering={setIsHovering}>
        <div className="relative rounded-2xl border border-gray-200 dark:border-[#2A2A2A]/70 p-7 bg-gray-50/50 dark:bg-[#1A1A1A]/50">
          <div className="grid grid-cols-3 gap-4">
            {group.skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center group aspect-square p-2"
              >
                <div
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1A1A1A] flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg dark:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-gray-200 dark:border-[#2A2A2A]/50"
                  style={{
                    color: skill.color || '#fff',
                  }}
                >
                  {skill.icon}
                </div>
                <span className="text-xs text-gray-700 dark:text-white/70 text-center group-hover:text-gray-900 dark:group-hover:text-white/90 transition-colors duration-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Lens>
      <motion.div
        animate={{
          filter: isHovering ? "blur(2px)" : "blur(0px)",
        }}
        className="mt-8 space-y-3"
      >
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white/90">{group.title}</h3>
        <p className="text-sm text-gray-600 dark:text-white/60 line-clamp-3">{group.description}</p>
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100/50 dark:from-[#2A2A2A]/10 to-transparent pointer-events-none" />
    </div>
  );
};

const TechnicalSkills = () => {
  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white/90 text-center mb-4">
          Technical Skills
        </h2>
        <p className="text-gray-600 dark:text-white/60 text-center max-w-3xl mx-auto mb-16">
          A comprehensive overview of my technical expertise across various domains of software development.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => (
            <SkillCard key={index} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills; 