"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconBrandGithub,
  IconExternalLink,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandPython,
  IconBrandNodejs,
  IconDatabase,
} from "@tabler/icons-react";

const projects = [
  {
    title: "AI-Powered Course Management Platform",
    description:
      "A university learning platform with AI grading assistant and lecture analytics for real-time engagement tracking.",
    icon: <IconBrandNextjs className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/SaiManojK16/Course_Platform",
    tags: ["Next.js", "Node.js", "Prisma ORM", "GPT-4", "BERT", "Mux"],
    className: "md:col-span-2",
  },
  {
    title: "WearMe – AI Outfit Recommendation App",
    description:
      "AI-based styling assistant that recommends weather-appropriate outfits with computer vision for fabric and color matching.",
    icon: <IconBrandReact className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/SaiManojK16/se",
    tags: ["MERN Stack", "FastAPI", "TensorFlow", "Computer Vision"],
  },
  {
    title: "DocP – AI Document Parsing & Extraction",
    description:
      "Smart document parser using OCR and NLP that improved data accuracy by 20% and reduced decision-making time by 30%.",
    icon: <IconBrandPython className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/sudarshan-lab/DocP-Document-Parsing",
    tags: ["OCR", "NLP", "Data Engineering", "Python"],
  },
  {
    title: "ChoreWise – Task Automation App",
    description:
      "Mobile-first app for roommates to manage chores, track fairness, and auto-assign tasks with cron jobs. Includes real-time chat and reduced household conflict by 40%.",
    icon: <IconBrandNodejs className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/SaiManojK16/SE-DOCP",
    tags: ["MERN Stack", "Firebase", "Node.js"],
    className: "md:col-span-2",
  },
  {
    title: "Tried & Tasted – AI-Driven Meal Planner",
    description:
      "Full-stack platform to plan meals, auto-generate shopping lists, and scale recipes using AI and OCR. Personalized via SQL logic and AI assistants.",
    icon: <IconDatabase className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/SaiManojK16/Temp",
    tags: ["PHP", "MySQL", "TensorFlow", "OCR", "LangChain"],
  },
];

export default function Projects() {
  return (
    <div className="relative min-h-screen w-full py-12 flex items-center justify-center antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
            Featured Projects
          </h2>
          <p className="mt-4 text-neutral-500 max-w-lg mx-auto">
            A selection of my personal and professional projects that showcase my
            expertise in AI, web development, and software engineering.
          </p>
        </div>
        <BentoGrid>
          {projects.map((project, i) => (
            <BentoGridItem
              key={i}
              title={
                <div className="flex items-center justify-between">
                  <span>{project.title}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-400"
                    >
                      <IconBrandGithub className="h-4 w-4" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-400"
                    >
                      <IconExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              }
              description={
                <div>
                  <p className="mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              }
              icon={project.icon}
              className={project.className}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}