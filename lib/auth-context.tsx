"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getDB } from "./db-service"
import type { User } from "./db-service"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>
  register: (name: string, email: string, password: string, phone: string, department: string) => Promise<{
    success: boolean
    error?: string
  }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const db = getDB()

  useEffect(() => {
    const initAuth = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUserId = localStorage.getItem("yomi_user_id")
          if (storedUserId) {
            const storedUser = db.getUserById(storedUserId)
            if (storedUser) {
              setUser(storedUser)
            } else {
              localStorage.removeItem("yomi_user_id")
            }
          }
        }
      } catch (error) {
        console.error("[Auth] Error initializing:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    try {
      const foundUser = db.getUserByEmail(email)

      if (!foundUser) {
        throw new Error("Email ou senha inválidos")
      }

      if (foundUser.password !== password) {
        throw new Error("Email ou senha inválidos")
      }

      if (!foundUser.isActive) {
        throw new Error("Conta desativada")
      }

      const updatedUser = db.updateUser(foundUser.id, {
        lastLogin: new Date().toISOString(),
      })

      if (typeof window !== "undefined") {
        localStorage.setItem("yomi_user_id", updatedUser.id)
        if (rememberMe) {
          localStorage.setItem("yomi_remember_me", "true")
        }
      }

      setUser(updatedUser)

      db.logActivity({
        userId: updatedUser.id,
        action: "LOGIN",
        resource: "AUTH",
        resourceId: updatedUser.id,
        details: { email },
      })

      return true
    } catch (error) {
      console.error("[Auth] Login error:", error)
      throw error
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    department: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!name || !email || !password) {
        return { success: false, error: "Nome, email e senha são obrigatórios" }
      }

      if (password.length < 6) {
        return { success: false, error: "Senha deve ter pelo menos 6 caracteres" }
      }

      if (db.getUserByEmail(email)) {
        return { success: false, error: "Email já cadastrado" }
      }

      const newUser = db.createUser({
        email,
        password,
        name,
        phone,
        department,
      })

      if (typeof window !== "undefined") {
        localStorage.setItem("yomi_user_id", newUser.id)
      }

      setUser(newUser)

      db.logActivity({
        userId: newUser.id,
        action: "REGISTER",
        resource: "AUTH",
        resourceId: newUser.id,
        details: { email, name },
      })

      return { success: true }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao cadastrar"
      return { success: false, error: message }
    }
  }

  const logout = () => {
    if (user) {
      db.logActivity({
        userId: user.id,
        action: "LOGOUT",
        resource: "AUTH",
        resourceId: user.id,
      })
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem("yomi_user_id")
      localStorage.removeItem("yomi_remember_me")
    }

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}
