import type { StockMovement, MovementStats } from "./stock-movement-types"

export const MOCK_MOVEMENTS: StockMovement[] = [
  {
    id: "1",
    productId: "1",
    productName: "Dell Laptop XPS 15",
    type: "entrada",
    quantity: 10,
    entryDate: new Date("2025-01-15"),
    exitDate: null,
    supplier: "Dell Inc.",
    responsible: "Viktor César",
    notes: "Compra mensal de equipamentos",
    invoiceNumber: "NF-2025-001",
    unitPrice: 1299.99,
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    productId: "1",
    productName: "Dell Laptop XPS 15",
    type: "saida",
    quantity: 3,
    entryDate: null,
    exitDate: new Date("2025-01-18"),
    destination: "Departamento de TI",
    responsible: "Maria Silva",
    notes: "Distribuição para novos funcionários",
    createdAt: new Date("2025-01-18"),
  },
  {
    id: "3",
    productId: "2",
    productName: "Logitech MX Master 3",
    type: "entrada",
    quantity: 20,
    entryDate: new Date("2025-01-10"),
    exitDate: null,
    supplier: "Logitech",
    responsible: "Viktor César",
    invoiceNumber: "NF-2025-002",
    unitPrice: 99.99,
    createdAt: new Date("2025-01-10"),
  },
  {
    id: "4",
    productId: "5",
    productName: 'Samsung Monitor 27"',
    type: "saida",
    quantity: 5,
    entryDate: null,
    exitDate: new Date("2025-01-20"),
    destination: "Escritório Central",
    responsible: "João Santos",
    notes: "Setup de novas estações de trabalho",
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "5",
    productId: "3",
    productName: "Microsoft Office 365",
    type: "entrada",
    quantity: 50,
    entryDate: new Date("2025-01-20"),
    exitDate: null,
    supplier: "Microsoft",
    responsible: "Viktor César",
    invoiceNumber: "NF-2025-003",
    unitPrice: 149.99,
    createdAt: new Date("2025-01-20"),
  },
]

export function getMovementStats(movements: StockMovement[]): MovementStats {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const entries = movements.filter((m) => m.type === "entrada")
  const exits = movements.filter((m) => m.type === "saida")

  return {
    totalEntries: entries.reduce((sum, m) => sum + m.quantity, 0),
    totalExits: exits.reduce((sum, m) => sum + m.quantity, 0),
    entriesThisMonth: entries
      .filter((m) => m.entryDate && m.entryDate >= startOfMonth)
      .reduce((sum, m) => sum + m.quantity, 0),
    exitsThisMonth: exits
      .filter((m) => m.exitDate && m.exitDate >= startOfMonth)
      .reduce((sum, m) => sum + m.quantity, 0),
    totalValueIn: entries.reduce((sum, m) => sum + (m.unitPrice || 0) * m.quantity, 0),
    totalValueOut: exits.reduce((sum, m) => sum + (m.unitPrice || 0) * m.quantity, 0),
  }
}
