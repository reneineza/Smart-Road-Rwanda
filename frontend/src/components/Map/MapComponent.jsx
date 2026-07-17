'use client';

import { MapContainer, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import dynamic from 'next/dynamic';

const RoadLayer = dynamic(() => import('./RoadLayer'), { ssr: false });
const TrafficLayer = dynamic(() => import('./TrafficLayer'), { ssr: false });
const SafetyLayer = dynamic(() => import('./SafetyLayer'), { ssr: false });
const TransitLayer = dynamic(() => import('./TransitLayer'), { ssr: false });
const AnalyticsLayer = dynamic(() => import('./AnalyticsLayer'), { ssr: false });
const AILayer = dynamic(() => import('./AILayer'), { ssr: false });

// Fix Leaflet default icon paths broken by Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RWANDA_CENTER = [-1.9403, 29.8739];
const INITIAL_ZOOM = 9;

export default function GISMapContainer({ 
  geoData, selectedId, onRoadClick,
  activeLayers = { roads: true },
  extraData = {},
  onExtraPointClick = () => {}
}) {
  return (
    <MapContainer
      center={RWANDA_CENTER}
      zoom={INITIAL_ZOOM}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomright" />

      {/* Dynamic Layer Rendering */}
      {activeLayers.roads && (
        <RoadLayer
          geoData={geoData}
          selectedId={selectedId}
          onRoadClick={onRoadClick}
          fitBounds={true}
          visible={true}
        />
      )}
      
      {activeLayers.traffic && (
        <TrafficLayer 
          data={extraData.traffic} 
          visible={true} 
        />
      )}
      
      {activeLayers.safety && (
        <SafetyLayer 
          data={extraData.safety} 
          onPointClick={onExtraPointClick} 
          visible={true} 
        />
      )}
      
      {activeLayers.transit && (
        <TransitLayer 
          routeData={extraData.transitRoutes} 
          stopData={extraData.transitStops} 
          visible={true} 
        />
      )}

      {activeLayers.analytics && (
        <AnalyticsLayer
          data={extraData.analytics}
          active={true}
        />
      )}

      {activeLayers.ai && (
        <AILayer
          geoData={geoData}
          active={true}
        />
      )}

      {/* Static Administrative Layers */}
      {activeLayers.admin && extraData.districts && (
        <GeoJSON 
          data={extraData.districts} 
          style={{ color: '#64748b', weight: 2, fillOpacity: 0.1, dashArray: '5, 5' }} 
        />
      )}
      {activeLayers.admin && extraData.sectors && (
        <GeoJSON 
          data={extraData.sectors} 
          style={{ color: '#94a3b8', weight: 1, fillOpacity: 0.05, dashArray: '2, 4' }} 
        />
      )}

      {activeLayers.hydro && extraData.lakes && (
        <GeoJSON 
          data={extraData.lakes} 
          style={{ color: '#0ea5e9', weight: 1, fillColor: '#38bdf8', fillOpacity: 0.6 }} 
        />
      )}
      {activeLayers.hydro && extraData.rivers && (
        <GeoJSON 
          data={extraData.rivers} 
          style={{ color: '#38bdf8', weight: 2 }} 
        />
      )}

      {activeLayers.poi && extraData.markets && (
        <GeoJSON 
          data={extraData.markets} 
          pointToLayer={(feature, latlng) => {
            return L.circleMarker(latlng, {
              radius: 6,
              fillColor: '#f59e0b',
              color: '#fff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.9
            });
          }}
        />
      )}

      {activeLayers.landcover && extraData.landcover && (
        <GeoJSON 
          data={extraData.landcover} 
          style={{ color: '#22c55e', weight: 0, fillColor: '#4ade80', fillOpacity: 0.3 }} 
        />
      )}
    </MapContainer>
  );
}
