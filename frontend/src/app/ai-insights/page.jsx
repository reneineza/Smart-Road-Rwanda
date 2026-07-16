'use client';

import { useEffect, useState } from 'react';
import { BrainCircuit, HardHat, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';
import PredictionCard from '../../components/ai/PredictionCard';

export default function AIInsights() {
  const [data, setData] = useState({
    condition: [],
    traffic: [],
    safety: []
  });
  const [loading, setLoading] = useState(true);

  // We fetch a few specific roads to showcase the predictions
  // In a real app, this might be a paginated list or filtered by region
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        // Use actual IDs from the sample_roads.json data
        const targets = ['rwa-rn1-001', 'rwa-rn4-001', 'kgl-kn5-001'];
        
        const conditions = await Promise.all(targets.map(id => fetch(`http://localhost:5000/api/ai/road-condition/${id}`).then(r => r.json())));
        const traffic = await Promise.all(targets.map(id => fetch(`http://localhost:5000/api/ai/traffic-forecast/${id}`).then(r => r.json())));
        const safety = await Promise.all(targets.map(id => fetch(`http://localhost:5000/api/ai/safety-risk/${id}`).then(r => r.json())));

        setData({
          condition: conditions,
          traffic: traffic,
          safety: safety
        });
        setLoading(false);
      } catch (e) {
        console.error('Failed to load AI data', e);
        setLoading(false);
      }
    };
    fetchPredictions();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit className="w-6 h-6 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Decision Support</span>
          </div>
          <h1 className="text-4xl font-black mb-3">AI Intelligence Center</h1>
          <p className="text-indigo-100 text-lg">
            Predictive modeling for infrastructure deterioration, traffic capacity limits, and spatial safety risks.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-slate-200 rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-12 pb-8">
          
          {/* Section: Road Condition */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <HardHat className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">Maintenance Predictor</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.condition.map((pred, i) => (
                <PredictionCard
                  key={i}
                  title={`Road ID: ${pred.road_id}`}
                  prediction={pred.prediction}
                  riskLevel={pred.risk_level}
                  reasons={pred.reasons}
                  action={pred.recommended_action}
                  icon={HardHat}
                  color="blue"
                />
              ))}
            </div>
          </section>

          {/* Section: Traffic Forecast */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-slate-800">5-Year Traffic Forecast</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.traffic.map((pred, i) => (
                <PredictionCard
                  key={i}
                  title={`Road ID: ${pred.road_id}`}
                  prediction={`${pred.projected_volume_5yr.toLocaleString()} vehicles/day`}
                  riskLevel={pred.trend}
                  reasons={pred.reasons}
                  action={pred.recommended_action}
                  icon={TrendingUp}
                  color="purple"
                />
              ))}
            </div>
          </section>

          {/* Section: Safety Risk */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-slate-800">Safety Risk Assessor</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.safety.map((pred, i) => (
                <PredictionCard
                  key={i}
                  title={`Road ID: ${pred.road_id}`}
                  prediction={`Score: ${pred.risk_score} / 100`}
                  riskLevel={pred.risk_level}
                  reasons={pred.reasons}
                  action={pred.recommended_action}
                  icon={ShieldAlert}
                  color="red"
                />
              ))}
            </div>
          </section>

        </div>
      )}
    </div>
  );
}
