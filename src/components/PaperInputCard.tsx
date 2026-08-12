import React from 'react';
import { PaperConfig, PaperId } from '../types';
import { useAppContext } from '../store/AppContext';
import { Card } from './ui/Card';

interface PaperInputProps {
  paper: PaperConfig;
}

export function PaperInputCard({ paper }: PaperInputProps) {
  const { activeScenario, updateMark, result } = useAppContext();
  
  const marks = activeScenario.marks[paper.id] || { cq: '', mcq: '', practical: '' };
  
  // Find this paper's result to display the total
  let paperTotal = 0;
  for (const subjectId in result.subjectResults) {
    const pResult = result.subjectResults[subjectId].papers.find(p => p.id === paper.id);
    if (pResult) {
      paperTotal = pResult.total;
      break;
    }
  }

  const handleInputChange = (field: 'cq' | 'mcq' | 'practical', value: string, max: number) => {
    if (value === '') {
      updateMark(paper.id, field, '');
      return;
    }
    const num = Number(value);
    if (!isNaN(num) && num >= 0 && num <= max) {
      updateMark(paper.id, field, num);
    }
  };

  return (
    <Card className="flex flex-col h-full transition-shadow hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <h4 className="font-medium text-white/90 text-sm tracking-wide">
          {paper.name}
        </h4>
        <div className="text-xs font-bold text-indigo-300 bg-white/10 border border-white/10 px-2 py-1 rounded-md">
          {paperTotal} / {paper.totalMax}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col gap-4">
        {paper.cqMax > 0 && (
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-white/60 w-16">CQ</label>
            <div className="flex-1 relative">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max={paper.cqMax}
                value={marks.cq}
                onChange={(e) => handleInputChange('cq', e.target.value, paper.cqMax)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors placeholder:text-white/20 font-medium"
                placeholder={`0`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium select-none">
                / {paper.cqMax}
              </span>
            </div>
          </div>
        )}

        {paper.mcqMax > 0 && (
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-white/60 w-16">MCQ</label>
            <div className="flex-1 relative">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max={paper.mcqMax}
                value={marks.mcq}
                onChange={(e) => handleInputChange('mcq', e.target.value, paper.mcqMax)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors placeholder:text-white/20 font-medium"
                placeholder={`0`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 font-medium select-none">
                / {paper.mcqMax}
              </span>
            </div>
          </div>
        )}

        {paper.practicalMax > 0 && (
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-white/60 w-16 text-left leading-tight">Pract.</label>
            <div className="flex-1 relative">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max={paper.practicalMax}
                value={marks.practical}
                onChange={(e) => handleInputChange('practical', e.target.value, paper.practicalMax)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors placeholder:text-white/20 font-medium"
                placeholder={`0`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 font-medium select-none">
                / {paper.practicalMax}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
