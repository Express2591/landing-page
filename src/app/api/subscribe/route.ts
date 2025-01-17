import { NextResponse } from 'next/server';

const API_SECRET = process.env.CONVERTKIT_API_SECRET;
const API_URL = 'https://api.convertkit.com/v3/subscribers';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!API_SECRET) {
      throw new Error('ConvertKit API Secret not configured');
    }

    const convertKitResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: API_SECRET,
        subscriber: {
          email: email,
        },
      }),
    });

    if (!convertKitResponse.ok) {
      const errorData = await convertKitResponse.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await convertKitResponse.json();
    
    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('ConvertKit API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}