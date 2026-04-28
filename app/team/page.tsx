"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeamMemberCard } from "@/components/team-member-card"
import { TeamMemberFormDialog } from "@/components/team-member-form-dialog"
import { useAuth } from "@/lib/auth-context"
import { Users, UserCheck, Clock } from "lucide-react"
import { mockTeamMembers } from "@/lib/team-data"

export default function TeamPage() {
  const { user } = useAuth()
  const [members, setMembers] = useState(mockTeamMembers)
  const [editingMember, setEditingMember] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem("yomi_team_members")
    if (saved) {
      setMembers(JSON.parse(saved))
    }
  }, [])

  const handleSaveMember = (member: any) => {
    const index = members.findIndex((m) => m.id === member.id)
    let updated
    if (index >= 0) {
      updated = [...members]
      updated[index] = member
    } else {
      updated = [...members, member]
    }
    setMembers(updated)
    localStorage.setItem("yomi_team_members", JSON.stringify(updated))
    setEditingMember(null)
  }

  const handleDeleteMember = (memberId: string) => {
    if (window.confirm("Deseja remover este membro da equipe?")) {
      const updated = members.filter((m) => m.id !== memberId)
      setMembers(updated)
      localStorage.setItem("yomi_team_members", JSON.stringify(updated))
    }
  }

  const activeMembers = members.filter((m) => m.status === "active").length
  const pendingMembers = members.filter((m) => m.status === "pending").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Minha Equipe</h1>
            <p className="text-muted-foreground mt-2">Gerencie os membros e suas permissões</p>
          </div>
          {user?.role === "admin" && <TeamMemberFormDialog onSave={handleSaveMember} />}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-2 border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Total de Membros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{members.length}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{activeMembers}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingMembers}</div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Membros da Equipe</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onEdit={setEditingMember}
                onDelete={handleDeleteMember}
                isAdmin={user?.role === "admin"}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
