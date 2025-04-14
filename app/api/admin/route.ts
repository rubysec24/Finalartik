import { NextRequest, NextResponse } from "next/server"

// Örnek veriler
const sampleData = {
  products: [
    {
      id: 1,
      title: "Türkçe Öğretim Seti",
      description: "Yabancılar için Türkçe öğretim seti",
      price: "1200",
      category: "Dil Öğretimi",
      level: "Başlangıç",
      image: "/products/turkish-set.jpg"
    },
    {
      id: 2,
      title: "İngilizce Öğretim Seti",
      description: "Kapsamlı İngilizce öğretim seti",
      price: "950",
      category: "Dil Öğretimi",
      level: "Orta",
      image: "/products/english-set.jpg"
    }
  ],
  digital: [
    {
      id: 1,
      title: "Akıllı Tahta Uygulaması",
      description: "İnteraktif akıllı tahta uygulaması",
      platforms: ["Windows", "macOS", "iOS"],
      features: ["İnteraktif Alıştırmalar", "Video Dersler", "Sınav Modülü"],
      category: "Eğitim Yazılımı",
      image: "/digital/smartboard-app.jpg"
    },
    {
      id: 2,
      title: "Kelime Öğrenme Uygulaması",
      description: "Eğlenceli kelime öğrenme uygulaması",
      platforms: ["Android", "iOS"],
      features: ["Günlük Pratikler", "Ses Tanıma", "Kişiselleştirilmiş Öğrenme"],
      category: "Mobil Uygulama",
      image: "/digital/vocabulary-app.jpg"
    }
  ],
  magazines: [
    {
      id: 1,
      title: "Eğitim Dünyası",
      description: "Eğitim sektöründen haberler ve makaleler",
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
      description: "Dil öğrenme teknikleri ve başarı hikayeleri",
      price: "30",
      frequency: "İki Aylık",
      category: "Dil Öğrenimi",
      pages: 82,
      editor: "Zeynep Kaya",
      image: "/magazines/language-bridge.jpg"
    }
  ],
  catalogs: [
    {
      id: 1,
      title: "İlkokul Yayınları Kataloğu",
      description: "İlkokul seviyesinde tüm yayınlarımız",
      year: "2023",
      brand: "Kurmay Yayınları",
      pages: 48,
      image: "/catalogs/primary-catalog.jpg"
    },
    {
      id: 2,
      title: "Ortaokul Yayınları Kataloğu",
      description: "Ortaokul seviyesinde tüm yayınlarımız",
      year: "2023",
      brand: "Kurmay Yayınları",
      pages: 52,
      image: "/catalogs/middle-catalog.jpg"
    }
  ],
  dealers: [
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
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "products"
  const id = searchParams.get("id")

  // Belirli bir ID'ye göre veri isteniyorsa
  if (id) {
    const item = sampleData[type as keyof typeof sampleData].find(
      (item: any) => item.id === parseInt(id)
    )
    
    if (!item) {
      return NextResponse.json({ error: "Öğe bulunamadı" }, { status: 404 })
    }
    
    return NextResponse.json(item)
  }

  // Tüm verileri döndür
  return NextResponse.json(sampleData[type as keyof typeof sampleData] || [])
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "products"
  
  try {
    const body = await request.json()
    
    // Yeni öğeyi ekle (Gerçek uygulamada veritabanına kaydedilir)
    const newId = Math.max(...sampleData[type as keyof typeof sampleData].map((item: any) => item.id)) + 1
    const newItem = { ...body, id: newId }
    
    sampleData[type as keyof typeof sampleData].push(newItem)
    
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json({ error: "Kaydetme işlemi başarısız" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "products"
  const id = searchParams.get("id")
  
  if (!id) {
    return NextResponse.json({ error: "ID belirtilmedi" }, { status: 400 })
  }
  
  try {
    const body = await request.json()
    const idInt = parseInt(id)
    
    // Güncellenecek öğeyi bul
    const index = sampleData[type as keyof typeof sampleData].findIndex(
      (item: any) => item.id === idInt
    )
    
    if (index === -1) {
      return NextResponse.json({ error: "Öğe bulunamadı" }, { status: 404 })
    }
    
    // Öğeyi güncelle
    const updatedItem = { ...body, id: idInt }
    sampleData[type as keyof typeof sampleData][index] = updatedItem
    
    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("PUT error:", error)
    return NextResponse.json({ error: "Güncelleme işlemi başarısız" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "products"
  const id = searchParams.get("id")
  
  if (!id) {
    return NextResponse.json({ error: "ID belirtilmedi" }, { status: 400 })
  }
  
  try {
    const idInt = parseInt(id)
    
    // Silinecek öğeyi bul
    const index = sampleData[type as keyof typeof sampleData].findIndex(
      (item: any) => item.id === idInt
    )
    
    if (index === -1) {
      return NextResponse.json({ error: "Öğe bulunamadı" }, { status: 404 })
    }
    
    // Öğeyi sil
    sampleData[type as keyof typeof sampleData].splice(index, 1)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ error: "Silme işlemi başarısız" }, { status: 500 })
  }
} 