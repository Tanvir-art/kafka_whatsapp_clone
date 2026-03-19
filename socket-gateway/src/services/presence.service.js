import { redis } from "../config/redis.js";

export const setOnline = async (userId ,  socketId)=>{
    await redis.set(`online:${userId}` , socketId);
}

export const setOffline = async (userId)=>{
    await redis.del(`online:${userId}`);
}

export const getUserSocket = async (userId)=>{
    return await redis.get(`online:${userId}`);
}