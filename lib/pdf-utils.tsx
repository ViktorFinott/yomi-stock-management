"use client"

export interface PDFReportData {
  title: string
  subtitle?: string
  date: Date
  sections: PDFSection[]
}

export interface PDFSection {
  title: string
  type: "table" | "summary" | "chart"
  data: unknown
}

export class PDFUtils {
  static generateInventoryReport(inventory: unknown[]): string {
    // Generate HTML for PDF-like report
    const date = new Date().toLocaleDateString("pt-BR")

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Relatório de Inventário - Yomi</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #7c3aed; padding-bottom: 20px; }
          .header h1 { color: #7c3aed; margin: 0; }
          .header p { color: #666; margin: 10px 0 0; }
          .summary { display: flex; gap: 20px; margin-bottom: 30px; }
          .summary-card { background: #f5f3ff; padding: 20px; border-radius: 8px; flex: 1; text-align: center; }
          .summary-card h3 { margin: 0; color: #7c3aed; font-size: 24px; }
          .summary-card p { margin: 5px 0 0; color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
          th { background: #7c3aed; color: white; }
          tr:nth-child(even) { background: #f9f9f9; }
          .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .status-in-stock { background: #dcfce7; color: #166534; }
          .status-low-stock { background: #fef9c3; color: #854d0e; }
          .status-out-of-stock { background: #fee2e2; color: #991b1b; }
          .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>𝒴ℴ𝓂𝒾</h1>
          <p>Relatório de Inventário - ${date}</p>
        </div>
        
        <div class="summary">
          <div class="summary-card">
            <h3>${(inventory as unknown[]).length}</h3>
            <p>Total de Itens</p>
          </div>
          <div class="summary-card">
            <h3>${(inventory as { status: string }[]).filter((i) => i.status === "in-stock").length}</h3>
            <p>Em Estoque</p>
          </div>
          <div class="summary-card">
            <h3>${(inventory as { status: string }[]).filter((i) => i.status === "low-stock").length}</h3>
            <p>Estoque Baixo</p>
          </div>
          <div class="summary-card">
            <h3>${(inventory as { status: string }[]).filter((i) => i.status === "out-of-stock").length}</h3>
            <p>Sem Estoque</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Localização</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${(inventory as { name: string; category: string; quantity: number; location: string; status: string }[])
              .map(
                (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.category}</td>
                  <td>${item.quantity}</td>
                  <td>${item.location}</td>
                  <td><span class="status status-${item.status}">${
                    item.status === "in-stock" ? "Em Estoque" : item.status === "low-stock" ? "Baixo" : "Esgotado"
                  }</span></td>
                </tr>
              `,
              )
              .join("")}
          </tbody>
        </table>

        <div class="footer">
          <p>Gerado pelo sistema Yomi em ${new Date().toLocaleString("pt-BR")}</p>
        </div>
      </body>
      </html>
    `

    return html
  }

  static printReport(html: string): void {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(html)
      printWindow.document.close()
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  static downloadAsHTML(html: string, filename: string): void {
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}
