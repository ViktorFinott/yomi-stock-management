import { NextResponse } from "next/server"
import { MOCK_INVENTORY, getInventoryStats } from "@/lib/inventory-data"

export async function GET() {
  try {
    const stats = getInventoryStats(MOCK_INVENTORY)

    return NextResponse.json({
      success: true,
      data: {
        inventory: stats,
        system: {
          version: "1.0.0",
          uptime: process.uptime ? process.uptime() : 0,
          timestamp: new Date().toISOString(),
        },
      },
    })
  } catch (error) {
    console.error("[API] Error fetching stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
  }
}
