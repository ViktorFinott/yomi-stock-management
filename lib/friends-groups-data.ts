import type { Friend, Group, FriendRequest } from "./friends-groups-types"

export const MOCK_FRIENDS: Friend[] = []
export const MOCK_GROUPS: Group[] = []
export const MOCK_FRIEND_REQUESTS: FriendRequest[] = []

export function getFriendsByUserId(friends: Friend[], userId: string): Friend[] {
  return friends.filter((f) => (f.userId === userId || f.friendId === userId) && f.status === "accepted")
}

export function getGroupsByUserId(groups: Group[], userId: string): Group[] {
  return groups.filter((g) => g.members.includes(userId))
}

export function getPendingFriendRequests(requests: FriendRequest[], userId: string): FriendRequest[] {
  return requests.filter((r) => r.toUserId === userId && r.status === "pending")
}
