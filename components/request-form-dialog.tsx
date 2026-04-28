"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Request, RequestType, RequestPriority } from "@/lib/request-types"
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
import { useAuth } from "@/lib/auth-context"

interface RequestFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (request: Omit<Request, "id" | "createdAt" | "updatedAt" | "status">) => void
}

export function RequestFormDialog({ open, onOpenChange, onSave }: RequestFormDialogProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "inventory" as RequestType,
    priority: "medium" as RequestPriority,
    itemName: "",
    quantity: 1,
  })

  useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        description: "",
        type: "inventory",
        priority: "medium",
        itemName: "",
        quantity: 1,
      })
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      requestedBy: user?.name || "Unknown",
      requestedByEmail: user?.email || "unknown@yomi.com",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Request</DialogTitle>
          <DialogDescription>Fill in the details to submit a new request</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of your request"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Request Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as RequestType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as RequestPriority })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about your request"
                rows={4}
                required
              />
            </div>

            {formData.type === "inventory" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    placeholder="e.g., Dell Laptop XPS 15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
