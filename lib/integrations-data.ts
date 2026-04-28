export interface Integration {
  id: string
  name: string
  icon: string
  color: string
  connected: boolean
  username?: string
  lastConnected?: string
  scopes?: string[]
}

export const INTEGRATIONS: Integration[] = [
  {
    id: "google",
    name: "Google",
    icon: "🔍",
    color: "bg-red-500/20 border-red-500/50",
    connected: false,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "🎵",
    color: "bg-green-500/20 border-green-500/50",
    connected: false,
  },
  {
    id: "discord",
    name: "Discord",
    icon: "💬",
    color: "bg-blue-500/20 border-blue-500/50",
    connected: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶️",
    color: "bg-red-600/20 border-red-600/50",
    connected: false,
  },
  {
    id: "github",
    name: "GitHub",
    icon: "💻",
    color: "bg-gray-500/20 border-gray-500/50",
    connected: false,
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: "📺",
    color: "bg-purple-500/20 border-purple-500/50",
    connected: false,
  },
]

export function loadIntegrations(): Integration[] {
  try {
    const stored = localStorage.getItem("yomi_integrations")
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("[v0] Erro ao carregar integrações:", error)
  }
  return INTEGRATIONS
}

export function saveIntegrations(integrations: Integration[]): void {
  try {
    localStorage.setItem("yomi_integrations", JSON.stringify(integrations))
  } catch (error) {
    console.error("[v0] Erro ao salvar integrações:", error)
  }
}
