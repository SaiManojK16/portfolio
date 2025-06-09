"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconChevronUp } from "@tabler/icons-react";

interface FloatingActionButtonProps {
  className?: string;
  scrollThreshold?: number;
}

export function FloatingActionButton({
  className,
  scrollThreshold = 300,
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-20 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 touch-target mobile-hover md:hidden",
            className
          )}
          aria-label="Scroll to top"
        >
          <IconChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
} 