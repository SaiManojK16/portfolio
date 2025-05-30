"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { IconLayoutNavbarCollapse } from "@tabler/icons-react"
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
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
  desktopClassName?: string
  mobileClassName?: string
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
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
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.submenu ? (
                  <div className="relative">
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.title ? null : item.title)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                    >
                      <div className="h-4 w-4">{item.icon}</div>
                    </button>
                    <AnimatePresence>
                      {openSubmenu === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 z-50"
                          style={{ 
                            width: 'max-content',
                            marginLeft: '-4px'
                          }}
                        >
                          <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-neutral-800">
                            <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2 text-center">
                              Socials
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                              {item.submenu.map((subitem) => (
                                <a
                                  key={subitem.title}
                                  href={subitem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                                >
                                  <div className="h-4 w-4">{subitem.icon}</div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    {item.href.startsWith('http') || item.href.startsWith('mailto:') || item.href === '#' ? (
                      <a
                        href={item.href}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                      >
                        <div className="h-4 w-4">{item.icon}</div>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                      >
                        <div className="h-4 w-4">{item.icon}</div>
                      </Link>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
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
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-3xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  submenu,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  submenu?: SubMenuItem[];
}) {
  let ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const isExternalLink = href.startsWith('http') || href.startsWith('mailto:') || href === '#';

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  if (submenu) {
    return (
      <div className="relative">
        <motion.div
          ref={ref}
          style={{ width, height }}
          onMouseEnter={() => {
            setOpenSubmenu(true);
          }}
          onMouseLeave={() => {
            setOpenSubmenu(false);
          }}
          className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
        >
          <motion.div
            style={{ width: widthIcon, height: heightIcon }}
            className="flex items-center justify-center"
          >
            {icon}
          </motion.div>
          <AnimatePresence>
            {openSubmenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 z-50"
                style={{ 
                  width: 'max-content',
                  marginLeft: '-4px'
                }}
              >
                <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-neutral-800">
                  <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2 text-center">
                    Socials
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    {submenu.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors relative"
                        title={item.title}
                      >
                        <div className="h-5 w-5">{item.icon}</div>
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.title}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
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
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (isExternalLink) {
    return <a href={href}>{content}</a>;
  }

  return <Link href={href}>{content}</Link>;
} 