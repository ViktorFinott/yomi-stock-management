"use client"

import type { Request } from "@/lib/request-types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface RequestViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: Request | null
}

export function RequestViewDialog({ open, onOpenChange, request }: RequestViewDialogProps) {
  if (!request) return null

  const getStatusColor = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "approved":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  const getPriorityColor = (priority: Request["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "medium":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "urgent":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
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
          <DialogTitle className="text-2xl">{request.title}</DialogTitle>
          <DialogDescription>Request details and status</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusColor(request.status)}>
              {request.status}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(request.priority)}>
              {request.priority}
            </Badge>
            <Badge variant="outline">{request.type}</Badge>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground mb-2">Description</p>
            <p className="text-sm">{request.description}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Requested By</p>
                <p className="text-lg font-semibold">{request.requestedBy}</p>
                <p className="text-sm text-muted-foreground">{request.requestedByEmail}</p>
              </div>
              {request.assignedTo && (
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="text-lg font-semibold">{request.assignedTo}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-lg font-semibold">{formatDate(request.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-lg font-semibold">{formatDate(request.updatedAt)}</p>
              </div>
            </div>
          </div>

          {request.itemName && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Item Name</p>
                  <p className="text-lg font-semibold">{request.itemName}</p>
                </div>
                {request.quantity && (
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="text-lg font-semibold">{request.quantity}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {request.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Notes</p>
                <p className="text-sm">{request.notes}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
