"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconMail, IconMessage, IconPhoto, IconX, IconMenu2 } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    {
      name: "Contact",
      href: "#contact",
      id: "contact",
      icon: <IconMail className="h-6 w-6" />
    },
    {
      name: "About",
      href: "#about",
      id: "about",
      icon: <IconMessage className="h-6 w-6" />
    },
    {
      name: "Projects",
      href: "#projects",
      id: "projects",
      icon: <IconPhoto className="h-6 w-6" />
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => scrollToSection(e, item.id)}
          className={cn(
              "label-large transition-colors hover:text-foreground/80",
            pathname === item.href
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {item.name}
        </a>
      ))}
    </nav>

      {/* Mobile Navigation */}
      <div className="fixed right-4 bottom-20 z-[100] flex flex-col gap-4 md:hidden">
        <AnimatePresence>
          {isOpen && (
            <>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.id)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] dark:bg-black dark:text-white dark:shadow-[0_2px_4px_0_rgba(255,255,255,0.1)] dark:hover:shadow-[0_4px_8px_0_rgba(255,255,255,0.15)] transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                >
                  {item.icon}
                </motion.a>
              ))}
            </>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_3px_6px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_12px_0_rgba(0,0,0,0.3)] dark:shadow-[0_3px_6px_0_rgba(255,255,255,0.15)] dark:hover:shadow-[0_6px_12px_0_rgba(255,255,255,0.2)] transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
          animate={{ 
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <IconX className="h-6 w-6" />
          ) : (
            <IconMenu2 className="h-6 w-6" />
          )}
        </motion.button>
      </div>
    </>
  );
} 