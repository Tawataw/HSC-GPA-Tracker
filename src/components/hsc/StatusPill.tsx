import { Check, X } from "lucide-react";

export function StatusPill({ passed, size = "sm" }: { passed: boolean; size?: "sm" | "lg" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        size === "lg" ? "px-4 py-1.5 text-sm" : "px-2.5 py-0.5 text-xs"
      } ${
        passed
          ? "bg-success/15 text-success"
          : "bg-destructive/15 text-destructive"
      }`}
    >
      {passed ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <X className="size-3.5" aria-hidden="true" />
      )}
      {passed ? "PASS" : "FAIL"}
    </span>
  );
}

export function GradeBadge({ grade }: { grade: string }) {
  const tone =
    grade === "F"
      ? "bg-destructive/15 text-destructive"
      : grade === "D" || grade === "C"
        ? "bg-warning/20 text-warning-foreground dark:text-warning"
        : "bg-primary/12 text-primary";
  return (
    <span className={`inline-flex min-w-11 justify-center rounded-lg px-2 py-1 text-sm font-bold ${tone}`}>
      {grade}
    </span>
  );
}
