import { Redis } from "ioredis";
import logger from "src/utils/logger.util.js";

const redisURI = process.env.REDIS_URI;
const redis = new Redis(redisURI as string);

// IOredis connects to Redis automatically on instantiation

export default redis;
