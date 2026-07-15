'use client';

import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * Accident severity colors
 */
const SEVERITY_COLORS = {
  'Fatal': '#ef4444', // Red
  'Serious injury': '#f97316', // Orange
  'Minor injury': '#eab308', // Yellow
  'Property damage only': '#3b82f6', // Blue
};

const getSeverityColor = (severity) => {
  return SEVERITY_COLORS[severity] || '#94a3b8'; // Slate fallback
};

/**
 * SafetyLayer
 *
 * Renders accident locations on the Leaflet map as points
 * color-coded by severity.
 *
 * Props:
 *   - data: array of accident records (from API)
 *   - onPointClick: callback(accidentRecord) on marker click
 *   - visible: boolean toggle (for layer control)
 */
export default function SafetyLayer({ data = [], onPointClick, visible = true }) {
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

    if (!visible || !Array.isArray(data) || data.length === 0) return;

    data.forEach((record) => {
      const [lng, lat] = record.coordinates;
      const color = getSeverityColor(record.severity);

      // Core marker
      const coreMarker = L.circleMarker([lat, lng], {
        radius: record.severity === 'Fatal' ? 10 : record.severity === 'Serious injury' ? 8 : 6,
        fillColor: color,
        fillOpacity: 0.8,
        color: '#ffffff',
        weight: 1.5,
        opacity: 1,
      });

      // Tooltip
      coreMarker.bindTooltip(
        `<strong>${record.location_name}</strong><br/>
         ${record.severity}<br/>
         <span style="font-size: 10px; color: #666;">${record.accident_type}</span>`,
        { sticky: true, className: 'safety-tooltip' }
      );

      // Click handler
      coreMarker.on('click', () => {
        if (onPointClick) onPointClick(record);
      });

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
