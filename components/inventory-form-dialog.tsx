"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { InventoryItem, InventoryCategory } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, MapPin, Building2, DollarSign, FileText, Hash } from 'lucide-react'

interface InventoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: InventoryItem | null
  onSave: (item: Omit<InventoryItem, "id" | "lastUpdated" | "status">) => void
}

const CATEGORIES: InventoryCategory[] = ["Hardware", "Software", "Accessories", "Networking", "Other"]

export function InventoryFormDialog({ open, onOpenChange, item, onSave }: InventoryFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Hardware" as InventoryCategory,
    quantity: 0,
    minQuantity: 0,
    location: "",
    supplier: "",
    price: 0,
    description: "",
  })

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category as InventoryCategory,
        quantity: item.quantity,
        minQuantity: item.minQuantity || 0,
        location: item.location || "",
        supplier: item.supplier || "",
        price: item.price || 0,
        description: item.description || "",
      })
    } else {
      setFormData({
        name: "",
        category: "Hardware",
        quantity: 0,
        minQuantity: 0,
        location: "",
        supplier: "",
        price: 0,
        description: "",
      })
    }
  }, [item, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      quantity: Number(formData.quantity),
      minQuantity: Number(formData.minQuantity),
      price: Number(formData.price),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border border-primary/20 bg-zinc-950/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-serif italic tracking-wide">
            {item ? "Editar Item" : "Adicionar Novo Item"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {item
              ? "Atualize os detalhes do item de inventário abaixo."
              : "Preencha os detalhes para adicionar um novo item ao inventário."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Package className="h-3.5 w-3.5" />
                  Nome do Item *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20"
                  placeholder="Ex: Notebook Dell"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  Categoria *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as InventoryCategory })}
                >
                  <SelectTrigger className="bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-800 bg-zinc-950">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Hash className="h-3.5 w-3.5" />
                  Quantidade *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
                  required
                  className="bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minQuantity" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Qtd. Mínima (Opcional)
                </Label>
                <Input
                  id="minQuantity"
                  type="number"
                  min="0"
                  value={formData.minQuantity}
                  onChange={(e) => setFormData({ ...formData, minQuantity: Number.parseInt(e.target.value) || 0 })}
                  className="bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Localização (Opcional)
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20"
                  placeholder="Ex: Prateleira A1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  Fornecedor (Opcional)
                </Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20"
                  placeholder="Ex: Dell Inc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <DollarSign className="h-3.5 w-3.5" />
                Preço Unitário (Opcional)
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
                className="bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <FileText className="h-3.5 w-3.5" />
                Descrição (Opcional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20 resize-none"
                placeholder="Detalhes adicionais sobre o item..."
              />
            </div>
          </div>
          <DialogFooter className="gap-2 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="hover:bg-white/5 hover:text-white"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              {item ? "Salvar Alterações" : "Adicionar Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
