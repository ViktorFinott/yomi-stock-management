"use client"

import type { Request } from "@/lib/request-types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle, XCircle } from "lucide-react"

interface RequestCardProps {
  request: Request
  onView: (request: Request) => void
  onEdit: (request: Request) => void
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  canManage?: boolean
}

export function RequestCard({ request, onView, onEdit, onApprove, onReject, canManage }: RequestCardProps) {
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
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg">{request.title}</CardTitle>
            <CardDescription className="line-clamp-2">{request.description}</CardDescription>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Badge variant="outline" className={getStatusColor(request.status)}>
            {request.status}
          </Badge>
          <Badge variant="outline" className={getPriorityColor(request.priority)}>
            {request.priority}
          </Badge>
          <Badge variant="outline">{request.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Requested by:</span>
            <span className="font-medium">{request.requestedBy}</span>
          </div>
          {request.assignedTo && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assigned to:</span>
              <span className="font-medium">{request.assignedTo}</span>
            </div>
          )}
          {request.itemName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item:</span>
              <span className="font-medium">
                {request.itemName} {request.quantity && `(${request.quantity})`}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created:</span>
            <span className="font-medium">{formatDate(request.createdAt)}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => onView(request)} className="flex-1">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          {canManage && request.status === "pending" && (
            <>
              <Button variant="outline" size="sm" onClick={() => onApprove?.(request.id)} className="text-green-500">
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onReject?.(request.id)} className="text-red-500">
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
