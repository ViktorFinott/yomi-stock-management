// Mock analytics data for charts
export interface InventoryTrend {
  date: string
  total: number
  inStock: number
  lowStock: number
  outOfStock: number
}

export interface CategoryDistribution {
  category: string
  count: number
  value: number
}

export interface MonthlyActivity {
  month: string
  added: number
  removed: number
  updated: number
}

export interface TopItem {
  name: string
  category: string
  quantity: number
  value: number
}

// Generate weekly data (last 7 days)
export function getWeeklyData(): InventoryTrend[] {
  const data: InventoryTrend[] = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    data.push({
      date: dateStr,
      total: 120 + Math.floor(Math.random() * 20),
      inStock: 85 + Math.floor(Math.random() * 10),
      lowStock: 20 + Math.floor(Math.random() * 5),
      outOfStock: 5 + Math.floor(Math.random() * 3),
    })
  }

  return data
}

// Generate monthly data (last 12 months)
export function getMonthlyData(): InventoryTrend[] {
  const data: InventoryTrend[] = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  for (let i = 11; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthStr = months[date.getMonth()]

    data.push({
      date: monthStr,
      total: 100 + i * 5 + Math.floor(Math.random() * 10),
      inStock: 70 + i * 3 + Math.floor(Math.random() * 8),
      lowStock: 18 + Math.floor(Math.random() * 5),
      outOfStock: 4 + Math.floor(Math.random() * 3),
    })
  }

  return data
}

// Generate yearly data (last 3 years)
export function getYearlyData(): InventoryTrend[] {
  const currentYear = new Date().getFullYear()
  return [
    {
      date: (currentYear - 2).toString(),
      total: 95,
      inStock: 68,
      lowStock: 20,
      outOfStock: 7,
    },
    {
      date: (currentYear - 1).toString(),
      total: 115,
      inStock: 82,
      lowStock: 22,
      outOfStock: 11,
    },
    {
      date: currentYear.toString(),
      total: 138,
      inStock: 98,
      lowStock: 28,
      outOfStock: 12,
    },
  ]
}

// Category distribution
export function getCategoryDistribution(): CategoryDistribution[] {
  return [
    { category: "Hardware", count: 45, value: 58750 },
    { category: "Software", count: 35, value: 26250 },
    { category: "Accessories", count: 28, value: 4200 },
    { category: "Networking", count: 22, value: 13500 },
    { category: "Other", count: 8, value: 2400 },
  ]
}

// Monthly activity
export function getMonthlyActivity(): MonthlyActivity[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  return months.map((month) => ({
    month,
    added: Math.floor(Math.random() * 20) + 10,
    removed: Math.floor(Math.random() * 10) + 2,
    updated: Math.floor(Math.random() * 30) + 15,
  }))
}

// Top items by value
export function getTopItems(): TopItem[] {
  return [
    { name: "Dell Laptop XPS 15", category: "Hardware", quantity: 25, value: 32499.75 },
    { name: 'Samsung Monitor 27"', category: "Hardware", quantity: 45, value: 13499.55 },
    { name: "Microsoft Office 365", category: "Software", quantity: 100, value: 14999.0 },
    { name: "Adobe Creative Cloud", category: "Software", quantity: 30, value: 17999.7 },
    { name: "Cisco Switch 24-Port", category: "Networking", quantity: 15, value: 7499.85 },
  ]
}
