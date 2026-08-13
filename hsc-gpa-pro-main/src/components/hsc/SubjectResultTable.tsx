import type { SubjectResult } from "@/engine";
import { GradeBadge, StatusPill } from "./StatusPill";

export function SubjectResultTable({ subjects }: { subjects: SubjectResult[] }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-sm">
          <caption className="sr-only">Subject-wise HSC result summary</caption>
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left">
              <th scope="col" className="px-4 py-3 font-semibold">Subject</th>
              <th scope="col" className="px-4 py-3 font-semibold">Marks</th>
              <th scope="col" className="px-4 py-3 font-semibold">Percentage</th>
              <th scope="col" className="px-4 py-3 font-semibold">Grade</th>
              <th scope="col" className="px-4 py-3 font-semibold">GPA</th>
              <th scope="col" className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.subject.id} className="border-b border-border/60 last:border-0">
                <th scope="row" className="px-4 py-3 text-left font-medium">
                  {s.subject.name}
                  {s.isOptional && (
                    <span className="ml-2 rounded-md bg-accent-violet/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-accent-violet">
                      4th
                    </span>
                  )}
                </th>
                <td className="px-4 py-3 tabular-nums">
                  {s.obtained} / {s.max}
                </td>
                <td className="px-4 py-3 tabular-nums">{s.percentage.toFixed(2)}%</td>
                <td className="px-4 py-3">
                  <GradeBadge grade={s.grade} />
                </td>
                <td className="px-4 py-3 font-semibold tabular-nums">{s.gpa.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <StatusPill passed={s.passed} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
