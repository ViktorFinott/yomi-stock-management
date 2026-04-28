"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AddFriendDialog } from "@/components/add-friend-dialog"
import { CreateGroupDialog } from "@/components/create-group-dialog"
import { UserPlus, Users, Trash2, Mail, Check, X, Edit } from "lucide-react"
import type { Friend, Group, FriendRequest } from "@/lib/friends-groups-types"
import { useAuth, type User } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function FriendsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [friends, setFriends] = useState<Friend[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false)
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<Group | undefined>()
  const [allUsers, setAllUsers] = useState<(User & { password: string })[]>([])

  useEffect(() => {
    const storedFriends = localStorage.getItem("yomi_friends")
    const storedGroups = localStorage.getItem("yomi_groups")
    const storedRequests = localStorage.getItem("yomi_friend_requests")
    const storedUsers = localStorage.getItem("yomi_registered_users")

    if (storedFriends) setFriends(JSON.parse(storedFriends))
    if (storedGroups) setGroups(JSON.parse(storedGroups))
    if (storedRequests) setFriendRequests(JSON.parse(storedRequests))
    if (storedUsers) setAllUsers(JSON.parse(storedUsers))
  }, [])

  const getUserById = (userId: string): User | undefined => {
    const foundUser = allUsers.find((u) => u.id === userId)
    if (!foundUser) return undefined
    const { password, ...userWithoutPassword } = foundUser
    return userWithoutPassword
  }

  const myFriends = friends.filter((f) => (f.userId === user?.id || f.friendId === user?.id) && f.status === "accepted")

  const myFriendUsers = myFriends
    .map((f) => {
      const friendId = f.userId === user?.id ? f.friendId : f.userId
      return getUserById(friendId)
    })
    .filter((u): u is User => u !== undefined)

  const myGroups = groups.filter((g) => g.members.includes(user?.id || ""))

  const pendingRequests = friendRequests.filter((r) => r.toUserId === user?.id && r.status === "pending")

  const handleSendFriendRequest = (friendEmail: string) => {
    const friendUser = allUsers.find((u) => u.email.toLowerCase() === friendEmail.toLowerCase())
    if (!friendUser || !user) return

    const newRequest: FriendRequest = {
      id: Date.now().toString(),
      fromUserId: user.id,
      toUserId: friendUser.id,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    const updatedRequests = [...friendRequests, newRequest]
    setFriendRequests(updatedRequests)
    localStorage.setItem("yomi_friend_requests", JSON.stringify(updatedRequests))

    toast({
      title: "Solicitação enviada",
      description: `Solicitação de amizade enviada para ${friendUser.name}`,
    })
  }

  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find((r) => r.id === requestId)
    if (!request || !user) return

    const newFriend: Friend = {
      id: Date.now().toString(),
      userId: request.fromUserId,
      friendId: request.toUserId,
      status: "accepted",
      createdAt: new Date().toISOString(),
    }

    const updatedFriends = [...friends, newFriend]
    const updatedRequests = friendRequests.map((r) => (r.id === requestId ? { ...r, status: "accepted" as const } : r))

    setFriends(updatedFriends)
    setFriendRequests(updatedRequests)
    localStorage.setItem("yomi_friends", JSON.stringify(updatedFriends))
    localStorage.setItem("yomi_friend_requests", JSON.stringify(updatedRequests))

    const fromUser = getUserById(request.fromUserId)
    toast({
      title: "Solicitação aceita",
      description: `Você e ${fromUser?.name} agora são amigos`,
    })
  }

  const handleRejectRequest = (requestId: string) => {
    const updatedRequests = friendRequests.map((r) => (r.id === requestId ? { ...r, status: "rejected" as const } : r))
    setFriendRequests(updatedRequests)
    localStorage.setItem("yomi_friend_requests", JSON.stringify(updatedRequests))

    toast({
      title: "Solicitação rejeitada",
      variant: "destructive",
    })
  }

  const handleRemoveFriend = (friendId: string) => {
    const updatedFriends = friends.filter((f) => f.id !== friendId)
    setFriends(updatedFriends)
    localStorage.setItem("yomi_friends", JSON.stringify(updatedFriends))

    toast({
      title: "Amigo removido",
      variant: "destructive",
    })
  }

  const handleSaveGroup = (groupData: Omit<Group, "id" | "createdAt" | "updatedAt">) => {
    if (editingGroup) {
      const updatedGroups = groups.map((g) =>
        g.id === editingGroup.id
          ? {
              ...groupData,
              id: editingGroup.id,
              createdAt: editingGroup.createdAt,
              updatedAt: new Date().toISOString(),
            }
          : g,
      )
      setGroups(updatedGroups)
      localStorage.setItem("yomi_groups", JSON.stringify(updatedGroups))
      toast({
        title: "Grupo atualizado",
        description: "O grupo foi atualizado com sucesso",
      })
    } else {
      const newGroup: Group = {
        ...groupData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const updatedGroups = [...groups, newGroup]
      setGroups(updatedGroups)
      localStorage.setItem("yomi_groups", JSON.stringify(updatedGroups))
      toast({
        title: "Grupo criado",
        description: "O grupo foi criado com sucesso",
      })
    }
    setEditingGroup(undefined)
  }

  const handleDeleteGroup = (groupId: string) => {
    const updatedGroups = groups.filter((g) => g.id !== groupId)
    setGroups(updatedGroups)
    localStorage.setItem("yomi_groups", JSON.stringify(updatedGroups))

    toast({
      title: "Grupo excluído",
      variant: "destructive",
    })
  }

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group)
    setIsCreateGroupOpen(true)
  }

  const existingFriendIds = myFriends.map((f) => (f.userId === user?.id ? f.friendId : f.userId))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Amigos & Grupos</h1>
            <p className="text-muted-foreground">Gerencie suas conexões e grupos de trabalho</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddFriendOpen(true)} variant="outline" className="border-primary/30">
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Amigo
            </Button>
            <Button onClick={() => setIsCreateGroupOpen(true)} className="bg-primary hover:bg-primary/90">
              <Users className="h-4 w-4 mr-2" />
              Criar Grupo
            </Button>
          </div>
        </div>

        <Tabs defaultValue="friends" className="space-y-4">
          <TabsList className="border-2 border-primary/30">
            <TabsTrigger
              value="friends"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Amigos ({myFriendUsers.length})
            </TabsTrigger>
            <TabsTrigger
              value="groups"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="h-4 w-4 mr-2" />
              Grupos ({myGroups.length})
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Mail className="h-4 w-4 mr-2" />
              Solicitações ({pendingRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            {myFriendUsers.length === 0 ? (
              <Card className="border-2 border-primary/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Você ainda não tem amigos</p>
                  <Button onClick={() => setIsAddFriendOpen(true)} className="bg-primary hover:bg-primary/90">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Amigo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myFriendUsers.map((friend) => {
                  const friendRelation = myFriends.find((f) => f.userId === friend.id || f.friendId === friend.id)
                  return (
                    <Card
                      key={friend.id}
                      className="border-2 border-primary/30 hover:border-primary/50 transition-colors"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-primary/50">
                              {friend.avatar && (
                                <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                              )}
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {friend.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{friend.name}</CardTitle>
                              <p className="text-xs text-muted-foreground">{friend.email}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => friendRelation && handleRemoveFriend(friendRelation.id)}
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      {friend.department && (
                        <CardContent className="pt-0">
                          <Badge variant="outline" className="border-primary/30">
                            {friend.department}
                          </Badge>
                        </CardContent>
                      )}
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            {myGroups.length === 0 ? (
              <Card className="border-2 border-primary/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Você ainda não faz parte de nenhum grupo</p>
                  <Button onClick={() => setIsCreateGroupOpen(true)} className="bg-primary hover:bg-primary/90">
                    <Users className="h-4 w-4 mr-2" />
                    Criar Primeiro Grupo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myGroups.map((group) => {
                  const groupMembers = group.members
                    .map((memberId) => getUserById(memberId))
                    .filter((u): u is User => u !== undefined)
                  const isAdmin = group.admins.includes(user?.id || "")

                  return (
                    <Card
                      key={group.id}
                      className="border-2 border-primary/30 hover:border-primary/50 transition-colors"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-primary/50"
                              style={{ backgroundColor: group.color + "20" }}
                            >
                              <Users className="h-6 w-6" style={{ color: group.color }} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{group.name}</CardTitle>
                              <p className="text-xs text-muted-foreground">{groupMembers.length} membros</p>
                            </div>
                          </div>
                          {isAdmin && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditGroup(group)}
                                className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteGroup(group.id)}
                                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {group.description && <p className="text-sm text-muted-foreground mb-3">{group.description}</p>}
                        <div className="flex flex-wrap gap-2">
                          {groupMembers.slice(0, 5).map((member) => (
                            <Avatar key={member.id} className="h-8 w-8 border-2 border-primary/50">
                              {member.avatar && (
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              )}
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {groupMembers.length > 5 && (
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">
                              +{groupMembers.length - 5}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {pendingRequests.length === 0 ? (
              <Card className="border-2 border-primary/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma solicitação pendente</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((request) => {
                  const fromUser = getUserById(request.fromUserId)
                  if (!fromUser) return null

                  return (
                    <Card key={request.id} className="border-2 border-primary/30">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-primary/50">
                              {fromUser.avatar && (
                                <AvatarImage src={fromUser.avatar || "/placeholder.svg"} alt={fromUser.name} />
                              )}
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {fromUser.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{fromUser.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">quer ser seu amigo</p>
                              <p className="text-xs text-muted-foreground">{fromUser.email}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAcceptRequest(request.id)}
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Aceitar
                            </Button>
                            <Button
                              onClick={() => handleRejectRequest(request.id)}
                              size="sm"
                              variant="outline"
                              className="border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Rejeitar
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AddFriendDialog
        open={isAddFriendOpen}
        onOpenChange={setIsAddFriendOpen}
        onSendRequest={handleSendFriendRequest}
        existingFriends={existingFriendIds}
      />

      <CreateGroupDialog
        open={isCreateGroupOpen}
        onOpenChange={(open) => {
          setIsCreateGroupOpen(open)
          if (!open) setEditingGroup(undefined)
        }}
        onSave={handleSaveGroup}
        group={editingGroup}
        friends={myFriendUsers}
      />
    </DashboardLayout>
  )
}
