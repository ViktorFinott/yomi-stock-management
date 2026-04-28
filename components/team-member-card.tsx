"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trash2, Edit2, CheckCircle, Clock } from "lucide-react"

interface TeamMemberCardProps {
  member: any
  onEdit: (member: any) => void
  onDelete: (memberId: string) => void
  isAdmin: boolean
}

export function TeamMemberCard({ member, onEdit, onDelete, isAdmin }: TeamMemberCardProps) {
  const getRoleLabel = (role: string) => {
    const roles = {
      admin: "Administrador",
      manager: "Gerente",
      member: "Membro",
    }
    return roles[role as keyof typeof roles] || role
  }

  const getRoleBadgeColor = (role: string) => {
    if (role === "admin") return "bg-destructive/20 text-destructive"
    if (role === "manager") return "bg-yellow-500/20 text-yellow-600"
    return "bg-primary/20 text-primary"
  }

  return (
    <Card className="border-2 border-primary/30 hover:border-primary/50 transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarFallback className="bg-primary text-primary-foreground">{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{member.name}</CardTitle>
              <CardDescription className="text-xs">{member.email}</CardDescription>
            </div>
          </div>
          {member.status === "active" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Clock className="h-5 w-5 text-yellow-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Badge className={getRoleBadgeColor(member.role)}>{getRoleLabel(member.role)}</Badge>
          {member.department && <Badge variant="outline">{member.department}</Badge>}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Permissões</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Inventário", value: member.permissions.inventory },
              { name: "Agenda", value: member.permissions.calendar },
              { name: "Financeiro", value: member.permissions.finance },
              { name: "Solicitações", value: member.permissions.requests },
            ].map((perm) => (
              <div key={perm.name} className="flex items-center gap-2 text-xs">
                <div className={`h-2 w-2 rounded-full ${perm.value ? "bg-green-500" : "bg-muted"}`} />
                <span className={perm.value ? "text-foreground" : "text-muted-foreground"}>{perm.name}</span>
              </div>
            ))}
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-primary/30 bg-transparent"
              onClick={() => onEdit(member)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(member.id)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Remover
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
