'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Map as MapIcon, Activity, ShieldAlert, BarChart3, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function RoadDetail() {
  const params = useParams();
  const [road, setRoad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetch(`http://localhost:5000/api/roads/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Road not found');
        return res.json();
      })
      .then(data => {
        setRoad(data.properties);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-8 text-slate-500">Loading road details...</div>;
  if (!road) return <div className="p-8 text-red-500">Road not found.</div>;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: MapIcon },
    { id: 'condition', name: 'Condition', icon: BarChart3 },
    { id: 'traffic', name: 'Traffic', icon: Activity },
    { id: 'safety', name: 'Safety', icon: ShieldAlert },
    { id: 'maintenance', name: 'Maintenance', icon: Wrench },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <Link href="/roads" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Inventory
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-slate-900">{road.name}</h1>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded border border-blue-200">{road.id}</span>
            </div>
            <p className="text-slate-500 text-lg">{road.district} District • {road.classification}</p>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium shadow-sm hover:bg-slate-800 transition-colors">
            Edit Information
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Engineering Attributes</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Classification</span>
                    <span className="text-slate-800 font-medium">{road.classification}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Surface Type</span>
                    <span className="text-slate-800 font-medium">{road.surfaceType}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total Length</span>
                    <span className="text-slate-800 font-medium">{road.length} km</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Number of Lanes</span>
                    <span className="text-slate-800 font-medium">{road.lanes}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Status</h3>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100 mb-4">
                  <div className={`w-3 h-3 rounded-full ${road.condition === 'Good' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <span className="font-medium text-slate-700">Condition: {road.condition}</span>
                </div>
                <p className="text-sm text-slate-500">Last inspected: October 12, 2025</p>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== 'overview' && (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              {activeTab === 'traffic' && <Activity className="w-8 h-8 text-slate-400" />}
              {activeTab === 'safety' && <ShieldAlert className="w-8 h-8 text-slate-400" />}
              {activeTab === 'condition' && <BarChart3 className="w-8 h-8 text-slate-400" />}
              {activeTab === 'maintenance' && <Wrench className="w-8 h-8 text-slate-400" />}
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2 capitalize">{tab.name} Data</h3>
            <p className="text-slate-500 max-w-md">This module is part of a future milestone. Once integrated, it will display detailed {tab.name.toLowerCase()} analytics specifically for {road.name}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
