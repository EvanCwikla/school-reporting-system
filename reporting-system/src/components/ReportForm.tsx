"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  UserSearch, 
  Send, 
  ChevronLeft, 
  CheckCircle2,
  Users,
  Lock,
  MapPin,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
// This is the bridge to our server-side logic
import { submitReport } from '@/app/actions';

type Step = 'CATEGORY' | 'DETAILS' | 'IDENTITY' | 'SUCCESS';

export default function ReportForm() {
  const [step, setStep] = useState<Step>('CATEGORY');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    isAnonymous: true,
    name: '',
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Calling the Server Action we are about to create
      const result = await submitReport(formData);
      
      if (result.success) {
        setStep('SUCCESS');
      } else {
        setError("Something went wrong on our end. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Check your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: { x: 20, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 font-sans">
      {/* Progress Tracker */}
      <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-center gap-2">
        {['CATEGORY', 'DETAILS', 'IDENTITY'].map((s, i) => (
          <div 
            key={s} 
            className={`h-1.5 w-12 rounded-full transition-all duration-500 ${
              ['CATEGORY', 'DETAILS', 'IDENTITY'].indexOf(step) >= i ? 'bg-blue-600' : 'bg-slate-200'
            }`} 
          />
        ))}
      </div>

      <div className="p-8 min-h-[500px] flex flex-col">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: CATEGORY */}
          {step === 'CATEGORY' && (
            <motion.div key="1" variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight text-balance">What would you like to report?</h2>
                <p className="text-slate-500 text-sm mt-1 text-balance">Select the category that best fits the situation.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Bullying', 'Safety Threat', 'Harassment', 'Mental Health', 'Vandalism', 'Other'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { updateField('category', cat); setStep('DETAILS'); }}
                    className="p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all text-left font-bold text-slate-700 active:scale-95"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 'DETAILS' && (
            <motion.div key="2" variants={variants} initial="enter" animate="center" exit="exit" className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <MessageSquare size={20} />
                <h2 className="text-2xl font-bold text-slate-800">The Details</h2>
              </div>
              <textarea
                placeholder="What happened? Please be as specific as possible..."
                className="w-full h-40 p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none resize-none transition-all text-slate-700"
                onChange={(e) => updateField('description', e.target.value)}
                value={formData.description}
              />
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Where did this happen?"
                  className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700"
                  onChange={(e) => updateField('location', e.target.value)}
                  value={formData.location}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep('CATEGORY')} className="flex-1 py-4 text-slate-500 font-semibold hover:bg-slate-100 rounded-2xl transition-colors">
                  Back
                </button>
                <button 
                  disabled={formData.description.length < 5}
                  onClick={() => setStep('IDENTITY')} 
                  className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: IDENTITY */}
          {step === 'IDENTITY' && (
            <motion.div key="3" variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6 text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Lock className="text-blue-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Submission Privacy</h2>

              <div className="space-y-3 text-left">
                <button 
                  onClick={() => updateField('isAnonymous', true)}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${formData.isAnonymous ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-100'}`}
                >
                  <UserSearch className={formData.isAnonymous ? 'text-blue-600' : 'text-slate-400'} />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Submit Anonymously</p>
                    <p className="text-xs text-slate-500">Only the report content is sent.</p>
                  </div>
                </button>

                <button 
                  onClick={() => updateField('isAnonymous', false)}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${!formData.isAnonymous ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-100'}`}
                >
                  <Users className={!formData.isAnonymous ? 'text-blue-600' : 'text-slate-400'} />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Include My Name</p>
                    <p className="text-xs text-slate-500">I am open to staff following up.</p>
                  </div>
                </button>
              </div>

              {!formData.isAnonymous && (
                <motion.input 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  type="text" placeholder="Your Full Name" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none mb-2"
                  onChange={(e) => updateField('name', e.target.value)}
                />
              )}

              <div className="pt-4 space-y-3">
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 active:scale-95"
                >
                  {isSubmitting ? "Encrypting & Sending..." : <><Send size={18}/> Send Secure Report</>}
                </button>
                <button onClick={() => setStep('DETAILS')} className="text-slate-400 text-sm hover:text-slate-600">
                  Go back to details
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'SUCCESS' && (
            <motion.div key="4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Report Sent</h2>
                <p className="text-slate-500 max-w-xs mx-auto text-balance">
                  Your report has been securely delivered to school administration. Thank you for your courage.
                </p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}