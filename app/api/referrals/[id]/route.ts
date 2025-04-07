import { type NextRequest, NextResponse } from "next/server"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const referral = await findById(collections.REFERRALS, params.id)

    if (!referral) {
      return NextResponse.json({ error: "Referral not found" }, { status: 404 })
    }

    return NextResponse.json(referral)
  } catch (error) {
    console.error(`Error fetching referral ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch referral" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Add updated timestamp
    const referralData = {
      ...data,
      updatedAt: new Date(),
    }

    const updatedReferral = await updateOne(collections.REFERRALS, params.id, referralData)

    if (!updatedReferral) {
      return NextResponse.json({ error: "Referral not found" }, { status: 404 })
    }

    return NextResponse.json(updatedReferral)
  } catch (error) {
    console.error(`Error updating referral ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update referral" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteOne(collections.REFERRALS, params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Referral not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting referral ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete referral" }, { status: 500 })
  }
}

