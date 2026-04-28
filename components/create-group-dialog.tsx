"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import type { Group } from "@/lib/friends-groups-types"
import { useAuth, type User } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreateGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (group: Omit<Group, "id" | "createdAt" | "updatedAt">) => void
  group?: Group
  friends: User[]
}

export function CreateGroupDialog({ open, onOpenChange, onSave, group, friends }: CreateGroupDialogProps) {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [color, setColor] = useState("#9333ea")

  useEffect(() => {
    if (group) {
      setName(group.name)
      setDescription(group.description || "")
      setSelectedMembers(group.members.filter((m) => m !== user?.id))
      setColor(group.color || "#9333ea")
    } else {
      setName("")
      setDescription("")
      setSelectedMembers([])
      setColor("#9333ea")
    }
  }, [group, user, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const members = [user.id, ...selectedMembers]
    const admins = group ? group.admins : [user.id]

    onSave({
      name,
      description,
      createdBy: user.id,
      members,
      admins,
      color,
    })

    onOpenChange(false)
  }

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  const groupColors = [
    { value: "#9333ea", label: "Roxo" },
    { value: "#6366f1", label: "Índigo" },
    { value: "#3b82f6", label: "Azul" },
    { value: "#10b981", label: "Verde" },
    { value: "#f59e0b", label: "Laranja" },
    { value: "#ef4444", label: "Vermelho" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-primary">{group ? "Editar Grupo" : "Criar Novo Grupo"}</DialogTitle>
          <DialogDescription>
            {group ? "Atualize as informações do grupo" : "Crie um grupo e adicione membros"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary">
              Nome do Grupo *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Equipe de TI"
              required
              className="border-primary/30 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do grupo"
              rows={3}
              className="border-primary/30 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label>Cor do Grupo</Label>
            <div className="flex gap-2">
              {groupColors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    color === c.value ? "border-primary scale-110" : "border-border/30",
                  )}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Membros do Grupo</Label>
            <div className="border-2 border-primary/30 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
              {friends.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Você ainda não tem amigos. Adicione amigos primeiro para criar grupos.
                </p>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-md">
                    <Checkbox
                      id={`member-${friend.id}`}
                      checked={selectedMembers.includes(friend.id)}
                      onCheckedChange={() => toggleMember(friend.id)}
                    />
                    <Avatar className="h-8 w-8 border-2 border-primary/50">
                      {friend.avatar && <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />}
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">{friend.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-primary/30">
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {group ? "Atualizar" : "Criar"} Grupo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
