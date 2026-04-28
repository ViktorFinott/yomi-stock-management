"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Smartphone, Check, Copy, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

interface TwoFactorSetupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSetupComplete: (secret: string) => void
}

export function TwoFactorSetup({ open, onOpenChange, onSetupComplete }: TwoFactorSetupProps) {
  const [step, setStep] = useState<"intro" | "setup" | "verify">("intro")
  const [secret] = useState(() => generateSecret())
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  function generateSecret(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    let secret = ""
    for (let i = 0; i < 16; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return secret
  }

  const handleCopySecret = async () => {
    await navigator.clipboard.writeText(secret)
    toast.success("Código copiado!")
  }

  const handleVerify = async () => {
    setIsVerifying(true)

    // Simulate verification (in production, this would validate the TOTP)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
      // Store 2FA secret
      const userData = JSON.parse(localStorage.getItem("yomi_user") || "{}")
      userData.twoFactorEnabled = true
      userData.twoFactorSecret = secret
      localStorage.setItem("yomi_user", JSON.stringify(userData))

      onSetupComplete(secret)
      toast.success("Autenticação de dois fatores ativada!")
      onOpenChange(false)
      setStep("intro")
      setVerificationCode("")
    } else {
      toast.error("Código inválido. Tente novamente.")
    }

    setIsVerifying(false)
  }

  const handleClose = () => {
    onOpenChange(false)
    setStep("intro")
    setVerificationCode("")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-2 border-primary/30 bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Autenticação de Dois Fatores
          </DialogTitle>
          <DialogDescription>Adicione uma camada extra de segurança à sua conta</DialogDescription>
        </DialogHeader>

        {step === "intro" && (
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Smartphone className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Proteja sua conta</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Use um aplicativo autenticador como Google Authenticator, Authy ou Microsoft Authenticator para gerar
                códigos de verificação.
              </p>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-500">Importante</p>
                <p className="text-muted-foreground">
                  Certifique-se de ter um aplicativo autenticador instalado antes de continuar.
                </p>
              </div>
            </div>

            <Button onClick={() => setStep("setup")} className="w-full bg-primary hover:bg-primary/80">
              Começar Configuração
            </Button>
          </div>
        )}

        {step === "setup" && (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione esta chave ao seu aplicativo autenticador:
                </p>
                <div className="p-4 bg-zinc-900 rounded-lg border border-white/10">
                  <code className="text-lg font-mono text-primary tracking-widest">{secret}</code>
                </div>
              </div>

              <Button variant="outline" onClick={handleCopySecret} className="w-full border-white/10 bg-transparent">
                <Copy className="h-4 w-4 mr-2" />
                Copiar Código
              </Button>
            </div>

            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={() => setStep("intro")} className="flex-1 border-white/10">
                Voltar
              </Button>
              <Button onClick={() => setStep("verify")} className="flex-1 bg-primary hover:bg-primary/80">
                Próximo
              </Button>
            </div>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Digite o código de 6 dígitos gerado pelo seu aplicativo:
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verification-code">Código de Verificação</Label>
                <Input
                  id="verification-code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="text-center text-2xl tracking-widest font-mono bg-zinc-900 border-white/10"
                />
              </div>
            </div>

            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={() => setStep("setup")} className="flex-1 border-white/10">
                Voltar
              </Button>
              <Button
                onClick={handleVerify}
                disabled={verificationCode.length !== 6 || isVerifying}
                className="flex-1 bg-primary hover:bg-primary/80"
              >
                {isVerifying ? (
                  "Verificando..."
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Ativar 2FA
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
