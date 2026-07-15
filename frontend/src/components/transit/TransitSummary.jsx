'use client';

export default function TransitSummary({ routes, stops, operators }) {
  if (!routes || !stops || !operators) return null;

  const totalLength = routes.reduce((sum, r) => sum + r.distance, 0);

  const cards = [
    {
      label: 'Active Routes',
      value: routes.filter(r => r.active).length,
      unit: `Total ${totalLength.toFixed(1)} km`,
      color: 'bg-indigo-50 border-indigo-200',
      textColor: 'text-indigo-700',
      icon: '🚌',
    },
    {
      label: 'Transit Stops',
      value: stops.length,
      unit: 'across network',
      color: 'bg-emerald-50 border-emerald-200',
      textColor: 'text-emerald-700',
      icon: '🚏',
    },
    {
      label: 'Operators',
      value: operators.length,
      unit: 'Licensed companies',
      color: 'bg-amber-50 border-amber-200',
      textColor: 'text-amber-700',
      icon: '🏢',
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
