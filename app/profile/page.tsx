"use client"

import type React from "react"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, User, Mail, Phone, Building, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "",
    bio: user?.bio || "",
  })

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      ...formData,
      avatar: avatarPreview,
    })
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    })
  }

  const getRoleLabel = (role: string) => {
    const roles = {
      admin: "Administrador",
      manager: "Gerente",
      user: "Usuário",
    }
    return roles[role as keyof typeof roles] || role
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Editar Perfil</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais e preferências</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Avatar Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>Clique na foto para alterar</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-32 w-32">
                  {avatarPreview && <AvatarImage src={avatarPreview || "/placeholder.svg"} alt={formData.name} />}
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    {formData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="h-8 w-8 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="text-center">
                <p className="font-medium">{formData.name}</p>
                <p className="text-sm text-muted-foreground">{getRoleLabel(user?.role || "")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seus dados de perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="pl-10"
                      placeholder="Seu departamento"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="pl-10 min-h-[100px]"
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
