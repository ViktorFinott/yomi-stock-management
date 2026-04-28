"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  type: string
  description: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

interface ActivityLogContextType {
  logs: ActivityLog[]
  addLog: (log: Omit<ActivityLog, "id" | "createdAt">) => void
  getLogsByUser: (userId: string) => ActivityLog[]
  getLogsByType: (type: string) => ActivityLog[]
  clearLogs: () => void
}

const ActivityLogContext = createContext<ActivityLogContextType | undefined>(undefined)

const STORAGE_KEY = "yomi_activity_logs"
const MAX_LOGS = 1000

export function ActivityLogProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<ActivityLog[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setLogs(parsed.map((log: ActivityLog) => ({ ...log, createdAt: new Date(log.createdAt) })))
      }
    } catch (error) {
      console.error("[ActivityLog] Error loading logs:", error)
    }
  }, [])

  const addLog = useCallback((log: Omit<ActivityLog, "id" | "createdAt">) => {
    const newLog: ActivityLog = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    }

    setLogs((prev) => {
      const updated = [newLog, ...prev].slice(0, MAX_LOGS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const getLogsByUser = useCallback(
    (userId: string) => {
      return logs.filter((log) => log.userId === userId)
    },
    [logs]
  )

  const getLogsByType = useCallback(
    (type: string) => {
      return logs.filter((log) => log.type === type)
    },
    [logs]
  )

  const clearLogs = useCallback(() => {
    setLogs([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <ActivityLogContext.Provider
      value={{
        logs,
        addLog,
        getLogsByUser,
        getLogsByType,
        clearLogs,
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  )
}

export function useActivityLog(): ActivityLogContextType {
  const context = useContext(ActivityLogContext)
  if (!context) {
    throw new Error("useActivityLog must be used within ActivityLogProvider")
  }
  return context
}
