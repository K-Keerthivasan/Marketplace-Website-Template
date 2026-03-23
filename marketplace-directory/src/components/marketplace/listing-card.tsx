import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/marketplace/star-rating"

type ListingCardProps = {
  listing: {
    slug: string
    name: string
    categoryName: string
    locationLabel: string
    neighborhood: string
    shortDescription: string
    averageRating: number
    reviewCount: number
    tier: string
    priceLabel: string
    featured: boolean
    verified: boolean
    heroClassName: string
    heroBadge: string
  }
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="overflow-hidden rounded-[28px] border border-border bg-card py-0 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:shadow-none">
      <div className={`relative h-48 bg-gradient-to-br ${listing.heroClassName}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.36),_transparent_34%)]" />
        <div className="absolute inset-x-5 top-5 flex items-center justify-between">
          <Badge className="bg-white/90 text-indigo-800">{listing.heroBadge}</Badge>
          {listing.verified ? <Badge className="bg-indigo-900/90 text-white">Verified</Badge> : null}
        </div>
        <div className="absolute inset-x-5 bottom-5 rounded-[22px] border border-white/50 bg-white/82 p-4 backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700">{listing.locationLabel}</div>
          <div className="mt-1 text-lg font-semibold text-slate-950">{listing.name}</div>
          <div className="text-sm text-slate-600">{listing.neighborhood}</div>
        </div>
      </div>
      <CardContent className="space-y-4 px-5 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full border-indigo-100 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
            {listing.categoryName}
          </Badge>
          <Badge variant="outline" className="rounded-full border-yellow-200 bg-yellow-50 text-amber-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300">
            {listing.tier}
          </Badge>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{listing.shortDescription}</p>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(listing.averageRating)} />
              <span className="text-sm font-semibold text-foreground">
                {listing.averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">({listing.reviewCount})</span>
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">{listing.priceLabel}</div>
          </div>
          <Button asChild className="h-10 shrink-0 rounded-full bg-indigo-900 px-4 text-sm text-white hover:bg-indigo-800">
            <Link href={`/listing/${listing.slug}`}>View listing</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
