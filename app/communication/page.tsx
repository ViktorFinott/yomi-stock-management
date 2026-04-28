"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ChannelList } from "@/components/channel-list"
import { TeamMemberList } from "@/components/team-member-list"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Phone, Video, Settings, Users, Trash2 } from "lucide-react"
import { MOCK_CHANNELS, MOCK_MESSAGES, MOCK_TEAM_MEMBERS } from "@/lib/communication-data"
import type { Channel, Message } from "@/lib/communication-types"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function CommunicationPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS)
  const [activeChannelId, setActiveChannelId] = useState(channels[0]?.id || "1")
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES)
  const [teamMembers] = useState(MOCK_TEAM_MEMBERS)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeChannel = channels.find((c) => c.id === activeChannelId)
  const channelMessages = messages[activeChannelId] || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [channelMessages])

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || "1",
      senderName: user?.name || "Desconhecido",
      content,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMessage],
    }))

    setChannels((prev) =>
      prev.map((channel) => (channel.id === activeChannelId ? { ...channel, unreadCount: 0 } : channel)),
    )
  }

  const handleChannelSelect = (channelId: string) => {
    setActiveChannelId(channelId)
    setChannels((prev) => prev.map((channel) => (channel.id === channelId ? { ...channel, unreadCount: 0 } : channel)))
  }

  const handleDeleteChannel = () => {
    if (user?.role !== "admin") {
      toast({
        title: "Acesso negado",
        description: "Apenas administradores podem excluir canais.",
        variant: "destructive",
      })
      return
    }

    if (confirm(`Tem certeza que deseja excluir o canal #${activeChannel?.name}?`)) {
      setChannels((prev) => prev.filter((c) => c.id !== activeChannelId))
      setMessages((prev) => {
        const newMessages = { ...prev }
        delete newMessages[activeChannelId]
        return newMessages
      })

      const remainingChannels = channels.filter((c) => c.id !== activeChannelId)
      if (remainingChannels.length > 0) {
        setActiveChannelId(remainingChannels[0].id)
      }

      toast({
        title: "Canal excluído",
        description: `O canal #${activeChannel?.name} foi excluído com sucesso.`,
      })
    }
  }

  const handleVoiceCall = () => {
    toast({
      title: "Chamada de voz",
      description: "Iniciando chamada de voz com os membros do canal...",
    })
  }

  const handleVideoCall = () => {
    toast({
      title: "Chamada de vídeo",
      description: "Iniciando chamada de vídeo com os membros do canal...",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Comunicação da Equipe</h1>
          <p className="text-muted-foreground mt-2">Converse com sua equipe e colabore em tempo real</p>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-16rem)]">
          <Card className="col-span-3 flex flex-col border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Canais</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex-1 overflow-y-auto p-2">
              <ChannelList
                channels={channels}
                activeChannelId={activeChannelId}
                onChannelSelect={handleChannelSelect}
              />
            </CardContent>
          </Card>

          <Card className="col-span-6 flex flex-col border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">#{activeChannel?.name}</CardTitle>
                  {activeChannel?.description && (
                    <p className="text-sm text-muted-foreground mt-1">{activeChannel.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleVoiceCall}>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleVideoCall}>
                    <Video className="h-4 w-4" />
                  </Button>
                  {user?.role === "admin" && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDeleteChannel}
                      className="text-destructive bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Separator />

            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {channelMessages.map((message) => (
                  <ChatMessage key={message.id} message={message} isCurrentUser={message.senderId === user?.id} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <ChatInput onSendMessage={handleSendMessage} />
          </Card>

          <Card className="col-span-3 flex flex-col border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Equipe</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="flex-1 overflow-y-auto p-2">
              <TeamMemberList members={teamMembers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
