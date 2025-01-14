import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  
  // Get all stats
  const opens = await redis.hgetall(`stats:opens:${today}`);
  const clicks = await redis.hgetall(`stats:clicks:${today}`);
  const sends = await redis.hgetall(`stats:sent:${today}`);

  return NextResponse.json({
    opens,
    clicks,
    sends
  });
}