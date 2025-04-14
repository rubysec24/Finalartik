"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, ChevronDown, Sun, Moon, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    {
      name: "Markalarımız",
      href: "#",
      dropdown: [
        { name: "Fenomen Okul", href: "/markalar/kurmay", image: "/images/brands/fenomen.png" },
        { name: "Fenomen Çocuk", href: "/markalar/fenomen", image: "/images/brands/fenomencocuk.png" },
        { name: "More&More", href: "/markalar/moreandmore", image: "/images/brands/moreandmore-logo.png" },
        { name: "KOZ", href: "/markalar/koz", image: "/images/brands/koz.png" },
        { name: "Orjin", href: "/markalar/orjin", image: "/images/brands/orjin.png" },
        { name: "WoW English", href: "/markalar/wow", image: "/images/brands/wow.png" },
        { name: "VAF", href: "/markalar/vaf", image: "/images/brands/vaf.png" },
        { name: "KKD", href: "/markalar/kkd", image: "/images/brands/kkd.png" },
      ],
    },
    { name: "Dijital İçerikler", href: "/dijital-icerikler" },
    { name: "Yayınlarımız", href: "/yayinlar" },
    { name: "Bayi Sorgulama", href: "/bayi-sorgulama" },
    { name: "İletişim", href: "/iletisim" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/placeholder-logo.png"
                alt="Kurmay Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) =>
              !link.dropdown ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary rounded-md transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary rounded-md transition-colors flex items-center gap-1"
                    >
                      {link.name} <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-[400px] p-4 grid grid-cols-2 gap-2">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem
                        key={item.name}
                        asChild
                        className="p-2 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-lg"
                      >
                        <Link href={item.href} className="w-full flex items-center gap-2">
                          <div className="h-10 w-10 relative flex-shrink-0 bg-white rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Online Satış</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <a href="https://fenomenkitap.com.tr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span>Fenomen</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://moreandmorekitap.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span>More&More</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {!link.dropdown ? (
                    <Link
                      href={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-200 dark:hover:text-primary dark:hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <>
                      <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200">
                        {link.name}
                      </div>
                      <div className="pl-6 space-y-1 grid grid-cols-2 gap-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary dark:hover:bg-gray-800 flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="h-10 w-10 relative flex-shrink-0 bg-white rounded-md overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Online Satış</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem asChild>
                      <a href="https://fenomenkitap.com.tr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <span>Fenomen</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="https://moreandmorekitap.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <span>More&More</span>
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

