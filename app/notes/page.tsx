"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, StickyNote, Save, Trash2 } from 'lucide-react'
import { NoteCard } from "@/components/note-card"
import { NoteFormDialog } from "@/components/note-form-dialog"
import { mockNotes, type Note } from "@/lib/notes-data"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  
  // Notepad state
  const [notepadContent, setNotepadContent] = useState("")
  const [isSavingNotepad, setIsSavingNotepad] = useState(false)

  // Load notepad from localStorage
  useEffect(() => {
    const savedNotepad = localStorage.getItem("yomi_notepad")
    if (savedNotepad) {
      setNotepadContent(savedNotepad)
    }
  }, [])

  // Auto-save notepad
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("yomi_notepad", notepadContent)
      setIsSavingNotepad(false)
    }, 1000)

    setIsSavingNotepad(true)
    return () => clearTimeout(timeoutId)
  }, [notepadContent])

  const handleSaveNote = (noteData: Omit<Note, "id" | "createdAt" | "updatedAt" | "userId" | "userName">) => {
    if (editingNote) {
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                ...noteData,
                updatedAt: new Date().toISOString(),
              }
            : note,
        ),
      )
      toast({
        title: "Anotação atualizada",
        description: "A anotação foi atualizada com sucesso.",
      })
    } else {
      const newNote: Note = {
        ...noteData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user?.id || "1",
        userName: user?.name || "Usuário",
      }
      setNotes([newNote, ...notes])
      toast({
        title: "Anotação criada",
        description: "A anotação foi criada com sucesso.",
      })
    }
    setEditingNote(null)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setIsFormOpen(true)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    toast({
      title: "Anotação excluída",
      description: "A anotação foi excluída com sucesso.",
    })
  }

  const handleToggleComplete = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              completed: !note.completed,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    )
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeNotes = filteredNotes.filter((note) => !note.completed)
  const completedNotes = filteredNotes.filter((note) => note.completed)

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* Main Notes Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary flex items-center gap-3 font-serif italic">
                <StickyNote className="h-8 w-8" />
                Anotações
              </h1>
              <p className="text-muted-foreground mt-1">Gerencie suas tarefas e lembretes</p>
            </div>
            <Button
              onClick={() => {
                setEditingNote(null)
                setIsFormOpen(true)
              }}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Anotação
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar anotações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20"
            />
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger value="active" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                Ativas ({activeNotes.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                Concluídas ({completedNotes.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-6">
              {activeNotes.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                  <StickyNote className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground">Nenhuma anotação ativa encontrada</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {activeNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              {completedNotes.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                  <StickyNote className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground">Nenhuma anotação concluída encontrada</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {completedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Notepad Section */}
        <div className="lg:col-span-1">
          <Card className="h-full border-zinc-800 bg-zinc-900/50 backdrop-blur-xl flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center justify-between text-primary">
                <span>Bloco de Notas Rápido</span>
                {isSavingNotepad ? (
                  <span className="text-xs text-muted-foreground animate-pulse">Salvando...</span>
                ) : (
                  <Save className="h-4 w-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
              <Textarea 
                value={notepadContent}
                onChange={(e) => setNotepadContent(e.target.value)}
                placeholder="Digite suas notas rápidas aqui..."
                className="h-full resize-none bg-transparent border-0 focus-visible:ring-0 p-0 text-base leading-relaxed placeholder:text-muted-foreground/50"
              />
            </CardContent>
            <div className="p-4 border-t border-white/5 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setNotepadContent("")}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </Card>
        </div>

        <NoteFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} note={editingNote} onSave={handleSaveNote} />
      </div>
    </DashboardLayout>
  )
}
