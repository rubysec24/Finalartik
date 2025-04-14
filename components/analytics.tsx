"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Suspense } from "react"

// Global tipini genişlet
declare global {
  interface Window {
    gtag: (command: string, target: string, config?: any) => void
  }
}

function AnalyticsContent() {
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

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  )
}

