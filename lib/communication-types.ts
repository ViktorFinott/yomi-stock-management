export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  type: "text" | "system"
}

export interface Channel {
  id: string
  name: string
  description?: string
  members: string[]
  lastMessage?: Message
  unreadCount: number
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: "online" | "offline" | "away"
  avatar?: string
}
