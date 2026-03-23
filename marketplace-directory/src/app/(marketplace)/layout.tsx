import { PublicShell } from "@/components/marketplace/public-shell"

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PublicShell>{children}</PublicShell>
}
