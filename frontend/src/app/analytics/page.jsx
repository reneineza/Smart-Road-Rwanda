'use client';

import { useEffect, useState } from 'react';
import { Activity, Map as MapIcon, Route, ShieldAlert, Bus, AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';

import AnalyticsCard from '../../components/analytics/AnalyticsCard';
import NetworkSummary from '../../components/analytics/NetworkSummary';
import TrafficInsights from '../../components/analytics/TrafficInsights';
import SafetyInsights from '../../components/analytics/SafetyInsights';
import TransitInsights from '../../components/analytics/TransitInsights';
import PriorityRanking from '../../components/analytics/PriorityRanking';

// Minimal dynamic map for just priority hotspots visualization
const AnalyticsMapPreview = dynamic(
  () => import('../../components/analytics/AnalyticsMapPreview'),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-100 animate-pulse" /> }
);

export default function AnalyticsDashboard() {
  const [data, setData] = useState({
    summary: null,
    traffic: null,
    safety: null,
    transit: null,
    priorities: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/analytics/summary').then(r => r.json()),
      fetch('http://localhost:5000/api/analytics/traffic').then(r => r.json()),
      fetch('http://localhost:5000/api/analytics/safety').then(r => r.json()),
      fetch('http://localhost:5000/api/analytics/transit').then(r => r.json()),
      fetch('http://localhost:5000/api/analytics/priorities').then(r => r.json()),
    ])
    .then(([summary, traffic, safety, transit, priorities]) => {
      setData({ summary, traffic, safety, transit, priorities });
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to load analytics', err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Decision Support</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">Transportation Operations Center</h1>
        <p className="text-slate-500 mt-1">Cross-domain network performance and priority interventions.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="h-96 bg-slate-100 rounded-2xl animate-pulse" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 pb-4">
          
          {/* Top KPI Banner */}
          <NetworkSummary 
            summary={data.summary} 
            traffic={data.traffic} 
            safety={data.safety} 
            transit={data.transit} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 h-[400px]">
            {/* Left: Map Preview of Hotspots */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-700">Priority Interventions</span>
                </div>
                <AnalyticsMapPreview priorities={data.priorities} />
            </div>

            {/* Right: Priority Ranking List */}
            <AnalyticsCard title="Top Priority Locations" icon={AlertTriangle}>
                <PriorityRanking priorities={data.priorities} />
            </AnalyticsCard>
          </div>

          {/* Bottom: Domain Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnalyticsCard title="Traffic Demand" icon={Activity}>
              <TrafficInsights data={data.traffic} />
            </AnalyticsCard>
            
            <AnalyticsCard title="Safety Risk" icon={ShieldAlert}>
              <SafetyInsights data={data.safety} />
            </AnalyticsCard>

            <AnalyticsCard title="Transit Coverage" icon={Bus}>
              <TransitInsights data={data.transit} />
            </AnalyticsCard>
          </div>

        </div>
      )}
    </div>
  );
}
