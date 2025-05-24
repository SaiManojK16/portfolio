"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-3 md:pt-6 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-24 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 absolute left-3 md:left-3 w-8 rounded-full flex items-center justify-center shadow-sm border border-border">
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-16 md:text-3xl font-bold text-foreground">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-2 text-left font-bold text-foreground">
                {item.title}
              </h3>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "rounded-lg p-4 border border-border shadow-sm",
                  "hover:shadow-md transition-all duration-300",
                  "dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80",
                  index === data.length - 1 ? "mb-0" : "mb-4"
                )}
              >
                {item.content}
              </motion.div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-6 left-6 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border dark:via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-primary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}; 