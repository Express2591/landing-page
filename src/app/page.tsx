'use client';
import React, { useState, FormEvent } from 'react';
import { CheckCheck, ShoppingBag, Timer } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get Great Products That Last Forever
          </h1>
          
          <p className="text-xl text-gray-600">
            One simple email each day. One amazing product that never breaks.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="text-lg font-semibold mb-2">Today&apos;s Pick</div>
          <div className="relative w-full h-48 mb-3">
            <Image 
              src="/stanley.jpg"
              alt="Stanley Thermos"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="text-xl font-bold mb-1">Stanley Thermos - $35</div>
          <div className="text-gray-600 text-sm">Keeps coffee hot for 24 hours. Survives being dropped. Made since 1913.</div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">Save money on stuff that lasts</span>
          </div>
          <div className="flex items-center gap-3">
            <Timer className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">Takes 1 minute to read each day</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">100% free forever</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email here"
              className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white text-lg font-bold p-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Send Me Good Products
            </button>
          </form>
        ) : (
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="text-xl font-bold text-green-800 mb-1">You&apos;re In! 🎉</div>
            <p className="text-green-700">Check your email tomorrow for your first product pick!</p>
          </div>
        )}
      </div>
    </div>
  );
}