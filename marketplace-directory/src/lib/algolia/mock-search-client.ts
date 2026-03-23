import { getEnrichedListings } from "@/lib/marketplace-data"

type SearchRequest = {
  params?: {
    query?: string
    facetFilters?: Array<string | string[]>
    numericFilters?: Array<string | string[]>
    hitsPerPage?: number
    page?: number
  }
}

function matchesFacetFilters(
  record: Record<string, unknown>,
  facetFilters: Array<string | string[]> = []
) {
  return facetFilters.every((group) => {
    if (Array.isArray(group)) {
      return group.some((filter) => matchesSingleFacet(record, filter))
    }

    return matchesSingleFacet(record, group)
  })
}

function matchesSingleFacet(record: Record<string, unknown>, filter: string) {
  const [attribute, rawValue] = filter.split(":")
  return String(record[attribute] ?? "") === rawValue
}

function matchesNumericFilters(
  record: Record<string, unknown>,
  numericFilters: Array<string | string[]> = []
) {
  return numericFilters.every((group) => {
    if (Array.isArray(group)) {
      return group.some((filter) => matchesSingleNumeric(record, filter))
    }

    return matchesSingleNumeric(record, group)
  })
}

function matchesSingleNumeric(record: Record<string, unknown>, filter: string) {
  const match = filter.match(/^([a-zA-Z0-9_]+)(<=|>=|=|<|>)([0-9.]+)$/)

  if (!match) {
    return true
  }

  const [, attribute, operator, rawValue] = match
  const currentValue = Number(record[attribute] ?? 0)
  const expectedValue = Number(rawValue)

  if (operator === ">=") return currentValue >= expectedValue
  if (operator === "<=") return currentValue <= expectedValue
  if (operator === ">") return currentValue > expectedValue
  if (operator === "<") return currentValue < expectedValue

  return currentValue === expectedValue
}

function getFacets(records: Array<Record<string, unknown>>) {
  const categoryId: Record<string, number> = {}
  const locationLabel: Record<string, number> = {}

  records.forEach((record) => {
    const categoryValue = String(record.categoryId ?? "")
    const locationValue = String(record.locationLabel ?? "")

    categoryId[categoryValue] = (categoryId[categoryValue] ?? 0) + 1
    locationLabel[locationValue] = (locationLabel[locationValue] ?? 0) + 1
  })

  const prices = records.map((record) => Number(record.startingPrice ?? 0))
  const safePrices = prices.length > 0 ? prices : [0]

  return {
    categoryId,
    locationLabel,
    facets_stats: {
      startingPrice: {
        min: Math.min(...safePrices),
        max: Math.max(...safePrices),
        avg: safePrices.reduce((sum, price) => sum + price, 0) / safePrices.length,
        sum: safePrices.reduce((sum, price) => sum + price, 0),
      },
    },
  }
}

export const mockSearchClient: any = {
  async search(requests: SearchRequest[]) {
    const baseRecords = getEnrichedListings().map((listing) => ({
      ...listing,
      objectID: listing.slug,
      searchText: `${listing.name} ${listing.shortDescription} ${listing.tags.join(" ")} ${listing.city} ${listing.neighborhood}`.toLowerCase(),
    }))

    return {
      results: requests.map((request) => {
        const query = request.params?.query?.toLowerCase().trim() ?? ""
        const hitsPerPage = request.params?.hitsPerPage ?? 12
        const page = request.params?.page ?? 0

        const filtered = baseRecords.filter((record) => {
          const matchesQuery = !query || record.searchText.includes(query)
          const matchesFacets = matchesFacetFilters(record, request.params?.facetFilters)
          const matchesNumeric = matchesNumericFilters(record, request.params?.numericFilters)

          return matchesQuery && matchesFacets && matchesNumeric
        })

        const start = page * hitsPerPage
        const end = start + hitsPerPage
        const facets = getFacets(filtered)

        return {
          hits: filtered.slice(start, end),
          nbHits: filtered.length,
          page,
          nbPages: Math.max(1, Math.ceil(filtered.length / hitsPerPage)),
          hitsPerPage,
          processingTimeMS: 3,
          exhaustiveNbHits: true,
          query,
          params: "",
          facets: {
            categoryId: facets.categoryId,
            locationLabel: facets.locationLabel,
          },
          facets_stats: facets.facets_stats,
        }
      }),
    }
  },
}
