'use client';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoadLayer from './RoadLayer';

// Fix Leaflet default icon paths broken by Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RWANDA_CENTER = [-1.9403, 29.8739];
const INITIAL_ZOOM = 9;

/**
 * GISMapContainer
 *
 * Pure map canvas. Delegates GIS layer rendering to child layer components.
 * Receives road data and selection state from the parent page.
 *
 * Props:
 *   - geoData: GeoJSON FeatureCollection
 *   - selectedId: id of selected road
 *   - onRoadClick: callback when road is clicked
 */
export default function GISMapContainer({ geoData, selectedId, onRoadClick }) {
  return (
    <MapContainer
      center={RWANDA_CENTER}
      zoom={INITIAL_ZOOM}
      className="w-full h-full"
      zoomControl={false}
    >
      {/* Base Layer — swap URL here for Mapbox/MapLibre/satellite */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomright" />

      {/* Road Network Layer — modular, receives data via props */}
      <RoadLayer
        geoData={geoData}
        selectedId={selectedId}
        onRoadClick={onRoadClick}
        fitBounds={true}
      />

      {/* Future layers injected here:
          <TrafficLayer />
          <AccidentBlackspotsLayer />
          <InfrastructureAssetsLayer />
      */}
    </MapContainer>
  );
}
