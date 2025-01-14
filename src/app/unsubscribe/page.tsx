'use client';
import { useState } from 'react';

export default function UnsubscribePage() {
  const [status, setStatus] = useState('');

  const handleUnsubscribe = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) return;

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        setStatus('Successfully unsubscribed');
      } else {
        setStatus('Error unsubscribing');
      }
    } catch (error) {
      setStatus('Error unsubscribing');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Unsubscribe</h1>
        <p className="mb-4">Are you sure you want to unsubscribe from daily product picks?</p>
        <button
          onClick={handleUnsubscribe}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Yes, Unsubscribe
        </button>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
}