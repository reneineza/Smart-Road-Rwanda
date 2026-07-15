'use client';

import { useEffect, useState } from 'react';
import { Bus, Navigation, Activity } from 'lucide-react';
import TransitSummary from '../../components/transit/TransitSummary';
import RouteCard from '../../components/transit/RouteCard';
import RouteDetails from '../../components/transit/RouteDetails';

export default function TransitPage() {
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/transit/routes').then(r => r.json()),
      fetch('http://localhost:5000/api/transit/stops').then(r => r.json()),
      fetch('http://localhost:5000/api/transit/operators').then(r => r.json())
    ])
    .then(([rts, stps, ops]) => {
      setRoutes(Array.isArray(rts) ? rts : []);
      setStops(Array.isArray(stps) ? stps : []);
      setOperators(Array.isArray(ops) ? ops : []);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch transit data:', err);
      setLoading(false);
    });
  }, []);

  const fetchRouteDetails = (route) => {
    fetch(`http://localhost:5000/api/transit/routes/${route.id}`)
        .then(r => r.json())
        .then(data => setSelectedRoute(data))
        .catch(err => console.error(err));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bus className="w-5 h-5 text-indigo-500" />
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Public Transport</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Mobility Management</h1>
          <p className="text-slate-500 mt-1">Manage public transit networks, operators, and mobility analytics.</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <TransitSummary routes={routes} stops={stops} operators={operators} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
            {/* Route List */}
            <div className="lg:col-span-2 flex flex-col min-h-0">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-slate-400" />
                Route Explorer
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex-1 overflow-y-auto min-h-[400px]">
                {routes.length === 0 ? (
                  <div className="text-center text-slate-500 py-10">No routes found</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {routes.map(r => (
                      <RouteCard key={r.id} route={r} onClick={fetchRouteDetails} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Side Panel: Selected Route or ITS Placeholder */}
            <div className="flex flex-col min-h-0 min-h-[400px]">
              {selectedRoute ? (
                <RouteDetails route={selectedRoute} onBack={() => setSelectedRoute(null)} />
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center flex-1 flex flex-col justify-center items-center h-full">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Activity className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Select a Route</h3>
                  <p className="text-sm text-slate-500">
                    Click on a transit route from the explorer to view detailed information, stops, and mobility analytics.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
