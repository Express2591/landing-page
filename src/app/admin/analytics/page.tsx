'use client';
import React, { useState, useEffect } from 'react';

type AnalyticsData = {
  total: number;
  success: number;
};

interface Analytics {
  opens: Record<string, Record<string, number>>;
  clicks: Record<string, Record<string, number>>;
  sends: Record<string, AnalyticsData>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics>({
    opens: {},
    clicks: {},
    sends: {}
  });