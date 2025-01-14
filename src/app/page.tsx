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
      <div className="flex-1 px-4 flex flex-col max-w-md mx-auto w-full justify-between py-6">
        {/* Top Section */}
        <div>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Never Buy Cheap Junk Again
            </h1>
            
            <p className="text-xl text-gray-600">
              One daily email. One unbreakable product.
            </p>
          </div>

          {/* Centered Email Form */}
          {!submitted ? (
            <div className="bg-green-50 p-6 rounded-2xl shadow-lg mb-6">
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email..."
                  className="w-full p-4 text-lg border-2 border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white text-xl font-bold p-4 rounded-xl hover:bg-green-600 transition-transform hover:scale-105 transform"
                >
                  JOIN FREE
                </button>
              </form>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  50,000+ subscribers
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-100 p-6 rounded-xl text-center mb-6">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-xl font-bold text-green-800">Welcome to the Club!</div>
              <p className="text-green-700">Your first pick is on the way!</p>
            </div>
          )}
        </div>

        {/* Middle Section */}
        <div className="bg-gray-50 rounded-xl shadow-sm mb-6">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-bold">Today&apos;s Pick</div>
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                TRENDING
              </div>
            </div>
            <div className="relative w-full aspect-[16/9] mb-3">
              <Image 
                src="/stanley.jpg"
                alt="Stanley Thermos"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
            <div className="text-xl font-bold mb-2">Stanley Thermos</div>
            <div className="text-gray-600">
              Indestructible since 1913. Keeps drinks hot 24hrs.
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <ShoppingBag className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <span className="font-medium">Save Money</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <Timer className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <span className="font-medium">Quick Read</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <Star className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <span className="font-medium">Top Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}