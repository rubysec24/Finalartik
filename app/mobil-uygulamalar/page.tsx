"use client";

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Smartphone,
  Download,
  ExternalLink,
  Check,
  Star,
  Loader2,
  Phone,
  Globe,
  BadgeCheck
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Uygulama tipi
type ApplicationItem = {
  id: number
  title: string
  description: string
  platforms: string[]
  features: string[]
  category: string
  image: string
  appStoreUrl?: string
  playStoreUrl?: string
  rating?: number
}

export default function MobileAppsPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Uygulamaları API'den çek
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        
        // Uygulamaları çek
        const response = await fetch('/api/db?type=applications')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setApplications(data)
        
        // Dijital içeriklerden "apps" kategorisine sahip olanları çek
        const digitalResponse = await fetch('/api/db?type=digital')
        
        if (digitalResponse.ok) {
          const digitalData = await digitalResponse.json()
          const appDigitalItems = digitalData
            .filter((item: any) => item.category === "apps")
            .map((item: any) => ({
              ...item,
              // Digital içerikler applications şemasına uygun değilse ek alanlar ekle
              appStoreUrl: item.appStoreUrl || "",
              playStoreUrl: item.playStoreUrl || ""
            }))
          
          // İki veri kaynağını birleştir
          setApplications(prevApps => [...prevApps, ...appDigitalItems])
        }
        
        setError(null)
      } catch (err) {
        console.error("Uygulama verisi çekme hatası:", err)
        setError("Uygulamalar yüklenirken bir hata oluştu.")
        // Demo içeriği kullan
        setApplications([
          {
            id: 1,
            title: "Kurmay Dijital Kütüphane",
            description: "Tüm dijital kitaplarımıza tek bir uygulamadan erişim. Kitaplarınızı indirin, notlar alın, vurgulayın ve her yerden erişin.",
            image: "/placeholder.svg?height=300&width=400",
            platforms: ["iOS", "Android", "Web"],
            features: ["E-kitaplar", "Sesli kitaplar", "Notlar", "Vurgulamalar", "Çevrimdışı okuma", "Senkronizasyon"],
            category: "apps",
            rating: 4.8,
            appStoreUrl: "#",
            playStoreUrl: "#"
          },
          {
            id: 2,
            title: "Kurmay Soru Bankası",
            description: "Binlerce test sorusu ve detaylı çözümlere erişim. Kişiselleştirilmiş çalışma planları ve performans analizi ile başarınızı artırın.",
            image: "/placeholder.svg?height=300&width=400",
            platforms: ["iOS", "Android"],
            features: ["Seviye bazlı sorular", "Video çözümler", "İstatistikler", "Bireysel çalışma planları", "Performans analizi", "Zamanlı testler"],
            category: "apps",
            rating: 4.7,
            appStoreUrl: "#",
            playStoreUrl: "#"
          },
          {
            id: 3,
            title: "LGS Hazırlık",
            description: "LGS sınavına hazırlık için özel olarak tasarlanmış uygulamamız ile tüm derslere tek bir uygulamadan erişin.",
            image: "/placeholder.svg?height=300&width=400",
            platforms: ["iOS", "Android", "Web"],
            features: ["Tüm dersler", "Konu anlatımları", "Deneme sınavları", "Soru çözümleri", "Performans takibi", "Hedef belirleme"],
            category: "apps",
            rating: 4.9,
            appStoreUrl: "#",
            playStoreUrl: "#"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  // Platform ikonunu belirle
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'android':
        return <Smartphone className="w-4 h-4 mr-1" />
      case 'ios':
        return <Phone className="w-4 h-4 mr-1" />
      case 'web':
        return <Globe className="w-4 h-4 mr-1" />
      default:
        return <Smartphone className="w-4 h-4 mr-1" />
    }
  }

  // İndirme butonunu belirle
  const getDownloadButton = (app: ApplicationItem) => {
    const hasAppStore = app.appStoreUrl && app.appStoreUrl !== "#" && app.appStoreUrl !== ""
    const hasPlayStore = app.playStoreUrl && app.playStoreUrl !== "#" && app.playStoreUrl !== ""
    
    if (hasAppStore && hasPlayStore) {
      return (
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-4 w-4" /> App Store
            </a>
          </Button>
          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white" asChild>
            <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer">
              <Smartphone className="mr-2 h-4 w-4" /> Play Store
            </a>
          </Button>
        </div>
      )
    } else if (hasAppStore) {
      return (
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
            <Phone className="mr-2 h-4 w-4" /> App Store'dan İndir
          </a>
        </Button>
      )
    } else if (hasPlayStore) {
      return (
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" asChild>
          <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer">
            <Smartphone className="mr-2 h-4 w-4" /> Play Store'dan İndir
          </a>
        </Button>
      )
    } else {
      return (
        <Button className="w-full bg-primary hover:bg-primary/90">
          <Download className="mr-2 h-4 w-4" /> İncele
        </Button>
      )
    }
  }

  // Yıldız derecelendirmesini oluştur
  const renderRating = (rating: number = 5) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
          />
        ))}
        <span className="text-sm ml-1 text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="section-title section-title-center inline-block">Mobil Uygulamalarımız</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-8 max-w-3xl mx-auto">
            Eğitim deneyimini mobil cihazlara taşıyan kullanıcı dostu uygulama çözümlerimiz ile
            öğrenciler istedikleri her an ve her yerde içeriklere erişebilirler
          </p>
        </div>

        {/* Mobil Uygulamalar Listesi */}
        <div className="mb-12">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-center">
              {error} Lütfen daha sonra tekrar deneyiniz.
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              Henüz uygulama bulunmamaktadır.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {applications.map((app) => (
                <Card key={app.id} className="overflow-hidden group hover:shadow-lg transition-shadow border dark:bg-gray-800 dark:border-gray-700">
                  <div className="relative h-48">
                    <Image 
                      src={app.image || "/placeholder.svg?height=300&width=400"} 
                      alt={app.title} 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/80 text-primary">Mobil Uygulama</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl flex justify-between items-start">
                      <span>{app.title}</span>
                      {app.rating && (
                        <div className="flex-shrink-0">{renderRating(app.rating)}</div>
                      )}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{app.description}</CardDescription>
              </CardHeader>
              <CardContent>
                    <div className="space-y-4">                          
                        <div>
                        <span className="text-sm font-medium">Platformlar:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {app.platforms.map(platform => (
                            <div key={platform} className="flex items-center text-xs px-2 py-1 rounded-full bg-muted dark:bg-gray-700">
                              {getPlatformIcon(platform)}
                              {platform}
                          </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Özellikler:</span>
                        <div className="grid grid-cols-2 gap-1 mt-1">
                          {app.features.slice(0, 6).map(feature => (
                            <div key={feature} className="flex items-center text-xs">
                              <BadgeCheck className="h-3 w-3 text-primary mr-1 flex-shrink-0" />
                              <span className="truncate">{feature}</span>
                    </div>
                  ))}
                          {app.features.length > 6 && (
                            <div className="flex items-center text-xs text-muted-foreground col-span-2">
                              + {app.features.length - 6} daha fazla özellik
                </div>
                          )}
                        </div>
                      </div>
                </div>
              </CardContent>
                  <CardFooter>
                    {getDownloadButton(app)}
                  </CardFooter>
            </Card>
              ))}
            </div>
          )}
            </div>
          </div>
        </div>
  )
} 