'use client';
import React, { useState, useEffect, FormEvent } from 'react';
import { ShoppingBag, Timer, Star } from 'lucide-react';
import Image from 'next/image';

// Sample products array showcasing American small-mid size businesses
const PRODUCTS = [
  {
    id: 1,
    name: "North American Hardwood Cutting Board",
    description: "Small-town New England produced cutting boards since 1944",
    image: "/cuttingboard.jpg"
  },
  {
    id: 2, 
    name: "Tin Cloth Jacket",
    description: "Crafted by Filson in Seattle since 1897, this rugged, waxed canvas jacket is built for lifelong durability in harsh outdoor conditions.",
    image: "/filsonjacket.jpg"
  },
  {
    id: 3,
    name: "Windproof Lighter",
    description: "Handcrafted by Zippo in Bradford, PA since 1932, this iconic metal lighter offers unmatched durability with a lifetime guarantee.",
    image: "/zippolighter.jpg"
  }
];

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(0);

  // Auto rotate products every 3 seconds with slide animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % PRODUCTS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

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
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-4 flex flex-col max-w-md mx-auto w-full justify-between py-6">
        <div>
          <div className="text-center mb-6">
            {/* Replace h1 and p with smaller Image component */}
            <Image
              src="/makers-on-mainstreet-logo.jpg"
              alt="Makers on Mainstreet Logo"
              width={150} // Reduced from 200 to 150
              height={75}  // Reduced from 100 to 75
              className="mx-auto"
            />
            <p className="text-xl text-gray-600">
              Discover American craftsmanship, one story at a time.
            </p>
          </div>

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
                  Join supporters of American makers
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-100 p-6 rounded-xl text-center mb-6">
              <div className="text-2xl mb-2">&ldquo;✨&rdquo;</div>
              <div className="text-xl font-bold text-green-800">Almost there!</div>
              <p className="text-green-700 mb-2">Please check your email to confirm your subscription.</p>
              <p className="text-sm text-green-600">Can&apos;t find it? Check your spam folder for an email from &ldquo;Makers on Mainstreet&rdquo;</p>
            </div>
          )}
        </div>

        {/* Rotating Recent Picks with slide animation */}
        <div className="bg-gray-50 rounded-xl shadow-sm mb-6">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-bold text-black">Featured Makers</div>
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                CRAFTSMANSHIP
              </div>
            </div>
            <div className="relative w-full aspect-[16/9] mb-3 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentProduct * 100}%)` }}
              >
                {PRODUCTS.map((product, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                    <div className="text-xl font-bold mb-2 text-black transition-all duration-300">
                      {product.name}
                    </div>
                    <div className="text-gray-600 text-black transition-all duration-300">
                      {product.description}
                    </div>
                  </div>
                ))}
              </div>
              {/* Dots indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {PRODUCTS.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentProduct ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <ShoppingBag className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <span className="font-medium text-black">Support Small Biz</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <Timer className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <span className="font-medium text-black">Quick Read</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <Star className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <span className="font-medium text-black">Lasting Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}