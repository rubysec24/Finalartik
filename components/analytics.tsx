"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

// Global tipini genişlet
declare global {
  interface Window {
    gtag: (command: string, target: string, config?: any) => void
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window.gtag === "undefined") return

    const url = pathname + (searchParams ? searchParams.toString() : "")

    window.gtag("config", "G-XXXXXXXXXX", {
      page_path: url,
    })
  }, [pathname, searchParams])

  return null
}

