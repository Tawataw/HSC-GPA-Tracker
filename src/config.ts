import { SubjectConfig, GradeBoundaries, SubjectId } from './types';

export const GRADING_RULES_200: GradeBoundaries[] = [
  { min: 160, max: 200, grade: 'A+', gpa: 5.00 },
  { min: 140, max: 159, grade: 'A', gpa: 4.00 },
  { min: 120, max: 139, grade: 'A-', gpa: 3.50 },
  { min: 100, max: 119, grade: 'B', gpa: 3.00 },
  { min: 80, max: 99, grade: 'C', gpa: 2.00 },
  { min: 66, max: 79, grade: 'D', gpa: 1.00 },
  { min: 0, max: 65, grade: 'F', gpa: 0.00 },
];

export const SUBJECT_CONFIGS: SubjectConfig[] = [
  {
    id: 'bangla',
    name: 'Bangla',
    maxMarks: 200,
    papers: [
      { id: 'bangla_1', name: 'Bangla 1st Paper', shortName: '1st', cqMax: 70, mcqMax: 30, practicalMax: 0, totalMax: 100 },
      { id: 'bangla_2', name: 'Bangla 2nd Paper', shortName: '2nd', cqMax: 100, mcqMax: 0, practicalMax: 0, totalMax: 100 }
    ]
  },
  {
    id: 'english',
    name: 'English',
    maxMarks: 200,
    papers: [
      { id: 'english_1', name: 'English 1st Paper', shortName: '1st', cqMax: 100, mcqMax: 0, practicalMax: 0, totalMax: 100 },
      { id: 'english_2', name: 'English 2nd Paper', shortName: '2nd', cqMax: 100, mcqMax: 0, practicalMax: 0, totalMax: 100 }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    maxMarks: 200,
    papers: [
      { id: 'physics_1', name: 'Physics 1st Paper', shortName: '1st', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 },
      { id: 'physics_2', name: 'Physics 2nd Paper', shortName: '2nd', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    maxMarks: 200,
    papers: [
      { id: 'chemistry_1', name: 'Chemistry 1st Paper', shortName: '1st', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 },
      { id: 'chemistry_2', name: 'Chemistry 2nd Paper', shortName: '2nd', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    maxMarks: 200,
    papers: [
      { id: 'biology_1', name: 'Biology 1st Paper', shortName: '1st', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 },
      { id: 'biology_2', name: 'Biology 2nd Paper', shortName: '2nd', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 }
    ]
  },
  {
    id: 'higher_math',
    name: 'Higher Mathematics',
    maxMarks: 200,
    papers: [
      { id: 'higher_math_1', name: 'Higher Math 1st Paper', shortName: '1st', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 },
      { id: 'higher_math_2', name: 'Higher Math 2nd Paper', shortName: '2nd', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 }
    ]
  },
  {
    id: 'ict',
    name: 'ICT',
    maxMarks: 100, // Raw max is 100
    papers: [
      { id: 'ict', name: 'Information & Communication Technology', shortName: 'ICT', cqMax: 50, mcqMax: 25, practicalMax: 25, totalMax: 100 }
    ]
  }
];

export const OPTIONAL_SUBJECT_CHOICES: { id: SubjectId, name: string }[] = [
  { id: 'biology', name: 'Biology' },
  { id: 'higher_math', name: 'Higher Mathematics' }
];

export const DEFAULT_SCENARIOS = {
  CURRENT: 'current',
  EXPECTED: 'expected',
  SAFE: 'safe',
  DREAM: 'dream'
};
