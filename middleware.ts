import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware fonksiyonu
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Admin sayfası mı ve login sayfası değil mi kontrol et
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Admin token var mı kontrol et
    const adminToken = request.cookies.get('admin_token')
    
    // Token yoksa login sayfasına yönlendir
    if (!adminToken) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }
  
  // Normal akışa devam et
  return NextResponse.next()
}

// Middleware'in çalışacağı rotaları belirt
export const config = {
  // Admin path'lerini eşleştir
  matcher: '/admin/:path*',
} 