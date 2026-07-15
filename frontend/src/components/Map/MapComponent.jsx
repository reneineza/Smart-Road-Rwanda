'use client';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoadLayer from './RoadLayer';
import TrafficLayer from './TrafficLayer';
import SafetyLayer from './SafetyLayer';
import TransitLayer from './TransitLayer';

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

      <RoadLayer
        geoData={geoData}
        selectedId={selectedId}
        onRoadClick={onRoadClick}
        fitBounds={true}
        visible={activeLayers.roads}
      />
      
      <TrafficLayer 
        data={extraData.traffic} 
        visible={activeLayers.traffic} 
      />
      
      <SafetyLayer 
        data={extraData.safety} 
        onPointClick={onExtraPointClick} 
        visible={activeLayers.safety} 
      />
      
      <TransitLayer 
        routeData={extraData.transitRoutes} 
        stopData={extraData.transitStops} 
        visible={activeLayers.transit} 
      />
    </MapContainer>
  );
}
