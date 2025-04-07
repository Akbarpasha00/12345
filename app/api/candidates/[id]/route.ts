import { type NextRequest, NextResponse } from "next/server"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const candidate = await findById(collections.CANDIDATES, params.id)
    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 })
    }
    return NextResponse.json(candidate)
  } catch (error) {
    console.error(`Error fetching candidate ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch candidate" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const updatedCandidate = await updateOne(collections.CANDIDATES, params.id, data)
    if (!updatedCandidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 })
    }
    return NextResponse.json(updatedCandidate)
  } catch (error) {
    console.error(`Error updating candidate ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update candidate" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteOne(collections.CANDIDATES, params.id)
    if (!success) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting candidate ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete candidate" }, { status: 500 })
  }
}

