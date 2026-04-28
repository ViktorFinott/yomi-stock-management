"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeamMemberFormDialogProps {
  onSave: (member: any) => void
  member?: any
}

export function TeamMemberFormDialog({ onSave, member }: TeamMemberFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(member?.name || "")
  const [email, setEmail] = useState(member?.email || "")
  const [role, setRole] = useState(member?.role || "member")
  const [department, setDepartment] = useState(member?.department || "")
  const [permissions, setPermissions] = useState(
    member?.permissions || {
      inventory: true,
      calendar: true,
      finance: false,
      requests: true,
      communication: true,
    },
  )
  const { toast } = useToast()

  const handleSave = () => {
    if (!name || !email) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    onSave({
      id: member?.id || Date.now().toString(),
      name,
      email,
      role,
      department,
      permissions,
      joinedDate: member?.joinedDate || new Date().toISOString().split("T")[0],
      status: "active",
    })

    setOpen(false)
    setName("")
    setEmail("")
    setRole("member")
    setDepartment("")

    toast({
      title: "Sucesso",
      description: member ? "Membro atualizado" : "Membro adicionado à equipe",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 border-2 border-primary/30 bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4" />
          {member ? "Editar Membro" : "Adicionar Membro"}
        </Button>
      </DialogTrigger>
      <DialogContent className="border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle>{member ? "Editar Membro da Equipe" : "Adicionar Membro à Equipe"}</DialogTitle>
          <DialogDescription>Configure as permissões e informações do membro</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome Completo</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="João Silva"
              className="border-2 border-primary/30"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="joao@empresa.com"
              className="border-2 border-primary/30"
            />
          </div>

          <div className="space-y-2">
            <Label>Função</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="border-2 border-primary/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Membro</SelectItem>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Departamento (opcional)</Label>
            <Input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="TI, Vendas, RH..."
              className="border-2 border-primary/30"
            />
          </div>

          <div className="space-y-3">
            <Label>Permissões</Label>
            <div className="space-y-2">
              {[
                { key: "inventory", label: "Gerenciar Inventário" },
                { key: "calendar", label: "Acessar Agenda" },
                { key: "finance", label: "Visualizar Financeiro" },
                { key: "requests", label: "Gerenciar Solicitações" },
                { key: "communication", label: "Usar Comunicação" },
              ].map((perm) => (
                <div key={perm.key} className="flex items-center gap-2">
                  <Checkbox
                    checked={permissions[perm.key as keyof typeof permissions]}
                    onCheckedChange={(checked) => setPermissions({ ...permissions, [perm.key]: checked })}
                    className="border-2 border-primary/30"
                  />
                  <Label className="text-sm cursor-pointer">{perm.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full border-2 border-primary/30">
            {member ? "Atualizar Membro" : "Adicionar à Equipe"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
