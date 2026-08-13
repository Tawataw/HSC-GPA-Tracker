import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Download,
  Layers,
  LineChart,
  Target,
  Zap,
} from "lucide-react";

const TITLE = "HSC GPA Analyzer BD — Expected HSC Science GPA Calculator";
const DESC =
  "Calculate your expected Bangladesh HSC Science GPA from CQ, MCQ and practical marks across all 13 papers. Subject-wise grades, total marks out of 1300 and 4th subject bonus, instantly.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Landing,
});

const features = [
  { Icon: Zap, title: "Instant Calculation", text: "Every result updates as you type — no submit button, no reload." },
  { Icon: BarChart3, title: "Subject-wise GPA", text: "1st and 2nd papers combine into one grade out of 200, exactly like the board." },
  { Icon: Target, title: "Target GPA", text: "See precisely how many extra marks each subject needs to reach your goal." },
  { Icon: Layers, title: "What-If Scenarios", text: "Compare Current, Expected, Safe and Dream mark sets side by side." },
  { Icon: LineChart, title: "Performance Analytics", text: "Live charts for GPA, percentage and total marks progress." },
  { Icon: Download, title: "Export Result", text: "Export or import JSON, copy a clean summary, share or print as PDF." },
];

function Landing() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="gradient-hero pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            Bangladesh HSC · Science Group
          </p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] sm:text-6xl">
            Know Your HSC GPA <span className="gradient-text">Before the Result</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Enter your expected CQ, MCQ and Practical marks and instantly calculate your
            subject-wise GPA, total marks and estimated HSC GPA.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/calculator"
              className="inline-flex h-13 items-center rounded-2xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Start Calculating
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center rounded-2xl border border-border bg-card px-7 py-3.5 text-base font-semibold transition-colors hover:bg-secondary"
            >
              How It Works
            </Link>
          </div>

          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["13", "Papers"],
              ["7", "Subject GPAs"],
              ["1300", "Total marks"],
              ["5.00", "Max GPA"],
            ].map(([value, label]) => (
              <div key={label} className="surface-card px-4 py-5">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
                <dd className="font-display text-2xl font-bold tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6" aria-labelledby="features">
        <h2 id="features" className="font-display text-2xl font-bold sm:text-3xl">
          Everything you need before results day
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, text }) => (
            <article key={title} className="surface-card p-6 transition-transform hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>

        <div className="surface-card mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <h3 className="font-display text-lg font-bold">Built on the exact HSC rules</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Papers combine into subjects, ICT counts once, and the 4th subject only adds
              max(GPA − 2.00, 0) before dividing by 7.
            </p>
          </div>
          <Link
            to="/calculator"
            className="inline-flex h-12 items-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open the calculator
          </Link>
        </div>
      </section>
    </main>
  );
}
