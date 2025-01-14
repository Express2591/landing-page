// src/app/api/track/open/route.ts
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sid = searchParams.get('sid');
  const pid = searchParams.get('pid');

  if (sid && pid) {
    await redis.hincrby(`stats:opens:${pid}`, sid, 1);
  }

  // Return a 1x1 transparent GIF
  return new Response(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'), {
    headers: {
      'Content-Type': 'image/gif',
    },
  });
}