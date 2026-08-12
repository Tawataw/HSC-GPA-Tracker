import { SubjectConfig, ScenarioMarks, FinalResult, SubjectResult, PaperResult, MarkValue } from './types';
import { GRADING_RULES_200, SUBJECT_CONFIGS } from './config';

export const parseMark = (mark: MarkValue): number => {
  if (mark === '') return 0;
  const parsed = Number(mark);
  return isNaN(parsed) ? 0 : parsed;
};

export const getGradeInfo = (marks: number, outOf: number = 200) => {
  // If marks is not out of 200, scale it to 200 for grading table lookup
  const equivalentMarks = outOf === 100 ? marks * 2 : marks;
  
  // Find grade from 200-mark boundaries
  for (const rule of GRADING_RULES_200) {
    if (equivalentMarks >= rule.min && equivalentMarks <= rule.max) {
      return { grade: rule.grade, gpa: rule.gpa };
    }
  }
  
  // Fallback (should not hit if marks are within 0-200)
  return { grade: 'F', gpa: 0.00 };
};

export const calculateSubject = (
  subject: SubjectConfig, 
  marks: ScenarioMarks,
  isOptional: boolean
): SubjectResult => {
  const paperResults: PaperResult[] = [];
  let combinedTotal = 0;
  let maxTotal = 0;

  for (const paper of subject.papers) {
    const pMarks = marks[paper.id] || { cq: 0, mcq: 0, practical: 0 };
    const cq = parseMark(pMarks.cq);
    const mcq = parseMark(pMarks.mcq);
    const practical = parseMark(pMarks.practical);
    const total = cq + mcq + practical;
    
    paperResults.push({
      id: paper.id,
      cq,
      mcq,
      practical,
      total,
      maxTotal: paper.totalMax
    });
    
    combinedTotal += total;
    maxTotal += paper.totalMax;
  }

  const { grade, gpa } = getGradeInfo(combinedTotal, maxTotal);
  const percentage = (combinedTotal / maxTotal) * 100;
  const isPass = gpa > 0;

  return {
    id: subject.id,
    name: subject.name,
    papers: paperResults,
    combinedTotal,
    maxTotal,
    percentage,
    grade,
    gpa,
    isPass,
    isOptional
  };
};

export const calculateFinalResult = (
  marks: ScenarioMarks, 
  optionalSubjectId: string
): FinalResult => {
  const subjectResults: Record<string, SubjectResult> = {};
  let totalMarks = 0;
  let maxTotalMarks = 0;
  let mainGpaSum = 0;
  const failedSubjects: string[] = [];
  let optionalGpa = 0;

  SUBJECT_CONFIGS.forEach(subjectConfig => {
    const isOptional = subjectConfig.id === optionalSubjectId;
    const result = calculateSubject(subjectConfig, marks, isOptional);
    
    subjectResults[subjectConfig.id] = result;
    totalMarks += result.combinedTotal;
    maxTotalMarks += result.maxTotal;

    if (isOptional) {
      optionalGpa = result.gpa;
    } else {
      mainGpaSum += result.gpa;
      if (!result.isPass) {
        failedSubjects.push(result.name);
      }
    }
  });

  const overallPercentage = (totalMarks / maxTotalMarks) * 100;
  
  // Optional bonus = max(Optional GPA - 2.00, 0)
  const optionalBonus = Math.max(optionalGpa - 2.00, 0);
  
  // Final GPA = (Sum of 6 Main Subject GPAs + Optional Bonus) / 6
  let finalGpa = (mainGpaSum + optionalBonus) / 6;
  
  // Cap at 5.00
  finalGpa = Math.min(finalGpa, 5.00);

  // Overall pass status: FAIL if any main subject failed
  const isPass = failedSubjects.length === 0;

  return {
    subjectResults,
    totalMarks,
    maxTotalMarks,
    overallPercentage,
    optionalSubjectId: optionalSubjectId as any,
    optionalGpa,
    optionalBonus,
    mainGpaSum,
    finalGpa,
    isPass,
    failedSubjects
  };
};

export const analyzeTargetGpa = (
  currentResult: FinalResult,
  targetGpa: number
) => {
  // Returns actionable advice on how to reach the target GPA.
  // This is a simplified analysis: identifies subjects close to the next grade boundary.
  const advice = [];
  
  for (const subjectId in currentResult.subjectResults) {
    const result = currentResult.subjectResults[subjectId];
    if (result.gpa < 5.00) {
      const equivalentMarks = result.maxTotal === 100 ? result.combinedTotal * 2 : result.combinedTotal;
      // Find next grade
      const currentRuleIndex = GRADING_RULES_200.findIndex(r => equivalentMarks >= r.min && equivalentMarks <= r.max);
      if (currentRuleIndex > 0) {
        const nextRule = GRADING_RULES_200[currentRuleIndex - 1];
        // How many marks away on the 200 scale?
        const needed200 = nextRule.min - equivalentMarks;
        // Convert back to actual marks needed (ICT needs 1 real mark for 2 equivalent marks)
        const actualNeeded = result.maxTotal === 100 ? Math.ceil(needed200 / 2) : needed200;
        
        advice.push({
          subject: result.name,
          currentGrade: result.grade,
          nextGrade: nextRule.grade,
          marksNeeded: actualNeeded
        });
      }
    }
  }
  
  // Sort by easiest to improve (fewest marks needed)
  advice.sort((a, b) => a.marksNeeded - b.marksNeeded);
  
  return advice;
}
