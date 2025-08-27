'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
          <h1 className="text-2xl font-bold text-black mb-6 text-center">Privacy Policy</h1>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-lg text-gray-600 text-sm space-y-4">
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Introduction</h2>
              <p>
                At Makers on Mainstreet, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or subscribe to our newsletter. By using our website, you consent to the practices described in this policy.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Information We Collect</h2>
              <p>
                We collect the following personal information when you subscribe to our newsletter:
              </p>
              <ul className="list-disc pl-5">
                <li>Email address</li>
              </ul>
              <p>
                We may also collect non-personal information, such as browser type, device information, and website usage data, through cookies or similar technologies.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">How We Use Your Information</h2>
              <p>
                We use your email address to:
              </p>
              <ul className="list-disc pl-5">
                <li>Send you our free newsletter every Tuesday and Saturday, featuring American craftsmanship and affiliate links to products we recommend.</li>
                <li>Communicate with you about your subscription, including confirmation and account updates.</li>
                <li>Improve our website and newsletter content based on user engagement.</li>
              </ul>
              <p>
                Non-personal data may be used to analyze website performance and enhance user experience.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Third-Party Services</h2>
              <p>
                We may use third-party services (e.g., email marketing platforms) to manage and send our newsletter. These services have their own privacy policies, and we ensure they comply with applicable data protection laws. We do not sell or share your personal information with third parties for marketing purposes, except as required to deliver our newsletter or as disclosed in this policy.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Affiliate Links</h2>
              <p>
                Our newsletter may contain affiliate links. If you make a purchase through these links, we may earn a commission at no additional cost to you. This helps support our free newsletter.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Data Storage and Security</h2>
              <p>
                We store your email address securely and implement reasonable measures to protect it from unauthorized access, loss, or misuse. However, no online system is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Your Rights</h2>
              <p>
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-5">
                <li><strong>Access</strong>: Request a copy of the personal data we hold about you.</li>
                <li><strong>Correction</strong>: Request corrections to inaccurate or incomplete data.</li>
                <li><strong>Deletion</strong>: Request deletion of your personal data, subject to legal obligations.</li>
                <li><strong>Opt-Out</strong>: Unsubscribe from our newsletter at any time using the unsubscribe link in every email.</li>
                <li><strong>GDPR (EU Residents)</strong>: Additional rights to restrict processing, data portability, or object to processing.</li>
                <li><strong>CCPA (California Residents)</strong>: Right to know, delete, or opt-out of the sale of personal information (we do not sell your data).</li>
              </ul>
              <p>
                To exercise these rights, contact us at matt@makersonmainst.com.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Cookies and Tracking</h2>
              <p>
                Our website may use cookies to enhance your experience. You can manage cookie preferences through your browser settings. For more details, see our <Link href="/privacy-policy" className="text-green-500 hover:underline">Cookie Policy</Link> (if applicable).
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page, and the updated policy will take effect immediately. We encourage you to review this policy periodically.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-black mb-2">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at matt@makersonmainst.com or at:
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