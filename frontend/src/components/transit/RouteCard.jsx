'use client';

import { MapPin, Route, Clock, ChevronRight } from 'lucide-react';

export default function RouteCard({ route, onClick }) {
  if (!route) return null;

  return (
    <div 
      onClick={() => onClick && onClick(route)}
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-800 mb-2">
            {route.route_code}
          </span>
          <h4 className="font-bold text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors">{route.route_name}</h4>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
      
      <p className="text-xs font-semibold text-slate-500 mb-4">{route.operator_name} • {route.transport_type}</p>
      
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Route className="w-3.5 h-3.5 text-slate-400" />
          <span>{route.distance.toFixed(1)} km</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{route.stop_count} stops</span>
        </div>
      </div>
    </div>
  );
}
