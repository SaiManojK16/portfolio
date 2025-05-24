import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "AI-Powered Course Management Platform",
      description:
        "A university learning platform with AI grading assistant and lecture analytics for real-time engagement tracking.",
      image: "/placeholder.svg?height=200&width=400&text=Course+Management+Platform",
      tags: ["Next.js", "Node.js", "Prisma ORM", "GPT-4", "BERT", "Mux"],
      link: "https://course-management-demo.vercel.app",
    },
    {
      title: "WearMe – AI Outfit Recommendation App",
      description:
        "AI-based styling assistant that recommends weather-appropriate outfits with computer vision for fabric and color matching.",
      image: "/placeholder.svg?height=200&width=400&text=WearMe+App",
      tags: ["MERN Stack", "FastAPI", "TensorFlow", "Computer Vision"],
      link: "https://wearme-demo.vercel.app",
    },
    {
      title: "DocP – AI Document Parsing & Extraction",
      description:
        "Smart document parser using OCR and NLP that improved data accuracy by 20% and reduced decision-making time by 30%.",
      image: "/placeholder.svg?height=200&width=400&text=DocP+Parser",
      tags: ["OCR", "NLP", "Data Engineering", "Python"],
      link: "https://github.com/saimanojkartala/docp",
    },
    {
      title: "ChoreWise – Task Automation App for Shared Living",
      description:
        "Mobile-first app for roommates to manage chores, track fairness, and auto-assign tasks with cron jobs. Includes real-time chat and reduced household conflict by 40%.",
      image: "/placeholder.svg?height=200&width=400&text=ChoreWise",
      tags: ["MERN Stack", "Firebase", "Node.js"],
      link: "https://github.com/saimanojkartala/chorewise",
    },
    {
      title: "Tried & Tasted – AI-Driven Meal Planner",
      description:
        "Full-stack platform to plan meals, auto-generate shopping lists, and scale recipes using AI and OCR. Personalized via SQL logic and AI assistants.",
      image: "/placeholder.svg?height=200&width=400&text=Tried+%26+Tasted",
      tags: ["PHP", "MySQL", "TensorFlow", "OCR", "LangChain"],
      link: "https://github.com/saimanojkartala/tried-and-tasted",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my personal and professional projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card block transition-transform hover:scale-[1.01]"
              >
                <Card className="overflow-hidden h-full flex flex-col cursor-pointer">
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="project-content flex-1 flex flex-col p-5">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 flex-1">{project.description}</p>
                    <div className="project-tags mt-3 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}