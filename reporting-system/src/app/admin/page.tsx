"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';

// Mock data to show how it looks after AI processing
const MOCK_REPORTS = [
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
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10 text-blue-400">
          <ShieldCheck size={28} />
          <span className="font-bold text-xl tracking-tight text-white">SafeSchool</span>
        </div>
        <nav className="space-y-4">
          <div className="p-3 bg-blue-600 rounded-lg cursor-pointer font-semibold">Inbox</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer text-slate-400">Resolved</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer text-slate-400">Settings</div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Reports Inbox</h1>
            <p className="text-slate-500">AI-triage is active and scanning reports.</p>
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-white border rounded-lg text-slate-600 hover:bg-slate-50">
              <Filter size={20} />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Search reports..." className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </header>

        <div className="space-y-4">
          {MOCK_REPORTS.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl ${
                    report.severity === 'High' ? 'bg-red-50 text-red-600' : 
                    report.severity === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-slate-800">{report.category}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        report.severity === 'High' ? 'bg-red-100 text-red-700' : 
                        report.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {report.severity} Priority
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1 line-clamp-1 italic">"{report.description}"</p>
                    <p className="text-blue-600 text-sm font-semibold mt-2 underline decoration-2 underline-offset-4">AI Summary: {report.summary}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Clock size={14} /> {report.timestamp}
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-sm italic">
                    <MapPin size={14} /> {report.location}
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Add this missing icon helper
function MapPin({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  );
}