import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Make sure environment variables exist
    if (!process.env.CONVERTKIT_API_SECRET) {
      throw new Error('API Secret not configured');
    }

    const response = await fetch('https://api.convertkit.com/v3/forms/' + process.env.CONVERTKIT_FORM_ID + '/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_SECRET,
        email: email
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe');
    }

    return NextResponse.json({
      success: true
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}