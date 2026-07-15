'use client';
import { AlertTriangle, MapPin } from 'lucide-react';

export default function PriorityRanking({ priorities }) {
  if (!priorities) return <div className="text-slate-400 text-sm text-center py-10">Loading...</div>;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-red-600 bg-red-100 border-red-200';
    if (score >= 60) return 'text-orange-600 bg-orange-100 border-orange-200';
    if (score >= 40) return 'text-amber-600 bg-amber-100 border-amber-200';
    return 'text-emerald-600 bg-emerald-100 border-emerald-200';
  };

  return (
    <div className="space-y-4 overflow-y-auto pr-2 pb-4">
      {priorities.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No priority locations found.
        </div>
      )}
      
      {priorities.map((item, index) => {
        const scoreStyle = getScoreColor(item.priorityScore);
        
        return (
          <div key={item.roadId} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
            {/* Rank Number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            
            {/* Main Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-slate-900 truncate">{item.roadName}</h4>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
                  {item.classification}
                </span>
              </div>
              
              <ul className="text-xs text-slate-500 space-y-1 mb-2">
                {item.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-slate-400" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Score */}
            <div className={`flex-shrink-0 text-center px-3 py-1.5 rounded-lg border ${scoreStyle}`}>
              <span className="block text-xl font-black leading-none">{item.priorityScore}</span>
              <span className="block text-[10px] font-bold uppercase tracking-wider mt-1 opacity-80">Score</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
