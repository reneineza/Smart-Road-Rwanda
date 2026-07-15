'use client';

export default function SafetySummary({ records }) {
  if (!Array.isArray(records) || records.length === 0) return null;

  const totalAccidents = records.length;
  const fatalAccidents = records.filter(r => r.severity === 'Fatal').length;
  
  // Basic aggregation for most common type
  const typeCounts = records.reduce((acc, r) => {
    acc[r.accident_type] = (acc[r.accident_type] || 0) + 1;
    return acc;
  }, {});
  const mostCommonType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, '');

  const cards = [
    {
      label: 'Total Recorded Accidents',
      value: totalAccidents,
      unit: 'incidents',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      icon: '📋',
    },
    {
      label: 'Fatalities (Accidents)',
      value: fatalAccidents,
      unit: 'fatal incidents',
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-700',
      icon: '🚨',
    },
    {
      label: 'Most Common Type',
      value: typeCounts[mostCommonType] || 0,
      unit: mostCommonType,
      color: 'bg-amber-50 border-amber-200',
      textColor: 'text-amber-700',
      icon: '⚠️',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl border p-5 ${card.color}`}
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-semibold text-slate-600">{card.label}</p>
            <span className="text-xl">{card.icon}</span>
          </div>
          <p className={`text-3xl font-black mb-1 ${card.textColor}`}>{card.value}</p>
          <p className="text-xs text-slate-500 truncate">{card.unit}</p>
        </div>
      ))}
    </div>
  );
}
