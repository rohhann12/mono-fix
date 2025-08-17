import { NextResponse, NextRequest } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../../../lib/r2";
import { auth } from "@clerk/nextjs/server";
import { redis } from "../../../lib/redis";
import { prisma } from "../../../lib/prisma"; 

export async function POST(req: NextRequest) {
  try {
    // Clerk auth
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `uploads/${userId}/${Date.now()}-${file.name}`;

    const uploadLogic = await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    if (!uploadLogic) {
      return NextResponse.json({ message: "upload error" }, { status: 500 });
    }

    const fileUrl = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${key}`;

    await redis.lpush(
      "video_jobs",
      JSON.stringify({
        userId,
        key,
        url: fileUrl,
        uploadedAt: Date.now(),
      })
    );
    const video = await prisma.video.create({
      data: {
        url: fileUrl,
        key,
        user: {
          connectOrCreate: {
            where: { id: userId },
            create: {
              id: userId,
              name: "any", //not really important
              count: 0,
            },
          },
        },
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { count: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      video,
    });
  } catch (err: any) {
    console.error("Upload failed:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}
