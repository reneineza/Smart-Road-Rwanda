'use client';

import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * Traffic volume thresholds for visual categorization
 * Based on 12-hour survey totals for Rwanda's road network context
 */
const TRAFFIC_THRESHOLDS = {
  low: 8000,     // < 8,000 veh/12hr
  medium: 15000, // 8,000–15,000 veh/12hr
  high: Infinity, // > 15,000 veh/12hr
};

const TRAFFIC_COLORS = {
  low: '#10b981',    // Emerald — Low
  medium: '#f59e0b', // Amber — Medium
  high: '#ef4444',   // Red — High
};

const getTrafficCategory = (totalVehicles) => {
  if (totalVehicles < TRAFFIC_THRESHOLDS.low) return 'low';
  if (totalVehicles < TRAFFIC_THRESHOLDS.medium) return 'medium';
  return 'high';
};

const getTrafficColor = (totalVehicles) => {
  return TRAFFIC_COLORS[getTrafficCategory(totalVehicles)];
};

/**
 * TrafficLayer
 *
 * Renders traffic observation points on the Leaflet map as
 * pulsing circle markers color-coded by traffic volume.
 *
 * Props:
 *   - data: array of traffic records (from API)
 *   - onPointClick: callback(trafficRecord) on marker click
 *   - visible: boolean toggle (for layer control)
 */
export default function TrafficLayer({ data = [], onPointClick, visible = true }) {
  const map = useMap();
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Clean up previous markers
    if (layerGroupRef.current) {
      layerGroupRef.current.clearLayers();
    } else {
      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    if (!visible || data.length === 0) return;

    data.forEach((record) => {
      const [lng, lat] = record.coordinates;
      const color = getTrafficColor(record.totalVehicles);
      const category = getTrafficCategory(record.totalVehicles);
      const radius = category === 'high' ? 16 : category === 'medium' ? 12 : 9;

      // Outer pulsing ring
      const pulseMarker = L.circleMarker([lat, lng], {
        radius: radius + 6,
        fillColor: color,
        fillOpacity: 0.15,
        color: color,
        weight: 1.5,
        opacity: 0.4,
      });

      // Inner solid dot
      const coreMarker = L.circleMarker([lat, lng], {
        radius,
        fillColor: color,
        fillOpacity: 0.9,
        color: '#ffffff',
        weight: 2.5,
        opacity: 1,
      });

      // Tooltip
      coreMarker.bindTooltip(
        `<strong>${record.locationName}</strong><br/>
         ${record.totalVehicles.toLocaleString()} veh/survey`,
        { sticky: true, className: 'traffic-tooltip' }
      );

      // Click handler
      coreMarker.on('click', () => {
        if (onPointClick) onPointClick(record);
      });

      layerGroupRef.current.addLayer(pulseMarker);
      layerGroupRef.current.addLayer(coreMarker);
    });

    return () => {
      if (layerGroupRef.current) {
        layerGroupRef.current.clearLayers();
      }
    };
  }, [map, data, visible, onPointClick]);

  return null; // Renders imperatively via Leaflet
}
