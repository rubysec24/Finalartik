"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { brandImages } from "@/app/data/images"

// Marka verileri
const brands = [
  {
    id: 1,
    name: "Fenomen Okul",
    slug: "kurmay",
    description: "Nitelikli eğitim materyalleri ile öğrencileri başarıya taşıyan, yenilikçi ve öncü bir eğitim markası.",
    color: "#FF8A00",
  },
  {
    id: 2,
    name: "Fenomen",
    slug: "fenomen",
    description: "Yenilikçi eğitim çözümleriyle öğrencilerin potansiyellerini en üst düzeyde kullanmalarına yardımcı olan bir eğitim markası.",
    color: "#FF5F6D",
  },
  {
    id: 3,
    name: "More&More",
    slug: "moreandmore",
    description: "Dil eğitiminde uzmanlaşmış, yabancı dil öğrenimini kolaylaştıran yenilikçi içerikler sunan bir eğitim markası.",
    color: "#FFC837",
  },
  {
    id: 4,
    name: "KOZ",
    slug: "koz",
    description: "STEM eğitimine odaklanan, bilim ve teknolojiyi merkeze alan yenilikçi bir eğitim markası.",
    color: "#4E54C8",
  },
  {
    id: 5,
    name: "Orjin",
    slug: "orjin",
    description: "Özgün ve yenilikçi içerikleriyle eğitimde fark yaratan bir yayınevi.",
    color: "#8A2387",
  },
  {
    id: 6,
    name: "WoW English",
    slug: "wow",
    description: "İngilizce öğrenimini eğlenceli hale getiren, interaktif içerikler sunan bir dil eğitimi markası.",
    color: "#00B4DB",
  },
  {
    id: 7,
    name: "VAF",
    slug: "vaf",
    description: "Vizyon, Akademi ve Fırsat sağlayan çağdaş eğitim yaklaşımını benimseyen bir eğitim markası.",
    color: "#FE5858",
  },
  {
    id: 8,
    name: "KKD",
    slug: "kkd",
    description: "Kelime, Kavram ve Dil becerilerini geliştirmeye odaklanan yenilikçi bir eğitim markası.",
    color: "#56CCF2",
  },
]

export default function BrandsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayfanın yüklenmesini simüle etmek için kısa bir timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p className="text-xl">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Markalarımız
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Eğitimde yenilikçi ve çağdaş yaklaşımlarla geliştirdiğimiz, öğrencilerin akademik başarısını artırmaya odaklanan markalarımızı keşfedin.
          </p>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => {
              const logoSrc = (brandImages.logos as Record<string, string>)[brand.slug] || "/logo.png";
              
              return (
                <Link key={brand.id} href={`/markalar/${brand.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="h-2" style={{ backgroundColor: brand.color }}></div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 relative mr-4 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={logoSrc}
                            alt={brand.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h2 className="text-2xl font-bold">{brand.name}</h2>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                        {brand.description}
                      </p>
                      <Button className="w-full mt-auto" style={{ backgroundColor: brand.color }}>
                        Detayları Gör
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

