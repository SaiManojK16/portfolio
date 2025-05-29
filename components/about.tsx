import { Card, CardContent } from "@/components/ui/card"
import {
  FaPython,
  FaJava,
  FaNode,
  FaAws,
  FaDocker,
  FaGit,
  FaUnity,
  FaDatabase,
  FaChartBar,
  FaReact,
} from "react-icons/fa"
import {
  SiJavascript,
  SiC,
  SiTensorflow,
  SiOpencv,
  SiScikitlearn,
  SiLangchain,
  SiHuggingface,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiTableau,
  SiJupyter,
  SiFigma,
  SiBlender,
  SiPostman,
  SiPrisma,
  SiFastapi,
  SiFlask,
  SiKubernetes,
  SiMui,
  SiChakraui,
  SiVuedotjs,
  SiD3Dotjs,
  SiThreedotjs,
  SiFlutter,
  SiExpress,
  SiSpring,
  SiDjango,
} from "react-icons/si"
import { TbBrandMantine } from "react-icons/tb"
import { BiLogoMongodb } from "react-icons/bi"
import { Lens } from "@/components/lens"
import React from "react"

export default function About() {
  const skillGroups = [
    {
      title: "Languages",
      skills: [
        { icon: <FaJava className="h-8 w-8" color="#007396" />, name: "Java" },
        { icon: <FaPython className="h-8 w-8" color="#3776AB" />, name: "Python" },
        { icon: <SiC className="h-8 w-8" color="#A8B9CC" />, name: "C" },
        { icon: <SiJavascript className="h-8 w-8" color="#F7DF1E" />, name: "JavaScript" },
        { icon: <SiMui className="h-8 w-8" color="#007FFF" />, name: "TypeScript" },
        { icon: <FaDatabase className="h-8 w-8" color="#4DB33D" />, name: "SQL" },
      ],
    },
    {
      title: "Framework",
      skills: [
        { icon: <SiMui className="h-8 w-8" color="#007FFF" />, name: "Next.js" },
        { icon: <FaReact className="h-8 w-8" color="#61DAFB" />, name: "React.js" },
        { icon: <SiVuedotjs className="h-8 w-8" color="#42B883" />, name: "Vue.js" },
        { icon: <SiD3Dotjs className="h-8 w-8" color="#F9A03C" />, name: "D3.js" },
        { icon: <SiThreedotjs className="h-8 w-8" color="#000000" />, name: "Three.js" },
        { icon: <SiFlutter className="h-8 w-8" color="#02569B" />, name: "Flutter" },
      ],
    },
    {
      title: "Backend Technologies",
      skills: [
        { icon: <FaNode className="h-8 w-8" color="#339933" />, name: "Node.js" },
        { icon: <SiExpress className="h-8 w-8" color="#000000" />, name: "Express.js" },
        { icon: <FaChartBar className="h-8 w-8" color="#007FFF" />, name: "Rest API" },
        { icon: <SiSpring className="h-8 w-8" color="#6DB33F" />, name: "Spring Boot" },
        { icon: <SiDjango className="h-8 w-8" color="#092E20" />, name: "Django" },
      ],
    },
    {
      title: "AI/ML",
      skills: [
        { icon: <SiTensorflow className="h-8 w-8" color="#FF6F00" />, name: "TensorFlow" },
        { icon: <SiHuggingface className="h-8 w-8" color="#FFCA00" />, name: "Hugging Face" },
        { icon: <SiOpencv className="h-8 w-8" color="#5C3EE8" />, name: "OpenCV" },
        { icon: <SiScikitlearn className="h-8 w-8" color="#F7931E" />, name: "Scikit-learn" },
        { icon: <SiLangchain className="h-8 w-8" color="#00B16F" />, name: "LangChain" },
        { icon: <FaDatabase className="h-8 w-8" color="#1A1A1A" />, name: "ChromaDB" },
        { icon: <FaChartBar className="h-8 w-8" color="#1A1A1A" />, name: "FAISS" },
      ],
    },
    {
      title: "Web & Backend",
      skills: [
        { icon: <SiMui className="h-8 w-8" color="#007FFF" />, name: "MERN Stack" },
        { icon: <SiFastapi className="h-8 w-8" color="#009688" />, name: "FastAPI" },
        { icon: <SiFlask className="h-8 w-8" color="#000000" />, name: "Flask" },
        { icon: <FaNode className="h-8 w-8" color="#339933" />, name: "Node.js" },
        { icon: <SiPrisma className="h-8 w-8" color="#2D3748" />, name: "Prisma ORM" },
      ],
    },
    {
      title: "DevOps/Cloud",
      skills: [
        { icon: <FaAws className="h-8 w-8" color="#FF9900" />, name: "AWS" },
        { icon: <FaDocker className="h-8 w-8" color="#2496ED" />, name: "Docker" },
        { icon: <SiKubernetes className="h-8 w-8" color="#326CE5" />, name: "Kubernetes" },
        { icon: <TbBrandMantine className="h-8 w-8" color="#339AF0" />, name: "CI/CD" },
        { icon: <FaGit className="h-8 w-8" color="#F05032" />, name: "Git" },
      ],
    },
    {
      title: "Databases & Tools",
      skills: [
        { icon: <SiPostgresql className="h-8 w-8" color="#336791" />, name: "PostgreSQL" },
        { icon: <SiMongodb className="h-8 w-8" color="#47A248" />, name: "MongoDB" },
        { icon: <SiMysql className="h-8 w-8" color="#4479A1" />, name: "MySQL" },
        { icon: <SiRedis className="h-8 w-8" color="#DC382D" />, name: "Redis" },
        { icon: <FaChartBar className="h-8 w-8" color="#F2C811" />, name: "Power BI" },
        { icon: <SiTableau className="h-8 w-8" color="#E97627" />, name: "Tableau" },
        { icon: <FaGit className="h-8 w-8" color="#F05032" />, name: "Git" },
        { icon: <SiJupyter className="h-8 w-8" color="#F37626" />, name: "Jupyter" },
      ],
    },
    {
      title: "Design & Misc",
      skills: [
        { icon: <SiFigma className="h-8 w-8" color="#F24E1E" />, name: "Figma" },
        { icon: <FaUnity className="h-8 w-8" color="#222C37" />, name: "Unity" },
        { icon: <SiBlender className="h-8 w-8" color="#F5792A" />, name: "Blender" },
        { icon: <FaChartBar className="h-8 w-8" color="#FF6F00" />, name: "Mux" },
        { icon: <SiPostman className="h-8 w-8" color="#FF6C37" />, name: "Postman" },
        { icon: <FaChartBar className="h-8 w-8" color="#00C4B4" />, name: "Gradio" },
      ],
    },
  ]

  return (
    <div className="w-full mt-12">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Skills</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A comprehensive overview of my technical expertise and tools I work with.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {skillGroups.map((group, index) => (
                <Lens key={index} zoomFactor={1.3} lensSize={130}>
                  <Card className="flex flex-col items-center p-6 bg-white/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-neutral-700 shadow-md animate-in">
                    <h3 className="text-lg font-bold mb-3 text-center">{group.title}</h3>
                    <div className="w-full flex flex-col items-center">
                      <div className="w-full flex flex-wrap justify-center gap-6">
                        {group.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="flex flex-col items-center"
                          >
                            <div className="bg-white dark:bg-zinc-900 shadow-md rounded-full p-4 mb-2 flex items-center justify-center border border-gray-200 dark:border-neutral-700">
                              {React.cloneElement(skill.icon, { className: 'h-6 w-6' })}
                            </div>
                            <span className="text-xs text-center font-medium text-muted-foreground">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Lens>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
