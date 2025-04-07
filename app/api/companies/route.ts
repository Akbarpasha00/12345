import { type NextRequest, NextResponse } from "next/server"
import { collections, findMany, insertOne } from "@/lib/db"

export async function GET() {
  try {
    const companies = await findMany(collections.COMPANIES)
    return NextResponse.json(companies)
  } catch (error) {
    console.error("Error fetching companies:", error)
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const company = await insertOne(collections.COMPANIES, data)
    return NextResponse.json(company)
  } catch (error) {
    console.error("Error creating company:", error)
    return NextResponse.json({ error: "Failed to create company" }, { status: 500 })
  }
}

