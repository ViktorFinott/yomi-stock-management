"use client"

import type { Channel } from "@/lib/communication-types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Hash } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChannelListProps {
  channels: Channel[]
  activeChannelId: string
  onChannelSelect: (channelId: string) => void
}

export function ChannelList({ channels, activeChannelId, onChannelSelect }: ChannelListProps) {
  return (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Channels</h3>
      </div>
      {channels.map((channel) => (
        <Button
          key={channel.id}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 px-3",
            activeChannelId === channel.id && "bg-accent text-accent-foreground",
          )}
          onClick={() => onChannelSelect(channel.id)}
        >
          <Hash className="h-4 w-4" />
          <span className="flex-1 text-left">{channel.name}</span>
          {channel.unreadCount > 0 && (
            <Badge variant="default" className="h-5 min-w-5 px-1 text-xs">
              {channel.unreadCount}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )
}
