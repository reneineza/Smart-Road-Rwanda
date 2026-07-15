'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Layers, Filter } from 'lucide-react';

// Leaflet relies on the window object, so we must load it dynamically with SSR disabled
const Map = dynamic(() => import('../../components/Map/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Initializing GIS Canvas...</p>
      </div>
    </div>
  )
});

export default function MapExplorer() {
  return (
    <div className="h-full flex flex-col">
      {/* Map Toolbar */}
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shadow-sm z-10 relative">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-slate-800">Map Explorer</h2>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full border border-slate-200">Interactive Workspace</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            <Layers className="w-4 h-4" />
            Layer Manager
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative z-0">
        <Map />
      </div>
    </div>
  );
}
