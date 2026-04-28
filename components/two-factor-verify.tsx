"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface TwoFactorVerifyProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerifySuccess: () => void
}

export function TwoFactorVerify({ open, onOpenChange, onVerifySuccess }: TwoFactorVerifyProps) {
  const [code, setCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error("Digite um código de 6 dígitos")
      return
    }

    setIsVerifying(true)

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, validate TOTP here
    if (/^\d{6}$/.test(code)) {
      onVerifySuccess()
      onOpenChange(false)
      setCode("")
    } else {
      toast.error("Código inválido")
    }

    setIsVerifying(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-primary/30 bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Verificação de Dois Fatores
          </DialogTitle>
          <DialogDescription>Digite o código do seu aplicativo autenticador</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="2fa-code">Código de Verificação</Label>
            <Input
              id="2fa-code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="text-center text-2xl tracking-widest font-mono bg-zinc-900 border-white/10"
              autoFocus
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={code.length !== 6 || isVerifying}
            className="w-full bg-primary hover:bg-primary/80"
          >
            {isVerifying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verificando...
              </>
            ) : (
              "Verificar"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Não consegue acessar seu código? Entre em contato com o suporte.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
