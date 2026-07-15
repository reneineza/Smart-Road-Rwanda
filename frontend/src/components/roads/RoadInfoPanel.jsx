'use client';

import Link from 'next/link';
import { ArrowRight, X, MapPin, Road, Layers, Gauge } from 'lucide-react';
import { CONDITION_COLORS, ROAD_STYLES } from '../Map/roadStyles';

/**
 * RoadInfoPanel
 *
 * Displays a summary card of a selected road's engineering attributes.
 * Shown on the right side of the Map Explorer when a road is clicked.
 *
 * Props:
 *   - road: road properties object (from GeoJSON feature.properties)
 *   - onClose: callback to clear selection
 */
export default function RoadInfoPanel({ road, onClose }) {
  if (!road) return null;

  const conditionColor = CONDITION_COLORS[road.condition] || '#94a3b8';
  const classStyle = ROAD_STYLES[road.classification] || ROAD_STYLES['default'];

  return (
    <div className="absolute top-4 right-4 z-[1000] w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-in">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div
            className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
            style={{ backgroundColor: classStyle.color }}
          />
          <div>
            <h3 className="font-bold text-slate-900 text-sm leading-tight">{road.name}</h3>
            <span className="text-xs text-slate-500 font-medium">{road.code}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Classification Badge */}
      <div className="px-4 py-3 border-b border-slate-100">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: classStyle.color }}
        >
          <Layers className="w-3 h-3" />
          {road.classification}
        </span>
      </div>

      {/* Engineering Attributes */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Surface</p>
            <p className="text-sm font-semibold text-slate-800">{road.surfaceType}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Length</p>
            <p className="text-sm font-semibold text-slate-800">{road.length} <span className="text-xs font-normal text-slate-500">km</span></p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Lanes</p>
            <p className="text-sm font-semibold text-slate-800">{road.lanes}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Built</p>
            <p className="text-sm font-semibold text-slate-800">{road.constructionYear}</p>
          </div>
        </div>

        {/* District */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>{road.district}</span>
          <span className="text-slate-400">•</span>
          <span className="text-xs text-slate-400">{road.authority}</span>
        </div>

        {/* Condition Indicator */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Condition</span>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: conditionColor }}
          >
            {road.condition}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4">
        <Link
          href={`/roads/${road.id}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors"
        >
          View Full Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
