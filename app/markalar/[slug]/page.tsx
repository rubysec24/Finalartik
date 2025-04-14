"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Award, CheckCircle, ArrowRight, Download, ExternalLink } from "lucide-react"
import { brandImages } from "@/app/data/images"

// Ürün tipi tanımı
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  level?: string;
  brand?: string;
  image: string;
}

interface BrandData {
  name: string;
  logo: string;
  coverImage: string;
  color: string;
  description: string;
  longDescription: string;
  stats: { label: string; value: string; }[];
  features: string[];
  digitalContent: {
    id: number;
    title: string;
    image: string;
    description: string;
    platforms: string[];
  }[];
  testimonials: {
    id: number;
    name: string;
    role: string;
    image: string;
    text: string;
  }[];
}

// Marka verileri
const brandsData: Record<string, BrandData> = {
  kurmay: {
    name: "Fenomen Okul",
    logo: "/images/brands/fenomen.png",
    coverImage: "/images/brand-backgrounds/fenomen-background.jpg",
    color: "#FF8A00",
    description:
      "Fenomen Okul, nitelikli eğitim materyalleri ile öğrencileri başarıya taşıyan, yenilikçi ve öncü bir eğitim markasıdır.",
    longDescription:
      "Fenomen Okul, eğitim alanında 25 yılı aşkın deneyimiyle öğrencilerin akademik başarılarını artırmak için kaliteli ve güncel içerikler sunan bir eğitim markasıdır. Okul öncesinden liseye kadar tüm seviyelerde eğitim materyalleri geliştiren Fenomen Okul, Türkiye'nin dört bir yanındaki öğrencilere ulaşmayı hedeflemektedir.",
    stats: [
      { label: "Yayın", value: "500+" },
      { label: "Okul", value: "5000+" },
      { label: "Öğrenci", value: "1M+" },
      { label: "Yıl", value: "30+" },
    ],
    features: [
      "Müfredata uygun içerikler",
      "Uzman eğitimciler tarafından hazırlanmış",
      "Görsel ve interaktif öğrenme materyalleri",
      "Dijital ve basılı içerik entegrasyonu",
      "Kişiselleştirilmiş öğrenme çözümleri",
      "Sürekli güncellenen içerikler",
    ],
    digitalContent: [
      {
        id: 1,
        title: "Fenomen Akıllı Tahta Uygulaması",
        image: "https://picsum.photos/300/200?random=24",
        description: "Sınıf içi etkileşimli öğrenme platformu",
        platforms: ["Windows", "macOS", "Web"],
      },
      {
        id: 2,
        title: "Fenomen Mobil Öğrenme",
        image: "https://picsum.photos/300/200?random=25",
        description: "Her an her yerde eğitim içeriklerine erişim",
        platforms: ["iOS", "Android"],
      },
      {
        id: 3,
        title: "Fenomen Ebeveyn Portal",
        image: "https://picsum.photos/300/200?random=26",
        description: "Çocuğunuzun eğitim sürecini takip edin",
        platforms: ["Web", "iOS", "Android"],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Mehmet Yılmaz",
        role: "Okul Müdürü",
        image: "https://picsum.photos/100/100?random=27",
        text: "Fenomen Okul eğitim setleri ile öğrencilerimizin akademik başarısı gözle görülür şekilde arttı. Özellikle dijital içerikler çocukların derse olan ilgisini çok artırıyor.",
      },
      {
        id: 2,
        name: "Ayşe Kaya",
        role: "Matematik Öğretmeni",
        image: "https://picsum.photos/100/100?random=28",
        text: "Fenomen'in matematik kitapları çok kapsamlı ve anlaşılır. Hem eğitici hem de öğrencilerin seviyesine uygun içerikler sunuyor.",
      },
      {
        id: 3,
        name: "Ali Demir",
        role: "Veli",
        image: "https://picsum.photos/100/100?random=29",
        text: "Çocuğum Fenomen kitapları ile çalışmaya başladıktan sonra derslere olan ilgisi arttı ve notları yükseldi. Özellikle mobil uygulama sayesinde ödevlerini düzenli takip edebiliyoruz.",
      },
    ],
  },
  fenomen: {
    name: "Fenomen",
    logo: "/images/brands/fenomen.png",
    coverImage: "https://picsum.photos/1200/400?random=2",
    color: "#FF5F6D",
    description:
      "Fenomen, yenilikçi eğitim çözümleriyle öğrencilerin potansiyellerini en üst düzeyde kullanmalarına yardımcı olan bir eğitim markasıdır.",
    longDescription:
      "Fenomen, eğitimde yenilikçi yaklaşımları benimseyen, teknoloji destekli öğrenme çözümleri sunan bir eğitim markasıdır. Öğrencilerin 21. yüzyıl becerilerini geliştirmeye odaklanan içerikler hazırlayarak, onların geleceğe hazırlanmalarına katkı sağlar. Dijital ve basılı içerikleri entegre eden yaklaşımıyla, modern eğitim anlayışına uygun çözümler sunar.",
    stats: [
      { label: "Yayın", value: "300+" },
      { label: "Okul", value: "3000+" },
      { label: "Öğrenci", value: "750K+" },
      { label: "Yıl", value: "15+" },
    ],
    features: [
      "Teknoloji destekli öğrenme çözümleri",
      "21. yüzyıl becerilerine odaklı içerikler",
      "Proje tabanlı öğrenme materyalleri",
      "Yapay zeka destekli kişiselleştirilmiş öğrenme",
      "Etkileşimli dijital içerikler",
      "STEM eğitimi odaklı kaynaklar",
    ],
    digitalContent: [
      {
        id: 1,
        title: "Fenomen Yapay Zeka Öğrenme",
        image: "https://picsum.photos/300/200?random=44",
        description: "Yapay zeka destekli kişiselleştirilmiş öğrenme deneyimi",
        platforms: ["Web", "iOS", "Android"],
      },
      {
        id: 2,
        title: "Fenomen VR Laboratuvar",
        image: "https://picsum.photos/300/200?random=45",
        description: "Sanal gerçeklik destekli laboratuvar deneyimleri",
        platforms: ["Windows", "iOS", "Android"],
      },
      {
        id: 3,
        title: "Fenomen Oyunlaştırılmış Öğrenme",
        image: "https://picsum.photos/300/200?random=46",
        description: "Oyun tabanlı öğrenme platformu",
        platforms: ["Web", "iOS", "Android"],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Hasan Yıldız",
        role: "Fen Bilimleri Öğretmeni",
        image: "https://picsum.photos/100/100?random=47",
        text: "Fenomen'in dijital içerikleri sayesinde öğrenciler laboratuvar deneyimlerini sanal ortamda yaşayabiliyor. Bu, özellikle pandemi döneminde çok işimize yaradı.",
      },
      {
        id: 2,
        name: "Zeynep Şahin",
        role: "Bilişim Teknolojileri Öğretmeni",
        image: "https://picsum.photos/100/100?random=48",
        text: "Fenomen'in kodlama ve robotik eğitim setleri ile öğrenciler 21. yüzyıl becerilerini eğlenerek öğreniyor. Materyal kalitesi ve içerik zenginliği açısından çok başarılı.",
      },
      {
        id: 3,
        name: "Murat Demir",
        role: "Okul Müdürü",
        image: "https://picsum.photos/100/100?random=49",
        text: "Okulumuzda Fenomen ürünlerini kullanmaya başladıktan sonra, öğrencilerin derslere olan ilgisi ve katılımı önemli ölçüde arttı. Özellikle teknoloji entegrasyonu çok başarılı.",
      },
    ],
  },
  moreandmore: {
    name: "More&More",
    logo: "/images/brands/moreandmore-logo.png",
    coverImage: "https://picsum.photos/1200/400?random=3",
    color: "#FFC837",
    description:
      "More&More, dil eğitiminde uzmanlaşmış, yabancı dil öğrenimini kolaylaştıran yenilikçi içerikler sunan bir eğitim markasıdır.",
    longDescription:
      "More&More, dil eğitiminde 20 yılı aşkın deneyime sahip, yabancı dil öğrenimini etkili ve eğlenceli hale getiren içerikler geliştiren bir eğitim markasıdır. İngilizce başta olmak üzere, Almanca, Fransızca, İspanyolca gibi birçok dilde eğitim materyalleri sunar. Dil öğreniminde iletişimsel yaklaşımı benimseyen marka, öğrencilerin dil becerilerini gerçek hayatta kullanabilmelerine odaklanır.",
    stats: [
      { label: "Yayın", value: "250+" },
      { label: "Okul", value: "2500+" },
      { label: "Öğrenci", value: "500K+" },
      { label: "Yıl", value: "20+" },
    ],
    features: [
      "İletişimsel yaklaşımla dil öğretimi",
      "Gerçek hayatta kullanılabilir dil becerileri",
      "Kültürel öğeleri içeren içerikler",
      "Seviye bazlı aşamalı öğrenme",
      "Multimedya destekli öğrenme",
      "Değerlendirme ve geri bildirim sistemleri",
    ],
    digitalContent: [
      {
        id: 1,
        title: "More&More Konuşma Asistanı",
        image: "https://picsum.photos/300/200?random=54",
        description: "Yapay zeka destekli konuşma pratiği uygulaması",
        platforms: ["iOS", "Android", "Web"],
      },
      {
        id: 2,
        title: "More&More Kelime Bankası",
        image: "https://picsum.photos/300/200?random=55",
        description: "Kişiselleştirilmiş kelime öğrenme platformu",
        platforms: ["Web", "iOS", "Android"],
      },
      {
        id: 3,
        title: "More&More Dinleme Atölyesi",
        image: "https://picsum.photos/300/200?random=56",
        description: "İnteraktif dinleme egzersizleri",
        platforms: ["iOS", "Android", "Web"],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Serkan Yılmaz",
        role: "İngilizce Öğretmeni",
        image: "https://picsum.photos/100/100?random=57",
        text: "More&More'un iletişimsel yaklaşımı, öğrencilerin dil becerilerini gerçek hayatta kullanabilmelerini sağlıyor. Öğrenciler derse daha istekli geliyor.",
      },
      {
        id: 2,
        name: "Gizem Aydın",
        role: "Veli",
        image: "https://picsum.photos/100/100?random=58",
        text: "Çocuğum More&More ile İngilizce öğrenmeye başladıktan sonra, yabancı dizileri anlayabiliyor ve basit cümlelerle kendini ifade edebiliyor.",
      },
      {
        id: 3,
        name: "Burak Demir",
        role: "Öğrenci",
        image: "https://picsum.photos/100/100?random=59",
        text: "More&More'un uygulaması sayesinde otobüste, yolda her yerde İngilizce çalışabiliyorum. Özellikle konuşma asistanı çok faydalı.",
      },
    ],
  },
  koz: {
    name: "KOZ",
    logo: "/images/brands/koz.png",
    coverImage: "https://picsum.photos/1200/400?random=4",
    color: "#4CAF50",
    description:
      "KOZ, okul öncesi eğitim alanında uzmanlaşmış, çocukların gelişim dönemlerine uygun içerikler sunan bir eğitim markasıdır.",
    longDescription:
      "KOZ, okul öncesi eğitimde 15 yılı aşkın deneyime sahip, çocukların gelişim dönemlerine uygun, eğlenceli ve etkili öğrenme materyalleri geliştiren bir eğitim markasıdır. Oyun temelli öğrenme yaklaşımını benimseyen marka, çocukların sosyal, duygusal ve bilişsel gelişimlerini destekleyen içerikler sunar.",
    stats: [
      { label: "Yayın", value: "200+" },
      { label: "Okul", value: "2000+" },
      { label: "Öğrenci", value: "300K+" },
      { label: "Yıl", value: "15+" },
    ],
    features: [
      "Oyun temelli öğrenme yaklaşımı",
      "Gelişim dönemlerine uygun içerikler",
      "El becerilerini geliştiren aktiviteler",
      "Sosyal gelişimi destekleyen materyaller",
      "Dijital ve basılı içerik entegrasyonu",
      "Aile katılımlı öğrenme etkinlikleri",
    ],
    digitalContent: [
      {
        id: 1,
        title: "KOZ Dijital Oyun Platformu",
        image: "https://picsum.photos/300/200?random=74",
        description: "Eğitici dijital oyunlar ve aktiviteler",
        platforms: ["iOS", "Android", "Web"],
      },
      {
        id: 2,
        title: "Ebeveyn Takip Uygulaması",
        image: "https://picsum.photos/300/200?random=75",
        description: "Çocuğunuzun gelişimini takip edin",
        platforms: ["iOS", "Android"],
      },
      {
        id: 3,
        title: "Etkileşimli Hikayeler",
        image: "https://picsum.photos/300/200?random=76",
        description: "Sesli ve görsel hikaye kitapları",
        platforms: ["iOS", "Android", "Web"],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Elif Yıldız",
        role: "Anaokulu Öğretmeni",
        image: "https://picsum.photos/100/100?random=80",
        text: "KOZ'un eğitim setleri, çocukların gelişim dönemlerine çok uygun hazırlanmış. Özellikle oyun temelli aktiviteler çocukların çok ilgisini çekiyor.",
      },
      {
        id: 2,
        name: "Ahmet Kaya",
        role: "Veli",
        image: "https://picsum.photos/100/100?random=81",
        text: "Çocuğumun hem eğlenerek öğrenmesini hem de sosyal becerilerini geliştirmesini sağlayan harika bir program.",
      },
      {
        id: 3,
        name: "Ayşe Demir",
        role: "Eğitim Koordinatörü",
        image: "https://picsum.photos/100/100?random=82",
        text: "KOZ'un dijital ve basılı içerikleri birbirini çok güzel tamamlıyor. Aile katılımlı etkinlikler de çok başarılı.",
      },
    ],
  },
  orjin: {
    name: "Orjin",
    logo: "/images/brands/orjin.png",
    coverImage: "https://picsum.photos/1200/400?random=5",
    color: "#9C27B0",
    description:
      "Orjin, sınav hazırlık alanında uzmanlaşmış, öğrencilerin sınavlara etkili bir şekilde hazırlanmalarını sağlayan bir eğitim markasıdır.",
    longDescription:
      "Orjin, sınav hazırlık alanında 10 yılı aşkın deneyime sahip, öğrencilerin sınavlara etkili bir şekilde hazırlanmalarını sağlayan bir eğitim markasıdır. Alanında uzman eğitimcilerle çalışarak, güncel sınav formatlarına uygun, kapsamlı ve etkili hazırlık materyalleri geliştirir.",
    stats: [
      { label: "Yayın", value: "150+" },
      { label: "Okul", value: "1500+" },
      { label: "Öğrenci", value: "250K+" },
      { label: "Yıl", value: "10+" },
    ],
    features: [
      "Güncel sınav formatlarına uygun içerikler",
      "Uzman eğitimciler tarafından hazırlanmış",
      "Kapsamlı konu anlatımları",
      "Çözümlü soru bankaları",
      "Online deneme sınavları",
      "Kişiselleştirilmiş çalışma programları",
    ],
    digitalContent: [
      {
        id: 1,
        title: "Online Deneme Sınavları",
        image: "https://picsum.photos/300/200?random=94",
        description: "Gerçek sınav deneyimi sunan online denemeler",
        platforms: ["Web"],
      },
      {
        id: 2,
        title: "Soru Çözüm Videoları",
        image: "https://picsum.photos/300/200?random=95",
        description: "Uzman öğretmenlerden video çözümler",
        platforms: ["iOS", "Android", "Web"],
      },
      {
        id: 3,
        title: "Konu Tekrar Uygulaması",
        image: "https://picsum.photos/300/200?random=96",
        description: "Yapay zeka destekli kişisel öğrenme asistanı",
        platforms: ["iOS", "Android"],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Mehmet Yılmaz",
        role: "Matematik Öğretmeni",
        image: "https://picsum.photos/100/100?random=100",
        text: "Orjin'in soru bankaları ve konu anlatımları, öğrencilerimin sınav başarısını önemli ölçüde artırdı.",
      },
      {
        id: 2,
        name: "Zeynep Kaya",
        role: "12. Sınıf Öğrencisi",
        image: "https://picsum.photos/100/100?random=101",
        text: "Online deneme sınavları ve video çözümler sayesinde eksiklerimi kolayca tespit edip tamamlayabiliyorum.",
      },
      {
        id: 3,
        name: "Ali Demir",
        role: "Dershane Müdürü",
        image: "https://picsum.photos/100/100?random=102",
        text: "Orjin'in eğitim içerikleri, öğrencilerimizin sınav başarısına önemli katkı sağlıyor.",
      },
    ],
  },
  wow: {
    name: "WoW English",
    logo: "/images/brands/wow.png",
    coverImage: "https://picsum.photos/1200/400?random=6",
    color: "#2196F3",
    description:
      "WoW English, yenilikçi İngilizce öğrenme yöntemleriyle öğrencilerin dil becerilerini geliştiren bir eğitim markasıdır.",
    longDescription:
      "WoW English, modern dil öğrenme yaklaşımlarını benimseyen, teknoloji destekli İngilizce eğitim çözümleri sunan bir markadır. Öğrencilerin İngilizce konuşma, dinleme, okuma ve yazma becerilerini etkili bir şekilde geliştirmelerine yardımcı olur.",
    stats: [
      { label: "Yayın", value: "100+" },
      { label: "Okul", value: "1000+" },
      { label: "Öğrenci", value: "200K+" },
      { label: "Yıl", value: "5+" },
    ],
    features: [
      "İnteraktif dil öğrenme platformu",
      "Native speaker video dersleri",
      "Yapay zeka destekli konuşma pratiği",
      "Oyunlaştırılmış öğrenme deneyimi",
      "Mobil uyumlu içerikler",
      "Gerçek hayat senaryoları",
    ],
    digitalContent: [
      {
        id: 1,
        title: "WoW Mobile App",
        image: "https://picsum.photos/300/200?random=114",
        description: "Her yerde İngilizce öğrenme deneyimi",
        platforms: ["iOS", "Android"],
      },
      {
        id: 2,
        title: "Speaking Practice",
        image: "https://picsum.photos/300/200?random=115",
        description: "AI destekli konuşma pratiği",
        platforms: ["iOS", "Android", "Web"],
      },
      {
        id: 3,
        title: "Live Classes",
        image: "https://picsum.photos/300/200?random=116",
        description: "Native speaker'larla canlı dersler",
        platforms: ["Web"],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Can Yılmaz",
        role: "İngilizce Öğrencisi",
        image: "https://picsum.photos/100/100?random=120",
        text: "WoW English sayesinde İngilizce konuşma korkumu yendim. Artık daha özgüvenli konuşabiliyorum.",
      },
      {
        id: 2,
        name: "Selin Kaya",
        role: "İş Profesyoneli",
        image: "https://picsum.photos/100/100?random=121",
        text: "Business English programı iş hayatımda İngilizce iletişim becerilerimi geliştirmeme çok yardımcı oldu.",
      },
      {
        id: 3,
        name: "Emre Demir",
        role: "IELTS Öğrencisi",
        image: "https://picsum.photos/100/100?random=122",
        text: "IELTS hazırlık programı sayesinde hedeflediğim puanı aldım. Özellikle speaking bölümü çok faydalıydı.",
      },
    ],
  },
  vaf: {
    name: "VAF",
    logo: "/images/brands/vaf.png",
    coverImage: "https://picsum.photos/1200/400?random=7",
    color: "#00BCD4",
    description:
      "VAF, sanat ve müzik eğitimi alanında uzmanlaşmış, yaratıcılığı geliştiren içerikler sunan bir eğitim markasıdır.",
    longDescription:
      "VAF, sanat ve müzik eğitimi alanında 15 yılı aşkın deneyime sahip, yaratıcılığı geliştiren içerikler sunan bir eğitim markasıdır. Alanında uzman eğitimcilerle çalışarak, güncel sanat ve müzik standartlarına uygun, kapsamlı ve etkili eğitim materyalleri geliştirir.",
    stats: [
      { label: "Yayın", value: "150+" },
      { label: "Okul", value: "1500+" },
      { label: "Öğrenci", value: "250K+" },
      { label: "Yıl", value: "15+" },
    ],
    features: [
      "Güncel sanat ve müzik standartlarına uygun içerikler",
      "Uzman eğitimciler tarafından hazırlanmış",
      "Kapsamlı konu anlatımları",
      "Uygulamalı sanat eğitimi",
      "Online müzik dersleri",
      "Kişiselleştirilmiş eğitim programları",
    ],
    digitalContent: [
      {
        id: 1,
        title: "Online Müzik Dersleri",
        image: "https://picsum.photos/300/200?random=134",
        description: "Canlı ve kayıtlı müzik dersleri",
        platforms: ["Web"],
      },
      {
        id: 2,
        title: "Sanat Atölyesi",
        image: "https://picsum.photos/300/200?random=135",
        description: "Dijital sanat ve tasarım platformu",
        platforms: ["iOS", "Android", "Web"],
      },
      {
        id: 3,
        title: "Müzik Teorisi",
        image: "https://picsum.photos/300/200?random=136",
        description: "İnteraktif müzik teorisi eğitimi",
        platforms: ["iOS", "Android"],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Deniz Yılmaz",
        role: "Müzik Öğretmeni",
        image: "https://picsum.photos/100/100?random=140",
        text: "VAF'ın müzik eğitim setleri, öğrencilerimin müzik teorisi ve enstrüman çalma becerilerini geliştirmede çok etkili.",
      },
      {
        id: 2,
        name: "Berna Kaya",
        role: "Sanat Eğitmeni",
        image: "https://picsum.photos/100/100?random=141",
        text: "Resim eğitim setleri ve dijital içerikler, öğrencilerin yaratıcılığını geliştirmede büyük rol oynuyor.",
      },
      {
        id: 3,
        name: "Murat Demir",
        role: "Öğrenci",
        image: "https://picsum.photos/100/100?random=142",
        text: "Online müzik dersleri sayesinde evden çıkmadan kaliteli bir müzik eğitimi alabiliyorum.",
      },
    ],
  },
  kkd: {
    name: "KKD",
    logo: "/images/brands/kkd.png",
    coverImage: "https://picsum.photos/1200/400?random=8",
    color: "#E91E63",
    description:
      "KKD, kişisel gelişim ve yaşam boyu öğrenme alanında uzmanlaşmış, her yaştan bireye yönelik içerikler sunan bir eğitim markasıdır.",
    longDescription:
      "KKD, kişisel gelişim ve yaşam boyu öğrenme alanında 20 yılı aşkın deneyime sahip, her yaştan bireye yönelik içerikler sunan bir eğitim markasıdır. Alanında uzman eğitimcilerle çalışarak, güncel kişisel gelişim standartlarına uygun, kapsamlı ve etkili eğitim materyalleri geliştirir.",
    stats: [
      { label: "Yayın", value: "200+" },
      { label: "Okul", value: "2000+" },
      { label: "Öğrenci", value: "300K+" },
      { label: "Yıl", value: "20+" },
    ],
    features: [
      "Kişisel gelişim odaklı içerikler",
      "Yaşam boyu öğrenme fırsatları",
      "Profesyonel gelişim programları",
      "Online eğitim platformu",
      "Sertifikalı eğitimler",
      "Mentorluk programları",
    ],
    digitalContent: [
      {
        id: 1,
        title: "Online Eğitim Platformu",
        image: "https://picsum.photos/300/200?random=154",
        description: "7/24 erişilebilir eğitim içerikleri",
        platforms: ["Web", "iOS", "Android"],
      },
      {
        id: 2,
        title: "Mentorluk Programı",
        image: "https://picsum.photos/300/200?random=155",
        description: "Birebir mentorluk görüşmeleri",
        platforms: ["Web"],
      },
      {
        id: 3,
        title: "Kişisel Gelişim App",
        image: "https://picsum.photos/300/200?random=156",
        description: "Mobil kişisel gelişim asistanı",
        platforms: ["iOS", "Android"],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Ahmet Yılmaz",
        role: "Şirket Yöneticisi",
        image: "https://picsum.photos/100/100?random=160",
        text: "KKD'nin liderlik programı, yöneticilik becerilerimi geliştirmemde çok etkili oldu.",
      },
      {
        id: 2,
        name: "Fatma Kaya",
        role: "Girişimci",
        image: "https://picsum.photos/100/100?random=161",
        text: "Finansal okuryazarlık eğitimi, işimi daha iyi yönetmeme yardımcı oldu.",
      },
      {
        id: 3,
        name: "Mustafa Demir",
        role: "Pazarlama Uzmanı",
        image: "https://picsum.photos/100/100?random=162",
        text: "Dijital pazarlama eğitimleri sayesinde kariyerimde yeni bir sayfa açtım.",
      },
    ],
  },
}

// Marka renklerinin anlamları
const colorMeanings = {
  "#FF8A00": {
    title: "Yenilikçi",
    description: "Turuncu renk, yaratıcılık ve yenilikçiliği temsil eder. Fenomen Okul'un vizyoner eğitim yaklaşımını yansıtır.",
  },
  "#FF5F6D": {
    title: "Dinamik",
    description: "Kırmızı ve pembe tonları, enerji ve dinamizmi temsil eder. Fenomen'in sürekli gelişen ve canlı öğrenme ortamını yansıtır.",
  },
  "#FFC837": {
    title: "İlham Verici",
    description: "Sarı renk, ilham ve zekayı temsil eder. More&More'un dil öğreniminde yeni ufuklar açan yaklaşımını yansıtır.",
  },
}

// API yanıt tipi
interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: any;
}

// Marka verisini getiren fonksiyon
async function fetchBrandData(slug: string): Promise<BrandData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${baseUrl}/api/brands/${slug}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result: ApiResponse<BrandData> = await response.json();
    
    if (result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Marka verisi alınamadı');
  } catch (error) {
    console.error(`Marka verisi getirme hatası (${slug}):`, error);
    return null;
  }
}

// Marka ürünlerini getiren fonksiyon
async function fetchBrandProducts(slug: string): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${baseUrl}/api/products?brand=${slug}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result: ApiResponse<Product[]> = await response.json();
    
    if (result.data) {
      return result.data;
    }
    
    return [];
  } catch (error) {
    console.error(`Marka ürünleri getirme hatası (${slug}):`, error);
    return [];
  }
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const [slugValue, setSlugValue] = useState<string>('');
  const [brand, setBrand] = useState<BrandData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("products");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // params.slug değerini güvenli bir şekilde state'e aktar
  useEffect(() => {
    if (params.slug) {
      setSlugValue(params.slug);
    }
  }, [params]);

  // slugValue değiştiğinde verileri yükle
  useEffect(() => {
    if (!slugValue) return;
    
    const loadBrandData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const brandData = await fetchBrandData(slugValue);
        if (brandData) {
          setBrand(brandData);
        } else {
          setError('Marka bilgileri bulunamadı');
        }

        const productData = await fetchBrandProducts(slugValue);
        setProducts(productData);
      } catch (err) {
        console.error('Veri yükleme hatası:', err);
        setError('Veri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadBrandData();
  }, [slugValue]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl">Yükleniyor...</p>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Marka Bulunamadı</h1>
        <p className="mb-8">Aradığınız marka bilgilerine ulaşılamadı.</p>
        <Link href="/markalar">
          <Button>Tüm Markalara Dön</Button>
        </Link>
      </div>
    );
  }
  
  const coverImage = (brandImages.brandCovers as Record<string, string>)[slugValue] || brand.coverImage;
  const logoImage = (brandImages.logos as Record<string, string>)[slugValue] || brand.logo;
  const colorMeaning = (colorMeanings as Record<string, any>)[brand.color] || { title: "Yenilikçi", description: "Bu marka eğitimde yenilikçi yaklaşımları benimser." };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src={coverImage}
          alt={brand.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={logoImage}
                alt={`${brand.name} logo`}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <h1 className="text-4xl font-bold text-white">{brand.name}</h1>
            </div>
            <p className="text-white/90 max-w-2xl">{brand.description}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {brand.stats && brand.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brand.features && brand.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              <span className="relative">
                Ürünlerimiz
                <span
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full"
                  style={{ backgroundColor: brand.color }}
                ></span>
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Eğitim içeriklerimiz, uzman eğitimciler tarafından özenle hazırlanmış olup, öğrencilerin akademik başarısını artırmayı hedeflemektedir
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">Bu marka için henüz ürün bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 flex flex-col">
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    {product.level && (
                      <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full text-xs font-medium" style={{ color: brand.color }}>
                        {product.level}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="mb-1">
                      <span className="text-sm font-medium px-2 py-1 rounded-full text-white inline-block mb-2" style={{ backgroundColor: brand.color }}>
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{product.title}</h3>
                    {product.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">{product.description}</p>
                    )}
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 text-sm" style={{ backgroundColor: brand.color }}>
                        İncele
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/urunler">
              <Button variant="outline" className="inline-flex items-center gap-2" style={{ borderColor: brand.color, color: brand.color }}>
                Tüm Ürünlerimizi Keşfedin <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

