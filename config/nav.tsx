import type { ReactNode } from "react"
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
  IconBriefcase,
} from "@tabler/icons-react"

type NavItem = {
  title: string
  href: string
  icon: ReactNode
  submenu?: {
    title: string
    href: string
    icon: ReactNode
  }[]
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-foreground/80" />,
    href: "#home",
  },
  {
    title: "About",
    icon: <IconUser className="h-full w-full text-foreground/80" />,
    href: "#about",
  },
  {
    title: "Projects",
    icon: <IconDeviceDesktop className="h-full w-full text-foreground/80" />,
    href: "#projects",
  },
  {
    title: "Experience",
    icon: <IconBriefcase className="h-full w-full text-foreground/80" />,
    href: "#experience",
  },
  {
    title: "Resume",
    icon: <IconFileText className="h-full w-full text-foreground/80" />,
    href: "/resume.pdf",
  },
  {
    title: "Education",
    icon: <IconSchool className="h-full w-full text-foreground/80" />,
    href: "#education",
  },
  {
    title: "Contact",
    icon: <IconMail className="h-full w-full text-foreground/80" />,
    href: "#contact",
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