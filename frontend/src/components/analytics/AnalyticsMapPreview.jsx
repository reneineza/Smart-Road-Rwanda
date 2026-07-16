'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function AnalyticsMapPreview({ priorities }) {
  if (!priorities || priorities.length === 0) {
      return <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-400 text-sm">No spatial data available</div>;
  }

  // Create a FeatureCollection from the priority locations that have geometry
  const geoData = {
    type: 'FeatureCollection',
    features: priorities.filter(p => p.geometry).map(p => ({
      type: 'Feature',
      properties: { ...p },
      geometry: p.geometry
    }))
  };

  const styleFeature = (feature) => {
    const score = feature.properties.priorityScore;
    let color = '#10b981'; // emerald
    if (score >= 80) color = '#ef4444'; // red
    else if (score >= 60) color = '#f97316'; // orange
    else if (score >= 40) color = '#f59e0b'; // amber

    return {
      color,
      weight: 6,
      opacity: 0.9,
      lineCap: 'round'
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.bindTooltip(`
        <strong>${feature.properties.roadName}</strong><br/>
        Score: ${feature.properties.priorityScore}<br/>
        <span style="font-size: 10px; color: #666;">${feature.properties.reasons.join(', ')}</span>
    `, { sticky: true });
  };

  return (
    <MapContainer
      center={[-1.9403, 29.8739]} // Kigali roughly
      zoom={11}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <GeoJSON data={geoData} style={styleFeature} onEachFeature={onEachFeature} />
      <BoundsFitter geoData={geoData} />
    </MapContainer>
  );
}

const BoundsFitter = ({ geoData }) => {
  const map = useMap();
  useEffect(() => {
    if (geoData && geoData.features && geoData.features.length > 0) {
      const layer = L.geoJSON(geoData);
      map.fitBounds(layer.getBounds(), { padding: [30, 30] });
    }
  }, [map, geoData]);
  return null;
};
