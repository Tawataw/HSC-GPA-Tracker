import React from 'react';
import { useAppContext } from '../store/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Target, ArrowRight, TrendingUp } from 'lucide-react';
import { analyzeTargetGpa } from '../engine';

export function TargetGPAAnalyzer() {
  const { result } = useAppContext();
  
  // Hardcoded to target 5.00 for simplicity as per requirement, or we could make it a state.
  const targetGpa = 5.00;
  const analysis = analyzeTargetGpa(result, targetGpa);

  if (result.finalGpa >= targetGpa) {
    return (
      <Card className="bg-emerald-500/10 border-emerald-500/20">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-emerald-300">Target Achieved!</h3>
            <p className="text-emerald-400/80 text-sm mt-1">
              Your expected GPA of {result.finalGpa.toFixed(2)} meets or exceeds your target of {targetGpa.toFixed(2)}. Keep up the great work!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <CardTitle>How to reach A+ (5.00)</CardTitle>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">
            Actionable insights to improve your score
          </p>
        </div>
      </CardHeader>
      
      <div className="p-0">
        {analysis.length > 0 ? (
          <ul className="divide-y divide-white/5">
            {analysis.map((advice, index) => (
              <li key={index} className="p-4 sm:px-6 hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-white/40 font-bold text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{advice.subject}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm font-medium text-white/60">
                      <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5">{advice.currentGrade}</span>
                      <ArrowRight className="w-4 h-4 text-white/40" />
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-500/20 text-indigo-300">{advice.nextGrade}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="text-2xl font-mono text-indigo-400">
                    +{advice.marksNeeded}
                  </div>
                  <div className="text-[10px] font-bold text-indigo-400/70 uppercase tracking-widest leading-tight">
                    More Marks<br/>Needed
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-white/40">
            No actionable advice available. Make sure you have entered some marks.
          </div>
        )}
      </div>
    </Card>
  );
}
