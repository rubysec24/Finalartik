import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// API yanıt tipi
interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
  products?: number;
  publishedAt?: string;
}

// GET: Tüm markaları getir
export async function GET() {
  try {
    // JSON dosyasının yolunu belirle
    const dataFilePath = path.join(process.cwd(), 'data', 'brands.json');
    
    // JSON dosyasını oku
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const brands: Brand[] = JSON.parse(fileContents);
    
    // Yanıt olarak markaları döndür
    return NextResponse.json<ApiResponse<Brand[]>>({
      data: brands,
      message: 'Markalar başarıyla alındı'
    }, { status: 200 });
  } catch (error) {
    console.error('Markalar alınırken hata oluştu:', error);
    return NextResponse.json<ApiResponse<Brand[]>>({
      error: 'Markalar alınırken bir hata oluştu'
    }, { status: 500 });
  }
} 