import React from 'react';
import { useAppContext } from '../store/AppContext';
import { Card } from './ui/Card';
import { GraduationCap, Percent, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { SUBJECT_CONFIGS, OPTIONAL_SUBJECT_CHOICES } from '../config';

export function GPADashboard() {
  const { result, activeScenario, setOptionalSubject } = useAppContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
      {/* Main Hero Card */}
      <Card className="md:col-span-8 bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl relative overflow-hidden text-white">
        {/* Abstract background shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/40 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/40 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="p-8 md:p-10 relative z-10 flex flex-col h-full justify-center items-center text-center">
          <h2 className="text-indigo-300 text-sm md:text-base font-bold tracking-widest uppercase mb-4">
            Expected HSC GPA
          </h2>
          
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-7xl md:text-8xl font-bold tracking-tighter">
              {result.finalGpa.toFixed(2)}
            </span>
            <span className="text-2xl md:text-3xl text-indigo-300 font-medium">
              / 5.00
            </span>
          </div>

          <div className={cn(
            "mt-6 px-6 py-2 rounded-xl font-bold text-lg tracking-wider border backdrop-blur-md transition-all",
            result.isPass 
              ? "bg-green-500/20 text-green-300 border-green-500/30" 
              : "bg-red-500/20 text-red-300 border-red-500/30"
          )}>
            {result.isPass ? "✓ PASS" : "✕ FAIL"}
          </div>

          {!result.isPass && result.failedSubjects.length > 0 && (
            <div className="mt-4 text-red-200 text-sm bg-red-900/40 px-4 py-2 rounded-lg border border-red-500/20 max-w-md">
              <span className="font-semibold block mb-1">Failed Required Subjects:</span>
              {result.failedSubjects.join(', ')}
            </div>
          )}
        </div>
      </Card>

      {/* Details Sidebar */}
      <div className="md:col-span-4 flex flex-col gap-4">
        {/* Total Marks */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Total Marks</p>
            <p className="text-2xl font-semibold text-white">
              {result.totalMarks} <span className="text-base font-normal text-white/40">/ 1300</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-white/5">
            <GraduationCap className="w-6 h-6" />
          </div>
        </Card>

        {/* Percentage */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Overall Percentage</p>
            <p className="text-2xl font-semibold text-white">
              {result.overallPercentage.toFixed(2)}%
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-white/5">
            <Percent className="w-6 h-6" />
          </div>
        </Card>

        {/* Optional Subject Configuration */}
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">
              4th / Optional Subject
            </label>
            <select
              value={activeScenario.optionalSubject}
              onChange={(e) => setOptionalSubject(e.target.value as any)}
              className="w-full bg-[#1a1c23] border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500/50 font-medium cursor-pointer focus:outline-none"
            >
              {OPTIONAL_SUBJECT_CHOICES.map(choice => (
                <option key={choice.id} value={choice.id}>{choice.name}</option>
              ))}
            </select>
            
            <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-white/10">
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Optional GPA</p>
                <p className="text-sm font-semibold text-white">{result.optionalGpa.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Bonus Added</p>
                <p className="text-sm font-semibold text-green-400">+{result.optionalBonus.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
