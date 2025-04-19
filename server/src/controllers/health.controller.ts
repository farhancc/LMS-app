 import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { redis } from '../utils/redis';
 export const healthcheck =async (req:Request, res:Response) => {
  const redisStatus = await redis.ping();
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({
    status: 'ok',
    redis: redisStatus,
    db: dbStatus
  });
}
