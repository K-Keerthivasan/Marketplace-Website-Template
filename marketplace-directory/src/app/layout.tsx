import type { Metadata } from "next"
import { ThemeProvider } from "@/components/marketplace/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "K2 Marketplace Directory",
  description: "Marketplace and directory boilerplate for K2 Digital Media.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Prevent dark mode flash on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(t===null&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
