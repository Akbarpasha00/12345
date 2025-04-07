import { type NextRequest, NextResponse } from "next/server"
import { collections, findMany, insertOne } from "@/lib/db"

export async function GET() {
  try {
    const candidates = await findMany(collections.CANDIDATES)
    return NextResponse.json(candidates)
  } catch (error) {
    console.error("Error fetching candidates:", error)
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const candidate = await insertOne(collections.CANDIDATES, data)
    return NextResponse.json(candidate)
  } catch (error) {
    console.error("Error creating candidate:", error)
    return NextResponse.json({ error: "Failed to create candidate" }, { status: 500 })
  }
}

