import { NextResponse } from "next/server"

// Webhook endpoints for external integrations
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate webhook payload
    if (!body.event || !body.data) {
      return NextResponse.json({ success: false, error: "Invalid webhook payload" }, { status: 400 })
    }

    // Process webhook based on event type
    switch (body.event) {
      case "inventory.low_stock":
        console.log("[Webhook] Low stock alert:", body.data)
        break
      case "inventory.out_of_stock":
        console.log("[Webhook] Out of stock alert:", body.data)
        break
      case "request.created":
        console.log("[Webhook] New request:", body.data)
        break
      case "request.approved":
        console.log("[Webhook] Request approved:", body.data)
        break
      default:
        console.log("[Webhook] Unknown event:", body.event)
    }

    return NextResponse.json({
      success: true,
      message: "Webhook received",
      event: body.event,
    })
  } catch (error) {
    console.error("[API] Webhook error:", error)
    return NextResponse.json({ success: false, error: "Webhook processing failed" }, { status: 500 })
  }
}
