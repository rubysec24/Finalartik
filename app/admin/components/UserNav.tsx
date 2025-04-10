"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function UserNav() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: "Admin",
    email: "admin@kurmay.com.tr"
  })
  
  // Kullanıcı bilgilerini localStorage'dan al
  useEffect(() => {
    try {
      const savedUserData = localStorage.getItem("admin_user")
      if (savedUserData) {
        const parsed = JSON.parse(savedUserData)
        setUserData({
          name: parsed.name || "Admin",
          email: parsed.email || "admin@kurmay.com.tr"
        })
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri yüklenirken hata:", error)
    }
  }, [])
  
  // Çıkış yapma işlevi
  const handleLogout = () => {
    try {
      // Cookie'yi temizle
      document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      
      // LocalStorage'ı temizle
      localStorage.removeItem("admin_authenticated")
      localStorage.removeItem("admin_user")
      
      console.log("Çıkış yapılıyor...")
      
      // Login sayfasına yönlendir (doğrudan window.location kullanarak)
      window.location.href = "/admin/login"
    } catch (error) {
      console.error("Çıkış yapma hatası:", error)
      alert("Çıkış yapılırken bir hata oluştu")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src="/admin/avatar.png" alt="Admin" />
            <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = "/admin/settings"}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Ayarlar</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 