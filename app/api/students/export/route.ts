import { type NextRequest, NextResponse } from "next/server"
import { collections, findMany } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const format = searchParams.get("format") || "csv"
    const fields = searchParams.get("fields")?.split(",") || []

    // Get all students
    const students = await findMany(collections.CANDIDATES)

    if (format === "json") {
      // If fields are specified, filter the data
      if (fields.length > 0) {
        const filteredStudents = students.map((student) => {
          const filteredStudent = {}
          fields.forEach((field) => {
            if (student[field] !== undefined) {
              filteredStudent[field] = student[field] = student[field]
            }
          })
          return filteredStudent
        })
        return NextResponse.json(filteredStudents)
      }

      return NextResponse.json(students)
    } else if (format === "csv") {
      // Determine fields to include
      const headersToUse = fields.length > 0 ? fields : Object.keys(students[0] || {})

      // Create CSV header
      let csv = headersToUse.join(",") + "\n"

      // Add data rows
      students.forEach((student) => {
        const row = headersToUse
          .map((header) => {
            const value = student[header]
            // Handle values with commas by wrapping in quotes
            return typeof value === "string" && value.includes(",") ? `"${value}"` : value
          })
          .join(",")
        csv += row + "\n"
      })

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=students.csv",
        },
      })
    } else {
      return NextResponse.json({ error: "Unsupported format" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error exporting students:", error)
    return NextResponse.json({ error: "Failed to export students" }, { status: 500 })
  }
}

