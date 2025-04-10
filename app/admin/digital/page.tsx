"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash, Loader2, Save, X, Smartphone, Monitor, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUploader } from "@/app/admin/components/ImageUploader"
import { Checkbox } from "@/components/ui/checkbox"

// Dijital içerik tipi
type Digital = {
  id?: number
  title: string
  description: string
  platforms: string[]
  features: string[]
  category: string
  rating?: number
  image: string
}

export default function DigitalContentPage() {
  const [items, setItems] = useState<Digital[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("list")
  const [editingItem, setEditingItem] = useState<Digital | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [formData, setFormData] = useState<Digital>({
    title: "",
    description: "",
    platforms: [],
    features: [],
    category: "apps",
    rating: 5,
    image: ""
  })
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [featureInput, setFeatureInput] = useState("")
  
  // Kategori seçenekleri
  const categoryOptions = [
    "apps",
    "smartboard",
    "ai"
  ]

  // Platform seçenekleri
  const platformOptions = [
    "Android",
    "iOS",
    "Windows",
    "macOS",
    "Web"
  ]

  // İçerikleri yükle
  useEffect(() => {
    fetchItems()
  }, [])

  // Düzenlenecek içerik seçildiğinde form verilerini güncelle
  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem)
    } else {
      setFormData({
        title: "",
        description: "",
        platforms: [],
        features: [],
        category: "apps",
        rating: 5,
        image: ""
      })
    }
  }, [editingItem])

  // İçerikleri API'den çek
  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/db?type=digital")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setItems(data)
      setError(null)
    } catch (err) {
      console.error("Dijital içerik verisi çekme hatası:", err)
      setError("Dijital içerikler yüklenirken bir hata oluştu.")
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  // İçerik silme
  const handleDeleteItem = async (id: number) => {
    if (!confirm("Bu dijital içeriği silmek istediğinizden emin misiniz?")) {
      return
    }
    
    try {
      setIsDeleting(id)
      const response = await fetch(`/api/db?type=digital&id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // İçerik başarıyla silindi, listeyi güncelle
      setItems(items.filter(item => item.id !== id))
    } catch (err) {
      console.error("Dijital içerik silme hatası:", err)
      alert("Dijital içerik silinirken bir hata oluştu.")
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
      
      if (formData.platforms.length === 0) {
        throw new Error("En az bir platform seçmelisiniz")
      }
      
      if (formData.features.length === 0) {
        throw new Error("En az bir özellik eklemelisiniz")
      }
      
      // Yeni içerik kaydediliyor veya mevcut içerik güncelleniyor
      const url = formData.id
        ? `/api/db?type=digital&id=${formData.id}`
        : '/api/db?type=digital'
      
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
        throw new Error(errorData.error || 'Dijital içerik kaydedilemedi')
      }
      
      // İçerikleri yeniden yükle
      await fetchItems()
      
      // Form sıfırla ve liste görünümüne dön
      setFormData({
        title: "",
        description: "",
        platforms: [],
        features: [],
        category: "apps",
        rating: 5,
        image: ""
      })
      setEditingItem(null)
      setActiveTab("list")
    } catch (err) {
      console.error("Dijital içerik kayıt hatası:", err)
      setFormError(err instanceof Error ? err.message : 'Dijital içerik kaydedilirken bir hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  // Form iptal
  const handleFormCancel = () => {
    setFormData({
      title: "",
      description: "",
      platforms: [],
      features: [],
      category: "apps",
      rating: 5,
      image: ""
    })
    setEditingItem(null)
    setActiveTab("list")
  }

  // İçerik düzenleme moduna geç
  const handleEditItem = (item: Digital) => {
    setEditingItem(item)
    setActiveTab("edit")
  }

  // Yeni içerik ekleme moduna geç
  const handleAddItem = () => {
    setEditingItem(null)
    setActiveTab("add")
  }

  // Platform işleyicileri
  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => {
      if (prev.platforms.includes(platform)) {
        return { ...prev, platforms: prev.platforms.filter(p => p !== platform) }
      } else {
        return { ...prev, platforms: [...prev.platforms, platform] }
      }
    })
  }

  // Özellik ekleme
  const handleAddFeature = () => {
    if (!featureInput.trim()) return
    
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, featureInput.trim()]
    }))
    
    setFeatureInput("")
  }

  // Özellik silme
  const handleRemoveFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }))
  }

  // Kategori adını güzelleştir
  const formatCategoryName = (category: string): string => {
    switch(category) {
      case 'apps': return 'Mobil Uygulamalar'
      case 'smartboard': return 'Akıllı Tahta'
      case 'ai': return 'Yapay Zeka'
      default: return category
    }
  }

  // Kategori ikonunu belirle
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'apps': return <Smartphone className="h-4 w-4 mr-2" />
      case 'smartboard': return <Monitor className="h-4 w-4 mr-2" />
      case 'ai': return <Brain className="h-4 w-4 mr-2" />
      default: return null
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dijital İçerikler</h1>
          <div className="flex gap-2">
            <TabsList>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="add">Yeni İçerik</TabsTrigger>
              {editingItem && <TabsTrigger value="edit">Düzenle</TabsTrigger>}
            </TabsList>
            {activeTab === "list" && (
              <Button onClick={handleAddItem}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Yeni İçerik
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Dijital İçerik Listesi</CardTitle>
              <CardDescription>
                Sistemde kayıtlı tüm dijital içerikleri görüntüle, düzenle veya sil.
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
                  Henüz kayıtlı dijital içerik bulunmamaktadır.
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Platformlar</TableHead>
                        <TableHead>İşlem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center whitespace-nowrap">
                              {getCategoryIcon(item.category)}
                              {formatCategoryName(item.category)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.platforms.map(platform => (
                                <Badge key={platform} variant="secondary" className="text-xs">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
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
              <CardTitle>Yeni Dijital İçerik Ekle</CardTitle>
              <CardDescription>
                Sisteme yeni bir dijital içerik eklemek için formu doldurun.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                  Hata: {formError}
                </div>
              )}
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
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
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center">
                            {getCategoryIcon(category)}
                            {formatCategoryName(category)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Platformlar</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {platformOptions.map(platform => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`platform-${platform}`}
                          checked={formData.platforms.includes(platform)}
                          onCheckedChange={() => handlePlatformToggle(platform)}
                        />
                        <Label htmlFor={`platform-${platform}`} className="cursor-pointer">
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="features">Özellikler</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="features"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Yeni özellik ekleyin"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <Button type="button" onClick={handleAddFeature}>Ekle</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.features.map((feature, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        {feature}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleRemoveFeature(feature)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {formData.features.length === 0 && (
                      <span className="text-sm text-muted-foreground">
                        Henüz özellik eklenmedi
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Değerlendirme (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
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
              <CardTitle>Dijital İçerik Düzenle</CardTitle>
              <CardDescription>
                Seçili dijital içeriğin bilgilerini güncellemek için formu düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                  Hata: {formError}
                </div>
              )}
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
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
                  <Label htmlFor="edit-description">Açıklama</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Kategori</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center">
                            {getCategoryIcon(category)}
                            {formatCategoryName(category)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Platformlar</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {platformOptions.map(platform => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`edit-platform-${platform}`}
                          checked={formData.platforms.includes(platform)}
                          onCheckedChange={() => handlePlatformToggle(platform)}
                        />
                        <Label htmlFor={`edit-platform-${platform}`} className="cursor-pointer">
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-features">Özellikler</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="edit-features"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Yeni özellik ekleyin"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <Button type="button" onClick={handleAddFeature}>Ekle</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.features.map((feature, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        {feature}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleRemoveFeature(feature)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {formData.features.length === 0 && (
                      <span className="text-sm text-muted-foreground">
                        Henüz özellik eklenmedi
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-rating">Değerlendirme (1-5)</Label>
                  <Input
                    id="edit-rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
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