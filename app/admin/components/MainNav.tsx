"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Package,
  Store,
  Newspaper,
  BookOpen,
  Smartphone,
  Settings
} from "lucide-react"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Home className="mr-2 h-4 w-4" />,
      active: pathname === "/admin",
    },
    {
      name: "Ürünler",
      href: "/admin/products",
      icon: <Package className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/products",
    },
    {
      name: "Bayiler",
      href: "/admin/dealers",
      icon: <Store className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/dealers",
    },
    {
      name: "Dijital İçerikler",
      href: "/admin/digital",
      icon: <Smartphone className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/digital",
    },
    {
      name: "Yayınlar",
      href: "/admin/publications",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/publications",
    },
    {
      name: "Uygulamalar",
      href: "/admin/applications",
      icon: <Smartphone className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/applications",
    },
    {
      name: "Ayarlar",
      href: "/admin/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <div className="flex flex-col w-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              item.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
} 