"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { InventoryTable } from "@/components/inventory-table"
import { InventoryFormDialog } from "@/components/inventory-form-dialog"
import { InventoryViewDialog } from "@/components/inventory-view-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Download, Filter, Package, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { MOCK_INVENTORY, getInventoryStats } from "@/lib/inventory-data"
import type { InventoryItem } from "@/lib/types"

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(MOCK_INVENTORY)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const stats = getInventoryStats(items)

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      const matchesStatus = statusFilter === "all" || item.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [items, searchQuery, categoryFilter, statusFilter])

  const handleAdd = () => {
    setSelectedItem(null)
    setIsFormOpen(true)
  }

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsFormOpen(true)
  }

  const handleView = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsViewOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const handleSave = (formData: Omit<InventoryItem, "id" | "lastUpdated" | "status">) => {
    const quantity = formData.quantity
    const minQuantity = formData.minQuantity
    let status: InventoryItem["status"] = "in-stock"
    if (quantity === 0) status = "out-of-stock"
    else if (quantity <= minQuantity) status = "low-stock"

    if (selectedItem) {
      setItems(
        items.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                status,
                lastUpdated: new Date(),
              }
            : item,
        ),
      )
    } else {
      const newItem: InventoryItem = {
        ...formData,
        id: Date.now().toString(),
        status,
        lastUpdated: new Date(),
      }
      setItems([...items, newItem])
    }
  }

  const handleExport = () => {
    const headers = ["Nome", "Categoria", "Quantidade", "Qtd Mínima", "Localização", "Fornecedor", "Preço", "Status"]
    const csvData = [
      headers.join(","),
      ...filteredItems.map((item) =>
        [
          item.name,
          item.category,
          item.quantity,
          item.minQuantity,
          item.location,
          item.supplier,
          item.price,
          item.status,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `inventario-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Gestão de Inventário</h1>
            <p className="text-muted-foreground mt-2">Gerencie e acompanhe todos os itens do estoque de TI</p>
          </div>
          <Button onClick={handleAdd} className="shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Item
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Itens</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Em Estoque</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.inStock}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Estoque Baixo</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{stats.lowStock}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Sem Estoque</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.outOfStock}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                R$ {stats.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, fornecedor ou localização..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-background/50">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Accessories">Acessórios</SelectItem>
                  <SelectItem value="Networking">Rede</SelectItem>
                  <SelectItem value="Other">Outros</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-background/50">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="in-stock">Em Estoque</SelectItem>
                  <SelectItem value="low-stock">Estoque Baixo</SelectItem>
                  <SelectItem value="out-of-stock">Sem Estoque</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExport} className="bg-background/50">
                <Download className="mr-2 h-4 w-4" />
                Exportar CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <InventoryTable items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

        <InventoryFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} item={selectedItem} onSave={handleSave} />
        <InventoryViewDialog open={isViewOpen} onOpenChange={setIsViewOpen} item={selectedItem} />
      </div>
    </DashboardLayout>
  )
}
