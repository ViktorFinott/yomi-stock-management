"use client"

import type React from "react"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { useActivityLog } from "@/lib/activity-log-context"
import { useNotifications } from "@/lib/notifications-context"
import { BackupUtils } from "@/lib/backup-utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  Download,
  Upload,
  FileJson,
  FileSpreadsheet,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function BackupPage() {
  const { user } = useAuth()
  const { addLog } = useActivityLog()
  const { addNotification } = useNotifications()
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lastBackup, setLastBackup] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("yomi_last_backup")
    }
    return null
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const csvInputRef = useRef<HTMLInputElement>(null)

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true)
    setProgress(0)

    try {
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      const backup = BackupUtils.createBackup()
      BackupUtils.downloadBackup(backup)

      const now = new Date().toISOString()
      localStorage.setItem("yomi_last_backup", now)
      setLastBackup(now)

      addLog({
        userId: user?.id || "",
        userName: user?.name || "",
        type: "backup_create",
        description: "Backup do sistema criado e baixado",
      })

      addNotification({
        title: "Backup Criado",
        message: "Backup do sistema criado com sucesso!",
        type: "success",
        category: "system",
      })

      toast.success("Backup criado com sucesso!")
    } catch (error) {
      console.error("[v0] Error creating backup:", error)
      toast.error("Erro ao criar backup")
    } finally {
      setIsCreatingBackup(false)
      setProgress(0)
    }
  }

  const handleRestoreBackup = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsRestoring(true)
    setProgress(0)

    try {
      for (let i = 0; i <= 50; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      const result = await BackupUtils.restoreBackup(file)

      for (let i = 50; i <= 100; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      if (result.success) {
        addLog({
          userId: user?.id || "",
          userName: user?.name || "",
          type: "backup_restore",
          description: `Backup restaurado do arquivo: ${file.name}`,
        })

        toast.success("Backup restaurado com sucesso! Recarregue a página para ver as alterações.")
      } else {
        toast.error(result.error || "Erro ao restaurar backup")
      }
    } catch (error) {
      console.error("[v0] Error restoring backup:", error)
      toast.error("Erro ao restaurar backup")
    } finally {
      setIsRestoring(false)
      setProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setProgress(0)

    try {
      for (let i = 0; i <= 100; i += 20) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      const result = await BackupUtils.importCSV(file, "inventory")

      if (result.success) {
        addLog({
          userId: user?.id || "",
          userName: user?.name || "",
          type: "inventory_add",
          description: `Importados ${result.count} itens via CSV`,
        })

        toast.success(`${result.count} itens importados com sucesso!`)
      } else {
        toast.error(result.error || "Erro ao importar CSV")
      }
    } catch (error) {
      console.error("[v0] Error importing CSV:", error)
      toast.error("Erro ao importar CSV")
    } finally {
      setIsImporting(false)
      setProgress(0)
      if (csvInputRef.current) {
        csvInputRef.current.value = ""
      }
    }
  }

  if (user?.role !== "admin") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Card className="border-2 border-destructive/30 bg-zinc-950/50 max-w-md">
            <CardContent className="pt-6 text-center">
              <Shield className="h-16 w-16 mx-auto mb-4 text-destructive/50" />
              <h2 className="text-xl font-bold mb-2">Acesso Restrito</h2>
              <p className="text-muted-foreground">
                Apenas administradores podem acessar o sistema de backup e restauração.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Backup & Restauração</h1>
          <p className="text-muted-foreground mt-1">Gerencie backups e importe/exporte dados do sistema</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-white/10 bg-zinc-950/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status do Sistema</p>
                  <p className="text-lg font-semibold text-green-400">Operacional</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-white/10 bg-zinc-950/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Último Backup</p>
                  <p className="text-lg font-semibold">
                    {lastBackup ? format(new Date(lastBackup), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "Nunca"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-white/10 bg-zinc-950/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Armazenamento</p>
                  <p className="text-lg font-semibold">Local (Browser)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        {(isCreatingBackup || isRestoring || isImporting) && (
          <Card className="border-2 border-primary/30 bg-zinc-950/50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {isCreatingBackup && "Criando backup..."}
                    {isRestoring && "Restaurando backup..."}
                    {isImporting && "Importando dados..."}
                  </span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="backup" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-white/10">
            <TabsTrigger value="backup" className="data-[state=active]:bg-primary/20">
              <Database className="h-4 w-4 mr-2" />
              Backup
            </TabsTrigger>
            <TabsTrigger value="restore" className="data-[state=active]:bg-primary/20">
              <RefreshCw className="h-4 w-4 mr-2" />
              Restaurar
            </TabsTrigger>
            <TabsTrigger value="import" className="data-[state=active]:bg-primary/20">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Importar CSV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="backup">
            <Card className="border-2 border-white/10 bg-zinc-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Criar Backup
                </CardTitle>
                <CardDescription>Exporte todos os dados do sistema em formato JSON</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Dados incluídos no backup:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Usuários e permissões
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Inventário completo
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Movimentações de estoque
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Anotações e eventos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Configurações do sistema
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Logs de atividade
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-lg">
                    <FileJson className="h-16 w-16 text-primary/50 mb-4" />
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      O backup será baixado como arquivo JSON
                    </p>
                    <Button
                      onClick={handleCreateBackup}
                      disabled={isCreatingBackup}
                      className="bg-primary hover:bg-primary/80"
                    >
                      {isCreatingBackup ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Criar Backup
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="restore">
            <Card className="border-2 border-white/10 bg-zinc-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Restaurar Backup
                </CardTitle>
                <CardDescription>Restaure dados a partir de um arquivo de backup JSON</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-500">Atenção</p>
                    <p className="text-sm text-muted-foreground">
                      A restauração irá sobrescrever os dados atuais. Faça um backup antes de prosseguir.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-lg">
                  <Upload className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Selecione um arquivo de backup (.json) para restaurar
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="backup-file" className="sr-only">
                      Arquivo de backup
                    </Label>
                    <Input
                      ref={fileInputRef}
                      id="backup-file"
                      type="file"
                      accept=".json"
                      onChange={handleRestoreBackup}
                      disabled={isRestoring}
                      className="bg-zinc-900 border-white/10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import">
            <Card className="border-2 border-white/10 bg-zinc-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  Importar CSV
                </CardTitle>
                <CardDescription>Importe dados de inventário a partir de planilhas CSV</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Formato esperado:</h4>
                    <div className="p-4 bg-zinc-900 rounded-lg font-mono text-xs overflow-x-auto">
                      <p>name,category,quantity,price,location,supplier</p>
                      <p>Dell Laptop,Hardware,10,1299.99,Warehouse A,Dell Inc.</p>
                      <p>Mouse MX,Accessories,50,99.99,Warehouse B,Logitech</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A primeira linha deve conter os cabeçalhos das colunas.
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-lg">
                    <FileSpreadsheet className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      Selecione um arquivo CSV para importar
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="csv-file" className="sr-only">
                        Arquivo CSV
                      </Label>
                      <Input
                        ref={csvInputRef}
                        id="csv-file"
                        type="file"
                        accept=".csv"
                        onChange={handleImportCSV}
                        disabled={isImporting}
                        className="bg-zinc-900 border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
