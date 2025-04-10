"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building,
  Users,
  BookOpen,
  HelpCircle,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    department: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus("idle")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          department: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="https://picsum.photos/1200/400?random=contact"
          alt="İletişim"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">İletişim</h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Sorularınız, önerileriniz ve işbirliği talepleriniz için bizimle iletişime geçin. Size en kısa sürede
                dönüş yapacağız.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Adres</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Kurmay Plaza, Atatürk Bulvarı No:123, 06050 Ankara, Türkiye
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Telefon</h3>
                    <p className="text-gray-600 dark:text-gray-300">+90 (312) 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">E-posta</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@kurmay.com.tr</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Çalışma Saatleri</h3>
                    <p className="text-gray-600 dark:text-gray-300">Pazartesi - Cuma: 09:00 - 18:00</p>
                    <p className="text-gray-600 dark:text-gray-300">Cumartesi: 09:00 - 13:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 lg:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Bize Ulaşın</h2>

                {formStatus === "success" ? (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Mesajınız Gönderildi!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.
                    </p>
                    <Button onClick={() => setFormStatus("idle")} className="bg-primary hover:bg-primary/90 text-white">
                      Yeni Mesaj Gönder
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Adınız Soyadınız *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          E-posta Adresiniz *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Telefon Numaranız
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          İlgili Departman *
                        </label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleSelectChange("department", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Departman seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Satış</SelectItem>
                            <SelectItem value="support">Müşteri Hizmetleri</SelectItem>
                            <SelectItem value="technical">Teknik Destek</SelectItem>
                            <SelectItem value="marketing">Pazarlama</SelectItem>
                            <SelectItem value="hr">İnsan Kaynakları</SelectItem>
                            <SelectItem value="other">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Konu *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Mesajınız *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full min-h-[150px]"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Mesaj Gönder
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              <span className="relative">
                Departmanlarımız
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              İhtiyacınıza göre ilgili departmanlarımızla doğrudan iletişime geçebilirsiniz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Building className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Genel Müdürlük</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Kurumsal iletişim, işbirlikleri ve stratejik ortaklıklar için genel müdürlüğümüz ile iletişime
                  geçebilirsiniz.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">gm@kurmay.com.tr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">+90 (312) 123 45 68</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Satış ve Pazarlama</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Ürünlerimiz, fiyatlandırma ve kampanyalar hakkında bilgi almak için satış ekibimizle iletişime
                  geçebilirsiniz.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">satis@kurmay.com.tr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">+90 (312) 123 45 69</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Yayın ve İçerik</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Yayınlarımız, içeriklerimiz ve editöryal konular için yayın departmanımızla iletişime geçebilirsiniz.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">yayin@kurmay.com.tr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">+90 (312) 123 45 70</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <HelpCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Müşteri Hizmetleri</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sipariş takibi, iade ve değişim işlemleri için müşteri hizmetleri ekibimizle iletişime geçebilirsiniz.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">destek@kurmay.com.tr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">+90 (312) 123 45 71</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">İnsan Kaynakları</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Kariyer fırsatları ve iş başvuruları için insan kaynakları departmanımızla iletişime geçebilirsiniz.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">ik@kurmay.com.tr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">+90 (312) 123 45 72</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Eğitim ve Akademi</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Eğitim çözümleri, öğretmen eğitimleri ve akademik işbirlikleri için eğitim departmanımızla iletişime
                  geçebilirsiniz.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">egitim@kurmay.com.tr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-gray-600 dark:text-gray-300">+90 (312) 123 45 73</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              <span className="relative">
                Sık Sorulan Sorular
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              İletişim kurmadan önce sık sorulan sorulara göz atabilirsiniz
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="general">Genel</TabsTrigger>
                <TabsTrigger value="orders">Siparişler</TabsTrigger>
                <TabsTrigger value="products">Ürünler</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        Kurmay Yayınları'na nasıl ulaşabilirim?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Kurmay Yayınları'na telefon, e-posta veya web sitemizdeki iletişim formu aracılığıyla
                        ulaşabilirsiniz. İletişim bilgilerimiz sayfanın üst kısmında yer almaktadır.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        Bayilik başvurusu nasıl yapabilirim?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Bayilik başvurusu için web sitemizdeki "Bayilik Başvuru Formu"nu doldurabilir veya
                        satis@kurmay.com.tr adresine e-posta gönderebilirsiniz. Başvurunuz incelendikten sonra size en
                        kısa sürede dönüş yapılacaktır.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        Çalışma saatleriniz nedir?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Genel merkez ve müşteri hizmetlerimiz Pazartesi-Cuma günleri 09:00-18:00, Cumartesi günleri
                        09:00-13:00 saatleri arasında hizmet vermektedir. Resmi tatillerde kapalıyız.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="orders">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        Siparişimi nasıl takip edebilirim?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Siparişinizi, size e-posta ile gönderilen sipariş takip numarası ile web sitemizdeki "Sipariş
                        Takip" sayfasından takip edebilirsiniz. Ayrıca müşteri hizmetlerimizi arayarak da sipariş
                        durumunuz hakkında bilgi alabilirsiniz.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Kargo ücreti ne kadar?</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        150 TL ve üzeri siparişlerde kargo ücretsizdir. 150 TL altındaki siparişlerde kargo ücreti 20
                        TL'dir. Özel kampanyalarda farklı kargo koşulları uygulanabilir.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        İade ve değişim koşulları nelerdir?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Ürünlerimizi, teslim tarihinden itibaren 14 gün içinde iade edebilirsiniz. İade etmek
                        istediğiniz ürünlerin kullanılmamış ve orijinal ambalajında olması gerekmektedir. İade ve
                        değişim işlemleri için müşteri hizmetlerimizle iletişime geçebilirsiniz.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="products">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        Dijital içeriklere nasıl erişebilirim?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Dijital içeriklerimize web sitemiz üzerinden veya mobil uygulamalarımız aracılığıyla
                        erişebilirsiniz. Satın aldığınız dijital içerikler hesabınıza tanımlanır ve istediğiniz cihazdan
                        erişim sağlayabilirsiniz.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        Akıllı tahta uygulamalarınız hangi işletim sistemleriyle uyumludur?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Akıllı tahta uygulamalarımız Windows ve macOS işletim sistemleriyle uyumludur. Ayrıca web
                        tabanlı uygulamalarımıza herhangi bir tarayıcı üzerinden erişebilirsiniz.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        Ürünleriniz hakkında detaylı bilgi almak istiyorum.
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Ürünlerimiz hakkında detaylı bilgi almak için web sitemizdeki ürün sayfalarını ziyaret edebilir,
                        kataloglarımızı indirebilir veya müşteri hizmetlerimizle iletişime geçebilirsiniz. Ayrıca satış
                        ekibimiz size özel ürün tanıtımı yapabilir.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[500px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.4025385602!2d32.85345!3d39.9207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzE0LjUiTiAzMsKwNTEnMTIuNCJF!5e0!3m2!1str!2str!4v1625000000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Kurmay Yayınları Harita"
        ></iframe>
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Kurmay Yayınları Genel Merkez</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            Kurmay Plaza, Atatürk Bulvarı No:123, 06050 Ankara, Türkiye
          </p>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
            Yol Tarifi Al
          </Button>
        </div>
      </div>
    </div>
  )
}

