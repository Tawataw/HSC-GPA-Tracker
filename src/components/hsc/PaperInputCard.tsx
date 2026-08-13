import { useId } from "react";
import type { PaperConfig } from "@/config/subjects";
import { calculatePaperTotal, type PaperMarks } from "@/engine";

interface Props {
  paper: PaperConfig;
  marks: PaperMarks;
  onChange: (field: "cq" | "mcq" | "practical", value: number | null) => void;
}

function MarkField({
  label,
  max,
  value,
  onChange,
  paperName,
}: {
  label: string;
  max: number;
  value: number | null;
  onChange: (v: number | null) => void;
  paperName: string;
}) {
  const id = useId();
  const invalid = value !== null && (value < 0 || value > max);
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="w-24 shrink-0 text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex flex-1 items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          step="any"
          value={value ?? ""}
          aria-label={`${paperName} ${label} marks out of ${max}`}
          aria-invalid={invalid}
          placeholder="0"
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") return onChange(null);
            const parsed = Number(raw);
            if (!Number.isFinite(parsed)) return onChange(null);
            onChange(Math.min(Math.max(parsed, 0), max));
          }}
          className="h-11 w-full rounded-xl border border-input bg-background px-3 text-base font-semibold tabular-nums transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <span className="w-12 shrink-0 text-sm font-medium text-muted-foreground tabular-nums">
          / {max}
        </span>
      </div>
    </div>
  );
}

export function PaperInputCard({ paper, marks, onChange }: Props) {
  const total = calculatePaperTotal(paper, marks);
  const pct = (total / paper.totalMax) * 100;

  return (
    <fieldset className="surface-card p-4 sm:p-5">
      <legend className="sr-only">{paper.name}</legend>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {paper.shortName}
      </p>
      <div className="space-y-3">
        {paper.cqMax > 0 && (
          <MarkField
            label="CQ"
            max={paper.cqMax}
            value={marks?.cq ?? null}
            paperName={paper.name}
            onChange={(v) => onChange("cq", v)}
          />
        )}
        {paper.mcqMax > 0 && (
          <MarkField
            label="MCQ"
            max={paper.mcqMax}
            value={marks?.mcq ?? null}
            paperName={paper.name}
            onChange={(v) => onChange("mcq", v)}
          />
        )}
        {paper.practicalMax > 0 && (
          <MarkField
            label="Practical"
            max={paper.practicalMax}
            value={marks?.practical ?? null}
            paperName={paper.name}
            onChange={(v) => onChange("practical", v)}
          />
        )}
      </div>
      <div className="mt-4 border-t border-border pt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Paper Total
          </span>
          <span className="font-display text-lg font-bold tabular-nums">
            {total} <span className="text-sm font-medium text-muted-foreground">/ {paper.totalMax}</span>
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      </div>
    </fieldset>
  );
}
