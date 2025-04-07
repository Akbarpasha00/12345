import { type NextRequest, NextResponse } from "next/server"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const scheduledDrive = await findById(collections.SCHEDULED_DRIVES, params.id)

    if (!scheduledDrive) {
      return NextResponse.json({ error: "Scheduled drive not found" }, { status: 404 })
    }

    return NextResponse.json(scheduledDrive)
  } catch (error) {
    console.error(`Error fetching scheduled drive ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch scheduled drive" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Add updated timestamp
    const scheduledDriveData = {
      ...data,
      updatedAt: new Date(),
    }

    const updatedScheduledDrive = await updateOne(collections.SCHEDULED_DRIVES, params.id, scheduledDriveData)

    if (!updatedScheduledDrive) {
      return NextResponse.json({ error: "Scheduled drive not found" }, { status: 404 })
    }

    return NextResponse.json(updatedScheduledDrive)
  } catch (error) {
    console.error(`Error updating scheduled drive ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update scheduled drive" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteOne(collections.SCHEDULED_DRIVES, params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Scheduled drive not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting scheduled drive ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete scheduled drive" }, { status: 500 })
  }
}

