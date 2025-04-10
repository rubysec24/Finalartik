import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { SpeedInsights } from "@/components/speed-insights"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Kurmay - Eğitim Yayınları | Türkiye'nin Lider Eğitim İçeriği Sağlayıcısı",
  description:
    "Kurmay Eğitim Yayınları - 30 yıllık deneyimle Türkiye'nin lider eğitim içeriği sağlayıcısı. Kitaplar, dijital içerikler ve eğitim çözümleri.",
  keywords: "Kurmay, eğitim yayınları, kitaplar, dijital içerikler, akıllı tahta, eğitim çözümleri",
  authors: [{ name: "Kurmay Yayınları" }],
  creator: "Kurmay Yayınları",
  publisher: "Kurmay Yayınları",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.kurmay.com.tr",
    title: "Kurmay - Eğitim Yayınları | Türkiye'nin Lider Eğitim İçeriği Sağlayıcısı",
    description:
      "Kurmay Eğitim Yayınları - 30 yıllık deneyimle Türkiye'nin lider eğitim içeriği sağlayıcısı. Kitaplar, dijital içerikler ve eğitim çözümleri.",
    siteName: "Kurmay Yayınları",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kurmay Yayınları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurmay - Eğitim Yayınları | Türkiye'nin Lider Eğitim İçeriği Sağlayıcısı",
    description:
      "Kurmay Eğitim Yayınları - 30 yıllık deneyimle Türkiye'nin lider eğitim içeriği sağlayıcısı. Kitaplar, dijital içerikler ve eğitim çözümleri.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}



import './globals.css'