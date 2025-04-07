import { type NextRequest, NextResponse } from "next/server"
import { collections, findMany, insertOne } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const swecOffers = await findMany(collections.SWEC_OFFERS)
    return NextResponse.json(swecOffers)
  } catch (error) {
    console.error("Error fetching SWEC offers:", error)
    return NextResponse.json({ error: "Failed to fetch SWEC offers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Add timestamps
    const swecOfferData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const newSwecOffer = await insertOne(collections.SWEC_OFFERS, swecOfferData)
    return NextResponse.json(newSwecOffer, { status: 201 })
  } catch (error) {
    console.error("Error creating SWEC offer:", error)
    return NextResponse.json({ error: "Failed to create SWEC offer" }, { status: 500 })
  }
}

