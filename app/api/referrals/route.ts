import { type NextRequest, NextResponse } from "next/server"
import { collections, findMany, insertOne } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    // const referrals = await findMany(
    //   collections.REFERRALS,
    //   {},
    //   {
    //     sort: { createdAt: -1 },
    //   },
    // )

    // // Fetch candidate and referrer details for each referral
    // const referralsWithDetails = await Promise.all(
    //   referrals.map(async (referral) => {
    //     const candidate = await findById(collections.CANDIDATES, referral.candidateId)
    //     const referrer = await findById(collections.USERS, referral.referrerId)

    //     return {
    //       ...referral,
    //       candidate: candidate
    //         ? {
    //             name: candidate.name,
    //             email: candidate.email,
    //           }
    //         : null,
    //       referrer: referrer
    //         ? {
    //             name: referrer.name,
    //             email: referrer.email,
    //           }
    //         : null,
    //     }
    //   }),
    // )

    // return NextResponse.json(referralsWithDetails)
    const referrals = await findMany(collections.REFERRALS)
    return NextResponse.json(referrals)
  } catch (error) {
    console.error("Error fetching referrals:", error)
    return NextResponse.json({ error: "Failed to fetch referrals" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    // const body = await req.json()

    // const { candidateId, notes } = body

    // if (!candidateId) {
    //   return new NextResponse("Missing required fields", { status: 400 })
    // }

    // // Check if candidate exists
    // const candidate = await findById(collections.CANDIDATES, candidateId)
    // if (!candidate) {
    //   return new NextResponse("Candidate not found", { status: 404 })
    // }

    // const referral = await insertOne(collections.REFERRALS, {
    //   candidateId,
    //   referrerId: session.user.id,
    //   notes,
    //   status: "Pending",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // })

    // // Fetch candidate and referrer details
    // const candidateDetails = {
    //   name: candidate.name,
    //   email: candidate.email,
    // }

    // const referrerDetails = {
    //   name: session.user.name,
    //   email: session.user.email,
    // }

    // const referralWithDetails = {
    //   ...referral,
    //   candidate: candidateDetails,
    //   referrer: referrerDetails,
    // }

    // return NextResponse.json(referralWithDetails)
    const data = await request.json()

    // Add timestamps
    const referralData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const newReferral = await insertOne(collections.REFERRALS, referralData)
    return NextResponse.json(newReferral, { status: 201 })
  } catch (error) {
    console.error("Error creating referral:", error)
    return NextResponse.json({ error: "Failed to create referral" }, { status: 500 })
  }
}

