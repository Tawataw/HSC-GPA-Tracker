import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, Calculator } from "lucide-react";
import { OPTIONAL_CHOICES, SUBJECTS } from "@/config/subjects";
import { emptyPaperMarks } from "@/engine";
import { useAnalyzer } from "@/lib/store";
import { PaperInputCard } from "@/components/hsc/PaperInputCard";
import { SubjectCard } from "@/components/hsc/SubjectCard";
import { SubjectResultTable } from "@/components/hsc/SubjectResultTable";
import { GPADashboard } from "@/components/hsc/GPADashboard";
import { AnalysisPanel } from "@/components/hsc/AnalysisPanel";
import { TargetGPAPanel } from "@/components/hsc/TargetGPAPanel";
import { ScenarioManager } from "@/components/hsc/ScenarioManager";
import { AnalyticsCharts } from "@/components/hsc/Charts";
import { DataActions } from "@/components/hsc/DataActions";

const TITLE = "GPA Calculator — HSC Science 13 Papers | HSC GPA Analyzer BD";
const DESC =
  "Enter CQ, MCQ and practical marks for all 13 HSC Science papers and instantly get subject-wise grades, GPA, total marks out of 1300 and your expected HSC GPA.";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const analyzer = useAnalyzer();
  const { activeScenario, result, data, setMark, setOptionalSubject, setTargetGPA } = analyzer;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        HSC Science GPA Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        13 papers in, 7 subject GPAs out. Every value updates live and is saved on this device.
      </p>

      <div className="mt-8 space-y-8">
        <GPADashboard result={result} />

        <section className="surface-card flex flex-wrap items-end gap-6 p-5" aria-label="Settings">
          <div>
            <label
              htmlFor="optional-subject"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              4th / Optional subject
            </label>
            <select
              id="optional-subject"
              value={data.optionalSubjectId}
              onChange={(e) => setOptionalSubject(e.target.value)}
              className="h-11 rounded-xl border border-input bg-background px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {OPTIONAL_CHOICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            The optional subject is excluded from the main sum; only{" "}
            <strong>max(GPA − 2.00, 0)</strong> is added as a bonus, and the total is divided by 6 and capped at 5.00.
          </p>
        </section>

        <section aria-labelledby="inputs-heading">
          <h2
            id="inputs-heading"
            className="mb-4 flex items-center gap-2 font-display text-xl font-bold"
          >
            <Calculator className="size-5 text-primary" aria-hidden="true" /> Enter your marks
          </h2>
          <div className="space-y-6">
            {SUBJECTS.map((subject) => (
              <div key={subject.id} className="rounded-3xl border border-border bg-secondary/30 p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-muted-foreground tabular-nums">
                    Subject max {subject.maxMarks}
                    {subject.id === data.optionalSubjectId && " · 4th subject"}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {subject.papers.map((paper) => (
                    <PaperInputCard
                      key={paper.id}
                      paper={paper}
                      marks={activeScenario.marks[paper.id] ?? emptyPaperMarks()}
                      onChange={(field, value) => setMark(paper.id, field, value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="subjects-heading">
          <h2 id="subjects-heading" className="mb-4 font-display text-xl font-bold">
            Subject-wise results
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.subjects.map((s) => (
              <SubjectCard key={s.subject.id} result={s} />
            ))}
          </div>
          <div className="mt-6">
            <SubjectResultTable subjects={result.subjects} />
          </div>
        </section>

        <section aria-labelledby="analytics-heading">
          <h2
            id="analytics-heading"
            className="mb-4 flex items-center gap-2 font-display text-xl font-bold"
          >
            <BookOpenCheck className="size-5 text-primary" aria-hidden="true" /> Analytics
          </h2>
          <div className="space-y-5">
            <AnalyticsCharts result={result} targetGPA={data.targetGPA} />
            <AnalysisPanel result={result} />
            <TargetGPAPanel
              result={result}
              targetGPA={data.targetGPA}
              onTargetChange={setTargetGPA}
            />
            <ScenarioManager analyzer={analyzer} />
            <DataActions analyzer={analyzer} />
          </div>
        </section>
      </div>

      <div className="sticky bottom-3 z-30 mt-8 lg:hidden print:hidden">
        <div className="gradient-hero flex items-center justify-between rounded-2xl px-4 py-3 text-primary-foreground shadow-lg">
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-85">Expected GPA</p>
            <p className="font-display text-2xl font-bold tabular-nums">
              {result.finalGPA.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest opacity-85">Total marks</p>
            <p className="font-semibold tabular-nums">
              {result.totalMarks} / {result.totalPossible}
            </p>
          </div>
          <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-foreground">
            {result.passed ? "✓ PASS" : "✕ FAIL"}
          </span>
        </div>
      </div>
    </main>
  );
}
