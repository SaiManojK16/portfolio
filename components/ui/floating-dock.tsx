"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { IconLayoutNavbarCollapse } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

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
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div className={className}>
      {/* Menu Button */}
      <div className="fixed top-4 left-4 z-[100]">
        <motion.button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-lg border border-gray-200/50 dark:border-neutral-800/50 hover:bg-gray-100/50 dark:hover:bg-neutral-800/50 active:scale-95 transition-all shadow-sm"
          whileTap={{ scale: 0.95 }}
        >
          <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
        </motion.button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-gray-50/95 dark:bg-neutral-900/95 backdrop-blur-lg border-r border-gray-200/50 dark:border-neutral-800/50 overflow-y-auto shadow-xl"
            >
              <nav className="flex flex-col p-4 gap-2 mt-16">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {item.submenu ? (
                      <div className="relative">
                        <button
                          onClick={() => setOpenSubmenu(openSubmenu === item.title ? null : item.title)}
                          className="flex w-full items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-5 w-5">{item.icon}</div>
                            <span className="text-base font-medium">{item.title}</span>
                          </div>
                        </button>
                        <AnimatePresence>
                          {openSubmenu === item.title && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-1 ml-4 border-l-2 border-gray-200 dark:border-neutral-800"
                            >
                              {item.submenu.map((subitem) => (
                                <a
                                  key={subitem.title}
                                  href={subitem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg ml-2 transition-colors"
                                  onClick={() => setOpen(false)}
                                >
                                  <div className="h-4 w-4">{subitem.icon}</div>
                                  <span className="text-base">{subitem.title}</span>
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
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            <div className="h-5 w-5">{item.icon}</div>
                            <span className="text-base font-medium">{item.title}</span>
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors",
                              pathname === item.href && "bg-gray-100 dark:bg-neutral-800"
                            )}
                            onClick={() => setOpen(false)}
                          >
                            <div className="h-5 w-5">{item.icon}</div>
                            <span className="text-base font-medium">{item.title}</span>
                          </Link>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 