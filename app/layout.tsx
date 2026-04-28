import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/lib/theme-context"
import { I18nProvider } from "@/lib/i18n/i18n-context"
import { NotificationsProvider } from "@/lib/notifications-context"
import { ActivityLogProvider } from "@/lib/activity-log-context"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "𝒴ℴ𝓂𝒾 - Enterprise Inventory Management",
  description: "Enterprise-grade IT Department Inventory Management System - Powered by Yomi",
  keywords: ["inventory", "management", "enterprise", "IT", "stock", "yomi"],
  authors: [{ name: "Yomi Team" }],
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-sans antialiased bg-black text-white">
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <NotificationsProvider>
                <ActivityLogProvider>
                  {children}
                  <Toaster position="bottom-right" richColors />
                </ActivityLogProvider>
              </NotificationsProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
