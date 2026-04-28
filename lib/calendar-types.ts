export type EventType = "personal" | "team" | "meeting" | "deadline" | "reminder"
export type EventPriority = "low" | "medium" | "high"

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  date: string // ISO date string
  startTime?: string // HH:MM format
  endTime?: string // HH:MM format
  type: EventType
  priority: EventPriority
  isShared: boolean
  createdBy: string // user id
  sharedWith?: string[] // user ids
  color?: string
  completed?: boolean
  createdAt: string
  updatedAt: string
}
