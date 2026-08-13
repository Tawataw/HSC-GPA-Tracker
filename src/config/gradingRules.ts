export interface GradeBand {
  min: number;
  max: number;
  grade: string;
  gpa: number;
}

/**
 * SOURCE OF TRUTH — grading boundaries defined on a 200-mark scale.
 * Never replace with a generic percentage-based table.
 */
export const GRADE_BANDS_200: GradeBand[] = [
  { min: 160, max: 200, grade: "A+", gpa: 5.0 },
  { min: 140, max: 159, grade: "A", gpa: 4.0 },
  { min: 120, max: 139, grade: "A-", gpa: 3.5 },
  { min: 100, max: 119, grade: "B", gpa: 3.0 },
  { min: 80, max: 99, grade: "C", gpa: 2.0 },
  { min: 66, max: 79, grade: "D", gpa: 1.0 },
  { min: 0, max: 65, grade: "F", gpa: 0.0 },
];

export const GRADING_SCALE_MAX = 200;
export const MAX_GPA = 5.0;
export const FAIL_GRADE = "F";
