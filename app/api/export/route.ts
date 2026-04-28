import { NextResponse } from "next/server"
import { MOCK_INVENTORY } from "@/lib/inventory-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format") || "json"

    if (format === "csv") {
      const headers = ["ID", "Nome", "Categoria", "Quantidade", "Preço", "Localização", "Fornecedor", "Status"]
      const rows = MOCK_INVENTORY.map((item) => [
        item.id,
        item.name,
        item.category,
        item.quantity,
        item.price,
        item.location,
        item.supplier,
        item.status,
      ])

      const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="inventory-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: MOCK_INVENTORY,
      exportedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[API] Error exporting data:", error)
    return NextResponse.json({ success: false, error: "Failed to export data" }, { status: 500 })
  }
}
