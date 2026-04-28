"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, Clock } from "lucide-react"
import type { Note } from "@/lib/notes-data"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

const priorityColors = {
  low: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  high: "bg-red-500/20 text-red-400 border-red-500/50",
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
}

export function NoteCard({ note, onEdit, onDelete, onToggleComplete }: NoteCardProps) {
  return (
    <Card
      className={`border-2 border-primary/30 hover:border-primary/50 transition-colors ${note.completed ? "opacity-60" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={note.completed}
              onCheckedChange={() => onToggleComplete(note.id)}
              className="mt-1 border-2 border-primary/50"
            />
            <div className="flex-1">
              <h3
                className={`font-semibold text-lg ${note.completed ? "line-through text-muted-foreground" : "text-primary"}`}
              >
                {note.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`${priorityColors[note.priority]} border-2`}>
                  {priorityLabels[note.priority]}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true, locale: ptBR })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className={`text-sm ${note.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
          {note.content}
        </p>
      </CardContent>
      <CardFooter className="pt-3 border-t border-primary/20 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Por {note.userName}</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(note)}
            className="border-2 border-transparent hover:border-primary/30"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(note.id)}
            className="text-destructive hover:text-destructive border-2 border-transparent hover:border-destructive/30"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
