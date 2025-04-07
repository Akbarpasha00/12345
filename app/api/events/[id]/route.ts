import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const event = await findById(collections.EVENTS, params.id)

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error(`Error fetching event ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.id) {
      return new NextResponse("Event ID is required", { status: 400 })
    }

    const data = await request.json()

    // Add updated timestamp
    const eventData = {
      ...data,
      updatedAt: new Date(),
    }

    const updatedEvent = await updateOne(collections.EVENTS, params.id, eventData)

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error(`Error updating event ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.id) {
      return new NextResponse("Event ID is required", { status: 400 })
    }

    const deleted = await deleteOne(collections.EVENTS, params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting event ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}

