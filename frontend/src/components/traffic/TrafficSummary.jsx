'use client';

/**
 * TrafficSummary
 *
 * Row of KPI cards for the /traffic analytics page header.
 *
 * Props:
 *   - records: array of enriched traffic records
 */
export default function TrafficSummary({ records = [] }) {
  if (records.length === 0) return null;

  const totalSurveys = records.length;

  const totalVehicles = records.reduce((s, r) => s + (r.totalVehicles || 0), 0);
  const avgDaily = Math.round(totalVehicles / totalSurveys);

  const highestRecord = records.reduce(
    (best, r) => (r.totalVehicles > best.totalVehicles ? r : best),
    records[0]
  );

  const avgHeavyPct =
    records.reduce((s, r) => s + (r.heavyVehiclePct || 0), 0) / totalSurveys;

  const cards = [
    {
      label: 'Survey Stations',
      value: totalSurveys,
      unit: 'locations',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      icon: '📍',
    },
    {
      label: 'Highest Traffic',
      value: highestRecord.totalVehicles.toLocaleString(),
      unit: highestRecord.locationName.split('—')[0].trim(),
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-700',
      icon: '🚦',
    },
    {
      label: 'Avg Survey Volume',
      value: avgDaily.toLocaleString(),
      unit: 'vehicles/survey',
      color: 'bg-emerald-50 border-emerald-200',
      textColor: 'text-emerald-700',
      icon: '📊',
    },
    {
      label: 'Avg Heavy Vehicle',
      value: avgHeavyPct.toFixed(1) + '%',
      unit: 'of total volume',
      color: 'bg-amber-50 border-amber-200',
      textColor: 'text-amber-700',
      icon: '🚛',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
