import type React from "react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { SessionProvider } from "@/components/SessionProvider"
import "./globals.css"

export const metadata = {
  title: "CMS Dashboard",
  description: "A modern CMS dashboard for managing students and placements",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}



import './globals.css'