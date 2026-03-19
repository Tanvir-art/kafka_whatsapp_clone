import redis from 'ioredis';

export const redis = new redis({
    host: 'localhost',
    port: 6379,
});

redis.on("connect", () => {
  console.log("Redis connected");
});