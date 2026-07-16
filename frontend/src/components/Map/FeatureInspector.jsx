import React, { useState } from 'react';
import { X, Map as MapIcon, Activity, ShieldAlert, BarChart3, Wrench, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function FeatureInspector({ roadId, feature, onClose }) {
  const [activeTab, setActiveTab] = useState('engineering');

  if (!feature) return null;

  // With the new schema, attributes are under 'engineering', fallback to 'properties'
  const props = feature.engineering || feature.properties || {};

  const tabs = [
    { id: 'engineering', name: 'Engineering', icon: MapIcon },
    { id: 'traffic', name: 'Traffic', icon: Activity },
    { id: 'safety', name: 'Safety', icon: ShieldAlert },
    { id: 'maintenance', name: 'Maintenance', icon: Wrench },
    { id: 'ai', name: 'AI Insights', icon: BarChart3 }
  ];

  return (
    <div className="absolute top-0 right-0 h-full w-96 bg-white shadow-2xl z-[1000] flex flex-col transform transition-transform duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-md uppercase tracking-wider mb-2 inline-block">
              {props.classification || 'Unknown Class'}
            </span>
            <h2 className="text-xl font-bold">{props.name || 'Unnamed Road'}</h2>
            <p className="text-slate-400 text-sm font-mono mt-1">ID: {roadId}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 text-xs font-medium border-b-2 transition-colors ${
                isActive ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-white">
        {activeTab === 'engineering' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Physical Attributes</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Surface Type</p>
                  <p className="font-semibold text-slate-800 capitalize">{props.surface_type || 'Unknown'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Total Lanes</p>
                  <p className="font-semibold text-slate-800">{props.lanes || 2}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Length</p>
                  <p className="font-semibold text-slate-800">{props.length ? `${props.length} km` : 'N/A'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Speed Limit</p>
                  <p className="font-semibold text-slate-800">{props.maxspeed || 'Unknown'}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Operational Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Est. Capacity</span>
                  <span className="text-sm font-bold text-slate-900">{props.estimated_capacity || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Authority</span>
                  <span className="text-sm font-bold text-slate-900">{props.responsible_authority || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'engineering' && (
          <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-60">
            {activeTab === 'traffic' && <Activity className="w-12 h-12 text-slate-400 mb-3" />}
            {activeTab === 'safety' && <ShieldAlert className="w-12 h-12 text-slate-400 mb-3" />}
            {activeTab === 'maintenance' && <Wrench className="w-12 h-12 text-slate-400 mb-3" />}
            {activeTab === 'ai' && <BarChart3 className="w-12 h-12 text-slate-400 mb-3" />}
            
            <p className="text-slate-600 font-medium mb-1 capitalize">{activeTab} Data Pending</p>
            <p className="text-sm text-slate-400 max-w-[200px]">This module will connect to real-time engineering sources shortly.</p>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <Link 
          href={`/roads/${encodeURIComponent(roadId)}`} 
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
        >
          Open Full Engineering Report
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
