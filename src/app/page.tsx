'use client';
import React, { useState, FormEvent } from 'react';
import { ShoppingBag, Timer, Star } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-4 pt-4 flex flex-col max-w-md mx-auto w-full">
        {/* Social Proof Banner */}
        <div className="bg-green-50 text-green-800 text-sm text-center py-2 px-4 rounded-lg mb-4 animate-pulse">
          🔥 2,947 people joined today
        </div>

        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Get Elite Products That Actually Last
          </h1>
          
          <p className="text-base text-gray-600">
            One daily email. One unbreakable product.
          </p>
        </div>

        {/* Move signup form up */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="flex-1 p-3 text-lg border-2 border-green-500 rounded-xl"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-6 font-bold rounded-xl hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                Join Free
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              Join 50,000+ smart shoppers. Instant access.
            </p>
          </form>
        ) : (
          <div className="bg-green-100 p-4 rounded-xl text-center mb-6">
            <div className="text-2xl mb-1">🎉</div>
            <div className="text-lg font-bold text-green-800">You&apos;re In!</div>
            <p className="text-green-700 text-sm">First product recommendation coming up!</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl shadow-sm mb-6">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-semibold">Today&apos;s Pick</div>
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] mb-4">
              <Image 
                src="/stanley.jpg"
                alt="Stanley Thermos"
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                VIRAL
              </div>
            </div>
            <div className="text-xl font-bold mb-2 flex justify-between items-center">
              <span>Stanley Thermos</span>
              <span className="text-green-600">$35</span>
            </div>
            <div className="text-gray-600 text-sm">
              Keeps coffee hot for 24 hours. Survives being dropped. Made since 1913.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-sm">Save money</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <Timer className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-sm">30-sec read</span>
          </div>
        </div>
      </div>
    </div>
  );
}