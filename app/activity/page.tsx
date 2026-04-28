"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useActivityLog } from "@/lib/activity-log-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  History,
  Search,
  Download,
  Trash2,
  LogIn,
  LogOut,
  UserPlus,
  Package,
  ArrowLeftRight,
  ClipboardList,
  User,
  Key,
  Settings,
  Database,
  Users,
  StickyNote,
  Calendar,
  Filter,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  login: LogIn,
  logout: LogOut,
  register: UserPlus,
  inventory_add: Package,
  inventory_edit: Package,
  inventory_delete: Package,
  movement_add: ArrowLeftRight,
  movement_edit: ArrowLeftRight,
  movement_delete: ArrowLeftRight,
  request_create: ClipboardList,
  request_approve: ClipboardList,
  request_reject: ClipboardList,
  profile_update: User,
  password_change: Key,
  settings_change: Settings,
  backup_create: Database,
  backup_restore: Database,
  team_add: Users,
  team_remove: Users,
  team_permission: Users,
  note_add: StickyNote,
  note_edit: StickyNote,
  note_delete: StickyNote,
  event_add: Calendar,
  event_edit: Calendar,
  event_delete: Calendar,
}

const activityColors: Record<string, string> = {
  login: "text-green-400 bg-green-400/10",
  logout: "text-gray-400 bg-gray-400/10",
  register: "text-blue-400 bg-blue-400/10",
  inventory_add: "text-emerald-400 bg-emerald-400/10",
  inventory_edit: "text-yellow-400 bg-yellow-400/10",
  inventory_delete: "text-red-400 bg-red-400/10",
  movement_add: "text-cyan-400 bg-cyan-400/10",
  movement_edit: "text-orange-400 bg-orange-400/10",
  movement_delete: "text-red-400 bg-red-400/10",
  request_create: "text-purple-400 bg-purple-400/10",
  request_approve: "text-green-400 bg-green-400/10",
  request_reject: "text-red-400 bg-red-400/10",
  profile_update: "text-blue-400 bg-blue-400/10",
  password_change: "text-yellow-400 bg-yellow-400/10",
  settings_change: "text-gray-400 bg-gray-400/10",
  backup_create: "text-teal-400 bg-teal-400/10",
  backup_restore: "text-indigo-400 bg-indigo-400/10",
  team_add: "text-green-400 bg-green-400/10",
  team_remove: "text-red-400 bg-red-400/10",
  team_permission: "text-yellow-400 bg-yellow-400/10",
  note_add: "text-pink-400 bg-pink-400/10",
  note_edit: "text-pink-400 bg-pink-400/10",
  note_delete: "text-red-400 bg-red-400/10",
  event_add: "text-violet-400 bg-violet-400/10",
  event_edit: "text-violet-400 bg-violet-400/10",
  event_delete: "text-red-400 bg-red-400/10",
}

const activityLabels: Record<string, string> = {
  login: "Login",
  logout: "Logout",
  register: "Cadastro",
  inventory_add: "Item Adicionado",
  inventory_edit: "Item Editado",
  inventory_delete: "Item Removido",
  movement_add: "Movimentação",
  movement_edit: "Mov. Editada",
  movement_delete: "Mov. Removida",
  request_create: "Solicitação Criada",
  request_approve: "Solicitação Aprovada",
  request_reject: "Solicitação Rejeitada",
  profile_update: "Perfil Atualizado",
  password_change: "Senha Alterada",
  settings_change: "Config. Alterada",
  backup_create: "Backup Criado",
  backup_restore: "Backup Restaurado",
  team_add: "Membro Adicionado",
  team_remove: "Membro Removido",
  team_permission: "Permissão Alterada",
  note_add: "Nota Criada",
  note_edit: "Nota Editada",
  note_delete: "Nota Removida",
  event_add: "Evento Criado",
  event_edit: "Evento Editado",
  event_delete: "Evento Removido",
}

export default function ActivityPage() {
  const { user } = useAuth()
  const { logs, clearLogs, exportLogs } = useActivityLog()
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || log.type === typeFilter

    let matchesDate = true
    if (dateFilter === "today") {
      const today = new Date()
      matchesDate = log.createdAt.toDateString() === today.toDateString()
    } else if (dateFilter === "week") {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      matchesDate = log.createdAt >= weekAgo
    } else if (dateFilter === "month") {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      matchesDate = log.createdAt >= monthAgo
    }

    return matchesSearch && matchesType && matchesDate
  })

  const handleExport = () => {
    const csv = exportLogs()
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `yomi-activity-logs-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Logs exportados com sucesso!")
  }

  const handleClearLogs = () => {
    if (confirm("Tem certeza que deseja limpar todos os logs de atividade?")) {
      clearLogs()
      toast.success("Logs de atividade limpos!")
    }
  }

  const stats = {
    total: logs.length,
    today: logs.filter((log) => log.createdAt.toDateString() === new Date().toDateString()).length,
    logins: logs.filter((log) => log.type === "login").length,
    changes: logs.filter((log) => log.type.includes("edit") || log.type.includes("add")).length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Histórico de Atividades</h1>
            <p className="text-muted-foreground mt-1">Acompanhe todas as ações realizadas no sistema</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExport} className="border-white/10 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            {user?.role === "admin" && (
              <Button
                variant="outline"
                onClick={handleClearLogs}
                className="border-white/10 text-destructive bg-transparent"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Logs
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-2 border-white/10 bg-zinc-950/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total de Logs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-white/10 bg-zinc-950/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.today}</p>
                  <p className="text-sm text-muted-foreground">Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-white/10 bg-zinc-950/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <LogIn className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.logins}</p>
                  <p className="text-sm text-muted-foreground">Logins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-white/10 bg-zinc-950/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <Package className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.changes}</p>
                  <p className="text-sm text-muted-foreground">Alterações</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-2 border-white/10 bg-zinc-950/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição ou usuário..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-900 border-white/10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48 bg-zinc-900 border-white/10">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10">
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                  <SelectItem value="inventory_add">Inventário</SelectItem>
                  <SelectItem value="movement_add">Movimentações</SelectItem>
                  <SelectItem value="profile_update">Perfil</SelectItem>
                  <SelectItem value="settings_change">Configurações</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48 bg-zinc-900 border-white/10">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10">
                  <SelectItem value="all">Todo o Período</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity List */}
        <Card className="border-2 border-white/10 bg-zinc-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Atividades Recentes ({filteredLogs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Nenhuma atividade encontrada</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLogs.map((log) => {
                    const Icon = activityIcons[log.type] || History
                    const color = activityColors[log.type] || "text-gray-400 bg-gray-400/10"
                    const label = activityLabels[log.type] || log.type

                    return (
                      <div
                        key={log.id}
                        className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div className={cn("p-2 rounded-lg shrink-0", color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{log.userName}</span>
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                color.replace("bg-", "bg-").slice(0, -3),
                              )}
                            >
                              {label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{log.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {format(log.createdAt, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
