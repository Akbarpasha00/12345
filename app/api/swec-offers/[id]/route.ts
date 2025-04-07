import { type NextRequest, NextResponse } from "next/server"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const swecOffer = await findById(collections.SWEC_OFFERS, params.id)

    if (!swecOffer) {
      return NextResponse.json({ error: "SWEC offer not found" }, { status: 404 })
    }

    return NextResponse.json(swecOffer)
  } catch (error) {
    console.error(`Error fetching SWEC offer ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch SWEC offer" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Add updated timestamp
    const swecOfferData = {
      ...data,
      updatedAt: new Date(),
    }

    const updatedSwecOffer = await updateOne(collections.SWEC_OFFERS, params.id, swecOfferData)

    if (!updatedSwecOffer) {
      return NextResponse.json({ error: "SWEC offer not found" }, { status: 404 })
    }

    return NextResponse.json(updatedSwecOffer)
  } catch (error) {
    console.error(`Error updating SWEC offer ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update SWEC offer" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteOne(collections.SWEC_OFFERS, params.id)

    if (!deleted) {
      return NextResponse.json({ error: "SWEC offer not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting SWEC offer ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete SWEC offer" }, { status: 500 })
  }
}

