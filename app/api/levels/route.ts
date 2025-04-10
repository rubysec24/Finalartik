import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// API yanıt tipi
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Seviye veri tipi
export interface Level {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// GET: Tüm seviyeleri getir
export async function GET() {
  try {
    // JSON dosyasının yolunu belirle
    const dataFilePath = path.join(process.cwd(), 'data', 'levels.json');
    
    // JSON dosyasını oku
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const levels: Level[] = JSON.parse(fileContents);
    
    // Yanıt olarak seviyeleri döndür
    return NextResponse.json<ApiResponse<Level[]>>({
      data: levels,
      message: 'Eğitim seviyeleri başarıyla alındı'
    }, { status: 200 });
  } catch (error) {
    console.error('Eğitim seviyeleri alınırken hata oluştu:', error);
    return NextResponse.json<ApiResponse<Level[]>>({
      error: 'Eğitim seviyeleri alınırken bir hata oluştu'
    }, { status: 500 });
  }
} 