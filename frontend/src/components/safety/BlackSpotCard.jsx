'use client';

import { AlertOctagon, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function BlackSpotCard({ spot }) {
  if (!spot) return null;

  return (
    <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden flex flex-col h-full relative">
      <div className="absolute top-0 right-0 p-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
          {spot.risk_level} Risk
        </span>
      </div>
      <div className="p-5 flex-1">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
            <AlertOctagon className="w-5 h-5 text-red-600" />
        </div>
        <h4 className="font-bold text-slate-900 mb-1 leading-snug">{spot.location_name}</h4>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Multiple accidents clustered</span>
        </div>
        
        <div className="bg-red-50 rounded-xl p-3 border border-red-100 mt-auto">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-xs font-semibold text-red-800 uppercase tracking-wider mb-0.5">Recorded Incidents</p>
                    <p className="text-2xl font-black text-red-600">{spot.accident_count}</p>
                </div>
            </div>
        </div>
      </div>
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100">
        <Link href={`/roads/${spot.road_id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
            Investigate Road Section &rarr;
        </Link>
      </div>
    </div>
  );
}
