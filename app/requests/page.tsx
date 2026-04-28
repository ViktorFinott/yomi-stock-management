"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { RequestCard } from "@/components/request-card"
import { RequestFormDialog } from "@/components/request-form-dialog"
import { RequestViewDialog } from "@/components/request-view-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { MOCK_REQUESTS } from "@/lib/request-data"
import type { Request, RequestStatus } from "@/lib/request-types"
import { useAuth } from "@/lib/auth-context"

export default function RequestsPage() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<Request[]>(MOCK_REQUESTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [activeTab, setActiveTab] = useState<RequestStatus | "all">("all")

  const canManage = user?.role === "admin" || user?.role === "manager"

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = typeFilter === "all" || request.type === typeFilter
      const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
      const matchesTab = activeTab === "all" || request.status === activeTab

      return matchesSearch && matchesType && matchesPriority && matchesTab
    })
  }, [requests, searchQuery, typeFilter, priorityFilter, activeTab])

  const stats = {
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    completed: requests.filter((r) => r.status === "completed").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  }

  const handleView = (request: Request) => {
    setSelectedRequest(request)
    setIsViewOpen(true)
  }

  const handleEdit = (request: Request) => {
    // Edit functionality can be added here
    console.log("Edit request:", request)
  }

  const handleSave = (formData: Omit<Request, "id" | "createdAt" | "updatedAt" | "status">) => {
    const newRequest: Request = {
      ...formData,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setRequests([newRequest, ...requests])
  }

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "approved",
              updatedAt: new Date(),
              assignedTo: user?.name,
            }
          : req,
      ),
    )
  }

  const handleReject = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "rejected",
              updatedAt: new Date(),
              assignedTo: user?.name,
            }
          : req,
      ),
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Request Management</h1>
            <p className="text-muted-foreground mt-2">Submit and track inventory and support requests</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">No requests found</CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onView={handleView}
                    onEdit={handleEdit}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    canManage={canManage}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <RequestFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} onSave={handleSave} />
        <RequestViewDialog open={isViewOpen} onOpenChange={setIsViewOpen} request={selectedRequest} />
      </div>
    </DashboardLayout>
  )
}
