'use client';

export default function SafetyInsights({ data }) {
  if (!data) return <div className="text-slate-400 text-sm text-center py-10">Loading...</div>;

  const total = data.totalAccidents || 1; // prevent divide by zero
  const getPct = (val) => Math.round(((val || 0) / total) * 100);

  const severities = [
    { label: 'Fatal', key: 'Fatal', color: 'bg-red-500' },
    { label: 'Serious', key: 'Serious injury', color: 'bg-orange-500' },
    { label: 'Minor', key: 'Minor injury', color: 'bg-yellow-500' },
    { label: 'Damage Only', key: 'Property damage only', color: 'bg-blue-500' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">High-Risk Clusters</p>
        <p className="text-3xl font-black text-slate-800">{data.highRiskLocationsCount} <span className="text-sm font-medium text-slate-500">locations flagged</span></p>
      </div>

      <div className="flex-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Severity Breakdown</p>
        <div className="space-y-4">
          {severities.map(sev => {
            const count = data.severityDistribution[sev.key] || 0;
            const pct = getPct(count);
            return (
              <div key={sev.key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{sev.label}</span>
                  <span className="text-slate-500">{count} ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${sev.color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
