"use client"

// =============================================================================
// UTILITÁRIOS DE BACKUP
// Funções para backup, restore e importação de dados
// =============================================================================

// =============================================================================
// TIPOS
// =============================================================================

/** Estrutura do arquivo de backup */
export interface BackupData {
  version: string
  createdAt: string
  data: {
    users?: unknown[]
    inventory?: unknown[]
    movements?: unknown[]
    notes?: unknown[]
    events?: unknown[]
    settings?: Record<string, unknown>
    activityLogs?: unknown[]
  }
}

/** Resultado de operação de backup/restore */
interface OperationResult {
  success: boolean
  error?: string
}

/** Resultado de importação de CSV */
interface ImportResult extends OperationResult {
  count: number
}

// =============================================================================
// CONSTANTES
// =============================================================================

/** Versão atual do formato de backup */
const BACKUP_VERSION = "1.0.0"

/** Chaves do localStorage para backup */
const BACKUP_KEYS = [
  "yomi_registered_users",
  "yomi_inventory",
  "yomi_stock_movements",
  "yomi_notes",
  "yomi_events",
  "yomi_theme_settings",
  "yomi_activity_logs",
  "yomi_notifications",
  "yomi_team_members",
  "yomi_finance_data",
] as const

/** Mapeamento de chaves de backup para localStorage */
const KEY_MAPPING: Record<string, string> = {
  registered_users: "yomi_registered_users",
  inventory: "yomi_inventory",
  stock_movements: "yomi_stock_movements",
  notes: "yomi_notes",
  events: "yomi_events",
  theme_settings: "yomi_theme_settings",
  activity_logs: "yomi_activity_logs",
  notifications: "yomi_notifications",
  team_members: "yomi_team_members",
  finance_data: "yomi_finance_data",
}

// =============================================================================
// CLASSE DE UTILITÁRIOS
// =============================================================================

export class BackupUtils {
  // ---------------------------------------------------------------------------
  // CRIAÇÃO DE BACKUP
  // ---------------------------------------------------------------------------

  /**
   * Cria um backup completo dos dados do sistema
   * @returns Objeto BackupData com todos os dados
   */
  static createBackup(): BackupData {
    const backup: BackupData = {
      version: BACKUP_VERSION,
      createdAt: new Date().toISOString(),
      data: {},
    }

    // Coletar dados de cada chave do localStorage
    BACKUP_KEYS.forEach((key) => {
      try {
        const data = localStorage.getItem(key)
        if (data) {
          // Remover prefixo "yomi_" para nome mais curto
          const shortKey = key.replace("yomi_", "")
          backup.data[shortKey as keyof typeof backup.data] = JSON.parse(data)
        }
      } catch (error) {
        console.error(`[v0] Error backing up ${key}:`, error)
      }
    })

    return backup
  }

  // ---------------------------------------------------------------------------
  // DOWNLOAD DE BACKUP
  // ---------------------------------------------------------------------------

  /**
   * Faz download do backup como arquivo JSON
   * @param backup - Dados do backup
   */
  static downloadBackup(backup: BackupData): void {
    // Criar blob com os dados
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" })

    // Criar URL temporária
    const url = URL.createObjectURL(blob)

    // Criar elemento de download
    const downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.download = `yomi-backup-${new Date().toISOString().split("T")[0]}.json`

    // Executar download
    document.body.appendChild(downloadLink)
    downloadLink.click()

    // Limpar recursos
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(url)
  }

  // ---------------------------------------------------------------------------
  // RESTAURAÇÃO DE BACKUP
  // ---------------------------------------------------------------------------

  /**
   * Restaura dados de um arquivo de backup
   * @param file - Arquivo JSON de backup
   * @returns Resultado da operação
   */
  static async restoreBackup(file: File): Promise<OperationResult> {
    try {
      const text = await file.text()
      const backup: BackupData = JSON.parse(text)

      // Validar estrutura do backup
      if (!backup.version || !backup.data) {
        return { success: false, error: "Arquivo de backup inválido" }
      }

      // Restaurar cada tipo de dado
      Object.entries(backup.data).forEach(([key, value]) => {
        const storageKey = KEY_MAPPING[key] || `yomi_${key}`
        if (value) {
          localStorage.setItem(storageKey, JSON.stringify(value))
        }
      })

      return { success: true }
    } catch (error) {
      console.error("[v0] Error restoring backup:", error)
      return {
        success: false,
        error: "Erro ao restaurar backup. Arquivo pode estar corrompido.",
      }
    }
  }

  // ---------------------------------------------------------------------------
  // IMPORTAÇÃO DE CSV
  // ---------------------------------------------------------------------------

  /**
   * Importa dados de um arquivo CSV
   * @param file - Arquivo CSV
   * @param type - Tipo de dados (inventory ou movements)
   * @returns Resultado com contagem de itens importados
   */
  static async importCSV(file: File, type: "inventory" | "movements"): Promise<ImportResult> {
    try {
      const text = await file.text()
      const lines = text.split("\n").filter((line) => line.trim())

      // Validar conteúdo mínimo
      if (lines.length < 2) {
        return {
          success: false,
          count: 0,
          error: "Arquivo CSV vazio ou sem dados",
        }
      }

      // Extrair headers (primeira linha)
      const headers = lines[0].split(",").map((header) => header.trim().toLowerCase())

      // Processar linhas de dados
      const importedData: Record<string, unknown>[] = []
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((value) => value.trim())
        const row: Record<string, unknown> = {}

        // Mapear valores para headers
        headers.forEach((header, index) => {
          row[header] = values[index] || ""
        })

        // Gerar ID único
        row.id = `imported-${Date.now()}-${i}`
        importedData.push(row)
      }

      // Salvar no localStorage
      const storageKey = type === "inventory" ? "yomi_inventory" : "yomi_stock_movements"

      const existingData = JSON.parse(localStorage.getItem(storageKey) || "[]")
      localStorage.setItem(storageKey, JSON.stringify([...existingData, ...importedData]))

      return { success: true, count: importedData.length }
    } catch (error) {
      console.error("[v0] Error importing CSV:", error)
      return { success: false, count: 0, error: "Erro ao importar CSV" }
    }
  }
}
