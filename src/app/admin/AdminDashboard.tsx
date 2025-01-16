'use client';
import React, { useState, useEffect } from 'react';
import { PRODUCTS, type Product } from '@/lib/products';

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
        <h2 className="text-xl font-bold mb-4">Send or Schedule Email</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Product</label>
            <select 
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedProduct(PRODUCTS[parseInt(e.target.value)])}
            >
              {PRODUCTS.map((product, index) => (
                <option key={product.id} value={index}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={abTestEnabled}
              onChange={(e) => setAbTestEnabled(e.target.checked)}
              className="mr-2"
            />
            <label>Enable A/B Testing</label>
          </div>

          <div>
            <label className="block mb-2">Schedule (Optional)</label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={sendEmailToSubscribers}
              disabled={loading}
              className={`flex-1 p-2 rounded text-white ${
                loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Sending...' : 'Send Now'}
            </button>
            
            {scheduleDate && (
              <button
                onClick={scheduleEmail}
                className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Schedule
              </button>
            )}
          </div>
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

      {/* Status Message */}
      {status && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow">
          {status}
        </div>
      )}
    </div>
  );
}