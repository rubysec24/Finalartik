"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Basit doğrulama
    if (username === "admin" && password === "kurmay123") {
      // Cookie ayarla - sade bir şekilde
      document.cookie = "admin_token=authenticated; path=/; max-age=86400"
      
      // Yönlendirme - daha güvenilir bir yöntem
      window.location.replace("/admin")
    } else {
      setError("Geçersiz kullanıcı adı veya şifre")
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Yönetim Paneli</CardTitle>
          <CardDescription>
            Kurmay Yayınları yönetim paneline giriş yapın
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-white bg-red-500 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input 
                id="username" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Kullanıcı adınızı girin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi girin"
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Demo giriş bilgileri:</p>
              <p>Kullanıcı adı: admin</p>
              <p>Şifre: kurmay123</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Giriş Yapılıyor...
                </>
              ) : (
                "Giriş Yap"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 