import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { collections, findById, updateOne, deleteOne } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const department = await findById(collections.DEPARTMENTS, params.id)

    if (!department) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 })
    }

    return NextResponse.json(department)
  } catch (error) {
    console.error(`Error fetching department ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch department" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user has admin or department coordinator role
    if (session.user.role !== "ADMIN" && session.user.role !== "DEPARTMENT_COORDINATOR") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    if (!params.id) {
      return new NextResponse("Department ID is required", { status: 400 })
    }

    const data = await request.json()

    // Add updated timestamp
    const departmentData = {
      ...data,
      updatedAt: new Date(),
    }

    const updatedDepartment = await updateOne(collections.DEPARTMENTS, params.id, departmentData)

    if (!updatedDepartment) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 })
    }

    return NextResponse.json(updatedDepartment)
  } catch (error) {
    console.error(`Error updating department ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update department" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Only admin can delete departments
    if (session.user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    if (!params.id) {
      return new NextResponse("Department ID is required", { status: 400 })
    }

    const deleted = await deleteOne(collections.DEPARTMENTS, params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting department ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete department" }, { status: 500 })
  }
}

