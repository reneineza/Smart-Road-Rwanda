'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoadNetworkLayer from './RoadNetworkLayer';

// Fix for default marker icons in React-Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Initial coordinates for Rwanda
const RWANDA_CENTER = [-1.9403, 29.8739];
const INITIAL_ZOOM = 9;

export default function MapComponent() {
  return (
    <MapContainer 
      center={RWANDA_CENTER} 
      zoom={INITIAL_ZOOM} 
      className="w-full h-full"
      zoomControl={false} // Disable default to reposition it
    >
      {/* Base Map Layer: Modular design allows easy swapping to Mapbox/MapLibre later */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <ZoomControl position="bottomright" />

      {/* Operational Layers */}
      <RoadNetworkLayer />

    </MapContainer>
  );
}
