import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisConnection = () =>
  redis.createClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
    password: process.env.REDIS_PASSWORD,
  });

export default redisConnection;
