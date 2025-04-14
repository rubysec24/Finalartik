"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, ExternalLink, Play, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export default function VideoSolutions() {
  const videoLinks = [
    {
      id: 1,
      title: "Fenomen Video Çözümler",
      description: "Tüm sınavlar için kapsamlı video çözümlerimize erişim sağlayın. Fenomen serimizin video çözümleri ile konuları pekiştirin ve sınavlara hazırlanın.",
      image: "/images/sliders/fenomen-video.jpg",
      link: "https://fenomen.com.tr/video-cozumler",
      color: "#FF8A00",
      icon: <Video className="h-8 w-8" />
    },
    {
      id: 2,
      title: "More&More Video Solutions",
      description: "İngilizce dil eğitimi ve yabancı dil sınavlarına hazırlık için kapsamlı video çözümler. Modern ve etkili eğitim içerikleriyle İngilizce öğrenimini kolaylaştırın.",
      image: "/images/sliders/moreandmore-video.jpg",
      link: "https://moreandmore.com.tr/video-solutions",
      color: "#FFC837",
      icon: <BookOpen className="h-8 w-8" />
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Video Çözümler
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Eğitim içeriklerimize ait video çözümler ve açıklamalı anlatımlar ile
                öğrenme sürecinizi destekleyin
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {videoLinks.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.id * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={item.link} target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-64">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                        style={{ background: `linear-gradient(to top, ${item.color}DD, transparent)` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-5 rounded-full bg-white/30 backdrop-blur-sm">
                          <Play className="h-16 w-16 text-white" fill="white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-full" style={{ backgroundColor: item.color }}>
                          {item.icon}
                        </div>
                        <h2 className="text-2xl font-bold">{item.title}</h2>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {item.description}
                      </p>
                      <Button 
                        className="w-full flex items-center justify-center gap-2 text-white" 
                        style={{ backgroundColor: item.color }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Video Çözümlere Git
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Video Çözümlerle Daha İyi Öğrenin</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Video çözümlerimiz, eğitim materyallerimizi tamamlayıcı niteliktedir. Konuları daha iyi anlamanıza ve 
              sınavlara daha etkili bir şekilde hazırlanmanıza yardımcı olur. Deneyimli eğitmenlerimiz tarafından 
              hazırlanan kapsamlı video içeriklerimize hemen erişim sağlayın.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold mb-2">Görsel Öğrenme</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Görsel ve işitsel içeriklerle daha etkili öğrenme deneyimi</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Play className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold mb-2">Soru Çözümleri</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ayrıntılı açıklamalarla soru çözüm teknikleri</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-bold mb-2">Kapsamlı İçerik</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tüm sınıf düzeyleri ve dersler için geniş içerik kütüphanesi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 