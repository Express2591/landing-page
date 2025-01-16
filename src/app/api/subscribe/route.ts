import { NextResponse } from 'next/server';

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    console.log('Attempting to subscribe:', { email, FORM_ID });

    // Changed to use the form subscription endpoint
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_secret: CONVERTKIT_API_KEY, // Changed from api_key to api_secret
          email: email,
          fields: {} // Optional custom fields
        }),
      }
    );

    const responseData = await response.json();
    console.log('ConvertKit Response:', responseData);

    if (!response.ok) {
      console.error('ConvertKit error:', responseData);
      throw new Error(JSON.stringify(responseData));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscription error:', err);
    return NextResponse.json(
      { 
        error: 'Failed to subscribe',
        details: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}