"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Keyboard } from "lucide-react"

interface KeyboardShortcutsHelpProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const shortcuts = [
  {
    category: "Navegação Geral",
    items: [
      { keys: ["Ctrl", "K"], description: "Abrir busca global" },
      { keys: ["Ctrl", "1"], description: "Ir para Painel" },
      { keys: ["Ctrl", "2"], description: "Ir para Inventário" },
      { keys: ["Ctrl", "3"], description: "Ir para Relatórios" },
      { keys: ["Ctrl", "4"], description: "Ir para Solicitações" },
      { keys: ["Ctrl", "5"], description: "Ir para Comunicação" },
      { keys: ["Ctrl", ","], description: "Ir para Configurações" },
    ],
  },
  {
    category: "Navegação Vim-Style",
    items: [
      { keys: ["G", "D"], description: "Ir para Dashboard" },
      { keys: ["G", "I"], description: "Ir para Inventário" },
      { keys: ["G", "A"], description: "Ir para Analytics" },
      { keys: ["G", "R"], description: "Ir para Requests" },
      { keys: ["G", "C"], description: "Ir para Communication" },
      { keys: ["G", "S"], description: "Ir para Settings" },
      { keys: ["G", "F"], description: "Ir para Finance" },
      { keys: ["G", "N"], description: "Ir para Notes" },
    ],
  },
  {
    category: "Ações",
    items: [
      { keys: ["Esc"], description: "Fechar modal/dialog" },
      { keys: ["Enter"], description: "Confirmar seleção" },
      { keys: ["↑", "↓"], description: "Navegar em listas" },
    ],
  },
]

export function KeyboardShortcutsHelp({ open, onOpenChange }: KeyboardShortcutsHelpProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-2 border-primary/30 bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-primary" />
            Atalhos de Teclado
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-semibold text-primary mb-3">{section.category}</h3>
              <div className="space-y-2">
                {section.items.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-900/50 border border-white/5"
                  >
                    <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-mono bg-zinc-800 border border-white/10 rounded text-white">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && <span className="mx-1 text-muted-foreground">+</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center pt-4 border-t border-white/10">
          Pressione <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-white/10 rounded text-white">?</kbd> a
          qualquer momento para ver este guia
        </div>
      </DialogContent>
    </Dialog>
  )
}
