'use client';
import React, { useState } from 'react';
import { CheckCheck, ShoppingBag, Timer } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get Great Products That Last Forever
        </h1>
        
        <p className="text-2xl text-gray-600 mb-8">
          One simple email each day. One amazing product that never breaks.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
          <div className="text-lg font-semibold mb-2">Example: Yesterday's Pick</div>
          <img 
            src="/api/placeholder/400/300"
            alt="Example product"
            className="w-full rounded-lg mb-4"
          />
          <div className="text-xl font-bold mb-2">Stanley Thermos - $35</div>
          <div className="text-gray-600">Keeps coffee hot for 24 hours. Survives being dropped. Made since 1913.</div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-green-500" />
            <span className="text-xl">Save money on stuff that lasts</span>
          </div>
          <div className="flex items-center gap-3">
            <Timer className="w-8 h-8 text-green-500" />
            <span className="text-xl">Takes 1 minute to read each day</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCheck className="w-8 h-8 text-green-500" />
            <span className="text-xl">100% free forever</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email here"
              className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white text-xl font-bold p-4 rounded-lg hover:bg-green-600"
            >
              Send Me Good Products
            </button>
          </form>
        ) : (
          <div className="bg-green-100 p-6 rounded-lg">
            <div className="text-2xl font-bold text-green-800 mb-2">You're In! 🎉</div>
            <p className="text-green-700">Check your email tomorrow for your first product pick!</p>
          </div>
        )}
      </div>
    </div>
  );
}