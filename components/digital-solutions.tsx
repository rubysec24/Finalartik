"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MonitorSmartphone, Smartphone, Tablet, Presentation, Cloud, ShoppingCart, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface SolutionType {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  color: string;
  gradient: string;
  isOnlineSales?: boolean;
}

const DigitalSolutions = () => {
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Gözlemci ile bileşen görünürlüğünü kontrol etme
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const solutions: SolutionType[] = [
    {
      id: 1,
      icon: MonitorSmartphone,
      title: "Akıllı Tahta",
      description: "Modern sınıf ortamları için interaktif içerikler",
      features: [
        "Zengin animasyon ve simülasyonlar",
        "Ön izleme ve soru çözümleri",
        "Öğretmen kontrol paneli",
        "İnteraktif testler ve oyunlar"
      ],
      href: "/akilli-tahta",
      color: "bg-amber-500",
      gradient: "from-amber-400 to-orange-600"
    },
    {
      id: 2,
      icon: Presentation,
      title: "Video Çözümler",
      description: "Uzman öğretmenlerden video anlatımları",
      features: [
        "Uzman öğretmen kadrosu",
        "Tüm konularda kapsamlı içerikler",
        "İnternet olmadan da izleme imkanı",
        "Nitelikli animasyonlar"
      ],
      href: "/video-cozumler",
      color: "bg-red-500",
      gradient: "from-red-400 to-pink-600"
    },
    {
      id: 3,
      icon: Tablet,
      title: "Dijital İçerikler",
      description: "Her seviyeye uygun dijital materyaller",
      features: [
        "Müfredat uyumlu kitaplar",
        "Yapay zeka destekli öğrenme",
        "Çoklu platform desteği",
        "Kişiselleştirilmiş eğitim"
      ],
      href: "/dijital-icerikler",
      color: "bg-blue-500",
      gradient: "from-blue-400 to-cyan-600"
    },
    {
      id: 4,
      icon: Smartphone,
      title: "Mobil Uygulamalar",
      description: "Her an her yerde eğitim için mobil çözümler",
      features: [
        "Offline çalışma imkanı",
        "Kişiselleştirilmiş öğrenme planları",
        "Gelişim takibi",
        "Anlık bildirimler"
      ],
      href: "/mobil-uygulamalar",
      color: "bg-purple-500",
      gradient: "from-purple-400 to-indigo-600"
    },
    {
      id: 5,
      icon: Cloud,
      title: "Yapay Zeka",
      description: "Yapay zeka destekli eğitim teknolojileri",
      features: [
        "Kişiye özel öğrenme asistanı",
        "Anında konu analizi",
        "Zayıf noktaları tespit etme",
        "Öğrenme sürecini optimize etme"
      ],
      href: "/yapay-zeka",
      color: "bg-emerald-500",
      gradient: "from-emerald-400 to-teal-600"
    },
    {
      id: 6,
      icon: ShoppingCart,
      title: "Online Satış",
      description: "Kitaplarımıza ve eğitim materyallerimize çevrimiçi erişim",
      features: [
        "Kolay ödeme seçenekleri",
        "Hızlı kargo ve teslimat",
        "Özel indirimler ve kampanyalar",
        "Geniş ürün yelpazesi"
      ],
      href: "#",
      color: "bg-orange-500",
      gradient: "from-orange-400 to-red-600",
      isOnlineSales: true
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Başlık Alanı */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Dijital</span>{" "}
            <span className="relative inline-block">
              Çözümler
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600"
                initial={{ width: 0 }}
                animate={isVisible ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">
            Modern eğitim teknolojileri ile öğrenme deneyimini dönüştürün
          </p>
        </motion.div>

        {/* Çözümler Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
              onMouseEnter={() => setHoveredSolution(solution.id)}
              onMouseLeave={() => setHoveredSolution(null)}
            >
              {solution.isOnlineSales ? (
                <OnlineSalesCard 
                  solution={solution} 
                  isHovered={hoveredSolution === solution.id} 
                />
              ) : (
                <Link href={solution.href} className="block h-full">
                  <div 
                    className={`relative rounded-lg overflow-hidden h-[180px] shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-300 ${
                      hoveredSolution === solution.id ? 'transform -translate-y-1' : ''
                    }`}
                  >
                    {/* Renkli Şerit */}
                    <div className={`h-1 w-full ${solution.color} absolute top-0 left-0`}></div>
                    
                    <div className="p-3 h-full flex flex-col">
                      {/* Başlık ve İkon */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-md ${solution.color} text-white`}>
                          {React.createElement(solution.icon, { size: 16 })}
                        </div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">{solution.title}</h3>
                      </div>

                      {/* Açıklama */}
                      <p className="text-slate-600 dark:text-slate-300 text-xs mb-3 line-clamp-2">{solution.description}</p>

                      {/* Özellikler - Hover durumunda göster */}
                      <div className="mt-auto">
                        <AnimatePresence>
                          {hoveredSolution === solution.id ? (
                            <motion.ul 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-1 mb-2"
                            >
                              {solution.features.slice(0, 2).map((feature, i) => (
                                <motion.li 
                                  key={i}
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: 0.05 * i }}
                                  className="flex items-start"
                                >
                                  <span className={`inline-flex ${solution.color} text-white p-0.5 rounded-full mr-1 mt-0.5`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-1.5 w-1.5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                  <span className="text-[10px] text-slate-700 dark:text-slate-300">{feature}</span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>

                        {/* Bağlantı */}
                        <div className={`flex items-center text-xs font-medium transition-all duration-300 ${
                          hoveredSolution === solution.id 
                            ? `text-${solution.color.replace('bg-', '')}` 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          <span>Detaylar</span>
                          <ArrowRight 
                            size={12} 
                            className={`ml-1 transition-transform duration-300 ${
                              hoveredSolution === solution.id ? 'translate-x-1' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Alt CTA Butonu */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white">
            <Link href="/dijital-cozumler">
              <span className="flex items-center">
                Tüm Dijital Çözümlerimiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Online Satış Kartı bileşeni
const OnlineSalesCard = ({ solution, isHovered }: { solution: SolutionType, isHovered: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div 
          className={`relative rounded-lg overflow-hidden h-[180px] shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-300 cursor-pointer ${
            isHovered ? 'transform -translate-y-1' : ''
          }`}
        >
          {/* Renkli Şerit */}
          <div className={`h-1 w-full ${solution.color} absolute top-0 left-0`}></div>
          
          <div className="p-3 h-full flex flex-col">
            {/* Başlık ve İkon */}
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-md ${solution.color} text-white`}>
                {React.createElement(solution.icon, { size: 16 })}
              </div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">{solution.title}</h3>
            </div>

            {/* Açıklama */}
            <p className="text-slate-600 dark:text-slate-300 text-xs mb-3 line-clamp-2">{solution.description}</p>

            {/* Özellikler - Hover durumunda göster */}
            <div className="mt-auto">
              <AnimatePresence>
                {isHovered ? (
                  <motion.ul 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1 mb-2"
                  >
                    {solution.features.slice(0, 2).map((feature, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 * i }}
                        className="flex items-start"
                      >
                        <span className={`inline-flex ${solution.color} text-white p-0.5 rounded-full mr-1 mt-0.5`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-1.5 w-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-[10px] text-slate-700 dark:text-slate-300">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : null}
              </AnimatePresence>

              {/* Bağlantı */}
              <div className={`flex items-center text-xs font-medium transition-all duration-300 ${
                isHovered 
                  ? `text-${solution.color.replace('bg-', '')}` 
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                <span>Mağazalarımız</span>
                <ArrowRight 
                  size={12} 
                  className={`ml-1 transition-transform duration-300 ${
                    isHovered ? 'translate-x-1' : ''
                  }`} 
                />
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-4">Online Mağazalarımız</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://fenomenkitap.com.tr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-16 h-16 mb-3 relative">
                <Image
                  src="/images/brands/fenomen.png"
                  alt="Fenomen"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium text-base text-gray-900 dark:text-white mb-2">Fenomen</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Kitaplar ve eğitim materyalleri</p>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-xs py-1 h-auto">
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
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-all duration-300">
              <div className="mx-auto w-16 h-16 mb-3 relative">
                <Image
                  src="/images/brands/moreandmore-logo.png"
                  alt="More&More"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium text-base text-gray-900 dark:text-white mb-2">More&More</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">İngilizce öğrenme materyalleri</p>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-xs py-1 h-auto">
                Mağazaya Git
              </Button>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DigitalSolutions;

