import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Remove email from subscribers set
    await redis.srem('subscribers', email);
    
    return NextResponse.json({ 
      success: true,
      message: 'Successfully unsubscribed'
    });
  } catch {
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to unsubscribe' 
      }, 
      { status: 500 }
    );
  }
}