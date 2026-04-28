"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Trash2, Download, Copy, Upload } from "lucide-react"
import type { CodeFile } from "@/lib/code-editor-types"

interface CodeEditorProps {
  files: CodeFile[]
  onFilesChange: (files: CodeFile[]) => void
}

export function CodeEditor({ files, onFilesChange }: CodeEditorProps) {
  const [selectedFileId, setSelectedFileId] = useState<string>(files[0]?.id)
  const [showNewFile, setShowNewFile] = useState(false)
  const [newFileName, setNewFileName] = useState("")

  const selectedFile = files.find((f) => f.id === selectedFileId)

  const addFile = () => {
    if (!newFileName.trim()) return

    const newFile: CodeFile = {
      id: Date.now().toString(),
      name: newFileName,
      language: newFileName.endsWith(".ts") ? "typescript" : newFileName.endsWith(".css") ? "css" : "javascript",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedFiles = [...files, newFile]
    onFilesChange(updatedFiles)
    setSelectedFileId(newFile.id)
    setNewFileName("")
    setShowNewFile(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (!uploadedFiles) return

    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const newFile: CodeFile = {
          id: Date.now().toString(),
          name: file.name,
          language: file.name.endsWith(".ts") ? "typescript" : file.name.endsWith(".css") ? "css" : "javascript",
          content: content,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        const updatedFiles = [...files, newFile]
        onFilesChange(updatedFiles)
      }
      reader.readAsText(file)
    })
  }

  const updateFileContent = (content: string) => {
    const updatedFiles = files.map((f) => (f.id === selectedFileId ? { ...f, content, updatedAt: new Date() } : f))
    onFilesChange(updatedFiles)
  }

  const deleteFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id)
    onFilesChange(updatedFiles)
    if (selectedFileId === id) {
      setSelectedFileId(updatedFiles[0]?.id)
    }
  }

  const downloadFile = () => {
    if (!selectedFile) return
    const element = document.createElement("a")
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(selectedFile.content)}`)
    element.setAttribute("download", selectedFile.name)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const copyToClipboard = () => {
    if (!selectedFile) return
    navigator.clipboard.writeText(selectedFile.content)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black border-2 border-primary/30">
          <TabsTrigger value="editor" className="data-[state=active]:bg-primary/20">
            Editor
          </TabsTrigger>
          <TabsTrigger value="files" className="data-[state=active]:bg-primary/20">
            Arquivos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          {selectedFile ? (
            <Card className="border-2 border-primary/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {selectedFile.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyToClipboard}
                      className="border-2 border-primary/30 hover:bg-primary/20"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={downloadFile}
                      className="border-2 border-primary/30 hover:bg-primary/20"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-black/50 border-2 border-primary/30 rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="bg-black/80 border-r border-primary/20 px-3 py-4 text-muted-foreground text-sm font-mono select-none min-w-fit">
                      {selectedFile.content.split("\n").map((_, i) => (
                        <div key={i} className="h-6 leading-6">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <Textarea
                      value={selectedFile.content}
                      onChange={(e) => updateFileContent(e.target.value)}
                      placeholder="Escreva seu código aqui..."
                      className="font-mono text-sm h-96 bg-black/50 border-0 resize-none p-4 flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-primary/30 p-6">
              <p className="text-muted-foreground text-center">Nenhum arquivo selecionado</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <div className="space-y-2">
            {showNewFile ? (
              <div className="flex gap-2">
                <Input
                  placeholder="nome-do-arquivo.ts"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="bg-black/50 border-2 border-primary/30"
                />
                <Button onClick={addFile} className="border-2 border-primary/30">
                  Criar
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setShowNewFile(true)} className="flex-1 border-2 border-primary/30 gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Arquivo
                </Button>
                <label>
                  <Button asChild className="border-2 border-primary/30 gap-2">
                    <span>
                      <Upload className="h-4 w-4" />
                      Upload
                    </span>
                  </Button>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".js,.ts,.jsx,.tsx,.css,.html,.json,.py,.java"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedFileId === file.id ? "bg-primary/20 border-primary" : "border-primary/30 hover:bg-primary/10"
                }`}
                onClick={() => setSelectedFileId(file.id)}
              >
                <div className="flex items-center gap-2 flex-1">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(file.id)
                  }}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
