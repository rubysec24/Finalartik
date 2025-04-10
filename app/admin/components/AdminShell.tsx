"use client"

import { MainNav } from "@/app/admin/components/MainNav"
import { UserNav } from "@/app/admin/components/UserNav"
import { ThemeToggle } from "@/app/admin/components/ThemeToggle"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Login sayfasında mıyız?
  const isLoginPage = pathname === "/admin/login"
  
  // Login sayfasında sadece içeriği göster
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Admin panelini göster
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4">
        <div className="mb-8">
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Kurmay Yayınları</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">Yönetim Paneli</p>
        </div>
        <MainNav />
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <header className="border-b">
          <div className="h-16 flex items-center px-6 gap-4 justify-end">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
} 