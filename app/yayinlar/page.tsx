"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Search,
  Filter,
  ChevronDown,
  Star,
  Tag,
  GraduationCap,
  Clock,
  Download,
  ShoppingCart,
  Check,
  Loader2
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

// Yayın tipi
type Publication = {
  id: number
  title: string
  description: string
  price?: string
  frequency?: string
  category: string
  pages: number
  editor?: string
  year?: string
  brand?: string
  image: string
}

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("kitaplar")

  // API'den yayınları çek
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/db?type=publications')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setPublications(data)
        setError(null)
      } catch (err) {
        console.error("Yayın verisi çekme hatası:", err)
        setError("Yayınlar yüklenirken bir hata oluştu.")
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  // Yayınları kategoriye göre filtrele
  const getFilteredPublications = (category: string) => {
    return publications.filter(pub => {
      if (category === "kitaplar") {
        return !pub.frequency && !pub.year; // Kitaplar frequency veya year değeri içermez
      } else if (category === "dergiler") {
        return pub.frequency && !pub.year; // Dergiler frequency değeri içerir
      } else if (category === "kataloglar") {
        return pub.year; // Kataloglar year değeri içerir
      }
      return true;
    });
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="section-title section-title-center inline-block">Yayınlarımız</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-8 max-w-3xl mx-auto">
            Eğitimin her alanında kaliteli ve güncel yayınlar ile öğrencilerin ve eğitimcilerin yanındayız
          </p>
        </div>

        {/* Yayınlar Tanıtım Bölümü */}
        <div className="mb-16 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[300px] lg:h-auto">
              <Image src="/placeholder.svg?height=600&width=800" alt="Kurmay Yayınları" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent flex items-center">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-4">30 Yıllık Deneyim</h2>
                  <p className="text-white/90 max-w-md">
                    1990 yılından bu yana eğitim yayıncılığında edindiğimiz deneyimle, öğrencilerin ve eğitimcilerin
                    ihtiyaçlarına uygun kaliteli içerikler üretiyoruz.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Yayınlarımızın Özellikleri</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Uzman Kadro</span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Alanında uzman akademisyen ve öğretmenlerden oluşan güçlü bir kadro ile hazırlanmış içerikler
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Müfredata Uygunluk</span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        MEB müfredatına tam uyumlu, güncel kaynak kitaplar ve yardımcı materyaller
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Kaliteli Baskı</span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Yüksek kaliteli kağıt ve baskı teknikleriyle üretilmiş, uzun ömürlü yayınlar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Özgün İçerik</span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Tamamen özgün ve özenle hazırlanmış, öğrenci ihtiyaçlarına uygun içerikler
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yayınlar Tab Bölümü */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Yayın Kategorilerimiz</h2>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Her seviye ve branş için kapsamlı eğitim materyallerimiz
            </p>
            
            <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-white dark:bg-gray-800 p-1.5 shadow-md">
              <TabsTrigger
                value="kitaplar"
                className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Kitaplar
              </TabsTrigger>
              <TabsTrigger
                value="dergiler"
                className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Dergiler
              </TabsTrigger>
              <TabsTrigger
                value="kataloglar"
                className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Kataloglar
              </TabsTrigger>
            </TabsList>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-center">
              {error} Lütfen daha sonra tekrar deneyiniz.
            </div>
          )}

          {/* Kitaplar Tab */}
          <TabsContent value="kitaplar">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : getFilteredPublications('kitaplar').length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Henüz kitap kaydı bulunmamaktadır.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getFilteredPublications('kitaplar').map((book) => (
                  <Card key={book.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative h-60">
                      <Image
                        src={book.image || "/placeholder.svg?height=300&width=200"}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-primary/90 text-white border-primary">
                          {book.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{book.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-col gap-1">
                        {book.price && (
                          <div className="font-medium text-lg text-primary">{book.price}</div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Sayfa:</span> {book.pages}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1 group-hover:bg-primary">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Sepete Ekle
                      </Button>
                      <Button variant="outline" className="flex-none w-10 p-0">
                        <Search className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Dergiler Tab */}
          <TabsContent value="dergiler">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : getFilteredPublications('dergiler').length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Henüz dergi kaydı bulunmamaktadır.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredPublications('dergiler').map((magazine) => (
                  <Card key={magazine.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-60">
                      <Image
                        src={magazine.image || "/placeholder.svg?height=300&width=200"}
                        alt={magazine.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle>{magazine.title}</CardTitle>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          {magazine.frequency}
                        </Badge>
                      </div>
                      <CardDescription>{magazine.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Kategori:</span>
                          <span className="font-medium">{magazine.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sayfa Sayısı:</span>
                          <span className="font-medium">{magazine.pages}</span>
                        </div>
                        {magazine.editor && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Editör:</span>
                            <span className="font-medium">{magazine.editor}</span>
                          </div>
                        )}
                        {magazine.price && (
                          <div className="flex justify-between mt-2">
                            <span className="text-muted-foreground">Fiyat:</span>
                            <span className="font-bold text-primary">{magazine.price}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Detayları İncele</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Kataloglar Tab */}
          <TabsContent value="kataloglar">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : getFilteredPublications('kataloglar').length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Henüz katalog kaydı bulunmamaktadır.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getFilteredPublications('kataloglar').map((catalog) => (
                  <Card key={catalog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-60">
                      <Image
                        src={catalog.image || "/placeholder.svg?height=300&width=200"}
                        alt={catalog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{catalog.title}</CardTitle>
                      <CardDescription>{catalog.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Eğitim Yılı:</span>
                          <span className="font-medium text-right">{catalog.year}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Sayfa Sayısı:</span>
                          <span className="font-medium text-right">{catalog.pages}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" /> İndir
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Bayilik Bilgileri */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bayilik Başvurusu</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Kurmay Yayınları bayilik ağına katılmak için hemen başvurun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Bayi Olmanın Avantajları</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Özel indirim oranları ve ödeme koşulları</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Hızlı teslimat ve stok güvencesi</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Pazarlama ve tanıtım desteği</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Düzenli eğitim ve seminerler</span>
                </li>
              </ul>

              <div className="mt-6">
                <Button className="bg-primary hover:bg-primary/90 text-white">Bayilik Başvuru Formu</Button>
              </div>
            </div>

            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Bayilik" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Publications

