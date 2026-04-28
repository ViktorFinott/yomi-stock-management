// =============================================================================
// UTILITÁRIOS DE SEGURANÇA
// Funções para validação, sanitização e proteção do sistema
// =============================================================================

export class SecurityUtils {
  // ---------------------------------------------------------------------------
  // VALIDAÇÕES
  // ---------------------------------------------------------------------------

  /**
   * Valida formato de email
   * @param email - Email a ser validado
   * @returns true se o email é válido
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Valida força da senha
   * Requisitos: 8+ caracteres, maiúscula, minúscula, número, caractere especial
   * @param password - Senha a ser validada
   * @returns Objeto com resultado e lista de erros
   */
  static isStrongPassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push("A senha deve ter pelo menos 8 caracteres")
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula")
    }
    if (!/[a-z]/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra minúscula")
    }
    if (!/[0-9]/.test(password)) {
      errors.push("A senha deve conter pelo menos um número")
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("A senha deve conter pelo menos um caractere especial")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Valida nome (apenas letras e espaços, 2-100 caracteres)
   * @param name - Nome a ser validado
   * @returns true se o nome é válido
   */
  static isValidName(name: string): boolean {
    const isLengthValid = name.length >= 2 && name.length <= 100
    const hasValidChars = /^[a-zA-ZÀ-ÿ\s]+$/.test(name)
    return isLengthValid && hasValidChars
  }

  /**
   * Valida telefone brasileiro
   * Formatos aceitos: (00) 00000-0000, (00)00000-0000, etc.
   * @param phone - Telefone a ser validado
   * @returns true se o telefone é válido
   */
  static isValidPhone(phone: string): boolean {
    // Remove espaços para validação
    const cleanPhone = phone.replace(/\s/g, "")
    // Regex para telefone brasileiro com DDD
    const phoneRegex = /^$$?[1-9]{2}$$?9?[0-9]{4}-?[0-9]{4}$/
    return phoneRegex.test(cleanPhone)
  }

  // ---------------------------------------------------------------------------
  // SANITIZAÇÃO
  // ---------------------------------------------------------------------------

  /**
   * Sanitiza input para prevenir XSS
   * Escapa caracteres HTML perigosos
   * @param input - String a ser sanitizada
   * @returns String sanitizada
   */
  static sanitizeInput(input: string): string {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
      .trim()
  }

  // ---------------------------------------------------------------------------
  // RATE LIMITING
  // Proteção contra brute force attacks
  // ---------------------------------------------------------------------------

  /** Armazena tentativas de login por identificador */
  private static loginAttempts: Map<string, { count: number; lastAttempt: number }> = new Map()

  /**
   * Verifica se o identificador excedeu o limite de tentativas
   * @param identifier - Email ou IP do usuário
   * @param maxAttempts - Máximo de tentativas permitidas (default: 5)
   * @param windowMs - Janela de tempo em ms (default: 15 minutos)
   * @returns true se ainda pode tentar, false se bloqueado
   */
  static checkRateLimit(identifier: string, maxAttempts = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now()
    const attempts = this.loginAttempts.get(identifier)

    // Primeiro acesso - permitir
    if (!attempts) {
      this.loginAttempts.set(identifier, { count: 1, lastAttempt: now })
      return true
    }

    // Reset se passou o tempo da janela
    if (now - attempts.lastAttempt > windowMs) {
      this.loginAttempts.set(identifier, { count: 1, lastAttempt: now })
      return true
    }

    // Verificar se excedeu limite
    if (attempts.count >= maxAttempts) {
      return false
    }

    // Incrementar contador
    attempts.count++
    attempts.lastAttempt = now
    return true
  }

  /**
   * Retorna tempo restante de bloqueio em minutos
   * @param identifier - Email ou IP do usuário
   * @param windowMs - Janela de tempo em ms
   * @returns Minutos restantes ou 0 se não bloqueado
   */
  static getRemainingTime(identifier: string, windowMs: number = 15 * 60 * 1000): number {
    const attempts = this.loginAttempts.get(identifier)
    if (!attempts) return 0

    const elapsed = Date.now() - attempts.lastAttempt
    const remaining = windowMs - elapsed
    return remaining > 0 ? Math.ceil(remaining / 1000 / 60) : 0
  }

  // ---------------------------------------------------------------------------
  // HASHING DE SENHA
  // Nota: Em produção, usar bcrypt no backend
  // ---------------------------------------------------------------------------

  /**
   * Gera hash SHA-256 da senha
   * @param password - Senha em texto puro
   * @returns Hash hexadecimal da senha
   */
  static async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  /**
   * Verifica se a senha corresponde ao hash
   * @param password - Senha em texto puro
   * @param hash - Hash armazenado
   * @returns true se a senha corresponde
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password)
    return passwordHash === hash
  }
}
