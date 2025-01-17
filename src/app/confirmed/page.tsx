'use client';
import React from 'react';
import Link from 'next/link';

const LINKS = [
  {
    title: "Cool Links →",
    description: "Interesting stuff we found on the internet",
    url: "/links",
    color: "bg-[#4285f4]"
  },
  {
    title: "Yesterday's Pick →",
    description: "See what others got yesterday",
    url: "/yesterday",
    color: "bg-[#34a853]"
  },
  {
    title: "Share LastingBuys →",
    description: "Tell your friends about us",
    url: "https://twitter.com/intent/tweet?text=Just%20joined%20@LastingBuys%20to%20discover%20products%20that%20last%20forever%20%F0%9F%8E%AF",
    color: "bg-[#a142f4]"
  }
];

export default function ConfirmedPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎉</div>
          <h1 className="text-2xl font-bold mb-2">You{"'"}re In!</h1>
          <p className="text-gray-600">Your first pick arrives tomorrow at 11am EST</p>
        </div>

        <div className="space-y-4">
          {LINKS.map((link) => (
            <Link 
              href={link.url} 
              key={link.title}
              className={`block ${link.color} text-white p-6 rounded-2xl hover:opacity-95 transition-opacity`}
            >
              <div className="font-bold text-xl">{link.title}</div>
              <div className="text-white/90">{link.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}