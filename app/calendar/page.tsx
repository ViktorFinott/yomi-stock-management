"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarView } from "@/components/calendar-view"
import { EventList } from "@/components/event-list"
import { EventFormDialog } from "@/components/event-form-dialog"
import { Plus, CalendarIcon, Users } from "lucide-react"
import type { CalendarEvent } from "@/lib/calendar-types"
import { MOCK_EVENTS, getEventsForDate } from "@/lib/calendar-data"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function CalendarPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>()
  const [activeTab, setActiveTab] = useState("personal")

  useEffect(() => {
    const storedEvents = localStorage.getItem("yomi_calendar_events")
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    } else {
      setEvents(MOCK_EVENTS)
      localStorage.setItem("yomi_calendar_events", JSON.stringify(MOCK_EVENTS))
    }
  }, [])

  const saveEvents = (newEvents: CalendarEvent[]) => {
    setEvents(newEvents)
    localStorage.setItem("yomi_calendar_events", JSON.stringify(newEvents))
  }

  const handleSaveEvent = (eventData: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">) => {
    if (editingEvent) {
      const updatedEvents = events.map((e) =>
        e.id === editingEvent.id
          ? {
              ...eventData,
              id: editingEvent.id,
              createdAt: editingEvent.createdAt,
              updatedAt: new Date().toISOString(),
            }
          : e,
      )
      saveEvents(updatedEvents)
      toast({
        title: "Evento atualizado",
        description: "O evento foi atualizado com sucesso",
      })
    } else {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      saveEvents([...events, newEvent])
      toast({
        title: "Evento criado",
        description: "O evento foi adicionado ao calendário",
      })
    }
    setEditingEvent(undefined)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event)
    setIsDialogOpen(true)
  }

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter((e) => e.id !== eventId)
    saveEvents(updatedEvents)
    toast({
      title: "Evento excluído",
      description: "O evento foi removido do calendário",
      variant: "destructive",
    })
  }

  const handleNewEvent = () => {
    setEditingEvent(undefined)
    setIsDialogOpen(true)
  }

  const personalEvents = events.filter((e) => !e.isShared && e.createdBy === user?.id)
  const teamEvents = events.filter((e) => e.isShared)

  const filteredEvents = activeTab === "personal" ? personalEvents : teamEvents
  const selectedDateEvents = getEventsForDate(filteredEvents, selectedDate)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Agenda</h1>
            <p className="text-muted-foreground">Gerencie seus eventos e compromissos</p>
          </div>
          <Button onClick={handleNewEvent} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="border-2 border-primary/30">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Minha Agenda
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="h-4 w-4 mr-2" />
              Agenda da Equipe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-2 border-primary/30">
                  <CardHeader>
                    <CardTitle>Calendário Pessoal</CardTitle>
                    <CardDescription>Seus eventos e compromissos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalendarView events={personalEvents} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-2 border-primary/30">
                  <CardHeader>
                    <CardTitle>
                      Eventos do Dia
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        {new Date(selectedDate).toLocaleDateString("pt-BR")}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EventList events={selectedDateEvents} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-2 border-primary/30">
                  <CardHeader>
                    <CardTitle>Calendário da Equipe</CardTitle>
                    <CardDescription>Eventos compartilhados com toda a equipe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalendarView events={teamEvents} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-2 border-primary/30">
                  <CardHeader>
                    <CardTitle>
                      Eventos do Dia
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        {new Date(selectedDate).toLocaleDateString("pt-BR")}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EventList events={selectedDateEvents} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <EventFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveEvent}
        event={editingEvent}
        defaultDate={selectedDate}
      />
    </DashboardLayout>
  )
}
