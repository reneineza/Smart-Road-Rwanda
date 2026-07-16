import { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { BrainCircuit } from 'lucide-react';

export default function AILayer({ geoData, active }) {
  const map = useMap();
  const [layer, setLayer] = useState(null);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    if (!active || !geoData) {
      if (layer) {
        map.removeLayer(layer);
        // We defer the state update to avoid cascading renders
        setTimeout(() => setLayer(null), 0);
      }
      return;
    }

    if (layer) return; // already active

    // Fetch AI predictions for all roads in geoData
    const fetchAllPredictions = async () => {
      try {
        const roadIds = geoData.features.map(f => f.properties.id);
        
        // Fetch maintenance and safety for all roads concurrently
        const maintenancePromises = roadIds.map(id => fetch(`http://localhost:5000/api/ai/road-condition/${id}`).then(r => r.json()));
        const safetyPromises = roadIds.map(id => fetch(`http://localhost:5000/api/ai/safety-risk/${id}`).then(r => r.json()));
        
        const maintenanceResults = await Promise.all(maintenancePromises);
        const safetyResults = await Promise.all(safetyPromises);

        const predictionMap = {};
        for (let i = 0; i < roadIds.length; i++) {
          predictionMap[roadIds[i]] = {
            maintenance: maintenanceResults[i],
            safety: safetyResults[i]
          };
        }
        
        renderLayer(predictionMap);
      } catch (err) {
        console.error("Failed to load AI predictions for map layer", err);
      }
    };

    const renderLayer = (predictionMap) => {
      const styleFeature = (feature) => {
        const p = predictionMap[feature.properties.id];
        if (!p) return { color: '#cbd5e1', weight: 4 };

        // Determine style based on worst risk
        const maintScore = p.maintenance?.deterioration_score || 0;
        const safetyScore = p.safety?.risk_score || 0;
        
        let color = '#3b82f6'; // default blue
        let weight = 5;

        // If high risk in either category, highlight in neon colors
        if (maintScore > 70 || safetyScore > 75) {
          color = '#ef4444'; // red (critical)
          weight = 8;
        } else if (maintScore > 40 || safetyScore > 50) {
          color = '#f59e0b'; // amber (warning)
          weight = 6;
        }

        return {
          color,
          weight,
          opacity: 0.9,
          lineCap: 'round',
          dashArray: (maintScore > 70 || safetyScore > 75) ? '1 10' : 'none' // Dotted for critical
        };
      };

      const onEachFeature = (feature, l) => {
        const p = predictionMap[feature.properties.id];
        if (!p) return;

        l.bindTooltip(`
          <div style="font-family: sans-serif; min-width: 250px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                <strong style="color: #4f46e5; font-size: 14px;">AI Analysis: ${feature.properties.name}</strong>
              </div>
              
              <div style="background: #f8fafc; padding: 6px; border-radius: 4px; margin-bottom: 4px; border: 1px solid #e2e8f0;">
                <span style="font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold;">Condition Prediction</span><br/>
                <span style="font-weight: bold; color: ${p.maintenance.risk_level === 'High' ? 'red' : '#333'}">${p.maintenance.prediction}</span><br/>
                <span style="font-size: 11px; color: #475569;">Action: ${p.maintenance.recommended_action}</span>
              </div>

              <div style="background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0;">
                <span style="font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold;">Safety Risk</span><br/>
                <span style="font-weight: bold; color: ${p.safety.risk_level === 'Critical' ? 'red' : '#333'}">Score: ${p.safety.risk_score}/100 (${p.safety.risk_level})</span><br/>
                <span style="font-size: 11px; color: #475569;">Action: ${p.safety.recommended_action}</span>
              </div>
          </div>
        `, { sticky: true });
      };

      const newLayer = L.geoJSON(geoData, {
        style: styleFeature,
        onEachFeature: onEachFeature
      });

      newLayer.addTo(map);
      setLayer(newLayer);
    };

    fetchAllPredictions();

    return () => {
      if (layer) {
        map.removeLayer(layer);
      }
    };
  }, [active, geoData, map]); // Removed 'layer' from deps to prevent loop

  return null;
}
