"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MOCK_INVENTORY } from "@/lib/inventory-data"
import {
  Search,
  Package,
  LayoutDashboard,
  BarChart3,
  ClipboardList,
  MessageSquare,
  Users,
  Calendar,
  StickyNote,
  Wallet,
  Settings,
  Code2,
  Plug,
  ArrowLeftRight,
  UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  description: string
  category: "page" | "inventory" | "action"
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const PAGES: SearchResult[] = [
  {
    id: "dashboard",
    title: "Painel",
    description: "Visão geral do sistema",
    category: "page",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "inventory",
    title: "Inventário",
    description: "Gerenciar produtos e estoque",
    category: "page",
    icon: Package,
    href: "/inventory",
  },
  {
    id: "stock-movement",
    title: "Entrada/Saída",
    description: "Movimentações de estoque",
    category: "page",
    icon: ArrowLeftRight,
    href: "/stock-movement",
  },
  {
    id: "analytics",
    title: "Relatórios",
    description: "Análises e estatísticas",
    category: "page",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    id: "requests",
    title: "Solicitações",
    description: "Pedidos e requisições",
    category: "page",
    icon: ClipboardList,
    href: "/requests",
  },
  {
    id: "communication",
    title: "Comunicação",
    description: "Chat e mensagens",
    category: "page",
    icon: MessageSquare,
    href: "/communication",
  },
  {
    id: "calendar",
    title: "Agenda",
    description: "Eventos e compromissos",
    category: "page",
    icon: Calendar,
    href: "/calendar",
  },
  {
    id: "friends",
    title: "Amigos",
    description: "Contatos e conexões",
    category: "page",
    icon: UserPlus,
    href: "/friends",
  },
  {
    id: "notes",
    title: "Anotações",
    description: "Notas e lembretes",
    category: "page",
    icon: StickyNote,
    href: "/notes",
  },
  {
    id: "finance",
    title: "Financeiro",
    description: "Controle financeiro",
    category: "page",
    icon: Wallet,
    href: "/finance",
  },
  { id: "code", title: "Code", description: "Editor de código", category: "page", icon: Code2, href: "/code" },
  {
    id: "integrations",
    title: "Integrações",
    description: "Conexões externas",
    category: "page",
    icon: Plug,
    href: "/integrations",
  },
  { id: "team", title: "Equipe", description: "Gerenciar equipe", category: "page", icon: Users, href: "/users" },
  {
    id: "settings",
    title: "Configurações",
    description: "Preferências do sistema",
    category: "page",
    icon: Settings,
    href: "/settings",
  },
]

interface GlobalSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results: SearchResult[] = query.trim()
    ? [
        ...PAGES.filter(
          (page) =>
            page.title.toLowerCase().includes(query.toLowerCase()) ||
            page.description.toLowerCase().includes(query.toLowerCase()),
        ),
        ...MOCK_INVENTORY.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.supplier?.toLowerCase().includes(query.toLowerCase()),
        ).map((item) => ({
          id: `inv-${item.id}`,
          title: item.name,
          description: `${item.category} - ${item.quantity} unidades`,
          category: "inventory" as const,
          icon: Package,
          href: `/inventory?search=${encodeURIComponent(item.name)}`,
        })),
      ]
    : PAGES.slice(0, 6)

  useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault()
        router.push(results[selectedIndex].href)
        onOpenChange(false)
      }
    },
    [results, selectedIndex, router, onOpenChange],
  )

  const handleSelect = (result: SearchResult) => {
    router.push(result.href)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-2xl overflow-hidden border-2 border-primary/30 bg-zinc-950">
        <div className="flex items-center border-b border-white/10 px-4">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar páginas, produtos, ações..."
            className="border-0 bg-transparent focus-visible:ring-0 text-lg py-6 placeholder:text-muted-foreground/50"
          />
          <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-xs text-muted-foreground">
            ESC
          </kbd>
        </div>

        <ScrollArea className="max-h-[400px]">
          <div className="p-2">
            {results.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Nenhum resultado encontrado</p>
                <p className="text-sm mt-1">Tente buscar por outro termo</p>
              </div>
            ) : (
              <div className="space-y-1">
                {results.map((result, index) => {
                  const Icon = result.icon
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors",
                        index === selectedIndex
                          ? "bg-primary/20 text-white"
                          : "hover:bg-white/5 text-muted-foreground hover:text-white",
                      )}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          result.category === "page" && "bg-primary/20",
                          result.category === "inventory" && "bg-blue-500/20",
                          result.category === "action" && "bg-green-500/20",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                      </div>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          result.category === "page" && "bg-primary/10 text-primary",
                          result.category === "inventory" && "bg-blue-500/10 text-blue-400",
                          result.category === "action" && "bg-green-500/10 text-green-400",
                        )}
                      >
                        {result.category === "page" && "Página"}
                        {result.category === "inventory" && "Produto"}
                        {result.category === "action" && "Ação"}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↓</kbd>
              navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd>
              selecionar
            </span>
          </div>
          <span>Ctrl+K para buscar</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
