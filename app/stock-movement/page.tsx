"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MovementFormDialog } from "@/components/movement-form-dialog"
import { MOCK_MOVEMENTS, getMovementStats } from "@/lib/stock-movement-data"
import { MOCK_INVENTORY } from "@/lib/inventory-data"
import type { StockMovement } from "@/lib/stock-movement-types"
import {
  Plus,
  Search,
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  Calendar,
  User,
  FileText,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Download,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export default function StockMovementPage() {
  const { toast } = useToast()
  const [movements, setMovements] = useState<StockMovement[]>(MOCK_MOVEMENTS)
  const [inventory] = useState(MOCK_INVENTORY)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "entrada" | "saida">("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMovement, setEditingMovement] = useState<StockMovement | null>(null)

  const stats = useMemo(() => getMovementStats(movements), [movements])

  const filteredMovements = useMemo(() => {
    return movements
      .filter((m) => {
        const matchesSearch =
          m.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = filterType === "all" || m.type === filterType
        return matchesSearch && matchesType
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }, [movements, searchTerm, filterType])

  const entries = filteredMovements.filter((m) => m.type === "entrada")
  const exits = filteredMovements.filter((m) => m.type === "saida")

  const handleSave = (movementData: Omit<StockMovement, "id" | "createdAt">) => {
    if (editingMovement) {
      setMovements((prev) => prev.map((m) => (m.id === editingMovement.id ? { ...m, ...movementData } : m)))
      toast({ title: "Movimentação atualizada com sucesso!" })
    } else {
      const newMovement: StockMovement = {
        ...movementData,
        id: Date.now().toString(),
        createdAt: new Date(),
      }
      setMovements((prev) => [newMovement, ...prev])
      toast({ title: `${movementData.type === "entrada" ? "Entrada" : "Saída"} registrada com sucesso!` })
    }
    setEditingMovement(null)
  }

  const handleEdit = (movement: StockMovement) => {
    setEditingMovement(movement)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setMovements((prev) => prev.filter((m) => m.id !== id))
    toast({ title: "Movimentação excluída com sucesso!" })
  }

  const handleExport = () => {
    const csv = [
      "Tipo,Produto,Quantidade,Data,Responsável,Fornecedor/Destino,Nota Fiscal,Preço Unit.,Observações",
      ...movements.map((m) =>
        [
          m.type,
          m.productName,
          m.quantity,
          m.type === "entrada" ? m.entryDate?.toLocaleDateString() : m.exitDate?.toLocaleDateString(),
          m.responsible,
          m.type === "entrada" ? m.supplier : m.destination,
          m.invoiceNumber || "",
          m.unitPrice || "",
          m.notes || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `movimentacoes-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    toast({ title: "Relatório exportado com sucesso!" })
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "-"
    return date.toLocaleDateString("pt-BR")
  }

  const formatCurrency = (value: number | undefined) => {
    if (!value) return "-"
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  const MovementCard = ({ movement }: { movement: StockMovement }) => (
    <div className="group p-4 bg-zinc-900/50 border border-white/10 rounded-lg hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`p-2 rounded-lg ${
              movement.type === "entrada" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            }`}
          >
            {movement.type === "entrada" ? (
              <ArrowDownCircle className="h-5 w-5" />
            ) : (
              <ArrowUpCircle className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold truncate">{movement.productName}</h4>
              <Badge variant={movement.type === "entrada" ? "default" : "destructive"} className="text-xs">
                {movement.type === "entrada" ? `+${movement.quantity}` : `-${movement.quantity}`}
              </Badge>
            </div>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(movement.type === "entrada" ? movement.entryDate : movement.exitDate)}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {movement.responsible}
              </div>
              {movement.invoiceNumber && (
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {movement.invoiceNumber}
                </div>
              )}
              {movement.unitPrice && (
                <div className="flex items-center gap-1">{formatCurrency(movement.unitPrice * movement.quantity)}</div>
              )}
            </div>
            {(movement.supplier || movement.destination || movement.notes) && (
              <p className="mt-2 text-xs text-muted-foreground/70 truncate">
                {movement.type === "entrada" && movement.supplier && `Fornecedor: ${movement.supplier}`}
                {movement.type === "saida" && movement.destination && `Destino: ${movement.destination}`}
                {movement.notes && ` • ${movement.notes}`}
              </p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-white/10">
            <DropdownMenuItem onClick={() => handleEdit(movement)}>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(movement.id)} className="text-red-500">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Entrada e Saída</h1>
            <p className="text-muted-foreground">Controle de movimentações do estoque</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} className="border-white/10 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={() => setDialogOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Movimentação
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Total Entradas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">{stats.totalEntries}</p>
              <p className="text-xs text-muted-foreground">{stats.entriesThisMonth} este mês</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                Total Saídas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-500">{stats.totalExits}</p>
              <p className="text-xs text-muted-foreground">{stats.exitsThisMonth} este mês</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <ArrowDownCircle className="h-4 w-4 text-green-500" />
                Valor Entradas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalValueIn)}</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <ArrowUpCircle className="h-4 w-4 text-red-500" />
                Valor Saídas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalValueOut)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por produto, responsável ou nota fiscal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-zinc-900/50 border-white/10"
            />
          </div>
          <Select value={filterType} onValueChange={(v) => setFilterType(v as "all" | "entrada" | "saida")}>
            <SelectTrigger className="w-[180px] bg-zinc-900/50 border-white/10">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/10">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="entrada">Entradas</SelectItem>
              <SelectItem value="saida">Saídas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Movements List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-zinc-900/50 border border-white/10">
            <TabsTrigger value="all">Todos ({filteredMovements.length})</TabsTrigger>
            <TabsTrigger value="entrada" className="data-[state=active]:text-green-500">
              Entradas ({entries.length})
            </TabsTrigger>
            <TabsTrigger value="saida" className="data-[state=active]:text-red-500">
              Saídas ({exits.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {filteredMovements.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma movimentação encontrada</p>
              </div>
            ) : (
              filteredMovements.map((movement) => <MovementCard key={movement.id} movement={movement} />)
            )}
          </TabsContent>

          <TabsContent value="entrada" className="space-y-3">
            {entries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ArrowDownCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma entrada encontrada</p>
              </div>
            ) : (
              entries.map((movement) => <MovementCard key={movement.id} movement={movement} />)
            )}
          </TabsContent>

          <TabsContent value="saida" className="space-y-3">
            {exits.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ArrowUpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma saída encontrada</p>
              </div>
            ) : (
              exits.map((movement) => <MovementCard key={movement.id} movement={movement} />)
            )}
          </TabsContent>
        </Tabs>
      </div>

      <MovementFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingMovement(null)
        }}
        movement={editingMovement}
        products={inventory}
        onSave={handleSave}
      />
    </DashboardLayout>
  )
}
