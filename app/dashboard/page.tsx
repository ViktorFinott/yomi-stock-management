"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, AlertCircle, Users, Calendar, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = {
    totalItems: 0,
    lowStock: 0,
    totalUsers: 1,
    pendingRequests: 0,
    upcomingEvents: 0,
  }

  const quickActions = [
    {
      title: "Adicionar Item",
      description: "Cadastrar novo item no inventário",
      icon: Package,
      href: "/inventory",
      color: "text-primary",
    },
    {
      title: "Ver Agenda",
      description: "Conferir eventos e compromissos",
      icon: Calendar,
      href: "/calendar",
      color: "text-blue-400",
    },
    {
      title: "Comunicação",
      description: "Conversar com a equipe",
      icon: MessageSquare,
      href: "/communication",
      color: "text-green-400",
    },
    {
      title: "Gerenciar Equipe",
      description: "Ver todos os membros",
      icon: Users,
      href: "/team",
      color: "text-purple-400",
    },
  ]

  const recentActivity = [
    { action: "Bem-vindo ao Yomi!", time: "Agora", icon: CheckCircle2 },
    { action: "Sistema pronto para uso", time: "Agora", icon: Package },
    { action: "Configuração completa", time: "Agora", icon: CheckCircle2 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Bem-vindo, {user?.name}!</h1>
          <p className="text-muted-foreground mt-2">Aqui está um resumo do seu sistema de gestão de estoque</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-primary/30 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalItems}</div>
              <p className="text-xs text-muted-foreground mt-1">Itens no inventário</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-destructive/30 hover:border-destructive/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.lowStock}</div>
              <p className="text-xs text-muted-foreground mt-1">Itens precisam reposição</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/30 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Membros da Equipe</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Usuários cadastrados</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Ações Rápidas</CardTitle>
              <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.title} href={action.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-auto p-3 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 bg-transparent text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${action.color}`} />
                        <div className="text-left">
                          <p className="font-medium text-xs">{action.title}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </Link>
                )
              })}
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary text-sm">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="flex items-start gap-2 p-2 rounded-lg border-2 border-primary/10">
                    <Icon className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
