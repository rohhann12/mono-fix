// app/api/hello/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
    console.log("User ID:", userId);
    console.log("Auth details:", auth());
    // console.log("Auth session:", auth().protect);
  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ message: `Hello, user ${userId}` });
}
    