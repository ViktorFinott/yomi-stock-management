"use client"

import type { InventoryItem } from "@/lib/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface InventoryViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: InventoryItem | null
}

export function InventoryViewDialog({ open, onOpenChange, item }: InventoryViewDialogProps) {
  if (!item) return null

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "in-stock":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "low-stock":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "out-of-stock":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.name}</DialogTitle>
          <DialogDescription>Detailed information about this inventory item</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusColor(item.status)}>
              {item.status.replace("-", " ")}
            </Badge>
            <Badge variant="outline">{item.category}</Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="text-lg font-semibold">{item.quantity} units</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Minimum Quantity</p>
                <p className="text-lg font-semibold">{item.minQuantity} units</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unit Price</p>
                <p className="text-lg font-semibold">{formatCurrency(item.price)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-lg font-semibold text-primary">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-lg font-semibold">{item.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Supplier</p>
                <p className="text-lg font-semibold">{item.supplier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-lg font-semibold">{formatDate(item.lastUpdated)}</p>
              </div>
            </div>
          </div>

          {item.description && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{item.description}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
