# HSC GPA Pro

BUILD A COMPLETE, PRODUCTION-QUALITY, MODERN BANGLADESH HSC SCIENCE GPA CALCULATOR & RESULT ANALYZER

PROJECT NAME:

"HSC GPA Analyzer BD"

============================================================

1. PROJECT PURPOSE

============================================================

Build a fully functional, dynamic, modern and premium web application for Bangladesh HSC Science Group students.

The application allows a student to enter expected marks for ALL 13 HSC PAPERS and automatically calculates:

• Paper-wise total marks

• Subject-wise combined marks

• Subject-wise percentage

• Subject-wise grade

• Subject-wise GPA

• Total marks out of 1300

• Overall percentage

• 4th/optional subject GPA

• Optional subject bonus

• Main/Final GPA out of 5.00

• PASS / FAIL status

• Strongest subject

• Weakest subject

• Target GPA analysis

• What-if scenarios

• Visual analytics

IMPORTANT:

This is NOT a paper-wise GPA calculator.

For Bangla, English, Physics, Chemistry, Biology and Higher Mathematics, the 1st and 2nd papers MUST be combined first.

The combined subject marks are then used to determine that SUBJECT'S grade and GPA.

Only ICT is a single-paper subject.

============================================================

2. EXACT PAPER STRUCTURE

============================================================

There are exactly 13 papers:

BANGLA

1. Bangla 1st Paper

2. Bangla 2nd Paper

ENGLISH

3. English 1st Paper

4. English 2nd Paper

PHYSICS

5. Physics 1st Paper

6. Physics 2nd Paper

CHEMISTRY

7. Chemistry 1st Paper

8. Chemistry 2nd Paper

BIOLOGY

9. Biology 1st Paper

10. Biology 2nd Paper

HIGHER MATHEMATICS

11. Higher Mathematics 1st Paper

12. Higher Mathematics 2nd Paper

ICT

13. ICT

Therefore:

TOTAL PAPERS = 13

TOTAL SUBJECT-LEVEL RESULTS = 7

The 7 subject-level results are:

1. Bangla

2. English

3. Physics

4. Chemistry

5. Biology

6. Higher Mathematics

7. ICT

============================================================

3. EXACT MARK DISTRIBUTION

============================================================

Use these exact mark distributions.

------------------------------------------------------------

BANGLA 1ST PAPER

------------------------------------------------------------

CQ = 70

MCQ = 30

Practical = 0

Total = 100

------------------------------------------------------------

BANGLA 2ND PAPER

------------------------------------------------------------

CQ = 100

MCQ = 0

Practical = 0

Total = 100

------------------------------------------------------------

ENGLISH 1ST PAPER

------------------------------------------------------------

CQ = 100

MCQ = 0

Practical = 0

Total = 100

------------------------------------------------------------

ENGLISH 2ND PAPER

------------------------------------------------------------

CQ = 100

MCQ = 0

Practical = 0

Total = 100

------------------------------------------------------------

PHYSICS 1ST PAPER

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

------------------------------------------------------------

PHYSICS 2ND PAPER

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

------------------------------------------------------------

CHEMISTRY 1ST PAPER

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

------------------------------------------------------------

CHEMISTRY 2ND PAPER

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

------------------------------------------------------------

BIOLOGY 1ST PAPER

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

------------------------------------------------------------

BIOLOGY 2ND PAPER

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

------------------------------------------------------------

HIGHER MATHEMATICS 1ST PAPER

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

------------------------------------------------------------

HIGHER MATHEMATICS 2ND PAPER

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

------------------------------------------------------------

ICT

------------------------------------------------------------

CQ = 50

MCQ = 25

Practical = 25

Total = 100

============================================================

4. TOTAL MARK SYSTEM

============================================================

Every paper has a maximum of 100 marks.

13 × 100 = 1300

Therefore:

TOTAL POSSIBLE MARKS = 1300

Calculate:

Total Obtained Marks

Total Possible Marks

Overall Percentage

Formula:

Overall Percentage =

(Total Obtained Marks / 1300) × 100

Example:

1120 / 1300 × 100

= 86.15%

Display:

TOTAL MARKS

1120 / 1300

OVERALL PERCENTAGE

86.15%

This must update instantly.

============================================================

5. PAPER-LEVEL CALCULATION

============================================================

For every paper:

Paper Total =

CQ + MCQ + Practical

Only enabled components should be displayed.

Example:

Physics 1st Paper:

CQ          [42] / 50

MCQ         [21] / 25

Practical   [23] / 25

Paper Total:

86 / 100

Example:

Bangla 2nd Paper:

CQ          [82] / 100

Paper Total:

82 / 100

Input validation:

• Minimum = 0

• Maximum = configured maximum

• Negative values prohibited

• Non-numeric values prohibited

• Marks above maximum prohibited

• Empty inputs handled safely

• Invalid input must never crash the application

============================================================

6. CRITICAL SUBJECT-LEVEL GPA LOGIC

============================================================

THIS IS THE MOST IMPORTANT CALCULATION RULE.

DO NOT calculate GPA separately for the 1st and 2nd papers.

For all two-paper subjects:

1. Calculate 1st paper total.

2. Calculate 2nd paper total.

3. ADD both totals.

4. Use the combined subject marks to determine the subject grade.

5. Convert that grade into the subject GPA.

The 1st and 2nd papers together represent ONE SUBJECT RESULT.

------------------------------------------------------------

EXAMPLE — BANGLA

------------------------------------------------------------

Bangla 1st Paper:

90 / 100

Bangla 2nd Paper:

70 / 100

Combined:

90 + 70 = 160

Maximum:

100 + 100 = 200

Therefore:

Bangla = 160 / 200

According to the provided grading system:

160 / 200 = A+

GPA = 5.00

IMPORTANT:

Do NOT calculate:

Bangla 1st GPA = 5.00

Bangla 2nd GPA = 4.00

Then average them.

That is NOT the required calculation.

Correct:

90 + 70

↓

160 / 200

↓

A+

↓

GPA 5.00

============================================================

7. SUBJECT MAPPING

============================================================

Bangla:

Bangla 1st + Bangla 2nd

English:

English 1st + English 2nd

Physics:

Physics 1st + Physics 2nd

Chemistry:

Chemistry 1st + Chemistry 2nd

Biology:

Biology 1st + Biology 2nd

Higher Mathematics:

Higher Mathematics 1st + Higher Mathematics 2nd

ICT:

ICT only

Therefore:

13 PAPER INPUTS

↓

7 SUBJECT-LEVEL RESULTS

↓

7 SUBJECT GPAs

============================================================

8. SUBJECT MAXIMUM MARKS

============================================================

Bangla:

200

English:

200

Physics:

200

Chemistry:

200

Biology:

200

Higher Mathematics:

200

ICT:

100

Total across all 13 papers:

1300

============================================================

9. EXACT GRADING SYSTEM PROVIDED FOR THIS CALCULATOR

============================================================

For 200-mark subjects, use EXACTLY this grading table:

------------------------------------------------------------

HSC SCIENCE SUBJECT GRADING — OUT OF 200

------------------------------------------------------------

160–200

Grade: A+

GPA: 5.00

140–159

Grade: A

GPA: 4.00

120–139

Grade: A-

GPA: 3.50

100–119

Grade: B

GPA: 3.00

80–99

Grade: C

GPA: 2.00

66–79

Grade: D

GPA: 1.00

0–65

Grade: F

GPA: 0.00

These boundaries are the SOURCE OF TRUTH for this project.

Do NOT replace them with a generic percentage-based grading table.

Do NOT independently calculate grade from percentage.

Use the exact combined-mark boundaries above.

============================================================

10. TWO-PAPER SUBJECT GRADING

============================================================

For:

Bangla

English

Physics

Chemistry

Biology

Higher Mathematics

the maximum is 200.

Calculate:

Combined Subject Marks =

Paper 1 Total + Paper 2 Total

Then directly apply the 200-mark grading table.

Examples:

160 / 200

→ A+

→ 5.00

150 / 200

→ A

→ 4.00

130 / 200

→ A-

→ 3.50

110 / 200

→ B

→ 3.00

90 / 200

→ C

→ 2.00

70 / 200

→ D

→ 1.00

60 / 200

→ F

→ 0.00

============================================================

11. ICT GRADING

============================================================

ICT is different because its maximum raw mark is 100.

The provided grading system is defined on a 200-mark scale.

Therefore, for ICT:

Raw ICT Total:

0–100

Convert it to an equivalent 200-mark scale before applying the provided grading table.

Formula:

ICT Equivalent Marks =

ICT Raw Total × 2

Examples:

ICT = 80 / 100

Equivalent:

80 × 2 = 160 / 200

Therefore:

A+

GPA = 5.00

ICT = 70 / 100

Equivalent:

70 × 2 = 140 / 200

Therefore:

A

GPA = 4.00

ICT = 60 / 100

Equivalent:

60 × 2 = 120 / 200

Therefore:

A-

GPA = 3.50

ICT = 50 / 100

Equivalent:

50 × 2 = 100 / 200

Therefore:

B

GPA = 3.00

ICT = 40 / 100

Equivalent:

40 × 2 = 80 / 200

Therefore:

C

GPA = 2.00

ICT = 33 / 100

Equivalent:

33 × 2 = 66 / 200

Therefore:

D

GPA = 1.00

ICT = 32 / 100

Equivalent:

32 × 2 = 64 / 200

Therefore:

F

GPA = 0.00

The UI should still display ICT as:

ICT

80 / 100

A+

5.00

Do NOT display "160 / 200" as the student's actual ICT marks.

The 200-scale value is only an internal grading conversion.

============================================================

12. SUBJECT RESULT CARD

============================================================

Create a premium subject-level result card.

Example:

┌──────────────────────────────────────┐

│ BANGLA                               │

│                                      │

│ 1st Paper       90 / 100             │

│ 2nd Paper       70 / 100             │

│                                      │

│ Combined        160 / 200            │

│ Percentage      80.00%               │

│ Grade           A+                   │

│ GPA             5.00                 │

│ Status          PASS                 │

│                                      │

│ ████████████████████ 80%             │

└──────────────────────────────────────┘

ICT:

┌──────────────────────────────────────┐

│ ICT                                  │

│                                      │

│ Total           80 / 100             │

│ Percentage      80.00%               │

│ Grade           A+                   │

│ GPA             5.00                 │

│ Status          PASS                 │

└──────────────────────────────────────┘

============================================================

13. SUBJECT RESULT TABLE

============================================================

Create a dedicated subject-level result table.

Columns:

Subject

Combined Marks

Percentage

Grade

GPA

Status

Example:

Bangla

160 / 200

80.00%

A+

5.00

PASS

English

152 / 200

76.00%

A

4.00

PASS

Physics

174 / 200

87.00%

A+

5.00

PASS

Chemistry

...

...

...

...

...

ICT

80 / 100

80.00%

A+

5.00

PASS

For two-paper subjects, show combined marks out of 200.

For ICT, show raw marks out of 100.

============================================================

14. 4TH / OPTIONAL SUBJECT

============================================================

Allow the student to choose the 4th/optional subject.

Example:

4th Subject:

[ Higher Mathematics ▼ ]

Possible choices:

• Biology

• Higher Mathematics

The selected subject becomes the optional subject.

The optional subject must NOT be counted as an ordinary main subject in the same way as the other six subjects.

============================================================

15. OPTIONAL SUBJECT BONUS

============================================================

After calculating the optional subject GPA:

Optional Bonus =

Optional Subject GPA - 2.00

If the result is negative:

Optional Bonus = 0.00

Formula:

Optional Bonus =

max(Optional GPA - 2.00, 0)

Examples:

Optional GPA = 5.00

→ Bonus = 3.00

Optional GPA = 4.00

→ Bonus = 2.00

Optional GPA = 3.50

→ Bonus = 1.50

Optional GPA = 3.00

→ Bonus = 1.00

Optional GPA = 2.00

→ Bonus = 0.00

Optional GPA = 1.00

→ Bonus = 0.00

============================================================

16. MAIN / FINAL GPA FORMULA

============================================================

THIS MUST FOLLOW THE EXACT FORMULA PROVIDED BY THE PROJECT OWNER.

There are 7 subject-level GPAs:

Bangla

English

Physics

Chemistry

Biology

Higher Mathematics

ICT

One of them is the 4th/optional subject.

First:

Calculate all 7 subject GPAs.

Then:

1. Identify the optional subject.

2. Remove the optional subject from the normal main-subject sum.

3. There are 6 main/other subject GPAs.

4. Calculate:

Optional Bonus =

max(Optional GPA - 2.00, 0)

5. Add the Optional Bonus to the 6 main subject GPAs.

6. Divide the result by 7.

EXACT FORMULA:

FINAL GPA =

(

Sum of 6 Main Subject GPAs

+

Optional Bonus

) / 7

Then:

Final GPA =

min(Final GPA, 5.00)

The denominator MUST be 7.

Do NOT divide by 6.

Do NOT average the 7 GPAs directly.

Do NOT add the optional GPA directly.

============================================================

17. FINAL GPA EXAMPLE

============================================================

Suppose:

Bangla = 5.00

English = 4.00

Physics = 5.00

Chemistry = 4.00

Biology = 5.00

Higher Mathematics = 5.00

ICT = 5.00

Suppose:

Higher Mathematics = 4th Subject.

Main subjects:

Bangla = 5.00

English = 4.00

Physics = 5.00

Chemistry = 4.00

Biology = 5.00

ICT = 5.00

Main GPA Sum:

5 + 4 + 5 + 4 + 5 + 5

= 28

Optional GPA:

5.00

Optional Bonus:

5.00 - 2.00

= 3.00

Final:

(28 + 3) / 7

= 31 / 7

= 4.428571...

Display:

FINAL GPA

4.43 / 5.00

============================================================

18. FINAL GPA DASHBOARD

============================================================

Create a large premium GPA hero card:

-----------------------------------------

        YOUR EXPECTED HSC GPA

-----------------------------------------

             4.43

            / 5.00

             PASS

-----------------------------------------

TOTAL MARKS

1120 / 1300

OVERALL PERCENTAGE

86.15%

OPTIONAL SUBJECT

Higher Mathematics

OPTIONAL GPA

5.00

OPTIONAL BONUS

+3.00

FINAL GPA

4.43 / 5.00

All numbers must be dynamic.

============================================================

19. TOTAL MARK CALCULATION

============================================================

Total marks must be calculated from ALL 13 paper totals.

Formula:

Total Marks =

Bangla 1st

+ Bangla 2nd

+ English 1st

+ English 2nd

+ Physics 1st

+ Physics 2nd

+ Chemistry 1st

+ Chemistry 2nd

+ Biology 1st

+ Biology 2nd

+ Higher Mathematics 1st

+ Higher Mathematics 2nd

+ ICT

Maximum:

1300

IMPORTANT:

Total marks and GPA are separate calculations.

Do NOT use the final GPA formula to calculate total marks.

============================================================

20. PASS / FAIL

============================================================

Every subject must display:

PASS

or

FAIL

If any required subject receives:

Grade = F

GPA = 0.00

then the overall expected result should clearly indicate:

FAIL

Show:

FAILED SUBJECTS

and list the relevant subject(s).

Do not hide failed subjects.

Do not falsely show PASS when a required subject is failed.

============================================================

21. REAL-TIME CALCULATION

============================================================

Changing ANY input must instantly update:

• Paper total

• Subject combined total

• Subject percentage

• Subject grade

• Subject GPA

• Total marks

• Overall percentage

• Optional GPA

• Optional bonus

• Final GPA

• PASS/FAIL

• Charts

• Analysis

• Target GPA

No page reload.

============================================================

22. TARGET GPA MODE

============================================================

Add a:

TARGET GPA

feature.

Input:

[ 5.00 ]

Display:

Current GPA

Target GPA

GPA Gap

Then analyze which subjects could improve the result.

Show grade boundaries and required marks where mathematically possible.

Example:

CHEMISTRY

Current:

138 / 200

Current Grade:

A-

Next Grade:

A

Additional marks required:

2

Do not generate mathematically impossible recommendations.

============================================================

23. WHAT-IF SCENARIO MODE

============================================================

Allow users to create multiple mark scenarios.

Default:

Current

Expected

Safe

Dream

Each scenario contains independent values for all 13 papers.

Users can:

• Create scenario

• Duplicate scenario

• Rename scenario

• Delete scenario

• Compare scenarios

Example:

CURRENT

GPA 4.21

EXPECTED

GPA 4.57

DREAM

GPA 5.00

============================================================

24. PERFORMANCE ANALYSIS

============================================================

Automatically identify:

• Strongest subject

• Weakest subject

• Highest percentage

• Lowest percentage

• Highest GPA

• Lowest GPA

• A+ subjects

• A subjects

• Subjects close to next grade

• Failed subjects

Example:

"Your strongest subject is Physics with 87.00%."

"Your weakest subject is Chemistry with 68.50%."

"English is 3 marks away from the next grade boundary."

Use deterministic calculations.

Do not pretend to use AI.

============================================================

25. VISUAL ANALYTICS

============================================================

Add:

• Subject GPA Bar Chart

• Subject Percentage Chart

• Total Marks Progress

• Current GPA vs Target GPA

• Subject Comparison

Charts must update live.

Use a modern chart library such as Recharts.

============================================================

26. PAPER INPUT UI

============================================================

Each paper should have an elegant input card.

Physics:

PHYSICS — 1ST PAPER

CQ

[ 42 ] / 50

MCQ

[ 21 ] / 25

Practical

[ 23 ] / 25

TOTAL

86 / 100

Bangla 1st:

BANGLA — 1ST PAPER

CQ

[ 62 ] / 70

MCQ

[ 25 ] / 30

TOTAL

87 / 100

Bangla 2nd:

BANGLA — 2ND PAPER

CQ

[ 82 ] / 100

TOTAL

82 / 100

Inputs must be touch-friendly.

============================================================

27. MODERN UI / UX

============================================================

Design the website as a premium commercial EdTech application.

Style:

• Modern

• Premium

• Minimal

• Clean

• Futuristic

• Academic

• Professional

Use:

• Rounded cards

• Soft shadows

• Subtle gradients

• Selective glassmorphism

• Smooth transitions

• Modern typography

• Lucide icons

• Progress bars

• Circular GPA visualization

• Micro-interactions

Avoid:

• Excessive animations

• Clutter

• Cartoonish UI

• Excessive gradients

• Old-fashioned calculator design

============================================================

28. COLOR SYSTEM

============================================================

Primary:

Deep Blue / Indigo

Accent:

Cyan / Violet

Success:

Green

Warning:

Amber

Danger:

Red

Use CSS variables/design tokens.

Ensure accessible contrast.

============================================================

29. DARK MODE

============================================================

Support:

Light

Dark

System

Persist theme using localStorage.

============================================================

30. RESPONSIVE DESIGN

============================================================

Optimize heavily for Android/mobile users.

Support:

• Android

• iPhone

• Tablet

• Laptop

• Desktop

Mobile:

• Single-column layout

• Large inputs

• Touch-friendly controls

• Sticky GPA summary

• Compact navigation

Desktop:

• Multi-column dashboard

• Subject card grid

• Side-by-side analytics

============================================================

31. LOCAL STORAGE

============================================================

Automatically save:

• All 13 paper marks

• Optional subject

• Target GPA

• Scenarios

• Theme

• User preferences

Restore automatically when reopening.

Add:

RESET ALL DATA

with confirmation.

============================================================

32. IMPORT / EXPORT

============================================================

Support:

• Export JSON

• Import JSON

• Copy Result

• Print Result

• Download PDF

JSON should contain:

• 13 paper marks

• Optional subject

• Scenario data

• Configuration/version information

============================================================

33. SHARE RESULT

============================================================

Generate a clean shareable summary:

HSC GPA ANALYZER BD

Expected GPA:

4.43 / 5.00

Total Marks:

1120 / 1300

Percentage:

86.15%

Bangla:

A+ — 5.00

English:

A — 4.00

Physics:

A+ — 5.00

Chemistry:

A — 4.00

Biology:

A+ — 5.00

Higher Mathematics:

A+ — 5.00

ICT:

A+ — 5.00

Status:

PASS

Use Web Share API when available.

Fallback:

Copy to clipboard.

============================================================

34. CONFIGURATION-DRIVEN ARCHITECTURE

============================================================

Do NOT hard-code marks and calculations inside UI components.

Create centralized configuration.

Example:

subjectConfig = {

    id: "bangla",

    name: "Bangla",

    maxMarks: 200,

    papers: [

        {

            id: "bangla_1",

            name: "Bangla 1st Paper",

            cqMax: 70,

            mcqMax: 30,

            practicalMax: 0,

            totalMax: 100

        },

        {

            id: "bangla_2",

            name: "Bangla 2nd Paper",

            cqMax: 100,

            mcqMax: 0,

            practicalMax: 0,

            totalMax: 100

        }

    ]

}

For ICT:

subjectConfig = {

    id: "ict",

    name: "ICT",

    maxMarks: 100,

    gradingScaleMax: 200,

    papers: [

        {

            id: "ict",

            name: "ICT",

            cqMax: 50,

            mcqMax: 25,

            practicalMax: 25,

            totalMax: 100

        }

    ]

}

The grading configuration should be centralized.

============================================================

35. CALCULATION ENGINE

============================================================

Separate all calculation logic from UI.

Recommended structure:

/config

    subjects.ts

    gradingRules.ts

    optionalSubjectRules.ts

/engine

    calculatePaperTotal.ts

    calculateSubjectTotal.ts

    calculateSubjectPercentage.ts

    calculateSubjectGrade.ts

    calculateSubjectGPA.ts

    calculateICTEquivalentMarks.ts

    calculateOptionalBonus.ts

    calculateFinalGPA.ts

    calculateTotalMarks.ts

    calculateOverallPercentage.ts

    analyzePerformance.ts

    calculateTargetGPA.ts

/components

    PaperInputCard

    SubjectCard

    SubjectResultTable

    GPADashboard

    TotalMarksCard

    AnalysisPanel

    TargetGPA

    ScenarioManager

    Charts

    RulesSection

============================================================

36. CORE CALCULATION FUNCTIONS

============================================================

Implement pure reusable functions:

calculatePaperTotal()

calculateSubjectTotal()

calculateSubjectPercentage()

calculateSubjectGrade()

calculateSubjectGPA()

calculateICTEquivalentMarks()

calculateOptionalBonus()

calculateTotalMarks()

calculateOverallPercentage()

calculateFinalGPA()

calculateTargetRequirement()

analyzePerformance()

The final GPA function MUST implement:

1. Calculate all 7 subject GPAs.

2. Identify the selected 4th subject.

3. Remove the optional subject from the main-subject sum.

4. Sum the remaining 6 GPAs.

5. Calculate:

Optional Bonus =

max(Optional GPA - 2.00, 0)

6. Add Optional Bonus to the 6 main subject GPAs.

7. Divide by 7.

8. Cap the result at 5.00.

Formula:

Final GPA =

(

Sum of 6 Main Subject GPAs

+

Optional Bonus

) / 7

Final GPA =

min(Final GPA, 5.00)

============================================================

37. TEST CASES

============================================================

The application must test all of the following.

TEST 1:

Bangla 1st = 90

Bangla 2nd = 70

Expected:

Combined = 160 / 200

Grade = A+

GPA = 5.00

TEST 2:

Bangla combined = 159

Expected:

A

4.00

TEST 3:

Bangla combined = 140

Expected:

A

4.00

TEST 4:

Bangla combined = 139

Expected:

A-

3.50

TEST 5:

Bangla combined = 120

Expected:

A-

3.50

TEST 6:

Bangla combined = 119

Expected:

B

3.00

TEST 7:

Bangla combined = 100

Expected:

B

3.00

TEST 8:

Bangla combined = 99

Expected:

C

2.00

TEST 9:

Bangla combined = 80

Expected:

C

2.00

TEST 10:

Bangla combined = 79

Expected:

D

1.00

TEST 11:

Bangla combined = 66

Expected:

D

1.00

TEST 12:

Bangla combined = 65

Expected:

F

0.00

TEST 13:

ICT = 80 / 100

Equivalent:

160 / 200

Expected:

A+

5.00

TEST 14:

ICT = 70 / 100

Equivalent:

140 / 200

Expected:

A

4.00

TEST 15:

ICT = 32 / 100

Equivalent:

64 / 200

Expected:

F

0.00

TEST 16:

Optional GPA = 5.00

Optional Bonus:

3.00

TEST 17:

Optional GPA = 4.00

Optional Bonus:

2.00

TEST 18:

Optional GPA = 2.00

Optional Bonus:

0.00

TEST 19:

Optional GPA = 1.00

Optional Bonus:

0.00

TEST 20:

Any required subject = F

Expected:

Overall Status = FAIL

TEST 21:

All subject GPAs = 5.00

Optional GPA = 5.00

Expected:

(30 + 3) / 7

= 33 / 7

= 4.714285...

Display:

4.71 / 5.00

DO NOT artificially make it 5.00.

The calculator must follow the specified formula exactly.

============================================================

38. IMPORTANT ANTI-ERROR RULES

============================================================

NEVER:

• Calculate GPA separately for 1st and 2nd paper

• Average 1st-paper GPA and 2nd-paper GPA

• Treat 13 papers as 13 GPA subjects

• Treat Bangla 1st and Bangla 2nd as separate subjects

• Treat Physics 1st and Physics 2nd as separate subjects

• Treat Chemistry 1st and Chemistry 2nd as separate subjects

• Treat Biology 1st and Biology 2nd as separate subjects

• Treat Higher Math 1st and 2nd as separate subjects

• Count optional subject twice

• Add optional GPA directly

• Use Optional GPA instead of Optional GPA - 2.00

• Divide the final formula by 6

• Use a generic percentage grading system

• Replace the provided 200-mark grading boundaries

• Allow final GPA above 5.00

• Hide failed subjects

• Break when input is empty or invalid

============================================================

39. CORRECT CALCULATION FLOW

============================================================

13 PAPER INPUTS

        ↓

13 PAPER TOTALS

        ↓

COMBINE TWO PAPERS

        ↓

7 SUBJECT TOTALS

        ↓

APPLY 200-MARK GRADING SYSTEM

        ↓

7 SUBJECT GPAs

        ↓

IDENTIFY 4TH SUBJECT

        ↓

OPTIONAL GPA - 2.00

        ↓

OPTIONAL BONUS

        ↓

ADD BONUS TO 6 MAIN SUBJECT GPAs

        ↓

DIVIDE BY 7

        ↓

CAP AT 5.00

        ↓

FINAL GPA

Separately:

13 PAPER TOTALS

        ↓

TOTAL MARKS

        ↓

/ 1300

        ↓

OVERALL PERCENTAGE

============================================================

40. RULES PAGE

============================================================

Create a dedicated "How This Calculator Works" page.

Explain clearly:

1. Enter CQ, MCQ and Practical marks.

2. Each paper total is calculated.

3. Two papers of the same subject are combined.

4. The combined marks determine that subject's grade and GPA.

5. ICT is calculated as one subject.

6. The selected 4th subject gets the optional adjustment.

7. Optional GPA - 2.00 gives the optional bonus, with a minimum bonus of 0.

8. The six main subject GPAs plus optional bonus are divided by 7.

9. Final GPA is capped at 5.00.

10. Total marks are calculated independently out of 1300.

============================================================

41. LANDING PAGE

============================================================

Hero:

"Know Your HSC GPA Before the Result"

Subtitle:

"Enter your expected CQ, MCQ and Practical marks and instantly calculate your subject-wise GPA, total marks and estimated HSC GPA."

Primary Button:

START CALCULATING

Secondary Button:

HOW IT WORKS

Feature cards:

⚡ Instant Calculation

📊 Subject-wise GPA

🎯 Target GPA

🔄 What-If Scenarios

📈 Performance Analytics

📄 Export Result

============================================================

42. ACCESSIBILITY

============================================================

Implement:

• Semantic HTML

• Proper form labels

• Keyboard navigation

• Visible focus states

• ARIA labels

• Screen-reader support

• Good contrast

• Reduced-motion support

Do not communicate PASS/FAIL using color alone.

Use:

✓ PASS

✕

FAIL

============================================================

43. PRIVACY

============================================================

No login required.

No personal information required.

Prefer client-side calculations.

Store marks locally using localStorage.

Do not send student marks to external servers unless explicitly required.

============================================================

44. TECHNOLOGY

============================================================

Preferred stack:

React

TypeScript

Tailwind CSS

Lucide React

Recharts

Use a clean component-based architecture.

No unnecessary backend.

============================================================

45. FINAL QUALITY STANDARD

============================================================

The final website must look like a polished commercial EdTech application, NOT a basic school project.

Priorities:

1. CALCULATION ACCURACY

2. EXACT USER-PROVIDED GRADING SYSTEM

3. CORRECT 13-PAPER STRUCTURE

4. CORRECT 7-SUBJECT GPA SYSTEM

5. CORRECT 4TH-SUBJECT BONUS

6. CORRECT FINAL GPA FORMULA

7. CORRECT TOTAL MARK CALCULATION

8. MODERN UI/UX

9. MOBILE RESPONSIVENESS

10. PERFORMANCE

11. ACCESSIBILITY

MOST IMPORTANT:

13 PAPERS ≠ 13 GPAs.

There are:

13 PAPER INPUTS

↓

7 SUBJECT GPAs

Bangla:

1st + 2nd → ONE GPA

English:

1st + 2nd → ONE GPA

Physics:

1st + 2nd → ONE GPA

Chemistry:

1st + 2nd → ONE GPA

Biology:

1st + 2nd → ONE GPA

Higher Mathematics:

1st + 2nd → ONE GPA

ICT:

Single paper → ONE GPA

GRADING:

160–200 → A+ → 5.00

140–159 → A  → 4.00

120–139 → A- → 3.50

100–119 → B  → 3.00

80–99   → C  → 2.00

66–79   → D  → 1.00

0–65    → F  → 0.00

For ICT:

Raw / 100 → internally convert to equivalent / 200 for applying the provided grading boundaries.

OPTIONAL:

Optional Bonus =

max(Optional GPA - 2.00, 0)

FINAL:

Final GPA =

(

6 Main Subject GPAs + Optional Bonus

) / 7

Final GPA =

min(Final GPA, 5.00)

TOTAL MARKS:

All 13 paper totals

= / 1300

The application must keep TOTAL MARKS calculation and GPA calculation completely separate.

Build the complete, runnable, production-quality website.

Do NOT build a static mockup.

Do NOT provide fake functionality.

Every input must work.

Every calculation must update in real time.

Every result must be mathematically consistent with the exact rules defined above.

Use centralized configuration so that marks distributions, grading thresholds and GPA rules can be updated later without rewriting the UI.

Before final delivery, thoroughly test all boundary conditions, optional-subject calculations, ICT conversion, subject combining, total marks and final GPA calculations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f85ebac9-ce76-48de-aa82-4695320e4816).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
