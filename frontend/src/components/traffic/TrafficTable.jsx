'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const LOS_BADGE = {
  A: 'bg-emerald-100 text-emerald-700',
  B: 'bg-green-100 text-green-700',
  C: 'bg-yellow-100 text-yellow-700',
  D: 'bg-orange-100 text-orange-700',
  E: 'bg-red-100 text-red-700',
  F: 'bg-red-200 text-red-900',
};

/**
 * TrafficTable
 *
 * Tabular summary of traffic survey records.
 * Used in /traffic page secondary section.
 *
 * Props:
 *   - records: array of enriched traffic records
 *   - onRowClick: optional callback(record) for row selection
 */
export default function TrafficTable({ records, onRowClick }) {
  if (!Array.isArray(records) || records.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
        No survey records available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
            <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Survey Date</th>
            <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Total Volume</th>
            <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Peak Hr</th>
            <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">LOS</th>
            <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Heavy %</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((r) => {
            const los = r.computed?.los || '?';
            return (
              <tr
                key={r.id}
                className="hover:bg-slate-50 transition-colors group cursor-pointer"
                onClick={() => onRowClick && onRowClick(r)}
              >
                <td className="py-4 px-5">
                  <p className="text-sm font-semibold text-slate-900">{r.locationName}</p>
                  <p className="text-xs text-slate-400">{r.observer}</p>
                </td>
                <td className="py-4 px-5 text-sm text-slate-600">{r.surveyDate}</td>
                <td className="py-4 px-5 text-sm font-bold text-slate-900 text-right">{r.totalVehicles.toLocaleString()}</td>
                <td className="py-4 px-5 text-sm text-slate-700 text-right">{r.peakHourVolume.toLocaleString()}</td>
                <td className="py-4 px-5 text-center">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${LOS_BADGE[los] || 'bg-slate-100 text-slate-600'}`}>
                    {los}
                  </span>
                </td>
                <td className="py-4 px-5 text-sm text-slate-700 text-right">{r.heavyVehiclePct?.toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

