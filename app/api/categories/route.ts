import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// API yanıt tipi
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Kategori veri tipi
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// GET: Tüm kategorileri getir
export async function GET() {
  try {
    // JSON dosyasının yolunu belirle
    const dataFilePath = path.join(process.cwd(), 'data', 'categories.json');
    
    // JSON dosyasını oku
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const categories: Category[] = JSON.parse(fileContents);
    
    // Yanıt olarak kategorileri döndür
    return NextResponse.json<ApiResponse<Category[]>>({
      data: categories,
      message: 'Kategoriler başarıyla alındı'
    }, { status: 200 });
  } catch (error) {
    console.error('Kategoriler alınırken hata oluştu:', error);
    return NextResponse.json<ApiResponse<Category[]>>({
      error: 'Kategoriler alınırken bir hata oluştu'
    }, { status: 500 });
  }
} 