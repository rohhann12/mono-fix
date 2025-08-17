import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";
import fs from "fs";

export default function ConvertMono(stream: any, userId: string) {
  const putHere = `/tmp/transcoding-${userId}-${Date.now()}.mp4`;

  return new Promise<string>((resolve, reject) => {
    // ensure stream is Node.js Readable
    const nodeStream =
      stream instanceof Readable ? stream : Readable.fromWeb(stream);

    ffmpeg(nodeStream)
      // 🔑 duplicate mono audio into 2 channels (stereo)
      .audioFilters("channelmap=channel_layout=stereo:map=0-0|0-0")
      .outputOptions("-c:v copy") // copy video without re-encoding
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
