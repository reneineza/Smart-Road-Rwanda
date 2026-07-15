'use client';

import { useEffect, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { getRoadStyle, ROAD_HOVER_STYLE, ROAD_SELECTED_STYLE } from './roadStyles';

/**
 * RoadLayer
 * 
 * Pure GIS component responsible for rendering road GeoJSON on the map.
 * Decoupled from data fetching — receives data and selection state as props.
 * 
 * Props:
 *   - geoData: GeoJSON FeatureCollection
 *   - selectedId: id of the currently selected road
 *   - onRoadClick: callback(roadProperties) when user clicks a road
 *   - fitBounds: whether to auto-fit map to data on first load
 */
export default function RoadLayer({ geoData, selectedId, onRoadClick, fitBounds = true, visible = true }) {
  const map = useMap();
  const layerRef = useRef(null);

  // Auto-fit map bounds when data is first loaded
  useEffect(() => {
    if (fitBounds && geoData?.features?.length > 0 && layerRef.current) {
      try {
        const bounds = layerRef.current.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [40, 40] });
        }
      } catch (e) {
        // Bounds not ready yet — silently ignore
      }
    }
  }, [geoData, map, fitBounds]);

  if (!visible || !geoData) return null;

  const styleFeature = (feature) => {
    const isSelected = feature.properties.id === selectedId;
    if (isSelected) {
      return { ...ROAD_SELECTED_STYLE, lineCap: 'round', lineJoin: 'round' };
    }
    return {
      ...getRoadStyle(feature.properties.classification),
      lineCap: 'round',
      lineJoin: 'round',
    };
  };

  const onEachFeature = (feature, layer) => {
    const props = feature.properties;

    // Click — notify parent and open info panel
    layer.on('click', () => {
      if (onRoadClick) onRoadClick(props);
    });

    // Hover highlight
    layer.on('mouseover', (e) => {
      if (props.id !== selectedId) {
        e.target.setStyle({ weight: ROAD_HOVER_STYLE.weight, opacity: ROAD_HOVER_STYLE.opacity });
      }
    });

    layer.on('mouseout', (e) => {
      if (layerRef.current) {
        layerRef.current.resetStyle(e.target);
        // Re-apply selection style if this road is selected
        if (props.id === selectedId) {
          e.target.setStyle({ ...ROAD_SELECTED_STYLE, lineCap: 'round', lineJoin: 'round' });
        }
      }
    });
  };

  // Key forces GeoJSON layer to re-render when selection changes (to update style)
  const layerKey = `roads-${selectedId || 'none'}`;

  return (
    <GeoJSON
      key={layerKey}
      data={geoData}
      style={styleFeature}
      onEachFeature={onEachFeature}
      ref={layerRef}
    />
  );
}
