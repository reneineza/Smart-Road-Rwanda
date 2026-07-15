'use client';

import { ArrowLeft, MapPin, Users, Settings2, Activity } from 'lucide-react';

export default function RouteDetails({ route, onBack }) {
  if (!route) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Route Details</span>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        <div className="mb-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-black bg-indigo-100 text-indigo-800 mb-3 border border-indigo-200">
            {route.route_code}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{route.route_name}</h2>
          <p className="text-slate-500 font-medium">Operated by {route.operator_name || route.operator?.operator_name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Distance</p>
            <p className="text-xl font-bold text-slate-800">{route.distance} <span className="text-sm font-medium text-slate-500">km</span></p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Type</p>
            <p className="text-xl font-bold text-slate-800">{route.transport_type}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            Route Stops ({route.stops?.length || 0})
          </h3>
          <div className="relative border-l-2 border-slate-100 ml-3 pl-5 space-y-6">
            {route.stops?.map((stop, idx) => (
              <div key={stop.id} className="relative">
                <div className={`absolute -left-[27px] w-3 h-3 rounded-full border-2 border-white ${
                  idx === 0 || idx === route.stops.length - 1 ? 'bg-indigo-600' : 'bg-slate-300'
                }`} />
                <p className="font-semibold text-slate-800 text-sm">{stop.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <h4 className="font-bold text-indigo-900">Mobility Analytics</h4>
            </div>
            <p className="text-sm text-indigo-700 mb-3">Passenger demand and travel time metrics will be integrated in the upcoming ITS milestone.</p>
            <button className="text-xs font-semibold bg-white border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg shadow-sm">
                Configure ITS Sensors
            </button>
        </div>

      </div>
    </div>
  );
}
