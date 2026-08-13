import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CalculationResult } from "@/engine";

const short: Record<string, string> = {
  bangla: "Bangla",
  english: "English",
  physics: "Physics",
  chemistry: "Chem",
  biology: "Biology",
  higher_math: "H.Math",
  ict: "ICT",
};

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface-card p-5">
      <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="h-64">{children}</div>
    </div>
  );
}

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.75rem",
  color: "var(--color-foreground)",
  fontSize: "12px",
};

export function AnalyticsCharts({
  result,
  targetGPA,
}: {
  result: CalculationResult;
  targetGPA: number;
}) {
  const data = result.subjects.map((s) => ({
    name: short[s.subject.id] ?? s.subject.name,
    gpa: s.gpa,
    percentage: Number(s.percentage.toFixed(2)),
    failed: !s.passed,
  }));

  const compare = [
    { name: "Current", gpa: Number(result.finalGPA.toFixed(2)) },
    { name: "Target", gpa: Number(targetGPA.toFixed(2)) },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <ChartCard title="Subject GPA">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)" }} />
            <Bar dataKey="gpa" radius={[6, 6, 0, 0]}>
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={d.failed ? "var(--color-destructive)" : "var(--color-chart-1)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Subject Percentage">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)" }} />
            <Bar dataKey="percentage" radius={[6, 6, 0, 0]} fill="var(--color-chart-2)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Current GPA vs Target GPA">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={compare} layout="vertical" margin={{ top: 8, right: 16, left: 12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)" }} />
            <Bar dataKey="gpa" radius={[0, 8, 8, 0]}>
              <Cell fill="var(--color-chart-1)" />
              <Cell fill="var(--color-chart-3)" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Subject Comparison">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <Radar
              dataKey="percentage"
              stroke="var(--color-chart-3)"
              fill="var(--color-chart-3)"
              fillOpacity={0.35}
            />
            <Tooltip contentStyle={tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="surface-card p-5 lg:col-span-2">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Total Marks Progress
          </h3>
          <p className="font-semibold tabular-nums">
            {result.totalMarks} / {result.totalPossible} ({result.overallPercentage.toFixed(2)}%)
          </p>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full gradient-hero rounded-full transition-all duration-500"
            style={{ width: `${Math.min(result.overallPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
