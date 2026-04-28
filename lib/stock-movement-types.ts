export type MovementType = "entrada" | "saida"

export interface StockMovement {
  id: string
  productId: string
  productName: string
  type: MovementType
  quantity: number
  entryDate: Date | null
  exitDate: Date | null
  supplier?: string
  destination?: string
  responsible: string
  notes?: string
  invoiceNumber?: string
  unitPrice?: number
  createdAt: Date
}

export interface MovementStats {
  totalEntries: number
  totalExits: number
  entriesThisMonth: number
  exitsThisMonth: number
  totalValueIn: number
  totalValueOut: number
}
