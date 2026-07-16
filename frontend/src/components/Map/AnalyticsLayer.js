import { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { AlertTriangle } from 'lucide-react';

export default function AnalyticsLayer({ data, active }) {
  const map = useMap();
  const [layer, setLayer] = useState(null);

  useEffect(() => {
    if (!active || !data || data.length === 0) {
      if (layer) {
        map.removeLayer(layer);
        setTimeout(() => setLayer(null), 0);
      }
      return;
    }

    if (layer) return; // already active

    // Map priorities into GeoJSON
    const geoData = {
      type: 'FeatureCollection',
      features: data.filter(p => p.geometry).map(p => ({
        type: 'Feature',
        properties: { ...p },
        geometry: p.geometry
      }))
    };

    const styleFeature = (feature) => {
      const score = feature.properties.priorityScore;
      let color = '#10b981';
      if (score >= 80) color = '#ef4444';
      else if (score >= 60) color = '#f97316';
      else if (score >= 40) color = '#f59e0b';

      return {
        color,
        weight: score >= 80 ? 8 : 6, // thicker for higher priority
        opacity: score >= 80 ? 0.9 : 0.7,
        lineCap: 'round',
        dashArray: '4 8' // dashed pulsing effect metaphor
      };
    };

    const onEachFeature = (feature, l) => {
      l.bindTooltip(`
        <div style="font-family: sans-serif;">
            <strong>${feature.properties.roadName}</strong><br/>
            Priority Score: <strong style="color: red;">${feature.properties.priorityScore}</strong><br/>
            <span style="font-size: 10px; color: #666;">${feature.properties.reasons.join(', ')}</span>
        </div>
      `, { sticky: true });
    };

    const newLayer = L.geoJSON(geoData, {
      style: styleFeature,
      onEachFeature: onEachFeature
    });

    newLayer.addTo(map);
    setTimeout(() => setLayer(newLayer), 0);

    return () => {
      if (newLayer) {
        map.removeLayer(newLayer);
      }
    };
  }, [active, data, map]);

  return null;
}
