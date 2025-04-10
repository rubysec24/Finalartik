"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Book, Loader2 } from "lucide-react"
import Image from "next/image"

// Ürün tipi
type Product = {
  id: number
  title: string
  description: string
  price: string
  category: string
  level?: string
  image: string
}

export default function UrunlerPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // Ürünleri API'den çekme
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/db?type=products')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Eğer data boş bir dizi ise, örnek ürünleri yükle
        if (data.length === 0) {
          const sampleProducts = await loadSampleProducts()
          setProducts(sampleProducts)
        } else {
          setProducts(data)
        }
        
        setError(null)
      } catch (err) {
        console.error("Ürün verisi çekme hatası:", err)
        setError("Ürünler yüklenirken bir hata oluştu.")
        
        // Hata durumunda örnek ürünleri yükle
        const sampleProducts = await loadSampleProducts()
        setProducts(sampleProducts)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])
  
  // Örnek ürünleri yükle
  const loadSampleProducts = async (): Promise<Product[]> => {
    try {
      // Admin API'den örnek ürünleri çek
      const response = await fetch('/api/admin?type=products')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Örnek ürün verisi çekme hatası:", error)
      
      // Hata durumunda statik ürünleri döndür
      return [
        {
          id: 1,
          title: "Türkçe Öğretim Seti",
          description: "Yabancılar için Türkçe öğretim seti",
          price: "1200",
          category: "Dil Öğretimi",
          level: "Başlangıç",
          image: "/products/turkish-set.jpg"
        },
        {
          id: 2,
          title: "İngilizce Öğretim Seti",
          description: "Kapsamlı İngilizce öğretim seti",
          price: "950",
          category: "Dil Öğretimi",
          level: "Orta",
          image: "/products/english-set.jpg"
        }
      ]
    }
  }
  
  // Ürünleri filtrele
  const filteredProducts = products.filter(product => {
    // Kategori filtresi
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    
    // Arama filtresi
    const matchesSearch = !searchTerm || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })
  
  // Mevcut kategorileri çıkar
  const categories = ["all", ...new Set(products.map(product => product.category))]
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ürünlerimiz</h1>
          <p className="text-muted-foreground">
            Kurmay Yayınları'nın yayınladığı tüm kitaplar ve eğitim setleri
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Ürün ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tüm Kategoriler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {categories.filter(cat => cat !== "all").map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Ürün Bulunamadı</h2>
          <p className="text-muted-foreground">
            Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı bir arama terimi deneyin veya filtreleri sıfırlayın.
          </p>
          {searchTerm || selectedCategory !== "all" ? (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Filtreleri Sıfırla
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col h-full">
              <div className="aspect-[4/3] relative bg-muted">
                {product.image ? (
                  <div className="relative h-full w-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <Book className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-xs font-bold rounded">
                  {product.price} ₺
                </div>
                {product.level && (
                  <div className="absolute bottom-2 left-2 bg-secondary text-secondary-foreground px-2 py-1 text-xs font-bold rounded">
                    {product.level}
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <CardDescription className="text-xs">
                  {product.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full">Detayları Gör</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 