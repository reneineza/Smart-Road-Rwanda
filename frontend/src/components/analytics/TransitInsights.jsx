'use client';

export default function TransitInsights({ data }) {
  if (!data) return <div className="text-slate-400 text-sm text-center py-10">Loading...</div>;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Coverage Scope</p>
        <p className="text-3xl font-black text-slate-800">{data.totalRoutes} <span className="text-sm font-medium text-slate-500">mapped routes</span></p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs text-slate-500 font-semibold mb-1">Active Status</p>
          <p className="text-xl font-bold text-emerald-600">{data.activeRoutes} <span className="text-sm font-medium text-slate-500">running</span></p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs text-slate-500 font-semibold mb-1">Transit Stops</p>
          <p className="text-xl font-bold text-slate-800">{data.totalStops} <span className="text-sm font-medium text-slate-500">locations</span></p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 text-sm text-slate-500">
        Public transport network data provides foundation for accessibility mapping and multi-modal integration.
      </div>
    </div>
  );
}
