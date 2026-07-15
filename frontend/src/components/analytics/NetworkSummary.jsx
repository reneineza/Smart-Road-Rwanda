'use client';
import { Route, MapPin, Activity, ShieldAlert, Bus } from 'lucide-react';

export default function NetworkSummary({ summary, traffic, safety, transit }) {
  if (!summary || !traffic || !safety || !transit) return null;

  const kpis = [
    { label: 'Total Network', value: `${summary.totalLength} km`, icon: Route, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Traffic Corridors', value: traffic.surveyStations, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Accident History', value: safety.totalAccidents, icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Transit Routes', value: transit.activeRoutes, icon: Bus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${kpi.bg}`}>
            <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
            <p className="text-2xl font-black text-slate-900 leading-tight">{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
