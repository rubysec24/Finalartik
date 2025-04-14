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

// GET: Ürünleri getir (filtrele)
export async function GET(request: Request) {
  try {
    // URL parametrelerini al
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');
    
    // JSON dosyasını oku
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let products: Product[] = JSON.parse(fileContents);
    
    // Filtreleme işlemleri
    if (brand) {
      products = products.filter(product => 
        product.brandId === brand || 
        product.brandSlug === brand
      );
    }
    
    if (category) {
      products = products.filter(product => 
        product.categoryId === category || 
        product.categoryName?.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (level) {
      products = products.filter(product => 
        product.levelId === level || 
        product.levelName?.toLowerCase() === level.toLowerCase()
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Yanıt olarak ürünleri döndür
    return NextResponse.json<ApiResponse<Product[]>>({
      data: products,
      message: 'Ürünler başarıyla alındı'
    }, { status: 200 });
  } catch (error) {
    console.error('Ürünler alınırken hata oluştu:', error);
    return NextResponse.json<ApiResponse<Product[]>>({
      error: 'Ürünler alınırken bir hata oluştu'
    }, { status: 500 });
  }
}

// POST: Yeni ürün ekle
export async function POST(request: Request) {
  try {
    // İstek gövdesini al
    const body = await request.json();
    
    // Gerekli alanları doğrula
    if (!body.name || !body.brandId) {
      return NextResponse.json<ApiResponse<null>>({
        error: 'Ürün adı ve marka ID\'si gereklidir'
      }, { status: 400 });
    }
    
    // JSON dosyasını oku
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    
    // Yeni ürün için ID oluştur
    const newId = `product_${Date.now()}`;
    
    // Slug oluştur
    const slug = body.slug || body.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim();
    
    // Marka, kategori ve seviye bilgilerini kontrol et
    const brandsFilePath = path.join(process.cwd(), 'data', 'brands.json');
    const categoriesFilePath = path.join(process.cwd(), 'data', 'categories.json');
    const levelsFilePath = path.join(process.cwd(), 'data', 'levels.json');
    
    let brandInfo: Brand | undefined;
    let categoryInfo: Category | undefined;
    let levelInfo: Level | undefined;
    
    // Marka bilgisini kontrol et
    if (fs.existsSync(brandsFilePath)) {
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
    
    // Yeni ürün oluştur
    const newProduct: Product = {
      id: newId,
      name: body.name,
      slug,
      description: body.description || '',
      price: body.price,
      images: body.images || [],
      brandId: body.brandId,
      brandSlug: brandInfo?.slug,
      categoryId: body.categoryId,
      categoryName: categoryInfo?.name,
      levelId: body.levelId,
      levelName: levelInfo?.name,
      features: body.features || [],
      specifications: body.specifications || [],
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Ürünü ekle ve JSON dosyasına yaz
    products.push(newProduct);
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    
    // Başarı yanıtı döndür
    return NextResponse.json<ApiResponse<Product>>({
      data: newProduct,
      message: 'Ürün başarıyla oluşturuldu'
    }, { status: 201 });
  } catch (error) {
    console.error('Ürün oluşturulurken hata oluştu:', error);
    return NextResponse.json<ApiResponse<null>>({
      error: 'Ürün oluşturulurken bir hata oluştu'
    }, { status: 500 });
  }
} 