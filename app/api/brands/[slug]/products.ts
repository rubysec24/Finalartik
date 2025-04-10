import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  images?: string[];
  brandId: string;
  brandSlug?: string;
  categoryId?: string;
  categoryName?: string;
  levelId?: string;
  levelName?: string;
  features?: ProductFeature[];
  specifications?: ProductSpecification[];
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ProductSpecification {
  id: string;
  name: string;
  value: string;
  group?: string;
}

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
    
    // JSON dosyasını oku - önce markayı kontrol et
    const brandsFilePath = path.join(process.cwd(), 'data', 'brands.json');
    const brandsFileContents = fs.readFileSync(brandsFilePath, 'utf8');
    const brands = JSON.parse(brandsFileContents);
    
    // Markayı bul
    const brand = brands.find((b: any) => b.slug === slug);
    
    if (!brand) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Marka bulunamadı'
      }, { status: 404 });
    }

    // Ürünleri oku
    const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
    const productsFileContents = fs.readFileSync(productsFilePath, 'utf8');
    const allProducts: Product[] = JSON.parse(productsFileContents);
    
    // Markaya ait ürünleri filtrele
    const products = allProducts.filter(product => 
      product.brandId === brand.id || product.brandSlug === brand.slug
    );
    
    // Yanıt olarak ürünleri döndür
    return NextResponse.json<ApiResponse<Product[]>>({
      data: products,
      message: 'Markaya ait ürünler başarıyla alındı'
    }, { status: 200 });
  } catch (error) {
    console.error('Ürünler alınırken hata oluştu:', error);
    return NextResponse.json<ApiResponse<null>>({
      error: 'Ürünler alınırken bir hata oluştu'
    }, { status: 500 });
  }
} 