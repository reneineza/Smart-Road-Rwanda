'use client';

import { ROAD_STYLES, CONDITION_COLORS } from '../Map/roadStyles';
import { ChevronRight, Route } from 'lucide-react';

/**
 * RoadList
 *
 * Sidebar list of roads on the Map Explorer.
 * Shows condensed road info; highlights the selected road.
 * Clicking a road triggers onSelect to update parent state.
 *
 * Props:
 *   - roads: array of road property objects
 *   - selectedId: id of the currently selected road
 *   - onSelect: callback(roadProperties) when a road is clicked
 *   - loading: boolean to show skeleton state
 */
export default function RoadList({ roads = [], selectedId, onSelect, loading = false }) {
  const classStyle = (classification) => ROAD_STYLES[classification] || ROAD_STYLES['default'];

  if (loading) {
    return (
      <div className="space-y-2 p-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (roads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center px-4">
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3">
          <Route className="w-5 h-5 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-600">No roads found</p>
        <p className="text-xs text-slate-400 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-2">
      {roads.map((road) => {
        const style = classStyle(road.classification);
        const isSelected = road.id === selectedId;
        const condColor = CONDITION_COLORS[road.condition] || '#94a3b8';

        return (
          <button
            key={road.id}
            onClick={() => onSelect(road)}
            className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-150 flex items-center gap-3 group ${
              isSelected
                ? 'bg-slate-900 shadow-md'
                : 'hover:bg-slate-100'
            }`}
          >
            {/* Classification color dot */}
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5"
              style={{ backgroundColor: style.color }}
            />

            {/* Road info */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                {road.name}
              </p>
              <p className={`text-xs mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                {road.classification} • {road.length} km
              </p>
            </div>

            {/* Condition dot */}
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: condColor }}
              title={road.condition}
            />

            <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-slate-400' : 'text-slate-300 group-hover:text-slate-500'}`} />
          </button>
        );
      })}
    </div>
  );
}
