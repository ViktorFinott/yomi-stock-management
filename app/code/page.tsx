"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CodeEditor } from "@/components/code-editor"
import type { CodeFile } from "@/lib/code-editor-types"

export default function CodePage() {
  const [files, setFiles] = useState<CodeFile[]>([
    {
      id: "1",
      name: "exemplo.js",
      language: "javascript",
      content: "// Bem-vindo ao editor de código!\nconsole.log('Hello, World!');",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("yomi_code_files")
      if (stored) {
        setFiles(JSON.parse(stored))
      }
    } catch (error) {
      console.error("[v0] Erro ao carregar arquivos:", error)
    }
  }, [])

  const handleFilesChange = (newFiles: CodeFile[]) => {
    setFiles(newFiles)
    try {
      localStorage.setItem("yomi_code_files", JSON.stringify(newFiles))
    } catch (error) {
      console.error("[v0] Erro ao salvar arquivos:", error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Editor de Código</h1>
          <p className="text-muted-foreground mt-2">Crie e edite seus arquivos de código</p>
        </div>

        <CodeEditor files={files} onFilesChange={handleFilesChange} />
      </div>
    </DashboardLayout>
  )
}
