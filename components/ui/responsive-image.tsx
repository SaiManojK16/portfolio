"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

export function ResponsiveImage({
  src,
  alt,
  className,
  priority = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 90,
  fill = false,
  width,
  height,
  loading = "eager",
}: ResponsiveImageProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        quality={quality}
        sizes={sizes}
        fill={fill}
        width={width}
        height={height}
        loading={loading}
        className={cn("object-cover", className)}
      />
    </div>
  );
} 