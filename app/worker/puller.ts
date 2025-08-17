import { redis } from "../../lib/redis";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import ConvertMono from "../utils/ffmpeg";
import fs from "fs";
import PutObject from "../utils/reupload";

export default async function worker() {
  try {
    // Pop one job from Redis queue
    const jobRaw = await redis.rpop("video_jobs");
    if (!jobRaw) {
      console.log("⚠️ No job found in queue");
      return { success: false, message: "No job in queue" };
    }

    const job = JSON.parse(jobRaw);
    const { userId, key } = job;

    console.log("Processing job:", job);

    // Fetch from R2
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    const result = await r2.send(command);
    const stream = result.Body as any;

    // Convert mono to stereo with ffmpeg
    const outputFile = await ConvertMono(stream, userId);

    // Upload the processed file back to R2
    const newKey = `transcoding/${userId}/${Date.now()}.mp4`;
    const fileUrl = await PutObject(newKey, outputFile);

    fs.unlinkSync(outputFile);

    console.log(`✅ Job done: ${newKey}`);
    console.log("File URL:", fileUrl);

    return { success: true, key: newKey, url: fileUrl, userId };
  } catch (error) {
    console.error("❌ Worker error:", error);
    return { success: false, error: (error as Error).message };
  }
}
