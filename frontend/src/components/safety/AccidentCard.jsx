'use client';

import { X, Calendar, Clock, MapPin, AlertTriangle, Users, Car, ShieldAlert, Activity } from 'lucide-react';
import Link from 'next/link';

const SEVERITY_COLORS = {
  'Fatal': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: <ShieldAlert className="w-6 h-6 text-red-600" /> },
  'Serious injury': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', icon: <AlertTriangle className="w-6 h-6 text-orange-600" /> },
  'Minor injury': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: <Activity className="w-6 h-6 text-yellow-600" /> },
  'Property damage only': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: <Car className="w-6 h-6 text-blue-600" /> },
};

export default function AccidentCard({ record, onClose }) {
  if (!record) return null;

  const style = SEVERITY_COLORS[record.severity] || SEVERITY_COLORS['Minor injury'];

  return (
    <div className="absolute top-4 right-4 z-[1000] w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-in">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Accident Record</span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm leading-snug">{record.location_name}</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Info */}
      <div className="px-5 py-4 space-y-4 border-b border-slate-100">
        <div className={`rounded-xl p-3 border ${style.bg} ${style.border} flex items-center justify-between`}>
          <div>
            <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${style.text}`}>Severity</p>
            <p className={`text-lg font-black ${style.text}`}>{record.severity}</p>
          </div>
          <span className="text-3xl">{style.icon}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Date</p>
            <p className="text-sm font-semibold text-slate-800">{record.accident_date}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Time</p>
            <p className="text-sm font-semibold text-slate-800">{record.accident_time}</p>
          </div>
        </div>
        
        <div>
           <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Type</p>
           <p className="text-sm font-semibold text-slate-800">{record.accident_type}</p>
        </div>
      </div>

      {/* Conditions & Details */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
            <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-600 font-medium">{record.number_of_vehicles} vehicles</span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-600 font-medium">{record.number_of_people_involved} people</span>
            </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">
            Weather: {record.weather_condition} • Road: {record.road_condition} • Light: {record.lighting_condition}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          ID: {record.id.split('-')[2]}
        </div>
        <Link
          href={`/roads/${record.road_id}`}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Road →
        </Link>
      </div>
    </div>
  );
}
