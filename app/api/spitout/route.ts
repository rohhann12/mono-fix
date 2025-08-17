// app/api/process-job/route.ts
import worker from "@/app/worker/puller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
    const { userId } = await auth();

    if (!userId) {
        return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401 }
        );
    }

    const result = await worker();

    return new NextResponse(
        JSON.stringify(result),
        { status: result.success ? 200 : 500 }
    );
}
