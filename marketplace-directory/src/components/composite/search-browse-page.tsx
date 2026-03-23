"use client"

import { useState } from "react"
import {
  Configure,
  InstantSearch,
  useHits,
  useRange,
  useRefinementList,
  useSearchBox,
} from "react-instantsearch"

import { ListingCard } from "@/components/marketplace/listing-card"
import { MarketplaceIcon } from "@/components/marketplace/icons"
import { MockMapPanel } from "@/components/marketplace/mock-map-panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet"
import { mockSearchClient } from "@/lib/algolia/mock-search-client"

type BrowseClientProps = {
  totalListings: number
}

function SearchInput() {
  const { query, refine } = useSearchBox()

  return (
    <div className="relative">
      <MarketplaceIcon name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <input
        value={query}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder="Search listings, tags, cities, or services"
        className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}

function RefinementGroup({
  title,
  attribute,
}: {
  title: string
  attribute: string
}) {
  const { items, refine } = useRefinementList({ attribute })

  return (
    <div className="rounded-[24px] border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <label key={item.value} className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="size-4 rounded border-border"
              />
              {item.label}
            </span>
            <span className="text-xs text-muted-foreground">{item.count}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function PriceRange() {
  const { start, range, refine } = useRange({ attribute: "startingPrice" })
  const min = typeof range.min === "number" ? range.min : 0
  const max = typeof range.max === "number" ? range.max : 2500
  const currentStart = typeof start[0] === "number" ? start[0] : min
  const currentEnd = typeof start[1] === "number" ? start[1] : max

  return (
    <div className="rounded-[24px] border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Price range</h3>
      <div className="mt-5">
        <Slider
          min={min}
          max={max}
          step={10}
          value={[currentStart, currentEnd]}
          onValueChange={(value) => refine([value[0], value[1]])}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>${Math.round(currentStart)}</span>
        <span>${Math.round(currentEnd)}</span>
      </div>
    </div>
  )
}

function HitsGrid({ ratingFilter }: { ratingFilter: number }) {
  const { hits } = useHits()
  const filteredHits = hits.filter((hit) => Number(hit.averageRating ?? 0) >= ratingFilter)

  if (filteredHits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[28px] border border-border bg-card p-12 text-center">
        <div className="text-4xl">🔍</div>
        <p className="mt-4 text-sm text-muted-foreground">No listings match your current filters.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {filteredHits.map((hit) => (
        <ListingCard key={String(hit.objectID)} listing={hit as never} />
      ))}
    </div>
  )
}

function FiltersPanel({ ratingFilter, setRatingFilter }: { ratingFilter: number; setRatingFilter: (v: number) => void }) {
  return (
    <div className="space-y-4">
      <RefinementGroup title="Category" attribute="categoryId" />
      <RefinementGroup title="Location" attribute="locationLabel" />
      <PriceRange />
      <div className="rounded-[24px] border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground">Minimum rating</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {[4, 4.5, 5].map((value) => (
            <Button
              key={value}
              type="button"
              variant={ratingFilter === value ? "default" : "outline"}
              onClick={() => setRatingFilter(value)}
              className={ratingFilter === value
                ? "h-10 rounded-full bg-coral-500 px-4 text-sm text-white hover:bg-coral-400"
                : "h-10 rounded-full border-border px-4 text-sm"}
            >
              {value.toFixed(1)}+
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SearchBrowsePage({ totalListings }: BrowseClientProps) {
  const [showMap, setShowMap] = useState(false)
  const [ratingFilter, setRatingFilter] = useState(4)
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <InstantSearch searchClient={mockSearchClient as never} indexName="listings">
      <Configure hitsPerPage={12} />
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-[32px] border border-border bg-card p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-none sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Mocked Algolia InstantSearch</div>
              <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Browse active listings
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {totalListings} mock listings across coworking, wellness, dining, and creative services.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Mobile filter toggle */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setFiltersOpen(true)}
                className="h-11 rounded-full border-border px-4 text-sm lg:hidden"
              >
                Filters
              </Button>
              <Button
                type="button"
                onClick={() => setShowMap((current) => !current)}
                className="h-11 rounded-full bg-indigo-900 px-4 text-sm text-white hover:bg-indigo-800"
              >
                <MarketplaceIcon name="map" className="mr-2 size-4" />
                {showMap ? "Hide map" : "Show map"}
              </Button>
            </div>
          </div>
        </div>

        <SearchInput />

        <div className={`grid gap-6 ${showMap ? "xl:grid-cols-[280px_minmax(0,1fr)_360px]" : "lg:grid-cols-[280px_minmax(0,1fr)]"}`}>
          {/* Desktop filters sidebar */}
          <aside className="hidden lg:block">
            <FiltersPanel ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />
          </aside>

          {/* Results */}
          <div className="min-w-0 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">High-intent marketplace</Badge>
              <Badge className="rounded-full bg-yellow-100 px-3 py-1 text-amber-700 dark:bg-yellow-950 dark:text-yellow-300">Live-feeling mock content</Badge>
              <Badge className="rounded-full bg-rose-100 px-3 py-1 text-rose-700 dark:bg-rose-950 dark:text-rose-300">Premium vendor mix</Badge>
            </div>
            <HitsGrid ratingFilter={ratingFilter} />
          </div>

          {showMap ? <MockMapPanel label="Listings map" /> : null}
        </div>
      </div>

      {/* Mobile filters sheet */}
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" className="w-80 overflow-y-auto p-0" showCloseButton={false}>
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">Filters</h2>
              <SheetClose asChild>
                <button type="button" className="grid size-8 place-items-center rounded-full border border-border" aria-label="Close filters">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="size-4">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </SheetClose>
            </div>
            <FiltersPanel ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />
          </div>
        </SheetContent>
      </Sheet>
    </InstantSearch>
  )
}
