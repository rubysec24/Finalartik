import { NextResponse } from "next/server"

// Basit bir şekilde token oluşturuyoruz, gerçek uygulamada daha güvenli bir yöntem kullanılmalı
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Sabit kullanıcı adı ve şifre kontrolü
    if (username === "admin" && password === "kurmay2024") {
      // Basit bir token oluştur
      const token = Buffer.from(JSON.stringify({ username, timestamp: Date.now() })).toString('base64')
      
      // Response'ı oluştur
      const response = NextResponse.json({ success: true })
      
      // Cookie'yi ayarla
      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 // 1 saat
      })

      return response
    }

    return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
} 