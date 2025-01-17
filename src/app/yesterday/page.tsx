'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';

// This would come from your database/API in production
const YESTERDAYS_PICK = {
  name: "Snow Peak Titanium Mug",
  description: `The Snow Peak Titanium Double Wall 450 stands as the gold standard for outdoor drinkware. At just 4.8 ounces, it's incredibly lightweight yet virtually indestructible.

The double-wall construction keeps your drinks hot (or cold) far longer than single-wall alternatives, while the titanium construction means no metallic taste and no need to ever replace it.

What sets it apart is the perfect balance of features: light enough for backpacking, tough enough for everyday use, and elegant enough for your home coffee setup.`,
  image: "/snowpeak.jpg",
  price: "59.95",
  link: "https://www.snowpeak.com/collections/drinkware/products/titanium-double-wall-450-mug-mg-053",
  specs: [
    "Capacity: 450ml (15.2 fl oz)",
    "Weight: 4.8 oz (136g)",
    "Material: Ti-Double 600 Titanium",
    "Made in Japan",
    "Lifetime warranty"
  ]
};

export default function YesterdayPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/confirmed" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Link>
          <h1 className="text-3xl font-bold mb-2">Yesterday{"'"}s Pick</h1>
          <p className="text-gray-600">See what our subscribers received yesterday</p>
        </div>

        {/* Product Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Image */}
          <div className="relative aspect-video">
            <Image
              src={YESTERDAYS_PICK.image}
              alt={YESTERDAYS_PICK.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{YESTERDAYS_PICK.name}</h2>
              <div className="text-xl font-bold text-green-600">${YESTERDAYS_PICK.price}</div>
            </div>

            {/* Description */}
            <div className="prose prose-gray mb-6">
              {YESTERDAYS_PICK.description.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-600 mb-4">{paragraph}</p>
              ))}
            </div>

            {/* Specs */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold mb-2">Specifications</h3>
              <ul className="space-y-1">
                {YESTERDAYS_PICK.specs.map((spec, i) => (
                  <li key={i} className="text-gray-600">{spec}</li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href={YESTERDAYS_PICK.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
            >
              View on Snow Peak
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}