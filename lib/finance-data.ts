import type { Budget, Transaction, FinancialSummary } from "./finance-types"

export const budgetCategories: Budget[] = [
  { id: "1", category: "Moradia", allocated: 2000, spent: 1850, color: "#8b5cf6", icon: "🏠" },
  { id: "2", category: "Alimentação", allocated: 800, spent: 650, color: "#ec4899", icon: "🍔" },
  { id: "3", category: "Transporte", allocated: 500, spent: 420, color: "#06b6d4", icon: "🚗" },
  { id: "4", category: "Lazer", allocated: 400, spent: 380, color: "#f59e0b", icon: "🎮" },
  { id: "5", category: "Saúde", allocated: 300, spent: 150, color: "#10b981", icon: "💊" },
  { id: "6", category: "Educação", allocated: 600, spent: 600, color: "#6366f1", icon: "📚" },
  { id: "7", category: "Poupança", allocated: 1000, spent: 1000, color: "#14b8a6", icon: "💰" },
  { id: "8", category: "Outros", allocated: 400, spent: 250, color: "#a855f7", icon: "📦" },
]

export const transactions: Transaction[] = [
  {
    id: "1",
    description: "Salário",
    amount: 6000,
    category: "Renda",
    date: "2025-01-01",
    type: "income",
  },
  {
    id: "2",
    description: "Aluguel",
    amount: -1500,
    category: "Moradia",
    date: "2025-01-05",
    type: "expense",
  },
  {
    id: "3",
    description: "Supermercado",
    amount: -350,
    category: "Alimentação",
    date: "2025-01-08",
    type: "expense",
  },
  {
    id: "4",
    description: "Gasolina",
    amount: -200,
    category: "Transporte",
    date: "2025-01-10",
    type: "expense",
  },
  {
    id: "5",
    description: "Cinema",
    amount: -80,
    category: "Lazer",
    date: "2025-01-12",
    type: "expense",
  },
]

export const financialSummary: FinancialSummary = {
  totalIncome: 6000,
  totalExpenses: 5300,
  balance: 700,
  savingsRate: 16.67,
}
