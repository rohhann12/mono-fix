import worker from "@/app/worker/puller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    const result = await worker();

    if (result.success && result.url && result.key) {
      await prisma.video.create({
        data: {
          url: result.url,   
          key: result.key,   
          userId: userId,
        },
      });
    }

    return new NextResponse(
      JSON.stringify(result),
      { status: result?.success ? 200 : 500 }
    );
  } catch (err: any) {
    console.error("Error in /api/process-job:", err);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", details: err.message }),
      { status: 500 }
    );
  }
}
