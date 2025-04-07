import { type NextRequest, NextResponse } from "next/server"
import { collections, findMany, insertOne } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const events = await findMany(collections.EVENTS)
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Add timestamps
    const eventData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const newEvent = await insertOne(collections.EVENTS, eventData)
    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}

