"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Users, BookOpen, Smartphone } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    dealers: 0,
    digital: 0,
    publications: 0,
    applications: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // İstatistikleri yükle
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const productsRes = await fetch("/api/db?type=products")
      const dealersRes = await fetch("/api/db?type=dealers")
      const digitalRes = await fetch("/api/db?type=digital")
      const publicationsRes = await fetch("/api/db?type=publications")
      const applicationsRes = await fetch("/api/db?type=applications")

      if (!productsRes.ok || !dealersRes.ok || !digitalRes.ok || !publicationsRes.ok || !applicationsRes.ok) {
        throw new Error("Veri yüklenirken bir hata oluştu")
      }

      const products = await productsRes.json()
      const dealers = await dealersRes.json()
      const digital = await digitalRes.json()
      const publications = await publicationsRes.json()
      const applications = await applicationsRes.json()

      setStats({
        products: products.length,
        dealers: dealers.length,
        digital: digital.length,
        publications: publications.length,
        applications: applications.length
      })
    } catch (error) {
      console.error("İstatistik verileri yüklenirken hata oluştu:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Ürünler",
      value: stats.products,
      description: "Toplam ürün sayısı",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      className: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Bayiler",
      value: stats.dealers,
      description: "Toplam bayi sayısı",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      className: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "Dijital İçerikler",
      value: stats.digital,
      description: "Toplam dijital içerik sayısı",
      icon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
      className: "bg-purple-50 dark:bg-purple-950"
    },
    {
      title: "Yayınlar",
      value: stats.publications,
      description: "Toplam yayın sayısı",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      className: "bg-amber-50 dark:bg-amber-950"
    },
    {
      title: "Uygulamalar",
      value: stats.applications,
      description: "Toplam uygulama sayısı",
      icon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
      className: "bg-red-50 dark:bg-red-950"
    }
  ]

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Hoş geldiniz! Tüm içerik verilerinizi buradan yönetebilirsiniz.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="analytics">İstatistikler</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {statCards.map((card, i) => (
              <Card key={i} className={card.className}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? "..." : card.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Son Eklenen İçerikler</CardTitle>
                <CardDescription>
                  En son eklenen içeriklerin listesi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Yükleniyor...</p>
                ) : (
                  <p className="text-muted-foreground">
                    {stats.products + stats.digital + stats.publications + stats.applications > 0 
                      ? "Son içerikler listeleniyor..." 
                      : "Henüz içerik eklenmemiş."}
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
                <CardDescription>
                  Hızlı erişim için sık kullanılan işlemler.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    - Yeni ürün ekle
                  </p>
                  <p className="text-sm">
                    - Bayi ekle
                  </p>
                  <p className="text-sm">
                    - Dijital içerik ekle
                  </p>
                  <p className="text-sm">
                    - Yayın ekle
                  </p>
                  <p className="text-sm">
                    - Uygulama ekle
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İçerik Dağılımı</CardTitle>
              <CardDescription>
                İçerik tipine göre dağılım bilgileri.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">İstatistikler yükleniyor...</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    Grafik verileri burada gösterilecek.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 