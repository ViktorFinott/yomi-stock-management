"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { UserRole } from "@/lib/auth-context"

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (user: {
    name: string
    email: string
    password: string
    role: UserRole
    department: string
  }) => void
  editUser?: {
    id: string
    name: string
    email: string
    role: UserRole
    department?: string
  } | null
}

export function UserFormDialog({ open, onOpenChange, onSubmit, editUser }: UserFormDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: editUser?.name || "",
    email: editUser?.email || "",
    password: "",
    role: (editUser?.role || "user") as UserRole,
    department: editUser?.department || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || (!editUser && !formData.password)) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    onSubmit(formData)
    onOpenChange(false)
    setFormData({ name: "", email: "", password: "", role: "user", department: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-black border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl">{editUser ? "Editar Usuário" : "Adicionar Novo Usuário"}</DialogTitle>
          <DialogDescription>
            {editUser
              ? "Atualize as informações do usuário abaixo"
              : "Preencha os dados para criar um novo usuário no sistema"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome completo"
              className="bg-zinc-950 border-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="usuario@exemplo.com"
              className="bg-zinc-950 border-zinc-800"
            />
          </div>

          {!editUser && (
            <div className="space-y-2">
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Digite uma senha segura"
                className="bg-zinc-950 border-zinc-800"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="role">Função *</Label>
            <Select
              value={formData.role}
              onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="bg-zinc-950 border-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800">
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="user">Usuário</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Departamento</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="Ex: TI, RH, Financeiro"
              className="bg-zinc-950 border-zinc-800"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              {editUser ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
