'use client';

import { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';

export default function RoadNetworkLayer() {
  const [geoData, setGeoData] = useState(null);
  const map = useMap();

  useEffect(() => {
    // Fetch road network from backend
    fetch('http://localhost:5000/api/roads')
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
        
        // Optionally fit map bounds to data
        if (data.features && data.features.length > 0) {
          const geoJsonLayer = L.geoJSON(data);
          map.fitBounds(geoJsonLayer.getBounds(), { padding: [50, 50] });
        }
      })
      .catch((err) => console.error('Failed to load road network:', err));
  }, [map]);

  if (!geoData) return null;

  // Dynamic styling based on road classification
  const styleRoads = (feature) => {
    const cls = feature.properties.classification;
    let color = '#3b82f6'; // Default blue
    let weight = 4;
    
    if (cls === 'National Road') {
      color = '#ef4444'; // Red
      weight = 6;
    } else if (cls === 'District Road') {
      color = '#f59e0b'; // Amber
      weight = 4;
    }

    return {
      color,
      weight,
      opacity: 0.8,
      lineCap: 'round',
      lineJoin: 'round',
    };
  };

  // Bind interactive popups
  const onEachRoad = (feature, layer) => {
    const { name, classification, surfaceType, length, condition, id } = feature.properties;
    
    const popupContent = `
      <div class="p-2 min-w-[200px]">
        <h3 class="font-bold text-slate-800 text-base mb-1">${name}</h3>
        <span class="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full border border-slate-200 mb-3">${classification}</span>
        
        <div class="grid grid-cols-2 gap-y-2 text-sm">
          <div class="text-slate-500">Surface:</div>
          <div class="font-medium text-slate-800 text-right">${surfaceType}</div>
          
          <div class="text-slate-500">Length:</div>
          <div class="font-medium text-slate-800 text-right">${length} km</div>
          
          <div class="text-slate-500">Condition:</div>
          <div class="font-medium text-${condition === 'Good' ? 'emerald' : 'amber'}-600 text-right">${condition}</div>
        </div>
        
        <div class="mt-4 pt-3 border-t border-slate-100 text-center">
          <a href="/roads/${id}" class="text-blue-600 hover:text-blue-800 text-sm font-medium">View Full Details →</a>
        </div>
      </div>
    `;

    layer.bindPopup(popupContent, { className: 'road-popup' });
    
    // Hover effects
    layer.on({
      mouseover: (e) => {
        const lyr = e.target;
        lyr.setStyle({
          weight: 8,
          opacity: 1
        });
      },
      mouseout: (e) => {
        geoJsonLayerRef.current.resetStyle(e.target);
      }
    });
  };

  // We need a ref to the geoJson layer to reset styles
  let geoJsonLayerRef = { current: null };

  return (
    <GeoJSON 
      data={geoData} 
      style={styleRoads} 
      onEachFeature={onEachRoad}
      ref={(ref) => { geoJsonLayerRef.current = ref; }}
    />
  );
}
