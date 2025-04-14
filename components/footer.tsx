import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-16 border-b border-gray-800">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/kurmay-logo-white.png"
                alt="Kurmay Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 text-balance">
              Kurmay, eğitim yayıncılığında 30 yılı aşkın deneyimiyle Türkiye'nin lider eğitim içeriği sağlayıcısıdır.
              Yenilikçi yaklaşımımız ve kaliteli içeriklerimizle öğrencilerin ve eğitimcilerin başarısına katkı
              sağlıyoruz.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 relative">
              Hızlı Bağlantılar
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>Ana Sayfa</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/markalar"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  <span>Markalarımız</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dijital-icerikler"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  <span>Dijital İçerikler</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/yayinlar"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  <span>Yayınlarımız</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 relative">
              Destek
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/bayi-sorgulama"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  <span>Bayi Sorgulama</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/akilli-tahta"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  <span>Akıllı Tahta</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  <span>İletişim</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sikca-sorulan-sorular"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  <span>SSS</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold mb-6 relative">
              İletişim
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Kurmay Plaza, Atatürk Bulvarı No:123, 06050 Ankara, Türkiye</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">+90 (312) 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@kurmay.com.tr</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Mobil Uygulamalarımız</h4>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-400 hover:border-primary hover:text-primary"
                >
                  App Store'dan İndir
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-400 hover:border-primary hover:text-primary"
                >
                  Google Play'den İndir
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Kurmay Yayınları. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/gizlilik-politikasi" className="text-gray-500 hover:text-primary text-sm">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-sartlari" className="text-gray-500 hover:text-primary text-sm">
              Kullanım Şartları
            </Link>
            <Link href="/cerez-politikasi" className="text-gray-500 hover:text-primary text-sm">
              Çerez Politikası
            </Link>
            <Link href="/kvkk" className="text-gray-500 hover:text-primary text-sm">
              KVKK
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

