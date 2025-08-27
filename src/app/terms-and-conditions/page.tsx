'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-4 py-6">
        <div className="max-w-md mx-auto text-center">
          <Link href="/">
            <Image 
              src="/makers-on-mainstreet-logo.jpg"
              alt="Makers on Mainstreet Logo"
              width={150}
              height={75}
              className="mx-auto"
            />
          </Link>
        </div>
      </header>
      <main className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-black mb-6 text-center">Terms and Conditions</h1>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-lg text-gray-600 text-sm space-y-4 text-justify">
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Acceptance of Terms</h2>
              <p>
                By accessing or using the Makers on Mainstreet website or subscribing to our newsletter, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website or services.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Use of the Website</h2>
              <p>
                You agree to use the website for lawful purposes only. You may not:
              </p>
              <ul className="list-disc pl-5">
                <li>Use the website in a way that violates any applicable laws or regulations.</li>
                <li>Attempt to gain unauthorized access to any part of the website.</li>
                <li>Use the website to transmit harmful or illegal content.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Newsletter Subscription</h2>
              <p>
                By subscribing to our newsletter, you agree to receive emails from Makers on Mainstreet every Tuesday and Saturday. These emails may include promotional content and affiliate links. You can unsubscribe at any time using the unsubscribe link provided in each email.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Affiliate Links</h2>
              <p>
                Our newsletter and website may contain affiliate links. We may earn a commission for purchases made through these links at no additional cost to you. We are not responsible for the products, services, or actions of third-party companies linked through our site or newsletter.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Content Accuracy</h2>
              <p>
                We strive to provide accurate and up-to-date information about American craftsmanship and products. However, we do not guarantee the accuracy, completeness, or reliability of any content on our website or in our newsletter. You use this information at your own risk.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Intellectual Property</h2>
              <p>
                All content on the Makers on Mainstreet website, including text, images, and logos, is the property of Makers on Mainstreet or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or modify this content without our written permission.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Makers on Mainstreet is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or newsletter, including but not limited to damages from errors, omissions, or third-party products.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Third-Party Links</h2>
              <p>
                Our website and newsletter may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these websites. Accessing these links is at your own risk.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Changes to These Terms</h2>
              <p>
                We may update these Terms and Conditions from time to time. Changes will be posted on this page, and the updated terms will take effect immediately. Your continued use of the website or newsletter constitutes acceptance of the revised terms.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Governing Law</h2>
              <p>
                These Terms and Conditions are governed by the laws of the United States and the state of Arizona. Any disputes arising from these terms will be resolved in the courts of Arizona.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Contact Us</h2>
              <p>
                If you have questions about these Terms and Conditions, please contact us at matt@makersonmainst.com or at:
              </p>
              <p>
                Makers on Mainstreet<br />
                15600 N Frank Llyod Wright Blvd, Scottsdale, AZ 85260<br />
                United States
              </p>
            </section>
          </div>
        </div>
      </main>
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
  );
}