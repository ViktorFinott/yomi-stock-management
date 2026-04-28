export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minQuantity?: number // Made optional
  location?: string // Made optional
  supplier?: string // Made optional
  price?: number // Made optional
  lastUpdated: Date
  status: "in-stock" | "low-stock" | "out-of-stock"
  description?: string
}

export type InventoryCategory = "Hardware" | "Software" | "Accessories" | "Networking" | "Other"
