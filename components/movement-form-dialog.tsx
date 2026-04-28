"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { StockMovement, MovementType } from "@/lib/stock-movement-types"
import type { InventoryItem } from "@/lib/types"
import { Package, ArrowDownCircle, ArrowUpCircle, Calendar, User, FileText, DollarSign } from "lucide-react"

interface MovementFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  movement?: StockMovement | null
  products: InventoryItem[]
  onSave: (movement: Omit<StockMovement, "id" | "createdAt">) => void
}

export function MovementFormDialog({ open, onOpenChange, movement, products, onSave }: MovementFormDialogProps) {
  const [type, setType] = useState<MovementType>("entrada")
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [entryDate, setEntryDate] = useState("")
  const [exitDate, setExitDate] = useState("")
  const [supplier, setSupplier] = useState("")
  const [destination, setDestination] = useState("")
  const [responsible, setResponsible] = useState("")
  const [notes, setNotes] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [unitPrice, setUnitPrice] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (movement) {
      setType(movement.type)
      setProductId(movement.productId)
      setProductName(movement.productName)
      setQuantity(movement.quantity)
      setEntryDate(movement.entryDate ? movement.entryDate.toISOString().split("T")[0] : "")
      setExitDate(movement.exitDate ? movement.exitDate.toISOString().split("T")[0] : "")
      setSupplier(movement.supplier || "")
      setDestination(movement.destination || "")
      setResponsible(movement.responsible)
      setNotes(movement.notes || "")
      setInvoiceNumber(movement.invoiceNumber || "")
      setUnitPrice(movement.unitPrice)
    } else {
      resetForm()
    }
  }, [movement, open])

  const resetForm = () => {
    setType("entrada")
    setProductId("")
    setProductName("")
    setQuantity(1)
    setEntryDate(new Date().toISOString().split("T")[0])
    setExitDate("")
    setSupplier("")
    setDestination("")
    setResponsible("")
    setNotes("")
    setInvoiceNumber("")
    setUnitPrice(undefined)
  }

  const handleProductChange = (value: string) => {
    setProductId(value)
    const product = products.find((p) => p.id === value)
    if (product) {
      setProductName(product.name)
      if (product.price) setUnitPrice(product.price)
      if (product.supplier) setSupplier(product.supplier)
    }
  }

  const handleSubmit = () => {
    if (!productId || !productName || quantity <= 0 || !responsible) return

    onSave({
      productId,
      productName,
      type,
      quantity,
      entryDate: type === "entrada" && entryDate ? new Date(entryDate) : null,
      exitDate: type === "saida" && exitDate ? new Date(exitDate) : null,
      supplier: type === "entrada" ? supplier : undefined,
      destination: type === "saida" ? destination : undefined,
      responsible,
      notes: notes || undefined,
      invoiceNumber: invoiceNumber || undefined,
      unitPrice,
    })

    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-zinc-950 border-2 border-primary/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {type === "entrada" ? (
              <ArrowDownCircle className="h-6 w-6 text-green-500" />
            ) : (
              <ArrowUpCircle className="h-6 w-6 text-red-500" />
            )}
            {movement ? "Editar Movimentação" : "Nova Movimentação"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tipo de Movimentação */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setType("entrada")}
              className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                type === "entrada"
                  ? "border-green-500 bg-green-500/10 text-green-500"
                  : "border-white/10 text-muted-foreground hover:border-white/20"
              }`}
            >
              <ArrowDownCircle className="h-6 w-6" />
              <div className="text-left">
                <p className="font-semibold">Entrada</p>
                <p className="text-xs opacity-70">Adicionar ao estoque</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setType("saida")}
              className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                type === "saida"
                  ? "border-red-500 bg-red-500/10 text-red-500"
                  : "border-white/10 text-muted-foreground hover:border-white/20"
              }`}
            >
              <ArrowUpCircle className="h-6 w-6" />
              <div className="text-left">
                <p className="font-semibold">Saída</p>
                <p className="text-xs opacity-70">Remover do estoque</p>
              </div>
            </button>
          </div>

          {/* Produto */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-primary">
              <Package className="h-4 w-4" />
              Produto *
            </Label>
            <Select value={productId} onValueChange={handleProductChange}>
              <SelectTrigger className="bg-zinc-900 border-white/10">
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10">
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.quantity} em estoque)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantidade e Preço */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-primary">Quantidade *</Label>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                className="bg-zinc-900 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Preço Unitário
              </Label>
              <Input
                type="number"
                step="0.01"
                value={unitPrice || ""}
                onChange={(e) => setUnitPrice(Number.parseFloat(e.target.value) || undefined)}
                className="bg-zinc-900 border-white/10"
                placeholder="Opcional"
              />
            </div>
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              {type === "entrada" ? "Data de Entrada *" : "Data de Saída *"}
            </Label>
            <Input
              type="date"
              value={type === "entrada" ? entryDate : exitDate}
              onChange={(e) => (type === "entrada" ? setEntryDate(e.target.value) : setExitDate(e.target.value))}
              className="bg-zinc-900 border-white/10"
            />
          </div>

          {/* Fornecedor ou Destino */}
          {type === "entrada" ? (
            <div className="space-y-2">
              <Label className="text-muted-foreground">Fornecedor</Label>
              <Input
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="bg-zinc-900 border-white/10"
                placeholder="Nome do fornecedor (opcional)"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label className="text-muted-foreground">Destino</Label>
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-zinc-900 border-white/10"
                placeholder="Para onde está indo (opcional)"
              />
            </div>
          )}

          {/* Responsável */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-primary">
              <User className="h-4 w-4" />
              Responsável *
            </Label>
            <Input
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              className="bg-zinc-900 border-white/10"
              placeholder="Nome do responsável"
            />
          </div>

          {/* Nota Fiscal (apenas entrada) */}
          {type === "entrada" && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                Número da Nota Fiscal
              </Label>
              <Input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="bg-zinc-900 border-white/10"
                placeholder="Ex: NF-2025-001 (opcional)"
              />
            </div>
          )}

          {/* Observações */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Observações</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-zinc-900 border-white/10 min-h-[80px]"
              placeholder="Anotações adicionais (opcional)"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!productId || !responsible || quantity <= 0}
            className={type === "entrada" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          >
            {movement ? "Salvar Alterações" : type === "entrada" ? "Registrar Entrada" : "Registrar Saída"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
