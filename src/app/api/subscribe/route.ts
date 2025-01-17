import { NextResponse } from 'next/server';

const API_SECRET = process.env.CONVERTKIT_API_SECRET;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    console.log('Processing email:', email); // Debug log

    // Simple subscriber creation
    const response = await fetch(
      'https://api.convertkit.com/v3/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_secret: API_SECRET,
          email: email,
        }),
      }
    );

    const data = await response.json();
    console.log('ConvertKit Response:', data); // Debug log

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}