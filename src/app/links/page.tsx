'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const COOL_LINKS = [
  {
    title: "Tools & Tactics",
    url: "https://news.ycombinator.com/item?id=39731337",
    description: "What software tools and tactics improved your life in 2024?",
    source: "Hacker News"
  },
  {
    title: "The Perfect Tool Roll",
    url: "https://toolroll.net",
    description: "A database for finding the best version of any tool",
    source: "toolroll.net"
  },
  {
    title: "Buy It For Life Reddit",
    url: "https://reddit.com/r/buyitforlife",
    description: "Products that justify their premium price tag",
    source: "Reddit"
  },
  {
    title: "The Wirecutter Archives",
    url: "https://www.nytimes.com/wirecutter/deals/",
    description: "Best tools and products across categories",
    source: "NYTimes"
  },
  {
    title: "Project Farm",
    url: "https://www.youtube.com/@ProjectFarm",
    description: "In-depth product testing videos",
    source: "YouTube"
  }
];

export default function Links() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/confirmed" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Link>
          <h1 className="text-3xl font-bold mb-2">Cool Links</h1>
          <p className="text-gray-600">Interesting stuff we found while searching for quality products</p>
        </div>

        <div className="space-y-4">
          {COOL_LINKS.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{link.title}</h2>
                  <p className="text-gray-600 mb-2">{link.description}</p>
                </div>
                <span className="text-sm text-gray-400">{link.source}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}