import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import type { Product } from '@/types';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

export async function GET() {
  const products = await redis.hgetall('products');
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product: Product = await request.json();
  
  // Add id and date if not present
  product.id = product.id || `prod_${Date.now()}`;
  product.addedDate = product.addedDate || new Date().toISOString();
  
  await redis.hset('products', {
    [product.id]: JSON.stringify(product)
  });
  
  return NextResponse.json({ success: true, product });
}