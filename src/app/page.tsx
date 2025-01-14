'use client';
import React, { useState, FormEvent } from 'react';
import { CheckCheck, ShoppingBag, Timer } from 'lucide-react';

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
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-4 py-6 flex flex-col max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 px-4">
            Get Great Products That Last Forever
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            One simple email each day. One amazing product that never breaks.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl shadow-sm mb-8">
          <div className="p-4">
            <div className="text-lg font-semibold mb-3">Today&apos;s Pick</div>
            <div className="relative w-full aspect-[4/3] mb-4">
              <img 
                src="/stanley.jpg"
                alt="Stanley Thermos"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="text-xl font-bold mb-2">Stanley Thermos - $35</div>
            <div className="text-gray-600">
              Keeps coffee hot for 24 hours. Survives being dropped. Made since 1913.
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-4 p-2">
            <ShoppingBag className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">Save money on stuff that lasts</span>
          </div>
          <div className="flex items-center gap-4 p-2">
            <Timer className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">Takes 1 minute to read each day</span>
          </div>
          <div className="flex items-center gap-4 p-2">
            <CheckCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">100% free forever</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email here"
              className="w-full p-4 text-lg border border-gray-300 rounded-xl"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white text-xl font-bold p-4 rounded-xl hover:bg-green-600 transition-colors"
            >
              Send Me Good Products
            </button>
          </form>
        ) : (
          <div className="bg-green-100 p-6 rounded-xl">
            <div className="text-xl font-bold text-green-800 mb-2">You&apos;re In! 🎉</div>
            <p className="text-green-700">Check your email tomorrow for your first product pick!</p>
          </div>
        )}
      </div>
    </div>
  );
}