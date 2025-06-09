"use client"

import type React from "react"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { cn } from "@/lib/utils"
import NoScriptStyles from "@/components/noscript-styles"
import ThemeToggle from "@/components/theme-toggle"
import { usePathname } from "next/navigation"
import { FloatingDock } from "@/components/ui/floating-dock"
import { navItems } from "@/config/nav"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-screen flex-col">
        <noscript>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 text-center text-sm">
            For the best experience, please enable JavaScript. Some features may be limited without it.
          </div>
        </noscript>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <FloatingDock items={navItems} />
        <main className="flex-1 relative z-10">{children}</main>
      </div>
    </ThemeProvider>
  )
}
