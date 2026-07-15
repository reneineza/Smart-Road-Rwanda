'use client';

export default function AnalyticsCard({ title, icon: Icon, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
          {Icon && <Icon className="w-4 h-4 text-slate-400" />}
          <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
}
