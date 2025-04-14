import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const width = Number.parseInt(searchParams.get("width") || "300", 10)
  const height = Number.parseInt(searchParams.get("height") || "200", 10)
  const text = searchParams.get("text") || `${width}x${height}`
  const bgColor = searchParams.get("bg") || "e2e8f0"
  const textColor = searchParams.get("color") || "64748b"
  
  // Use a public service for placeholder images instead of canvas
  // This approach doesn't require any native dependencies
  const imageUrl = `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`
  
  // Fetch the image from the external service
  const response = await fetch(imageUrl)
  const imageData = await response.arrayBuffer()
  
  // Return the image with appropriate headers
  return new NextResponse(imageData, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}

