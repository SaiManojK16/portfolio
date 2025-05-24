import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export default function Education() {
  const education = [
    {
      degree: "M.S. in Computer Science",
      institution: "SUNY Albany",
      location: "Albany, NY",
      year: "2024-2025",
      gpa: "3.4",
      courses: ["AI", "ML", "OS", "Data Structures", "Databases", "Software Engineering"],
    },
    {
      degree: "B.Tech in Computer Science",
      institution: "GITAM University",
      location: "India",
      year: "2019-2023",
      gpa: "3.65",
      courses: ["Data Structures", "Algorithms", "Computer Graphics", "Database Systems", "Web Development"],
    },
  ]

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and qualifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-primary/10 p-6 flex items-center gap-4">
                    <div className="bg-primary/20 p-3 rounded-full">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-muted-foreground">
                        {edu.institution}, {edu.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-sm font-medium">{edu.year}</span>
                      <span className="text-sm font-medium">GPA: {edu.gpa}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Relevant Courses:</h4>
                      <div className="flex flex-wrap gap-1">
                        {edu.courses.map((course, i) => (
                          <span
                            key={i}
                            className="text-xs bg-secondary px-2 py-1 rounded-full text-secondary-foreground"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
