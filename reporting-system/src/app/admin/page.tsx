"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  Search,
  Filter,
  CheckCircle,
  MapPin,
  Inbox,
  Trash2
} from 'lucide-react';

const INITIAL_REPORTS = [
  {
    id: '1',
    category: 'Safety Threat',
    description: 'I saw a student with a suspicious object in their locker.',
    location: 'Gym Lockers',
    severity: 'High',
    summary: 'Potential weapon/safety concern in athletic area.',
    timestamp: '2 mins ago'
  },
  {
    id: '2',
    category: 'Bullying',
    description: 'A group of kids are teasing a freshman in the hallway every morning.',
    location: 'Main Hall',
    severity: 'Medium',
    summary: 'Recurring verbal harassment reported.',
    timestamp: '45 mins ago'
  },
  {
    id: '3',
    category: 'Vandalism',
    description: 'Someone drew on the bathroom mirrors.',
    location: '2nd Floor Restroom',
    severity: 'Low',
    summary: 'Property damage/graffiti reported.',
    timestamp: '2 hours ago'
  }
];

export default function AdminDashboard() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [resolvedCount, setResolvedCount] = useState(0);

  const handleResolve = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
    setResolvedCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-10 text-blue-400">
          <ShieldCheck size={28} />
          <span className="font-bold text-xl tracking-tight text-white">SafeSchool</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 p-3 bg-blue-600 rounded-xl font-semibold transition-all">
            <Inbox size={20} /> Inbox
            <span className="ml-auto bg-blue-400 text-white text-xs px-2 py-0.5 rounded-full">
              {reports.length}
            </span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl text-slate-400 transition-all">
            <CheckCircle size={20} /> Resolved ({resolvedCount})
          </button>
        </nav>

        <div className="mt-auto p-4 bg-slate-800 rounded-2xl border border-slate-700">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">System Status</p>
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            AI Triage Active
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Active Reports</h1>
            <p className="text-slate-500 mt-1">Real-time safety monitoring dashboard.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all w-64" 
              />
            </div>
          </div>
        </header>

        {/* Reports List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {reports.map((report) => (
              <motion.div 
                key={report.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-5 flex-1">
                    <div className={`p-4 rounded-2xl h-fit ${
                      report.severity === 'High' ? 'bg-red-50 text-red-600' : 
                      report.severity === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <AlertTriangle size={24} />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg text-slate-800">{report.category}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          report.severity === 'High' ? 'bg-red-100 text-red-700' : 
                          report.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {report.severity}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">"{report.description}"</p>
                      
                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                          <MapPin size={14} /> {report.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                          <Clock size={14} /> {report.timestamp}
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-50 border-l-4 border-blue-500 rounded-r-xl">
                        <p className="text-blue-700 text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1">
                          <ShieldCheck size={12} /> AI Intelligence Report
                        </p>
                        <p className="text-slate-700 text-sm font-medium">{report.summary}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 shrink-0">
                    <button 
                      onClick={() => handleResolve(report.id)}
                      className="flex-1 md:w-32 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <CheckCircle size={16} /> Resolve
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {reports.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200"
            >
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-slate-400" size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Inbox Clear</h2>
              <p className="text-slate-500">All student reports have been addressed.</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}