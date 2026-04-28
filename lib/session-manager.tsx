"use client"

// =============================================================================
// GERENCIADOR DE SESSÃO
// Controla timeout de sessão por inatividade
// =============================================================================

import { useEffect, useCallback, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

// =============================================================================
// TIPOS
// =============================================================================

interface SessionManagerProps {
  /** Tempo de inatividade até logout (minutos) */
  timeoutMinutes?: number
  /** Tempo antes do logout para mostrar aviso (minutos) */
  warningMinutes?: number
}

// =============================================================================
// CONSTANTES
// =============================================================================

/** Eventos que resetam o timer de inatividade */
const ACTIVITY_EVENTS = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"] as const

// =============================================================================
// COMPONENTE
// =============================================================================

export function SessionManager({ timeoutMinutes = 30, warningMinutes = 5 }: SessionManagerProps) {
  const { user, logout } = useAuth()

  // Refs para controle de estado sem re-renders
  const lastActivityRef = useRef<number>(Date.now())
  const warningShownRef = useRef<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // ---------------------------------------------------------------------------
  // Reset do timer de inatividade
  // ---------------------------------------------------------------------------
  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now()
    warningShownRef.current = false

    // Limpar timeouts existentes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current)
    }

    // Não configurar novos timers se não há usuário logado
    if (!user) return

    // Calcular tempos em milissegundos
    const warningTimeMs = (timeoutMinutes - warningMinutes) * 60 * 1000
    const logoutTimeMs = timeoutMinutes * 60 * 1000

    // Configurar aviso de expiração
    warningTimeoutRef.current = setTimeout(() => {
      if (!warningShownRef.current) {
        warningShownRef.current = true
        toast.warning(`Sua sessão expirará em ${warningMinutes} minutos por inatividade`, {
          duration: 10000,
          action: {
            label: "Continuar",
            onClick: resetTimer,
          },
        })
      }
    }, warningTimeMs)

    // Configurar logout automático
    timeoutRef.current = setTimeout(() => {
      toast.error("Sessão expirada por inatividade")
      logout()
    }, logoutTimeMs)
  }, [user, logout, timeoutMinutes, warningMinutes])

  // ---------------------------------------------------------------------------
  // Configuração de event listeners
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!user) return

    // Handler de atividade do usuário
    const handleActivity = () => {
      resetTimer()
    }

    // Adicionar listeners para todos os eventos de atividade
    ACTIVITY_EVENTS.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true })
    })

    // Iniciar timer
    resetTimer()

    // Cleanup ao desmontar ou quando usuário muda
    return () => {
      ACTIVITY_EVENTS.forEach((event) => {
        document.removeEventListener(event, handleActivity)
      })

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current)
      }
    }
  }, [user, resetTimer])

  // Componente não renderiza nada visualmente
  return null
}
