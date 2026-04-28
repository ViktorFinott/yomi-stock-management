export interface Budget {
  id: string
  category: string
  allocated: number
  spent: number
  color: string
  icon: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  type: "income" | "expense"
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  balance: number
  savingsRate: number
}
