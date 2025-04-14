"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save } from "lucide-react"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    
    // Simüle edilmiş kaydetme işlemi
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      
      // Başarı mesajını birkaç saniye sonra kaldır
      setTimeout(() => setSuccess(false), 3000)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground mt-1">
          Hesap ve site ayarlarını buradan yönetebilirsiniz.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="password">Şifre</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="site">Site Ayarları</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>
                Hesap bilgilerinizi güncelleyin.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">İsim</Label>
                  <Input id="name" defaultValue="Admin Kullanıcı" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" defaultValue="admin@kurmay.com.tr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Ünvan</Label>
                  <Input id="title" defaultValue="Yönetici" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Değişiklikleri Kaydet
                    </>
                  )}
                </Button>
                {success && (
                  <p className="ml-4 text-sm text-green-600">Değişiklikler başarıyla kaydedildi!</p>
                )}
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>
                Hesabınızın şifresini güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Mevcut Şifre</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">Yeni Şifre</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Yeni Şifre (Tekrar)</Label>
                <Input id="confirm" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Şifreyi Güncelle</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Hangi bildirimleri almak istediğinizi yapılandırın.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Yeni İçerik Bildirimleri</p>
                  <p className="text-sm text-muted-foreground">Yeni içerik eklendiğinde e-posta alın.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Güvenlik Uyarıları</p>
                  <p className="text-sm text-muted-foreground">Hesabınıza yeni bir giriş olduğunda bildirim alın.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Bayi Bildirimleri</p>
                  <p className="text-sm text-muted-foreground">Yeni bayi eklendiğinde bildirim alın.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Tercihleri Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Ayarları</CardTitle>
              <CardDescription>
                Sitenin genel ayarlarını yapılandırın.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-title">Site Başlığı</Label>
                <Input id="site-title" defaultValue="Kurmay Yayınları" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Açıklaması</Label>
                <Input id="site-description" defaultValue="Kurmay Yayınları resmi web sitesi" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Bakım Modu</p>
                  <p className="text-sm text-muted-foreground">Siteyi bakım moduna alın.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Ayarları Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 