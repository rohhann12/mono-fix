// app/api/spitout/route.ts
import { NextResponse, NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "../../../lib/prisma"
import worker from "../../../app/worker/puller"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await worker()

    if (result?.success && result.url && result.key) {
      await prisma.video.create({
        data: {
          url: result.url,
          userId,
        },
      })
    }

    return NextResponse.json(result, {
      status: result?.success ? 200 : 500,
    })
  } catch (err: any) {
    console.error("❌ Error in /api/spitout:", err)
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    )
  }
}
