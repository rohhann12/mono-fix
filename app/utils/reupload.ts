// utils/reupload.ts
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import fs from "fs";

export default async function PutObject(key: string, outputFile: string) {
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: fs.createReadStream(outputFile),
      ContentType: "video/mp4",
    })
  );

  const url = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${key}`;
  return url;
}
