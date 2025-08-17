import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";
import fs from "fs";

export default function ConvertMono(stream: any, userId: string) {
  const putHere = `/tmp/transcoding-${userId}-${Date.now()}.mp4`;

  return new Promise<string>((resolve, reject) => {
    const nodeStream = stream;

    ffmpeg(nodeStream)
      .audioFilters("channelmap=channel_layout=stereo:map=0-0|0-0")
      .outputOptions("-c:v copy") 
      .format("mp4")
      .save(putHere)
      .on("end", () => {
        console.log("Conversion finished:", putHere);
        resolve(putHere);
      })
      .on("error", (err) => {
        console.error("FFmpeg error:", err);
        reject(err);
      });
  });
}
