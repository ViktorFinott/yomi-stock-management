"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Note } from "@/lib/notes-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StickyNote, AlertCircle } from "lucide-react"

interface NoteFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  note?: Note | null
  onSave: (note: Omit<Note, "id" | "createdAt" | "updatedAt" | "userId" | "userName">) => void
}

export function NoteFormDialog({ open, onOpenChange, note, onSave }: NoteFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "medium" as "low" | "medium" | "high",
    completed: false,
  })

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        priority: note.priority,
        completed: note.completed,
      })
    } else {
      setFormData({
        title: "",
        content: "",
        priority: "medium",
        completed: false,
      })
    }
  }, [note, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary flex items-center gap-2">
            <StickyNote className="h-6 w-6" />
            {note ? "Editar Anotação" : "Nova Anotação"}
          </DialogTitle>
          <DialogDescription>
            {note ? "Atualize os detalhes da anotação abaixo." : "Crie uma nova anotação para organizar suas tarefas."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-primary">
                Título *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Digite o título da anotação"
                className="border-2 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="flex items-center gap-2 text-primary">
                <AlertCircle className="h-4 w-4" />
                Prioridade *
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as "low" | "medium" | "high" })}
              >
                <SelectTrigger className="border-2 border-primary/20 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-2 border-primary/30">
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-primary">
                Conteúdo *
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={6}
                placeholder="Descreva os detalhes da anotação..."
                className="border-2 border-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-2 border-primary/30"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 border-2 border-primary">
              {note ? "Atualizar" : "Criar"} Anotação
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
