import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const experiences = [
    {
      title: "Augmented Reality Research Assistant",
      company: "Siena College",
      period: "Apr 2025 – Present",
      location: "Remote",
      achievements: [
        "Assisting Dr. Michele McColgan in developing AR applications to visualize 2D physics concepts in 3D space using Unity and Blender",
        "Built the startup's website and developed a Unity-based mobile app with custom 3D models for interactive STEM learning modules",
      ],
    },
    {
      title: "Data Structures Grader",
      company: "SUNY Albany",
      period: "Sep 2024 – Present",
      location: "Albany, NY",
      achievements: [
        "Evaluated assignments for 50+ students weekly, ensuring 99% grading accuracy",
        "Automated grading workflows using Python, reducing manual effort by 10+ hrs/month",
      ],
    },
    {
      title: "Machine Learning Intern",
      company: "Phoenix Global",
      period: "Jun 2021 – Aug 2021",
      location: "Remote",
      achievements: [
        "Developed TensorFlow CNN models, improving accuracy by 15% for large datasets",
        "Designed scalable AI pipelines, processing 10K+ clinical samples monthly",
        "Reduced false-positive rates in healthcare AI predictions by 20%",
      ],
    },
    {
      title: "Lab Assistant, Computer Graphics",
      company: "GITAM University",
      period: "Jan 2020 – Jun 2021",
      location: "India",
      achievements: [
        "Led 50+ lab sessions on OpenGL-based interactive computing and 3D rendering",
        "Provided technical mentorship, increasing student project success rates by 25%",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My professional journey and key accomplishments
            </p>
          </div>

          <div className="space-y-8 mt-12">
            {experiences.map((experience, index) => (
              <div key={index} className="timeline-item">
                <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{experience.title}</h3>
                        <p className="text-muted-foreground">{experience.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                        <Badge variant="outline" className="mb-1 md:mb-0">
                          {experience.period}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{experience.location}</span>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
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
