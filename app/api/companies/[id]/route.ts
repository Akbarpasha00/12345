import { type NextRequest, NextResponse } from "next/server"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const company = await findById(collections.COMPANIES, params.id)
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }
    return NextResponse.json(company)
  } catch (error) {
    console.error(`Error fetching company ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch company" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const updatedCompany = await updateOne(collections.COMPANIES, params.id, data)
    if (!updatedCompany) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }
    return NextResponse.json(updatedCompany)
  } catch (error) {
    console.error(`Error updating company ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update company" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteOne(collections.COMPANIES, params.id)
    if (!success) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting company ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete company" }, { status: 500 })
  }
}

