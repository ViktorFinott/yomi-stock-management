"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { budgetCategories, transactions, financialSummary } from "@/lib/finance-data"
import type { Budget, Transaction } from "@/lib/finance-types"
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FinancePage() {
  const [salary, setSalary] = useState(6000)
  const [budgets, setBudgets] = useState<Budget[]>(budgetCategories)
  const [transactionList, setTransactionList] = useState<Transaction[]>(transactions)

  const chartData = budgets.map((budget) => ({
    name: budget.category,
    value: budget.allocated,
    color: budget.color,
  }))

  const spendingData = budgets.map((budget) => ({
    category: budget.category,
    Alocado: budget.allocated,
    Gasto: budget.spent,
  }))

  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const remaining = salary - totalSpent

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-black border-2 border-purple-500 rounded-lg">
            <Wallet className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Financeiro</h1>
            <p className="text-gray-400">Controle total das suas finanças</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black border-2 border-purple-500/30 hover:border-purple-500 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Renda Total</p>
                  <p className="text-2xl font-bold text-white">R$ {financialSummary.totalIncome.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-2 border-purple-500/30 hover:border-purple-500 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Despesas</p>
                  <p className="text-2xl font-bold text-white">R$ {totalSpent.toLocaleString()}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-2 border-purple-500/30 hover:border-purple-500 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Saldo</p>
                  <p className="text-2xl font-bold text-white">R$ {remaining.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-2 border-purple-500/30 hover:border-purple-500 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Taxa de Poupança</p>
                  <p className="text-2xl font-bold text-white">{financialSummary.savingsRate.toFixed(1)}%</p>
                </div>
                <PiggyBank className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-black border-2 border-purple-500/30">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Orçamento
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            Transações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black border-2 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-500">Distribuição do Orçamento</CardTitle>
                <CardDescription className="text-gray-400">Como seu dinheiro está dividido</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#000", border: "2px solid #a855f7" }}
                      formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {chartData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full border border-purple-500"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-300">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-2 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-500">Alocado vs Gasto</CardTitle>
                <CardDescription className="text-gray-400">Comparação por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={spendingData}>
                    <XAxis
                      dataKey="category"
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fill: "#9ca3af" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#000", border: "2px solid #a855f7" }}
                      formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar dataKey="Alocado" fill="#a855f7" />
                    <Bar dataKey="Gasto" fill="#7c3aed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black border-2 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-500">Configurar Renda Mensal</CardTitle>
              <CardDescription className="text-gray-400">Defina quanto você ganha por mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="salary" className="text-gray-300">
                    Salário Mensal (R$)
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="bg-black border-2 border-purple-500/30 text-white focus:border-purple-500"
                  />
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500">
                  Atualizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-purple-500">Categorias de Orçamento</h2>
              <p className="text-gray-400">Gerencie como seu dinheiro é distribuído</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-2 border-purple-500">
                <DialogHeader>
                  <DialogTitle className="text-purple-500">Adicionar Categoria</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Nome da Categoria</Label>
                    <Input
                      className="bg-black border-2 border-purple-500/30 text-white focus:border-purple-500"
                      placeholder="Ex: Investimentos"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Valor Alocado (R$)</Label>
                    <Input
                      className="bg-black border-2 border-purple-500/30 text-white focus:border-purple-500"
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">Adicionar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map((budget) => {
              const percentage = (budget.spent / budget.allocated) * 100
              const isOverBudget = percentage > 100

              return (
                <Card
                  key={budget.id}
                  className="bg-black border-2 border-purple-500/30 hover:border-purple-500 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{budget.icon}</div>
                        <div>
                          <h3 className="font-semibold text-white">{budget.category}</h3>
                          <p className="text-sm text-gray-400">
                            R$ {budget.spent.toLocaleString()} / R$ {budget.allocated.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className={`text-2xl font-bold ${isOverBudget ? "text-red-500" : "text-purple-500"}`}>
                        {percentage.toFixed(0)}%
                      </div>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-2 bg-gray-800">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isOverBudget ? "#ef4444" : "#a855f7",
                        }}
                      />
                    </Progress>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-400">Restante:</span>
                      <span className={budget.allocated - budget.spent >= 0 ? "text-purple-500" : "text-red-500"}>
                        R$ {(budget.allocated - budget.spent).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-purple-500">Transações Recentes</h2>
              <p className="text-gray-400">Histórico de entradas e saídas</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Transação
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-2 border-purple-500">
                <DialogHeader>
                  <DialogTitle className="text-purple-500">Adicionar Transação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Descrição</Label>
                    <Input
                      className="bg-black border-2 border-purple-500/30 text-white focus:border-purple-500"
                      placeholder="Ex: Compra no supermercado"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Valor (R$)</Label>
                    <Input
                      className="bg-black border-2 border-purple-500/30 text-white focus:border-purple-500"
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Categoria</Label>
                    <Select>
                      <SelectTrigger className="bg-black border-2 border-purple-500/30 text-white focus:border-purple-500">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-2 border-purple-500">
                        {budgets.map((budget) => (
                          <SelectItem
                            key={budget.id}
                            value={budget.category}
                            className="text-white hover:bg-purple-500/20"
                          >
                            {budget.icon} {budget.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Tipo</Label>
                    <Select>
                      <SelectTrigger className="bg-black border-2 border-purple-500/30 text-white focus:border-purple-500">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-2 border-purple-500">
                        <SelectItem value="income" className="text-white hover:bg-purple-500/20">
                          Receita
                        </SelectItem>
                        <SelectItem value="expense" className="text-white hover:bg-purple-500/20">
                          Despesa
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">Adicionar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-black border-2 border-purple-500/30">
            <CardContent className="p-6">
              <div className="space-y-4">
                {transactionList.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-black rounded-lg border-2 border-purple-500/30 hover:border-purple-500 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full border-2 ${
                          transaction.type === "income"
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-purple-500 bg-purple-500/10"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="h-5 w-5 text-purple-500" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-purple-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{transaction.description}</p>
                        <p className="text-sm text-gray-400">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === "income" ? "text-purple-500" : "text-purple-400"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}R$ {Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">{new Date(transaction.date).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
