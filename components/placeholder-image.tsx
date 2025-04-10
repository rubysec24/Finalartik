"use client"

import { useEffect, useRef } from "react"

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  bgColor?: string
  textColor?: string
  className?: string
}

export default function PlaceholderImage({
  width,
  height,
  text = `${width}x${height}`,
  bgColor = "#e2e8f0",
  textColor = "#64748b",
  className = "",
}: PlaceholderImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

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
  }, [width, height, text, bgColor, textColor])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  )
}

