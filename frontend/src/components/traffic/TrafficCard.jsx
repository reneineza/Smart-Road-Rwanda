'use client';

import { X, MapPin, Clock, Car, Bike, Bus, Truck, Users } from 'lucide-react';
import Link from 'next/link';

const LOS_COLORS = {
  A: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  B: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  C: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
  D: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  E: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  F: { bg: 'bg-red-200', text: 'text-red-900', border: 'border-red-300' },
};

const VehicleIcon = ({ type }) => {
  const map = { cars: Car, motorcycles: Bike, buses: Bus, trucks: Truck };
  const Icon = map[type] || Users;
  return <Icon className="w-3.5 h-3.5" />;
};

/**
 * TrafficCard
 *
 * Floating info card shown when a traffic survey point is clicked on the map.
 * Displays vehicle breakdown, peak hour, and LOS indicator.
 *
 * Props:
 *   - record: enriched traffic record (from API, includes .computed)
 *   - onClose: callback to dismiss card
 */
export default function TrafficCard({ record, onClose }) {
  if (!record) return null;

  const los = record.computed?.los || '?';
  const losStyle = LOS_COLORS[los] || LOS_COLORS['C'];
  const aadt = record.computed?.estimatedAADT;

  const vehicleCategories = [
    { key: 'cars', label: 'Cars' },
    { key: 'motorcycles', label: 'Motorcycles' },
    { key: 'buses', label: 'Buses' },
    { key: 'trucks', label: 'Trucks' },
    { key: 'bicycles', label: 'Bicycles' },
  ];

  return (
    <div className="absolute top-4 right-4 z-[1000] w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-in">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Traffic Survey</span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm leading-snug">{record.locationName}</h3>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Key Metrics */}
      <div className="px-5 py-4 grid grid-cols-2 gap-3 border-b border-slate-100">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Survey Volume</p>
          <p className="text-lg font-bold text-slate-900">{record.totalVehicles.toLocaleString()}</p>
          <p className="text-xs text-slate-400">vehicles/survey</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Est. AADT</p>
          <p className="text-lg font-bold text-slate-900">{aadt ? aadt.toLocaleString() : 'TBD'}</p>
          <p className="text-xs text-slate-400">veh/day</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Peak Hour</p>
          <p className="text-sm font-bold text-slate-900">{record.peakHour}</p>
          <p className="text-xs text-slate-400">{record.peakHourVolume.toLocaleString()} veh/hr</p>
        </div>
        <div className={`rounded-xl p-3 border ${losStyle.bg} ${losStyle.border}`}>
          <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${losStyle.text}`}>Level of Service</p>
          <p className={`text-2xl font-black ${losStyle.text}`}>LOS {los}</p>
          <p className={`text-xs ${losStyle.text} opacity-80`}>{record.computed?.losDescription?.split('—')[0]}</p>
        </div>
      </div>

      {/* Vehicle Breakdown */}
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Vehicle Classification</p>
        <div className="space-y-2">
          {vehicleCategories.map(({ key, label }) => {
            const count = record.vehicleCounts?.[key] || 0;
            const pct = record.totalVehicles > 0 ? ((count / record.totalVehicles) * 100).toFixed(1) : 0;
            return (
              <div key={key} className="flex items-center gap-2">
                <div className="w-4 text-slate-400"><VehicleIcon type={key} /></div>
                <span className="text-xs text-slate-600 w-20">{label}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 w-10 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {record.surveyDate}
        </div>
        <Link
          href={`/roads/${record.roadId}`}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Road →
        </Link>
      </div>
    </div>
  );
}
