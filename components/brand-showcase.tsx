"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Store } from "lucide-react"
import { Button } from "@/components/ui/button"

const brands = [
  {
    id: 1,
    name: "Fenomen Okul",
    image: "/images/brands/fenomen.png",
    backgroundImage: "/images/brand-backgrounds/fenomen-background.jpg",
    color: "#FF8A00",
  },
  {
    id: 2,
    name: "Fenomen Çocuk",
    image: "/images/brands/fenomencocuk.png",
    backgroundImage: "/images/brand-backgrounds/fenomencocuk-background.jpg",
    color: "#FF5F6D",
  },
  {
    id: 3,
    name: "More&More",
    image: "/images/brands/moreandmore-logo.png",
    backgroundImage: "/images/brand-backgrounds/moreandmore-background.jpg",
    color: "#FFC837",
  },
  {
    id: 4,
    name: "KOZ",
    image: "/images/brands/koz.png",
    backgroundImage: "/images/brand-backgrounds/koz-background.jpg",
    color: "#4CAF50",
  },
  {
    id: 5,
    name: "Orjin Okul",
    image: "/images/brands/orjin.png",
    backgroundImage: "/images/brand-backgrounds/orjin-background.jpg",
    color: "#9C27B0",
  },
  {
    id: 6,
    name: "WoW English",
    image: "/images/brands/wow.png",
    backgroundImage: "/images/brand-backgrounds/wow-background.jpg",
    color: "#2196F3",
  },
  {
    id: 7,
    name: "VAF",
    image: "/images/brands/vaf.png",
    backgroundImage: "/images/brand-backgrounds/vaf-background.jpg",
    color: "#00BCD4",
  },
  {
    id: 8,
    name: "KKD",
    image: "/images/brands/kkd.png",
    backgroundImage: "/images/brand-backgrounds/kkd-background.jpg",
    color: "#E91E63",
  },
]

const BrandShowcase = () => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0)
  const carouselRef = useRef(null)

  const scrollCarousel = useCallback((direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -carouselRef.current.offsetWidth : carouselRef.current.offsetWidth
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })

      // Update active index
      setTimeout(() => {
        const scrollLeft = carouselRef.current.scrollLeft
        const itemWidth = carouselRef.current.offsetWidth
        const newIndex = Math.round(scrollLeft / itemWidth)
        setActiveCarouselIndex(Math.max(0, Math.min(newIndex, brands.length - 1)))
      }, 500)
    }
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="mb-16 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Markalarımız
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="relative h-64 rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 flex items-center justify-center bg-white dark:bg-gray-800 group"
            >
              <Image
                src={brand.image || "/placeholder.svg"}
                alt={brand.name}
                width={300}
                height={150}
                className="object-contain p-4"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 group-hover:opacity-0"
                style={{
                  background: `linear-gradient(to top, ${brand.color}CC, transparent)`,
                }}
              ></div>
              <div className="absolute bottom-4 left-4 right-4 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-xl font-bold text-white">{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Showcase Carousel */}
        <div className="mt-16 relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {brands.map((brand) => (
                <div key={brand.id} className="flex-shrink-0 w-full snap-center" style={{ scrollSnapAlign: "center" }}>
                  <div className="relative h-[600px] w-full flex items-center justify-center bg-white dark:bg-gray-800">
                    {/* Arka plan görseli */}
                    {brand.backgroundImage && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={brand.backgroundImage}
                          alt={`${brand.name} Background`}
                          fill
                          className="object-fill opacity-100 w-full h-full"
                          sizes="100vw"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    {/* Logo görselini kaldırdım */}
                    
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
                      style={{
                        background: `linear-gradient(to top, black, transparent 60%), 
                                    linear-gradient(135deg, ${brand.color}80 0%, transparent 50%)`,
                      }}
                    ></div>

                    <div className="absolute bottom-10 left-10">
                      <h3 className="text-4xl font-bold text-white mb-2">{brand.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {brands.map((brand, idx) => (
                <button
                  key={idx}
                  className={`h-2 w-2 rounded-full ${activeCarouselIndex === idx ? "bg-white" : "bg-white/50 hover:bg-white/80"} transition-colors`}
                  aria-label={`Go to brand ${brand.name}`}
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollTo({
                        left: idx * carouselRef.current.offsetWidth,
                        behavior: "smooth",
                      })
                      setActiveCarouselIndex(idx)
                    }
                  }}
                />
              ))}
            </div>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/40 transition-colors"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous brand"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/40 transition-colors"
              onClick={() => scrollCarousel("right")}
              aria-label="Next brand"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Brand Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              8
            </div>
            <div className="text-gray-600 dark:text-gray-300">Farklı Marka</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              2000+
            </div>
            <div className="text-gray-600 dark:text-gray-300">Yayın</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              20000+
            </div>
            <div className="text-gray-600 dark:text-gray-300">Okul</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              5M+
            </div>
            <div className="text-gray-600 dark:text-gray-300">Öğrenci</div>
          </div>
        </div>

        {/* App Store Buttons */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Add app store buttons here */}
        </div>
      </div>
    </section>
  )
}

export default BrandShowcase

