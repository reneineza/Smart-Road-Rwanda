'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Search, SlidersHorizontal, X, Layers, ChevronDown } from 'lucide-react';
import RoadList from '../../components/roads/RoadList';
import RoadInfoPanel from '../../components/roads/RoadInfoPanel';
import MapLegend from '../../components/Map/MapLegend';
import { CLASSIFICATION_OPTIONS, SURFACE_OPTIONS, CONDITION_OPTIONS } from '../../components/Map/roadStyles';

// Leaflet requires dynamic import (uses window)
const GISMapContainer = dynamic(
  () => import('../../components/Map/MapComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium text-sm">Initializing GIS Canvas...</p>
        </div>
      </div>
    ),
  }
);

export default function MapExplorer() {
  const [allRoads, setAllRoads] = useState(null);  // Full GeoJSON FeatureCollection
  const [loading, setLoading] = useState(true);
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterSurface, setFilterSurface] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  // Fetch road network on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/roads')
      .then((r) => r.json())
      .then((data) => {
        setAllRoads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load road data:', err);
        setLoading(false);
      });
  }, []);

  // Derive filtered roads
  const filteredGeoData = useMemo(() => {
    if (!allRoads) return null;

    const filtered = allRoads.features.filter((f) => {
      const p = f.properties;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.code?.toLowerCase().includes(search.toLowerCase());
      const matchClass = !filterClass || p.classification === filterClass;
      const matchSurface = !filterSurface || p.surfaceType === filterSurface;
      const matchCondition = !filterCondition || p.condition === filterCondition;
      return matchSearch && matchClass && matchSurface && matchCondition;
    });

    return { ...allRoads, features: filtered };
  }, [allRoads, search, filterClass, filterSurface, filterCondition]);

  const roadList = filteredGeoData?.features.map((f) => f.properties) || [];
  const activeFilterCount = [filterClass, filterSurface, filterCondition].filter(Boolean).length;

  const clearFilters = () => {
    setSearch('');
    setFilterClass('');
    setFilterSurface('');
    setFilterCondition('');
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">

      {/* Toolbar */}
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-4 shadow-sm z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-slate-800 text-sm">Map Explorer</h2>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200 font-medium">
            {loading ? '...' : `${roadList.length} road${roadList.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search road name or code..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              activeFilterCount > 0
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-0.5 bg-white text-blue-600 rounded-full w-4 h-4 text-xs font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Layers className="w-3.5 h-3.5" />
            Layers
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          {[
            { value: filterClass, setter: setFilterClass, options: CLASSIFICATION_OPTIONS, label: 'Classification' },
            { value: filterSurface, setter: setFilterSurface, options: SURFACE_OPTIONS, label: 'Surface' },
            { value: filterCondition, setter: setFilterCondition, options: CONDITION_OPTIONS, label: 'Condition' },
          ].map(({ value, setter, options, label }) => (
            <div key={label} className="relative">
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                {options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          ))}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Main workspace — 3 columns */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Panel — Road List */}
        <div className="w-72 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Network Inventory</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <RoadList
              roads={roadList}
              selectedId={selectedRoad?.id}
              onSelect={setSelectedRoad}
              loading={loading}
            />
          </div>
        </div>

        {/* Center — Map Canvas */}
        <div className="flex-1 relative">
          <GISMapContainer
            geoData={filteredGeoData}
            selectedId={selectedRoad?.id}
            onRoadClick={setSelectedRoad}
          />

          {/* Floating map legend */}
          <MapLegend />

          {/* Selected road info panel — floats over the map */}
          {selectedRoad && (
            <RoadInfoPanel
              road={selectedRoad}
              onClose={() => setSelectedRoad(null)}
            />
          )}
        </div>

      </div>
    </div>
  );
}
