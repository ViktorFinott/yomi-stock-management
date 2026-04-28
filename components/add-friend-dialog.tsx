"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, UserPlus } from "lucide-react"
import { useAuth, type User } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AddFriendDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSendRequest: (friendEmail: string) => void
  existingFriends: string[]
}

export function AddFriendDialog({ open, onOpenChange, onSendRequest, existingFriends }: AddFriendDialogProps) {
  const { user } = useAuth()
  const [searchEmail, setSearchEmail] = useState("")
  const [searchResult, setSearchResult] = useState<User | null>(null)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = () => {
    setError("")
    setSearchResult(null)
    setSearching(true)

    try {
      const storedUsers = localStorage.getItem("yomi_registered_users")
      if (!storedUsers) {
        setError("Nenhum usuário encontrado")
        setSearching(false)
        return
      }

      const users = JSON.parse(storedUsers)
      const foundUser = users.find(
        (u: User & { password: string }) => u.email.toLowerCase() === searchEmail.toLowerCase(),
      )

      if (!foundUser) {
        setError("Usuário não encontrado com este email")
      } else if (foundUser.email === user?.email) {
        setError("Você não pode adicionar a si mesmo")
      } else if (existingFriends.includes(foundUser.id)) {
        setError("Este usuário já é seu amigo")
      } else {
        const { password, ...userWithoutPassword } = foundUser
        setSearchResult(userWithoutPassword)
      }
    } catch (err) {
      setError("Erro ao buscar usuário")
    } finally {
      setSearching(false)
    }
  }

  const handleSendRequest = () => {
    if (searchResult) {
      onSendRequest(searchResult.email)
      setSearchEmail("")
      setSearchResult(null)
      setError("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-primary">Adicionar Amigo</DialogTitle>
          <DialogDescription>Busque um usuário pelo email cadastrado</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email do Usuário</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="usuario@email.com"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-primary/30 focus:border-primary"
              />
              <Button
                onClick={handleSearch}
                disabled={!searchEmail || searching}
                className="bg-primary hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {searchResult && (
            <div className="p-4 bg-muted/30 rounded-lg border-2 border-primary/20">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary/50">
                  {searchResult.avatar && (
                    <AvatarImage src={searchResult.avatar || "/placeholder.svg"} alt={searchResult.name} />
                  )}
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {searchResult.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{searchResult.name}</p>
                  <p className="text-sm text-muted-foreground">{searchResult.email}</p>
                  {searchResult.department && (
                    <p className="text-xs text-muted-foreground">{searchResult.department}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-primary/30">
            Cancelar
          </Button>
          <Button onClick={handleSendRequest} disabled={!searchResult} className="bg-primary hover:bg-primary/90">
            <UserPlus className="h-4 w-4 mr-2" />
            Enviar Solicitação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
