import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { collections, insertOne } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { candidateId } = await request.json()

    if (!candidateId) {
      return NextResponse.json({ error: "Candidate ID is required" }, { status: 400 })
    }

    // Create registration record
    const registration = await insertOne(collections.DRIVE_REGISTRATIONS, {
      driveId: new ObjectId(params.id),
      candidateId: new ObjectId(candidateId),
      status: "Registered",
      registeredAt: new Date(),
    })

    return NextResponse.json(registration, { status: 201 })
  } catch (error) {
    console.error(`Error registering candidate for drive ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to register candidate for drive" }, { status: 500 })
  }
}

