import { Target } from "lucide-react";
import type { CalculationResult } from "@/engine";
import { calculateTargetRequirement } from "@/engine/analysis";

export function TargetGPAPanel({
  result,
  targetGPA,
  onTargetChange,
}: {
  result: CalculationResult;
  targetGPA: number;
  onTargetChange: (v: number) => void;
}) {
  const analysis = calculateTargetRequirement(result, targetGPA);

  return (
    <section className="surface-card p-5" aria-label="Target GPA analysis">
      <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
        <Target className="size-4 text-primary" aria-hidden="true" /> Target GPA
      </h3>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="target-gpa"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Your target
          </label>
          <input
            id="target-gpa"
            type="number"
            min={0}
            max={5}
            step={0.01}
            value={targetGPA}
            onChange={(e) => {
              const v = Number(e.target.value);
              onTargetChange(Number.isFinite(v) ? v : 0);
            }}
            className="h-11 w-28 rounded-xl border border-input bg-background px-3 text-base font-semibold tabular-nums focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
        <div className="rounded-2xl border border-border bg-secondary/40 px-4 py-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Current</p>
          <p className="font-display text-xl font-bold tabular-nums">
            {analysis.current.toFixed(2)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-secondary/40 px-4 py-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Gap</p>
          <p className="font-display text-xl font-bold tabular-nums">
            {analysis.gap.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-5">
        {analysis.achieved ? (
          <p className="rounded-xl bg-success/12 px-4 py-3 text-sm font-medium text-success">
            ✓ You have already reached your target GPA of {analysis.target.toFixed(2)}.
          </p>
        ) : (
          <>
            <p className="mb-3 text-sm text-muted-foreground">
              {analysis.achievable
                ? "Improving these subjects to their next grade boundary reaches your target:"
                : "Even upgrading every possible subject cannot reach this target. Closest possible improvements:"}
            </p>
            <ul className="space-y-3">
              {analysis.suggestions.map((s) => (
                <li key={s.subject.subject.id} className="rounded-xl border border-border p-3 text-sm">
                  <p className="font-display font-bold uppercase tracking-wide">
                    {s.subject.subject.name}
                  </p>
                  <dl className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground sm:grid-cols-4">
                    <div>
                      <dt className="text-xs">Current</dt>
                      <dd className="font-medium text-foreground tabular-nums">
                        {s.subject.obtained} / {s.subject.max}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs">Current grade</dt>
                      <dd className="font-medium text-foreground">{s.currentGrade}</dd>
                    </div>
                    <div>
                      <dt className="text-xs">Next grade</dt>
                      <dd className="font-medium text-foreground">{s.nextGrade}</dd>
                    </div>
                    <div>
                      <dt className="text-xs">Marks required</dt>
                      <dd className="font-medium text-foreground tabular-nums">
                        +{s.marksNeeded}
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
              {analysis.suggestions.length === 0 && (
                <li className="text-sm text-muted-foreground">
                  No further grade improvements are mathematically possible.
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
