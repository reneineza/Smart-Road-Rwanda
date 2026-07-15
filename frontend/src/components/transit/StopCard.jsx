'use client';

import { MapPin, Users, Settings2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function StopCard({ stop, onClose }) {
  if (!stop) return null;

  return (
    <div className="absolute top-4 left-4 z-[1000] w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-in">
      <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Transit Stop</span>
          <h3 className="font-bold text-slate-900 leading-tight">{stop.stop_name}</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <ShieldAlert className="w-4 h-4" /> {/* Or X icon */}
          </button>
        )}
      </div>

      <div className="px-5 py-4 space-y-4">
        <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Capacity: {stop.passenger_capacity} pax</span>
        </div>
        <div>
            <p className="text-xs text-slate-400 font-medium uppercase mb-2">Facilities</p>
            <div className="flex flex-wrap gap-1.5">
                {stop.facilities?.map(f => (
                    <span key={f} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">
                        {f}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
