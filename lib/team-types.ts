export interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "member"
  department?: string
  permissions: {
    inventory: boolean
    calendar: boolean
    finance: boolean
    requests: boolean
    communication: boolean
  }
  joinedDate: string
  status: "active" | "inactive" | "pending"
}

export interface Team {
  id: string
  name: string
  members: TeamMember[]
  createdBy: string
  createdDate: string
}
