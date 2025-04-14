import { usePathname } from "next/navigation"
import {
  Blocks,
  Building2,
  CalendarDays,
  CircleUser,
  LayoutDashboard,
  ListTodo, 
  Mail,
  Map,
  MessageSquare,
  Phone,
  FileText, 
  Newspaper,
  Smartphone,
} from "lucide-react"

// ... existing code ...

export function SideNav() {
  const pathname = usePathname()

  const routes = [
    // ... existing code ...
    {
      href: "/admin/applications",
      icon: <Blocks className="h-5 w-5 text-muted-foreground" />,
      text: "Başvurular",
    },
    {
      href: "/admin/contacts",
      icon: <Phone className="h-5 w-5 text-muted-foreground" />,
      text: "İletişim Bilgileri",
    },
    {
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />,
      text: "Mesajlar",
    },
    {
      href: "/admin/dealers",
      icon: <Building2 className="h-5 w-5 text-muted-foreground" />,
      text: "Bayiler",
    },
    {
      href: "/admin/digital",
      icon: <Smartphone className="h-5 w-5 text-muted-foreground" />,
      text: "Dijital İçerikler",
    },
    {
      href: "/admin/publications",
      icon: <Newspaper className="h-5 w-5 text-muted-foreground" />,
      text: "Yayınlar",
    },
    {
      href: "/admin/products",
      icon: <FileText className="h-5 w-5 text-muted-foreground" />,
      text: "Ürünler",
    },
    // ... existing code ...
  ]

  // ... existing code ...
}