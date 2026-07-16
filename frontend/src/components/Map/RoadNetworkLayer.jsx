'use client';

import React, { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';

export default function RoadNetworkLayer({ onRoadClick }) {
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

  // We need a ref to the geoJson layer to reset styles
  const geoJsonLayerRef = React.useRef(null);

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

  // Bind interactive clicks (no popups, handled by FeatureInspector)
  const onEachRoad = (feature, layer) => {
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
      },
      click: () => {
        if (onRoadClick) {
          // feature is passed so the inspector doesn't need to fetch it immediately
          onRoadClick(feature.id || feature.properties.id, feature);
        }
      }
    });
  };

  return (
    <GeoJSON 
      data={geoData} 
      style={styleRoads} 
      onEachFeature={onEachRoad}
      ref={geoJsonLayerRef}
    />
  );
}
