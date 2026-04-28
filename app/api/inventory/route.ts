import { NextResponse } from "next/server"
import { MOCK_INVENTORY } from "@/lib/inventory-data"

export async function GET() {
  try {
    // In production, this would fetch from a database
    const inventory = MOCK_INVENTORY

    return NextResponse.json({
      success: true,
      data: inventory,
      total: inventory.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[API] Error fetching inventory:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.category) {
      return NextResponse.json({ success: false, error: "Name and category are required" }, { status: 400 })
    }

    // In production, this would save to a database
    const newItem = {
      id: `item-${Date.now()}`,
      name: body.name,
      category: body.category,
      quantity: body.quantity || 0,
      minQuantity: body.minQuantity || 0,
      location: body.location || "",
      supplier: body.supplier || "",
      price: body.price || 0,
      lastUpdated: new Date(),
      status: body.quantity > body.minQuantity ? "in-stock" : body.quantity > 0 ? "low-stock" : "out-of-stock",
      description: body.description || "",
    }

    return NextResponse.json({
      success: true,
      data: newItem,
      message: "Item created successfully",
    })
  } catch (error) {
    console.error("[API] Error creating inventory item:", error)
    return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 })
  }
}
