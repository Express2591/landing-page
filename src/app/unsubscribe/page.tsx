'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function UnsubscribePage() {
  const [status, setStatus] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleUnsubscribe = async () => {
    if (!email) {
      setStatus('Email is required');
      return;
    }

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setStatus('Successfully unsubscribed');
      } else {
        setStatus('Error unsubscribing. Please try again.');
      }
    } catch (error) {
      setStatus('Error unsubscribing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Unsubscribe</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="your@email.com"
            required
          />
        </div>

        <button
          onClick={handleUnsubscribe}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mb-4"
        >
          Unsubscribe
        </button>

        {status && (
          <div className={`text-center p-2 rounded ${
            status === 'Successfully unsubscribed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}