import { type NextRequest, NextResponse } from "next/server"
import { collections, insertOne } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const fileContents = await file.text()
    const rows = fileContents.split("\n")

    // Skip header row
    const header = rows[0].split(",")
    const dataRows = rows.slice(1)

    const students = []

    for (const row of dataRows) {
      if (!row.trim()) continue

      const values = row.split(",")
      const student = {}

      header.forEach((key, index) => {
        student[key.trim()] = values[index]?.trim() || ""
      })

      // Add timestamps
      student["createdAt"] = new Date()
      student["updatedAt"] = new Date()

      const newStudent = await insertOne(collections.CANDIDATES, student)
      students.push(newStudent)
    }

    return NextResponse.json({
      success: true,
      count: students.length,
      students,
    })
  } catch (error) {
    console.error("Error importing students:", error)
    return NextResponse.json({ error: "Failed to import students" }, { status: 500 })
  }
}

