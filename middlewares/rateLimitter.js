import client from '../utils/redisClient.js';

export const rateLimitter = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate-limit:${ip}`;
  const limit = 100;
  const windowTime = 15 * 60;
  const requests = await client.incr(key);
  if (requests === 1) {
    await client.expire(key, windowTime);
  }
  if (requests > limit) {
    return res.status(429).json({ msg: 'Too many requests, try again later' });
  }
  next();
};
