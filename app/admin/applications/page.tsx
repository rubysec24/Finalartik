"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash, Loader2, Save, X, Monitor, Smartphone, Globe, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUploader } from "@/app/admin/components/ImageUploader"

// Uygulama tipi
type Application = {
  id?: number
  title: string
  description: string
  platforms: string[]
  appStoreUrl?: string
  playStoreUrl?: string
  features: string[]
  category: string
  image: string
}

export default function ApplicationsPage() {
  const [items, setItems] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("list")
  const [editingItem, setEditingItem] = useState<Application | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [formData, setFormData] = useState<Application>({
    title: "",
    description: "",
    platforms: [],
    appStoreUrl: "",
    playStoreUrl: "",
    features: [],
    category: "",
    image: ""
  })
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [newFeature, setNewFeature] = useState("")

  // Platform seçenekleri
  const platformOptions = ["Android", "iOS", "Windows", "macOS", "Web"]

  // Kategori seçenekleri
  const categoryOptions = [
    "Eğitim",
    "Dil Öğrenme",
    "Üretkenlik",
    "Referans",
    "Oyun",
    "Diğer"
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
        appStoreUrl: "",
        playStoreUrl: "",
        features: [],
        category: "",
        image: ""
      })
    }
  }, [editingItem])

  // İçerikleri API'den çek
  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/db?type=applications")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setItems(data)
      setError(null)
    } catch (err) {
      console.error("Uygulama verisi çekme hatası:", err)
      setError("Uygulamalar yüklenirken bir hata oluştu.")
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  // İçerik silme
  const handleDeleteItem = async (id: number) => {
    if (!confirm("Bu uygulamayı silmek istediğinizden emin misiniz?")) {
      return
    }
    
    try {
      setIsDeleting(id)
      const response = await fetch(`/api/db?type=applications&id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // İçerik başarıyla silindi, listeyi güncelle
      setItems(items.filter(item => item.id !== id))
    } catch (err) {
      console.error("Uygulama silme hatası:", err)
      alert("Uygulama silinirken bir hata oluştu.")
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
      if (!formData.title || !formData.description || !formData.category || formData.platforms.length === 0) {
        throw new Error("Lütfen gerekli alanları doldurun: Başlık, Açıklama, Kategori ve en az bir Platform")
      }
      
      // iOS veya Android seçiliyse ilgili mağaza URL kontrolü
      if (formData.platforms.includes("iOS") && !formData.appStoreUrl) {
        throw new Error("iOS seçildiğinde App Store URL alanı gereklidir")
      }
      
      if (formData.platforms.includes("Android") && !formData.playStoreUrl) {
        throw new Error("Android seçildiğinde Play Store URL alanı gereklidir")
      }
      
      // Yeni içerik kaydediliyor veya mevcut içerik güncelleniyor
      const url = formData.id
        ? `/api/db?type=applications&id=${formData.id}`
        : '/api/db?type=applications'
      
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
        throw new Error(errorData.error || 'Uygulama kaydedilemedi')
      }
      
      // İçerikleri yeniden yükle
      await fetchItems()
      
      // Form sıfırla ve liste görünümüne dön
      setFormData({
        title: "",
        description: "",
        platforms: [],
        appStoreUrl: "",
        playStoreUrl: "",
        features: [],
        category: "",
        image: ""
      })
      setEditingItem(null)
      setActiveTab("list")
    } catch (err) {
      console.error("Uygulama kayıt hatası:", err)
      setFormError(err instanceof Error ? err.message : 'Uygulama kaydedilirken bir hata oluştu')
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
      appStoreUrl: "",
      playStoreUrl: "",
      features: [],
      category: "",
      image: ""
    })
    setEditingItem(null)
    setActiveTab("list")
  }

  // İçerik düzenleme moduna geç
  const handleEditItem = (item: Application) => {
    setEditingItem(item)
    setActiveTab("edit")
  }

  // Yeni içerik ekleme moduna geç
  const handleAddItem = () => {
    setEditingItem(null)
    setActiveTab("add")
  }

  // Platform seçimi işleyicisi
  const togglePlatform = (platform: string) => {
    setFormData(prev => {
      const platforms = [...prev.platforms]
      
      if (platforms.includes(platform)) {
        return {
          ...prev,
          platforms: platforms.filter(p => p !== platform)
        }
      } else {
        return {
          ...prev,
          platforms: [...platforms, platform]
        }
      }
    })
  }

  // Özellik ekleme işleyicisi
  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature("")
    }
  }

  // Özellik silme işleyicisi
  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }))
  }

  // Platform ikonunu belirle
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'android':
      case 'ios':
        return <Smartphone className="w-4 h-4 mr-1" />
      case 'windows':
      case 'macos':
        return <Monitor className="w-4 h-4 mr-1" />
      case 'web':
        return <Globe className="w-4 h-4 mr-1" />
      default:
        return null
    }
  }

  // Platform için rengi belirle
  const getPlatformClass = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'android':
        return "bg-green-100 text-green-800 border-green-200"
      case 'ios':
        return "bg-blue-100 text-blue-800 border-blue-200"
      case 'windows':
        return "bg-blue-50 text-blue-700 border-blue-100" 
      case 'macos':
        return "bg-gray-100 text-gray-800 border-gray-200"
      case 'web':
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Uygulamalar</h1>
          <div className="flex gap-2">
            <TabsList>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="add">Yeni Uygulama</TabsTrigger>
              {editingItem && <TabsTrigger value="edit">Düzenle</TabsTrigger>}
            </TabsList>
            {activeTab === "list" && (
              <Button onClick={handleAddItem}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Yeni Uygulama
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Uygulama Listesi</CardTitle>
              <CardDescription>
                Sistemde kayıtlı tüm uygulamaları görüntüle, düzenle veya sil.
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
                  Henüz kayıtlı uygulama bulunmamaktadır.
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
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.platforms.map(platform => (
                                <Badge 
                                  key={platform} 
                                  variant="outline" 
                                  className={`flex items-center ${getPlatformClass(platform)}`}
                                >
                                  {getPlatformIcon(platform)}
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
              <CardTitle>Yeni Uygulama Ekle</CardTitle>
              <CardDescription>
                Sisteme yeni bir uygulama eklemek için formu doldurun.
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
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    list="category-options"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Eğitim, Dil Öğrenme, Üretkenlik..."
                    required
                  />
                  <datalist id="category-options">
                    {categoryOptions.map(category => (
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
                  <Label>Platformlar</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {platformOptions.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={`platform-${platform}`}
                          checked={formData.platforms.includes(platform)}
                          onCheckedChange={() => togglePlatform(platform)}
                        />
                        <Label htmlFor={`platform-${platform}`} className="cursor-pointer flex items-center">
                          {getPlatformIcon(platform)}
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {formData.platforms.includes('iOS') && (
                  <div className="space-y-2">
                    <Label htmlFor="appStoreUrl">App Store URL</Label>
                    <Input
                      id="appStoreUrl"
                      value={formData.appStoreUrl || ""}
                      onChange={(e) => setFormData({ ...formData, appStoreUrl: e.target.value })}
                      placeholder="https://apps.apple.com/app/..."
                      required
                    />
                  </div>
                )}
                
                {formData.platforms.includes('Android') && (
                  <div className="space-y-2">
                    <Label htmlFor="playStoreUrl">Play Store URL</Label>
                    <Input
                      id="playStoreUrl"
                      value={formData.playStoreUrl || ""}
                      onChange={(e) => setFormData({ ...formData, playStoreUrl: e.target.value })}
                      placeholder="https://play.google.com/store/apps/..."
                      required
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Özellikler</Label>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Yeni özellik ekle"
                    />
                    <Button 
                      type="button" 
                      onClick={addFeature}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Ekle
                    </Button>
                  </div>
                  
                  {formData.features.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.features.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {feature}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => removeFeature(feature)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Henüz özellik eklenmedi</p>
                  )}
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
              <CardTitle>Uygulama Düzenle</CardTitle>
              <CardDescription>
                Seçili uygulamanın bilgilerini güncellemek için formu düzenleyin.
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
                  <Label htmlFor="edit-category">Kategori</Label>
                  <Input
                    id="edit-category"
                    list="edit-category-options"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                  <datalist id="edit-category-options">
                    {categoryOptions.map(category => (
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
                  <Label>Platformlar</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {platformOptions.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-platform-${platform}`}
                          checked={formData.platforms.includes(platform)}
                          onCheckedChange={() => togglePlatform(platform)}
                        />
                        <Label htmlFor={`edit-platform-${platform}`} className="cursor-pointer flex items-center">
                          {getPlatformIcon(platform)}
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {formData.platforms.includes('iOS') && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-appStoreUrl">App Store URL</Label>
                    <Input
                      id="edit-appStoreUrl"
                      value={formData.appStoreUrl || ""}
                      onChange={(e) => setFormData({ ...formData, appStoreUrl: e.target.value })}
                      required
                    />
                  </div>
                )}
                
                {formData.platforms.includes('Android') && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-playStoreUrl">Play Store URL</Label>
                    <Input
                      id="edit-playStoreUrl"
                      value={formData.playStoreUrl || ""}
                      onChange={(e) => setFormData({ ...formData, playStoreUrl: e.target.value })}
                      required
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Özellikler</Label>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Yeni özellik ekle"
                    />
                    <Button 
                      type="button" 
                      onClick={addFeature}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Ekle
                    </Button>
                  </div>
                  
                  {formData.features.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.features.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {feature}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => removeFeature(feature)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Henüz özellik eklenmedi</p>
                  )}
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