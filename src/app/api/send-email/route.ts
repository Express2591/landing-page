import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createEmailTemplate } from '@/lib/emailTemplate';
import { PRODUCTS } from '@/lib/products';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const subscribers = await redis.smembers('subscribers');
    const results = { sent: 0, failed: 0 };

    for (const email of subscribers) {
      try {
        await resend.emails.send({
          from: 'hello@lastingbuys.com',
          to: email,
          subject: `${product.name} - A Product That Lasts Forever`,
          html: createEmailTemplate(product, email)
        });
        results.sent++;
      } catch (error) {
        console.error(`Failed to send to ${email}:`, error);
        results.failed++;
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return NextResponse.json({
      sentCount: results.sent,
      failedCount: results.failed
    });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}