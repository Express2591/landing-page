'use client';
import React, { useState, useEffect } from 'react';
import { PRODUCTS, type Product } from '@/lib/products';
import { createProductEmail } from '@/lib/emailTemplates/productEmail';

interface ScheduledEmail {
  productId: number;
  scheduledDate: string;
  abTestEnabled: boolean;
}

interface EmailStats {
  sent: number;
  opened: number;
  clicked: number;
}

interface EmailSection {
  title?: string;
  content: string;
  type: 'text' | 'features' | 'cta' | 'quote';
  style?: 'default' | 'highlight' | 'subtle';
}

export default function AdminDashboard() {
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);
  const [emailStats, setEmailStats] = useState<EmailStats>({
    sent: 0,
    opened: 0,
    clicked: 0
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [abTestEnabled, setAbTestEnabled] = useState(false);
  const [customSections, setCustomSections] = useState<EmailSection[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchSubscribers();
    fetchScheduledEmails();
    fetchEmailStats();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/subscribers');
      const data = await res.json();
      setSubscribers(data.subscribers);
    } catch {
      console.error('Error fetching subscribers');
    }
  };

  const fetchScheduledEmails = async () => {
    try {
      const res = await fetch('/api/scheduled-emails');
      const data = await res.json();
      setScheduledEmails(data.emails);
    } catch {
      console.error('Error fetching scheduled emails');
    }
  };

  const fetchEmailStats = async () => {
    try {
      const res = await fetch('/api/email-stats');
      const data = await res.json();
      setEmailStats(data);
    } catch {
      console.error('Error fetching email stats');
    }
  };

  const sendEmailToSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          customSections,
          abTestEnabled
        })
      });

      const data = await res.json();
      setStatus(`Emails sent: ${data.sentCount} successful, ${data.failedCount} failed`);
    } catch {
      setStatus('Error sending emails');
    }
    setLoading(false);
  };

  const scheduleEmail = async () => {
    try {
      const res = await fetch('/api/schedule-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          scheduledDate: scheduleDate,
          customSections,
          abTestEnabled
        })
      });
      
      if (res.ok) {
        setStatus('Email scheduled!');
        fetchScheduledEmails();
      } else {
        setStatus('Error scheduling email');
      }
    } catch {
      setStatus('Error scheduling email');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Subscribers</h3>
          <p className="text-2xl">{subscribers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Open Rate</h3>
          <p className="text-2xl">
            {((emailStats.opened / emailStats.sent) * 100 || 0).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Click Rate</h3>
          <p className="text-2xl">
            {((emailStats.clicked / emailStats.sent) * 100 || 0).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Email Composer */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Email Composer</h2>
        
        {/* Product Selection */}
        <div>
          <label className="block mb-2">Product</label>
          <select 
            className="w-full p-2 border rounded mb-4"
            onChange={(e) => setSelectedProduct(PRODUCTS[parseInt(e.target.value)])}
          >
            {PRODUCTS.map((product, index) => (
              <option key={product.id} value={index}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Sections */}
        <div className="mt-4">
          <h3 className="font-bold mb-2">Additional Sections</h3>
          
          {customSections.map((section, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded">
              <select
                value={section.type}
                onChange={(e) => {
                  const newSections = [...customSections];
                  newSections[index].type = e.target.value as EmailSection['type'];
                  setCustomSections(newSections);
                }}
                className="mb-2 p-2 border rounded"
              >
                <option value="text">Text</option>
                <option value="quote">Quote</option>
                <option value="cta">Call to Action</option>
              </select>
              
              <input
                type="text"
                placeholder="Title (optional)"
                value={section.title || ''}
                onChange={(e) => {
                  const newSections = [...customSections];
                  newSections[index].title = e.target.value;
                  setCustomSections(newSections);
                }}
                className="mb-2 w-full p-2 border rounded"
              />
              
              <textarea
                placeholder="Content"
                value={section.content}
                onChange={(e) => {
                  const newSections = [...customSections];
                  newSections[index].content = e.target.value;
                  setCustomSections(newSections);
                }}
                className="w-full p-2 border rounded mb-2"
                rows={3}
              />
              
              <select
                value={section.style || 'default'}
                onChange={(e) => {
                  const newSections = [...customSections];
                  newSections[index].style = e.target.value as EmailSection['style'];
                  setCustomSections(newSections);
                }}
                className="mr-2 p-2 border rounded"
              >
                <option value="default">Default Style</option>
                <option value="highlight">Highlighted</option>
                <option value="subtle">Subtle</option>
              </select>
              
              <button
                onClick={() => {
                  const newSections = customSections.filter((_, i) => i !== index);
                  setCustomSections(newSections);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          
          <button
            onClick={() => setCustomSections([
              ...customSections,
              {
                type: 'text',
                content: '',
                style: 'default'
              }
            ])}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Add Section
          </button>
        </div>

        {/* A/B Testing Toggle */}
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={abTestEnabled}
              onChange={(e) => setAbTestEnabled(e.target.checked)}
              className="mr-2"
            />
            Enable A/B Testing
          </label>
        </div>

        {/* Schedule Option */}
        <div className="mt-4">
          <label className="block mb-2">Schedule (Optional)</label>
          <input
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        </div>

        {/* Preview & Send */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Preview Email
          </button>
          
          {scheduleDate ? (
            <button
              onClick={scheduleEmail}
              className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Schedule
            </button>
          ) : (
            <button
              onClick={sendEmailToSubscribers}
              disabled={loading}
              className={`flex-1 p-2 rounded text-white ${
                loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? 'Sending...' : 'Send Now'}
            </button>
          )}
        </div>
      </div>

      {/* Scheduled Emails */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Scheduled Emails</h2>
        <div className="space-y-2">
          {scheduledEmails.map((email, index) => (
            <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50">
              <span>{PRODUCTS.find(p => p.id === email.productId)?.name}</span>
              <span>{new Date(email.scheduledDate).toLocaleString()}</span>
              {email.abTestEnabled && <span className="text-blue-500">A/B Test</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Subscribers */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">Recent Subscribers</h2>
        <div className="max-h-60 overflow-y-auto">
          {subscribers.slice(-10).reverse().map((email, i) => (
            <div key={i} className="p-2 hover:bg-gray-50">
              {email}
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Email Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div
              className="border rounded p-4"
              dangerouslySetInnerHTML={{
                __html: createProductEmail(selectedProduct, 'preview@example.com', customSections)
              }}
            />
          </div>
        </div>
      )}

      {/* Status Message */}
      {status && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow">
          {status}
        </div>
      )}
    </div>
  );
}