import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// API yanıt tipi
interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Marka veri tipi
interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
  products?: number;
  features?: BrandFeature[];
  statistics?: BrandStatistic[];
  digitalContent?: DigitalContent[];
  testimonials?: Testimonial[];
  publishedAt?: string;
}

interface BrandFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface BrandStatistic {
  id: string;
  title: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

interface DigitalContent {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: string;
  thumbnail?: string;
}

interface Testimonial {
  id: string;
  name: string;
  title?: string;
  comment: string;
  rating?: number;
  avatar?: string;
}

// GET: Marka detaylarını getir
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Marka slug\'ı gereklidir'
      }, { status: 400 });
    }
    
    // JSON dosyasını oku
    const dataFilePath = path.join(process.cwd(), 'data', 'brands.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const brands: Brand[] = JSON.parse(fileContents);
    
    // Slug'a göre markayı bul
    const brand = brands.find(b => b.slug === slug);
    
    if (!brand) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Marka bulunamadı'
      }, { status: 404 });
    }
    
    // Yanıt olarak markayı döndür
    return NextResponse.json<ApiResponse<Brand>>({
      data: brand,
      message: 'Marka başarıyla alındı'
    }, { status: 200 });
  } catch (error) {
    console.error('Marka alınırken hata oluştu:', error);
    return NextResponse.json<ApiResponse<null>>({
      error: 'Marka alınırken bir hata oluştu'
    }, { status: 500 });
  }
} 