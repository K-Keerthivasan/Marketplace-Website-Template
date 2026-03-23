import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAdminDashboardData } from "@/lib/supabase/mock"

export default async function AdminListingsPage() {
  const data = await getAdminDashboardData()

  return (
    <section className="rounded-[32px] border border-border bg-card p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Listings manager</div>
          <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Approvals and vendor controls</h1>
        </div>
        <Badge className="rounded-full bg-yellow-100 px-3 py-1 text-amber-700 dark:bg-yellow-950 dark:text-yellow-300">12 records</Badge>
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-hidden rounded-[28px] border border-border md:block">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              {["Listing", "Category", "Status", "Featured", "Flags", "Actions"].map((heading) => (
                <th key={heading} className="px-5 py-4 font-medium">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {data.listings.map((listing) => (
              <tr key={listing.slug}>
                <td className="px-5 py-4">
                  <div className="font-medium text-foreground">{listing.name}</div>
                  <div className="text-muted-foreground">{listing.locationLabel}</div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{listing.categoryName}</td>
                <td className="px-5 py-4">
                  <Badge
                    className={
                      listing.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : listing.status === "Pending"
                          ? "bg-yellow-100 text-amber-700 dark:bg-yellow-950 dark:text-yellow-300"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    }
                  >
                    {listing.status}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{listing.featured ? "On" : "Off"}</td>
                <td className="px-5 py-4 text-muted-foreground">{listing.flagCount}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="h-9 rounded-full border-border px-3 text-xs text-indigo-700 dark:text-indigo-400">Edit</Button>
                    <Button variant="outline" className="h-9 rounded-full border-emerald-200 px-3 text-xs text-emerald-700 dark:border-emerald-900 dark:text-emerald-400">Approve</Button>
                    <Button variant="outline" className="h-9 rounded-full border-rose-200 px-3 text-xs text-rose-700 dark:border-rose-900 dark:text-rose-400">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="mt-6 grid gap-4 md:hidden">
        {data.listings.map((listing) => (
          <div key={listing.slug} className="rounded-[24px] border border-border bg-muted p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-foreground">{listing.name}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{listing.locationLabel} • {listing.categoryName}</div>
              </div>
              <Badge
                className={
                  listing.status === "Approved"
                    ? "shrink-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : listing.status === "Pending"
                      ? "shrink-0 bg-yellow-100 text-amber-700 dark:bg-yellow-950 dark:text-yellow-300"
                      : "shrink-0 bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                }
              >
                {listing.status}
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>Featured: {listing.featured ? "On" : "Off"}</span>
              <span>Flags: {listing.flagCount}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" className="h-9 rounded-full border-border px-3 text-xs text-indigo-700 dark:text-indigo-400">Edit</Button>
              <Button variant="outline" className="h-9 rounded-full border-emerald-200 px-3 text-xs text-emerald-700 dark:border-emerald-900 dark:text-emerald-400">Approve</Button>
              <Button variant="outline" className="h-9 rounded-full border-rose-200 px-3 text-xs text-rose-700 dark:border-rose-900 dark:text-rose-400">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
