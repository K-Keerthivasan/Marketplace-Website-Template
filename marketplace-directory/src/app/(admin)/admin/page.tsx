import { DashboardChart } from "@/components/marketplace/dashboard-chart"
import { Badge } from "@/components/ui/badge"
import { getAdminDashboardData } from "@/lib/supabase/mock"

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData()

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-border bg-card p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Admin dashboard</div>
            <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Marketplace overview</h1>
          </div>
          <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Stripe Connect UI mocked</Badge>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total listings", data.totals.totalListings],
            ["Pending approvals", data.totals.pendingApprovals],
            ["New reviews today", data.totals.newReviewsToday],
            ["Featured revenue", `$${data.totals.featuredUpgradeRevenue.toLocaleString()}`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[26px] border border-border bg-muted p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
              <div className="mt-3 font-heading text-4xl font-semibold text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[32px] border border-border bg-card p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:shadow-none">
          <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Listings by category</div>
          <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground">Marketplace distribution</h2>
          <div className="mt-6">
            <DashboardChart data={data.listingsByCategory} />
          </div>
        </div>
        <div className="rounded-[32px] border border-indigo-200/50 bg-gradient-to-br from-indigo-900 via-indigo-700 to-coral-400 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.24)]">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/72">Payouts</div>
          <h2 className="mt-3 font-heading text-3xl font-semibold">Featured upgrades revenue</h2>
          <p className="mt-4 text-sm leading-7 text-white/84">
            Mock Stripe Connect controls would live here for onboarding vendors, tracking payouts, and highlighting premium placement revenue.
          </p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-[22px] bg-white/12 px-4 py-3 text-sm">Connected vendors: 8</div>
            <div className="rounded-[22px] bg-white/12 px-4 py-3 text-sm">Pending payouts: 3</div>
            <div className="rounded-[22px] bg-white/12 px-4 py-3 text-sm">Upgrade conversion: 18.4%</div>
          </div>
        </div>
      </section>
    </div>
  )
}
