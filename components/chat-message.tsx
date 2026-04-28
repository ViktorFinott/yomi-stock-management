"use client"

import type { Message } from "@/lib/communication-types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: Message
  isCurrentUser: boolean
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (message.type === "system") {
    return (
      <div className="flex justify-center py-2">
        <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">{message.content}</div>
      </div>
    )
  }

  return (
    <div className={cn("flex gap-3 py-2", isCurrentUser && "flex-row-reverse")}>
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
          {message.senderName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col gap-1 max-w-[70%]", isCurrentUser && "items-end")}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message.senderName}</span>
          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
        </div>
        <div className={cn("px-4 py-2 rounded-lg", isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
