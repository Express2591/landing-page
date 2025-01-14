// src/app/api/cron/daily/route.ts
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createEmailTemplate } from '@/lib/emailTemplate';
import { Product } from '@/app/api/products/route';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  try {
    // Verify cron secret
    if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get all products and find today's product
    const products = await redis.hgetall('products');
    const today = new Date().toISOString().split('T')[0];
    const todayProduct = Object.values(products)
      .map(p => JSON.parse(p) as Product)
      .find(p => p.scheduledDate === today);

    if (!todayProduct) {
      return NextResponse.json({ error: 'No product scheduled for today' }, { status: 404 });
    }

    // Get subscribers and send emails
    const subscribers = await redis.smembers('subscribers');
    const results = [];

    for (const email of subscribers) {
      try {
        const result = await resend.emails.send({
          from: 'hello@lastingbuys.com',
          to: email,
          subject: `${todayProduct.name} - A Product That Lasts Forever`,
          html: createEmailTemplate(todayProduct, email),
        });
        results.push({ email, status: 'success', id: result.id });
      } catch (error) {
        results.push({ email, status: 'failed', error: error.message });
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Store analytics
    await redis.hset(`stats:sent:${today}`, {
      product: todayProduct.id,
      total: subscribers.length,
      success: results.filter(r => r.status === 'success').length,
    });

    return NextResponse.json({ 
      success: true, 
      results,
      product: todayProduct.name
    });

  } catch (error) {
    console.error('Daily email error:', error);
    return NextResponse.json({ error: 'Failed to send daily emails' }, { status: 500 });
  }
}