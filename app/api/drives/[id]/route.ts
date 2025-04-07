import { type NextRequest, NextResponse } from "next/server"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const drive = await findById(collections.DRIVES, params.id)

    if (!drive) {
      return NextResponse.json({ error: "Drive not found" }, { status: 404 })
    }

    return NextResponse.json(drive)
  } catch (error) {
    console.error(`Error fetching drive ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch drive" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Add updated timestamp
    const driveData = {
      ...data,
      updatedAt: new Date(),
    }

    const updatedDrive = await updateOne(collections.DRIVES, params.id, driveData)

    if (!updatedDrive) {
      return NextResponse.json({ error: "Drive not found" }, { status: 404 })
    }

    return NextResponse.json(updatedDrive)
  } catch (error) {
    console.error(`Error updating drive ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update drive" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteOne(collections.DRIVES, params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Drive not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting drive ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete drive" }, { status: 500 })
  }
}

