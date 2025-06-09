import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ChatButton } from "@/components/chat/ChatButton"
import ThemeToggle from "@/components/theme-toggle"
import { FloatingDock } from "@/components/ui/floating-dock"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Sai Manoj Kartala',
  description: 'Portfolio website of Sai Manoj Kartala',
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <ChatButton />
            <FloatingDock />
            <main className="flex-1">{children}</main>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}