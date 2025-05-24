import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Skills() {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["Python", "JavaScript", "Java", "C", "SQL"],
    },
    {
      category: "AI/ML",
      skills: ["TensorFlow", "Hugging Face", "OpenCV", "LangChain", "FAISS", "ChromaDB"],
    },
    {
      category: "Full-Stack",
      skills: ["MERN Stack", "FastAPI", "Flask", "Node.js", "Prisma ORM"],
    },
    {
      category: "Cloud/DevOps",
      skills: ["AWS (Lambda, SageMaker, EC2, S3, RDS)", "Docker", "Kubernetes", "CI/CD Pipelines"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Snowflake", "Redis", "Power BI", "Tableau"],
    },
    {
      category: "UI/UX & Tools",
      skills: ["Figma", "Wireframing", "Gradio", "Unity", "Blender", "Git", "GitHub Actions"],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My technical expertise and proficiencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-card">
                <Card className="h-full border-t-4 border-t-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}