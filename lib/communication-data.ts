import type { Channel, Message, TeamMember } from "./communication-types"

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Viktor Cesar",
    email: "Viktorcesar66@gmail.com",
    role: "admin",
    status: "online",
  },
]

export const MOCK_CHANNELS: Channel[] = [
  {
    id: "1",
    name: "Geral",
    description: "Discussões gerais da equipe",
    members: ["1"],
    unreadCount: 0,
  },
  {
    id: "2",
    name: "Suporte TI",
    description: "Suporte técnico e problemas",
    members: ["1"],
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Atualizações Inventário",
    description: "Notificações de mudanças no inventário",
    members: ["1"],
    unreadCount: 0,
  },
]

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "1",
      senderName: "Viktor Cesar",
      content: "Bem-vindo ao sistema Yomi de comunicação da equipe!",
      timestamp: new Date("2025-01-20T09:00:00"),
      type: "system",
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "1",
      senderName: "Viktor Cesar",
      content: "Canal de suporte TI criado para discussões técnicas.",
      timestamp: new Date("2025-01-19T14:00:00"),
      type: "system",
    },
  ],
  "3": [
    {
      id: "1",
      senderId: "1",
      senderName: "Viktor Cesar",
      content: "Este canal é para notificações de atualizações de inventário.",
      timestamp: new Date("2025-01-18T11:00:00"),
      type: "system",
    },
  ],
}
