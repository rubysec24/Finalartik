"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Mail, BookOpen, Store, Filter } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Dealer türü tanımı
type Dealer = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  publications: string[];
}

// Tüm iller
const turkishCities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye",
  "Düzce"
].sort()

// İl-İlçe verileri (önemli illerin ilçeleri)
const districtsByCity: Record<string, string[]> = {
  "Ankara": ["Altındağ", "Çankaya", "Etimesgut", "Gölbaşı", "Keçiören", "Mamak", "Polatlı", "Sincan", "Yenimahalle"],
  "İstanbul": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Şile", "Silivri", "Şişli", "Sultanbeyli", "Sultangazi", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
  "İzmir": ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
  "Bursa": ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
  "Adana": ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
  "Antalya": ["Akseki", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
  "Konya": ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Çeltik", "Cihanbeyli", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"]
  // Not: Tüm illerin tüm ilçelerini eklemek burada çok uzun olacaktır. Gerçek uygulamada bir API'dan alınması önerilir.
}

// Markalarımız
const brands = ["Fenomen Okul", "Fenomen Çocuk", "More&More English", "KOZ", "KKD", "Orjin", "VAF", "WOW"]

export default function BayiSorgulama() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedPublications, setSelectedPublications] = useState<string[]>([])
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  
  // Bayileri API'dan çekme
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        setLoading(true)
        // Admin API yerine DB API'den bayileri çek
        const response = await fetch('/api/db?type=dealers')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setDealers(data)
        setError(null)
      } catch (err) {
        setError("Bayiler yüklenirken bir hata oluştu.")
        console.error("Bayi veri çekme hatası:", err)
        
        // Hata durumunda statik demo verilerini kullan
        const staticDealers = [
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
        
        setDealers(staticDealers)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDealers()
  }, [])
  
  // Bayileri filtrele
  const filteredDealers = dealers.filter(dealer => {
    // Şehir filtresi
    const matchesCity = selectedCity === "all" || dealer.city === selectedCity
    
    // İlçe filtresi
    const matchesDistrict = selectedDistrict === "all" || dealer.district === selectedDistrict
    
    // Arama filtresi
    const matchesSearch = !searchTerm || 
          dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.district?.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Yayın filtresi
    const matchesPublications = selectedPublications.length === 0 || 
      selectedPublications.some(pub => dealer.publications.includes(pub))
    
    return matchesCity && matchesDistrict && matchesSearch && matchesPublications
  })

  // İl seçildiğinde ilçe değişkenini güncelleyen fonksiyon
  const handleCityChange = (value: string) => {
    setSelectedCity(value)
    setSelectedDistrict("all") // Şehir değiştiğinde ilçeyi sıfırla
    setHasSearched(true) // Arama yapılmış olarak işaretle
  }

  // Input değiştiğinde arama yapılmış olarak işaretle
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (e.target.value.length > 0) {
      setHasSearched(true)
    }
  }

  // Select değiştiğinde arama yapılmış olarak işaretle
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value)
    setHasSearched(true)
  }

  // Yayın türü değiştiğinde arama yapılmış olarak işaretle
  const togglePublication = (publication: string) => {
    setSelectedPublications(prev => {
      const newValue = prev.includes(publication) 
        ? prev.filter(p => p !== publication) 
        : [...prev, publication]
      
      // Eğer en az bir yayın türü seçiliyse arama yapılmış olarak işaretle
      if (newValue.length > 0) {
        setHasSearched(true)
      }
      
      return newValue
    })
  }

  // Listedeki bayilerin bulunduğu şehirler
  const availableCities = Array.from(new Set(dealers.map(dealer => dealer.city))).sort()

  // Seçili şehire ait ilçeler
  const availableDistricts = selectedCity !== "all" && districtsByCity[selectedCity] 
    ? districtsByCity[selectedCity] 
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#F26A21] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">Bayi Sorgulama</h1>
          <p className="text-center text-white/80 max-w-2xl mx-auto">
            Size en yakın Kurmay bayisini bulun ve ürünlerimize kolayca ulaşın. Türkiye genelinde {dealers.length} bayimiz ile hizmetinizdeyiz.
          </p>
        </div>
          </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#F26A21]" />
              Bayi Arama ve Filtreleme
              </CardTitle>
            </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                <label className="block text-sm font-medium mb-1">Arama</label>
                  <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                    placeholder="Bayi adı veya adres ara..."
                      value={searchTerm}
                    onChange={handleInputChange}
                    className="pl-9"
                  />
                </div>
              </div>

                <div>
                <label className="block text-sm font-medium mb-1">Şehir</label>
                  <Select value={selectedCity} onValueChange={handleCityChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Şehir seçin" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">Tüm Şehirler</SelectItem>
                    {turkishCities.map(city => (
                      <SelectItem 
                        key={city} 
                        value={city}
                        disabled={!availableCities.includes(city)}
                      >
                        {city}{!availableCities.includes(city) ? " (Bayi yok)" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">İlçe</label>
                  <Select
                    value={selectedDistrict}
                  onValueChange={handleDistrictChange}
                  disabled={selectedCity === "all" || !districtsByCity[selectedCity]}
                  >
                    <SelectTrigger>
                    <SelectValue placeholder="İlçe seçin" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">Tüm İlçeler</SelectItem>
                    {availableDistricts.map(district => (
                      <SelectItem 
                        key={district} 
                        value={district}
                      >
                            {district}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

                        <div>
              <label className="block text-sm font-medium mb-2">Markalarımız</label>
              <div className="flex flex-wrap gap-4">
                {brands.map(brand => (
                              <div key={brand} className="flex items-center">
                    <Checkbox 
                                  id={`brand-${brand}`}
                      checked={selectedPublications.includes(brand)}
                      onCheckedChange={() => togglePublication(brand)}
                      className="mr-2"
                    />
                    <Label htmlFor={`brand-${brand}`} className="cursor-pointer flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-[#F26A21]" />
                                  {brand}
                    </Label>
                              </div>
                            ))}
                          </div>
                        </div>

            <div className="flex justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                  setSelectedCity("all")
                  setSelectedDistrict("all")
                  setSearchTerm("")
                  setSelectedPublications([])
                  setHasSearched(false)
                          }}
                        >
                          Filtreleri Temizle
                </Button>
              </div>
            </CardContent>
          </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent text-[#F26A21] rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Yükleniyor...</span>
            </div>
            <p className="mt-4 text-gray-600">Bayiler yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
            <Button className="mt-4" variant="outline" onClick={() => window.location.reload()}>
              Yeniden Dene
            </Button>
          </div>
        ) : hasSearched ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Bayilerimiz</h2>
              <div className="bg-white py-1 px-3 rounded-full border text-sm">
                {filteredDealers.length} bayi bulundu
              </div>
                        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDealers.length > 0 ? (
                filteredDealers.map(dealer => (
                  <div key={dealer.id} className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#F26A21]">
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{dealer.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-1 text-[#F26A21] shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700">{dealer.city} / {dealer.district}</p>
                            <p className="text-gray-600">{dealer.address}</p>
                          </div>
                                    </div>
                                    <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-[#F26A21] shrink-0" />
                          <span className="text-gray-600">{dealer.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-[#F26A21] shrink-0" />
                          <span className="text-gray-600">{dealer.email}</span>
                                    </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {dealer.publications.map(pub => (
                            <span key={pub} className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded">
                              <BookOpen className="h-3 w-3 mr-1 text-[#F26A21]" />
                              {pub}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="rounded-full bg-[#F26A21]/5 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-[#F26A21]" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Sonuç Bulunamadı</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Arama kriterlerinize uygun bayi bulunamadı. Lütfen farklı bir şehir seçin veya arama teriminizi değiştirin.
                  </p>
                                    <Button
                                      variant="outline"
                    onClick={() => {
                      setSelectedCity("all")
                      setSelectedDistrict("all")
                      setSearchTerm("")
                      setSelectedPublications([])
                      setHasSearched(false)
                    }}
                    className="border-[#F26A21] text-[#F26A21] hover:bg-[#F26A21] hover:text-white"
                  >
                    Filtreleri Temizle
                                    </Button>
                                  </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex rounded-full bg-[#F26A21]/5 p-6 mb-4">
              <Search className="h-12 w-12 text-[#F26A21]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Bayi Arayın</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Bayilerimizi görüntülemek için lütfen yukarıdaki arama kriterlerini belirleyip "Bayi Ara" butonuna tıklayın.
            </p>
            </div>
          )}

        <div className="bg-[#F26A21]/5 rounded-lg p-8 my-12 text-center">
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            <Store className="h-12 w-12 text-[#F26A21] mb-4" />
            <h2 className="text-2xl font-bold mb-2">Bayimiz Olmak İster misiniz?</h2>
            <p className="text-gray-600 mb-6">
              Kurmay Yayınları bayisi olmak ve ürünlerimizi satmak isterseniz, bayi başvuru formunu doldurarak başvuruda 
              bulunabilirsiniz. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </p>
            <Button className="bg-[#F26A21] hover:bg-[#d85c19] text-white px-8 py-6 text-lg">
              Bayi Başvuru Formu
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

