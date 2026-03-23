"use client"

import Link from "next/link"
import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/marketplace/theme-toggle"

type PublicShellProps = {
  children: ReactNode
}

const navLinks = [
  { href: "/browse", label: "Browse" },
  { href: "/submit-listing", label: "Submit Listing" },
  { href: "/admin", label: "Admin" },
]

export function PublicShell({ children }: PublicShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="grid size-11 place-items-center rounded-2xl bg-indigo-900 text-sm font-black text-white shadow-lg shadow-indigo-900/20">
              K2
            </div>
            <div className="hidden sm:block">
              <div className="font-heading text-lg font-semibold tracking-tight text-indigo-950 dark:text-indigo-300">K2 Marketplace</div>
              <div className="text-xs text-muted-foreground">Modern directory boilerplate</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-indigo-700 dark:hover:text-indigo-400">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" className="hidden h-10 rounded-full border-border px-4 text-sm text-indigo-700 dark:text-indigo-400 lg:inline-flex">
              <Link href="/browse">Explore vendors</Link>
            </Button>
            <Button asChild className="hidden h-10 rounded-full bg-coral-500 px-4 text-sm text-white hover:bg-coral-400 sm:inline-flex">
              <Link href="/submit-listing">List your business</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-border bg-card md:hidden"
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="size-5">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-72 p-0">
          <div className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-indigo-900 text-sm font-black text-white">K2</div>
                <span className="font-heading text-base font-semibold text-indigo-950 dark:text-indigo-300">K2 Marketplace</span>
              </Link>
              <SheetClose asChild>
                <button
                  type="button"
                  className="grid size-8 place-items-center rounded-full border border-border"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="size-4">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </SheetClose>
            </div>

            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-border">
              <Button asChild className="h-11 rounded-full bg-coral-500 text-sm text-white hover:bg-coral-400">
                <Link href="/submit-listing" onClick={() => setMobileOpen(false)}>List your business</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-full border-border text-sm">
                <Link href="/browse" onClick={() => setMobileOpen(false)}>Explore vendors</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {children}
    </div>
  )
}
