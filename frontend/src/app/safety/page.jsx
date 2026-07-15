'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SafetySummary from '../../components/safety/SafetySummary';
import { AccidentSeverityChart, AccidentTypeChart } from '../../components/safety/AccidentChart';
import BlackSpotCard from '../../components/safety/BlackSpotCard';
import { ShieldAlert, Map as MapIcon, BarChart3, AlertOctagon } from 'lucide-react';

// Lazy-load the map
const SafetyMapPreview = dynamic(
  () => import('../../components/safety/SafetyMapPreview'),
  { ssr: false, loading: () => <div className="h-80 bg-slate-100 rounded-2xl animate-pulse" /> }
);

export default function SafetyPage() {
  const [records, setRecords] = useState([]);
  const [highRiskSpots, setHighRiskSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('analytics'); // 'analytics' | 'map'

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/safety').then(r => r.json()),
      fetch('http://localhost:5000/api/safety/high-risk').then(r => r.json())
    ])
    .then(([accidents, spots]) => {
      setRecords(Array.isArray(accidents) ? accidents : []);
      setHighRiskSpots(Array.isArray(spots) ? spots : []);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch safety data:', err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Road Safety</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Safety Analytics</h1>
          <p className="text-slate-500 mt-1">Accident monitoring and high-risk location identification.</p>
        </div>
        
        {/* Toggle */}
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveView('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            Crash Map
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
        </div>
      ) : (
        <>
          <SafetySummary records={records} />

          {activeView === 'analytics' && (
            <>
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <AccidentSeverityChart records={records} />
                <AccidentTypeChart records={records} />
              </div>

              {/* Black Spots */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <AlertOctagon className="w-5 h-5 text-red-600" />
                  <h2 className="text-lg font-bold text-slate-900">High Risk Locations (Black Spots)</h2>
                </div>
                {highRiskSpots.length === 0 ? (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center text-slate-500">
                        No significant high risk locations identified with current dataset.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {highRiskSpots.map(spot => (
                            <BlackSpotCard key={spot.location_name} spot={spot} />
                        ))}
                    </div>
                )}
              </div>
            </>
          )}

          {activeView === 'map' && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '600px' }}>
              <SafetyMapPreview accidentData={records} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
