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

type SubMenuItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  submenu?: SubMenuItem[];
};

interface FloatingDockProps {
  items: DockItem[]
  className?: string
}

export const FloatingDock = ({
  items,
  className,
}: FloatingDockProps) => {
  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav items={items} />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <DesktopNav items={items} className={className} />
      </div>
    </>
  );
};

const MobileNav = ({ items }: { items: DockItem[] }) => {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      {/* Menu Button */}
      <div className="fixed top-4 left-4 z-[100]">
        <motion.button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-lg border border-gray-200/50 dark:border-neutral-800/50 hover:bg-gray-100/50 dark:hover:bg-neutral-800/50 active:scale-95 transition-all"
          whileTap={{ scale: 0.95 }}
        >
          <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-white dark:bg-neutral-900 p-10"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setOpen(false)}
              className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
            >
              <IconLayoutNavbarCollapse className="h-6 w-6 rotate-180" />
            </motion.button>

            {/* Navigation Links */}
            <nav className="mt-16 flex flex-col gap-2">
              {items.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === item.title ? null : item.title)}
                        className="flex w-full items-center justify-between gap-2 py-2 group/sidebar"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 text-neutral-700 dark:text-neutral-200">{item.icon}</div>
                          <span className="text-sm text-neutral-700 dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150">
                            {item.title}
                          </span>
                        </div>
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.title && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="ml-7 mt-2 flex flex-col gap-2"
                          >
                            {item.submenu.map((subitem) => (
                              <a
                                key={subitem.title}
                                href={subitem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 py-2 group/sidebar"
                                onClick={() => setOpen(false)}
                              >
                                <div className="h-5 w-5 text-neutral-700 dark:text-neutral-200">{subitem.icon}</div>
                                <span className="text-sm text-neutral-700 dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150">
                                  {subitem.title}
                                </span>
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <>
                      {item.href.startsWith('http') || item.href.startsWith('mailto:') || item.href === '#' ? (
                        <a
                          href={item.href}
                          className="flex items-center gap-2 py-2 group/sidebar"
                          onClick={() => setOpen(false)}
                        >
                          <div className="h-5 w-5 text-neutral-700 dark:text-neutral-200">{item.icon}</div>
                          <span className="text-sm text-neutral-700 dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150">
                            {item.title}
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 py-2 group/sidebar",
                            pathname === item.href && "text-black dark:text-white font-medium"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <div className="h-5 w-5 text-neutral-700 dark:text-neutral-200">{item.icon}</div>
                          <span className="text-sm text-neutral-700 dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150">
                            {item.title}
                          </span>
                        </Link>
                      )}
                    </>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DesktopNav = ({ items, className }: { items: DockItem[]; className?: string }) => {
  let mouseX = useMotionValue(Infinity);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        className={cn(
          "mx-auto h-16 flex items-end gap-4 rounded-2xl bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-lg px-4 pb-3 border border-gray-200/50 dark:border-neutral-800/50 shadow-lg",
          className
        )}
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2"
                    >
                      <div className="bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200/50 dark:border-neutral-800/50">
                        <div className="flex flex-col gap-1">
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem.title}
                              href={subitem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors whitespace-nowrap"
                            >
                              <div className="h-5 w-5">{subitem.icon}</div>
                              <span className="text-sm font-medium">{subitem.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <IconContainer mouseX={mouseX} {...item} active={pathname === item.href} />
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  active,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isExternalLink = href.startsWith('http') || href.startsWith('mailto:') || href === '#';

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let widthIcon = useSpring(widthIconTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightIcon = useSpring(heightIconTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full transition-colors",
        active ? "bg-gray-200 dark:bg-neutral-800" : "bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
        {icon}
      </motion.div>
    </motion.div>
  );

  if (isExternalLink) {
    return <a href={href}>{content}</a>;
  }

  return <Link href={href}>{content}</Link>;
} 