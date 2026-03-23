"use client"

import { useDeferredValue, useState } from "react"
import { Configure, InstantSearch, useHits, useRange, useRefinementList, useSearchBox } from "react-instantsearch"

import { ListingCard } from "@/components/marketplace/listing-card"
import { MarketplaceIcon } from "@/components/marketplace/icons"
import { MockMapPanel } from "@/components/marketplace/mock-map-panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { mockSearchClient } from "@/lib/algolia/mock-search-client"

type BrowseClientProps = {
  totalListings: number
}

function SearchInput() {
  const { query, refine } = useSearchBox()
  const deferredQuery = useDeferredValue(query)

  return (
    <div className="relative">
      <MarketplaceIcon name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
      <input
        value={deferredQuery}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder="Search listings, tags, cities, or services"
        className="h-14 w-full rounded-2xl border border-indigo-100 bg-white pl-12 pr-4 text-sm outline-none ring-0"
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
    <div className="rounded-[24px] border border-indigo-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <label key={item.value} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-3 py-2 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="size-4 rounded border-indigo-200"
              />
              {item.label}
            </span>
            <span className="text-xs text-slate-400">{item.count}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function PriceRange() {
  const { start, range, refine } = useRange({ attribute: "startingPrice" })
  const min = Number.isFinite(range.min) ? range.min : 0
  const max = Number.isFinite(range.max) ? range.max : 2500
  const currentStart = Number.isFinite(start[0]) ? start[0] : min
  const currentEnd = Number.isFinite(start[1]) ? start[1] : max

  return (
    <div className="rounded-[24px] border border-indigo-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900">Price range</h3>
      <div className="mt-5">
        <Slider
          min={min}
          max={max}
          step={10}
          value={[currentStart, currentEnd]}
          onValueChange={(value) => refine([value[0], value[1]])}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>${Math.round(currentStart)}</span>
        <span>${Math.round(currentEnd)}</span>
      </div>
    </div>
  )
}

function HitsGrid({ ratingFilter }: { ratingFilter: number }) {
  const { hits } = useHits()
  const filteredHits = hits.filter((hit) => Number(hit.averageRating ?? 0) >= ratingFilter)

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {filteredHits.map((hit) => (
        <ListingCard key={String(hit.objectID)} listing={hit as never} />
      ))}
    </div>
  )
}

export function SearchBrowseClient({ totalListings }: BrowseClientProps) {
  const [showMap, setShowMap] = useState(false)
  const [ratingFilter, setRatingFilter] = useState(4)

  return (
    <InstantSearch searchClient={mockSearchClient} indexName="listings">
      <Configure hitsPerPage={12} />
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-indigo-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div>
            <div className="text-sm font-semibold text-indigo-700">Mocked Algolia InstantSearch</div>
            <h1 className="mt-1 font-heading text-4xl font-semibold tracking-tight text-slate-950">
              Browse active listings
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {totalListings} mock listings across coworking, wellness, dining, and creative services.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setShowMap((current) => !current)}
            className="h-11 rounded-full bg-indigo-900 px-5 text-sm text-white hover:bg-indigo-800"
          >
            <MarketplaceIcon name="map" className="mr-2 size-4" />
            {showMap ? "Hide map" : "Show map"}
          </Button>
        </div>

        <SearchInput />

        <div className={`grid gap-6 ${showMap ? "xl:grid-cols-[280px_minmax(0,1fr)_360px]" : "xl:grid-cols-[280px_minmax(0,1fr)]"}`}>
          <aside className="space-y-4">
            <RefinementGroup title="Category" attribute="categoryId" />
            <RefinementGroup title="Location" attribute="locationLabel" />
            <PriceRange />
            <div className="rounded-[24px] border border-indigo-100 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-900">Minimum rating</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[4, 4.5, 5].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={ratingFilter === value ? "default" : "outline"}
                    onClick={() => setRatingFilter(value)}
                    className={ratingFilter === value ? "h-10 rounded-full bg-coral-500 px-4 text-sm text-white hover:bg-coral-400" : "h-10 rounded-full border-indigo-200 px-4 text-sm text-slate-700"}
                  >
                    {value.toFixed(1)}+
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">High-intent marketplace</Badge>
              <Badge className="rounded-full bg-yellow-100 px-3 py-1 text-amber-700">Live-feeling mock content</Badge>
              <Badge className="rounded-full bg-rose-100 px-3 py-1 text-rose-700">Premium vendor mix</Badge>
            </div>
            <HitsGrid ratingFilter={ratingFilter} />
          </div>

          {showMap ? <MockMapPanel label="Listings map" /> : null}
        </div>
      </div>
    </InstantSearch>
  )
}
