'use client';

import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * TransitLayer
 *
 * Renders transit routes as LineStrings and transit stops as Markers.
 *
 * Props:
 *   - routeData: array of route records (GeoJSON geometry)
 *   - stopData: array of stop records (coordinates)
 *   - onRouteClick: callback(routeRecord)
 *   - onStopClick: callback(stopRecord)
 *   - visible: boolean toggle
 */
export default function TransitLayer({ routeData = [], stopData = [], onRouteClick, onStopClick, visible = true }) {
  const map = useMap();
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    if (layerGroupRef.current) {
      layerGroupRef.current.clearLayers();
    } else {
      layerGroupRef.current = L.featureGroup().addTo(map);
    }

    if (!visible) return;

    // 1. Render Routes
    if (Array.isArray(routeData)) {
      routeData.forEach((route) => {
        if (!route.geometry || route.geometry.type !== 'LineString') return;

        // Leaflet expects [lat, lng], GeoJSON is [lng, lat]
        const latLngs = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

        const polyline = L.polyline(latLngs, {
          color: '#8b5cf6', // Violet
          weight: 4,
          opacity: 0.8,
          dashArray: '5, 10', // Dashed line for transit
          lineCap: 'round'
        });

        polyline.bindTooltip(
          `<strong>${route.route_name}</strong><br/>
           Code: ${route.route_code}<br/>
           Operator: ${route.operator_name}`,
          { sticky: true, className: 'transit-tooltip' }
        );

        polyline.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          if (onRouteClick) onRouteClick(route);
        });

        layerGroupRef.current.addLayer(polyline);
      });
    }

    // 2. Render Stops
    if (Array.isArray(stopData)) {
      stopData.forEach((stop) => {
        const [lng, lat] = stop.coordinates;

        const stopMarker = L.circleMarker([lat, lng], {
          radius: stop.is_terminus ? 8 : 5,
          fillColor: '#ffffff',
          fillOpacity: 1,
          color: '#6d28d9', // Deep violet border
          weight: 2,
        });

        stopMarker.bindTooltip(
          `<strong>${stop.stop_name}</strong><br/>
           <span style="font-size: 10px; color: #666;">Capacity: ${stop.passenger_capacity}</span>`,
          { sticky: true, direction: 'top', offset: [0, -10] }
        );

        stopMarker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          if (onStopClick) onStopClick(stop);
        });

        layerGroupRef.current.addLayer(stopMarker);
      });
    }

    return () => {
      if (layerGroupRef.current) {
        layerGroupRef.current.clearLayers();
      }
    };
  }, [map, routeData, stopData, visible, onRouteClick, onStopClick]);

  return null;
}
