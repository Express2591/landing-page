import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!process.env.CONVERTKIT_API_KEY) {
      throw new Error('API Key not configured');
    }

    // Using form ID 7574436 based on your ConvertKit URL
    const response = await fetch('https://api.convertkit.com/v3/forms/7574436/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: email
      }),
    });

    const data = await response.json();
    console.log('ConvertKit Response:', data); // Debug log

    if (!response.ok) {
      console.error('ConvertKit Error:', data); // Debug log
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