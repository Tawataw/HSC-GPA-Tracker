import { Award, Lightbulb, TrendingDown, TrendingUp } from "lucide-react";
import type { CalculationResult } from "@/engine";
import { analyzePerformance } from "@/engine/analysis";

export function AnalysisPanel({ result }: { result: CalculationResult }) {
  const analysis = analyzePerformance(result);

  if (!analysis.hasData) {
    return (
      <div className="surface-card p-6 text-sm text-muted-foreground">
        Enter your marks to see a performance breakdown.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="surface-card p-5">
        <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
          <Award className="size-4 text-primary" aria-hidden="true" /> Performance Snapshot
        </h3>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-2">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4 text-success" aria-hidden="true" /> Strongest subject
            </dt>
            <dd className="text-right font-semibold">
              {analysis.strongest?.subject.name} · {analysis.strongest?.percentage.toFixed(2)}%
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <TrendingDown className="size-4 text-destructive" aria-hidden="true" /> Weakest subject
            </dt>
            <dd className="text-right font-semibold">
              {analysis.weakest?.subject.name} · {analysis.weakest?.percentage.toFixed(2)}%
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Highest GPA</dt>
            <dd className="font-semibold tabular-nums">
              {analysis.highestGPA?.gpa.toFixed(2)} ({analysis.highestGPA?.subject.name})
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Lowest GPA</dt>
            <dd className="font-semibold tabular-nums">
              {analysis.lowestGPA?.gpa.toFixed(2)} ({analysis.lowestGPA?.subject.name})
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">A+ subjects</dt>
            <dd className="font-semibold">
              {analysis.aPlusSubjects.length
                ? analysis.aPlusSubjects.map((s) => s.subject.name).join(", ")
                : "None yet"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">A subjects</dt>
            <dd className="font-semibold">
              {analysis.aSubjects.length
                ? analysis.aSubjects.map((s) => s.subject.name).join(", ")
                : "None"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="surface-card p-5">
        <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
          <Lightbulb className="size-4 text-accent-violet" aria-hidden="true" /> Insights
        </h3>
        <ul className="space-y-2 text-sm">
          {analysis.insights.map((line) => (
            <li key={line} className="flex gap-2 text-muted-foreground">
              <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {analysis.closeToNextGrade.length > 0 && (
          <div className="mt-5 border-t border-border pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Close to the next grade
            </p>
            <ul className="space-y-2 text-sm">
              {analysis.closeToNextGrade.map((info) => (
                <li key={info.subject.subject.id} className="flex justify-between gap-2">
                  <span>{info.subject.subject.name}</span>
                  <span className="font-semibold tabular-nums">
                    +{info.marksNeeded} → {info.nextGrade} ({info.nextGPA.toFixed(2)})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
