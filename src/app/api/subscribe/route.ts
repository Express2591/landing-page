import { NextResponse } from 'next/server';

const API_SECRET = process.env.CONVERTKIT_API_SECRET;
const SEQUENCE_ID = process.env.CONVERTKIT_SEQUENCE_ID;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // First, create/activate the subscriber
    const subscriberResponse = await fetch(
      'https://api.convertkit.com/v3/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_secret: API_SECRET,
          email,
          status: 'active'  // explicitly set as active
        }),
      }
    );

    const subscriberData = await subscriberResponse.json();
    console.log('Subscriber Creation Response:', subscriberData);

    if (!subscriberResponse.ok) {
      throw new Error('Failed to create subscriber');
    }

    // Then add them to the sequence
    const sequenceResponse = await fetch(
      `https://api.convertkit.com/v3/sequences/${SEQUENCE_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_secret: API_SECRET,
          subscriber_id: subscriberData.subscriber.id
        }),
      }
    );

    const sequenceData = await sequenceResponse.json();
    console.log('Sequence Subscription Response:', sequenceData);

    if (!sequenceResponse.ok) {
      throw new Error('Failed to add to sequence');
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