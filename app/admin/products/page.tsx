"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash, Loader2, Save, X } from "lucide-react"
import { ImageUploader } from "../components/ImageUploader"

// Ürün tipi
type Product = {
  id?: number
  title: string
  description: string
  category: string
  level?: string
  brand?: string
  image: string
}

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("list")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [formData, setFormData] = useState<Product>({
    title: "",
    description: "",
    category: "",
    level: "",
    brand: "",
    image: ""
  })
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Ürünleri yükle
  useEffect(() => {
    fetchProducts()
  }, [])

  // Formda düzenlenecek ürün seçildiğinde form verilerini güncelle
  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct)
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        level: "",
        brand: "",
        image: ""
      })
    }
  }, [editingProduct])

  // Ürünleri API'den çek
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/db?type=products")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setProducts(data)
      setError(null)
    } catch (err) {
      console.error("Ürün verisi çekme hatası:", err)
      setError("Ürünler yüklenirken bir hata oluştu.")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Ürün silme
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      return
    }
    
    try {
      setIsDeleting(id)
      const response = await fetch(`/api/db?type=products&id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Ürün başarıyla silindi, listeyi güncelle
      setProducts(products.filter(product => product.id !== id))
    } catch (err) {
      console.error("Ürün silme hatası:", err)
      alert("Ürün silinirken bir hata oluştu.")
    } finally {
      setIsDeleting(null)
    }
  }

  // Form işleyicisi
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setFormError(null)
    
    try {
      // Basit doğrulama
      if (!formData.title || !formData.description || !formData.category) {
        throw new Error("Lütfen gerekli alanları doldurun: Başlık, Açıklama ve Kategori")
      }
      
      // Görsel kontrolü
      if (!formData.image) {
        throw new Error("Lütfen bir görsel yükleyin")
      }
      
      // Yeni ürün kaydediliyor veya mevcut ürün güncelleniyor
      const url = formData.id
        ? `/api/db?type=products&id=${formData.id}`
        : '/api/db?type=products'
      
      const method = formData.id ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ürün kaydedilemedi')
      }
      
      // Ürünleri yeniden yükle
      await fetchProducts()
      
      // Form sıfırla ve liste görünümüne dön
      setFormData({
        title: "",
        description: "",
        category: "",
        level: "",
        brand: "",
        image: ""
      })
      setEditingProduct(null)
      setActiveTab("list")
    } catch (err) {
      console.error("Ürün kayıt hatası:", err)
      setFormError(err instanceof Error ? err.message : 'Ürün kaydedilirken bir hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  // Ürün düzenleme moduna geç
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setActiveTab("edit")
  }

  // Yeni ürün ekleme moduna geç
  const handleAddProduct = () => {
    setEditingProduct(null)
    setActiveTab("add")
  }
  
  // Görsel yüklendiğinde form verilerini güncelle
  const handleImageUploaded = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image: imageUrl }))
  }

  // Form iptal
  const handleFormCancel = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      level: "",
      brand: "",
      image: ""
    })
    setEditingProduct(null)
    setActiveTab("list")
  }

  // Markaların listesi
  const brands = [
    { slug: "kurmay", name: "Fenomen Okul" },
    { slug: "fenomen", name: "Fenomen" },
    { slug: "moreandmore", name: "More&More" },
    { slug: "koz", name: "KOZ" },
    { slug: "orjin", name: "Orjin" },
    { slug: "wow", name: "WoW English" },
    { slug: "vaf", name: "VAF" },
    { slug: "kkd", name: "KKD" }
  ]

  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ürünler</h1>
          <div className="flex gap-2">
            <TabsList>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="add">Yeni Ürün</TabsTrigger>
              {editingProduct && <TabsTrigger value="edit">Düzenle</TabsTrigger>}
            </TabsList>
            {activeTab === "list" && (
              <Button onClick={handleAddProduct}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Yeni Ürün
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Tüm Ürünler</CardTitle>
              <CardDescription>
                Sistemde kayıtlı tüm ürünlerin listesi. Düzenlemek için ürün üzerine tıklayın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-md text-red-500">{error}</div>
              ) : products.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Henüz ürün kaydı bulunmamaktadır. Eklemek için "Yeni Ürün Ekle" butonunu kullanabilirsiniz.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Görsel</TableHead>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Seviye</TableHead>
                        <TableHead>Marka</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.id}</TableCell>
                          <TableCell>
                            {product.image && (
                              <div className="w-12 h-12 rounded-md overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.level || "-"}</TableCell>
                          <TableCell>{product.brand || "-"}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Düzenle
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => product.id && handleDeleteProduct(product.id)}
                                disabled={isDeleting === product.id}
                              >
                                {isDeleting === product.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : (
                                  <Trash className="h-4 w-4 mr-1" />
                                )}
                                Sil
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddProduct}>
                <PlusCircle className="h-4 w-4 mr-2" /> Yeni Ürün Ekle
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Yeni Ürün Ekle</CardTitle>
              <CardDescription>
                Yeni bir ürün eklemek için aşağıdaki formu doldurun.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleFormSubmit}>
              <CardContent className="space-y-4">
                {formError && (
                  <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">{formError}</div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Ürün Adı *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ürün adını girin"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="ör. Matematik, Fen, Türkçe"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Ürün açıklamasını girin"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Seviye</Label>
                    <Input
                      id="level"
                      value={formData.level || ""}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      placeholder="ör. İlkokul, Ortaokul, Lise"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marka</Label>
                    <select
                      id="brand"
                      value={formData.brand || ""}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="">Marka Seçin</option>
                      {brands.map((brand) => (
                        <option key={brand.slug} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <ImageUploader
                    currentImageUrl={formData.image}
                    onImageUploaded={handleImageUploaded}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handleFormCancel}>
                  <X className="h-4 w-4 mr-2" /> İptal
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Kaydet
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Ürün Düzenle</CardTitle>
              <CardDescription>
                Ürün bilgilerini güncellemek için aşağıdaki formu kullanın.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleFormSubmit}>
              <CardContent className="space-y-4">
                {formError && (
                  <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">{formError}</div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Ürün Adı *</Label>
                    <Input
                      id="edit-title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ürün adını girin"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Kategori *</Label>
                    <Input
                      id="edit-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="ör. Matematik, Fen, Türkçe"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Açıklama *</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Ürün açıklamasını girin"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-level">Seviye</Label>
                    <Input
                      id="edit-level"
                      value={formData.level || ""}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      placeholder="ör. İlkokul, Ortaokul, Lise"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-brand">Marka</Label>
                    <select
                      id="edit-brand"
                      value={formData.brand || ""}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="">Marka Seçin</option>
                      {brands.map((brand) => (
                        <option key={brand.slug} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <ImageUploader
                    currentImageUrl={formData.image}
                    onImageUploaded={handleImageUploaded}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handleFormCancel}>
                  <X className="h-4 w-4 mr-2" /> İptal
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Güncelle
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 