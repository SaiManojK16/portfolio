"use client";

import React, { useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";

export function TimelineDemo() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const RoleCard = ({ 
    title, 
    company, 
    period,
    roleId,
    children 
  }: { 
    title: string; 
    company: string;
    period: string;
    roleId: string;
    children: React.ReactNode;
  }) => (
    <motion.div
      initial={false}
      animate={{ height: expandedRole === roleId ? "auto" : "auto" }}
      className="rounded-lg bg-card hover:bg-accent/5 transition-colors duration-200"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {title}
              </h3>
              <span className="text-sm text-muted-foreground">{period}</span>
            </div>
            <p className="text-sm font-medium text-primary">{company}</p>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: expandedRole === roleId ? 1 : 0.9,
            y: expandedRole === roleId ? 0 : 0
          }}
          className="mt-4"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );

  const data = [
    {
      title: "2025",
      content: (
        <div className="space-y-4">
          <RoleCard 
            title="Full Stack Web & Mobile Developer"
            company="MARVLS, LLC @ Siena College"
            period="May 2025 – Present"
            roleId="marvls"
          >
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Spearheading the end-to-end development of an interactive AR-based educational platform as part of the MARVLS research initiative</p>
              <p>• Designing and deploying a full-stack website from scratch to showcase and support AR learning experiences</p>
              <p>• Building mobile applications using Flutter for both iOS and Android, integrating real-time AR models with educational content</p>
              <p>• Developing and optimizing 3D AR experiences using Unity for interactive STEM visualizations</p>
            </div>
          </RoleCard>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="space-y-4">
          <RoleCard 
            title="Data Structures Grader"
            company="SUNY Albany"
            period="Sep 2024 – May 2025"
            roleId="grader"
          >
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Evaluated weekly programming submissions for 50+ undergraduates with 99% accuracy</p>
              <p>• Automated grading using Python, reducing manual effort by 40%</p>
            </div>
          </RoleCard>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="space-y-4">
          <RoleCard 
            title="Machine Learning Intern"
            company="Phoenix Global"
            period="May 2022 – Jul 2022"
            roleId="phoenix"
          >
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Trained CNNs in TensorFlow to classify medical CT images, improving accuracy by 15%</p>
              <p>• Collaborated with data scientists and healthcare experts, validating model reliability on 5,000 clinical samples</p>
            </div>
          </RoleCard>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div className="space-y-4">
          <RoleCard 
            title="Computer Graphics Lab Assistant"
            company="GITAM University"
            period="Dec 2019 – Apr 2022"
            roleId="lab_assistant"
          >
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Supported 10+ OpenGL projects, managing lab setups for 50+ students</p>
              <p>• Mentored students on graphics projects, improving success rates by 25%</p>
            </div>
          </RoleCard>
        </div>
      ),
    }
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
} 