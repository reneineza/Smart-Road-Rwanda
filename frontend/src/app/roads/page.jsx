'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Plus, FileText } from 'lucide-react';
import Link from 'next/link';

export default function RoadInventory() {
  const [roads, setRoads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/roads')
      .then(res => res.json())
      .then(data => {
        // Extract properties from GeoJSON FeatureCollection
        if (data.features) {
          setRoads(data.features.map(f => f.properties));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch roads:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Road Network Inventory</h1>
          <p className="text-slate-500">Manage and analyze transportation corridors.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <FileText className="w-4 h-4" />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Road
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by road name, ID, or district..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Road ID</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Classification</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Surface</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Length (km)</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500">Loading road network data...</td>
              </tr>
            ) : roads.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500">No roads found.</td>
              </tr>
            ) : (
              roads.map((road) => (
                <tr key={road.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{road.id}</td>
                  <td className="py-4 px-6 text-sm text-slate-700 font-semibold">{road.name}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                      {road.classification}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{road.surfaceType}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{road.length}</td>
                  <td className="py-4 px-6 text-right">
                    <Link href={`/roads/${road.id}`} className="text-blue-600 font-medium text-sm hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
