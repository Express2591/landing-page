'use client';
import React from 'react';
import { ArrowRight, Coffee, Github } from 'lucide-react';
import Link from 'next/link';

const COOL_LINKS = [
  {
    title: "All Previous Picks →",
    description: "See every product we&apos;ve ever featured",
    url: "/archive",
    color: "bg-blue-500"
  },
  {
    title: "Today&apos;s Pick →",
    description: "Don&apos;t wait for the email, see it now",
    url: "/today",
    color: "bg-green-500"
  },
  {
    title: "Behind the Scenes →",
    description: "How we find these products",
    url: "/process",
    color: "bg-purple-500"
  }
];

export default function ConfirmedPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎉</div>
          <h1 className="text-2xl font-bold mb-2">You&apos;re In!</h1>
          <p className="text-gray-600">Your first pick arrives tomorrow at 11am EST</p>
        </div>

        <div className="space-y-4">
          {COOL_LINKS.map((link) => (
            <Link 
              href={link.url} 
              key={link.title}
              className={`block ${link.color} text-white p-4 rounded-xl hover:scale-105 transition-transform`}
            >
              <div className="font-bold text-lg">{link.title}</div>
              <div className="text-white/90 text-sm">{link.description}</div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="text-sm text-gray-500 mb-4">Join 12,472 quality hunters</div>
          
          <div className="flex justify-center gap-4">
            <a 
              href="https://twitter.com/intent/tweet?text=Just%20joined%20@LastingBuys%20to%20discover%20products%20that%20last%20forever%20%F0%9F%8E%AF"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Share <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/lastingbuys/picks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              GitHub <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://buymeacoffee.com/lastingbuys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Support <Coffee className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}