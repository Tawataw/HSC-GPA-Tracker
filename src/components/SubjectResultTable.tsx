import React from 'react';
import { useAppContext } from '../store/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { cn } from '../lib/utils';
import { SUBJECT_CONFIGS } from '../config';

export function SubjectResultTable() {
  const { result } = useAppContext();

  return (
    <Card className="col-span-1 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <th className="p-4 pl-6">Subject</th>
              <th className="p-4">Combined Marks</th>
              <th className="p-4">Percentage</th>
              <th className="p-4">Grade</th>
              <th className="p-4">GPA</th>
              <th className="p-4 pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {SUBJECT_CONFIGS.map((config) => {
              const res = result.subjectResults[config.id];
              if (!res) return null;
              
              return (
                <tr key={config.id} className={cn(
                  "hover:bg-white/5 transition-colors",
                  res.isOptional && "bg-indigo-500/5"
                )}>
                  <td className="p-4 pl-6">
                    <div className="font-medium text-white flex items-center gap-2">
                      {res.name}
                      {res.isOptional && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                          Optional
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-white/80">
                    {res.combinedTotal} <span className="text-white/40 text-sm">/ {res.maxTotal}</span>
                  </td>
                  <td className="p-4 text-white/60">
                    {res.percentage.toFixed(2)}%
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "font-bold px-2.5 py-1 rounded-lg text-sm border",
                      res.grade === 'A+' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      res.grade === 'F' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                      "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    )}>
                      {res.grade}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">
                    {res.gpa.toFixed(2)}
                  </td>
                  <td className="p-4 pr-6">
                    <span className={cn(
                      "text-sm font-bold flex items-center gap-1",
                      res.isPass ? "text-green-400" : "text-red-400"
                    )}>
                      {res.isPass ? 'PASS' : 'FAIL'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
