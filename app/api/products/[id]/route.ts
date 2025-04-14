import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// API yanıt tipi
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Ürün veri tipi
export interface Product {
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

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Level {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// GET: Tekil ürün detaylarını getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Ürün ID\'si gereklidir'
      }, { status: 400 });
    }
    
    // JSON dosyasını oku
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    
    // ID'ye göre ürünü bul
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Ürün bulunamadı'
      }, { status: 404 });
    }
    
    // Yanıt olarak ürünü döndür
    return NextResponse.json<ApiResponse<Product>>({
      data: product,
      message: 'Ürün başarıyla alındı'
    }, { status: 200 });
  } catch (error) {
    console.error('Ürün alınırken hata oluştu:', error);
    return NextResponse.json<ApiResponse<null>>({
      error: 'Ürün alınırken bir hata oluştu'
    }, { status: 500 });
  }
}

// PUT: Ürün güncelle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Ürün ID\'si gereklidir'
      }, { status: 400 });
    }
    
    // İstek gövdesini al
    const body = await request.json();
    
    // JSON dosyasını oku
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    
    // Ürün indeksini bul
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Ürün bulunamadı'
      }, { status: 404 });
    }
    
    // Mevcut ürünü al
    const existingProduct = products[productIndex];
    
    // Marka, kategori ve seviye bilgilerini kontrol et
    const brandsFilePath = path.join(process.cwd(), 'data', 'brands.json');
    const categoriesFilePath = path.join(process.cwd(), 'data', 'categories.json');
    const levelsFilePath = path.join(process.cwd(), 'data', 'levels.json');
    
    let brandInfo: Brand | undefined;
    let categoryInfo: Category | undefined;
    let levelInfo: Level | undefined;
    
    // Marka bilgisini kontrol et
    if (body.brandId && fs.existsSync(brandsFilePath)) {
      const brandsContent = fs.readFileSync(brandsFilePath, 'utf8');
      const brands: Brand[] = JSON.parse(brandsContent);
      brandInfo = brands.find(b => b.id === body.brandId);
    }
    
    // Kategori bilgisini kontrol et
    if (body.categoryId && fs.existsSync(categoriesFilePath)) {
      const categoriesContent = fs.readFileSync(categoriesFilePath, 'utf8');
      const categories: Category[] = JSON.parse(categoriesContent);
      categoryInfo = categories.find(c => c.id === body.categoryId);
    }
    
    // Seviye bilgisini kontrol et
    if (body.levelId && fs.existsSync(levelsFilePath)) {
      const levelsContent = fs.readFileSync(levelsFilePath, 'utf8');
      const levels: Level[] = JSON.parse(levelsContent);
      levelInfo = levels.find(l => l.id === body.levelId);
    }
    
    // Slug'ı güncelle veya koru
    let slug = existingProduct.slug;
    if (body.name && body.name !== existingProduct.name) {
      slug = body.slug || body.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .trim();
    }
    
    // Ürünü güncelle
    const updatedProduct: Product = {
      ...existingProduct,
      name: body.name || existingProduct.name,
      slug,
      description: body.description !== undefined ? body.description : existingProduct.description,
      price: body.price !== undefined ? body.price : existingProduct.price,
      images: body.images || existingProduct.images,
      brandId: body.brandId || existingProduct.brandId,
      brandSlug: body.brandId ? brandInfo?.slug : existingProduct.brandSlug,
      categoryId: body.categoryId !== undefined ? body.categoryId : existingProduct.categoryId,
      categoryName: body.categoryId ? categoryInfo?.name : existingProduct.categoryName,
      levelId: body.levelId !== undefined ? body.levelId : existingProduct.levelId,
      levelName: body.levelId ? levelInfo?.name : existingProduct.levelName,
      features: body.features || existingProduct.features,
      specifications: body.specifications || existingProduct.specifications,
      isPublished: body.isPublished !== undefined ? body.isPublished : existingProduct.isPublished,
      updatedAt: new Date().toISOString()
    };
    
    // Ürünü dizide güncelle
    products[productIndex] = updatedProduct;
    
    // JSON dosyasına yaz
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    
    // Yanıt olarak güncellenmiş ürünü döndür
    return NextResponse.json<ApiResponse<Product>>({
      data: updatedProduct,
      message: 'Ürün başarıyla güncellendi'
    }, { status: 200 });
  } catch (error) {
    console.error('Ürün güncellenirken hata oluştu:', error);
    return NextResponse.json<ApiResponse<null>>({
      error: 'Ürün güncellenirken bir hata oluştu'
    }, { status: 500 });
  }
}

// DELETE: Ürün sil
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Ürün ID\'si gereklidir'
      }, { status: 400 });
    }
    
    // JSON dosyasını oku
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    
    // Ürün indeksini bul
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Ürün bulunamadı'
      }, { status: 404 });
    }
    
    // Ürünü diziden kaldır
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    // JSON dosyasına yaz
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    
    // Başarı yanıtı döndür
    return NextResponse.json<ApiResponse<Product>>({
      data: deletedProduct,
      message: 'Ürün başarıyla silindi'
    }, { status: 200 });
  } catch (error) {
    console.error('Ürün silinirken hata oluştu:', error);
    return NextResponse.json<ApiResponse<null>>({
      error: 'Ürün silinirken bir hata oluştu'
    }, { status: 500 });
  }
} 