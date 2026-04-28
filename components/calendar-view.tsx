"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CalendarEvent } from "@/lib/calendar-types"

interface CalendarViewProps {
  events: CalendarEvent[]
  onDateSelect: (date: string) => void
  selectedDate: string
}

export function CalendarView({ events, onDateSelect, selectedDate }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((event) => event.date === dateStr)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  }

  const isSelected = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return selectedDate === dateStr
  }

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-24" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDay(day)
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    days.push(
      <Card
        key={day}
        onClick={() => onDateSelect(dateStr)}
        className={cn(
          "h-24 p-2 cursor-pointer transition-all border-2 hover:border-primary/50",
          isToday(day) && "border-primary bg-primary/5",
          isSelected(day) && "border-primary bg-primary/10",
          !isToday(day) && !isSelected(day) && "border-border/30",
        )}
      >
        <div className="flex flex-col h-full">
          <span
            className={cn(
              "text-sm font-medium mb-1",
              isToday(day) ? "text-primary" : "text-foreground",
              isSelected(day) && "font-bold",
            )}
          >
            {day}
          </span>
          <div className="flex-1 overflow-hidden space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="text-xs px-1 py-0.5 rounded truncate"
                style={{ backgroundColor: event.color + "20", color: event.color }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground px-1">+{dayEvents.length - 2} mais</div>
            )}
          </div>
        </div>
      </Card>,
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-2">
          <Button onClick={previousMonth} variant="outline" size="icon" className="border-primary/30 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={nextMonth} variant="outline" size="icon" className="border-primary/30 bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  )
}
