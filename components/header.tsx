"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { FloatingDock } from "./ui/floating-dock"
import Link from "next/link"
import {
  IconHome,
  IconUser,
  IconDeviceDesktop,
  IconSchool,
  IconMail,
  IconFileText,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconWorld,
} from "@tabler/icons-react"

const navItems = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-foreground/80" />,
    href: "/",
  },
  {
    title: "About",
    icon: <IconUser className="h-full w-full text-foreground/80" />,
    href: "/about",
  },
  {
    title: "Projects",
    icon: <IconDeviceDesktop className="h-full w-full text-foreground/80" />,
    href: "/projects",
  },
  {
    title: "Resume",
    icon: <IconFileText className="h-full w-full text-foreground/80" />,
    href: "/resume.pdf",
  },
  {
    title: "Education",
    icon: <IconSchool className="h-full w-full text-foreground/80" />,
    href: "/education",
  },
  {
    title: "Contact",
    icon: <IconMail className="h-full w-full text-foreground/80" />,
    href: "/contact",
  },
  {
    title: "Socials",
    icon: <IconWorld className="h-full w-full text-foreground/80" />,
    href: "#",
    submenu: [
      {
        title: "GitHub",
        icon: <IconBrandGithub className="h-full w-full text-foreground/80" />,
        href: "https://github.com/SaiManojK16",
      },
      {
        title: "LinkedIn",
        icon: <IconBrandLinkedin className="h-full w-full text-foreground/80" />,
        href: "https://www.linkedin.com/in/sai-manoj-kartala-592ab9239/",
      },
      {
        title: "Instagram",
        icon: <IconBrandInstagram className="h-full w-full text-foreground/80" />,
        href: "https://www.instagram.com/kartalamanoj",
      },
    ],
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 10
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-auto shadow-sm shadow-black/10",
        scrolled ? "opacity-100" : "opacity-90 hover:opacity-100"
      )}
    >
      <FloatingDock
        items={navItems}
        desktopClassName="bg-background/80 border-border/50"
        mobileClassName="translate-y-0"
      />
    </nav>
  )
}
