"use client"

import type { TeamMember } from "@/lib/communication-types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface TeamMemberListProps {
  members: TeamMember[]
}

export function TeamMemberList({ members }: TeamMemberListProps) {
  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team Members</h3>
      </div>
      {members.map((member) => (
        <div key={member.id} className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md cursor-pointer">
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {member.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                getStatusColor(member.status),
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{member.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
