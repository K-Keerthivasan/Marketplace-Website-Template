import { cn } from "@/lib/utils"

type StarRatingProps = {
  rating: number
  className?: string
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((value) => (
        <svg
          key={value}
          viewBox="0 0 20 20"
          className={cn(
            "size-4",
            rating >= value ? "fill-yellow-300 text-yellow-300" : "fill-yellow-100 text-yellow-100"
          )}
        >
          <path d="m10 2.5 2.3 4.7 5.2.8-3.7 3.7.9 5.2-4.7-2.5-4.7 2.5.9-5.2L2.5 8l5.2-.8L10 2.5Z" />
        </svg>
      ))}
    </div>
  )
}
