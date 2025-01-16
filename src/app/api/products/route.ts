import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { Product } from '@/lib/products';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

// Get all products
export async function GET() {
  try {
    const products = await redis.hgetall('products');
    if (!products) {
      return NextResponse.json([]);
    }
    
    const parsedProducts = Object.values(products).map(p => {
      try {
        return JSON.parse(p as string);
      } catch {
        return null;
      }
    }).filter(p => p !== null);

    return NextResponse.json(parsedProducts);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    );
  }
}

// Add new product
export async function POST(request: Request) {
  try {
    const product: Product = await request.json();
    
    if (!product.id) {
      product.id = Date.now();
    }
    
    if (!product.addedDate) {
      product.addedDate = new Date().toISOString();
    }
    
    await redis.hset('products', {
      [product.id]: JSON.stringify(product)
    });
    
    return NextResponse.json({ 
      success: true, 
      product 
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to add product' }, 
      { status: 500 }
    );
  }
}

// Update product
export async function PUT(request: Request) {
  try {
    const product: Product = await request.json();
    
    if (!product.id) {
      return NextResponse.json(
        { error: 'Product ID is required' }, 
        { status: 400 }
      );
    }
    
    await redis.hset('products', {
      [product.id]: JSON.stringify(product)
    });
    
    return NextResponse.json({ 
      success: true, 
      product 
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update product' }, 
      { status: 500 }
    );
  }
}

// Delete product
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' }, 
        { status: 400 }
      );
    }
    
    await redis.hdel('products', id.toString());
    
    return NextResponse.json({ 
      success: true, 
      id 
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete product' }, 
      { status: 500 }
    );
  }
}