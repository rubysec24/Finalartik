"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, Image as ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  currentImageUrl?: string
  onImageUploaded: (imageUrl: string) => void
  className?: string
}

export function ImageUploader({
  currentImageUrl,
  onImageUploaded,
  className
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Dosya seçildiğinde
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Önizleme oluştur
    const filePreview = URL.createObjectURL(file)
    setPreview(filePreview)

    // Dosyayı yükle
    await uploadFile(file)
  }

  // Dosya yükleme fonksiyonu
  const uploadFile = async (file: File) => {
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Yükleme sırasında bir hata oluştu")
      }

      const data = await response.json()
      
      // Yüklenen resmin URL'sini ileten fonksiyonu çağır
      onImageUploaded(data.url)
    } catch (err) {
      console.error("Dosya yükleme hatası:", err)
      setError(err instanceof Error ? err.message : "Dosya yükleme sırasında bir hata oluştu")
      
      // Önizlemeyi sil (hata durumunda)
      if (!currentImageUrl) {
        setPreview(null)
      } else {
        setPreview(currentImageUrl)
      }
    } finally {
      setUploading(false)
      
      // Input'u sıfırla (tekrar aynı dosya seçilebilsin)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  // Önizlemeyi temizle
  const handleClearPreview = () => {
    setPreview(null)
    onImageUploaded("")
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label>Görsel</Label>
      
      {/* Görsel önizlemesi */}
      {preview ? (
        <div className="relative w-full h-40 border rounded-md overflow-hidden">
          <img
            src={preview}
            alt="Görsel önizleme"
            className="w-full h-full object-contain"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={handleClearPreview}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          className="flex flex-col items-center justify-center w-full h-40 bg-muted/40 border border-dashed rounded-md cursor-pointer hover:bg-muted/60 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Görsel yüklemek için tıklayın</p>
          <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WEBP, GIF (Maks. 5MB)</p>
        </div>
      )}
      
      {/* Hata mesajı */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {/* Görsel yükleme butonları */}
      <div className="flex items-center space-x-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Yükleniyor...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {preview ? "Görseli Değiştir" : "Görsel Seç"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 