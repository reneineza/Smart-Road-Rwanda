'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Map as MapIcon, Activity, ShieldAlert, BarChart3, Wrench } from 'lucide-react';
import Link from 'next/link';
import { VehicleClassificationChart } from '../../../components/traffic/TrafficChart';

export default function RoadDetail() {
  const params = useParams();
  const [road, setRoad] = useState(null);
  const [trafficRecords, setTrafficRecords] = useState([]);
  const [safetyRecords, setSafetyRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Handle [...id] catch-all route (Next.js passes it as an array if it contains slashes)
  const idArray = params?.id || [];
  const rawId = Array.isArray(idArray) ? idArray.join('/') : idArray;
  const roadId = decodeURIComponent(rawId);

  useEffect(() => {
    if (!roadId) return;

    fetch(`http://localhost:5000/api/roads/${encodeURIComponent(roadId)}`)
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

    fetch(`http://localhost:5000/api/roads/${encodeURIComponent(roadId)}/traffic`)
      .then(res => res.json())
      .then(data => setTrafficRecords(Array.isArray(data) ? data : []))
      .catch(() => setTrafficRecords([]));

    fetch(`http://localhost:5000/api/roads/${encodeURIComponent(roadId)}/safety`)
      .then(res => res.json())
      .then(data => setSafetyRecords(Array.isArray(data) ? data : []))
      .catch(() => setSafetyRecords([]));
  }, [roadId]);

  if (loading) return <div className="p-8 text-slate-500">Loading road details...</div>;
  if (!road) return <div className="p-8 text-red-500">Road not found.</div>;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: MapIcon },
    { id: 'traffic', name: 'Traffic', icon: Activity },
    { id: 'condition', name: 'Condition', icon: BarChart3 },
    { id: 'safety', name: 'Safety', icon: ShieldAlert },
    { id: 'maintenance', name: 'Maintenance', icon: Wrench },
  ];

  const LOS_BADGE = {
    A: 'bg-emerald-100 text-emerald-700',
    B: 'bg-green-100 text-green-700',
    C: 'bg-yellow-100 text-yellow-700',
    D: 'bg-orange-100 text-orange-700',
    E: 'bg-red-100 text-red-700',
    F: 'bg-red-200 text-red-900',
  };

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
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded border border-blue-200">{road.code}</span>
            </div>
            <p className="text-slate-500 text-lg">{road.district} District — {road.classification}</p>
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
            const hasTrafficData = tab.id === 'traffic' && trafficRecords.length > 0;
            const hasSafetyData = tab.id === 'safety' && safetyRecords.length > 0;
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
                {hasTrafficData && (
                  <span className="ml-1 w-4 h-4 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                    {trafficRecords.length}
                  </span>
                )}
                {hasSafetyData && (
                  <span className="ml-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                    {safetyRecords.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Engineering Attributes</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                  {[
                    ['Classification', road.classification],
                    ['Surface Type', road.surfaceType],
                    ['Total Length', `${road.length} km`],
                    ['Number of Lanes', road.lanes],
                    ['Construction Year', road.constructionYear],
                    ['Responsible Authority', road.authority],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">{label}</span>
                      <span className="text-slate-800 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Status</h3>
                <div className={`flex items-center gap-3 p-4 rounded-lg border mb-4 ${
                  road.condition === 'Good' ? 'bg-emerald-50 border-emerald-100' :
                  road.condition === 'Fair' ? 'bg-amber-50 border-amber-100' :
                  'bg-red-50 border-red-100'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    road.condition === 'Good' ? 'bg-emerald-500' :
                    road.condition === 'Fair' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className="font-medium text-slate-700">Condition: {road.condition}</span>
                </div>
                {trafficRecords.length > 0 && (
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg mb-2">
                    <p className="text-xs font-semibold text-amber-700">Traffic Data Available</p>
                    <p className="text-sm font-bold text-amber-900 mt-1">{trafficRecords.length} survey station{trafficRecords.length > 1 ? 's' : ''}</p>
                  </div>
                )}
                {safetyRecords.length > 0 && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-xs font-semibold text-red-700">Safety Alerts</p>
                    <p className="text-sm font-bold text-red-900 mt-1">{safetyRecords.length} recorded accident{safetyRecords.length > 1 ? 's' : ''}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'traffic' && (
          <div className="space-y-6">
            {trafficRecords.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <Activity className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">No traffic surveys recorded for this road.</p>
                <p className="text-xs text-slate-400 mt-1">Traffic surveys linked by road ID will appear here.</p>
              </div>
            ) : (
              trafficRecords.map((record) => {
                const los = record.computed?.los;
                return (
                  <div key={record.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-slate-900">{record.locationName}</h4>
                        <p className="text-sm text-slate-500">{record.surveyDate} — {record.surveyPeriod} — {record.observer}</p>
                      </div>
                      {los && (
                        <span className={`px-3 py-1 rounded-full text-sm font-black ${LOS_BADGE[los] || ''}`}>
                          LOS {los}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Survey Volume', value: record.totalVehicles.toLocaleString(), unit: 'veh/survey' },
                        { label: 'Est. AADT', value: record.computed?.estimatedAADT?.toLocaleString() || 'TBD', unit: 'veh/day' },
                        { label: 'Peak Hour Vol.', value: record.peakHourVolume.toLocaleString(), unit: record.peakHour },
                        { label: 'Heavy Vehicle %', value: `${record.heavyVehiclePct?.toFixed(1)}%`, unit: 'of total volume' },
                      ].map(({ label, value, unit }) => (
                        <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{label}</p>
                          <p className="text-2xl font-black text-slate-900">{value}</p>
                          <p className="text-xs text-slate-400 mt-1">{unit}</p>
                        </div>
                      ))}
                    </div>
                    <VehicleClassificationChart records={[record]} />
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="space-y-6">
            {safetyRecords.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">No safety incidents recorded for this road.</p>
                <p className="text-xs text-slate-400 mt-1">Accident records linked by road ID will appear here.</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                      <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                      <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity</th>
                      <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {safetyRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-5 text-sm text-slate-600">
                          {record.accident_date}<br/>
                          <span className="text-xs text-slate-400">{record.accident_time}</span>
                        </td>
                        <td className="py-4 px-5">
                          <p className="text-sm font-semibold text-slate-900">{record.location_name}</p>
                        </td>
                        <td className="py-4 px-5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            record.severity === 'Fatal' ? 'bg-red-100 text-red-700' :
                            record.severity === 'Serious injury' ? 'bg-orange-100 text-orange-700' :
                            record.severity === 'Minor injury' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {record.severity}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-sm text-slate-700">{record.accident_type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {(activeTab === 'condition' || activeTab === 'maintenance') && (() => {
          const currentTab = tabs.find(t => t.id === activeTab);
          return (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                {activeTab === 'condition' && <BarChart3 className="w-8 h-8 text-slate-400" />}
                {activeTab === 'maintenance' && <Wrench className="w-8 h-8 text-slate-400" />}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{currentTab?.name} Data</h3>
              <p className="text-slate-500 max-w-md">
                This module is part of a future milestone. Once integrated, it will display detailed {currentTab?.name.toLowerCase()} analytics for {road.name}.
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
