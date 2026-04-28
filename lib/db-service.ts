// Database Service - In-Memory Database for 500 Users
// Supports full CRUD operations with persistent storage

export interface User {
  id: string
  email: string
  password: string
  name: string
  phone?: string
  department?: string
  createdAt: string
  lastLogin?: string
  isActive: boolean
  twoFactorEnabled: boolean
  twoFactorSecret?: string
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minimumQuantity: number
  price: number
  lastUpdated: string
  userId: string
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  timestamp: string
  details?: Record<string, unknown>
}

export interface Notification {
  id: string
  userId: string
  type: "info" | "warning" | "error" | "success"
  title: string
  message: string
  read: boolean
  createdAt: string
}

class DatabaseService {
  private users: Map<string, User> = new Map()
  private inventoryItems: Map<string, InventoryItem> = new Map()
  private activityLogs: Map<string, ActivityLog> = new Map()
  private notifications: Map<string, Notification> = new Map()
  private readonly MAX_USERS = 500
  private readonly STORAGE_KEY = "yomi_db_v1"

  constructor() {
    this.loadFromStorage()
    this.initializeDefaultUser()
  }

  private initializeDefaultUser() {
    // Create default admin user if no users exist
    if (this.users.size === 0) {
      try {
        this.createUser({
          email: "admin@yomi.com",
          password: "admin123",
          name: "Administrador",
          phone: "(11) 99999-9999",
          department: "TI",
        })
      } catch (error) {
        console.error("[DB] Error creating default user:", error)
      }
    }
  }

  // Storage Methods
  private loadFromStorage() {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(this.STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored)
          this.users = new Map(Object.entries(data.users || {}))
          this.inventoryItems = new Map(Object.entries(data.inventoryItems || {}))
          this.activityLogs = new Map(Object.entries(data.activityLogs || {}))
          this.notifications = new Map(Object.entries(data.notifications || {}))
        }
      }
    } catch (error) {
      console.error("[DB] Error loading from storage:", error)
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== "undefined") {
        const data = {
          users: Object.fromEntries(this.users),
          inventoryItems: Object.fromEntries(this.inventoryItems),
          activityLogs: Object.fromEntries(this.activityLogs),
          notifications: Object.fromEntries(this.notifications),
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
      }
    } catch (error) {
      console.error("[DB] Error saving to storage:", error)
    }
  }

  // User Methods
  createUser(user: Omit<User, "id" | "createdAt" | "isActive" | "twoFactorEnabled">) {
    if (this.users.size >= this.MAX_USERS) {
      throw new Error(`Maximum users limit (${this.MAX_USERS}) reached`)
    }

    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newUser: User = {
      ...user,
      id,
      createdAt: new Date().toISOString(),
      isActive: true,
      twoFactorEnabled: false,
    }

    this.users.set(id, newUser)
    this.saveToStorage()
    return newUser
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((u) => u.email === email)
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id)
  }

  updateUser(id: string, updates: Partial<User>): User {
    const user = this.users.get(id)
    if (!user) throw new Error("User not found")

    const updated = { ...user, ...updates }
    this.users.set(id, updated)
    this.saveToStorage()
    return updated
  }

  deleteUser(id: string): boolean {
    const deleted = this.users.delete(id)
    if (deleted) this.saveToStorage()
    return deleted
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }

  // Inventory Methods
  createInventoryItem(item: Omit<InventoryItem, "id" | "lastUpdated">): InventoryItem {
    const id = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newItem: InventoryItem = {
      ...item,
      id,
      lastUpdated: new Date().toISOString(),
    }

    this.inventoryItems.set(id, newItem)
    this.saveToStorage()
    return newItem
  }

  getInventoryItem(id: string): InventoryItem | undefined {
    return this.inventoryItems.get(id)
  }

  getInventoryByUser(userId: string): InventoryItem[] {
    return Array.from(this.inventoryItems.values()).filter((item) => item.userId === userId)
  }

  updateInventoryItem(id: string, updates: Partial<InventoryItem>): InventoryItem {
    const item = this.inventoryItems.get(id)
    if (!item) throw new Error("Inventory item not found")

    const updated = {
      ...item,
      ...updates,
      lastUpdated: new Date().toISOString(),
    }
    this.inventoryItems.set(id, updated)
    this.saveToStorage()
    return updated
  }

  deleteInventoryItem(id: string): boolean {
    const deleted = this.inventoryItems.delete(id)
    if (deleted) this.saveToStorage()
    return deleted
  }

  getAllInventory(): InventoryItem[] {
    return Array.from(this.inventoryItems.values())
  }

  // Activity Log Methods
  logActivity(log: Omit<ActivityLog, "id" | "timestamp">): ActivityLog {
    const id = `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newLog: ActivityLog = {
      ...log,
      id,
      timestamp: new Date().toISOString(),
    }

    this.activityLogs.set(id, newLog)
    this.saveToStorage()
    return newLog
  }

  getActivityLogsByUser(userId: string, limit = 50): ActivityLog[] {
    return Array.from(this.activityLogs.values())
      .filter((log) => log.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }

  getAllActivityLogs(limit = 100): ActivityLog[] {
    return Array.from(this.activityLogs.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }

  // Notification Methods
  createNotification(notification: Omit<Notification, "id" | "createdAt">): Notification {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newNotif: Notification = {
      ...notification,
      id,
      createdAt: new Date().toISOString(),
    }

    this.notifications.set(id, newNotif)
    this.saveToStorage()
    return newNotif
  }

  getNotificationsByUser(userId: string, unreadOnly = false): Notification[] {
    return Array.from(this.notifications.values())
      .filter((n) => n.userId === userId && (!unreadOnly || !n.read))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  markNotificationAsRead(id: string): Notification {
    const notif = this.notifications.get(id)
    if (!notif) throw new Error("Notification not found")

    const updated = { ...notif, read: true }
    this.notifications.set(id, updated)
    this.saveToStorage()
    return updated
  }

  // Statistics Methods
  getStats() {
    return {
      totalUsers: this.users.size,
      totalInventoryItems: this.inventoryItems.size,
      totalActivityLogs: this.activityLogs.size,
      totalNotifications: this.notifications.size,
      unreadNotifications: Array.from(this.notifications.values()).filter((n) => !n.read).length,
      maxCapacity: this.MAX_USERS,
    }
  }

  // Export/Import Methods
  exportData() {
    return {
      users: Array.from(this.users.values()),
      inventoryItems: Array.from(this.inventoryItems.values()),
      activityLogs: Array.from(this.activityLogs.values()),
      notifications: Array.from(this.notifications.values()),
      exportDate: new Date().toISOString(),
    }
  }

  importData(data: {
    users?: User[]
    inventoryItems?: InventoryItem[]
    activityLogs?: ActivityLog[]
    notifications?: Notification[]
  }) {
    if (data.users && data.users.length <= this.MAX_USERS) {
      this.users.clear()
      data.users.forEach((user) => this.users.set(user.id, user))
    }

    if (data.inventoryItems) {
      this.inventoryItems.clear()
      data.inventoryItems.forEach((item) => this.inventoryItems.set(item.id, item))
    }

    if (data.activityLogs) {
      this.activityLogs.clear()
      data.activityLogs.forEach((log) => this.activityLogs.set(log.id, log))
    }

    if (data.notifications) {
      this.notifications.clear()
      data.notifications.forEach((notif) => this.notifications.set(notif.id, notif))
    }

    this.saveToStorage()
  }

  // Clear all data
  clearAll() {
    this.users.clear()
    this.inventoryItems.clear()
    this.activityLogs.clear()
    this.notifications.clear()
    this.saveToStorage()
  }
}

// Singleton instance
let dbInstance: DatabaseService

export function getDB(): DatabaseService {
  if (!dbInstance) {
    dbInstance = new DatabaseService()
  }
  return dbInstance
}
