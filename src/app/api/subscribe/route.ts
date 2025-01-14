import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple product database to start with
const products = [
  {
    name: "Stanley Thermos",
    price: 35,
    description: "Keeps coffee hot for 24 hours. Survives being dropped. Made since 1913.",
    imageUrl: "https://lastingbuys.com/stanley.jpg", // Update with your actual image URL
    purchaseUrl: "https://amzn.to/stanley" // Update with your affiliate link
  },
  // Add more products...
];

export async function GET(request: Request) {
  try {
    // Verify this is actually coming from Vercel Cron
    if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get all subscribers
    const subscribers = await redis.smembers('subscribers');
    
    // Get today's product (cycles through products)
    const today = new Date();
    const productIndex = today.getDate() % products.length;
    const product = products[productIndex];

    // Send email to each subscriber
    for (const email of subscribers) {
      await resend.emails.send({
        from: 'hello@lastingbuys.com',
        to: email,
        subject: `${product.name} - A Product That Lasts Forever`,
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1>${product.name} - $${product.price}</h1>
            <p>${product.description}</p>
            <a href="${product.purchaseUrl}" 
               style="background-color: #22c55e; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Check it out
            </a>
          </div>
        `
      });
    }

    return NextResponse.json({ 
      success: true, 
      emailsSent: subscribers.length,
      product: product.name 
    });
  } catch (error) {
    console.error('Daily email error:', error);
    return NextResponse.json({ error: 'Failed to send daily emails' }, { status: 500 });
  }
}