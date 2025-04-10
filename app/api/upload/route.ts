import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

// Yüklenen dosyaların kaydedileceği dizin
const UPLOAD_DIR = join(process.cwd(), "public", "uploads")

// Dosya yükleme işleyici
export async function POST(request: NextRequest) {
  try {
    // Dizinin var olduğunu kontrol et, yoksa oluştur
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true })
    }
    
    // FormData olarak gelen dosyayı al
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    
    if (!file) {
      return NextResponse.json(
        { error: "Dosya bulunamadı" },
        { status: 400 }
      )
    }
    
    // Dosya türünü kontrol et
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Geçersiz dosya türü. Sadece JPEG, PNG, WEBP ve GIF dosyaları kabul edilir." },
        { status: 400 }
      )
    }
    
    // Dosya boyutunu kontrol et (5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Dosya boyutu çok büyük. Maksimum 5MB olmalıdır." },
        { status: 400 }
      )
    }
    
    // Benzersiz dosya adı oluştur
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = join(UPLOAD_DIR, fileName)
    
    // Dosyanın içeriğini al ve kaydet
    const fileBuffer = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(fileBuffer))
    
    // Dosyanın URL'sini döndür
    const fileUrl = `/uploads/${fileName}`
    
    return NextResponse.json({ success: true, url: fileUrl })
  } catch (error) {
    console.error("Dosya yükleme hatası:", error)
    return NextResponse.json(
      { error: "Dosya yükleme sırasında bir hata oluştu." },
      { status: 500 }
    )
  }
} 