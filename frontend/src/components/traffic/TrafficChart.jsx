'use client';

/**
 * TrafficChart
 *
 * Pure CSS/SVG bar chart for vehicle classification distribution.
 * No external charting library required.
 *
 * Props:
 *   - records: array of traffic records
 *   - type: 'classification' | 'volume-comparison'
 */

const VEHICLE_COLORS = {
  cars: '#3b82f6',
  motorcycles: '#f59e0b',
  buses: '#8b5cf6',
  trucks: '#ef4444',
  bicycles: '#10b981',
};

const CATEGORY_LABELS = {
  cars: 'Cars',
  motorcycles: 'Motorcycles',
  buses: 'Buses',
  trucks: 'Trucks',
  bicycles: 'Bicycles',
};

export function VehicleClassificationChart({ records }) {
  if (!Array.isArray(records) || records.length === 0) return null;

  // Aggregate all counts across surveys
  const totals = records.reduce(
    (acc, r) => {
      Object.keys(VEHICLE_COLORS).forEach((k) => {
        acc[k] = (acc[k] || 0) + (r.vehicleCounts?.[k] || 0);
      });
      return acc;
    },
    {}
  );

  const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0);
  const categories = Object.entries(totals).sort(([, a], [, b]) => b - a);
  const maxValue = Math.max(...Object.values(totals));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-slate-900 mb-1">Vehicle Classification</h3>
      <p className="text-xs text-slate-400 mb-6">Aggregated across all survey stations</p>

      <div className="space-y-4">
        {categories.map(([key, value]) => {
          const pct = grandTotal > 0 ? (value / grandTotal) * 100 : 0;
          const barWidth = maxValue > 0 ? (value / maxValue) * 100 : 0;
          return (
            <div key={key} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: VEHICLE_COLORS[key] }}
              />
              <span className="text-sm text-slate-600 w-24 flex-shrink-0">{CATEGORY_LABELS[key]}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: VEHICLE_COLORS[key],
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-24 justify-end">
                <span className="text-sm font-bold text-slate-800">{value.toLocaleString()}</span>
                <span className="text-xs text-slate-400">({pct.toFixed(1)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function VolumeComparisonChart({ records }) {
  if (!Array.isArray(records) || records.length === 0) return null;

  const maxVolume = Math.max(...records.map((r) => r.totalVehicles));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-slate-900 mb-1">Station Volume Comparison</h3>
      <p className="text-xs text-slate-400 mb-6">Total survey volume per observation point</p>

      <div className="space-y-4">
        {records
          .sort((a, b) => b.totalVehicles - a.totalVehicles)
          .map((r) => {
            const barWidth = maxVolume > 0 ? (r.totalVehicles / maxVolume) * 100 : 0;
            const cat = r.totalVehicles > 20000 ? 'high' : r.totalVehicles > 12000 ? 'medium' : 'low';
            const barColor = cat === 'high' ? '#ef4444' : cat === 'medium' ? '#f59e0b' : '#10b981';
            const name = r.locationName.split('—')[1]?.trim() || r.locationName;

            return (
              <div key={r.id} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-36 truncate flex-shrink-0" title={r.locationName}>{name}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-4 rounded-full transition-all duration-700 flex items-center pl-2"
                    style={{ width: `${barWidth}%`, backgroundColor: barColor }}
                  />
                </div>
                <span className="text-sm font-bold text-slate-800 w-20 text-right">{r.totalVehicles.toLocaleString()}</span>
              </div>
            );
          })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-5 pt-4 border-t border-slate-100">
        {[
          { label: 'Low (<12K)', color: '#10b981' },
          { label: 'Medium (12K–20K)', color: '#f59e0b' },
          { label: 'High (>20K)', color: '#ef4444' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-xs text-slate-500">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
