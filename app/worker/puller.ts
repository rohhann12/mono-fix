
import { redis } from "../../lib/redis";
export default async function worker(){
    while(true){
        const job=await redis.rpop("video_jobs");
    }
}