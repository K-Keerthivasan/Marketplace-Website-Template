import {
  categories,
  getCategoryById,
  getEnrichedListings,
  getListingStats,
  getReviewsForListing,
  listings,
  reviews,
} from "@/lib/marketplace-data"

export async function getHomePageData() {
  const enrichedListings = getEnrichedListings()

  return {
    categories,
    featuredCategories: [
      ...categories,
      { id: "events", name: "Events", description: "Launches, tastings, and bookable experiences.", icon: "ticket", accent: "from-coral-400 to-yellow-300", listingCount: 24 },
      { id: "services", name: "Services", description: "Trusted experts for fast-moving teams.", icon: "bolt", accent: "from-indigo-700 to-coral-400", listingCount: 18 },
      { id: "retail", name: "Retail", description: "Independent shops and premium goods.", icon: "bag", accent: "from-yellow-200 to-indigo-500", listingCount: 12 },
      { id: "nightlife", name: "Nightlife", description: "Lounges, bars, and private rooms.", icon: "moon", accent: "from-indigo-900 to-coral-500", listingCount: 16 },
    ],
    trendingListings: enrichedListings.filter((listing) => listing.trending).slice(0, 4),
    featuredVendors: enrichedListings.filter((listing) => listing.featured).slice(0, 4),
    trustBadges: [
      "Verified vendors",
      "Secure enquiries",
      "Fast approvals",
      "Featured upgrade payouts",
      "Real community reviews",
    ],
  }
}

export async function getBrowsePageData() {
  return {
    categories,
    listings: getEnrichedListings(),
    locations: Array.from(new Set(listings.map((listing) => listing.locationLabel))).sort(),
  }
}

export async function getListingPageData(slug: string) {
  const listing = getEnrichedListings().find((entry) => entry.slug === slug)

  if (!listing) {
    return null
  }

  return {
    listing,
    category: getCategoryById(listing.categoryId),
    reviews: getReviewsForListing(slug),
    stats: getListingStats(slug),
    similarListings: getEnrichedListings()
      .filter((entry) => entry.categoryId === listing.categoryId && entry.slug !== listing.slug)
      .slice(0, 3),
  }
}

export async function getAdminDashboardData() {
  const enrichedListings = getEnrichedListings()
  const approvedReviewsToday = reviews.filter((review) => review.date === "2026-03-20")

  return {
    totals: {
      totalListings: listings.length,
      pendingApprovals: listings.filter((listing) => listing.status === "Pending").length,
      newReviewsToday: approvedReviewsToday.length,
      featuredUpgradeRevenue: 4820,
    },
    listingsByCategory: categories.map((category) => ({
      name: category.name,
      value: listings.filter((listing) => listing.categoryId === category.id).length,
    })),
    listings: enrichedListings,
    reviews,
  }
}
