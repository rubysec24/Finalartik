import { type NextRequest, NextResponse } from "next/server"
import { createCanvas } from "canvas"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const width = Number.parseInt(searchParams.get("width") || "300", 10)
  const height = Number.parseInt(searchParams.get("height") || "200", 10)
  const text = searchParams.get("text") || `${width}x${height}`
  const bgColor = searchParams.get("bg") || "#e2e8f0"
  const textColor = searchParams.get("color") || "#64748b"

  // Create canvas
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")

  // Fill background
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)

  // Draw text
  ctx.fillStyle = textColor
  ctx.font = `${Math.max(16, Math.floor(width / 10))}px Arial, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, width / 2, height / 2)

  // Optional: Draw border
  ctx.strokeStyle = textColor
  ctx.lineWidth = 2
  ctx.strokeRect(0, 0, width, height)

  // Convert to buffer
  const buffer = canvas.toBuffer("image/png")

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}

