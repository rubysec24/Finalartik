"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash, Loader2, Save, X, Plus, BookOpen, BookOpenCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ImageUploader } from "@/app/admin/components/ImageUploader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Yayın tipi
type Publication = {
  id?: number
  title: string
  description: string
  frequency?: string
  category: string
  pages: number
  editor?: string
  year?: string
  brand?: string
  image: string
}

export default function PublicationsPage() {
  const [items, setItems] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("list")
  const [editingItem, setEditingItem] = useState<Publication | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [formData, setFormData] = useState<Publication>({
    title: "",
    description: "",
    frequency: "",
    category: "",
    pages: 0,
    editor: "",
    year: "",
    brand: "Kurmay Yayınları",
    image: ""
  })
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [publicationType, setPublicationType] = useState<"book" | "magazine" | "catalog">("book")

  // Kategori seçenekleri
  const categoryOptions = {
    book: [
      "Eğitim",
      "Türkçe",
      "Matematik",
      "Fen Bilimleri",
      "Sosyal Bilimler",
      "İngilizce",
      "Diğer"
    ],
    magazine: [
      "Eğitim",
      "Bilim",
      "Kültür",
      "Çocuk",
      "Akademik",
      "Diğer"
    ],
    catalog: [
      "İlkokul",
      "Ortaokul",
      "Lise",
      "Yabancı Dil",
      "Genel",
      "Diğer"
    ]
  }

  // Sıklık seçenekleri
  const frequencyOptions = [
    "Günlük",
    "Haftalık",
    "Aylık",
    "3 Aylık",
    "6 Aylık",
    "Yıllık"
  ]

  // İçerikleri yükle
  useEffect(() => {
    fetchItems()
  }, [])

  // Düzenlenecek içerik seçildiğinde form verilerini güncelle
  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem)
      // Yayın tipini belirle
      if (editingItem.year) {
        setPublicationType("catalog")
      } else if (editingItem.frequency) {
        setPublicationType("magazine")
      } else {
        setPublicationType("book")
      }
    } else {
      setFormData({
        title: "",
        description: "",
        frequency: "",
        category: "",
        pages: 0,
        editor: "",
        year: "",
        brand: "Kurmay Yayınları",
        image: ""
      })
      setPublicationType("book") // Varsayılan olarak kitap
    }
  }, [editingItem])

  // İçerikleri API'den çek
  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/db?type=publications")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setItems(data)
      setError(null)
    } catch (err) {
      console.error("Yayın verisi çekme hatası:", err)
      setError("Yayınlar yüklenirken bir hata oluştu.")
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  // İçerik silme
  const handleDeleteItem = async (id: number) => {
    if (!confirm("Bu yayını silmek istediğinizden emin misiniz?")) {
      return
    }
    
    try {
      setIsDeleting(id)
      const response = await fetch(`/api/db?type=publications&id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // İçerik başarıyla silindi, listeyi güncelle
      setItems(items.filter(item => item.id !== id))
    } catch (err) {
      console.error("Yayın silme hatası:", err)
      alert("Yayın silinirken bir hata oluştu.")
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
      if (!formData.title || !formData.description || !formData.category || formData.pages <= 0) {
        throw new Error("Lütfen gerekli alanları doldurun: Başlık, Açıklama, Kategori ve Sayfa Sayısı")
      }
      
      // Yayın tipine göre özel alanları kontrol et
      if (publicationType === "magazine" && !formData.frequency) {
        throw new Error("Dergi için Yayın Sıklığı belirtilmelidir")
      }
      
      if (publicationType === "catalog" && !formData.year) {
        throw new Error("Katalog için Yayın Yılı belirtilmelidir")
      }
      
      // Yeni içerik kaydediliyor veya mevcut içerik güncelleniyor
      const url = formData.id
        ? `/api/db?type=publications&id=${formData.id}`
        : '/api/db?type=publications'
      
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
        throw new Error(errorData.error || 'Yayın kaydedilemedi')
      }
      
      // İçerikleri yeniden yükle
      await fetchItems()
      
      // Form sıfırla ve liste görünümüne dön
      setFormData({
        title: "",
        description: "",
        frequency: "",
        category: "",
        pages: 0,
        editor: "",
        year: "",
        brand: "Kurmay Yayınları",
        image: ""
      })
      setEditingItem(null)
      setActiveTab("list")
    } catch (err) {
      console.error("Yayın kayıt hatası:", err)
      setFormError(err instanceof Error ? err.message : 'Yayın kaydedilirken bir hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  // Form iptal
  const handleFormCancel = () => {
    setFormData({
      title: "",
      description: "",
      frequency: "",
      category: "",
      pages: 0,
      editor: "",
      year: "",
      brand: "Kurmay Yayınları",
      image: ""
    })
    setEditingItem(null)
    setPublicationType("book")
    setActiveTab("list")
  }

  // İçerik düzenleme moduna geç
  const handleEditItem = (item: Publication) => {
    setEditingItem(item)
    setActiveTab("edit")
  }

  // Yeni içerik ekleme moduna geç
  const handleAddItem = () => {
    setEditingItem(null)
    setPublicationType("book")
    setActiveTab("add")
  }

  // Yayın tipini belirle
  const getPublicationType = (item: Publication): string => {
    if (item.year) return "Katalog"
    if (item.frequency) return "Dergi"
    return "Kitap"
  }

  // Yayın tipini değiştir
  const handlePublicationTypeChange = (value: "book" | "magazine" | "catalog") => {
    setPublicationType(value)
    
    // Yayın tipine göre gereksiz alanları temizle
    if (value === "book") {
      setFormData(prev => ({
        ...prev,
        frequency: "",
        year: ""
      }))
    } else if (value === "magazine") {
      setFormData(prev => ({
        ...prev,
        year: "",
        frequency: prev.frequency || "Aylık" // Varsayılan sıklık
      }))
    } else if (value === "catalog") {
      setFormData(prev => ({
        ...prev,
        frequency: "",
        year: prev.year || new Date().getFullYear().toString() // Varsayılan olarak bu yıl
      }))
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Yayınlar</h1>
          <div className="flex gap-2">
            <TabsList>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="add">Yeni Yayın</TabsTrigger>
              {editingItem && <TabsTrigger value="edit">Düzenle</TabsTrigger>}
            </TabsList>
            {activeTab === "list" && (
              <Button onClick={handleAddItem}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Yeni Yayın
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Yayın Listesi</CardTitle>
              <CardDescription>
                Sistemde kayıtlı tüm yayınları görüntüle, düzenle veya sil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  Henüz kayıtlı yayın bulunmamaktadır.
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Görsel</TableHead>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Yayın Türü</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Sayfa</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.image && <img src={item.image} alt={item.title} className="h-16 w-16 object-cover" />}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getPublicationType(item)}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.pages}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditItem(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => item.id && handleDeleteItem(item.id)}
                                disabled={isDeleting === item.id}
                              >
                                {isDeleting === item.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash className="h-4 w-4" />
                                )}
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
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Yeni Yayın Ekle</CardTitle>
              <CardDescription>
                Sisteme yeni bir yayın eklemek için formu doldurun.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                  Hata: {formError}
                </div>
              )}
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Button 
                    type="button" 
                    variant={publicationType === "book" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => handlePublicationTypeChange("book")}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Kitap
                  </Button>
                  <Button 
                    type="button" 
                    variant={publicationType === "magazine" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => handlePublicationTypeChange("magazine")}
                  >
                    <BookOpenCheck className="mr-2 h-4 w-4" />
                    Dergi
                  </Button>
                  <Button 
                    type="button" 
                    variant={publicationType === "catalog" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => handlePublicationTypeChange("catalog")}
                  >
                    <BookOpenCheck className="mr-2 h-4 w-4" />
                    Katalog
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    list="category-options"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Kategori seçin"
                    required
                  />
                  <datalist id="category-options">
                    {categoryOptions[publicationType].map(category => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pages">Sayfa Sayısı</Label>
                  <Input
                    id="pages"
                    type="number"
                    min="1"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
                    required
                  />
                </div>
                
                {publicationType === "book" || publicationType === "magazine" ? (
                  <div className="space-y-2">
                    <Label htmlFor="editor">Editör</Label>
                    <Input
                      id="editor"
                      value={formData.editor || ""}
                      onChange={(e) => setFormData({ ...formData, editor: e.target.value })}
                    />
                  </div>
                ) : null}
                
                {publicationType === "magazine" && (
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Yayın Sıklığı</Label>
                    <Select 
                      value={formData.frequency || ""} 
                      onValueChange={(value) => setFormData({...formData, frequency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Yayın sıklığı seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencyOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {publicationType === "catalog" && (
                  <div className="space-y-2">
                    <Label htmlFor="year">Yayın Yılı</Label>
                    <Input
                      id="year"
                      placeholder="2023-2024"
                      value={formData.year || ""}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="brand">Yayınevi</Label>
                  <Input
                    id="brand"
                    value={formData.brand || "Kurmay Yayınları"}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <ImageUploader 
                    onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                    currentImageUrl={formData.image} 
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleFormCancel}
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4 mr-2" />
                    İptal
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Yayın Düzenle</CardTitle>
              <CardDescription>
                Seçili yayının bilgilerini güncellemek için formu düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                  Hata: {formError}
                </div>
              )}
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Button 
                    type="button" 
                    variant={publicationType === "book" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => handlePublicationTypeChange("book")}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Kitap
                  </Button>
                  <Button 
                    type="button" 
                    variant={publicationType === "magazine" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => handlePublicationTypeChange("magazine")}
                  >
                    <BookOpenCheck className="mr-2 h-4 w-4" />
                    Dergi
                  </Button>
                  <Button 
                    type="button" 
                    variant={publicationType === "catalog" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => handlePublicationTypeChange("catalog")}
                  >
                    <BookOpenCheck className="mr-2 h-4 w-4" />
                    Katalog
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Başlık</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Kategori</Label>
                  <Input
                    id="edit-category"
                    list="edit-category-options"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                  <datalist id="edit-category-options">
                    {categoryOptions[publicationType].map(category => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Açıklama</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-pages">Sayfa Sayısı</Label>
                  <Input
                    id="edit-pages"
                    type="number"
                    min="1"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
                    required
                  />
                </div>
                
                {publicationType === "book" || publicationType === "magazine" ? (
                  <div className="space-y-2">
                    <Label htmlFor="edit-editor">Editör</Label>
                    <Input
                      id="edit-editor"
                      value={formData.editor || ""}
                      onChange={(e) => setFormData({ ...formData, editor: e.target.value })}
                    />
                  </div>
                ) : null}
                
                {publicationType === "magazine" && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-frequency">Yayın Sıklığı</Label>
                    <Select 
                      value={formData.frequency || ""} 
                      onValueChange={(value) => setFormData({...formData, frequency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Yayın sıklığı seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencyOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {publicationType === "catalog" && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-year">Yayın Yılı</Label>
                    <Input
                      id="edit-year"
                      placeholder="2023-2024"
                      value={formData.year || ""}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="edit-brand">Yayınevi</Label>
                  <Input
                    id="edit-brand"
                    value={formData.brand || "Kurmay Yayınları"}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <ImageUploader 
                    onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                    currentImageUrl={formData.image} 
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleFormCancel}
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4 mr-2" />
                    İptal
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Güncelleniyor...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Güncelle
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 