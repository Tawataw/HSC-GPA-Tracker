export type PaperId =
  | 'bangla_1' | 'bangla_2'
  | 'english_1' | 'english_2'
  | 'physics_1' | 'physics_2'
  | 'chemistry_1' | 'chemistry_2'
  | 'biology_1' | 'biology_2'
  | 'higher_math_1' | 'higher_math_2'
  | 'ict';

export type SubjectId =
  | 'bangla'
  | 'english'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'higher_math'
  | 'ict';

export type MarkValue = number | '';

export interface PaperMarks {
  cq: MarkValue;
  mcq: MarkValue;
  practical: MarkValue;
}

export interface ScenarioMarks {
  [key: string]: PaperMarks; // key is PaperId
}

export interface Scenario {
  id: string;
  name: string;
  marks: ScenarioMarks;
  optionalSubject: SubjectId;
  targetGpa: number;
}

export interface GradeBoundaries {
  min: number;
  max: number;
  grade: string;
  gpa: number;
}

export interface PaperConfig {
  id: PaperId;
  name: string;
  shortName: string;
  cqMax: number;
  mcqMax: number;
  practicalMax: number;
  totalMax: number;
}

export interface SubjectConfig {
  id: SubjectId;
  name: string;
  maxMarks: number;
  papers: PaperConfig[];
}

// Calculated Result Types
export interface PaperResult {
  id: PaperId;
  cq: number;
  mcq: number;
  practical: number;
  total: number;
  maxTotal: number;
}

export interface SubjectResult {
  id: SubjectId;
  name: string;
  papers: PaperResult[];
  combinedTotal: number;
  maxTotal: number;
  percentage: number;
  grade: string;
  gpa: number;
  isPass: boolean;
  isOptional: boolean;
}

export interface FinalResult {
  subjectResults: Record<SubjectId, SubjectResult>;
  totalMarks: number;
  maxTotalMarks: number;
  overallPercentage: number;
  optionalSubjectId: SubjectId;
  optionalGpa: number;
  optionalBonus: number;
  mainGpaSum: number;
  finalGpa: number;
  isPass: boolean;
  failedSubjects: string[];
}
