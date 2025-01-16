import { NextResponse } from 'next/server';

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to subscribe');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}