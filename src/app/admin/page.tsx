'use client';
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '@/lib/products';  // Use absolute path with @ alias

export default function AdminPage() {
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubscribers();
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

  const sendEmailToSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: selectedProduct.id 
        })
      });

      const data = await res.json();
      setStatus(`Emails sent: ${data.sentCount} successful, ${data.failedCount} failed`);
    } catch {
      setStatus('Error sending emails');
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">Subscribers</h2>
        <p>{subscribers.length} total subscribers</p>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">Send Email</h2>
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

        <button
          onClick={sendEmailToSubscribers}
          disabled={loading}
          className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Sending...' : 'Send Email to All Subscribers'}
        </button>

        {status && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            {status}
          </div>
        )}
      </div>

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
    </div>
  );
}