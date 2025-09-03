'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export default function SignUpComplete() {
  return (
    <>
      {/* Google Tag (gtag.js) for Google Ads tracking */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17527731205"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17527731205');
          gtag('event', 'sign_up', {
            method: 'email',
            event_category: 'engagement',
            event_label: 'newsletter_signup'
          });
        `}
      </Script>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-4 flex flex-col max-w-md mx-auto w-full justify-between py-6">
          <div>
            <div className="text-center mb-6">
              <Link href="/">
            <Image 
              src="/makers-on-mainstreet-logo.jpg"
              alt="Makers on Mainstreet Logo"
              width={150}
              height={75}
              className="mx-auto"
            />
          </Link>
              <p className="text-xl text-gray-600">
                Discover hidden American companies making products that last a lifetime
              </p>
            </div>

            <div className="bg-green-100 p-6 rounded-xl text-center mb-6 shadow-lg">
              <div className="text-2xl mb-2">✨</div>
              <div className="text-xl font-bold text-green-800">Welcome to Makers on Mainstreet!</div>
              <p className="text-green-700 mb-4">Your subscription is confirmed! Expect our free newsletter every Tuesday & Saturday.</p>
              <p className="text-sm text-green-600">Can&apos;t find our emails? Check your spam folder for &ldquo;Makers on Mainstreet&rdquo; or add us to your contacts.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg mb-6">
              <h2 className="text-lg font-bold text-black text-center mb-4">WHAT TO EXPECT</h2>
              <div className="flex flex-col gap-4 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  Discover family-owned American businesses crafting high-quality, durable products.
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Get exclusive recommendations and stories delivered straight to your inbox.
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Join a community passionate about supporting small businesses with big impact.
                </p>
              </div>
            </div>
          </div>

          <footer className="bg-gray-50 p-4 rounded-xl text-center text-sm text-gray-600">
            <p className="mb-2">
              Makers on Mainstreet may earn a commission from purchases made through affiliate links in our newsletter.
            </p>
            <p className="mb-2">
              Subscribe to our free newsletter every Tuesday & Saturday. You can unsubscribe at any time.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/privacy-policy" className="text-green-500 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-green-500 hover:underline">
                Terms and Conditions
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}