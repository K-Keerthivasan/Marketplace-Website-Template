import { cn } from "@/lib/utils"

type MarketplaceIconProps = {
  name: string
  className?: string
}

export function MarketplaceIcon({ name, className }: MarketplaceIconProps) {
  const sharedProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("size-5", className),
  }

  switch (name) {
    case "building":
      return (
        <svg {...sharedProps}>
          <path d="M4 21V7l8-4 8 4v14" />
          <path d="M9 21v-6h6v6" />
          <path d="M8 10h.01M12 10h.01M16 10h.01M8 13h.01M16 13h.01" />
        </svg>
      )
    case "spark":
      return (
        <svg {...sharedProps}>
          <path d="m12 2 1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2Z" />
          <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
          <path d="m5 15 .6 1.6L7.2 17l-1.6.6L5 19.2l-.6-1.6L2.8 17l1.6-.4L5 15Z" />
        </svg>
      )
    case "fork":
      return (
        <svg {...sharedProps}>
          <path d="M8 3v7" />
          <path d="M5 3v4a3 3 0 0 0 6 0V3" />
          <path d="M8 10v11" />
          <path d="M16 3v18" />
          <path d="M16 3c2.2 0 4 1.8 4 4v2h-4" />
        </svg>
      )
    case "camera":
      return (
        <svg {...sharedProps}>
          <path d="M4 8h4l2-3h4l2 3h4v11H4Z" />
          <circle cx="12" cy="13.5" r="3.5" />
        </svg>
      )
    case "ticket":
      return (
        <svg {...sharedProps}>
          <path d="M4 8.5A2.5 2.5 0 0 0 4 15.5V19h16v-3.5a2.5 2.5 0 0 1 0-7V5H4Z" />
          <path d="M10 5v14" />
        </svg>
      )
    case "bolt":
      return (
        <svg {...sharedProps}>
          <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" />
        </svg>
      )
    case "bag":
      return (
        <svg {...sharedProps}>
          <path d="M6 8h12l-1 12H7L6 8Z" />
          <path d="M9 9V7a3 3 0 1 1 6 0v2" />
        </svg>
      )
    case "moon":
      return (
        <svg {...sharedProps}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
        </svg>
      )
    case "search":
      return (
        <svg {...sharedProps}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      )
    case "map":
      return (
        <svg {...sharedProps}>
          <path d="m9 18-5 2V6l5-2 6 2 5-2v14l-5 2-6-2Z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      )
    default:
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}
