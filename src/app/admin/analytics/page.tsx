'use client';
import React, { useState, useEffect } from 'react';

interface Analytics {
  opens: Record<string, number>;
  clicks: Record<string, number>;
  sends: Record<string, any>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics>({
    opens: {},
    clicks: {},
    sends: {}
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const res = await fetch('/api/analytics');
    const data = await res.json();
    setAnalytics(data);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      {/* Today's Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border p-4 rounded">
          <h3 className="font-bold">Emails Sent Today</h3>
          <p className="text-2xl">{analytics.sends[new Date().toISOString().split('T')[0]]?.total || 0}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-bold">Opens Today</h3>
          <p className="text-2xl">{Object.values(analytics.opens).reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-bold">Clicks Today</h3>
          <p className="text-2xl">{Object.values(analytics.clicks).reduce((a, b) => a + b, 0)}</p>
        </div>
      </div>
      
      {/* Historical Data */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Historical Data</h2>
        {Object.entries(analytics.sends).map(([date, data]) => (
          <div key={date} className="border p-4 rounded">
            <h3 className="font-bold">{new Date(date).toLocaleDateString()}</h3>
            <p>Sent: {data.total}</p>
            <p>Opens: {Object.values(analytics.opens[date] || {}).reduce((a, b) => a + b, 0)}</p>
            <p>Clicks: {Object.values(analytics.clicks[date] || {}).reduce((a, b) => a + b, 0)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}