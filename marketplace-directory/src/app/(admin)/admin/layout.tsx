import { AdminShell } from "@/components/marketplace/admin-shell"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShell>{children}</AdminShell>
}
