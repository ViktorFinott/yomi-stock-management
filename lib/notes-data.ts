export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  userId: string
  userName: string
  priority: "low" | "medium" | "high"
  completed: boolean
}

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "Verificar estoque de notebooks",
    content: "Precisamos verificar o estoque de notebooks Dell e fazer um novo pedido se necessário.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    userId: "1",
    userName: "Viktor Cesar",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Atualizar sistema de inventário",
    content: "Implementar melhorias no sistema de busca e filtros do inventário.",
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
    userId: "1",
    userName: "Viktor Cesar",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Reunião com fornecedores",
    content: "Agendar reunião com fornecedores para negociar preços de hardware.",
    createdAt: "2024-01-13T09:00:00Z",
    updatedAt: "2024-01-13T09:00:00Z",
    userId: "1",
    userName: "Viktor Cesar",
    priority: "low",
    completed: true,
  },
]
