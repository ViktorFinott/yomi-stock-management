import { NextResponse } from "next/server"
import { MOCK_INVENTORY } from "@/lib/inventory-data"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const item = MOCK_INVENTORY.find((i) => i.id === id)

    if (!item) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: item,
    })
  } catch (error) {
    console.error("[API] Error fetching item:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch item" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const itemIndex = MOCK_INVENTORY.findIndex((i) => i.id === id)

    if (itemIndex === -1) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 })
    }

    // In production, this would update the database
    const updatedItem = {
      ...MOCK_INVENTORY[itemIndex],
      ...body,
      lastUpdated: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: "Item updated successfully",
    })
  } catch (error) {
    console.error("[API] Error updating item:", error)
    return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const itemIndex = MOCK_INVENTORY.findIndex((i) => i.id === id)

    if (itemIndex === -1) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 })
    }

    // In production, this would delete from the database
    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
    })
  } catch (error) {
    console.error("[API] Error deleting item:", error)
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 })
  }
}
