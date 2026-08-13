import { useRef, useState } from "react";
import { ClipboardCopy, Download, Printer, RotateCcw, Share2, Upload } from "lucide-react";
import { toast } from "sonner";
import type { CalculationResult } from "@/engine";
import type { Analyzer } from "@/lib/store";

export function buildShareText(result: CalculationResult): string {
  const lines = [
    "HSC GPA ANALYZER BD",
    "",
    `Expected GPA: ${result.finalGPA.toFixed(2)} / 5.00`,
    `Total Marks: ${result.totalMarks} / ${result.totalPossible}`,
    `Percentage: ${result.overallPercentage.toFixed(2)}%`,
    "",
    ...result.subjects.map((s) => `${s.subject.name}: ${s.grade} — ${s.gpa.toFixed(2)}`),
    "",
    `Status: ${result.passed ? "PASS" : "FAIL"}`,
  ];
  return lines.join("\n");
}

const btn =
  "inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3.5 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function DataActions({ analyzer }: { analyzer: Analyzer }) {
  const { data, result, importData, resetAll } = analyzer;
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirming, setConfirming] = useState(false);

  const copy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message);
    } catch {
      toast.error("Clipboard is unavailable in this browser.");
    }
  };

  return (
    <section className="surface-card p-5" aria-label="Data and export options">
      <h3 className="mb-4 font-display text-base font-bold">Save, Share & Export</h3>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={btn}
          onClick={() => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "hsc-gpa-analyzer.json";
            a.click();
            URL.revokeObjectURL(url);
            toast.success("Exported JSON file.");
          }}
        >
          <Download className="size-4" aria-hidden="true" /> Export JSON
        </button>

        <button type="button" className={btn} onClick={() => fileRef.current?.click()}>
          <Upload className="size-4" aria-hidden="true" /> Import JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="sr-only"
          aria-label="Import JSON data file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              importData(JSON.parse(await file.text()));
              toast.success("Data imported.");
            } catch {
              toast.error("That file is not valid analyzer JSON.");
            }
            e.target.value = "";
          }}
        />

        <button
          type="button"
          className={btn}
          onClick={() => copy(buildShareText(result), "Result copied to clipboard.")}
        >
          <ClipboardCopy className="size-4" aria-hidden="true" /> Copy result
        </button>

        <button
          type="button"
          className={btn}
          onClick={async () => {
            const text = buildShareText(result);
            if (navigator.share) {
              try {
                await navigator.share({ title: "HSC GPA Analyzer BD", text });
                return;
              } catch {
                /* user cancelled — fall through to copy */
              }
            }
            void copy(text, "Share not supported — copied instead.");
          }}
        >
          <Share2 className="size-4" aria-hidden="true" /> Share
        </button>

        <button type="button" className={btn} onClick={() => window.print()}>
          <Printer className="size-4" aria-hidden="true" /> Print / PDF
        </button>

        {confirming ? (
          <span className="inline-flex items-center gap-2 rounded-xl border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm">
            Delete all saved data?
            <button
              type="button"
              className="font-semibold text-destructive underline"
              onClick={() => {
                resetAll();
                setConfirming(false);
                toast.success("All data reset.");
              }}
            >
              Yes, reset
            </button>
            <button type="button" className="underline" onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            className={`${btn} text-destructive`}
            onClick={() => setConfirming(true)}
          >
            <RotateCcw className="size-4" aria-hidden="true" /> Reset all data
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Everything is calculated in your browser and saved locally. No account, no servers.
      </p>
    </section>
  );
}
