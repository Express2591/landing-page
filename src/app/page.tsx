'use client';
import React, { useState, FormEvent } from 'react';
import { CheckCheck, ShoppingBag, Timer, Star, Lock } from 'lucide-react';
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
      <div className="flex-1 px-4 py-6 flex flex-col max-w-md mx-auto w-full">
        {/* Social Proof Banner */}
        <div className="bg-green-50 text-green-800 text-sm text-center py-2 px-4 rounded-lg mb-6 animate-pulse">
          🔥 2,947 smart shoppers joined this week
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 px-4">
            Get Elite Products That Actually Last
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Stop wasting money on junk that breaks. 
          </p>
          <p className="text-lg text-gray-500">
            One email per day. One unbreakable product.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl shadow-sm mb-8">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-semibold">Today&apos;s Unbreakable Pick</div>
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
            <div className="text-gray-600 mb-2">
              Keeps coffee hot for 24 hours. Survives being dropped. Made since 1913.
            </div>
            <div className="text-sm text-red-500 font-medium">
              ⚡️ 73 people bought this in the last 24 hours
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">Never buy the wrong product again</span>
          </div>
          <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
            <Timer className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">30-second daily read (that saves $$$)</span>
          </div>
          <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
            <Lock className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">Free VIP access (limited time)</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email for instant access ✨"
              className="w-full p-4 text-lg border-2 border-green-500 rounded-xl"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white text-xl font-bold p-4 rounded-xl hover:bg-green-600 transition-colors transform hover:scale-105 duration-200"
            >
              YES! SEND ME THE BEST PRODUCTS 🎯
            </button>
            <p className="text-xs text-center text-gray-500">
              Join 50,000+ smart shoppers. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="bg-green-100 p-6 rounded-xl text-center">
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-xl font-bold text-green-800 mb-2">You&apos;re In!</div>
            <p className="text-green-700">Your first unbreakable product recommendation is on the way!</p>
          </div>
        )}
      </div>
    </div>
  );
}