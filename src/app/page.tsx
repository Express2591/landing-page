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
      <div className="flex-1 px-4 pt-3 flex flex-col max-w-md mx-auto w-full">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Never Buy Cheap Junk Again
          </h1>
          
          <p className="text-base text-gray-600">
            One daily email. One unbreakable product.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email..."
                className="flex-1 p-3 text-base border-2 border-green-500 rounded-xl"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 font-bold rounded-xl hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                JOIN
              </button>
            </div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <div className="flex">
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <Star className="w-3 h-3 text-amber-500 fill-current" />
              </div>
              <p className="text-xs text-gray-500">
                50,000+ subscribers
              </p>
            </div>
          </form>
        ) : (
          <div className="bg-green-100 p-3 rounded-xl text-center mb-3">
            <div className="text-lg font-bold text-green-800">You&apos;re In! 🎯</div>
            <p className="text-green-700 text-sm">First pick coming tomorrow!</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl shadow-sm mb-3">
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="text-base font-semibold">Today&apos;s Pick</div>
              <div className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                TRENDING
              </div>
            </div>
            <div className="relative w-full aspect-[16/9] mb-2">
              <Image 
                src="/stanley.jpg"
                alt="Stanley Thermos"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
            <div className="font-bold mb-1">Stanley Thermos</div>
            <div className="text-gray-600 text-sm">
              Indestructible since 1913. Keeps drinks hot 24hrs.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
            <ShoppingBag className="w-4 h-4 text-green-500 mb-1" />
            <span className="text-xs text-center">Save Money</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
            <Timer className="w-4 h-4 text-green-500 mb-1" />
            <span className="text-xs text-center">Quick Read</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
            <Star className="w-4 h-4 text-green-500 mb-1" />
            <span className="text-xs text-center">Top Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}