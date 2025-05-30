import type React from "react";
import type { Metadata } from "next";
import ClientLayout from "./client";
import { Suspense } from "react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saimanojkartala.com'),
  title: "Sai Manoj Kartala | AI & Full-Stack Developer",
  description:
    "Portfolio of Sai Manoj Kartala, an AI & Full-Stack Developer specializing in machine learning, web development, and AR technologies.",
  keywords: [
    "Sai Manoj Kartala",
    "AI Developer",
    "Full Stack Developer",
    "Machine Learning",
    "Python",
    "TensorFlow",
    "MERN Stack",
    "AWS",
  ],
  authors: [{ name: "Sai Manoj Kartala" }],
  creator: "Sai Manoj Kartala",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saimanojkartala.com",
    title: "Sai Manoj Kartala | AI & Full-Stack Developer",
    description:
      "Portfolio of Sai Manoj Kartala, an AI & Full-Stack Developer specializing in machine learning, web development, and AR technologies.",
    siteName: "Sai Manoj Kartala Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Sai Manoj Kartala Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Manoj Kartala | AI & Full-Stack Developer",
    description:
      "Portfolio of Sai Manoj Kartala, an AI & Full-Stack Developer specializing in machine learning, web development, and AR technologies.",
    creator: "@saimanojkartala",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#030303" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn(
        "min-h-screen font-sans antialiased bg-white dark:bg-[#030303] transition-colors duration-700 overflow-x-hidden",
        fontSans.variable
      )}>
        <ThemeProvider>
          <Suspense>
            <ClientLayout>{children}</ClientLayout>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}