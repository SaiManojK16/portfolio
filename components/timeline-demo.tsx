"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";

export function TimelineDemo() {
  const data = [
    {
      title: "2025-Present",
      content: (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold">
                Full Stack Web & Mobile Developer
              </h4>
              <p className="text-muted-foreground">MARVLS, LLC @ Siena College</p>
            </div>
            <Badge variant="outline" className="w-fit">Remote</Badge>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="text-sm md:text-base">
              • Spearheading the end-to-end development of an interactive AR-based educational platform
            </p>
            <p className="text-sm md:text-base">
              • Designing and deploying a full-stack website from scratch to showcase and support AR learning experiences
            </p>
            <p className="text-sm md:text-base">
              • Building mobile applications using Flutter for both iOS and Android, integrating real-time AR models
            </p>
            <p className="text-sm md:text-base">
              • Developing and optimizing 3D AR experiences using Unity for interactive STEM visualizations
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2024-2025",
      content: (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold">
                Data Structures Grader
              </h4>
              <p className="text-muted-foreground">SUNY Albany</p>
            </div>
            <Badge variant="outline" className="w-fit">Albany, NY</Badge>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="text-sm md:text-base">
              • Evaluated weekly programming submissions for 50+ undergraduates with 99% accuracy
            </p>
            <p className="text-sm md:text-base">
              • Automated grading using Python, reducing manual effort by 40%
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold">
                Machine Learning Intern
              </h4>
              <p className="text-muted-foreground">Phoenix Global</p>
            </div>
            <Badge variant="outline" className="w-fit">Remote</Badge>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="text-sm md:text-base">
              • Trained CNNs in TensorFlow to classify medical CT images, improving accuracy by 15%
            </p>
            <p className="text-sm md:text-base">
              • Collaborated with data scientists and healthcare experts, validating model reliability on 5,000 clinical samples
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2019-2022",
      content: (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold">
                Computer Graphics Lab Assistant
              </h4>
              <p className="text-muted-foreground">GITAM University</p>
            </div>
            <Badge variant="outline" className="w-fit">India</Badge>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="text-sm md:text-base">
              • Supported 10+ OpenGL projects, managing lab setups for 50+ students
            </p>
            <p className="text-sm md:text-base">
              • Mentored students on graphics projects, improving success rates by 25%
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
} 