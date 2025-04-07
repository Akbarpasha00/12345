import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { generateSummary } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { data } = body

    if (!data) {
      return new NextResponse("Missing data", { status: 400 })
    }

    const summary = await generateSummary(data)

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("[GEMINI_SUMMARY_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

