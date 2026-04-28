"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

interface KeyboardShortcutsProps {
  onOpenSearch: () => void
}

export function KeyboardShortcuts({ onOpenSearch }: KeyboardShortcutsProps) {
  const router = useRouter()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      // Ctrl/Cmd + K - Global Search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        onOpenSearch()
        return
      }

      // Ctrl/Cmd + shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            router.push("/dashboard")
            break
          case "2":
            e.preventDefault()
            router.push("/inventory")
            break
          case "3":
            e.preventDefault()
            router.push("/analytics")
            break
          case "4":
            e.preventDefault()
            router.push("/requests")
            break
          case "5":
            e.preventDefault()
            router.push("/communication")
            break
          case ",":
            e.preventDefault()
            router.push("/settings")
            break
        }
      }

      // G + key for navigation (vim-style)
      if (e.key === "g" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const handleSecondKey = (e2: KeyboardEvent) => {
          window.removeEventListener("keydown", handleSecondKey)
          switch (e2.key) {
            case "d":
              router.push("/dashboard")
              break
            case "i":
              router.push("/inventory")
              break
            case "a":
              router.push("/analytics")
              break
            case "r":
              router.push("/requests")
              break
            case "c":
              router.push("/communication")
              break
            case "s":
              router.push("/settings")
              break
            case "f":
              router.push("/finance")
              break
            case "n":
              router.push("/notes")
              break
          }
        }
        window.addEventListener("keydown", handleSecondKey, { once: true })
        setTimeout(() => window.removeEventListener("keydown", handleSecondKey), 500)
      }
    },
    [router, onOpenSearch],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return null
}
