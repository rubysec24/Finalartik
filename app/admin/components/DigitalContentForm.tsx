"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Upload, Plus, X } from "lucide-react"

interface DigitalContentFormProps {
  initialData?: {
    id?: number
    title: string
    description: string
    platforms: string[]
    features: string[]
    category: string
    image?: string
  }
  onSubmit: (data: any) => void
}

export default function DigitalContentForm({ initialData, onSubmit }: DigitalContentFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      platforms: [],
      features: [],
      category: "",
      image: "",
    }
  )

  const [newFeature, setNewFeature] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const handlePlatformChange = (platform: string) => {
    setFormData({
      ...formData,
      platforms: formData.platforms.includes(platform)
        ? formData.platforms.filter((p) => p !== platform)
        : [...formData.platforms, platform],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? "Dijital İçerik Düzenle" : "Yeni Dijital İçerik Ekle"}</CardTitle>
          <CardDescription>Dijital içerik bilgilerini giriniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">İçerik Adı</Label>
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
            <Label>Platformlar</Label>
            <div className="flex flex-wrap gap-2">
              {["Windows", "macOS", "Web", "iOS", "Android"].map((platform) => (
                <Button
                  key={platform}
                  type="button"
                  variant={formData.platforms.includes(platform) ? "default" : "outline"}
                  onClick={() => handlePlatformChange(platform)}
                >
                  {platform}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Özellikler</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Yeni özellik ekle"
              />
              <Button type="button" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
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
                <SelectItem value="egitim">Eğitim</SelectItem>
                <SelectItem value="oyun">Oyun</SelectItem>
                <SelectItem value="arac">Araç</SelectItem>
                <SelectItem value="diger">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>İçerik Görseli</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="max-h-48 object-contain" />
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Görsel yüklemek için tıklayın</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG veya GIF</p>
                    </>
                  )}
                </div>
                <input id="image" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          İptal
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
          {initialData ? "Güncelle" : "Ekle"}
        </Button>
      </div>
    </form>
  )
} 