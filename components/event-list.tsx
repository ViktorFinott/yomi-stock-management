"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Edit, Trash2, Users, User } from "lucide-react"
import type { CalendarEvent } from "@/lib/calendar-types"
import { useAuth } from "@/lib/auth-context"

interface EventListProps {
  events: CalendarEvent[]
  onEdit: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
}

export function EventList({ events, onEdit, onDelete }: EventListProps) {
  const { user } = useAuth()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return priority
    }
  }

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      personal: "Pessoal",
      team: "Equipe",
      meeting: "Reunião",
      deadline: "Prazo",
      reminder: "Lembrete",
    }
    return types[type] || type
  }

  if (events.length === 0) {
    return (
      <Card className="border-2 border-primary/30">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">Nenhum evento para este dia</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Card key={event.id} className="border-2 border-primary/30 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: event.color }} />
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </div>
                {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
              </div>
              {user?.id === event.createdBy && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(event)}
                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(event.id)}
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {event.startTime && (
                <Badge variant="outline" className="border-primary/30">
                  <Clock className="h-3 w-3 mr-1" />
                  {event.startTime}
                  {event.endTime && ` - ${event.endTime}`}
                </Badge>
              )}
              <Badge variant="outline" className={getPriorityColor(event.priority)}>
                {getPriorityLabel(event.priority)}
              </Badge>
              <Badge variant="outline" className="border-primary/30">
                {getTypeLabel(event.type)}
              </Badge>
              {event.isShared ? (
                <Badge variant="outline" className="border-primary/30">
                  <Users className="h-3 w-3 mr-1" />
                  Compartilhado
                </Badge>
              ) : (
                <Badge variant="outline" className="border-border/30">
                  <User className="h-3 w-3 mr-1" />
                  Pessoal
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
