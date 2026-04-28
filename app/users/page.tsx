"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, UserPlus, Shield, UsersIcon, Search, Mail, Phone, Building } from "lucide-react"
import { UserFormDialog } from "@/components/user-form-dialog"
import { useToast } from "@/hooks/use-toast"
import { useAuth, type UserRole, type User } from "@/lib/auth-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function UsersPage() {
  const { user: currentUser } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  useEffect(() => {
    const storedUsers = localStorage.getItem("yomi_registered_users")
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers)
      const usersWithoutPassword = parsedUsers.map(({ password, ...user }: User & { password: string }) => user)
      setUsers(usersWithoutPassword)
    }
  }, [])

  const handleAddUser = (userData: {
    name: string
    email: string
    password: string
    role: UserRole
    department: string
  }) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department,
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)

    const storedUsers = localStorage.getItem("yomi_registered_users")
    const allUsers = storedUsers ? JSON.parse(storedUsers) : []
    allUsers.push({ ...newUser, password: userData.password })
    localStorage.setItem("yomi_registered_users", JSON.stringify(allUsers))

    toast({
      title: "Usuário cadastrado",
      description: `${userData.name} foi adicionado à equipe com sucesso.`,
    })
  }

  const handleEditUser = (userData: {
    name: string
    email: string
    password: string
    role: UserRole
    department: string
  }) => {
    if (!editingUser) return

    const updatedUsers = users.map((u) =>
      u.id === editingUser.id
        ? {
            ...u,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            department: userData.department,
          }
        : u,
    )

    setUsers(updatedUsers)

    const storedUsers = localStorage.getItem("yomi_registered_users")
    if (storedUsers) {
      const allUsers = JSON.parse(storedUsers)
      const updatedAllUsers = allUsers.map((u: User & { password: string }) =>
        u.id === editingUser.id
          ? {
              ...u,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              department: userData.department,
              password: userData.password || u.password,
            }
          : u,
      )
      localStorage.setItem("yomi_registered_users", JSON.stringify(updatedAllUsers))
    }

    toast({
      title: "Usuário atualizado",
      description: `As informações de ${userData.name} foram atualizadas.`,
    })
    setEditingUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!userToDelete) return

    const user = users.find((u) => u.id === userToDelete)
    const updatedUsers = users.filter((u) => u.id !== userToDelete)
    setUsers(updatedUsers)

    const storedUsers = localStorage.getItem("yomi_registered_users")
    if (storedUsers) {
      const allUsers = JSON.parse(storedUsers)
      const updatedAllUsers = allUsers.filter((u: User) => u.id !== userToDelete)
      localStorage.setItem("yomi_registered_users", JSON.stringify(updatedAllUsers))
    }

    toast({
      title: "Usuário removido",
      description: `${user?.name} foi removido da equipe.`,
      variant: "destructive",
    })

    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-primary/20 text-primary border-primary/30"
      case "manager":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-muted text-muted-foreground border-border/30"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "manager":
        return "Gerente"
      default:
        return "Usuário"
    }
  }

  const isAdmin = currentUser?.role === "admin"

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const usersByDepartment = filteredUsers.reduce(
    (acc, user) => {
      const dept = user.department || "Sem Departamento"
      if (!acc[dept]) acc[dept] = []
      acc[dept].push(user)
      return acc
    },
    {} as Record<string, User[]>,
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Equipe Completa</h1>
            <p className="text-muted-foreground mt-2">Visualize e gerencie todos os membros da sua equipe</p>
          </div>
          {isAdmin && (
            <Button onClick={() => setDialogOpen(true)} className="bg-primary hover:bg-primary/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Membro
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-2 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total da Equipe</CardTitle>
              <UsersIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{users.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Membros cadastrados</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{users.filter((u) => u.role === "admin").length}</div>
              <p className="text-xs text-muted-foreground mt-1">Com acesso total</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
              <Building className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{Object.keys(usersByDepartment).length}</div>
              <p className="text-xs text-muted-foreground mt-1">Áreas diferentes</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Membros da Equipe</CardTitle>
                <CardDescription>Todos os membros organizados por departamento</CardDescription>
              </div>
              <div className="w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou departamento..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-primary/30 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(usersByDepartment).map(([department, deptUsers]) => (
              <div key={department} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-primary">{department}</h3>
                  <Badge variant="outline" className="border-primary/30">
                    {deptUsers.length} {deptUsers.length === 1 ? "membro" : "membros"}
                  </Badge>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {deptUsers.map((user) => (
                    <Card
                      key={user.id}
                      className="border-2 border-primary/20 hover:border-primary/40 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-primary/50">
                              {user.avatar && <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />}
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <Badge variant="outline" className={getRoleBadgeColor(user.role)} size="sm">
                                {getRoleLabel(user.role)}
                              </Badge>
                            </div>
                          </div>
                          {isAdmin && user.id !== currentUser?.id && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingUser(user)
                                  setDialogOpen(true)
                                }}
                                className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteUser(user.id)}
                                className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <UserFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingUser(null)
        }}
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        editUser={editingUser}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-2 border-primary/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este membro da equipe? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-primary/30">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
