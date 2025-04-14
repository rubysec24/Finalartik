import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dijital Platformlar | Kurmay Yayınları',
  description: 'Kurmay Yayınları dijital platform çözümleri ve ürünleri',
}

export default function DijitalPlatformlarPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Dijital Platformlar</h1>
      <p className="text-lg mb-8">
        Kurmay Yayınları dijital platform çözümleri ve eğitim teknolojileri.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dijital platform içerikleri burada listelenecek */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">E-Öğrenme Platformu</h2>
          <p>Kapsamlı e-öğrenme çözümleri ve içerikler.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Akıllı Tahta Uygulamaları</h2>
          <p>Etkileşimli akıllı tahta uygulamaları ve içerikler.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Mobil Uygulamalar</h2>
          <p>iOS ve Android için eğitim uygulamaları.</p>
        </div>
      </div>
    </div>
  )
} 