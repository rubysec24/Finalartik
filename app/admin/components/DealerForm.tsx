"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DealerFormProps {
  initialData?: {
    id?: number
    name: string
    address: string
    phone: string
    email: string
    city: string
    district: string
    publications: string[]
  }
  onSubmit: (data: any) => void
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

// Tüm il ve ilçeleri içeren veri yapısı
const districtsByCity: Record<string, string[]> = {
  "Adana": ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
  "Adıyaman": ["Adıyaman", "Besni", "Çelikhan", "Gerger", "Gölbaşı", "Kahta", "Samsat", "Sincik", "Tut"],
  "Afyonkarahisar": ["Afyonkarahisar", "Başmakçı", "Bayat", "Bolvadin", "Çay", "Çobanlar", "Dazkırı", "Dinar", "Emirdağ", "Evciler", "Hocalar", "İhsaniye", "İscehisar", "Kızılören", "Sandıklı", "Sinanpaşa", "Sultandağı", "Şuhut"],
  "Ağrı": ["Ağrı", "Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Patnos", "Taşlıçay", "Tutak"],
  "Aksaray": ["Ağaçören", "Aksaray", "Eskil", "Gülağaç", "Güzelyurt", "Ortaköy", "Sarıyahşi"],
  "Amasya": ["Amasya", "Göynücek", "Gümüşhacıköy", "Hamamözü", "Merzifon", "Suluova", "Taşova"],
  "Ankara": ["Altındağ", "Akyurt", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
  "Antalya": ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
  "Ardahan": ["Ardahan", "Çıldır", "Damal", "Göle", "Hanak", "Posof"],
  "Artvin": ["Ardanuç", "Arhavi", "Artvin", "Borçka", "Hopa", "Kemalpaşa", "Murgul", "Şavşat", "Yusufeli"],
  "Aydın": ["Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik", "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar"],
  "Balıkesir": ["Altıeylül", "Ayvalık", "Balya", "Bandırma", "Bigadiç", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gömeç", "Gönen", "Havran", "İvrindi", "Karesi", "Kepsut", "Manyas", "Marmara", "Savaştepe", "Sındırgı", "Susurluk"],
  "Bartın": ["Amasra", "Bartın", "Kurucaşile", "Ulus"],
  "Batman": ["Batman", "Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Sason"],
  "Bayburt": ["Aydıntepe", "Bayburt", "Demirözü"],
  "Bilecik": ["Bilecik", "Bozüyük", "Gölpazarı", "İnhisar", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"],
  "Bingöl": ["Adaklı", "Bingöl", "Genç", "Karlıova", "Kiğı", "Solhan", "Yayladere", "Yedisu"],
  "Bitlis": ["Adilcevaz", "Ahlat", "Bitlis", "Güroymak", "Hizan", "Mutki", "Tatvan"],
  "Bolu": ["Bolu", "Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Mudurnu", "Seben", "Yeniçağa"],
  "Burdur": ["Ağlasun", "Altınyayla", "Bucak", "Burdur", "Çavdır", "Çeltikçi", "Gölhisar", "Karamanlı", "Kemer", "Tefenni", "Yeşilova"],
  "Bursa": ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
  "Çanakkale": ["Ayvacık", "Bayramiç", "Biga", "Bozcaada", "Çan", "Çanakkale", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Yenice"],
  "Çankırı": ["Atkaracalar", "Bayramören", "Çankırı", "Çerkeş", "Eldivan", "Ilgaz", "Kızılırmak", "Korgun", "Kurşunlu", "Orta", "Şabanözü", "Yapraklı"],
  "Çorum": ["Alaca", "Bayat", "Boğazkale", "Çorum", "Dodurga", "İskilip", "Kargı", "Laçin", "Mecitözü", "Oğuzlar", "Ortaköy", "Osmancık", "Sungurlu", "Uğurludağ"],
  "Denizli": ["Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan", "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale", "Merkezefendi", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas"],
  "Diyarbakır": ["Bağlar", "Bismil", "Çermik", "Çınar", "Çüngüş", "Dicle", "Eğil", "Ergani", "Hani", "Hazro", "Kayapınar", "Kocaköy", "Kulp", "Lice", "Silvan", "Sur", "Yenişehir"],
  "Düzce": ["Akçakoca", "Cumayeri", "Çilimli", "Düzce", "Gölyaka", "Gümüşova", "Kaynaşlı", "Yığılca"],
  "Edirne": ["Edirne", "Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Süloğlu", "Uzunköprü"],
  "Elazığ": ["Ağın", "Alacakaya", "Arıcak", "Baskil", "Elazığ", "Karakoçan", "Keban", "Kovancılar", "Maden", "Palu", "Sivrice"],
  "Erzincan": ["Çayırlı", "Erzincan", "İliç", "Kemah", "Kemaliye", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"],
  "Erzurum": ["Aşkale", "Aziziye", "Çat", "Hınıs", "Horasan", "İspir", "Karaçoban", "Karayazı", "Köprüköy", "Narman", "Oltu", "Olur", "Palandöken", "Pasinler", "Pazaryolu", "Şenkaya", "Tekman", "Tortum", "Uzundere", "Yakutiye"],
  "Eskişehir": ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Mihalgazi", "Mihalıççık", "Odunpazarı", "Sarıcakaya", "Seyitgazi", "Sivrihisar", "Tepebaşı"],
  "Gaziantep": ["Araban", "İslahiye", "Karkamış", "Nizip", "Nurdağı", "Oğuzeli", "Şahinbey", "Şehitkamil", "Yavuzeli"],
  "Giresun": ["Alucra", "Bulancak", "Çamoluk", "Çanakçı", "Dereli", "Doğankent", "Espiye", "Eynesil", "Giresun", "Görele", "Güce", "Keşap", "Piraziz", "Şebinkarahisar", "Tirebolu", "Yağlıdere"],
  "Gümüşhane": ["Gümüşhane", "Kelkit", "Köse", "Kürtün", "Şiran", "Torul"],
  "Hakkari": ["Çukurca", "Derecik", "Hakkari", "Şemdinli", "Yüksekova"],
  "Hatay": ["Altınözü", "Antakya", "Arsuz", "Belen", "Defne", "Dörtyol", "Erzin", "Hassa", "İskenderun", "Kırıkhan", "Kumlu", "Payas", "Reyhanlı", "Samandağ", "Yayladağı"],
  "Iğdır": ["Aralık", "Iğdır", "Karakoyunlu", "Tuzluca"],
  "Isparta": ["Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Isparta", "Keçiborlu", "Senirkent", "Sütçüler", "Şarkikaraağaç", "Uluborlu", "Yalvaç", "Yenişarbademli"],
  "İstanbul": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Şile", "Silivri", "Şişli", "Sultanbeyli", "Sultangazi", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
  "İzmir": ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
  "Kahramanmaraş": ["Afşin", "Andırın", "Çağlayancerit", "Dulkadiroğlu", "Ekinözü", "Elbistan", "Göksun", "Nurhak", "Onikişubat", "Pazarcık", "Türkoğlu"],
  "Karabük": ["Eflani", "Eskipazar", "Karabük", "Ovacık", "Safranbolu", "Yenice"],
  "Karaman": ["Ayrancı", "Başyayla", "Ermenek", "Karaman", "Kazımkarabekir", "Sarıveliler"],
  "Kars": ["Akyaka", "Arpaçay", "Digor", "Kağızman", "Kars", "Sarıkamış", "Selim", "Susuz"],
  "Kastamonu": ["Abana", "Ağlı", "Araç", "Azdavay", "Bozkurt", "Çatalzeytin", "Cide", "Daday", "Devrekani", "Doğanyurt", "Hanönü", "İhsangazi", "İnebolu", "Kastamonu", "Küre", "Pınarbaşı", "Seydiler", "Şenpazar", "Taşköprü", "Tosya"],
  "Kayseri": ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "İncesu", "Kocasinan", "Melikgazi", "Özvatan", "Pınarbaşı", "Sarıoğlan", "Sarız", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"],
  "Kırıkkale": ["Bahşılı", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Kırıkkale", "Sulakyurt", "Yahşihan"],
  "Kırklareli": ["Babaeski", "Demirköy", "Kırklareli", "Kofçaz", "Lüleburgaz", "Pehlivanköy", "Pınarhisar", "Vize"],
  "Kırşehir": ["Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Kırşehir", "Mucur"],
  "Kilis": ["Elbeyli", "Kilis", "Musabeyli", "Polateli"],
  "Kocaeli": ["Başiskele", "Çayırova", "Darıca", "Derince", "Dilovası", "Gebze", "Gölcük", "İzmit", "Kandıra", "Karamürsel", "Kartepe", "Körfez"],
  "Konya": ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Çeltik", "Cihanbeyli", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"],
  "Kütahya": ["Altıntaş", "Aslanapa", "Çavdarhisar", "Domaniç", "Dumlupınar", "Emet", "Gediz", "Hisarcık", "Kütahya", "Pazarlar", "Şaphane", "Simav", "Tavşanlı"],
  "Malatya": ["Akçadağ", "Arapgir", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Doğanyol", "Hekimhan", "Kale", "Kuluncak", "Pütürge", "Yazıhan", "Yeşilyurt"],
  "Manisa": ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Köprübaşı", "Kula", "Salihli", "Sarıgöl", "Saruhanlı", "Selendi", "Soma", "Şehzadeler", "Turgutlu", "Yunusemre"],
  "Mardin": ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"],
  "Mersin": ["Akdeniz", "Anamur", "Aydıncık", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Mezitli", "Mut", "Silifke", "Tarsus", "Toroslar", "Yenişehir"],
  "Muğla": ["Bodrum", "Dalaman", "Datça", "Fethiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Menteşe", "Milas", "Ortaca", "Seydikemer", "Ula", "Yatağan"],
  "Muş": ["Bulanık", "Hasköy", "Korkut", "Malazgirt", "Muş", "Varto"],
  "Nevşehir": ["Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Nevşehir", "Ürgüp"],
  "Niğde": ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Niğde", "Ulukışla"],
  "Ordu": ["Akkuş", "Altınordu", "Aybastı", "Çamaş", "Çatalpınar", "Çaybaşı", "Fatsa", "Gölköy", "Gülyalı", "Gürgentepe", "İkizce", "Kabadüz", "Kabataş", "Korgan", "Kumru", "Mesudiye", "Perşembe", "Ulubey", "Ünye"],
  "Osmaniye": ["Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Osmaniye", "Sumbas", "Toprakkale"],
  "Rize": ["Ardeşen", "Çamlıhemşin", "Çayeli", "Derepazarı", "Fındıklı", "Güneysu", "Hemşin", "İkizdere", "İyidere", "Kalkandere", "Pazar", "Rize"],
  "Sakarya": ["Adapazarı", "Akyazı", "Arifiye", "Erenler", "Ferizli", "Geyve", "Hendek", "Karapürçek", "Karasu", "Kaynarca", "Kocaali", "Pamukova", "Sapanca", "Serdivan", "Söğütlü", "Taraklı"],
  "Samsun": ["19 Mayıs", "Alaçam", "Asarcık", "Atakum", "Ayvacık", "Bafra", "Canik", "Çarşamba", "Havza", "İlkadım", "Kavak", "Ladik", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü", "Yakakent"],
  "Siirt": ["Baykan", "Eruh", "Kurtalan", "Pervari", "Siirt", "Şirvan", "Tillo"],
  "Sinop": ["Ayancık", "Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Saraydüzü", "Sinop", "Türkeli"],
  "Sivas": ["Akıncılar", "Altınyayla", "Divriği", "Doğanşar", "Gemerek", "Gölova", "Hafik", "İmranlı", "Kangal", "Koyulhisar", "Sivas", "Suşehri", "Şarkışla", "Ulaş", "Yıldızeli", "Zara"],
  "Şanlıurfa": ["Akçakale", "Birecik", "Bozova", "Ceylanpınar", "Eyyübiye", "Halfeti", "Haliliye", "Harran", "Hilvan", "Karaköprü", "Siverek", "Suruç", "Viranşehir"],
  "Şırnak": ["Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Silopi", "Şırnak", "Uludere"],
  "Tekirdağ": ["Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"],
  "Tokat": ["Almus", "Artova", "Başçiftlik", "Erbaa", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Tokat", "Turhal", "Yeşilyurt", "Zile"],
  "Trabzon": ["Akçaabat", "Araklı", "Arsin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı", "Maçka", "Of", "Ortahisar", "Sürmene", "Şalpazarı", "Tonya", "Vakfıkebir", "Yomra"],
  "Tunceli": ["Çemişgezek", "Hozat", "Mazgirt", "Nazımiye", "Ovacık", "Pertek", "Pülümür", "Tunceli"],
  "Uşak": ["Banaz", "Eşme", "Karahallı", "Sivaslı", "Ulubey", "Uşak"],
  "Van": ["Bahçesaray", "Başkale", "Çaldıran", "Çatak", "Edremit", "Erciş", "Gevaş", "Gürpınar", "İpekyolu", "Muradiye", "Özalp", "Saray", "Tuşba"],
  "Yalova": ["Altınova", "Armutlu", "Çınarcık", "Çiftlikköy", "Termal", "Yalova"],
  "Yozgat": ["Akdağmadeni", "Aydıncık", "Boğazlıyan", "Çandır", "Çayıralan", "Çekerek", "Kadışehri", "Saraykent", "Sarıkaya", "Şefaatli", "Sorgun", "Yenifakılı", "Yerköy", "Yozgat"],
  "Zonguldak": ["Alaplı", "Çaycuma", "Devrek", "Ereğli", "Gökçebey", "Kilimli", "Kozlu", "Zonguldak"]
}

export default function DealerForm({ initialData, onSubmit }: DealerFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      address: "",
      phone: "",
      email: "",
      city: "",
      district: "",
      publications: []
    }
  )
  
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("normal")
  const [excelFile, setExcelFile] = useState<File | null>(null)
  const [excelUploadError, setExcelUploadError] = useState<string | null>(null)
  const [excelUploading, setExcelUploading] = useState(false)

  // Şehir değiştiğinde ilçeleri güncelle
  useEffect(() => {
    console.log("Şehir değişti:", formData.city)
    
    if (formData.city && formData.city in districtsByCity) {
      // Seçilen şehre ait ilçeler
      const cityDistricts = districtsByCity[formData.city]
      console.log("İlçeler yüklendi:", cityDistricts)
      setAvailableDistricts(cityDistricts)
    } else {
      setAvailableDistricts([])
    }
  }, [formData.city])

  // Marka seçenekleri
  const publicationOptions = [
    "Fenomen Okul", 
    "Fenomen Çocuk", 
    "More&More English", 
    "KOZ", 
    "KKD", 
    "Orjin", 
    "VAF", 
    "WOW"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    
    try {
      console.log("Form gönderiliyor:", formData)
      
      // Yeni bayi kaydediliyor veya mevcut bayi güncelleniyor
      const url = formData.id
        ? `/api/db?type=dealers&id=${formData.id}`
        : '/api/db?type=dealers'
      
      const method = formData.id ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Bayi kaydedilemedi')
      }
      
      const savedData = await response.json()
      console.log("Bayi kaydedildi:", savedData)
      
      // Form başarıyla gönderildiğinde callback fonksiyonunu çağır
      onSubmit(savedData)
    } catch (err) {
      console.error("Bayi kayıt hatası:", err)
      setError(err instanceof Error ? err.message : 'Bayi kaydedilirken bir hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  const togglePublication = (publication: string) => {
    setFormData(prevState => {
      const publications = [...prevState.publications]
      
      if (publications.includes(publication)) {
        return {
          ...prevState,
          publications: publications.filter(p => p !== publication)
        }
      } else {
        return {
          ...prevState,
          publications: [...publications, publication]
        }
      }
    })
  }

  // İl değiştiğinde ilçeyi otomatik sıfırla
  const handleCityChange = (city: string) => {
    console.log("Şehir seçildi:", city)
    
    setFormData({
      ...formData,
      city,
      district: ""
    })
  }

  // İlçe değiştiğinde
  const handleDistrictChange = (district: string) => {
    console.log("İlçe seçildi:", district)
    
    setFormData({
      ...formData,
      district
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      
      // Excel dosyası mı kontrol et
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
          file.type === "application/vnd.ms-excel") {
        setExcelFile(file)
        setExcelUploadError(null)
      } else {
        setExcelUploadError("Lütfen geçerli bir Excel dosyası (.xlsx veya .xls) seçin")
        setExcelFile(null)
      }
    }
  }

  const handleExcelUpload = async () => {
    if (!excelFile) {
      setExcelUploadError("Lütfen bir Excel dosyası seçin")
      return
    }
    
    setExcelUploading(true)
    setExcelUploadError(null)
    
    try {
      const formData = new FormData()
      formData.append('file', excelFile)
      
      const response = await fetch('/api/db?type=dealers-bulk-upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Excel yüklenirken bir hata oluştu')
      }
      
      const result = await response.json()
      
      // Form başarıyla gönderildiğinde callback fonksiyonunu çağır
      onSubmit(result)
    } catch (err) {
      console.error("Excel bayi yükleme hatası:", err)
      setExcelUploadError(err instanceof Error ? err.message : 'Excel yüklenirken bir hata oluştu')
    } finally {
      setExcelUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Bayi Düzenle" : "Yeni Bayi Ekle"}</CardTitle>
        <CardDescription>
          {initialData 
            ? "Bayi bilgilerini düzenleyin"
            : "Yeni bir bayi eklemek için aşağıdaki formu doldurun veya Excel ile toplu ekleyin"}
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
        <TabsList className="mb-4">
          <TabsTrigger value="normal">Tekli Ekleme</TabsTrigger>
          <TabsTrigger value="excel">Excel ile Toplu Ekleme</TabsTrigger>
        </TabsList>
        
        <TabsContent value="normal">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                Hata: {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Bayi Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Şehir</Label>
                <Select 
                  value={formData.city} 
                  onValueChange={handleCityChange}
                  required
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {turkishCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">İlçe</Label>
                <Select 
                  value={formData.district} 
                  onValueChange={handleDistrictChange}
                  disabled={!formData.city || availableDistricts.length === 0}
                  required
                >
                  <SelectTrigger id="district">
                    <SelectValue placeholder={formData.city ? "İlçe seçin" : "Önce şehir seçin"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDistricts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Markalar</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {publicationOptions.map((publication) => (
                  <div key={publication} className="flex items-center space-x-2">
                    <Checkbox
                      id={`publication-${publication}`}
                      checked={formData.publications.includes(publication)}
                      onCheckedChange={() => togglePublication(publication)}
                    />
                    <Label htmlFor={`publication-${publication}`} className="cursor-pointer">
                      {publication}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onSubmit(null)}
                disabled={isSaving}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Kaydediliyor..." : initialData ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="excel">
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Excel ile Toplu Bayi Ekleme</AlertTitle>
              <AlertDescription>
                Çok sayıda bayiyi excel dosyası ile tek seferde ekleyebilirsiniz.
                Lütfen <a href="/templates/bayi-sablon.xlsx" className="underline">şablon dosyayı</a> indirin ve doldurun.
              </AlertDescription>
            </Alert>
            
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Excel dosyasını sürükleyin veya aşağıdan seçin
              </p>
              <Input 
                type="file" 
                id="excel-upload" 
                accept=".xlsx,.xls" 
                className="max-w-sm"
                onChange={handleFileChange}
              />
              {excelFile && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Yüklemeye hazır: {excelFile.name}
                </p>
              )}
              {excelUploadError && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  {excelUploadError}
                </p>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => onSubmit(null)}>
              İptal
            </Button>
            <Button 
              onClick={handleExcelUpload} 
              disabled={!excelFile || excelUploading}
              className="bg-green-600 hover:bg-green-700"
            >
              {excelUploading ? "Yükleniyor..." : "Excel Dosyasını Yükle"}
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
} 