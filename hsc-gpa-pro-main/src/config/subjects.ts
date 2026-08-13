export interface PaperConfig {
  id: string;
  name: string;
  shortName: string;
  cqMax: number;
  mcqMax: number;
  practicalMax: number;
  totalMax: number;
}

export interface SubjectConfig {
  id: string;
  name: string;
  maxMarks: number;
  /** Scale used when applying the grading table (grading table is defined on 200). */
  gradingScaleMax: number;
  canBeOptional: boolean;
  papers: PaperConfig[];
}

const sciencePaper = (id: string, name: string, shortName: string): PaperConfig => ({
  id,
  name,
  shortName,
  cqMax: 50,
  mcqMax: 25,
  practicalMax: 25,
  totalMax: 100,
});

export const SUBJECTS: SubjectConfig[] = [
  {
    id: "bangla",
    name: "Bangla",
    maxMarks: 200,
    gradingScaleMax: 200,
    canBeOptional: false,
    papers: [
      {
        id: "bangla_1",
        name: "Bangla 1st Paper",
        shortName: "1st Paper",
        cqMax: 70,
        mcqMax: 30,
        practicalMax: 0,
        totalMax: 100,
      },
      {
        id: "bangla_2",
        name: "Bangla 2nd Paper",
        shortName: "2nd Paper",
        cqMax: 100,
        mcqMax: 0,
        practicalMax: 0,
        totalMax: 100,
      },
    ],
  },
  {
    id: "english",
    name: "English",
    maxMarks: 200,
    gradingScaleMax: 200,
    canBeOptional: false,
    papers: [
      {
        id: "english_1",
        name: "English 1st Paper",
        shortName: "1st Paper",
        cqMax: 100,
        mcqMax: 0,
        practicalMax: 0,
        totalMax: 100,
      },
      {
        id: "english_2",
        name: "English 2nd Paper",
        shortName: "2nd Paper",
        cqMax: 100,
        mcqMax: 0,
        practicalMax: 0,
        totalMax: 100,
      },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    maxMarks: 200,
    gradingScaleMax: 200,
    canBeOptional: false,
    papers: [
      sciencePaper("physics_1", "Physics 1st Paper", "1st Paper"),
      sciencePaper("physics_2", "Physics 2nd Paper", "2nd Paper"),
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    maxMarks: 200,
    gradingScaleMax: 200,
    canBeOptional: false,
    papers: [
      sciencePaper("chemistry_1", "Chemistry 1st Paper", "1st Paper"),
      sciencePaper("chemistry_2", "Chemistry 2nd Paper", "2nd Paper"),
    ],
  },
  {
    id: "biology",
    name: "Biology",
    maxMarks: 200,
    gradingScaleMax: 200,
    canBeOptional: true,
    papers: [
      sciencePaper("biology_1", "Biology 1st Paper", "1st Paper"),
      sciencePaper("biology_2", "Biology 2nd Paper", "2nd Paper"),
    ],
  },
  {
    id: "higher_math",
    name: "Higher Mathematics",
    maxMarks: 200,
    gradingScaleMax: 200,
    canBeOptional: true,
    papers: [
      sciencePaper("higher_math_1", "Higher Mathematics 1st Paper", "1st Paper"),
      sciencePaper("higher_math_2", "Higher Mathematics 2nd Paper", "2nd Paper"),
    ],
  },
  {
    id: "ict",
    name: "ICT",
    maxMarks: 100,
    gradingScaleMax: 200,
    canBeOptional: false,
    papers: [sciencePaper("ict", "ICT", "Single Paper")],
  },
];

export const ALL_PAPERS: PaperConfig[] = SUBJECTS.flatMap((s) => s.papers);

export const TOTAL_PAPERS = ALL_PAPERS.length; // 13
export const TOTAL_POSSIBLE_MARKS = ALL_PAPERS.reduce((sum, p) => sum + p.totalMax, 0); // 1300
export const OPTIONAL_CHOICES = SUBJECTS.filter((s) => s.canBeOptional);
export const DEFAULT_OPTIONAL_SUBJECT_ID = "higher_math";
