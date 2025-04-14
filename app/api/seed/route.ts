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

// Örnek bayi verileri
const sampleDealers = [
  {
    id: 1,
    name: "Kurmay Kitabevi (Merkez)",
    address: "Atatürk Caddesi No:123, Kızılay",
    phone: "0312 123 45 67",
    email: "info@kurmaykitabevi.com",
    city: "Ankara",
    district: "Çankaya",
    publications: ["Fenomen Okul", "More&More English", "KOZ"]
  },
  {
    id: 2,
    name: "Eğitim Dünyası Kitapçısı",
    address: "İstiklal Caddesi No:456",
    phone: "0212 987 65 43",
    email: "info@egitimdünyasi.com",
    city: "İstanbul",
    district: "Beyoğlu",
    publications: ["Fenomen Çocuk", "KOZ"]
  },
  {
    id: 3,
    name: "Kurmay Yayınları Satış Noktası",
    address: "Cumhuriyet Meydanı No:78",
    phone: "0232 456 78 90",
    email: "izmir@kurmayyayinlari.com",
    city: "İzmir",
    district: "Konak",
    publications: ["KKD", "More&More English"]
  },
  {
    id: 4,
    name: "Akademik Kitapevi",
    address: "Üniversite Caddesi No:25, Osmangazi",
    phone: "0224 234 56 78",
    email: "satis@akademikkitapevi.com",
    city: "Bursa",
    district: "Osmangazi",
    publications: ["Fenomen Okul", "Orjin", "WOW"]
  },
  {
    id: 5,
    name: "Bilim Kitap Merkezi",
    address: "Atatürk Bulvarı No:45, Seyhan",
    phone: "0322 345 67 89",
    email: "bilim@kitapmerkezi.com",
    city: "Adana",
    district: "Seyhan",
    publications: ["Fenomen Çocuk", "VAF"]
  },
  {
    id: 6,
    name: "Kurmay Eğitim Noktası",
    address: "Lara Caddesi No:112, Muratpaşa",
    phone: "0242 456 78 90",
    email: "antalya@kurmayyayinlari.com",
    city: "Antalya",
    district: "Muratpaşa",
    publications: ["KKD"]
  },
  {
    id: 7,
    name: "Öğrenci Kitapları",
    address: "Meram Yeni Yol Caddesi No:67",
    phone: "0332 567 89 01",
    email: "info@ogrencikitaplari.com",
    city: "Konya",
    district: "Meram",
    publications: ["Fenomen Okul", "More&More English", "Orjin"]
  },
  {
    id: 8,
    name: "Karadeniz Kitap Dünyası",
    address: "Maraş Caddesi No:34, Ortahisar",
    phone: "0462 678 90 12",
    email: "trabzon@kitapdunyasi.com",
    city: "Trabzon",
    district: "Ortahisar",
    publications: ["VAF", "WOW"]
  }
]

// Örnek ürün verileri
const sampleProducts = [
  {
    id: 1,
    title: "Türkçe Öğretim Seti",
    description: "Yabancılar için Türkçe öğretim seti. A1-C2 seviyelerine kadar kapsamlı bir eğitim seti.",
    price: "1200",
    category: "Dil Öğretimi",
    level: "Başlangıç",
    image: "/products/turkish-set.jpg"
  },
  {
    id: 2,
    title: "İngilizce Öğretim Seti",
    description: "Kapsamlı İngilizce öğretim seti. Okul öncesinden ileri seviyeye kadar tüm ihtiyaçlar için.",
    price: "950",
    category: "Dil Öğretimi",
    level: "Orta",
    image: "/products/english-set.jpg"
  },
  {
    id: 3,
    title: "YKS Matematik Soru Bankası",
    description: "Yükseköğretim Kurumları Sınavı (YKS) için hazırlanmış kapsamlı matematik soru bankası.",
    price: "120",
    category: "Sınav Hazırlık",
    level: "Lise",
    image: "/products/math-book.jpg"
  },
  {
    id: 4,
    title: "İlkokul Türkçe Seti",
    description: "İlkokul öğrencileri için Türkçe eğitim seti. Okuma, yazma ve anlama becerilerini geliştirmek için ideal.",
    price: "350",
    category: "İlkokul",
    level: "1. Sınıf",
    image: "/products/turkish-primary.jpg"
  },
  {
    id: 5,
    title: "Okul Öncesi Aktivite Kitabı",
    description: "Okul öncesi çocukların zihinsel gelişimini destekleyen aktivite ve boyama kitabı.",
    price: "75",
    category: "Okul Öncesi",
    level: "4-6 Yaş",
    image: "/products/preschool-activity.jpg"
  },
  {
    id: 6,
    title: "LGS Tüm Dersler Soru Bankası",
    description: "Liselere Geçiş Sınavı (LGS) için tüm dersleri kapsayan soru bankası.",
    price: "180",
    category: "Sınav Hazırlık",
    level: "Ortaokul",
    image: "/products/lgs-question-bank.jpg"
  }
]

// Örnek dijital içerik verileri
const sampleDigital = [
  {
    id: 1,
    title: "Akıllı Tahta Uygulaması",
    description: "İnteraktif akıllı tahta uygulaması. Öğretmenler için tasarlanmış, dersleri daha etkileşimli hale getiren dijital içerik.",
    platforms: ["Windows", "macOS", "iOS"],
    features: ["İnteraktif Alıştırmalar", "Video Dersler", "Sınav Modülü"],
    category: "Eğitim Yazılımı",
    image: "/digital/smartboard-app.jpg"
  },
  {
    id: 2,
    title: "Kelime Öğrenme Uygulaması",
    description: "Eğlenceli kelime öğrenme uygulaması. Oyunlarla yabancı dil kelime öğrenmeyi kolaylaştırır.",
    platforms: ["Android", "iOS"],
    features: ["Günlük Pratikler", "Ses Tanıma", "Kişiselleştirilmiş Öğrenme"],
    category: "Mobil Uygulama",
    image: "/digital/vocabulary-app.jpg"
  },
  {
    id: 3,
    title: "E-Kitap Koleksiyonu",
    description: "Tüm ders kitaplarımızın dijital sürümlerini içeren e-kitap koleksiyonu.",
    platforms: ["Web", "Android", "iOS"],
    features: ["Not Alma", "Vurgulama", "Sesli Okuma"],
    category: "E-Kitap",
    image: "/digital/ebook-collection.jpg"
  },
  {
    id: 4,
    title: "Sanal Sınıf Platformu",
    description: "Uzaktan eğitim için tasarlanmış sanal sınıf platformu. Canlı dersler ve öğrenci takibi.",
    platforms: ["Web"],
    features: ["Canlı Ders", "Ekran Paylaşımı", "Kayıt", "Öğrenci Takibi"],
    category: "Uzaktan Eğitim",
    image: "/digital/virtual-classroom.jpg"
  }
]

// Örnek yayın verileri
const samplePublications = [
  {
    id: 1,
    title: "Eğitim Dünyası",
    description: "Eğitim sektöründen haberler ve makaleler içeren aylık dergi.",
    price: "25",
    frequency: "Aylık",
    category: "Eğitim",
    pages: 64,
    editor: "Ahmet Yılmaz",
    image: "/magazines/education-world.jpg"
  },
  {
    id: 2,
    title: "Dil Köprüsü",
    description: "Dil öğrenme teknikleri ve başarı hikayeleri içeren dergi.",
    price: "30",
    frequency: "İki Aylık",
    category: "Dil Öğrenimi",
    pages: 82,
    editor: "Zeynep Kaya",
    image: "/magazines/language-bridge.jpg"
  },
  {
    id: 3,
    title: "İlkokul Yayınları Kataloğu",
    description: "İlkokul seviyesinde tüm yayınlarımızı içeren katalog.",
    year: "2023",
    brand: "Kurmay Yayınları",
    category: "Katalog",
    pages: 48,
    image: "/catalogs/primary-catalog.jpg"
  },
  {
    id: 4,
    title: "Ortaokul Yayınları Kataloğu",
    description: "Ortaokul seviyesinde tüm yayınlarımızı içeren katalog.",
    year: "2023",
    brand: "Kurmay Yayınları",
    category: "Katalog",
    pages: 52,
    image: "/catalogs/middle-catalog.jpg"
  },
  {
    id: 5,
    title: "Eğitim Araştırmaları Dergisi",
    description: "Eğitim alanında akademik araştırmaları içeren hakemli dergi.",
    price: "45",
    frequency: "Üç Aylık",
    category: "Akademik",
    pages: 120,
    editor: "Prof. Dr. Elif Aydın",
    image: "/magazines/education-research.jpg"
  }
]

// Örnek uygulama verileri
const sampleApplications = [
  {
    id: 1,
    title: "Kurmay Öğrenci",
    description: "Öğrenciler için ders çalışma, planlama ve takip uygulaması.",
    platforms: ["Android", "iOS"],
    appStoreUrl: "https://apps.apple.com/tr/app/kurmay-ogrenci",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kurmay.ogrenci",
    features: ["Ders Takibi", "Sınav Takvimi", "Çalışma Programı", "Not Tutma"],
    category: "Eğitim",
    image: "/applications/student-app.jpg"
  },
  {
    id: 2,
    title: "Kelime Kartları",
    description: "Yabancı dil kelime öğrenimi için flashcard uygulaması.",
    platforms: ["Android", "iOS"],
    appStoreUrl: "https://apps.apple.com/tr/app/kurmay-kelime",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kurmay.kelime",
    features: ["Binlerce Kelime", "Sesli Telaffuz", "İlerleme Takibi"],
    category: "Dil Öğrenimi",
    image: "/applications/flashcards-app.jpg"
  },
  {
    id: 3,
    title: "Sınav Hazırlık",
    description: "LGS ve YKS sınavlarına hazırlık için soru çözme ve test uygulaması.",
    platforms: ["Android", "iOS", "Web"],
    appStoreUrl: "https://apps.apple.com/tr/app/kurmay-sinav",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kurmay.sinav",
    features: ["Binlerce Test Sorusu", "Konu Anlatımları", "Performans Analizi", "Hedef Belirleme"],
    category: "Sınav Hazırlık",
    image: "/applications/exam-prep-app.jpg"
  },
  {
    id: 4,
    title: "Öğretmen Asistanı",
    description: "Öğretmenler için sınıf yönetimi ve öğrenci takip uygulaması.",
    platforms: ["Android", "iOS", "Web"],
    appStoreUrl: "https://apps.apple.com/tr/app/kurmay-ogretmen",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kurmay.ogretmen",
    features: ["Sınıf Yönetimi", "Not Girişi", "Veli İletişimi", "Ödev Takibi"],
    category: "Eğitim",
    image: "/applications/teacher-assistant-app.jpg"
  }
]

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

// Verileri dosyalara yaz
async function seedData() {
  try {
    await ensureDirectoryExists()
    
    // Bayi verilerini yaz
    await fsPromises.writeFile(DEALERS_FILE, JSON.stringify(sampleDealers, null, 2), 'utf8')
    
    // Ürün verilerini yaz
    await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(sampleProducts, null, 2), 'utf8')
    
    // Dijital içerik verilerini yaz
    await fsPromises.writeFile(DIGITAL_FILE, JSON.stringify(sampleDigital, null, 2), 'utf8')
    
    // Yayın verilerini yaz
    await fsPromises.writeFile(PUBLICATIONS_FILE, JSON.stringify(samplePublications, null, 2), 'utf8')
    
    // Uygulama verilerini yaz
    await fsPromises.writeFile(APPLICATIONS_FILE, JSON.stringify(sampleApplications, null, 2), 'utf8')
    
    return true
  } catch (error) {
    console.error('Veri yerleştirme hatası:', error)
    return false
  }
}

// API endpoint
export async function GET(request: NextRequest) {
  // Güvenlik anahtarı kontrolü (opsiyonel)
  const searchParams = request.nextUrl.searchParams
  const apiKey = searchParams.get('key')
  
  // API anahtarı kontrol edebiliriz (basit bir örnek)
  // Gerçek bir projede daha güvenli bir yöntem kullanılmalı
  if (apiKey !== 'kurmay-secret-key') {
    return NextResponse.json({ error: 'Geçersiz API anahtarı' }, { status: 401 })
  }
  
  try {
    const success = await seedData()
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Örnek veriler başarıyla yüklendi',
        dealersCount: sampleDealers.length,
        productsCount: sampleProducts.length,
        digitalCount: sampleDigital.length,
        publicationsCount: samplePublications.length,
        applicationsCount: sampleApplications.length
      })
    } else {
      return NextResponse.json({ error: 'Veriler yüklenirken bir hata oluştu' }, { status: 500 })
    }
  } catch (error) {
    console.error('Seed API hatası:', error)
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
  }
} 