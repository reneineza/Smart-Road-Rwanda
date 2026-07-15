'use client';

import { ROAD_STYLES, CONDITION_COLORS } from './roadStyles';

/**
 * MapLegend
 * 
 * Displays a floating legend on the map showing road classification colors
 * and condition status indicators.
 */
export default function MapLegend() {
  return (
    <div className="absolute bottom-10 left-4 z-[1000] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 min-w-[180px]">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Legend</p>
      
      <p className="text-xs font-semibold text-slate-600 mb-2">Road Classification</p>
      <div className="space-y-1.5 mb-4">
        {Object.entries(ROAD_STYLES).filter(([key]) => key !== 'default').map(([cls, style]) => (
          <div key={cls} className="flex items-center gap-2">
            <div
              className="w-5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: style.color }}
            />
            <span className="text-xs text-slate-600">{cls}</span>
          </div>
        ))}
      </div>

      <p className="text-xs font-semibold text-slate-600 mb-2">Condition</p>
      <div className="space-y-1.5">
        {Object.entries(CONDITION_COLORS).map(([cond, color]) => (
          <div key={cond} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate-600">{cond}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
