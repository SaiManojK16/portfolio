"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";

export function TimelineDemo() {
  const data = [
    {
      title: "2024-2025",
      content: (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold">
                Augmented Reality Research Assistant
              </h4>
              <p className="text-muted-foreground">Siena College</p>
            </div>
            <Badge variant="outline" className="w-fit">Remote</Badge>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="text-sm md:text-base">
              • Built Unity-based AR application for STEM visualization, improving student comprehension by 35%
            </p>
            <p className="text-sm md:text-base">
              • Developed and launched the outreach website, increasing visitor engagement by 60%
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
              • Optimized processing pipeline for 10K+ images/month, reducing false positives
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
              • Conducted 50+ OpenGL workshops, improving lab outcomes by 25%
            </p>
            <p className="text-sm md:text-base">
              • Authored documentation and resolved 30% of recurring student issues
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