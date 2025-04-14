"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const slides = [
  {
    id: 1,
    image: "/images/sliders/slider1.jpg",
    alt: "Eğitimde Yenilikçi Çözümler",
  },
  {
    id: 2,
    image: "/images/sliders/slider2.jpg",
    alt: "8 Markamız, Tek Çatı Altında",
  },
  {
    id: 3,
    image: "/images/sliders/slider3.jpg",
    alt: "Dijital İçeriklerle Öğrenmeyi Dönüştürün",
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)

    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
  }, [])

  useEffect(() => {
    if (isAutoplay) {
      startAutoplay()
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isAutoplay, startAutoplay])

  const handleDotClick = useCallback((index: number) => {
    setCurrentSlide(index)
    setIsAutoplay(false)
    setTimeout(() => setIsAutoplay(true), 10000)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoplay(false)
    setTimeout(() => setIsAutoplay(true), 10000)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoplay(false)
    setTimeout(() => setIsAutoplay(true), 10000)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="h-[550px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px] w-full relative">
        <AnimatePresence mode="wait">
          {slides && slides.length > 0 && slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"></div>
                  <Image
                    src={slide.image || "https://placehold.co/1920x1080"}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    style={{
                      objectFit: 'contain', 
                      objectPosition: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800/20 to-transparent dark:from-gray-900/40"></div>
                </motion.div>
              ),
          )}
        </AnimatePresence>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex space-x-2">
            {slides && slides.length > 0 && slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero

