"use client"
import type { InventoryItem } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface InventoryTableProps {
  items: InventoryItem[]
  onEdit: (item: InventoryItem) => void
  onDelete: (id: string) => void
  onView: (item: InventoryItem) => void
}

export function InventoryTable({ items, onEdit, onDelete, onView }: InventoryTableProps) {
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
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No items found
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <span className={cn(item.quantity <= item.minQuantity && "text-yellow-500 font-medium")}>
                    {item.quantity}
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">/ {item.minQuantity}</span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.location}</TableCell>
                <TableCell>{formatCurrency(item.price)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(item.status)}>
                    {item.status.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(item.lastUpdated)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onView(item)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
