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
              • Assisting Dr. Michele McColgan in developing AR applications to visualize 2D physics concepts in 3D space using Unity and Blender
            </p>
            <p className="text-sm md:text-base">
              • Built the startup's website and developed a Unity-based mobile app with custom 3D models for interactive STEM learning modules
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
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
              • Evaluated assignments for 50+ students weekly, ensuring 99% grading accuracy
            </p>
            <p className="text-sm md:text-base">
              • Automated grading workflows using Python, reducing manual effort by 10+ hrs/month
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2021",
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
              • Developed TensorFlow CNN models, improving accuracy by 15% for large datasets
            </p>
            <p className="text-sm md:text-base">
              • Designed scalable AI pipelines, processing 10K+ clinical samples monthly
            </p>
            <p className="text-sm md:text-base">
              • Reduced false-positive rates in healthcare AI predictions by 20%
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2020-2021",
      content: (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold">
                Lab Assistant, Computer Graphics
              </h4>
              <p className="text-muted-foreground">GITAM University</p>
            </div>
            <Badge variant="outline" className="w-fit">India</Badge>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="text-sm md:text-base">
              • Led 50+ lab sessions on OpenGL-based interactive computing and 3D rendering
            </p>
            <p className="text-sm md:text-base">
              • Provided technical mentorship, increasing student project success rates by 25%
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