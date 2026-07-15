import { Route, MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Network Overview</h1>
        <p className="text-slate-500">Transportation infrastructure performance at a glance.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Network Length</h3>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Route className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">4,720</span>
            <span className="text-sm text-slate-500 font-medium">km</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">*Sample data</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Monitored Assets</h3>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><MapPin className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">12,450</span>
          </div>
          <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 120 added this month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Traffic Count Stations</h3>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><TrendingUp className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">84</span>
            <span className="text-sm text-slate-500 font-medium">active</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Continuous and periodic coverage</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Critical Safety Alerts</h3>
            <div className="p-2 bg-red-50 rounded-lg text-red-600"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-600">12</span>
            <span className="text-sm text-slate-500 font-medium">black spots</span>
          </div>
          <p className="text-xs text-red-600 mt-2 font-medium">Requires immediate review</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Preview Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h2 className="font-semibold text-slate-800">Network Map Preview</h2>
            <a href="/map" className="text-sm font-medium text-blue-600 hover:text-blue-800">Open Full Explorer →</a>
          </div>
          <div className="flex-1 bg-slate-100 relative min-h-[400px] flex items-center justify-center">
            {/* We use a simple placeholder here instead of loading the heavy map component on the dashboard immediately */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-sm">
              <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-slate-800 font-medium">GIS Preview Area</h3>
              <p className="text-slate-500 text-sm mt-2">Navigate to the Map Explorer for the full interactive spatial interface.</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-800">Recent Updates</h2>
          </div>
          <div className="p-4 flex-1">
            <ul className="space-y-6 relative before:absolute before:inset-y-0 before:left-[17px] before:w-[2px] before:bg-slate-100 pl-2">
              <li className="relative pl-10">
                <div className="absolute left-0 top-1 w-[14px] h-[14px] rounded-full border-2 border-white bg-blue-500"></div>
                <p className="text-sm font-medium text-slate-800">Traffic Survey Completed</p>
                <p className="text-xs text-slate-500 mt-1">Kigali-Musanze Corridor AADT updated.</p>
                <span className="text-xs text-slate-400 block mt-1">2 hours ago</span>
              </li>
              <li className="relative pl-10">
                <div className="absolute left-0 top-1 w-[14px] h-[14px] rounded-full border-2 border-white bg-red-500"></div>
                <p className="text-sm font-medium text-slate-800">Accident Logged</p>
                <p className="text-xs text-slate-500 mt-1">Severity: High. Location: RN1 KM 45.</p>
                <span className="text-xs text-slate-400 block mt-1">Yesterday</span>
              </li>
              <li className="relative pl-10">
                <div className="absolute left-0 top-1 w-[14px] h-[14px] rounded-full border-2 border-white bg-emerald-500"></div>
                <p className="text-sm font-medium text-slate-800">Bridge Inspection Sync</p>
                <p className="text-xs text-slate-500 mt-1">Field team uploaded 4 structural assessments.</p>
                <span className="text-xs text-slate-400 block mt-1">2 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
