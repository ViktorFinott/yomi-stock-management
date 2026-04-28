"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

/** Configuração de cores do tema */
interface ThemeColors {
  primary: string
  accent: string
  name: string
}

/** Contexto de tema */
interface ThemeContextType {
  currentTheme: ThemeColors
  backgroundImage: string | null
  backgroundOpacity: number
  darkMode: boolean
  setTheme: (theme: ThemeColors) => void
  setBackgroundImage: (image: string | null) => void
  setBackgroundOpacity: (opacity: number) => void
  setDarkMode: (dark: boolean) => void
  themes: ThemeColors[]
}

// =============================================================================
// CONSTANTES
// =============================================================================

/** Chaves do localStorage */
const STORAGE_KEYS = {
  THEME: "yomi-theme",
  BACKGROUND: "yomi-background",
  BACKGROUND_OPACITY: "yomi-background-opacity",
  DARK_MODE: "yomi-dark-mode",
} as const

/** Temas disponíveis no sistema */
const AVAILABLE_THEMES: ThemeColors[] = [
  { name: "Roxo", primary: "oklch(0.6 0.28 285)", accent: "oklch(0.55 0.25 285)" },
  { name: "Vermelho", primary: "oklch(0.6 0.25 15)", accent: "oklch(0.55 0.22 20)" },
  { name: "Azul", primary: "oklch(0.6 0.25 240)", accent: "oklch(0.55 0.22 235)" },
  { name: "Verde", primary: "oklch(0.6 0.25 150)", accent: "oklch(0.55 0.22 145)" },
  { name: "Laranja", primary: "oklch(0.65 0.25 40)", accent: "oklch(0.6 0.22 35)" },
  { name: "Rosa", primary: "oklch(0.65 0.25 330)", accent: "oklch(0.6 0.22 325)" },
  { name: "Ciano", primary: "oklch(0.6 0.25 200)", accent: "oklch(0.55 0.22 195)" },
]

/** ID do elemento overlay de background */
const BG_OVERLAY_ID = "bg-overlay"

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Aplica as cores do tema nas CSS custom properties
 */
function applyThemeColors(theme: ThemeColors): void {
  const root = document.documentElement
  root.style.setProperty("--primary", theme.primary)
  root.style.setProperty("--accent", theme.accent)
  root.style.setProperty("--ring", theme.primary)
  root.style.setProperty("--sidebar-primary", theme.primary)
  root.style.setProperty("--sidebar-ring", theme.primary)
}

/**
 * Aplica o modo escuro ou claro
 */
function applyDarkModeClass(isDark: boolean): void {
  if (isDark) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

/**
 * Aplica a imagem de fundo com overlay de opacidade
 */
function applyBackgroundImage(imageUrl: string | null, opacity = 30): void {
  if (imageUrl) {
    // Configurar imagem de fundo
    document.body.style.backgroundImage = `url(${imageUrl})`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundPosition = "center"
    document.body.style.backgroundAttachment = "fixed"
    document.body.style.opacity = (opacity / 100).toString()

    // Criar ou atualizar overlay
    let overlay = document.getElementById(BG_OVERLAY_ID)
    if (!overlay) {
      overlay = document.createElement("div")
      overlay.id = BG_OVERLAY_ID
      document.body.appendChild(overlay)
    }

    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, ${1 - opacity / 100});
      pointer-events: none;
      z-index: -1;
    `
  } else {
    // Remover imagem e overlay
    document.body.style.backgroundImage = "none"
    const overlay = document.getElementById(BG_OVERLAY_ID)
    if (overlay) {
      overlay.remove()
    }
  }
}

// =============================================================================
// CONTEXTO
// =============================================================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// =============================================================================
// PROVIDER
// =============================================================================

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Estado do tema
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(AVAILABLE_THEMES[0])
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundOpacity, setBackgroundOpacityState] = useState<number>(30)
  const [darkMode, setDarkModeState] = useState<boolean>(true)

  // ---------------------------------------------------------------------------
  // Carregamento inicial das preferências salvas
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Carregar tema salvo
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME)
    if (savedTheme) {
      const theme = JSON.parse(savedTheme)
      setCurrentTheme(theme)
      applyThemeColors(theme)
    }

    // Carregar imagem de fundo
    const savedBackground = localStorage.getItem(STORAGE_KEYS.BACKGROUND)
    if (savedBackground) {
      setBackgroundImage(savedBackground)
    }

    // Carregar opacidade
    const savedOpacity = localStorage.getItem(STORAGE_KEYS.BACKGROUND_OPACITY)
    if (savedOpacity) {
      const opacity = Number.parseInt(savedOpacity)
      setBackgroundOpacityState(opacity)
    }

    // Carregar modo escuro/claro
    const savedDarkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE)
    if (savedDarkMode) {
      const isDark = savedDarkMode === "true"
      setDarkModeState(isDark)
      applyDarkModeClass(isDark)
    }

    // Aplicar background se existir
    if (savedBackground) {
      const opacity = savedOpacity ? Number.parseInt(savedOpacity) : 30
      applyBackgroundImage(savedBackground, opacity)
    }
  }, [])

  // ---------------------------------------------------------------------------
  // Funções de atualização
  // ---------------------------------------------------------------------------

  const setTheme = (theme: ThemeColors) => {
    setCurrentTheme(theme)
    applyThemeColors(theme)
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme))
  }

  const setBackground = (image: string | null) => {
    setBackgroundImage(image)
    applyBackgroundImage(image, backgroundOpacity)

    if (image) {
      localStorage.setItem(STORAGE_KEYS.BACKGROUND, image)
    } else {
      localStorage.removeItem(STORAGE_KEYS.BACKGROUND)
    }
  }

  const setBackgroundOpacity = (opacity: number) => {
    setBackgroundOpacityState(opacity)

    if (backgroundImage) {
      applyBackgroundImage(backgroundImage, opacity)
    }

    localStorage.setItem(STORAGE_KEYS.BACKGROUND_OPACITY, opacity.toString())
  }

  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark)
    applyDarkModeClass(dark)
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, dark.toString())
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        backgroundImage,
        backgroundOpacity,
        darkMode,
        setTheme,
        setBackgroundImage: setBackground,
        setBackgroundOpacity,
        setDarkMode,
        themes: AVAILABLE_THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// =============================================================================
// HOOK
// =============================================================================

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
