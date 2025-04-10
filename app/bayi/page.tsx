"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Mail, Filter, X, User } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Statik bayi verileri
const staticDealers = [
  {
    id: 1,
    name: "Kurmay Kitabevi (Merkez)",
    address: "Atatürk Caddesi No:123, Kızılay",
    phone: "0312 123 45 67",
    email: "info@kurmaykitabevi.com",
    city: "Ankara"
  },
  {
    id: 2,
    name: "Eğitim Dünyası Kitapçısı",
    address: "İstiklal Caddesi No:456",
    phone: "0212 987 65 43",
    email: "info@egitimdünyasi.com",
    city: "İstanbul"
  },
  {
    id: 3,
    name: "Kurmay Yayınları Satış Noktası",
    address: "Cumhuriyet Meydanı No:78",
    phone: "0232 456 78 90",
    email: "izmir@kurmayyayinlari.com",
    city: "İzmir"
  },
  {
    id: 4,
    name: "Akademik Kitapevi",
    address: "Üniversite Caddesi No:25, Osmangazi",
    phone: "0224 234 56 78",
    email: "satis@akademikkitapevi.com",
    city: "Bursa"
  },
  {
    id: 5,
    name: "Bilim Kitap Merkezi",
    address: "Atatürk Bulvarı No:45, Seyhan",
    phone: "0322 345 67 89",
    email: "bilim@kitapmerkezi.com",
    city: "Adana"
  },
  {
    id: 6,
    name: "Kurmay Eğitim Noktası",
    address: "Lara Caddesi No:112, Muratpaşa",
    phone: "0242 456 78 90",
    email: "antalya@kurmayyayinlari.com",
    city: "Antalya"
  },
  {
    id: 7,
    name: "Öğrenci Kitapları",
    address: "Meram Yeni Yol Caddesi No:67",
    phone: "0332 567 89 01",
    email: "info@ogrencikitaplari.com",
    city: "Konya"
  },
  {
    id: 8,
    name: "Karadeniz Kitap Dünyası",
    address: "Maraş Caddesi No:34, Ortahisar",
    phone: "0462 678 90 12",
    email: "trabzon@kitapdunyasi.com",
    city: "Trabzon"
  }
]

// Tüm şehirleri listele
const allCities = Array.from(new Set(staticDealers.map(dealer => dealer.city))).sort()

interface Dealer {
  id: number
  name: string
  address: string
  phone: string
  email: string
  city: string
}

export default function DealerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null)
  const [dealers] = useState<Dealer[]>(staticDealers)
  const [activeTab, setActiveTab] = useState("tumBayiler")
  
  // Bayileri filtrele
  const filteredDealers = dealers.filter(dealer => {
    const matchesCity = !selectedCity || dealer.city === selectedCity
    const matchesSearch = !searchTerm || 
      dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCity && matchesSearch
  })

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

      <div className="container mx-auto px-4 -mt-6">
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Bayi adı veya adres ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-gray-300 w-full"
                />
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
              
              <div className="w-full md:w-64">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="border-gray-300 w-full">
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tüm Şehirler</SelectItem>
                    {allCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="bg-[#F26A21] hover:bg-[#d85c19] text-white w-full md:w-auto"
                onClick={() => {
                  // Zaten otomatik filtreleniyor, ancak formu gönder hissi vermek için
                  console.log("Filtreleme yapıldı:", { searchTerm, selectedCity })
                }}
              >
                <Search className="mr-2 h-4 w-4" />
                Bayi Ara
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tumBayiler" value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-white border">
              <TabsTrigger value="tumBayiler" className="data-[state=active]:bg-[#F26A21] data-[state=active]:text-white">
                Tüm Bayiler
              </TabsTrigger>
              {allCities.slice(0, 3).map(city => (
                <TabsTrigger 
                  key={city} 
                  value={city}
                  className="data-[state=active]:bg-[#F26A21] data-[state=active]:text-white"
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="bg-white py-1 px-4 rounded-full border text-sm">
              {filteredDealers.length} bayi bulundu
            </div>
          </div>

          <TabsContent value="tumBayiler" className="mt-0">
            {/* Bayiler Listesi */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDealers.length > 0 ? (
                filteredDealers.map(dealer => (
                  <div 
                    key={dealer.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                    onClick={() => setSelectedDealer(dealer)}
                  >
                    <div className="border-l-4 border-[#F26A21] px-4 py-3 bg-gradient-to-r from-[#F26A21]/5 to-white">
                      <h3 className="font-semibold text-lg">{dealer.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1 text-[#F26A21]" />
                        {dealer.city}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-1 text-[#F26A21] shrink-0" />
                          <span className="text-gray-700">{dealer.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-[#F26A21] shrink-0" />
                          <span className="text-gray-700">{dealer.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-[#F26A21] shrink-0" />
                          <span className="text-gray-700">{dealer.email}</span>
                        </div>
                      </div>
                      
                      <button 
                        className="mt-4 w-full text-[#F26A21] border border-[#F26A21] hover:bg-[#F26A21] hover:text-white py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDealer(dealer);
                        }}
                      >
                        Detayları Görüntüle
                      </button>
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
                      setSelectedCity("");
                      setSearchTerm("");
                      setActiveTab("tumBayiler");
                    }}
                    className="border-[#F26A21] text-[#F26A21] hover:bg-[#F26A21] hover:text-white"
                  >
                    Filtreleri Temizle
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {allCities.slice(0, 3).map(city => (
            <TabsContent key={city} value={city} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dealers.filter(d => d.city === city).map(dealer => (
                  <div 
                    key={dealer.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                    onClick={() => setSelectedDealer(dealer)}
                  >
                    <div className="border-l-4 border-[#F26A21] px-4 py-3 bg-gradient-to-r from-[#F26A21]/5 to-white">
                      <h3 className="font-semibold text-lg">{dealer.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1 text-[#F26A21]" />
                        {dealer.city}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-1 text-[#F26A21] shrink-0" />
                          <span className="text-gray-700">{dealer.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-[#F26A21] shrink-0" />
                          <span className="text-gray-700">{dealer.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-[#F26A21] shrink-0" />
                          <span className="text-gray-700">{dealer.email}</span>
                        </div>
                      </div>
                      
                      <button 
                        className="mt-4 w-full text-[#F26A21] border border-[#F26A21] hover:bg-[#F26A21] hover:text-white py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDealer(dealer);
                        }}
                      >
                        Detayları Görüntüle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Bayi Detay Modalı */}
      {selectedDealer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedDealer(null)}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start p-6 border-b">
              <div>
                <h3 className="text-xl font-semibold text-[#F26A21]">{selectedDealer.name}</h3>
                <p className="text-gray-500 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedDealer.city}
                </p>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setSelectedDealer(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start">
                <div className="bg-[#F26A21]/10 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-[#F26A21]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Adres</h4>
                  <p className="text-gray-800">{selectedDealer.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F26A21]/10 p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5 text-[#F26A21]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Telefon</h4>
                  <p className="text-gray-800">{selectedDealer.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F26A21]/10 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-[#F26A21]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">E-posta</h4>
                  <p className="text-gray-800">{selectedDealer.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F26A21]/10 p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-[#F26A21]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Çalışma Saatleri</h4>
                  <p className="text-gray-800">Hafta içi: 09:00 - 18:00</p>
                  <p className="text-gray-800">Cumartesi: 09:00 - 14:00</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t">
              <Button 
                onClick={() => setSelectedDealer(null)}
                className="bg-[#F26A21] hover:bg-[#d85c19] text-white"
              >
                Kapat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 