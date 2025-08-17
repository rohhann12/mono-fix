// app/api/files/route.ts
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"   // adjust if your prisma client is elsewhere

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    } 
    
    // fetch all files belonging to this user
    const files = await prisma.video.findMany({
      where: { userId },
      select: {
        id:true,
        url: true,
      },
      orderBy: { uploadedAt: "desc" },
    })

    return NextResponse.json({ files })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
