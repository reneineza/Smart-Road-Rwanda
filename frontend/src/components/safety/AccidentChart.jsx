'use client';

const SEVERITY_COLORS = {
  'Fatal': '#ef4444',
  'Serious injury': '#f97316',
  'Minor injury': '#eab308',
  'Property damage only': '#3b82f6',
};

const TYPE_COLORS = {
  'Collision': '#8b5cf6',
  'Pedestrian accident': '#ec4899',
  'Motorcycle accident': '#f59e0b',
  'Vehicle overturn': '#14b8a6',
  'Other': '#94a3b8'
};

export function AccidentSeverityChart({ records }) {
  if (!Array.isArray(records) || records.length === 0) return null;

  const totals = records.reduce((acc, r) => {
    acc[r.severity] = (acc[r.severity] || 0) + 1;
    return acc;
  }, {});

  const grandTotal = records.length;
  const categories = Object.entries(totals).sort(([, a], [, b]) => b - a);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-slate-900 mb-1">Accident Severity</h3>
      <p className="text-xs text-slate-400 mb-6">Distribution across recorded incidents</p>

      <div className="space-y-4">
        {categories.map(([key, value]) => {
          const pct = grandTotal > 0 ? (value / grandTotal) * 100 : 0;
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 w-32 flex-shrink-0">{key}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: SEVERITY_COLORS[key] || '#94a3b8',
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-20 justify-end">
                <span className="text-sm font-bold text-slate-800">{value}</span>
                <span className="text-xs text-slate-400">({pct.toFixed(0)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AccidentTypeChart({ records }) {
  if (!Array.isArray(records) || records.length === 0) return null;

  const totals = records.reduce((acc, r) => {
    const t = r.accident_type || 'Other';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const grandTotal = records.length;
  const categories = Object.entries(totals).sort(([, a], [, b]) => b - a);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-slate-900 mb-1">Accident Types</h3>
      <p className="text-xs text-slate-400 mb-6">Categorization of collisions and incidents</p>

      <div className="space-y-4">
        {categories.map(([key, value]) => {
          const pct = grandTotal > 0 ? (value / grandTotal) * 100 : 0;
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 w-32 flex-shrink-0">{key}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: TYPE_COLORS[key] || '#94a3b8',
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-20 justify-end">
                <span className="text-sm font-bold text-slate-800">{value}</span>
                <span className="text-xs text-slate-400">({pct.toFixed(0)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
