import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { collections, findMany, insertOne, findOne } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    // const departments = await findMany(
    //   collections.DEPARTMENTS,
    //   {},
    //   {
    //     sort: { name: 1 },
    //   },
    // )
    const departments = await findMany(collections.DEPARTMENTS)
    return NextResponse.json(departments)
  } catch (error) {
    console.error("Error fetching departments:", error)
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user has admin or department coordinator role
    if (session.user.role !== "ADMIN" && session.user.role !== "DEPARTMENT_COORDINATOR") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const data = await request.json()

    // Add timestamps
    const departmentData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const { name, code, description, headOfDept } = data

    if (!name || !code) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Check if department with same code already exists
    const existingDepartment = await findOne(collections.DEPARTMENTS, { code })

    if (existingDepartment) {
      return new NextResponse("Department with this code already exists", { status: 400 })
    }

    const newDepartment = await insertOne(collections.DEPARTMENTS, departmentData)
    return NextResponse.json(newDepartment, { status: 201 })
  } catch (error) {
    console.error("Error creating department:", error)
    return NextResponse.json({ error: "Failed to create department" }, { status: 500 })
  }
}

