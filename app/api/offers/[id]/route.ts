import { type NextRequest, NextResponse } from "next/server"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const offer = await findById(collections.OFFERS, params.id)

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 })
    }

    return NextResponse.json(offer)
  } catch (error) {
    console.error(`Error fetching offer ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Add updated timestamp
    const offerData = {
      ...data,
      updatedAt: new Date(),
    }

    const updatedOffer = await updateOne(collections.OFFERS, params.id, offerData)

    if (!updatedOffer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 })
    }

    return NextResponse.json(updatedOffer)
  } catch (error) {
    console.error(`Error updating offer ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update offer" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteOne(collections.OFFERS, params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting offer ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 })
  }
}

