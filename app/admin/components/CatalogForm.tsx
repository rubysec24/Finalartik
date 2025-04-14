"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Upload } from "lucide-react"

interface CatalogFormProps {
  initialData?: {
    id?: number
    title: string
    description: string
    year: string
    brand: string
    pages: number
    image?: string
  }
  onSubmit: (data: any) => void
}

export default function CatalogForm({ initialData, onSubmit }: CatalogFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      year: "",
      brand: "",
      pages: 0,
      image: "",
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? "Katalog Düzenle" : "Yeni Katalog Ekle"}</CardTitle>
          <CardDescription>Katalog bilgilerini giriniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Katalog Adı</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Yıl</Label>
              <Input
                id="year"
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Örn: 2023-2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pages">Sayfa Sayısı</Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Marka</Label>
            <Select
              value={formData.brand}
              onValueChange={(value) => setFormData({ ...formData, brand: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Marka seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kurmay">Kurmay</SelectItem>
                <SelectItem value="fenomen">Fenomen</SelectItem>
                <SelectItem value="moreandmore">More&More</SelectItem>
                <SelectItem value="koz">KOZ</SelectItem>
                <SelectItem value="orjin">Orjin</SelectItem>
                <SelectItem value="wow">WoW English</SelectItem>
                <SelectItem value="vaf">VAF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Katalog Kapağı</Label>
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
                        <span className="font-semibold">Kapak görseli yüklemek için tıklayın</span>
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