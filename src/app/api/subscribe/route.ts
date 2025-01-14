import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createEmailTemplate } from '../../../lib/emailTemplate';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Store email in Redis
    await redis.sadd('subscribers', email);

    // Send welcome email
    await resend.emails.send({
      from: 'hello@lastingbuys.com',
      to: email,
      subject: 'Welcome to Daily Product Picks!',
      html: createEmailTemplate({
        id: 'welcome',
        name: 'Welcome',
        price: 0,
        description: 'Thanks for subscribing!',
        features: [],
        imageUrl: '',
        purchaseUrl: '',
        category: 'welcome',
        addedDate: new Date().toISOString()
      }, email)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}