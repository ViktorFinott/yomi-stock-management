import type { CalendarEvent } from "./calendar-types"

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Reunião de Equipe",
    description: "Discussão sobre novos projetos",
    date: new Date().toISOString().split("T")[0],
    startTime: "10:00",
    endTime: "11:00",
    type: "meeting",
    priority: "high",
    isShared: true,
    createdBy: "1",
    sharedWith: [],
    color: "#9333ea",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Revisar Inventário",
    description: "Verificar itens em estoque baixo",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    startTime: "14:00",
    endTime: "15:30",
    type: "personal",
    priority: "medium",
    isShared: false,
    createdBy: "1",
    color: "#6366f1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function getEventsForDate(events: CalendarEvent[], date: string): CalendarEvent[] {
  return events
    .filter((event) => event.date === date)
    .sort((a, b) => {
      if (!a.startTime || !b.startTime) return 0
      return a.startTime.localeCompare(b.startTime)
    })
}

export function getEventsForMonth(events: CalendarEvent[], year: number, month: number): CalendarEvent[] {
  return events.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === year && eventDate.getMonth() === month
  })
}
