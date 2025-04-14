'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CityProps {
  id: string;
  name: string;
  d: string;
  population?: string;
  region?: string;
  dealerCount?: number;
}

const cities: CityProps[] = [
  { id: "01", name: "Adana", d: "M631.6 472.1l-2.2 4-10.2 5.3-9.7 1.8-5.3 4.9-9.3-0.9-5.3-3.1-9.3 1.8-5.3-0.9 0.4-2.7 1.8-3.1-0.9-2.2 1.8-1.3 2.7-2.2-1.3-3.6-3.1-2.2-4.9 0.9-4.4 4-1.3-4.9 0-4-8-7.1-6.2-1.3-3.5-3.5-4.9-1.8-5.3 0.4-5.8-0.9-9.8 2.2-9.8-0.4-10.6-0.9-5.8-1.8-0.9-4.4 2.2-10.7-0.4-3.5 1.8-2.7 4.9-5.3 3.1-2.2 7.5-2.7 2.2-1.3 2.7-0.4 11.1 1.3 11.1-0.4 5.8-2.2 5.8-1.8 8-0.9 11.1-3.1 5.3-1.8 5.8-0.4 3.1 0.4 7.5 3.1 5.3 0.4 5.8-0.9 11.1-0.4 3.1 0 3.1 0.9 3.6 2.7 3.1 6.2 1.8 7.5z", dealerCount: 15, region: "Akdeniz" },
  { id: "02", name: "Adıyaman", d: "M757.4 414.1l-4 0.9-4.4-2.2-8.4 0-2.7-0.9-3.1-3.1-5.3-1.3-1.8-1.3-2.7-4.9-0.4-4.9 0.9-4.9-0.4-9.7-0.9-5.8-4-1.3-4.9-0.9-7.1-5.3-8.9-5.3-4.9-1.8-15.1-0.4-6.2-0.9-2.2-3.1 0.4-4.9 0-4.4-2.2-9.8 0-4.4 1.3-4 7.1-7.5 4.4-5.3 3.1-8.4 1.3-4.4 0.9-0.9 14.6 0 5.8 0.9 11.5-1.3 7.1-2.7 4-1.8 2.7-2.2 4.4-2.7 6.7-2.7 7.1-0.9 6.2 1.3 8.9 0.9 4.9 0.9 0 4.9-0.9 4.4-0.4 4.4 0.9 2.7 3.1 1.3 6.7 1.3 3.1 2.7-1.3 2.7-1.8 2.7-0.9 6.7 0.4 4.4 2.2 1.8 3.6 0 4.9 1.8 1.8 3.1 0.9 3.6 2.2 1.8 6.2 1.3 3.1 3.1 2.7 4.4-9.3 7.5-4.4 1.3-4.9 0-10.2 3.1-5.3 2.2-4 3.5-0.4 3.1 0.9 3.6 3.6 7.1 1.8 4.4 0.9 13.8-0.4 4.9-2.7 4.9-3.1 3.1-0.5 3.9z", dealerCount: 8, region: "Güneydoğu Anadolu" },
  // Diğer şehirler burada eklenecek - bunlar sadece örnek verilerdir
];

export default function TurkeyMap() {
  const [selectedCity, setSelectedCity] = useState<CityProps | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleCityClick = (city: CityProps) => {
    setSelectedCity(city);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Yakınlaştır
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Uzaklaştır
        </button>
        <button 
          onClick={() => setZoom(1)}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Sıfırla
        </button>
      </div>

      <div className="border rounded-lg shadow-lg overflow-hidden w-full">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }} className="relative">
          {/* SVG verisi büyük olduğu için bir iframe içinde harici SVG dosyası kullanıyoruz */}
          <iframe 
            src="/turkey-map.svg" 
            className="w-full h-[500px] border-0"
            title="Türkiye Haritası"
          />
          
          {/* Seçilen şehir bilgisi */}
          {selectedCity && (
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <h3 className="text-lg font-bold">{selectedCity.name}</h3>
              {selectedCity.region && <p>Bölge: {selectedCity.region}</p>}
              {selectedCity.dealerCount && (
                <p>Bayi Sayısı: {selectedCity.dealerCount}</p>
              )}
              <button 
                onClick={() => setSelectedCity(null)}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Kapat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 