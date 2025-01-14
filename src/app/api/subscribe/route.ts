import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

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
      from: 'onboarding@resend.dev', // You'll change this to your domain later
      to: email,
      subject: 'Welcome to Daily Product Picks!',
      html: `
        <div>
          <h1>Welcome to Daily Product Picks!</h1>
          <p>Thanks for subscribing! You'll receive your first product recommendation tomorrow.</p>
          <p>We hunt for products that are:</p>
          <ul>
            <li>Built to last</li>
            <li>Worth every penny</li>
            <li>Highly rated by real users</li>
          </ul>
        </div>
      `
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