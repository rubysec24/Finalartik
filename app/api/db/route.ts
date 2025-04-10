import { NextRequest, NextResponse } from "next/server"
import * as fs from 'fs'
import * as path from 'path'
import { promises as fsPromises } from 'fs'

// Verilerin saklanacağı dosya yolları
const DATA_DIR = path.join(process.cwd(), 'data')
const DEALERS_FILE = path.join(DATA_DIR, 'dealers.json')
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json')
const DIGITAL_FILE = path.join(DATA_DIR, 'digital.json')
const PUBLICATIONS_FILE = path.join(DATA_DIR, 'publications.json')
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json')

// Veri tiplerini tanımla
type Dealer = {
  id: number
  name: string
  address: string
  phone: string
  email: string
  city: string
  district: string
  publications: string[]
}

type Product = {
  id: number
  title: string
  description: string
  category: string
  level?: string
  brand?: string
  image: string
}

// Dijital içerik tipi
type Digital = {
  id: number
  title: string
  description: string
  platforms: string[]
  features: string[]
  category: string
  image: string
}

// Yayın tipi (dergiler, kataloglar vb.)
type Publication = {
  id: number
  title: string
  description: string
  frequency?: string
  category: string
  pages: number
  editor?: string
  year?: string
  brand?: string
  image: string
}

// Uygulama tipi
type Application = {
  id: number
  title: string
  description: string
  platforms: string[]
  appStoreUrl?: string
  playStoreUrl?: string
  features: string[]
  category: string
  image: string
}

// Dosya sistemini kontrol et ve gerekirse dizinleri oluştur
async function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      await fsPromises.mkdir(DATA_DIR, { recursive: true })
    }
  } catch (error) {
    console.error('Dizin oluşturma hatası:', error)
  }
}

// Bayi verilerini oku
async function readDealers(): Promise<Dealer[]> {
  try {
    await ensureDirectoryExists()
    
    if (!fs.existsSync(DEALERS_FILE)) {
      // Dosya yoksa boş bir dizi döndür
      return []
    }
    
    const data = await fsPromises.readFile(DEALERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Bayi verilerini okuma hatası:', error)
    return []
  }
}

// Bayi verilerini yaz
async function writeDealers(dealers: Dealer[]): Promise<boolean> {
  try {
    await ensureDirectoryExists()
    await fsPromises.writeFile(DEALERS_FILE, JSON.stringify(dealers, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Bayi verilerini yazma hatası:', error)
    return false
  }
}

// Ürün verilerini oku
async function readProducts(): Promise<Product[]> {
  try {
    await ensureDirectoryExists()
    
    if (!fs.existsSync(PRODUCTS_FILE)) {
      // Dosya yoksa boş bir dizi döndür
      return []
    }
    
    const data = await fsPromises.readFile(PRODUCTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Ürün verilerini okuma hatası:', error)
    return []
  }
}

// Ürün verilerini yaz
async function writeProducts(products: Product[]): Promise<boolean> {
  try {
    await ensureDirectoryExists()
    await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Ürün verilerini yazma hatası:', error)
    return false
  }
}

// Dijital içerik verilerini oku
async function readDigital(): Promise<Digital[]> {
  try {
    await ensureDirectoryExists()
    
    if (!fs.existsSync(DIGITAL_FILE)) {
      return []
    }
    
    const data = await fsPromises.readFile(DIGITAL_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Dijital içerik verilerini okuma hatası:', error)
    return []
  }
}

// Dijital içerik verilerini yaz
async function writeDigital(digital: Digital[]): Promise<boolean> {
  try {
    await ensureDirectoryExists()
    await fsPromises.writeFile(DIGITAL_FILE, JSON.stringify(digital, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Dijital içerik verilerini yazma hatası:', error)
    return false
  }
}

// Yayın verilerini oku
async function readPublications(): Promise<Publication[]> {
  try {
    await ensureDirectoryExists()
    
    if (!fs.existsSync(PUBLICATIONS_FILE)) {
      return []
    }
    
    const data = await fsPromises.readFile(PUBLICATIONS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Yayın verilerini okuma hatası:', error)
    return []
  }
}

// Yayın verilerini yaz
async function writePublications(publications: Publication[]): Promise<boolean> {
  try {
    await ensureDirectoryExists()
    await fsPromises.writeFile(PUBLICATIONS_FILE, JSON.stringify(publications, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Yayın verilerini yazma hatası:', error)
    return false
  }
}

// Uygulama verilerini oku
async function readApplications(): Promise<Application[]> {
  try {
    await ensureDirectoryExists()
    
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      return []
    }
    
    const data = await fsPromises.readFile(APPLICATIONS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Uygulama verilerini okuma hatası:', error)
    return []
  }
}

// Uygulama verilerini yaz
async function writeApplications(applications: Application[]): Promise<boolean> {
  try {
    await ensureDirectoryExists()
    await fsPromises.writeFile(APPLICATIONS_FILE, JSON.stringify(applications, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Uygulama verilerini yazma hatası:', error)
    return false
  }
}

// API Routes
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'dealers'
  const id = searchParams.get('id')
  
  try {
    if (type === 'dealers') {
      const dealers = await readDealers()
      
      if (id) {
        const dealer = dealers.find(d => d.id === parseInt(id))
        if (!dealer) {
          return NextResponse.json({ error: 'Bayi bulunamadı' }, { status: 404 })
        }
        return NextResponse.json(dealer)
      }
      
      return NextResponse.json(dealers)
    } else if (type === 'products') {
      const products = await readProducts()
      
      if (id) {
        const product = products.find(p => p.id === parseInt(id))
        if (!product) {
          return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
        }
        return NextResponse.json(product)
      }
      
      return NextResponse.json(products)
    } else if (type === 'digital') {
      const digital = await readDigital()
      
      if (id) {
        const item = digital.find(d => d.id === parseInt(id))
        if (!item) {
          return NextResponse.json({ error: 'Dijital içerik bulunamadı' }, { status: 404 })
        }
        return NextResponse.json(item)
      }
      
      return NextResponse.json(digital)
    } else if (type === 'publications') {
      const publications = await readPublications()
      
      if (id) {
        const item = publications.find(p => p.id === parseInt(id))
        if (!item) {
          return NextResponse.json({ error: 'Yayın bulunamadı' }, { status: 404 })
        }
        return NextResponse.json(item)
      }
      
      return NextResponse.json(publications)
    } else if (type === 'applications') {
      const applications = await readApplications()
      
      if (id) {
        const app = applications.find(a => a.id === parseInt(id))
        if (!app) {
          return NextResponse.json({ error: 'Uygulama bulunamadı' }, { status: 404 })
        }
        return NextResponse.json(app)
      }
      
      return NextResponse.json(applications)
    }
    
    return NextResponse.json({ error: 'Geçersiz veri tipi' }, { status: 400 })
  } catch (error) {
    console.error('GET isteği hatası:', error)
    return NextResponse.json({ error: 'Veri alınamadı' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'dealers'
  
  try {
    const body = await request.json()
    
    if (type === 'dealers') {
      const dealers = await readDealers()
      const newId = dealers.length > 0 ? Math.max(...dealers.map(d => d.id)) + 1 : 1
      const newDealer: Dealer = { ...body, id: newId }
      
      dealers.push(newDealer)
      const success = await writeDealers(dealers)
      
      if (!success) {
        return NextResponse.json({ error: 'Bayi kaydedilemedi' }, { status: 500 })
      }
      
      return NextResponse.json(newDealer, { status: 201 })
    } else if (type === 'products') {
      const products = await readProducts()
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      const newProduct: Product = { ...body, id: newId }
      
      products.push(newProduct)
      const success = await writeProducts(products)
      
      if (!success) {
        return NextResponse.json({ error: 'Ürün kaydedilemedi' }, { status: 500 })
      }
      
      return NextResponse.json(newProduct, { status: 201 })
    } else if (type === 'digital') {
      const digital = await readDigital()
      const newId = digital.length > 0 ? Math.max(...digital.map(d => d.id)) + 1 : 1
      const newDigital: Digital = { ...body, id: newId }
      
      digital.push(newDigital)
      const success = await writeDigital(digital)
      
      if (!success) {
        return NextResponse.json({ error: 'Dijital içerik kaydedilemedi' }, { status: 500 })
      }
      
      return NextResponse.json(newDigital, { status: 201 })
    } else if (type === 'publications') {
      const publications = await readPublications()
      const newId = publications.length > 0 ? Math.max(...publications.map(p => p.id)) + 1 : 1
      const newPublication: Publication = { ...body, id: newId }
      
      publications.push(newPublication)
      const success = await writePublications(publications)
      
      if (!success) {
        return NextResponse.json({ error: 'Yayın kaydedilemedi' }, { status: 500 })
      }
      
      return NextResponse.json(newPublication, { status: 201 })
    } else if (type === 'applications') {
      const applications = await readApplications()
      const newId = applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1
      const newApplication: Application = { ...body, id: newId }
      
      applications.push(newApplication)
      const success = await writeApplications(applications)
      
      if (!success) {
        return NextResponse.json({ error: 'Uygulama kaydedilemedi' }, { status: 500 })
      }
      
      return NextResponse.json(newApplication, { status: 201 })
    }
    
    return NextResponse.json({ error: 'Geçersiz veri tipi' }, { status: 400 })
  } catch (error) {
    console.error('POST isteği hatası:', error)
    return NextResponse.json({ error: 'Veri eklenemedi' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'dealers'
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'ID belirtilmedi' }, { status: 400 })
  }
  
  try {
    const body = await request.json()
    const idNum = parseInt(id)
    
    if (type === 'dealers') {
      const dealers = await readDealers()
      const index = dealers.findIndex(d => d.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Bayi bulunamadı' }, { status: 404 })
      }
      
      const updatedDealer = { ...body, id: idNum }
      dealers[index] = updatedDealer
      const success = await writeDealers(dealers)
      
      if (!success) {
        return NextResponse.json({ error: 'Bayi güncellenemedi' }, { status: 500 })
      }
      
      return NextResponse.json(updatedDealer)
    } else if (type === 'products') {
      const products = await readProducts()
      const index = products.findIndex(p => p.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
      }
      
      const updatedProduct = { ...body, id: idNum }
      products[index] = updatedProduct
      const success = await writeProducts(products)
      
      if (!success) {
        return NextResponse.json({ error: 'Ürün güncellenemedi' }, { status: 500 })
      }
      
      return NextResponse.json(updatedProduct)
    } else if (type === 'digital') {
      const digital = await readDigital()
      const index = digital.findIndex(d => d.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Dijital içerik bulunamadı' }, { status: 404 })
      }
      
      const updatedDigital = { ...body, id: idNum }
      digital[index] = updatedDigital
      const success = await writeDigital(digital)
      
      if (!success) {
        return NextResponse.json({ error: 'Dijital içerik güncellenemedi' }, { status: 500 })
      }
      
      return NextResponse.json(updatedDigital)
    } else if (type === 'publications') {
      const publications = await readPublications()
      const index = publications.findIndex(p => p.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Yayın bulunamadı' }, { status: 404 })
      }
      
      const updatedPublication = { ...body, id: idNum }
      publications[index] = updatedPublication
      const success = await writePublications(publications)
      
      if (!success) {
        return NextResponse.json({ error: 'Yayın güncellenemedi' }, { status: 500 })
      }
      
      return NextResponse.json(updatedPublication)
    } else if (type === 'applications') {
      const applications = await readApplications()
      const index = applications.findIndex(a => a.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Uygulama bulunamadı' }, { status: 404 })
      }
      
      const updatedApplication = { ...body, id: idNum }
      applications[index] = updatedApplication
      const success = await writeApplications(applications)
      
      if (!success) {
        return NextResponse.json({ error: 'Uygulama güncellenemedi' }, { status: 500 })
      }
      
      return NextResponse.json(updatedApplication)
    }
    
    return NextResponse.json({ error: 'Geçersiz veri tipi' }, { status: 400 })
  } catch (error) {
    console.error('PUT isteği hatası:', error)
    return NextResponse.json({ error: 'Veri güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'dealers'
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'ID belirtilmedi' }, { status: 400 })
  }
  
  try {
    const idNum = parseInt(id)
    
    if (type === 'dealers') {
      const dealers = await readDealers()
      const index = dealers.findIndex(d => d.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Bayi bulunamadı' }, { status: 404 })
      }
      
      dealers.splice(index, 1)
      const success = await writeDealers(dealers)
      
      if (!success) {
        return NextResponse.json({ error: 'Bayi silinemedi' }, { status: 500 })
      }
      
      return NextResponse.json({ success: true })
    } else if (type === 'products') {
      const products = await readProducts()
      const index = products.findIndex(p => p.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
      }
      
      products.splice(index, 1)
      const success = await writeProducts(products)
      
      if (!success) {
        return NextResponse.json({ error: 'Ürün silinemedi' }, { status: 500 })
      }
      
      return NextResponse.json({ success: true })
    } else if (type === 'digital') {
      const digital = await readDigital()
      const index = digital.findIndex(d => d.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Dijital içerik bulunamadı' }, { status: 404 })
      }
      
      digital.splice(index, 1)
      const success = await writeDigital(digital)
      
      if (!success) {
        return NextResponse.json({ error: 'Dijital içerik silinemedi' }, { status: 500 })
      }
      
      return NextResponse.json({ success: true })
    } else if (type === 'publications') {
      const publications = await readPublications()
      const index = publications.findIndex(p => p.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Yayın bulunamadı' }, { status: 404 })
      }
      
      publications.splice(index, 1)
      const success = await writePublications(publications)
      
      if (!success) {
        return NextResponse.json({ error: 'Yayın silinemedi' }, { status: 500 })
      }
      
      return NextResponse.json({ success: true })
    } else if (type === 'applications') {
      const applications = await readApplications()
      const index = applications.findIndex(a => a.id === idNum)
      
      if (index === -1) {
        return NextResponse.json({ error: 'Uygulama bulunamadı' }, { status: 404 })
      }
      
      applications.splice(index, 1)
      const success = await writeApplications(applications)
      
      if (!success) {
        return NextResponse.json({ error: 'Uygulama silinemedi' }, { status: 500 })
      }
      
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'Geçersiz veri tipi' }, { status: 400 })
  } catch (error) {
    console.error('DELETE isteği hatası:', error)
    return NextResponse.json({ error: 'Veri silinemedi' }, { status: 500 })
  }
} 