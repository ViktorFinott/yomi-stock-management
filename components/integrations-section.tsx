"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Unlink, Link } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { loadIntegrations, saveIntegrations, type Integration } from "@/lib/integrations-data"

export function IntegrationsSection() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setIntegrations(loadIntegrations())
  }, [])

  const toggleIntegration = (id: string) => {
    const updated = integrations.map((int) =>
      int.id === id
        ? {
            ...int,
            connected: !int.connected,
            lastConnected: new Date().toISOString(),
          }
        : int,
    )
    setIntegrations(updated)
    saveIntegrations(updated)

    const integration = updated.find((i) => i.id === id)
    toast({
      title: integration?.connected ? "Conectado" : "Desconectado",
      description: `${integration?.name} ${integration?.connected ? "conectado com sucesso" : "desconectado"}`,
    })
  }

  return (
    <Card className="border-2 border-primary/30">
      <CardHeader>
        <CardTitle>Integrações Externas</CardTitle>
        <CardDescription>Conecte sua conta com serviços externos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col gap-3 ${
                integration.connected
                  ? "bg-primary/10 border-primary"
                  : "bg-black/20 border-primary/30 hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{integration.icon}</span>
                  <span className="font-medium">{integration.name}</span>
                </div>
                <Badge variant={integration.connected ? "default" : "outline"}>
                  {integration.connected ? "Conectado" : "Desconectado"}
                </Badge>
              </div>

              <Button
                onClick={() => toggleIntegration(integration.id)}
                variant={integration.connected ? "destructive" : "outline"}
                size="sm"
                className="w-full border-2 gap-2"
              >
                {integration.connected ? (
                  <>
                    <Unlink className="h-4 w-4" />
                    Desconectar
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4" />
                    Conectar
                  </>
                )}
              </Button>

              {integration.lastConnected && (
                <p className="text-xs text-muted-foreground">
                  Última conexão: {new Date(integration.lastConnected).toLocaleDateString("pt-BR")}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
