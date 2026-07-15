'use client';

export default function TrafficInsights({ data }) {
  if (!data) return <div className="text-slate-400 text-sm text-center py-10">Loading...</div>;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Network Average Volume</p>
        <p className="text-3xl font-black text-slate-800">{data.averageDailyVolume.toLocaleString()} <span className="text-sm font-medium text-slate-500">veh/day</span></p>
      </div>
      
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Highest Demand Corridors</p>
        <div className="space-y-3">
          {data.highestCorridors.map((c, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 truncate pr-4">{c.location.split('—')[0]}</span>
              <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{c.volume.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Heavy Vehicle Share</span>
            <span className="text-sm font-bold text-amber-600">{data.averageHeavyVehiclePercentage}%</span>
        </div>
      </div>
    </div>
  );
}
