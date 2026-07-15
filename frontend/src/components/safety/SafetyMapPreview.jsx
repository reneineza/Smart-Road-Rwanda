'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SafetyLayer from '../Map/SafetyLayer';
import AccidentCard from './AccidentCard';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RWANDA_CENTER = [-1.9403, 29.8739];

export default function SafetyMapPreview({ accidentData = [] }) {
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <div className="relative w-full h-full">
      <MapContainer center={RWANDA_CENTER} zoom={9} className="w-full h-full" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <SafetyLayer data={accidentData} onPointClick={setSelectedRecord} visible />
      </MapContainer>

      {/* Info Card */}
      {selectedRecord && (
        <AccidentCard record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}

      {/* Legend */}
      <div className="absolute bottom-10 left-4 z-[1000] bg-white rounded-xl shadow-lg border border-slate-100 p-3">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Severity</p>
        {[
          { label: 'Fatal', color: '#ef4444' },
          { label: 'Serious Injury', color: '#f97316' },
          { label: 'Minor Injury', color: '#eab308' },
          { label: 'Property Damage', color: '#3b82f6' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-xs text-slate-600">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
