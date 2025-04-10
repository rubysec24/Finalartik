import { Metadata } from "next"
import Link from "next/link"
import AdminShell from "@/app/admin/components/AdminShell"

export const metadata: Metadata = {
  title: "Kurmay Yayınları - Yönetim Paneli",
  description: "Kurmay Yayınları içerik yönetim sistemi.",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  )
} 