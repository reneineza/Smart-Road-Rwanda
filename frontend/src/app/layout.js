import './globals.css';
import { LayoutDashboard, Map as MapIcon, Layers, Activity, ShieldAlert, BarChart3, FileText, Search, User, Bus, Database, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'SmartRoad Rwanda',
  description: 'Transportation Infrastructure Intelligence Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shadow-lg z-20">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MapIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">SmartRoad<br/><span className="text-blue-400 text-sm font-medium uppercase tracking-wider">Rwanda</span></h1>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              <li>
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/map" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <MapIcon className="w-5 h-5" />
                  Map Explorer
                </Link>
              </li>
              <li className="pt-4 pb-2 px-4 text-xs font-semibold uppercase text-slate-500">Modules</li>
              <li>
                <Link href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                  Operations Center
                </Link>
              </li>
              <li>
                <Link href="/roads" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Database className="w-5 h-5" />
                  Road Inventory
                </Link>
              </li>
              <li>
                <Link href="/traffic" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                  Traffic
                </Link>
              </li>
              <li>
                <Link href="/safety" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <ShieldAlert className="w-5 h-5" />
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/transit" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Bus className="w-5 h-5" />
                  Public Transport
                </Link>
              </li>
              <li className="pt-4 pb-2 px-4 text-xs font-semibold uppercase text-slate-500">Insights</li>
              <li>
                <Link href="/ai-insights" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <BrainCircuit className="w-5 h-5" />
                  AI Intelligence
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                  Reports
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Navigation */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search network, locations, or assets..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-right hidden md:block">
                <p className="font-medium text-slate-900">Dr. Engineer</p>
                <p className="text-slate-500">Transport Agency</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                <User className="w-5 h-5" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-slate-50 relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
