import { createFileRoute, Link } from "@tanstack/react-router";
import { GRADE_BANDS_200 } from "@/config/gradingRules";
import { SUBJECTS } from "@/config/subjects";

const TITLE = "How the HSC GPA Calculation Works | HSC GPA Analyzer BD";
const DESC =
  "The exact rules used: paper totals, combining 1st and 2nd papers, the 200-mark grading table, ICT conversion, optional subject bonus and the final GPA formula divided by 6.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  "Enter CQ, MCQ and Practical marks for each paper. Only the components that exist for that paper are shown.",
  "Each paper total is calculated as CQ + MCQ + Practical, out of 100.",
  "The 1st and 2nd papers of the same subject are combined into one subject total out of 200.",
  "The combined marks — not the individual papers — determine the subject's grade and GPA.",
  "ICT is a single paper out of 100 and counts as one full subject.",
  "The 4th (optional) subject you select gets the optional adjustment instead of counting normally.",
  "Optional bonus = max(Optional GPA − 2.00, 0), so a low optional GPA never reduces your result.",
  "Final GPA = (sum of the 6 main subject GPAs + optional bonus) ÷ 6, capped at 5.00.",
  "The final GPA is capped at 5.00.",
  "Total marks are calculated separately: all 13 paper totals out of 1300.",
];

function HowItWorks() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        How this calculator works
      </h1>
      <p className="mt-2 text-muted-foreground">
        Every number on the calculator follows these rules exactly — no averaging shortcuts, no
        generic percentage grading.
      </p>

      <section className="surface-card mt-8 p-6" aria-labelledby="steps">
        <h2 id="steps" className="font-display text-xl font-bold">
          Step by step
        </h2>
        <ol className="mt-4 space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="surface-card mt-6 overflow-hidden" aria-labelledby="grading">
        <h2 id="grading" className="px-6 pt-6 font-display text-xl font-bold">
          Grading table (combined marks out of 200)
        </h2>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-y border-border bg-secondary/60 text-left">
              <th scope="col" className="px-6 py-3 font-semibold">Combined marks</th>
              <th scope="col" className="px-6 py-3 font-semibold">Grade</th>
              <th scope="col" className="px-6 py-3 font-semibold">GPA</th>
            </tr>
          </thead>
          <tbody>
            {GRADE_BANDS_200.map((b) => (
              <tr key={b.grade} className="border-b border-border/60 last:border-0">
                <td className="px-6 py-2.5 tabular-nums">
                  {b.min}–{b.max}
                </td>
                <td className="px-6 py-2.5 font-semibold">{b.grade}</td>
                <td className="px-6 py-2.5 tabular-nums">{b.gpa.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-6 py-4 text-sm text-muted-foreground">
          ICT is marked out of 100, so its raw total is internally doubled to an equivalent
          200-mark value before this table is applied. For example ICT 80/100 → 160/200 → A+ →
          5.00. Your ICT marks are always displayed as x / 100.
        </p>
      </section>

      <section className="surface-card mt-6 p-6" aria-labelledby="papers">
        <h2 id="papers" className="font-display text-xl font-bold">
          Mark distribution (13 papers)
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="py-2 font-semibold">Paper</th>
                <th scope="col" className="py-2 font-semibold">CQ</th>
                <th scope="col" className="py-2 font-semibold">MCQ</th>
                <th scope="col" className="py-2 font-semibold">Practical</th>
                <th scope="col" className="py-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {SUBJECTS.flatMap((s) => s.papers).map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0">
                  <th scope="row" className="py-2 text-left font-medium">{p.name}</th>
                  <td className="py-2 tabular-nums">{p.cqMax || "—"}</td>
                  <td className="py-2 tabular-nums">{p.mcqMax || "—"}</td>
                  <td className="py-2 tabular-nums">{p.practicalMax || "—"}</td>
                  <td className="py-2 font-semibold tabular-nums">{p.totalMax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="surface-card mt-6 p-6" aria-labelledby="formula">
        <h2 id="formula" className="font-display text-xl font-bold">
          Worked example
        </h2>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed">
{`Bangla 1st = 90, Bangla 2nd = 70
Combined   = 160 / 200  ->  A+  ->  5.00

Subject GPAs: Bangla 5.00, English 4.00, Physics 5.00,
Chemistry 4.00, Biology 5.00, H.Math 5.00, ICT 5.00
4th subject = Higher Mathematics (GPA 5.00)

Main sum      = 5 + 4 + 5 + 4 + 5 + 5 = 28
Optional bonus = max(5.00 - 2.00, 0)  = 3.00
Final GPA      = (28 + 3) / 6 = 5.00 (capped)`}
        </pre>
      </section>

      <div className="mt-8">
        <Link
          to="/calculator"
          className="inline-flex h-12 items-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start calculating
        </Link>
      </div>
    </main>
  );
}
