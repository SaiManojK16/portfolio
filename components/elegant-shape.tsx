import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BackgroundShapeProps {
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
  className?: string
}

export function BackgroundShape({
  delay = 0,
  width = 200,
  height = 200,
  rotate = 0,
  gradient = "from-primary/20",
  className,
}: BackgroundShapeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay,
        ease: "easeOut",
      }}
      style={{
        width,
        height,
        rotate,
      }}
      className={cn(
        "absolute bg-gradient-to-br",
        gradient,
        "rounded-full blur-3xl",
        className
      )}
    />
  )
} 