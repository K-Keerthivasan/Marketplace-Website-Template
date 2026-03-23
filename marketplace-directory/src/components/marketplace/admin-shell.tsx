"use client"

import Link from "next/link"
import { useState, type ReactNode } from "react"

import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/marketplace/theme-toggle"

type AdminShellProps = {
  children: ReactNode
}

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/reviews", label: "Reviews" },
]

function AdminSidebar({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="rounded-[24px] bg-gradient-to-br from-indigo-700 via-indigo-500 to-coral-400 p-5 text-white">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-white/75">K2 Admin</div>
        <div className="mt-2 font-heading text-2xl font-semibold">Marketplace ops</div>
        <p className="mt-2 text-sm text-white/80">Approvals, trust, revenue, and featured upgrades in one place.</p>
      </div>
      <nav className="mt-6 grid gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/"
          onClick={onLinkClick}
          className="mt-4 rounded-2xl border border-border px-4 py-3 text-sm text-muted-foreground transition hover:border-yellow-300/50 hover:text-foreground"
        >
          Return to marketplace
        </Link>
      </nav>
      <div className="mt-auto flex items-center gap-2 pt-6 border-t border-border">
        <ThemeToggle />
        <span className="text-xs text-muted-foreground">Toggle theme</span>
      </div>
    </div>
  )
}

export function AdminShell({ children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile header bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-4 lg:hidden">
        <Link href="/admin" className="font-heading text-base font-semibold">K2 Admin</Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="grid size-10 place-items-center rounded-full border border-border"
          aria-label="Open admin menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="size-5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile nav sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0" showCloseButton={false}>
          <div className="flex items-end justify-end p-4">
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
          <AdminSidebar onLinkClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop layout */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:min-h-screen lg:grid-cols-[260px_1fr] lg:px-8">
        {/* Desktop sidebar */}
        <aside className="hidden rounded-[28px] border border-border bg-card lg:block">
          <AdminSidebar />
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}
