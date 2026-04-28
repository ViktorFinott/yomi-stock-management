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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { CalendarEvent, EventType, EventPriority } from "@/lib/calendar-types"
import { useAuth } from "@/lib/auth-context"

interface EventFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">) => void
  event?: CalendarEvent
  defaultDate?: string
}

export function EventFormDialog({ open, onOpenChange, onSave, event, defaultDate }: EventFormDialogProps) {
  const { user } = useAuth()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [type, setType] = useState<EventType>("personal")
  const [priority, setPriority] = useState<EventPriority>("medium")
  const [isShared, setIsShared] = useState(false)
  const [color, setColor] = useState("#9333ea")

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setDescription(event.description || "")
      setDate(event.date)
      setStartTime(event.startTime || "")
      setEndTime(event.endTime || "")
      setType(event.type)
      setPriority(event.priority)
      setIsShared(event.isShared)
      setColor(event.color || "#9333ea")
    } else {
      setTitle("")
      setDescription("")
      setDate(defaultDate || new Date().toISOString().split("T")[0])
      setStartTime("")
      setEndTime("")
      setType("personal")
      setPriority("medium")
      setIsShared(false)
      setColor("#9333ea")
    }
  }, [event, defaultDate, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    onSave({
      title,
      description,
      date,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      type,
      priority,
      isShared,
      createdBy: user.id,
      color,
    })

    onOpenChange(false)
  }

  const eventColors = [
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
          <DialogTitle className="text-primary">{event ? "Editar Evento" : "Novo Evento"}</DialogTitle>
          <DialogDescription>
            {event ? "Atualize as informações do evento" : "Adicione um novo evento ao calendário"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-primary">
              Título *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do evento"
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
              placeholder="Detalhes do evento"
              rows={3}
              className="border-primary/30 focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-primary">
                Data *
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">Hora Início</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">Hora Fim</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={type} onValueChange={(value) => setType(value as EventType)}>
                <SelectTrigger className="border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Pessoal</SelectItem>
                  <SelectItem value="team">Equipe</SelectItem>
                  <SelectItem value="meeting">Reunião</SelectItem>
                  <SelectItem value="deadline">Prazo</SelectItem>
                  <SelectItem value="reminder">Lembrete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as EventPriority)}>
                <SelectTrigger className="border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="flex gap-2">
              {eventColors.map((c) => (
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

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border-2 border-primary/20">
            <div className="space-y-0.5">
              <Label htmlFor="shared" className="text-primary">
                Compartilhar com Equipe
              </Label>
              <p className="text-sm text-muted-foreground">Todos os membros poderão ver este evento</p>
            </div>
            <Switch id="shared" checked={isShared} onCheckedChange={setIsShared} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-primary/30">
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {event ? "Atualizar" : "Criar"} Evento
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
