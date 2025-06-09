"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { IconLayoutNavbarCollapse } from "@tabler/icons-react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion"
import { useRef, useState } from "react"
import { createTransition } from "@/lib/transitions"

type SubMenuItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  submenu?: SubMenuItem[];
};

interface IconContainerProps extends DockItem {
  mouseX: MotionValue;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
  mobileClassName?: string;
}

const IconContainer = ({ mouseX, href, icon, title, onClick }: IconContainerProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40])
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square items-center justify-center"
    >
      <Link
        href={href}
        onClick={onClick}
        className="flex aspect-square h-14 items-center justify-center rounded-full bg-gray-100/90 backdrop-blur-sm dark:bg-neutral-800/90 hover:bg-gray-200/90 dark:hover:bg-neutral-700/90"
        style={{
          transition: createTransition('enterExitWithin')
        }}
      >
        <div className="h-7 w-7">{icon}</div>
      </Link>
    </motion.div>
  )
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div className={cn("fixed bottom-4 right-4 block md:hidden z-[100]", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{
              duration: 0.25,
              ease: "cubic-bezier(0.2, 0.0, 0, 1.0)"
            }}
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-4"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{
                  delay: (items.length - 1 - idx) * 0.05,
                  duration: 0.25,
                  ease: "cubic-bezier(0.2, 0.0, 0, 1.0)"
                }}
              >
                <Link
                  href={item.href}
                  onClick={item.onClick}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100/90 backdrop-blur-sm dark:bg-neutral-800/90 hover:bg-gray-200/90 dark:hover:bg-neutral-700/90"
                  style={{
                    transition: createTransition('enterExitWithin')
                  }}
                >
                  <div className="h-7 w-7">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100/90 backdrop-blur-sm dark:bg-neutral-800/90 hover:bg-gray-200/90 dark:hover:bg-neutral-700/90"
        style={{
          transition: createTransition('enterExitWithin')
        }}
      >
        <IconLayoutNavbarCollapse className="h-7 w-7 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 hidden h-20 items-end gap-6 rounded-2xl bg-gray-50/70 px-6 pb-3 md:flex dark:bg-neutral-900/70 will-change-transform shadow-lg backdrop-blur-md z-[100]",
        className
      )}
      style={{
        transition: createTransition('containerTransform')
      }}
    >
      {items.map((item) => (
        <div key={item.title} className="relative">
          {item.submenu ? (
            <div
              onMouseEnter={() => setOpenSubmenu(item.title)}
              onMouseLeave={() => setOpenSubmenu(null)}
              className="relative"
            >
              <IconContainer mouseX={mouseX} {...item} />
              <AnimatePresence>
                {openSubmenu === item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{
                      duration: 0.25,
                      ease: "cubic-bezier(0.2, 0.0, 0, 1.0)"
                    }}
                    className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2"
                  >
                    <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-2 shadow-lg dark:bg-neutral-900">
                        {item.submenu.map((subitem) => (
                        <Link
                            key={subitem.title}
                            href={subitem.href}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                          style={{
                            transition: createTransition('enterExitWithin')
                          }}
                          >
                          <div className="h-4 w-4">{subitem.icon}</div>
                          <span className="label-medium">{subitem.title}</span>
                        </Link>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <IconContainer mouseX={mouseX} {...item} />
          )}
        </div>
      ))}
    </motion.div>
  );
};

export const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  className,
  mobileClassName,
}) => {
  const mouseX = useMotionValue(Infinity)

  return (
    <>
      {/* Desktop */}
    <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 hidden h-20 items-end gap-6 rounded-2xl bg-gray-50/70 px-6 pb-3 md:flex dark:bg-neutral-900/70 will-change-transform shadow-lg backdrop-blur-md z-[100]",
          className
      )}
    >
        {items.map((item: DockItem, i: number) => (
          <IconContainer key={i} mouseX={mouseX} {...item} />
        ))}
      </motion.div>

      {/* Mobile */}
      <motion.div
        initial={false}
        className={cn("block md:hidden", mobileClassName)}
      >
          <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex h-20 items-end gap-6 rounded-2xl bg-gray-50/70 px-6 pb-3 dark:bg-neutral-900/70 will-change-transform shadow-lg backdrop-blur-md"
          layout
        >
          {items.map((item: DockItem, i: number) => (
            <Link
              key={i}
              href={item.href}
              onClick={item.onClick}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100/90 backdrop-blur-sm dark:bg-neutral-800/90 hover:bg-gray-200/90 dark:hover:bg-neutral-700/90 transition-colors"
          >
              <div className="h-7 w-7">{item.icon}</div>
            </Link>
          ))}
          </motion.div>
      </motion.div>
    </>
  )
} 