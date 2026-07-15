'use client';

import { Lightbulb, Info } from 'lucide-react';

export default function PredictionCard({ title, prediction, riskLevel, reasons = [], action, icon: Icon, color = 'blue' }) {
  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high':
      case 'critical':
      case 'critical congestion risk':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'medium':
      case 'approaching capacity':
        return 'text-amber-600 bg-amber-100 border-amber-200';
      default:
        return 'text-emerald-600 bg-emerald-100 border-emerald-200';
    }
  };

  const riskStyle = getRiskColor(riskLevel);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className={`px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-${color}-50/50`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${color}-100 rounded-lg text-${color}-600`}>
            {Icon && <Icon className="w-5 h-5" />}
          </div>
          <h3 className="font-bold text-slate-800">{title}</h3>
        </div>
        {riskLevel && (
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${riskStyle}`}>
            {riskLevel}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Prediction */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Prediction</p>
          <p className="text-xl font-black text-slate-900 leading-tight">{prediction}</p>
        </div>

        {/* Reasons (Explainable AI) */}
        <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Why (Key Factors)
          </p>
          <ul className="space-y-2">
            {reasons.map((reason, idx) => (
              <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="px-5 py-4 bg-indigo-50/50 border-t border-indigo-100">
        <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5" />
          Recommended Action
        </p>
        <p className="text-sm font-semibold text-indigo-900">{action}</p>
      </div>
    </div>
  );
}
