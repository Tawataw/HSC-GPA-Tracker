import { AlertTriangle } from "lucide-react";
import type { CalculationResult } from "@/engine";
import { StatusPill } from "./StatusPill";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-xl font-bold tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function GPADashboard({ result }: { result: CalculationResult }) {
  const gpa = result.finalGPA;
  const pct = (gpa / 5) * 100;
  const radius = 78;
  const circumference = 2 * Math.PI * radius;

  return (
    <section aria-label="Expected GPA summary" className="surface-card overflow-hidden">
      <div className="gradient-hero px-6 py-8 text-primary-foreground sm:px-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
              Your Expected HSC GPA
            </p>
            <p className="mt-2 font-display text-6xl font-extrabold tabular-nums leading-none">
              {gpa.toFixed(2)}
            </p>
            <p className="mt-1 text-sm opacity-85">out of 5.00</p>
            <div className="mt-4 inline-block rounded-full bg-background/95 px-1 py-1">
              <StatusPill passed={result.passed} size="lg" />
            </div>
          </div>

          <div className="relative grid size-44 place-items-center">
            <svg viewBox="0 0 180 180" className="size-44 -rotate-90" aria-hidden="true">
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="12"
              />
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (circumference * Math.min(pct, 100)) / 100}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute text-center">
              <p className="font-display text-3xl font-bold tabular-nums">{pct.toFixed(0)}%</p>
              <p className="text-[11px] uppercase tracking-widest opacity-85">of max GPA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 lg:grid-cols-5">
        <Stat
          label="Total Marks"
          value={`${result.totalMarks} / ${result.totalPossible}`}
        />
        <Stat label="Overall %" value={`${result.overallPercentage.toFixed(2)}%`} />
        <Stat
          label="Optional Subject"
          value={result.optionalSubject?.subject.name ?? "—"}
          sub={`GPA ${result.optionalSubject?.gpa.toFixed(2) ?? "0.00"}`}
        />
        <Stat label="Optional Bonus" value={`+${result.optionalBonus.toFixed(2)}`} />
        <Stat
          label="Formula"
          value={`(${result.mainGPASum.toFixed(2)} + ${result.optionalBonus.toFixed(2)}) / 6`}
          sub={`= ${gpa.toFixed(2)}`}
        />
      </div>

      {result.failedSubjects.length > 0 && (
        <div className="mx-5 mb-5 flex items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          <div>
            <p className="font-semibold text-destructive">Failed subjects</p>
            <p className="text-sm text-muted-foreground">
              {result.failedSubjects.map((s) => s.subject.name).join(", ")} — a grade F in any
              subject makes the overall result FAIL.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
