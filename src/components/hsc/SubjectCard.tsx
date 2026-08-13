import { Star } from "lucide-react";
import type { SubjectResult } from "@/engine";
import { GradeBadge, StatusPill } from "./StatusPill";

export function SubjectCard({ result }: { result: SubjectResult }) {
  const isSingle = result.subject.papers.length === 1;
  return (
    <article className="surface-card p-5">
      <header className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-base font-bold uppercase tracking-wide">
            {result.subject.name}
          </h3>
          {result.isOptional && (
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent-violet">
              <Star className="size-3" aria-hidden="true" /> 4th Subject
            </span>
          )}
        </div>
        <StatusPill passed={result.passed} />
      </header>

      <dl className="space-y-2 text-sm">
        {!isSingle &&
          result.papers.map((p) => (
            <div key={p.paper.id} className="flex justify-between">
              <dt className="text-muted-foreground">{p.paper.shortName}</dt>
              <dd className="font-medium tabular-nums">
                {p.total} / {p.paper.totalMax}
              </dd>
            </div>
          ))}
        <div className="flex justify-between border-t border-border pt-2">
          <dt className="text-muted-foreground">{isSingle ? "Total" : "Combined"}</dt>
          <dd className="font-semibold tabular-nums">
            {result.obtained} / {result.max}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Percentage</dt>
          <dd className="font-semibold tabular-nums">{result.percentage.toFixed(2)}%</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Grade</dt>
          <dd>
            <GradeBadge grade={result.grade} />
          </dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="text-muted-foreground">GPA</dt>
          <dd className="font-display text-xl font-bold tabular-nums">
            {result.gpa.toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              result.passed ? "gradient-hero" : "bg-destructive"
            }`}
            style={{ width: `${Math.min(result.percentage, 100)}%` }}
          />
        </div>
        <p className="mt-1.5 text-right text-xs text-muted-foreground tabular-nums">
          {result.percentage.toFixed(0)}%
        </p>
      </div>
    </article>
  );
}
