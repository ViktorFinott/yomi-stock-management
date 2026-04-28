"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Eye, EyeOff, Lock, Mail, ArrowRight, User, Phone, Building, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

export function LoginForm() {
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [department, setDepartment] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [rateLimitError, setRateLimitError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setRateLimitError("")
    setIsLoading(true)

    try {
      if (isRegisterMode) {
        const result = await register(name, email, password, phone, department)
        if (result.success) {
          router.push("/dashboard")
        } else {
          setError(result.error || "Erro ao cadastrar")
        }
      } else {
        try {
          const success = await login(email, password, rememberMe)
          if (success) {
            router.push("/dashboard")
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Email ou senha inválidos"
          if (errorMessage.includes("Muitas tentativas")) {
            setRateLimitError(errorMessage)
          } else {
            setError(errorMessage)
          }
        }
      }
    } catch (err) {
      setError("Ocorreu um erro. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setError("")
    setRateLimitError("")
    setEmail("")
    setPassword("")
    setName("")
    setPhone("")
    setDepartment("")
    setRememberMe(false)
  }

  return (
    <div className="w-full space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold text-primary font-serif italic tracking-tighter mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          𝒴ℴ𝓂𝒾
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {isRegisterMode ? "Criar nova conta" : "Bem-vindo de volta"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isRegisterMode
            ? "Preencha os dados abaixo para começar"
            : "Entre com suas credenciais para acessar o sistema"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegisterMode && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Nome
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Telefone
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Departamento
              </Label>
              <div className="relative group">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="department"
                  type="text"
                  placeholder="Ex: TI, Vendas"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Email
          </Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20 transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Senha
            </Label>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-zinc-900/50 border-zinc-800 focus:border-primary focus:ring-primary/20 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {!isRegisterMode && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-2 border-primary/30 cursor-pointer"
            />
            <Label htmlFor="remember" className="text-sm cursor-pointer">
              Lembrar de mim
            </Label>
          </div>
        )}

        {rateLimitError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md animate-in fade-in slide-in-from-top-2">
            <p className="text-sm text-red-400 text-center font-medium">{rateLimitError}</p>
          </div>
        )}

        {error && !rateLimitError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md animate-in fade-in slide-in-from-top-2">
            <p className="text-sm text-red-400 text-center">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <span className="flex items-center justify-center gap-2">
              {isRegisterMode ? "Criar Conta" : "Entrar"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={toggleMode}
            className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            {isRegisterMode ? "Já tem uma conta? Entrar" : "Não tem conta? Criar Conta"}
          </button>
        </div>
      </form>
    </div>
  )
}
