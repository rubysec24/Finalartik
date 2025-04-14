"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Monitor, Apple, ExternalLink, Filter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AkilliTahtaPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const applications = [
    {
      brand: "Fenomen",
      title: "Fenomen Akıllı Tahta",
      description: "Öğretmen ve öğrenciler için interaktif içerikler",
      platform: "Windows",
      color: "#FF8A00",
      icon: <Monitor className="h-12 w-12" />,
      downloadUrl: "#",
      logo: "/images/akilli-tahta/fenomen-logo.png"
    },
    {
      brand: "Fenomen",
      title: "Fenomen Akıllı Tahta",
      description: "Linux tabanlı platformlar için özel versiyon",
      platform: "Pardus",
      color: "#FF8A00",
      icon: <Monitor className="h-12 w-12" />,
      downloadUrl: "#",
      logo: "/images/akilli-tahta/fenomen-logo.png"
    },
    {
      brand: "Fenomen",
      title: "Fenomen Akıllı Tahta",
      description: "Apple cihazları için optimize edilmiş versiyon",
      platform: "macOS",
      color: "#FF8A00",
      icon: <Apple className="h-12 w-12" />,
      downloadUrl: "#",
      logo: "/images/akilli-tahta/fenomen-logo.png"
    },
    {
      brand: "Fenomen",
      title: "Fenomen Akıllı Tahta",
      description: "Tüm tarayıcılarda çalışan web uygulaması",
      platform: "Web",
      color: "#FF8A00",
      icon: <ExternalLink className="h-12 w-12" />,
      downloadUrl: "#",
      logo: "/images/akilli-tahta/fenomen-logo.png"
    },
    {
      brand: "More&More",
      title: "More&More Akıllı Tahta",
      description: "Dil eğitimi odaklı interaktif içerikler",
      platform: "Windows",
      color: "#FFC837",
      icon: <Monitor className="h-12 w-12" />,
      downloadUrl: "#",
      logo: "/images/akilli-tahta/moremore-logo.png"
    },
    {
      brand: "More&More",
      title: "More&More Akıllı Tahta",
      description: "Linux tabanlı platformlar için özel versiyon",
      platform: "Pardus",
      color: "#FFC837",
      icon: <Monitor className="h-12 w-12" />,
      downloadUrl: "#",
      logo: "/images/akilli-tahta/moremore-logo.png"
    },
    {
      brand: "More&More",
      title: "More&More Akıllı Tahta",
      description: "Apple cihazları için optimize edilmiş versiyon",
      platform: "macOS",
      color: "#FFC837",
      icon: <Apple className="h-12 w-12" />,
      downloadUrl: "#",
      logo: "/images/akilli-tahta/moremore-logo.png"
    },
    {
      brand: "More&More",
      title: "More&More Akıllı Tahta",
      description: "Tüm tarayıcılarda çalışan web uygulaması",
      platform: "Web",
      color: "#FFC837",
      icon: <ExternalLink className="h-12 w-12" />,
      downloadUrl: "#",
      logo: "/images/akilli-tahta/moremore-logo.png"
    }
  ];

  const filteredApps = selectedPlatform 
    ? applications.filter(app => app.platform === selectedPlatform)
    : applications;

  const platforms = ['Windows', 'macOS', 'Pardus', 'Web'];

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section with Background */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/akilli-tahta/hero-bg.jpg" 
            alt="Akıllı Tahta" 
            fill
            style={{ objectFit: "cover" }}
            className="opacity-40"
            priority
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-80 mix-blend-multiply">
            <div className="absolute inset-0 mix-blend-multiply bg-gray-800 opacity-20"></div>
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-md">
            Akıllı Tahta Uygulamaları
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-white/90">
            Fenomen ve More&More akıllı tahta uygulamaları ile derslerinizi daha interaktif ve etkili hale getirin.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-6">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => setSelectedPlatform(null)}
              className={`${!selectedPlatform ? 'bg-white text-orange-700 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              Tümü
            </Button>
            {platforms.map(platform => (
              <Button 
                key={platform}
                variant="secondary" 
                size="lg" 
                onClick={() => setSelectedPlatform(platform)}
                className={`${selectedPlatform === platform ? 'bg-white text-orange-700 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                <div className="flex items-center">
                  {platform === 'Windows' || platform === 'Pardus' ? (
                    <Monitor className="mr-2 h-5 w-5" />
                  ) : platform === 'macOS' ? (
                    <Apple className="mr-2 h-5 w-5" />
                  ) : (
                    <ExternalLink className="mr-2 h-5 w-5" />
                  )}
                  {platform}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="container mx-auto px-4 py-24 max-w-7xl -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredApps.map((app, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-28 h-28">
                      <Image 
                        src={app.logo}
                        alt={app.brand}
                        fill
                        style={{ objectFit: "contain" }}
                        className="opacity-40 group-hover:opacity-100 transition-opacity duration-500 filter grayscale-[50%] group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundColor: app.color,
                      opacity: 0.3
                    }}
                  ></div>
                </div>
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"
                  style={{ 
                    backgroundImage: `linear-gradient(to bottom, transparent, ${app.color}DD)` 
                  }}
                ></div>
                <div className="absolute top-4 left-4 z-20 flex items-center justify-center">
                  <span 
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm"
                    style={{ 
                      backgroundColor: `${app.color}30`,
                      color: app.brand === "Fenomen" ? "#D97706" : "#B45309", 
                      border: `1px solid ${app.color}70`
                    }}
                  >
                    {app.platform}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">{app.brand}</h3>
                  <p className="text-sm text-white/90 line-clamp-2 drop-shadow-sm">{app.description}</p>
                </div>
              </div>
              <CardContent className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-full" 
                    style={{ 
                      backgroundColor: `${app.color}20`,
                      color: app.brand === "Fenomen" ? "#D97706" : "#B45309"
                    }}
                  >
                    {app.icon}
                  </div>
                </div>
                <Button
                  variant={app.platform === "Web" ? "outline" : "default"}
                  style={{ 
                    backgroundColor: app.platform !== "Web" ? (app.brand === "Fenomen" ? "#F59E0B" : "#D97706") : 'transparent',
                    borderColor: app.platform === "Web" ? (app.brand === "Fenomen" ? "#F59E0B" : "#D97706") : 'transparent',
                    color: app.platform === "Web" ? (app.brand === "Fenomen" ? "#D97706" : "#B45309") : 'white'
                  }}
                  className="rounded-full hover:shadow-lg transition-all duration-300"
                >
                  {app.platform === "Web" ? (
                    <>
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Tarayıcıda Aç
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      İndir
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Özellikler
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">İnteraktif İçerikler</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Zengin içerikler ve interaktif alıştırmalar ile öğrencilerin derse katılımını artırın.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Çevrimdışı Erişim</h3>
              <p className="text-gray-600 dark:text-gray-300">
                İnternet olmayan ortamlarda bile tüm içeriklere kesintisiz erişim sağlayın.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Sürekli Güncellenen İçerik</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Düzenli güncellemelerle yeni içerikler ve özelliklere erişin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Image Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/akilli-tahta/feature-image.jpg" 
                alt="Akıllı Tahta Kullanımı"
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Akıllı Tahta Deneyimini Yeniden Keşfedin
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Fenomen ve More&More akıllı tahta uygulamaları, modern eğitim teknolojilerini kullanarak öğrenme deneyimini baştan yaratır. Yenilikçi içerikler ve kullanıcı dostu arayüzlerle, derslerinizi daha verimli ve eğlenceli hale getirin.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="min-w-5 mt-1 text-amber-600">•</div>
                  <p className="text-gray-600 dark:text-gray-300">Sürükle-bırak etkileşimleri ile pratik öğrenme</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 mt-1 text-amber-600">•</div>
                  <p className="text-gray-600 dark:text-gray-300">Çoklu dokunma desteği ile grup çalışmalarına uygun</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 mt-1 text-amber-600">•</div>
                  <p className="text-gray-600 dark:text-gray-300">Müfredata uygun zengin içerik kütüphanesi</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="min-w-5 mt-1 text-amber-600">•</div>
                  <p className="text-gray-600 dark:text-gray-300">HD kalitesinde video ve animasyonlar</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Sistem Gereksinimleri
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <Monitor className="h-8 w-8 text-amber-600" />
                <h3 className="text-2xl font-semibold">Windows</h3>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>Windows 10 veya üzeri</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>Intel Core i3 veya üzeri işlemci</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>4GB RAM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>2GB boş disk alanı</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>DirectX 11 uyumlu ekran kartı</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <Apple className="h-8 w-8 text-amber-600" />
                <h3 className="text-2xl font-semibold">macOS</h3>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>macOS 10.15 veya üzeri</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>Intel Core i3 veya üzeri işlemci</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>4GB RAM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>2GB boş disk alanı</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>Metal uyumlu ekran kartı</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <Monitor className="h-8 w-8 text-amber-600" />
                <h3 className="text-2xl font-semibold">Pardus</h3>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>Pardus 21 veya üzeri</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>Intel Core i3 veya üzeri işlemci</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>4GB RAM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>2GB boş disk alanı</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>OpenGL 3.3 uyumlu ekran kartı</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 