'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import TrafficSummary from '../../components/traffic/TrafficSummary';
import TrafficTable from '../../components/traffic/TrafficTable';
import { VehicleClassificationChart, VolumeComparisonChart } from '../../components/traffic/TrafficChart';
import { Activity, Map as MapIcon } from 'lucide-react';

// Lazy-load the map (window-dependent)
const TrafficMapPreview = dynamic(
  () => import('../../components/traffic/TrafficMapPreview'),
  { ssr: false, loading: () => <div className="h-80 bg-slate-100 rounded-2xl animate-pulse" /> }
);

export default function TrafficPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('analytics'); // 'analytics' | 'map'

  useEffect(() => {
    fetch('http://localhost:5000/api/traffic')
      .then((r) => r.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch traffic data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Traffic Engineering</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Mobility Analytics</h1>
          <p className="text-slate-500 mt-1">Transportation demand analysis across the Rwanda road network.</p>
        </div>
        {/* View Toggle */}
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveView('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            Map View
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Summary Cards — always visible */}
          <TrafficSummary records={records} />

          {activeView === 'analytics' && (
            <>
              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <VehicleClassificationChart records={records} />
                <VolumeComparisonChart records={records} />
              </div>

              {/* Engineering Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="text-sm font-bold text-amber-800 mb-1">Note on AADT Values</p>
                    <p className="text-sm text-amber-700">
                      AADT (Annual Average Daily Traffic) values shown are <strong>estimated</strong> using a simplified 12-hour expansion factor of 1.3.
                      Accurate AADT requires continuous count data (365 days) and seasonal adjustment factors specific to Rwanda.
                      Field surveys and permanent count stations are recommended for planning-grade estimates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="mb-2">
                <h2 className="text-base font-bold text-slate-900 mb-4">Survey Station Records</h2>
                <TrafficTable records={records} />
              </div>
            </>
          )}

          {activeView === 'map' && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '540px' }}>
              <TrafficMapPreview trafficData={records} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
