import { SearchBrowsePage } from "@/components/composite/search-browse-page"
import { getBrowsePageData } from "@/lib/supabase/mock"

export default async function BrowsePage() {
  const data = await getBrowsePageData()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SearchBrowsePage totalListings={data.listings.length} />
    </main>
  )
}
