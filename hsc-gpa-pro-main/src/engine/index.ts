import {
  FAIL_GRADE,
  GRADE_BANDS_200,
  GRADING_SCALE_MAX,
  MAX_GPA,
  type GradeBand,
} from "@/config/gradingRules";
import { FINAL_GPA_DIVISOR, OPTIONAL_DEDUCTION } from "@/config/optionalSubjectRules";
import {
  ALL_PAPERS,
  SUBJECTS,
  TOTAL_POSSIBLE_MARKS,
  type PaperConfig,
  type SubjectConfig,
} from "@/config/subjects";

export interface PaperMarks {
  cq: number | null;
  mcq: number | null;
  practical: number | null;
}

export type MarksMap = Record<string, PaperMarks>;

export const emptyPaperMarks = (): PaperMarks => ({ cq: null, mcq: null, practical: null });

export const createEmptyMarks = (): MarksMap =>
  Object.fromEntries(ALL_PAPERS.map((p) => [p.id, emptyPaperMarks()]));

/** Safely clamp any user input into a valid component mark. */
export function sanitizeComponent(value: number | null | undefined, max: number): number {
  if (value === null || value === undefined || Number.isNaN(value)) return 0;
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), max);
}

export function calculatePaperTotal(paper: PaperConfig, marks?: PaperMarks): number {
  const m = marks ?? emptyPaperMarks();
  return (
    sanitizeComponent(m.cq, paper.cqMax) +
    sanitizeComponent(m.mcq, paper.mcqMax) +
    sanitizeComponent(m.practical, paper.practicalMax)
  );
}

export function calculateSubjectTotal(subject: SubjectConfig, marks: MarksMap): number {
  return subject.papers.reduce((sum, p) => sum + calculatePaperTotal(p, marks[p.id]), 0);
}

export function calculateSubjectPercentage(obtained: number, max: number): number {
  if (max <= 0) return 0;
  return (obtained / max) * 100;
}

/** ICT is stored out of 100 but graded on the 200 scale. */
export function calculateICTEquivalentMarks(rawTotal: number): number {
  return rawTotal * 2;
}

/** Scales a subject's raw marks onto the 200-mark grading scale. */
export function toGradingScale(subject: SubjectConfig, obtained: number): number {
  if (subject.maxMarks === GRADING_SCALE_MAX) return obtained;
  return (obtained / subject.maxMarks) * GRADING_SCALE_MAX;
}

export function findGradeBand(scaledMarks: number): GradeBand {
  const value = Math.min(Math.max(scaledMarks, 0), GRADING_SCALE_MAX);
  return (
    GRADE_BANDS_200.find((b) => value >= b.min && value <= b.max) ??
    GRADE_BANDS_200[GRADE_BANDS_200.length - 1]!
  );
}

export function calculateSubjectGrade(subject: SubjectConfig, obtained: number): string {
  return findGradeBand(toGradingScale(subject, obtained)).grade;
}

export function calculateSubjectGPA(subject: SubjectConfig, obtained: number): number {
  return findGradeBand(toGradingScale(subject, obtained)).gpa;
}

export interface PaperResult {
  paper: PaperConfig;
  total: number;
}

export interface SubjectResult {
  subject: SubjectConfig;
  papers: PaperResult[];
  obtained: number;
  max: number;
  scaledMarks: number;
  percentage: number;
  grade: string;
  gpa: number;
  passed: boolean;
  isOptional: boolean;
}

export function calculateTotalMarks(marks: MarksMap): number {
  return ALL_PAPERS.reduce((sum, p) => sum + calculatePaperTotal(p, marks[p.id]), 0);
}

export function calculateOverallPercentage(totalMarks: number): number {
  return (totalMarks / TOTAL_POSSIBLE_MARKS) * 100;
}

export function calculateOptionalBonus(optionalGPA: number): number {
  return Math.max(optionalGPA - OPTIONAL_DEDUCTION, 0);
}

export function calculateFinalGPA(subjectResults: SubjectResult[]): number {
  const optional = subjectResults.find((r) => r.isOptional);
  const mainSum = subjectResults
    .filter((r) => !r.isOptional)
    .reduce((sum, r) => sum + r.gpa, 0);
  const bonus = optional ? calculateOptionalBonus(optional.gpa) : 0;
  const gpa = (mainSum + bonus) / FINAL_GPA_DIVISOR;
  return Math.min(gpa, MAX_GPA);
}

export interface CalculationResult {
  subjects: SubjectResult[];
  totalMarks: number;
  totalPossible: number;
  overallPercentage: number;
  optionalSubject: SubjectResult | undefined;
  optionalBonus: number;
  mainGPASum: number;
  finalGPA: number;
  failedSubjects: SubjectResult[];
  passed: boolean;
}

export function calculateAll(marks: MarksMap, optionalSubjectId: string): CalculationResult {
  const subjects: SubjectResult[] = SUBJECTS.map((subject) => {
    const papers = subject.papers.map((paper) => ({
      paper,
      total: calculatePaperTotal(paper, marks[paper.id]),
    }));
    const obtained = papers.reduce((s, p) => s + p.total, 0);
    const scaledMarks = toGradingScale(subject, obtained);
    const band = findGradeBand(scaledMarks);
    return {
      subject,
      papers,
      obtained,
      max: subject.maxMarks,
      scaledMarks,
      percentage: calculateSubjectPercentage(obtained, subject.maxMarks),
      grade: band.grade,
      gpa: band.gpa,
      passed: band.grade !== FAIL_GRADE,
      isOptional: subject.id === optionalSubjectId,
    };
  });

  const totalMarks = subjects.reduce((s, r) => s + r.obtained, 0);
  const optionalSubject = subjects.find((r) => r.isOptional);
  const optionalBonus = optionalSubject ? calculateOptionalBonus(optionalSubject.gpa) : 0;
  const mainGPASum = subjects.filter((r) => !r.isOptional).reduce((s, r) => s + r.gpa, 0);
  const failedSubjects = subjects.filter((r) => !r.passed);

  return {
    subjects,
    totalMarks,
    totalPossible: TOTAL_POSSIBLE_MARKS,
    overallPercentage: calculateOverallPercentage(totalMarks),
    optionalSubject,
    optionalBonus,
    mainGPASum,
    finalGPA: calculateFinalGPA(subjects),
    failedSubjects,
    passed: failedSubjects.length === 0,
  };
}
