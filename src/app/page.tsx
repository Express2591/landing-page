'use client';
import React, { useState, FormEvent } from 'react';
import { ShoppingBag, Timer, Star } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Add fake countdown timer
  const [timeLeft] = useState('23:41');

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
        {/* Urgency Banner */}
        <div className="bg-red-50 text-red-800 text-sm text-center py-2 px-4 rounded-lg mb-3 animate-pulse">
          ⚡️ Offer ends in {timeLeft} • 127 spots left today
        </div>

        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Never Buy Cheap Junk Again
          </h1>
          
          <p className="text-base text-gray-600">
            Get daily alerts about premium products <span className="line-through">($299/yr)</span> <span className="text-green-600 font-bold">FREE</span>
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email..."
                className="flex-1 p-3 text-lg border-2 border-green-500 rounded-xl"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-6 font-bold rounded-xl hover:bg-green-600 transition-colors whitespace-nowrap animate-pulse"
              >
                CLAIM NOW
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="flex">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <Star className="w-4 h-4 text-amber-500 fill-current" />
              </div>
              <p className="text-xs text-gray-500">
                Trusted by 50,000+ smart shoppers
              </p>
            </div>
          </form>
        ) : (
          <div className="bg-green-100 p-4 rounded-xl text-center mb-4">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-lg font-bold text-green-800">Spot Reserved!</div>
            <p className="text-green-700 text-sm">Check email for VIP access!</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl shadow-sm mb-4">
          <div className="relative bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-t-xl">
            TODAY'S FEATURED DEAL
          </div>
          <div className="p-4">
            <div className="relative w-full aspect-[4/3] mb-3">
              <Image 
                src="/stanley.jpg"
                alt="Stanley Thermos"
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                TRENDING
              </div>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                73 bought today
              </div>
            </div>
            <div className="text-xl font-bold mb-1 flex justify-between items-center">
              <span>Stanley Thermos</span>
              <div>
                <span className="text-gray-400 line-through text-sm">$50</span>
                <span className="text-green-600 ml-2">$35</span>
              </div>
            </div>
            <div className="text-gray-600 text-sm mb-2">
              Indestructible since 1913. Keeps drinks hot 24hrs.
            </div>
            <div className="bg-gray-100 rounded p-2 text-xs text-gray-600">
              "Mine's survived 10+ years of daily use" - James K.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-green-500 mb-1" />
            <span className="text-xs text-center">Save $1000s/yr</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
            <Timer className="w-5 h-5 text-green-500 mb-1" />
            <span className="text-xs text-center">30-sec daily read</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
            <Star className="w-5 h-5 text-green-500 mb-1" />
            <span className="text-xs text-center">Expert vetted</span>
          </div>
        </div>
      </div>
    </div>
  );
}