export type RequestType = "inventory" | "support" | "maintenance" | "other"
export type RequestStatus = "pending" | "approved" | "rejected" | "completed"
export type RequestPriority = "low" | "medium" | "high" | "urgent"

export interface Request {
  id: string
  title: string
  description: string
  type: RequestType
  status: RequestStatus
  priority: RequestPriority
  requestedBy: string
  requestedByEmail: string
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
  itemName?: string
  quantity?: number
  notes?: string
}
