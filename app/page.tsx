"use client"

import { Suspense, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Laptop, Video, ShoppingCart, Monitor, Brain, Sparkles, Book, Lightbulb, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Dinamik olarak yüklenen bileşenler
const Hero = dynamic(() => import("@/components/hero"), {
  loading: () => <div className="h-[600px] bg-gray-100 dark:bg-gray-800 animate-pulse" />,
})

const BrandShowcase = dynamic(() => import("@/components/brand-showcase"), {
  ssr: false,
  loading: () => <div className="py-20 bg-gray-100 dark:bg-gray-800" />,
})

const DigitalSolutions = dynamic(() => import("@/components/digital-solutions"), {
  ssr: false,
  loading: () => <div className="py-20 bg-gray-100 dark:bg-gray-800" />,
})

const FeaturedContent = dynamic(() => import("@/components/featured-content"), {
  ssr: false,
  loading: () => <div className="py-20 bg-gray-100 dark:bg-gray-800" />,
})

const NewsletterSignup = dynamic(() => import("@/components/newsletter-signup"), {
  ssr: false,
  loading: () => <div className="py-20 bg-gray-100 dark:bg-gray-800" />,
})

export default function Home() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div className="h-[600px] bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="py-20 bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
        <DigitalSolutions />
      </Suspense>

      {/* Markalarımız */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Markalarımızla</span> Öğrenmeyi Sevdirecek Çözümler
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Her seviyeye uygun kaliteli ve güvenilir içerikler
            </p>
          </div>
          
          <BrandShowcase />
        </div>
      </section>

      {/* Öne Çıkan İçerikler Bölümü */}
      <section className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat"></div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-48 right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-24 left-12 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 mb-3">
              ÖZEL SEÇKİ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Öne Çıkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">İçeriklerimiz</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Türkiye'nin eğitim alanındaki en güncel ve kapsamlı kaynakları
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedCard 
              icon={<Sparkles className="h-6 w-6" />}
              title="MEB Uyumlu Ders Anlatım Setleri"
              description="Eğitim müfredatına uygun olarak hazırlanmış, öğrencilerin akademik başarısını artıran kapsamlı ders setleri"
              color="from-amber-600 to-orange-700"
              link="/yayinlarimiz/ders-anlatimlari"
              image="slider1.jpg"
            />
            <FeaturedCard 
              icon={<Book className="h-6 w-6" />}
              title="Soru Bankaları ve Deneme Sınavları"
              description="Sınavlara hazırlık için çeşitli zorluk seviyelerinde binlerce soru ve özel hazırlanmış denemeler"
              color="from-blue-600 to-indigo-700"
              link="/yayinlarimiz/soru-bankalari"
              image="slider2.jpg"
            />
            <FeaturedCard 
              icon={<Lightbulb className="h-6 w-6" />}
              title="Akıllı Tahta Uygulamaları"
              description="Modern sınıf ortamları için etkileşimli ve zengin içeriklerle donatılmış dijital eğitim platformu"
              color="from-emerald-600 to-teal-700"
              link="/akilli-tahta"
              image="slider3.jpg"
            />
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="group">
              <Link href="/yayinlarimiz">
                Tüm İçerikleri Keşfedin
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-20 bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
        <NewsletterSignup />
      </Suspense>
    </div>
  )
}

// Modern FeatureButton bileşeni
const FeatureButton = ({ 
  icon, 
  title, 
  href, 
  color,
  description
}: { 
  icon: React.ReactNode; 
  title: string; 
  href: string; 
  color: string;
  description: string; 
}) => {
  return (
    <Link href={href} className="block h-full group">
      <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative">
        {/* Üst renkli kısım */}
        <div className={`h-2.5 bg-gradient-to-r ${color} w-full`}></div>
        
        {/* İçerik */}
        <div className="p-6 flex flex-col h-[calc(100%-0.625rem)]">
          {/* İkon */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          
          {/* Başlık */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          
          {/* Açıklama */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
          
          {/* Bağlantı */}
          <div className="mt-auto">
            <span className="text-xs font-medium inline-flex items-center text-gray-500 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
              DAHA FAZLA
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Modern OnlineSalesButton bileşeni
const OnlineSalesButton = ({ 
  icon, 
  title, 
  color,
  description
}: { 
  icon: React.ReactNode; 
  title: string; 
  color: string;
  description: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative cursor-pointer group">
          {/* Üst renkli kısım */}
          <div className={`h-2.5 bg-gradient-to-r ${color} w-full`}></div>
          
          {/* İçerik */}
          <div className="p-6 flex flex-col h-[calc(100%-0.625rem)]">
            {/* İkon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            
            {/* Başlık */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            
            {/* Açıklama */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
            
            {/* Bağlantı */}
            <div className="mt-auto">
              <span className="text-xs font-medium inline-flex items-center text-gray-500 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300">
                MAĞAZALARI GÖR
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-4">Mağaza Seçin</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://fenomenkitap.com.tr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="mx-auto w-20 h-20 mb-4 relative">
                <Image
                  src="/images/brands/fenomen.png"
                  alt="Fenomen"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Fenomen</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Fenomen markasının kitapları ve eğitim materyalleri</p>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">
                Mağazaya Git
              </Button>
            </div>
          </a>
          <a 
            href="https://moreandmorekitap.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="mx-auto w-20 h-20 mb-4 relative">
                <Image
                  src="/images/brands/moreandmore-logo.png"
                  alt="More&More"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">More&More</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">More&More dil eğitimi kitapları ve materyalleri</p>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500">
                Mağazaya Git
              </Button>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Öne çıkan kartlar için bileşeni tamamen yeniden düzenliyorum - görsel sığdırma sorununu çözüyorum
const FeaturedCard = ({ 
  icon, 
  title, 
  description, 
  color,
  link,
  image
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
  link: string;
  image: string;
}) => {
  // Her kart için doğru görsel yolunu belirliyorum
  const imageUrl = image && image.startsWith('/') 
    ? image 
    : `/images/sliders/${image}`
  
  return (
    <div className="group h-[320px] relative overflow-hidden rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Arkaplan görseli - div background-image olarak, böylece tam sığdırabiliriz */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Fallback background color in case image fails to load */}
      <div className={`absolute inset-0 ${color ? `bg-gradient-to-br ${color}` : 'bg-gray-800'} opacity-30`}></div>
      
      {/* Koyu gradient overlay - içeriğin okunabilir olmasını sağlar */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
      
      {/* İçerik */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white">{icon}</div>
          </div>
          
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            Öne Çıkan
          </span>
        </div>
        
        <div className="transform transition-transform duration-300">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/90 text-sm md:text-base mb-4">{description}</p>
          <Link href={link}>
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black w-full"
            >
              Daha Fazla →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

