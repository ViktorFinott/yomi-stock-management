"use client"

import { useNotifications } from "@/lib/notifications-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, CheckCheck, Trash2, Package, MessageSquare, Users, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

const categoryIcons = {
  inventory: Package,
  request: AlertTriangle,
  message: MessageSquare,
  system: Info,
  finance: Info,
  team: Users,
}

const typeColors = {
  info: "text-blue-400 bg-blue-400/10",
  success: "text-green-400 bg-green-400/10",
  warning: "text-yellow-400 bg-yellow-400/10",
  error: "text-red-400 bg-red-400/10",
}

export function NotificationsPanel() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-bold flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0 border-2 border-primary/30 bg-zinc-950">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div>
            <h3 className="font-semibold">Notificações</h3>
            <p className="text-xs text-muted-foreground">{unreadCount} não lidas</p>
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                <CheckCheck className="h-4 w-4 mr-1" />
                Marcar todas
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="h-8 text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {notifications.map((notification) => {
                const Icon = categoryIcons[notification.category]
                const content = (
                  <div
                    key={notification.id}
                    className={cn(
                      "px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer group relative",
                      !notification.read && "bg-primary/5",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className={cn("p-2 rounded-lg shrink-0", typeColors[notification.type])}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn("font-medium text-sm", !notification.read && "text-white")}>
                            {notification.title}
                          </p>
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: ptBR })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )

                return notification.link ? (
                  <Link key={notification.id} href={notification.link}>
                    {content}
                  </Link>
                ) : (
                  <div key={notification.id}>{content}</div>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
