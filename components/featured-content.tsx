"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Laptop, FileText, Video, Download, ExternalLink, Star, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

// Ürün türleri için tip tanımları
interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: string;
  brand?: string;
}

interface Digital {
  id: string;
  title: string;
  image: string;
  description: string;
  type: string;
  platform: string;
}

interface Publication {
  id: string;
  title: string;
  image: string;
  description: string;
  frequency: string;
  format: string;
  nextIssue: string;
}

const FeaturedContent = () => {
  const [activeTab, setActiveTab] = useState("books")
  const [products, setProducts] = useState<Product[]>([])
  const [digital, setDigital] = useState<Digital[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      try {
        // Ürünleri getir
        const productsResponse = await fetch('/api/db?type=products')
        if (!productsResponse.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu')
        }
        const productsData = await productsResponse.json()
        setProducts(productsData)

        // Dijital içerikleri getir
        const digitalResponse = await fetch('/api/db?type=digital')
        if (!digitalResponse.ok) {
          throw new Error('Dijital içerikler yüklenirken bir hata oluştu')
        }
        const digitalData = await digitalResponse.json()
        setDigital(digitalData)

        // Yayınları getir
        const publicationsResponse = await fetch('/api/db?type=publications')
        if (!publicationsResponse.ok) {
          throw new Error('Yayınlar yüklenirken bir hata oluştu')
        }
        const publicationsData = await publicationsResponse.json()
        setPublications(publicationsData)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu')
        console.error('Veri yüklenirken hata:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title section-title-center inline-block">Öne Çıkan İçerikler</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-8 max-w-3xl mx-auto">
              Eğitimin her alanında ihtiyacınız olan kaynaklar ve içerikler
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="books" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 p-1.5">
              <TabsTrigger value="books" className="rounded-full flex items-center gap-2 px-6">
                <BookOpen className="h-4 w-4" />
                <span>Kitaplar</span>
              </TabsTrigger>
              <TabsTrigger value="digital" className="rounded-full flex items-center gap-2 px-6">
                <Laptop className="h-4 w-4" />
                <span>Dijital</span>
              </TabsTrigger>
              <TabsTrigger value="publications" className="rounded-full flex items-center gap-2 px-6">
                <FileText className="h-4 w-4" />
                <span>Yayınlar</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 dark:text-red-400">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Yeniden Dene
              </Button>
            </div>
          )}

          {!loading && !error && (
            <>
              <TabsContent value="books" className="mt-0">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {products.slice(0, 6).map((item: any) => (
                    <motion.div
                      key={item.id}
                      variants={item as any}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden card-hover"
                    >
                      <div className="relative">
                        <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={150}
                            height={200}
                            className="h-auto max-h-56 w-auto"
                          />
                        </div>

                        {item.brand === "Fenomen" && (
                          <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                            <Star className="h-3.5 w-3.5" fill="currentColor" />
                            <span>Fenomen</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="mb-1 flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{item.category}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-2 mb-4">
                          <GraduationCap className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.level}</span>
                        </div>

                        <Button className="w-full">Detayları Gör</Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {products.length > 6 && (
                  <div className="mt-12 text-center">
                    <Link href="/urunler">
                      <Button variant="outline" size="lg">
                        Tüm Kitapları Gör
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="digital" className="mt-0">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {digital.slice(0, 6).map((item: any) => (
                    <motion.div
                      key={item.id}
                      variants={item as any}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden card-hover"
                    >
                      <div className="relative h-64 w-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <div className="mb-1 flex items-center gap-1">
                          <Download className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{item.type}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-2 mb-4">
                          <Laptop className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.platform}</span>
                        </div>

                        <Button className="w-full">İçeriği İncele</Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {digital.length > 6 && (
                  <div className="mt-12 text-center">
                    <Link href="/dijital-icerikler">
                      <Button variant="outline" size="lg">
                        Tüm Dijital İçerikleri Gör
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="publications" className="mt-0">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {publications.slice(0, 6).map((item: any) => (
                    <motion.div
                      key={item.id}
                      variants={item as any}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden card-hover"
                    >
                      <div className="relative h-64 w-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <div className="mb-1 flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{item.format}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.frequency} | Sonraki: {item.nextIssue}
                          </span>
                        </div>

                        <Button className="w-full">Detayları Gör</Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {publications.length > 6 && (
                  <div className="mt-12 text-center">
                    <Link href="/yayinlar">
                      <Button variant="outline" size="lg">
                        Tüm Yayınları Gör
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </section>
  )
}

export default FeaturedContent

