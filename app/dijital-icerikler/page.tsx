"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Laptop,
  Download,
  ExternalLink,
  Check,
  Loader2
} from "lucide-react"
import { useRouter } from "next/navigation"

// Dijital içerik tipi
type DigitalItem = {
  id: number
  title: string
  description: string
  platforms: string[]
  features: string[]
  category: string
  image: string
}

export default function DigitalContent() {
  const [digitalContent, setDigitalContent] = useState<DigitalItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Dijital içerikleri API'den çek
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        
        // Dijital içerikleri çek
        const digitalResponse = await fetch('/api/db?type=digital')
        
        if (!digitalResponse.ok) {
          throw new Error(`HTTP error! status: ${digitalResponse.status}`)
        }
        
        const digitalData = await digitalResponse.json()
        setDigitalContent(digitalData)
        
        setError(null)
      } catch (err) {
        console.error("Dijital içerik çekme hatası:", err)
        setError("İçerikler yüklenirken bir hata oluştu.")
        
        // Demo içeriği kullan
        setDigitalContent([
          {
            id: 1,
            title: "Kurmay Dijital İçerik Platformu",
            description: "Tüm eğitim içeriklerimize dijital ortamda erişim sağlayın. İnteraktif alıştırmalar ve zengin içerikler ile öğrenmeyi etkili hale getirin.",
            image: "/placeholder.svg?height=300&width=400",
            platforms: ["Windows", "MacOS", "Web"],
            features: ["İnteraktif alıştırmalar", "Zengin içerikler", "Video dersler", "Ölçme değerlendirme", "Konu anlatımları"],
            category: "digital"
          },
          {
            id: 2,
            title: "Soru Bankası Uygulaması",
            description: "Binlerce test sorusu ve detaylı çözümlere erişim. Kişiselleştirilmiş çalışma planları ve performans analizi ile başarınızı artırın.",
            image: "/placeholder.svg?height=300&width=400",
            platforms: ["Windows", "Web"],
            features: ["Seviye bazlı sorular", "Video çözümler", "İstatistikler", "Bireysel çalışma planları", "Performans analizi"],
            category: "digital"
          },
          {
            id: 3,
            title: "Dijital Sınav Hazırlık",
            description: "Sınavlara hazırlık için özel olarak hazırlanmış dijital içeriklerimiz ile tüm dersleri etkili şekilde çalışın.",
            image: "/placeholder.svg?height=300&width=400",
            platforms: ["Windows", "MacOS", "Web"],
            features: ["Tüm dersler", "Konu anlatımları", "Deneme sınavları", "Soru çözümleri", "Performans takibi"],
            category: "digital"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  // Platform ikonunu belirle
  const getPlatformIcon = () => {
    return <Laptop className="w-4 h-4 mr-1" />
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="section-title section-title-center inline-block">Dijital İçerikler</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-8 max-w-3xl mx-auto">
            Eğitim içeriklerimize dijital ortamda erişim sağlayın. Zengin içerikler ve interaktif uygulamalar ile
            öğrenmeyi daha etkili ve keyifli hale getirin.
          </p>
        </div>

        {/* Sekme navigasyonu */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            size="lg"
            variant="default"
            className="flex items-center gap-2"
          >
            <Laptop className="h-5 w-5" />
            <span>Dijital İçerikler</span>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => router.push('/akilli-tahta')}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-presentation">
              <path d="M2 3h20"></path>
              <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
              <path d="m7 21 5-5 5 5"></path>
            </svg>
            <span>Akıllı Tahta</span>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => router.push('/mobil-uygulamalar')}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
              <path d="M12 18h.01"></path>
            </svg>
            <span>Mobil Uygulamalar</span>
          </Button>
        </div>
        
        {/* Dijital İçerikler Bölümü */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-center">
            {error} Lütfen daha sonra tekrar deneyiniz.
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : digitalContent.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Henüz dijital içerik bulunmamaktadır.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalContent.map((item) => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={item.image || "/placeholder.svg?height=300&width=400"} 
                    alt={item.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium">Platformlar:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.platforms.map((platform: string) => (
                          <div key={platform} className="flex items-center text-xs px-2 py-1 rounded-full bg-muted">
                            {getPlatformIcon()}
                            {platform}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Özellikler:</span>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        {item.features.slice(0, 6).map((feature: string) => (
                          <div key={feature} className="flex items-center text-xs">
                            <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                        {item.features.length > 6 && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            + {item.features.length - 6} daha fazla özellik
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Download className="mr-2 h-4 w-4" /> İndir
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> İncele
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

