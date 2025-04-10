"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import fs from 'fs';
import path from 'path';

interface TurkeyMapProps {
  dealers: any[];
  selectedCity: string | null;
  className?: string;
  onCitySelect?: (city: string) => void;
}

interface CityInfo {
  id: string;
  name: string;
  dealerCount: number;
  region: string;
}

const TurkeyMap: React.FC<TurkeyMapProps> = ({
  dealers,
  selectedCity,
  className = "",
  onCitySelect,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // İllerin bölgelere göre gruplandırılması
  const regions: Record<string, string[]> = {
    "Marmara": ["Balıkesir", "Bilecik", "Bursa", "Çanakkale", "Edirne", "İstanbul", "Kırklareli", "Kocaeli", "Sakarya", "Tekirdağ", "Yalova"],
    "Ege": ["Afyonkarahisar", "Aydın", "Denizli", "İzmir", "Kütahya", "Manisa", "Muğla", "Uşak"],
    "Akdeniz": ["Adana", "Antalya", "Burdur", "Hatay", "Isparta", "Kahramanmaraş", "Mersin", "Osmaniye"],
    "İç Anadolu": ["Aksaray", "Ankara", "Çankırı", "Eskişehir", "Karaman", "Kayseri", "Kırıkkale", "Kırşehir", "Konya", "Nevşehir", "Niğde", "Sivas", "Yozgat"],
    "Karadeniz": ["Amasya", "Artvin", "Bartın", "Bayburt", "Bolu", "Çorum", "Düzce", "Giresun", "Gümüşhane", "Karabük", "Kastamonu", "Ordu", "Rize", "Samsun", "Sinop", "Tokat", "Trabzon", "Zonguldak"],
    "Doğu Anadolu": ["Ağrı", "Ardahan", "Bingöl", "Bitlis", "Elazığ", "Erzincan", "Erzurum", "Hakkari", "Iğdır", "Kars", "Malatya", "Muş", "Tunceli", "Van"],
    "Güneydoğu Anadolu": ["Adıyaman", "Batman", "Diyarbakır", "Gaziantep", "Kilis", "Mardin", "Siirt", "Şanlıurfa", "Şırnak"]
  };

  // İl kodları
  const provinceCodes: Record<string, string> = {
    "Adana": "01", "Adıyaman": "02", "Afyonkarahisar": "03", "Ağrı": "04", "Amasya": "05",
    "Ankara": "06", "Antalya": "07", "Artvin": "08", "Aydın": "09", "Balıkesir": "10",
    "Bilecik": "11", "Bingöl": "12", "Bitlis": "13", "Bolu": "14", "Burdur": "15",
    "Bursa": "16", "Çanakkale": "17", "Çankırı": "18", "Çorum": "19", "Denizli": "20",
    "Diyarbakır": "21", "Edirne": "22", "Elazığ": "23", "Erzincan": "24", "Erzurum": "25",
    "Eskişehir": "26", "Gaziantep": "27", "Giresun": "28", "Gümüşhane": "29", "Hakkari": "30",
    "Hatay": "31", "Isparta": "32", "Mersin": "33", "İstanbul": "34", "İzmir": "35",
    "Kars": "36", "Kastamonu": "37", "Kayseri": "38", "Kırklareli": "39", "Kırşehir": "40",
    "Kocaeli": "41", "Konya": "42", "Kütahya": "43", "Malatya": "44", "Manisa": "45",
    "Kahramanmaraş": "46", "Mardin": "47", "Muğla": "48", "Muş": "49", "Nevşehir": "50",
    "Niğde": "51", "Ordu": "52", "Rize": "53", "Sakarya": "54", "Samsun": "55",
    "Siirt": "56", "Sinop": "57", "Sivas": "58", "Tekirdağ": "59", "Tokat": "60",
    "Trabzon": "61", "Tunceli": "62", "Şanlıurfa": "63", "Uşak": "64", "Van": "65",
    "Yozgat": "66", "Zonguldak": "67", "Aksaray": "68", "Bayburt": "69", "Karaman": "70",
    "Kırıkkale": "71", "Batman": "72", "Şırnak": "73", "Bartın": "74", "Ardahan": "75",
    "Iğdır": "76", "Yalova": "77", "Karabük": "78", "Kilis": "79", "Osmaniye": "80",
    "Düzce": "81"
  };

  // İl adları
  const provinceNames: Record<string, string> = {};
  Object.entries(provinceCodes).forEach(([name, code]) => {
    provinceNames[code] = name;
  });

  // Zoom işlemleri
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Harita taşıma işlemleri
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button === 0) { // Sol tıklama
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // İl tıklama işleyicisi
  const handleProvinceClick = (element: SVGElement) => {
    const id = element.id;
    const name = element.getAttribute('data-iladi');
    
    if (!name) return;

    const city = dealers.find(d => d.city === name);
    
    // İl bilgilerini güncelle
    const dealerCount = city?.dealers?.length || 0;
    const region = Object.entries(regions).find(([regionName, cities]) => 
      cities.includes(name)
    )?.[0] || '';

    setCityInfo({
      id,
      name,
      dealerCount,
      region
    });

    if (onCitySelect && name) {
      onCitySelect(name);
    }
  };

  // SVG haritasını yükle
  useEffect(() => {
    const loadMap = async () => {
      try {
        // Fetch the SVG content
        const response = await fetch('/turkey-map.svg');
        if (!response.ok) {
          throw new Error(`Failed to load map: ${response.status}`);
        }
        const svgContent = await response.text();
        
        // Container element varsa, SVG içeriğini ekle
        if (containerRef.current) {
          containerRef.current.innerHTML = svgContent;
          setMapLoaded(true);
        }
      } catch (error) {
        console.error("Error loading SVG map:", error);
      }
    };
    
    loadMap();
  }, []);

  // Harita etkileşimlerini ekle
  useEffect(() => {
    if (!mapLoaded || !containerRef.current) return;
    
    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;
    
    // SVG özellikleri ayarla
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('ref', 'svgRef');
    svg.addEventListener('mousedown', handleMouseDown as unknown as EventListener);
    svg.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
    svg.addEventListener('mouseup', handleMouseUp);
    svg.addEventListener('mouseleave', handleMouseUp);
    
    // İllere stil ekle
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .province {
        fill: #f0f0f0;
        stroke: #000;
        stroke-width: 0.5;
        transition: fill 0.3s;
        cursor: pointer;
      }
      
      .province:hover, .province.hover {
        fill: #a0cdf3;
      }
      
      .province.selected {
        fill: #4299e1;
      }
    `;
    svg.appendChild(styleElement);
    
    // İllere event listener ekle
    const provinces = svg.querySelectorAll('[data-iladi]');
    provinces.forEach((province) => {
      const element = province as SVGElement;
      element.classList.add('province');
      
      // Tıklama olayı
      element.addEventListener('click', () => handleProvinceClick(element));
      
      // Fare üzerine gelme olayı
      element.addEventListener('mouseenter', () => {
        setHoveredCity(element.id);
        element.classList.add('hover');
      });
      
      // Fare ayrılma olayı
      element.addEventListener('mouseleave', () => {
        setHoveredCity(null);
        element.classList.remove('hover');
      });
      
      // Seçili il varsa işaretle
      if (selectedCity && element.getAttribute('data-iladi') === selectedCity) {
        element.classList.add('selected');
        
        // İl bilgilerini güncelle
        const city = dealers.find(d => d.city === selectedCity);
        const dealerCount = city?.dealers?.length || 0;
        const region = Object.entries(regions).find(([regionName, cities]) => 
          cities.includes(selectedCity)
        )?.[0] || '';
        
        setCityInfo({
          id: element.id,
          name: selectedCity,
          dealerCount,
          region
        });
      }
    });
    
    return () => {
      // Cleanup
      svg.removeEventListener('mousedown', handleMouseDown as unknown as EventListener);
      svg.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
      svg.removeEventListener('mouseup', handleMouseUp);
      svg.removeEventListener('mouseleave', handleMouseUp);
      
      provinces.forEach((province) => {
        const element = province as SVGElement;
        element.removeEventListener('click', () => handleProvinceClick(element));
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', () => {});
      });
    };
  }, [mapLoaded, selectedCity, dealers]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Zoom kontrolleri */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white rounded-md shadow-md p-2">
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-gray-100 rounded-md"
          aria-label="Yakınlaştır"
        >
          <BsZoomIn />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-100 rounded-md"
          aria-label="Uzaklaştır"
        >
          <BsZoomOut />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-2 hover:bg-gray-100 rounded-md"
          aria-label="Sıfırla"
        >
          <VscDebugRestart />
        </button>
      </div>

      {/* SVG Harita */}
      <div className="w-full h-full overflow-hidden bg-white rounded-lg shadow-md">
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.3s ease',
            width: '100%',
            height: '100%'
          }}
          ref={containerRef}
        >
          {/* SVG haritası buraya dinamik olarak eklenecek */}
        </div>
      </div>

      {/* İl Bilgileri Paneli */}
      {cityInfo && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-md shadow-md z-10 max-w-xs">
          <h3 className="font-bold text-lg text-gray-800">{cityInfo.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{cityInfo.region} Bölgesi</p>
          <div className="text-sm">
            <p className="font-medium">Bayi Sayısı: <span className="font-bold text-blue-600">{cityInfo.dealerCount}</span></p>
          </div>
          {cityInfo.dealerCount > 0 && onCitySelect && (
            <button
              onClick={() => onCitySelect(cityInfo.name)}
              className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Bayileri Görüntüle
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TurkeyMap; 