import Link from "next/link"

import { ListingCard } from "@/components/marketplace/listing-card"
import { MarketplaceIcon } from "@/components/marketplace/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getHomePageData } from "@/lib/supabase/mock"

export default async function HomePage() {
  const data = await getHomePageData()

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-indigo-900 via-indigo-700 to-coral-400 px-8 py-10 text-white shadow-[0_32px_80px_rgba(49,46,129,0.32)] sm:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(252,211,77,0.3),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.18),_transparent_28%)]" />
            <div className="relative">
              <Badge className="rounded-full bg-white/15 px-4 py-1 text-white">Marketplace boilerplate for K2 Digital Media</Badge>
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Find standout local businesses in one vibrant marketplace.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/82">
                Product Hunt energy, Yelp-style utility, and a premium directory feel. Search, compare, enquire, and manage listings with an active mock dataset.
              </p>
              <div className="mt-8 grid gap-3 rounded-[28px] border border-white/15 bg-white/10 p-4 backdrop-blur sm:grid-cols-[1fr_220px_160px]">
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-slate-600">
                  <MarketplaceIcon name="search" className="shrink-0 text-slate-400" />
                  <span className="text-sm">Search businesses, categories, or locations</span>
                </div>
                <div className="rounded-2xl bg-white px-4 py-4 text-sm text-slate-600">All categories</div>
                <Button asChild className="h-auto rounded-2xl bg-yellow-300 px-5 py-4 text-sm font-semibold text-slate-950 hover:bg-yellow-200">
                  <Link href="/browse">Search now</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/75">
                <span>12 listings</span>
                <span>20 reviews</span>
                <span>4 active categories</span>
                <span>Mock Supabase + Algolia + Stripe flows</span>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[32px] border border-border bg-card p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-none">
              <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Trust snapshot</div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  ["Verified vendors", "87%"],
                  ["Avg. response time", "41m"],
                  ["Featured upgrades", "$4.8k"],
                  ["Five-star reviews", "72%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[24px] bg-muted p-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
                    <div className="mt-2 font-heading text-3xl font-semibold text-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-border bg-card p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Featured vendors</div>
                  <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground">Busy, trusted, and active</h2>
                </div>
                <Link href="/browse" className="text-sm font-medium text-indigo-700 dark:text-indigo-400">See all</Link>
              </div>
              <div className="mt-5 grid gap-3">
                {data.featuredVendors.slice(0, 3).map((listing) => (
                  <div key={listing.slug} className="flex items-center justify-between rounded-[22px] border border-border px-4 py-3">
                    <div>
                      <div className="font-medium text-foreground">{listing.name}</div>
                      <div className="text-sm text-muted-foreground">{listing.locationLabel} • {listing.categoryName}</div>
                    </div>
                    <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{listing.priceLabel}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Featured categories</div>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">Eight entry points into the marketplace</h2>
          </div>
          <Link href="/browse" className="shrink-0 text-sm font-medium text-indigo-700 dark:text-indigo-400">Browse all</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.featuredCategories.map((category) => (
            <div key={category.id} className="rounded-[28px] border border-border bg-card p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:shadow-none">
              <div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${category.accent} text-white`}>
                <MarketplaceIcon name={category.icon} className="size-6" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
              <div className="mt-4 text-sm font-medium text-indigo-700 dark:text-indigo-400">{category.listingCount} active listings</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Trending now</div>
        <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">Listings with real momentum</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {data.trendingListings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-border bg-card p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:shadow-none sm:p-8">
          <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">How it works</div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Search with intent", "Use the large search hero and browse filters to narrow into the right fit fast."],
              ["Compare active vendors", "Cards, ratings, pricing, and category badges make the marketplace feel populated and trustworthy."],
              ["Enquire or upgrade", "Contact a vendor, submit a listing, or surface premium placements through featured upgrades."],
            ].map(([title, description], index) => (
              <div key={title} className="rounded-[28px] border border-border bg-muted/40 p-6">
                <div className="grid size-12 place-items-center rounded-2xl bg-indigo-900 text-sm font-bold text-white">{index + 1}</div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground sm:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-sm font-medium text-muted-foreground sm:px-6 lg:px-8">
          {data.trustBadges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </section>
    </main>
  )
}
