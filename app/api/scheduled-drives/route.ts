import { type NextRequest, NextResponse } from "next/server"
import { collections, findMany, insertOne } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    // const scheduledDrives = await findMany(
    //   collections.SCHEDULED_DRIVES,
    //   {},
    //   {
    //     sort: { date: -1 },
    //   },
    // )

    // // Fetch company names for each drive
    // const drivesWithCompany = await Promise.all(
    //   scheduledDrives.map(async (drive) => {
    //     const company = await findById(collections.COMPANIES, drive.companyId)
    //     return {
    //       ...drive,
    //       company: company ? { name: company.name } : { name: "Unknown" },
    //     }
    //   }),
    // )

    // return NextResponse.json(drivesWithCompany)
    const scheduledDrives = await findMany(collections.SCHEDULED_DRIVES)
    return NextResponse.json(scheduledDrives)
  } catch (error) {
    console.error("Error fetching scheduled drives:", error)
    return NextResponse.json({ error: "Failed to fetch scheduled drives" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    // const body = await req.json()

    // const { companyId, date, location, rounds, selectionProcedure, eligibilityCriteria, description, status } = body

    // if (!companyId || !date || !location || !rounds || !selectionProcedure || !eligibilityCriteria) {
    //   return new NextResponse("Missing required fields", { status: 400 })
    // }

    // // Check if company exists
    // const company = await findById(collections.COMPANIES, companyId)
    // if (!company) {
    //   return new NextResponse("Company not found", { status: 404 })
    // }

    // const scheduledDrive = await insertOne(collections.SCHEDULED_DRIVES, {
    //   companyId,
    //   date: new Date(date),
    //   location,
    //   rounds: Number(rounds),
    //   selectionProcedure,
    //   eligibilityCriteria,
    //   description,
    //   status: status || "Upcoming",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // })

    // // Add company name to response
    // const driveWithCompany = {
    //   ...scheduledDrive,
    //   company: { name: company.name },
    // }

    // return NextResponse.json(driveWithCompany)
    const data = await request.json()

    // Add timestamps
    const scheduledDriveData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const newScheduledDrive = await insertOne(collections.SCHEDULED_DRIVES, scheduledDriveData)
    return NextResponse.json(newScheduledDrive, { status: 201 })
  } catch (error) {
    console.error("Error creating scheduled drive:", error)
    return NextResponse.json({ error: "Failed to create scheduled drive" }, { status: 500 })
  }
}

