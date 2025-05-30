import type { ReactNode } from "react"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconHome,
  IconMail,
  IconUser,
  IconBriefcase,
  IconCode,
  IconSchool,
  IconBrandDiscord,
  IconShare3,
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
    href: "/",
    icon: <IconHome />,
  },
  {
    title: "About",
    href: "/about",
    icon: <IconUser />,
  },
  {
    title: "Experience",
    href: "/experience",
    icon: <IconBriefcase />,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <IconCode />,
  },
  {
    title: "Education",
    href: "/education",
    icon: <IconSchool />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <IconMail />,
  },
  {
    title: "Social",
    href: "#",
    icon: <IconShare3 />,
    submenu: [
      {
        title: "GitHub",
        href: "https://github.com/SaiManojK16",
        icon: <IconBrandGithub />,
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/sai-manoj-kartala/",
        icon: <IconBrandLinkedin />,
      },
      {
        title: "Twitter",
        href: "https://twitter.com/saimanojkartala",
        icon: <IconBrandTwitter />,
      },
      {
        title: "Discord",
        href: "https://discord.com/users/saimanojkartala",
        icon: <IconBrandDiscord />,
      },
    ],
  },
] 