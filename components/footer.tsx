"use client"

import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram, IconMail, IconMapPin } from "@tabler/icons-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/SaiManojK16",
      icon: <IconBrandGithub className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sai-manoj-kartala-592ab9239/",
      icon: <IconBrandLinkedin className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/kartalamanoj",
      icon: <IconBrandInstagram className="w-5 h-5" />,
    },
  ]

  const siteLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ]

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 will-change-transform">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sai Manoj Kartala</h3>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer and AI/ML Engineer passionate about building innovative solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {siteLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <IconMapPin className="w-4 h-4" />
                Albany, NY 12203
              </p>
              <a
                href="mailto:kartalasaimanoj@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <IconMail className="w-4 h-4" />
                kartalasaimanoj@gmail.com
              </a>
            </div>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Sai Manoj Kartala. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with passion and modern web technologies
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 