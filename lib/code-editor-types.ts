export interface CodeFile {
  id: string
  name: string
  language: "javascript" | "typescript" | "python" | "html" | "css" | "json" | "markdown"
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface CodeProject {
  id: string
  name: string
  description?: string
  files: CodeFile[]
  createdAt: Date
  updatedAt: Date
}
