import { GRADE_BANDS_200, GRADING_SCALE_MAX, MAX_GPA } from "@/config/gradingRules";
import { FINAL_GPA_DIVISOR } from "@/config/optionalSubjectRules";
import type { CalculationResult, SubjectResult } from "@/engine";

export interface NextGradeInfo {
  subject: SubjectResult;
  currentGrade: string;
  nextGrade: string;
  nextGPA: number;
  /** Extra marks needed in the subject's own scale (200 or 100). */
  marksNeeded: number;
  possible: boolean;
}

export function nextGradeRequirement(result: SubjectResult): NextGradeInfo | null {
  const higher = GRADE_BANDS_200.filter((b) => b.min > result.scaledMarks).sort(
    (a, b) => a.min - b.min,
  )[0];
  if (!higher) return null;
  const scaleFactor = result.max / GRADING_SCALE_MAX;
  const neededRaw = Math.ceil((higher.min - result.scaledMarks) * scaleFactor - 1e-9);
  return {
    subject: result,
    currentGrade: result.grade,
    nextGrade: higher.grade,
    nextGPA: higher.gpa,
    marksNeeded: Math.max(neededRaw, 0),
    possible: result.obtained + neededRaw <= result.max,
  };
}

export interface PerformanceAnalysis {
  strongest: SubjectResult | null;
  weakest: SubjectResult | null;
  highestGPA: SubjectResult | null;
  lowestGPA: SubjectResult | null;
  aPlusSubjects: SubjectResult[];
  aSubjects: SubjectResult[];
  closeToNextGrade: NextGradeInfo[];
  failedSubjects: SubjectResult[];
  insights: string[];
  hasData: boolean;
}

export function analyzePerformance(result: CalculationResult): PerformanceAnalysis {
  const subjects = result.subjects;
  const hasData = result.totalMarks > 0;
  const sortedByPct = [...subjects].sort((a, b) => b.percentage - a.percentage);
  const sortedByGPA = [...subjects].sort((a, b) => b.gpa - a.gpa);

  const strongest = hasData ? (sortedByPct[0] ?? null) : null;
  const weakest = hasData ? (sortedByPct[sortedByPct.length - 1] ?? null) : null;

  const closeToNextGrade = subjects
    .map(nextGradeRequirement)
    .filter((x): x is NextGradeInfo => !!x && x.possible && x.marksNeeded <= 10)
    .sort((a, b) => a.marksNeeded - b.marksNeeded);

  const insights: string[] = [];
  if (hasData && strongest) {
    insights.push(
      `Your strongest subject is ${strongest.subject.name} with ${strongest.percentage.toFixed(2)}%.`,
    );
  }
  if (hasData && weakest && weakest !== strongest) {
    insights.push(
      `Your weakest subject is ${weakest.subject.name} with ${weakest.percentage.toFixed(2)}%.`,
    );
  }
  closeToNextGrade.slice(0, 3).forEach((info) => {
    insights.push(
      `${info.subject.subject.name} is ${info.marksNeeded} mark${info.marksNeeded === 1 ? "" : "s"} away from grade ${info.nextGrade}.`,
    );
  });
  if (result.failedSubjects.length > 0) {
    insights.push(
      `You are currently failing ${result.failedSubjects.map((s) => s.subject.name).join(", ")}. A single F makes the overall result FAIL.`,
    );
  }
  if (result.optionalSubject) {
    insights.push(
      `${result.optionalSubject.subject.name} is your 4th subject, contributing a bonus of +${result.optionalBonus.toFixed(2)} GPA.`,
    );
  }

  return {
    strongest,
    weakest,
    highestGPA: hasData ? (sortedByGPA[0] ?? null) : null,
    lowestGPA: hasData ? (sortedByGPA[sortedByGPA.length - 1] ?? null) : null,
    aPlusSubjects: subjects.filter((s) => s.grade === "A+"),
    aSubjects: subjects.filter((s) => s.grade === "A"),
    closeToNextGrade,
    failedSubjects: result.failedSubjects,
    insights,
    hasData,
  };
}

export interface TargetAnalysis {
  target: number;
  current: number;
  gap: number;
  achieved: boolean;
  achievable: boolean;
  suggestions: NextGradeInfo[];
}

/**
 * Deterministic target analysis: greedily upgrade subjects by cheapest
 * marks-needed until the target GPA is reachable.
 */
export function calculateTargetRequirement(
  result: CalculationResult,
  target: number,
): TargetAnalysis {
  const current = result.finalGPA;
  const clampedTarget = Math.min(Math.max(target, 0), MAX_GPA);
  const gap = Math.max(clampedTarget - current, 0);

  const candidates = result.subjects
    .map(nextGradeRequirement)
    .filter((x): x is NextGradeInfo => !!x && x.possible)
    .sort((a, b) => a.marksNeeded - b.marksNeeded);

  const suggestions: NextGradeInfo[] = [];
  if (gap > 0.0001) {
    let simulated = result.subjects.map((s) => ({ ...s }));
    for (const candidate of candidates) {
      simulated = simulated.map((s) =>
        s.subject.id === candidate.subject.subject.id ? { ...s, gpa: candidate.nextGPA } : s,
      );
      suggestions.push(candidate);
      const optional = simulated.find((s) => s.isOptional);
      const mainSum = simulated.filter((s) => !s.isOptional).reduce((a, s) => a + s.gpa, 0);
      const bonus = optional ? Math.max(optional.gpa - 2, 0) : 0;
      const projected = Math.min((mainSum + bonus) / FINAL_GPA_DIVISOR, MAX_GPA);
      if (projected >= clampedTarget - 0.0001) {
        return {
          target: clampedTarget,
          current,
          gap,
          achieved: false,
          achievable: true,
          suggestions,
        };
      }
    }
    return {
      target: clampedTarget,
      current,
      gap,
      achieved: false,
      achievable: false,
      suggestions,
    };
  }

  return {
    target: clampedTarget,
    current,
    gap: 0,
    achieved: true,
    achievable: true,
    suggestions: [],
  };
}
