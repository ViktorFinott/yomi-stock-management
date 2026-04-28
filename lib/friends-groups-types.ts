export interface Friend {
  id: string
  userId: string
  friendId: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export interface Group {
  id: string
  name: string
  description?: string
  createdBy: string
  members: string[] // user ids
  admins: string[] // user ids
  createdAt: string
  updatedAt: string
  color?: string
}

export interface FriendRequest {
  id: string
  fromUserId: string
  toUserId: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}
