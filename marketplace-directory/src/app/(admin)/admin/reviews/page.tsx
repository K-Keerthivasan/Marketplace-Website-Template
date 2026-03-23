import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAdminDashboardData } from "@/lib/supabase/mock"

export default async function AdminReviewsPage() {
  const data = await getAdminDashboardData()

  return (
    <section className="rounded-[32px] border border-border bg-card p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Reviews manager</div>
          <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Moderate trust signals</h1>
        </div>
        <Badge className="rounded-full bg-rose-100 px-3 py-1 text-rose-700 dark:bg-rose-950 dark:text-rose-300">20 mock reviews</Badge>
      </div>

      <div className="mt-6 grid gap-4">
        {data.reviews.map((review) => (
          <div key={review.id} className="rounded-[28px] border border-border bg-muted p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-medium text-foreground">{review.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {review.listingSlug} • {review.reviewer} • {review.rating} stars
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={
                    review.status === "Approved"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : review.status === "Pending"
                        ? "bg-yellow-100 text-amber-700 dark:bg-yellow-950 dark:text-yellow-300"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                  }
                >
                  {review.status}
                </Badge>
                <Badge className="bg-muted-foreground/15 text-muted-foreground">{review.reportCount} reports</Badge>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{review.content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" className="h-9 rounded-full border-emerald-200 px-3 text-xs text-emerald-700 dark:border-emerald-900 dark:text-emerald-400">Approve</Button>
              <Button variant="outline" className="h-9 rounded-full border-yellow-200 px-3 text-xs text-amber-700 dark:border-yellow-900 dark:text-yellow-400">Reject</Button>
              <Button variant="outline" className="h-9 rounded-full border-rose-200 px-3 text-xs text-rose-700 dark:border-rose-900 dark:text-rose-400">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
