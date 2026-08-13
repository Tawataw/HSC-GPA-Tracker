import { useState } from "react";
import { Copy, Layers, Plus, Trash2 } from "lucide-react";
import type { Analyzer } from "@/lib/store";

export function ScenarioManager({ analyzer }: { analyzer: Analyzer }) {
  const {
    data,
    scenarioResults,
    setActiveScenario,
    addScenario,
    duplicateScenario,
    renameScenario,
    deleteScenario,
  } = analyzer;
  const [newName, setNewName] = useState("");

  return (
    <section className="surface-card p-5" aria-label="What-if scenarios">
      <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
        <Layers className="size-4 text-primary" aria-hidden="true" /> What-If Scenarios
      </h3>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {scenarioResults.map(({ scenario, result }) => {
          const active = scenario.id === data.activeScenarioId;
          return (
            <div
              key={scenario.id}
              className={`rounded-2xl border p-4 transition-colors ${
                active ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveScenario(scenario.id)}
                aria-pressed={active}
                className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {active ? "Editing" : "Scenario"}
                </p>
                <p className="font-display text-2xl font-bold tabular-nums">
                  {result.finalGPA.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground tabular-nums">
                  {result.totalMarks} / {result.totalPossible}
                </p>
              </button>
              <input
                aria-label={`Rename scenario ${scenario.name}`}
                value={scenario.name}
                onChange={(e) => renameScenario(scenario.id, e.target.value)}
                className="mt-3 h-9 w-full rounded-lg border border-input bg-background px-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => duplicateScenario(scenario.id)}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs font-medium hover:bg-secondary"
                >
                  <Copy className="size-3.5" aria-hidden="true" /> Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => deleteScenario(scenario.id)}
                  disabled={data.scenarios.length <= 1}
                  aria-label={`Delete scenario ${scenario.name}`}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-2 py-1.5 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-40"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const name = newName.trim() || `Scenario ${data.scenarios.length + 1}`;
          addScenario(name.slice(0, 40));
          setNewName("");
        }}
      >
        <label htmlFor="new-scenario" className="sr-only">
          New scenario name
        </label>
        <input
          id="new-scenario"
          value={newName}
          maxLength={40}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New scenario name"
          className="h-10 flex-1 min-w-40 rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <button
          type="submit"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" aria-hidden="true" /> Add scenario
        </button>
      </form>
    </section>
  );
}
