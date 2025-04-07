import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { collections, findMany, insertOne } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    // const drives = await findMany(
    //   collections.DRIVES,
    //   {},
    //   {
    //     sort: { date: -1 },
    //   },
    // )

    // // Fetch company names and registration counts for each drive
    // const drivesWithDetails = await Promise.all(
    //   drives.map(async (drive) => {
    //     const company = await findById(collections.COMPANIES, drive.companyId)
    //     const registrationCount = await countDocuments(collections.DRIVE_REGISTRATIONS, { driveId: drive.id })

    //     return {
    //       ...drive,
    //       company: company ? { name: company.name } : { name: "Unknown" },
    //       _count: {
    //         driveRegistrations: registrationCount,
    //       },
    //     }
    //   }),
    // )
    const drives = await findMany(collections.DRIVES)
    return NextResponse.json(drives)
  } catch (error) {
    console.error("Error fetching drives:", error)
    return NextResponse.json({ error: "Failed to fetch drives" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    // const body = await req.json()

    // const { companyId, date, location, positions, eligibility, description, status } = body

    // if (!companyId || !date || !location || !positions || !eligibility) {
    //   return new NextResponse("Missing required fields", { status: 400 })
    // }

    // // Check if company exists
    // const company = await findById(collections.COMPANIES, companyId)
    // if (!company) {
    //   return new NextResponse("Company not found", { status: 404 })
    // }

    // const drive = await insertOne(collections.DRIVES, {
    //   companyId,
    //   date: new Date(date),
    //   location,
    //   positions: Array.isArray(positions) ? positions : positions.split(",").map((p: string) => p.trim()),
    //   eligibility,
    //   description,
    //   status: status || "Upcoming",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // })

    // // Add company name to response
    // const driveWithCompany = {
    //   ...drive,
    //   company: { name: company.name },
    // }

    // return NextResponse.json(driveWithCompany)
    const data = await request.json()

    // Add timestamps
    const driveData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const newDrive = await insertOne(collections.DRIVES, driveData)
    return NextResponse.json(newDrive, { status: 201 })
  } catch (error) {
    console.error("Error creating drive:", error)
    return NextResponse.json({ error: "Failed to create drive" }, { status: 500 })
  }
}

