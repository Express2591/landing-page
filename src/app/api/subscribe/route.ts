import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();
  const apiKey = process.env.BEEHIIV_API_KEY; // Store securely without NEXT_PUBLIC
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    return NextResponse.json({ error: 'Missing API key or Publication ID' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: data.error || 'Subscription failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}