import { SubmitListingForm } from "@/components/marketplace/submit-listing-form"

export default function SubmitListingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[36px] bg-gradient-to-br from-indigo-900 via-indigo-700 to-coral-400 px-8 py-10 text-white shadow-[0_32px_80px_rgba(49,46,129,0.28)]">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/72">Submit Listing</div>
          <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight">Launch your business into the directory</h1>
          <p className="mt-4 text-base leading-7 text-white/84">
            Multi-step onboarding flow with preview and admin-ready submission states. Built for premium local businesses and fast operator review.
          </p>
        </div>
      </section>
      <section className="mt-8">
        <SubmitListingForm />
      </section>
    </main>
  )
}
