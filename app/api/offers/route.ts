import { type NextRequest, NextResponse } from "next/server"
import { collections, findMany, insertOne } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    const offers = await findMany(collections.OFFERS)

    // Fetch company names for each offer
    // const offersWithCompany = await Promise.all(
    //   offers.map(async (offer) => {
    //     const company = await findById(collections.COMPANIES, offer.companyId)
    //     return {
    //       ...offer,
    //       company: company ? { name: company.name } : { name: "Unknown" },
    //     }
    //   }),
    // )

    return NextResponse.json(offers)
  } catch (error) {
    console.error("Error fetching offers:", error)
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    const data = await request.json()

    // Add timestamps
    const offerData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const newOffer = await insertOne(collections.OFFERS, offerData)
    return NextResponse.json(newOffer, { status: 201 })
  } catch (error) {
    console.error("Error creating offer:", error)
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 })
  }
}

