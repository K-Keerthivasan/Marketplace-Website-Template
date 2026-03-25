export type Category = {
  id: string
  name: string
  description: string
  icon: string
  accent: string
  listingCount: number
}

export type ListingStatus = "Pending" | "Approved" | "Rejected"

export type Listing = {
  id: number
  slug: string
  name: string
  vendorName: string
  categoryId: string
  city: string
  neighborhood: string
  locationLabel: string
  tier: "Starter" | "Growth" | "Premium"
  priceLabel: string
  startingPrice: number
  shortDescription: string
  about: string
  services: string[]
  tags: string[]
  featured: boolean
  trending: boolean
  verified: boolean
  imageSrc: string
  imageAlt: string
  heroClassName: string
  heroBadge: string
  responseTime: string
  status: ListingStatus
  flagCount: number
}

export type Review = {
  id: number
  listingSlug: string
  reviewer: string
  rating: number
  title: string
  content: string
  date: string
  reportCount: number
  status: "Approved" | "Pending" | "Rejected"
}

export const categories: Category[] = [
  {
    id: "coworking",
    name: "Coworking",
    description: "Studios, meeting hubs, and flexible workspaces.",
    icon: "building",
    accent: "from-indigo-600 to-indigo-400",
    listingCount: 3,
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Fitness, recovery, and self-care experiences.",
    icon: "spark",
    accent: "from-coral-500 to-yellow-300",
    listingCount: 3,
  },
  {
    id: "dining",
    name: "Dining",
    description: "Modern cafes, food halls, and private dining spots.",
    icon: "fork",
    accent: "from-yellow-300 to-coral-400",
    listingCount: 3,
  },
  {
    id: "creative",
    name: "Creative Services",
    description: "Studios, production teams, and branding experts.",
    icon: "camera",
    accent: "from-indigo-500 to-coral-400",
    listingCount: 3,
  },
]

export const listings: Listing[] = [
  {
    id: 1,
    slug: "northstar-collective",
    name: "Northstar Collective",
    vendorName: "Northstar Spaces",
    categoryId: "coworking",
    city: "Toronto",
    neighborhood: "King West",
    locationLabel: "Toronto, ON",
    tier: "Premium",
    priceLabel: "$39 / day",
    startingPrice: 39,
    shortDescription: "Sunlit desks, founder events, and podcast booths for product teams.",
    about:
      "Northstar Collective is a polished coworking hub built for early-stage founders, remote operators, and lean agency teams that want energy without chaos.",
    services: ["Flexible desks", "Soundproof podcast booths", "Event lounge", "Guest passes"],
    tags: ["Startups", "Events", "Podcast"],
    featured: true,
    trending: true,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/12903182/pexels-photo-12903182.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Coworking team gathered around a laptop in a bright office",
    heroClassName: "from-indigo-700 via-indigo-500 to-yellow-300",
    heroBadge: "Top rated workspace",
    responseTime: "Replies in 18 minutes",
    status: "Approved",
    flagCount: 0,
  },
  {
    id: 2,
    slug: "harbour-house-workclub",
    name: "Harbour House Workclub",
    vendorName: "Harbour House",
    categoryId: "coworking",
    city: "Vancouver",
    neighborhood: "Gastown",
    locationLabel: "Vancouver, BC",
    tier: "Growth",
    priceLabel: "$420 / month",
    startingPrice: 420,
    shortDescription: "Design-forward workspace with meeting suites and founder dinners.",
    about:
      "Harbour House Workclub blends private meeting rooms, waterfront views, and curated community programming for hybrid teams.",
    services: ["Dedicated desks", "Boardroom credits", "Member breakfast", "Virtual office"],
    tags: ["Hybrid teams", "Boardrooms", "Community"],
    featured: true,
    trending: false,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/15543038/pexels-photo-15543038.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Creative team meeting around a boardroom table",
    heroClassName: "from-slate-900 via-indigo-700 to-indigo-400",
    heroBadge: "Featured vendor",
    responseTime: "Replies in 42 minutes",
    status: "Approved",
    flagCount: 1,
  },
  {
    id: 3,
    slug: "signal-yard-studios",
    name: "Signal Yard Studios",
    vendorName: "Signal Yard",
    categoryId: "coworking",
    city: "Montreal",
    neighborhood: "Mile End",
    locationLabel: "Montreal, QC",
    tier: "Starter",
    priceLabel: "$28 / day",
    startingPrice: 28,
    shortDescription: "Creative desks, warehouse ceilings, and a maker lab for prototyping.",
    about:
      "Signal Yard is a scrappy-but-polished maker workspace where freelancers, product teams, and visual creators can prototype, host, and collaborate.",
    services: ["Hot desks", "Maker lab", "Photo bay", "Late access"],
    tags: ["Makers", "Freelancers", "Photo"],
    featured: false,
    trending: true,
    verified: false,
    imageSrc: "https://images.pexels.com/photos/33714895/pexels-photo-33714895.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Studio team seated in a photo production space",
    heroClassName: "from-indigo-600 via-slate-800 to-coral-400",
    heroBadge: "Rising fast",
    responseTime: "Replies in 1 hour",
    status: "Pending",
    flagCount: 2,
  },
  {
    id: 4,
    slug: "sunset-social-club",
    name: "Sunset Social Club",
    vendorName: "Sunset Wellness",
    categoryId: "wellness",
    city: "Toronto",
    neighborhood: "Ossington",
    locationLabel: "Toronto, ON",
    tier: "Premium",
    priceLabel: "$95 / session",
    startingPrice: 95,
    shortDescription: "Recovery studio with infrared, guided stretch, and social wellness nights.",
    about:
      "Sunset Social Club is a premium wellness lounge combining recovery rituals, bodywork sessions, and members-only community events.",
    services: ["Infrared sauna", "Cold plunge", "Stretch therapy", "Wellness memberships"],
    tags: ["Recovery", "Membership", "Sauna"],
    featured: true,
    trending: true,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/11036673/pexels-photo-11036673.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Pilates and wellness studio with reformer equipment",
    heroClassName: "from-coral-500 via-yellow-300 to-white",
    heroBadge: "Most saved this week",
    responseTime: "Replies in 12 minutes",
    status: "Approved",
    flagCount: 0,
  },
  {
    id: 5,
    slug: "bluehour-recovery",
    name: "Bluehour Recovery",
    vendorName: "Bluehour",
    categoryId: "wellness",
    city: "Calgary",
    neighborhood: "Beltline",
    locationLabel: "Calgary, AB",
    tier: "Growth",
    priceLabel: "$129 / month",
    startingPrice: 129,
    shortDescription: "Performance recovery memberships for athletes, founders, and busy teams.",
    about:
      "Bluehour Recovery packages science-backed recovery tools into a calm urban studio with clear membership tiers and fast booking.",
    services: ["Compression therapy", "Contrast suite", "Nutrition consults", "Team plans"],
    tags: ["Athletes", "Memberships", "Team plans"],
    featured: false,
    trending: false,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/11036673/pexels-photo-11036673.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Wellness recovery studio with fitness equipment",
    heroClassName: "from-indigo-800 via-indigo-500 to-cyan-300",
    heroBadge: "Staff pick",
    responseTime: "Replies in 36 minutes",
    status: "Approved",
    flagCount: 0,
  },
  {
    id: 6,
    slug: "kindred-pilates-loft",
    name: "Kindred Pilates Loft",
    vendorName: "Kindred Movement",
    categoryId: "wellness",
    city: "Ottawa",
    neighborhood: "ByWard Market",
    locationLabel: "Ottawa, ON",
    tier: "Starter",
    priceLabel: "$34 / class",
    startingPrice: 34,
    shortDescription: "Boutique reformer sessions with clean interiors and small class sizes.",
    about:
      "Kindred Pilates Loft offers small reformer classes, posture-focused private sessions, and warm hospitality for newcomers.",
    services: ["Reformer classes", "Private sessions", "Beginner series", "Corporate packages"],
    tags: ["Pilates", "Private sessions", "Beginner friendly"],
    featured: false,
    trending: true,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/11036673/pexels-photo-11036673.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Boutique pilates studio lined with reformers",
    heroClassName: "from-yellow-200 via-coral-300 to-indigo-500",
    heroBadge: "New on the platform",
    responseTime: "Replies in 50 minutes",
    status: "Pending",
    flagCount: 0,
  },
  {
    id: 7,
    slug: "market-street-kitchen",
    name: "Market Street Kitchen",
    vendorName: "Market Street Hospitality",
    categoryId: "dining",
    city: "Toronto",
    neighborhood: "St. Lawrence",
    locationLabel: "Toronto, ON",
    tier: "Growth",
    priceLabel: "$22 avg spend",
    startingPrice: 22,
    shortDescription: "Bustling all-day spot with chef specials, takeout windows, and team platters.",
    about:
      "Market Street Kitchen is a polished neighbourhood dining room with daily specials, brunch energy, and group-friendly menus.",
    services: ["Reservations", "Catering platters", "Private dinners", "Takeout"],
    tags: ["Brunch", "Catering", "Private dining"],
    featured: true,
    trending: true,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/30782662/pexels-photo-30782662.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Warm restaurant interior with booths and tables",
    heroClassName: "from-yellow-300 via-coral-400 to-indigo-700",
    heroBadge: "Trending dining pick",
    responseTime: "Replies in 22 minutes",
    status: "Approved",
    flagCount: 1,
  },
  {
    id: 8,
    slug: "luma-espresso-bar",
    name: "Luma Espresso Bar",
    vendorName: "Luma Hospitality",
    categoryId: "dining",
    city: "Vancouver",
    neighborhood: "Mount Pleasant",
    locationLabel: "Vancouver, BC",
    tier: "Starter",
    priceLabel: "$14 avg spend",
    startingPrice: 14,
    shortDescription: "Bright espresso bar for quick meetings, pastries, and polished coffee service.",
    about:
      "Luma Espresso Bar is a premium-casual cafe designed for remote work meetups, polished pastry runs, and strong recurring regular traffic.",
    services: ["Coffee bar", "Pastries", "Office catering", "Wholesale beans"],
    tags: ["Cafe", "Meetups", "Pastries"],
    featured: false,
    trending: true,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/13972514/pexels-photo-13972514.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Cozy cafe interior with window light",
    heroClassName: "from-white via-yellow-200 to-coral-300",
    heroBadge: "Always busy",
    responseTime: "Replies in 28 minutes",
    status: "Approved",
    flagCount: 0,
  },
  {
    id: 9,
    slug: "ember-private-dining",
    name: "Ember Private Dining",
    vendorName: "Ember Group",
    categoryId: "dining",
    city: "Montreal",
    neighborhood: "Old Montreal",
    locationLabel: "Montreal, QC",
    tier: "Premium",
    priceLabel: "$120 / guest",
    startingPrice: 120,
    shortDescription: "Private chef tasting room for launches, investor dinners, and premium events.",
    about:
      "Ember Private Dining is a hidden tasting room that hosts polished brand dinners, executive celebrations, and intimate press moments.",
    services: ["Chef tasting menus", "Private buyouts", "Sommelier pairings", "Event planning"],
    tags: ["Fine dining", "Events", "Tasting menu"],
    featured: true,
    trending: false,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/30782662/pexels-photo-30782662.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Upscale private dining room with leather seating",
    heroClassName: "from-slate-950 via-coral-500 to-yellow-300",
    heroBadge: "Premium experience",
    responseTime: "Replies in 2 hours",
    status: "Approved",
    flagCount: 0,
  },
  {
    id: 10,
    slug: "atlas-brand-studio",
    name: "Atlas Brand Studio",
    vendorName: "Atlas Creative",
    categoryId: "creative",
    city: "Toronto",
    neighborhood: "Liberty Village",
    locationLabel: "Toronto, ON",
    tier: "Premium",
    priceLabel: "$2,400 / project",
    startingPrice: 2400,
    shortDescription: "Brand strategy, motion systems, and launch campaigns for ambitious businesses.",
    about:
      "Atlas Brand Studio helps fast-growing businesses tighten positioning, refresh visual identity, and ship campaign assets without agency bloat.",
    services: ["Brand strategy", "Identity systems", "Motion design", "Launch campaigns"],
    tags: ["Branding", "Motion", "Launch"],
    featured: true,
    trending: true,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/15543038/pexels-photo-15543038.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Creative strategy team collaborating in a studio office",
    heroClassName: "from-indigo-900 via-indigo-600 to-coral-400",
    heroBadge: "Featured agency",
    responseTime: "Replies in 3 hours",
    status: "Approved",
    flagCount: 0,
  },
  {
    id: 11,
    slug: "flicker-content-lab",
    name: "Flicker Content Lab",
    vendorName: "Flicker Media",
    categoryId: "creative",
    city: "Halifax",
    neighborhood: "Downtown",
    locationLabel: "Halifax, NS",
    tier: "Growth",
    priceLabel: "$780 / shoot day",
    startingPrice: 780,
    shortDescription: "Short-form content production for hospitality, retail, and product launches.",
    about:
      "Flicker Content Lab specializes in punchy social content, nimble production crews, and repeatable creative systems for active brands.",
    services: ["UGC packages", "Shoot days", "Editing retainer", "Product photography"],
    tags: ["Content", "Photo", "Video"],
    featured: false,
    trending: false,
    verified: false,
    imageSrc: "https://images.pexels.com/photos/33714895/pexels-photo-33714895.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Content production team in a bright studio",
    heroClassName: "from-coral-500 via-indigo-500 to-indigo-900",
    heroBadge: "Fast turnaround",
    responseTime: "Replies in 5 hours",
    status: "Rejected",
    flagCount: 4,
  },
  {
    id: 12,
    slug: "commonframe-productions",
    name: "Commonframe Productions",
    vendorName: "Commonframe",
    categoryId: "creative",
    city: "Edmonton",
    neighborhood: "Ice District",
    locationLabel: "Edmonton, AB",
    tier: "Starter",
    priceLabel: "$450 / session",
    startingPrice: 450,
    shortDescription: "Lean production support for podcasts, testimonials, and campaign cutdowns.",
    about:
      "Commonframe Productions gives growing businesses a reliable production partner for podcast sets, founder stories, and evergreen video assets.",
    services: ["Podcast recording", "Interview production", "Editing", "Studio rental"],
    tags: ["Podcast", "Interviews", "Studio"],
    featured: false,
    trending: true,
    verified: true,
    imageSrc: "https://images.pexels.com/photos/32007691/pexels-photo-32007691.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Podcast recording setup with microphones on a table",
    heroClassName: "from-indigo-700 via-yellow-300 to-coral-400",
    heroBadge: "High intent leads",
    responseTime: "Replies in 48 minutes",
    status: "Pending",
    flagCount: 1,
  },
]

export const reviews: Review[] = [
  { id: 1, listingSlug: "northstar-collective", reviewer: "Avery L.", rating: 5, title: "Exactly the right founder energy", content: "We booked a week for our product sprint and ended up extending. The booths, hosts, and event programming all felt sharp.", date: "2026-03-18", reportCount: 0, status: "Approved" },
  { id: 2, listingSlug: "northstar-collective", reviewer: "Mina P.", rating: 4, title: "Busy in the best way", content: "There is a real sense of momentum here. Coffee line gets crowded at 9am, but the space still runs smoothly.", date: "2026-03-10", reportCount: 0, status: "Approved" },
  { id: 3, listingSlug: "harbour-house-workclub", reviewer: "Jordan K.", rating: 5, title: "Premium without being stiff", content: "Used the boardroom for investor meetings and it landed well. Staff were attentive and the space photographed beautifully.", date: "2026-03-15", reportCount: 0, status: "Approved" },
  { id: 4, listingSlug: "harbour-house-workclub", reviewer: "Leah S.", rating: 4, title: "Great hybrid setup", content: "Strong amenities and very polished common spaces. I would love a few more private call rooms during peak hours.", date: "2026-03-02", reportCount: 0, status: "Approved" },
  { id: 5, listingSlug: "signal-yard-studios", reviewer: "Theo C.", rating: 4, title: "Creative teams will like this", content: "The maker lab and photo bay are the draw. It feels more raw than premium, but that is part of the appeal.", date: "2026-03-12", reportCount: 1, status: "Approved" },
  { id: 6, listingSlug: "signal-yard-studios", reviewer: "Nadia R.", rating: 5, title: "Hidden gem for production days", content: "We shot a content sprint here and had enough room for props, editing, and meetings without shuffling around.", date: "2026-03-06", reportCount: 0, status: "Approved" },
  { id: 7, listingSlug: "sunset-social-club", reviewer: "Bianca T.", rating: 5, title: "Worth the premium", content: "Recovery rooms are spotless and the social wellness nights feel elevated instead of gimmicky. Staff is exceptional.", date: "2026-03-20", reportCount: 0, status: "Approved" },
  { id: 8, listingSlug: "sunset-social-club", reviewer: "Chris W.", rating: 5, title: "Members actually show up", content: "The club feels alive and social. Great blend of recovery tools with enough hospitality to make you stay longer.", date: "2026-03-11", reportCount: 0, status: "Approved" },
  { id: 9, listingSlug: "bluehour-recovery", reviewer: "Sonia M.", rating: 4, title: "Very easy membership model", content: "We signed our small team up after one visit. Good equipment mix and clear front desk communication.", date: "2026-03-14", reportCount: 0, status: "Approved" },
  { id: 10, listingSlug: "bluehour-recovery", reviewer: "Gabe H.", rating: 4, title: "Efficient and polished", content: "Not flashy, just well-run. Booking flow is easy and the contrast suite is consistently clean.", date: "2026-03-04", reportCount: 0, status: "Approved" },
  { id: 11, listingSlug: "kindred-pilates-loft", reviewer: "Emma F.", rating: 5, title: "Warm team, strong instruction", content: "The beginner reformer series felt welcoming and never watered down. Small classes are a real advantage here.", date: "2026-03-17", reportCount: 0, status: "Approved" },
  { id: 12, listingSlug: "kindred-pilates-loft", reviewer: "Olivia N.", rating: 4, title: "Would book again", content: "Beautiful room and clear teaching. Only downside was the waitlist for the after-work time slots.", date: "2026-03-07", reportCount: 0, status: "Pending" },
  { id: 13, listingSlug: "market-street-kitchen", reviewer: "Dylan V.", rating: 5, title: "Reliable group dinner spot", content: "Hosted a client dinner for eight and the pacing was excellent. The room felt energetic without being loud.", date: "2026-03-19", reportCount: 0, status: "Approved" },
  { id: 14, listingSlug: "market-street-kitchen", reviewer: "Priya J.", rating: 4, title: "Great brunch traffic", content: "It feels active and local. Food came out quickly and the private room setup was smoother than expected.", date: "2026-03-09", reportCount: 0, status: "Approved" },
  { id: 15, listingSlug: "luma-espresso-bar", reviewer: "Caleb B.", rating: 5, title: "Perfect quick meetup cafe", content: "Fast service, bright seating, and surprisingly strong pastries. We now use it for recurring team meetups.", date: "2026-03-13", reportCount: 0, status: "Approved" },
  { id: 16, listingSlug: "luma-espresso-bar", reviewer: "Nina O.", rating: 4, title: "Consistently busy", content: "You can tell it has real regulars. Coffee is sharp and the cafe still feels polished when the rush hits.", date: "2026-03-01", reportCount: 0, status: "Approved" },
  { id: 17, listingSlug: "ember-private-dining", reviewer: "Marcus E.", rating: 5, title: "A memorable launch dinner", content: "We used Ember for a founder dinner and every detail landed. Service and storytelling were both very strong.", date: "2026-03-08", reportCount: 0, status: "Approved" },
  { id: 18, listingSlug: "atlas-brand-studio", reviewer: "Harper Q.", rating: 5, title: "Strategy and execution both delivered", content: "Atlas helped sharpen our positioning and built a launch kit we could actually use. Strong senior team.", date: "2026-03-16", reportCount: 0, status: "Approved" },
  { id: 19, listingSlug: "flicker-content-lab", reviewer: "Reese G.", rating: 3, title: "Fast, but uneven", content: "Turnaround was quick, but the first delivery needed more revisions than we expected for a repeatable package.", date: "2026-03-03", reportCount: 3, status: "Rejected" },
  { id: 20, listingSlug: "commonframe-productions", reviewer: "Talia D.", rating: 4, title: "Good partner for podcasts", content: "Their team made the session easy to run and the cutdowns were on-brand. Strong value for the price.", date: "2026-03-05", reportCount: 0, status: "Approved" },
]

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId)
}

export function getReviewsForListing(slug: string) {
  return reviews.filter((review) => review.listingSlug === slug)
}

export function getListingStats(slug: string) {
  const listingReviews = getReviewsForListing(slug)

  if (listingReviews.length === 0) {
    return {
      averageRating: 0,
      reviewCount: 0,
      breakdown: [5, 4, 3, 2, 1].map((star) => ({ star, count: 0 })),
    }
  }

  const reviewCount = listingReviews.length
  const averageRating =
    Math.round(
      (listingReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount) * 10
    ) / 10

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: listingReviews.filter((review) => review.rating === star).length,
  }))

  return { averageRating, reviewCount, breakdown }
}

export function getEnrichedListings() {
  return listings.map((listing) => {
    const category = getCategoryById(listing.categoryId)
    const stats = getListingStats(listing.slug)

    return {
      ...listing,
      categoryName: category?.name ?? "Marketplace",
      categoryDescription: category?.description ?? "",
      averageRating: stats.averageRating,
      reviewCount: stats.reviewCount,
      ratingBucket:
        stats.averageRating >= 4.5 ? "4.5+" : stats.averageRating >= 4 ? "4.0+" : "All",
    }
  })
}
