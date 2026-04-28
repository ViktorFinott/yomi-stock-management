"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n/i18n-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Package,
  BarChart3,
  ClipboardList,
  MessageSquare,
  Users,
  LogOut,
  UserCircle,
  StickyNote,
  Calendar,
  Settings,
  ArrowLeft,
  ArrowLeftRight,
  Search,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { GlobalSearch } from "@/components/global-search"
import { NotificationsPanel } from "@/components/notifications-panel"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Inventário", href: "/inventory", icon: Package },
    { name: "Movimentação", href: "/stock-movement", icon: ArrowLeftRight },
    { name: "Análises", href: "/analytics", icon: BarChart3 },
    { name: "Solicitações", href: "/requests", icon: ClipboardList },
    { name: "Comunicação", href: "/communication", icon: MessageSquare },
    { name: "Calendário", href: "/calendar", icon: Calendar },
    { name: "Anotações", href: "/notes", icon: StickyNote },
    { name: "Equipe", href: "/team", icon: Users },
    { name: "Configurações", href: "/settings", icon: Settings },
  ]

  if (!user) {
    router.push("/login")
    return null
  }

  const currentPageName = navigation.find((n) => n.href === pathname)?.name || "Voltar"

  return (
    <div className="min-h-screen flex bg-black">
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />

      <aside className="w-64 bg-zinc-950/50 backdrop-blur-xl border-r border-white/10 flex flex-col sticky top-0 h-screen z-50">
        <div className="p-6 border-b border-white/10">
          <button
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer hover:opacity-80 transition-opacity group"
          >
            <h1 className="text-3xl font-bold text-primary font-serif italic tracking-tighter group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all">
              𝒴ℴ𝓂𝒾
            </h1>
            <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Gestão de Estoque</p>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                  isActive ? "text-white bg-primary/10" : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full animate-in fade-in slide-in-from-left-1" />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10 bg-zinc-950/30">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 px-2 hover:bg-white/5 h-auto py-3">
                <Avatar className="h-9 w-9 border border-white/10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                  {user.avatar && <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />}
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm overflow-hidden">
                  <span className="font-medium truncate w-full text-left">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate w-full text-left">
                    {user.department || "Usuário"}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-2 border-primary/30">
              <DropdownMenuLabel>Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <main className="flex-1 overflow-auto relative bg-black selection:bg-primary/30">
        <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-white/10 hover:text-primary transition-colors rounded-full"
              title="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="h-6 w-px bg-white/10" />
            <span className="text-sm text-muted-foreground font-medium">{currentPageName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-white hover:bg-white/10 px-3"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Buscar...</span>
              <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] text-muted-foreground">
                Ctrl+K
              </kbd>
            </Button>
            <NotificationsPanel />
          </div>
        </div>

        <div className="p-8 min-h-[calc(100vh-65px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  )
}
