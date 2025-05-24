import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, Layers, Sparkles } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI & Machine Learning",
      description: "Expertise in TensorFlow, Hugging Face, OpenCV, LangChain, and computer vision technologies",
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Full Stack Development",
      description: "Proficient with MERN Stack, FastAPI, Flask, Node.js, and Prisma ORM",
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Cloud & DevOps",
      description: "Experience with AWS services, Docker, Kubernetes, and CI/CD pipelines",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "AR/VR Development",
      description: "Building immersive experiences with Unity, Blender, and 3D modeling",
    },
  ]

  return (
    <div className="w-full bg-muted/30">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Versatile AI & Full-Stack Developer with hands-on experience in building scalable web platforms and
                deploying end-to-end machine learning solutions.
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                I specialize in integrating NLP, computer vision, and AR technologies across education, healthcare, and
                productivity domains. With a proven track record of automating workflows and reducing decision-making
                time by 30%, I'm passionate about transforming real-world problems into intuitive, user-driven
                applications. Currently based in Albany, NY, I'm always open to new challenges and collaborations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="animate-in">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
