import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { EnquiryForm } from "@/components/composite/enquiry-form"
import { ListingCard } from "@/components/marketplace/listing-card"
import { MockMapPanel } from "@/components/marketplace/mock-map-panel"
import { StarRating } from "@/components/marketplace/star-rating"
import { Badge } from "@/components/ui/badge"
import { getListingPageData } from "@/lib/supabase/mock"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getListingPageData(slug)

  if (!data) {
    notFound()
  }

  const panelClass = "rounded-[32px] border border-border bg-card p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-none"

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className={`relative overflow-hidden rounded-[36px] bg-gradient-to-br ${data.listing.heroClassName} p-8 text-white shadow-[0_32px_80px_rgba(49,46,129,0.24)] sm:p-10`}>
        <Image
          src={data.listing.imageSrc}
          alt={data.listing.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_30%)]" />
        <div className="relative max-w-4xl">
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white/15 text-white">{data.category?.name}</Badge>
            <Badge className="bg-white/15 text-white">{data.listing.heroBadge}</Badge>
          </div>
          <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">{data.listing.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(data.stats.averageRating)} />
              <span>{data.stats.averageRating.toFixed(1)} rating</span>
            </div>
            <span>{data.stats.reviewCount} reviews</span>
            <span>{data.listing.locationLabel}</span>
            <span>{data.listing.responseTime}</span>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          {/* About */}
          <div className={panelClass}>
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">About</div>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{data.listing.about}</p>
          </div>

          {/* Services */}
          <div className={panelClass}>
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Services and offers</div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {data.listing.services.map((service) => (
                <div key={service} className="rounded-[22px] border border-border bg-muted px-4 py-4 text-sm font-medium text-foreground">
                  {service}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.listing.tags.map((tag) => (
                <Badge key={tag} className="rounded-full bg-yellow-100 text-amber-700 dark:bg-yellow-950 dark:text-yellow-300">{tag}</Badge>
              ))}
            </div>
          </div>

          <MockMapPanel label={`${data.listing.locationLabel} map`} />

          {/* Reviews */}
          <div className={panelClass}>
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Reviews</div>
            <div className="mt-5 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="rounded-[26px] bg-muted p-5">
                <div className="font-heading text-5xl font-semibold text-foreground">{data.stats.averageRating.toFixed(1)}</div>
                <div className="mt-2"><StarRating rating={Math.round(data.stats.averageRating)} /></div>
                <div className="mt-2 text-sm text-muted-foreground">{data.stats.reviewCount} verified reviews</div>
                <div className="mt-5 space-y-3">
                  {data.stats.breakdown.map((row) => (
                    <div key={row.star} className="grid grid-cols-[24px_1fr_24px] items-center gap-3 text-sm text-muted-foreground">
                      <span>{row.star}</span>
                      <div className="h-2 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-coral-400"
                          style={{
                            width: `${data.stats.reviewCount === 0 ? 0 : (row.count / data.stats.reviewCount) * 100}%`,
                          }}
                        />
                      </div>
                      <span>{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {data.reviews.map((review) => (
                  <div key={review.id} className="rounded-[24px] border border-border p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-foreground">{review.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{review.reviewer} • {review.date}</div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-[28px] border border-border bg-card p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-none">
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Quick facts</div>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
                <span>Price tier</span>
                <strong className="text-foreground">{data.listing.priceLabel}</strong>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
                <span>Vendor</span>
                <strong className="text-foreground">{data.listing.vendorName}</strong>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
                <span>Status</span>
                <strong className="text-foreground">{data.listing.verified ? "Verified" : "Pending verification"}</strong>
              </div>
            </div>
          </div>
          <EnquiryForm listingName={data.listing.name} />
          <div className="rounded-[28px] border border-border bg-card p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-none">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Similar listings</div>
                <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground">Keep browsing</h2>
              </div>
              <Link href="/browse" className="text-sm font-medium text-indigo-700 dark:text-indigo-400">See more</Link>
            </div>
            <div className="mt-5 grid gap-4">
              {data.similarListings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
