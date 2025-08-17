// app/api/create-user/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextResponse) {
  try {
    // Get userId from Clerk
    const { userId } = await auth();
    console.log("userId", userId);  // should print a string
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Fetch user info from Clerk
    const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch user from Clerk" }, { status: 500 });
    }

    const clerkUser = await res.json();

    // Try to create/upsert user in your DB
    let user;
    try {
      user = await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          name: clerkUser.firstName || clerkUser.lastName || "Anonymous",
        },
      });
    } catch (err: any) {
        console.log(err)
      // If table doesn't exist, skip DB write
      if (err.message.includes("does not exist")) {
        console.warn("User table does not exist, skipping DB insert.");
        return NextResponse.json({ id: userId, name: clerkUser.firstName || clerkUser.lastName || "Anonymous" });
      } else {
        throw err;
      }
    }

    return NextResponse.json(user);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
