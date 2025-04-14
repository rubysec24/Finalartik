"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Upload } from "lucide-react"

interface MagazineFormProps {
  initialData?: {
    id?: number
    title: string
    description: string
    price: string
    frequency: string
    category: string
    pages: number
    editor: string
    image?: string
  }
  onSubmit: (data: any) => void
}

export default function MagazineForm({ initialData, onSubmit }: MagazineFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      price: "",
      frequency: "",
      category: "",
      pages: 0,
      editor: "",
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
          <CardTitle>{initialData ? "Dergi Düzenle" : "Yeni Dergi Ekle"}</CardTitle>
          <CardDescription>Dergi bilgilerini giriniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Dergi Adı</Label>
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
              <Label htmlFor="price">Fiyat</Label>
              <Input
                id="price"
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Yayın Sıklığı</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Yayın sıklığı seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aylik">Aylık</SelectItem>
                  <SelectItem value="ikaylik">İki Aylık</SelectItem>
                  <SelectItem value="ucaylik">Üç Aylık</SelectItem>
                  <SelectItem value="altaylik">Altı Aylık</SelectItem>
                  <SelectItem value="yillik">Yıllık</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="bilim">Bilim</SelectItem>
                  <SelectItem value="kultur">Kültür</SelectItem>
                  <SelectItem value="sanat">Sanat</SelectItem>
                  <SelectItem value="spor">Spor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="editor">Editör</Label>
            <Input
              id="editor"
              value={formData.editor}
              onChange={(e) => setFormData({ ...formData, editor: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Dergi Kapağı</Label>
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