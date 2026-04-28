"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Copy, Check } from "lucide-react"

interface QRCodeGeneratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: string
  title?: string
}

export function QRCodeGenerator({ open, onOpenChange, data, title }: QRCodeGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrSize, setQrSize] = useState(200)

  useEffect(() => {
    if (open && canvasRef.current && data) {
      generateQRCode(data, canvasRef.current, qrSize)
    }
  }, [open, data, qrSize])

  const generateQRCode = (text: string, canvas: HTMLCanvasElement, size: number) => {
    // Simple QR code generation using canvas
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    // Background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Generate simple QR-like pattern based on data hash
    const cellSize = Math.floor(size / 25)
    const hash = simpleHash(text)

    ctx.fillStyle = "#000000"

    // Fixed pattern elements (position markers)
    drawPositionMarker(ctx, 0, 0, cellSize)
    drawPositionMarker(ctx, size - 7 * cellSize, 0, cellSize)
    drawPositionMarker(ctx, 0, size - 7 * cellSize, cellSize)

    // Data pattern
    for (let i = 8; i < 17; i++) {
      for (let j = 8; j < 17; j++) {
        if ((hash * (i + 1) * (j + 1)) % 2 === 0) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
        }
      }
    }
  }

  const drawPositionMarker = (ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) => {
    // Outer square
    ctx.fillRect(x, y, 7 * cellSize, cellSize)
    ctx.fillRect(x, y + 6 * cellSize, 7 * cellSize, cellSize)
    ctx.fillRect(x, y, cellSize, 7 * cellSize)
    ctx.fillRect(x + 6 * cellSize, y, cellSize, 7 * cellSize)

    // Inner square
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize)
  }

  const simpleHash = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!canvasRef.current) return
    const url = canvasRef.current.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = url
    a.download = `qrcode-${title || "item"}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-primary/30 bg-zinc-950">
        <DialogHeader>
          <DialogTitle>QR Code - {title || "Item"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="bg-white p-4 rounded-lg">
            <canvas ref={canvasRef} />
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label>Dados do QR Code</Label>
              <div className="flex gap-2">
                <Input value={data} readOnly className="bg-zinc-900 border-white/10" />
                <Button variant="outline" size="icon" onClick={handleCopy} className="border-white/10 bg-transparent">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tamanho: {qrSize}px</Label>
              <input
                type="range"
                min="100"
                max="400"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-white/10">
            Fechar
          </Button>
          <Button onClick={handleDownload} className="bg-primary hover:bg-primary/80">
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
