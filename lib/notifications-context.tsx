"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export type NotificationType = "info" | "success" | "warning" | "error"
export type NotificationCategory = "inventory" | "request" | "message" | "system" | "finance" | "team"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  category: NotificationCategory
  read: boolean
  createdAt: Date
  link?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

const STORAGE_KEY = "yomi_notifications"

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setNotifications(parsed.map((n: Notification) => ({ ...n, createdAt: new Date(n.createdAt) })))
      } else {
        const initialNotifications: Notification[] = [
          {
            id: "welcome-1",
            title: "Bem-vindo ao Yomi!",
            message: "Sistema de gestão de estoque pronto para uso.",
            type: "success",
            category: "system",
            read: false,
            createdAt: new Date(),
          },
          {
            id: "low-stock-1",
            title: "Estoque Baixo",
            message: "Logitech MX Master 3 está com estoque baixo (8 unidades)",
            type: "warning",
            category: "inventory",
            read: false,
            createdAt: new Date(Date.now() - 3600000),
            link: "/inventory",
          },
          {
            id: "out-stock-1",
            title: "Produto Esgotado",
            message: "Cisco Switch 24-Port está sem estoque",
            type: "error",
            category: "inventory",
            read: false,
            createdAt: new Date(Date.now() - 7200000),
            link: "/inventory",
          },
        ]
        setNotifications(initialNotifications)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotifications))
      }
    } catch (error) {
      console.error("[v0] Error loading notifications:", error)
    }
  }, [])

  const saveNotifications = useCallback((newNotifications: Notification[]) => {
    setNotifications(newNotifications)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotifications))
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      read: false,
      createdAt: new Date(),
    }
    setNotifications((prev) => {
      const updated = [newNotification, ...prev].slice(0, 100) // Keep max 100 notifications
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationsProvider")
  }
  return context
}
