"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[24rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col space-y-4 rounded-xl border border-neutral-200 bg-white p-6 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      <div className="flex-1 space-y-4">
        {header && (
          <div className="h-32 w-full overflow-hidden rounded-xl">
            {header}
          </div>
        )}
        <div className="transition duration-200 group-hover/bento:translate-x-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              {icon && (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                  {icon}
                </span>
              )}
              <h3 className="font-sans font-bold text-lg text-neutral-800 dark:text-neutral-200 line-clamp-1">
                {title}
              </h3>
            </div>
          </div>
          <div className="mt-4 font-sans text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}; 