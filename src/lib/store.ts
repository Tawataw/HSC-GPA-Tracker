import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_OPTIONAL_SUBJECT_ID } from "@/config/subjects";
import { calculateAll, createEmptyMarks, type MarksMap } from "@/engine";

export const STORAGE_KEY = "hsc-gpa-analyzer-bd:v1";
export const APP_VERSION = "1.0.0";

export interface Scenario {
  id: string;
  name: string;
  marks: MarksMap;
}

export interface AppData {
  version: string;
  scenarios: Scenario[];
  activeScenarioId: string;
  optionalSubjectId: string;
  targetGPA: number;
}

const DEFAULT_SCENARIO_NAMES = ["Current", "Expected", "Safe", "Dream"];

export function createDefaultData(): AppData {
  const scenarios = DEFAULT_SCENARIO_NAMES.map((name, i) => ({
    id: `scenario-${i + 1}`,
    name,
    marks: createEmptyMarks(),
  }));
  return {
    version: APP_VERSION,
    scenarios,
    activeScenarioId: scenarios[0]!.id,
    optionalSubjectId: DEFAULT_OPTIONAL_SUBJECT_ID,
    targetGPA: 5,
  };
}

export function normalizeData(input: unknown): AppData {
  const base = createDefaultData();
  if (!input || typeof input !== "object") return base;
  const raw = input as Partial<AppData>;
  const scenarios = Array.isArray(raw.scenarios) && raw.scenarios.length
    ? raw.scenarios.map((s, i) => ({
        id: typeof s?.id === "string" ? s.id : `scenario-${i + 1}`,
        name: typeof s?.name === "string" ? s.name : `Scenario ${i + 1}`,
        marks: { ...createEmptyMarks(), ...(s?.marks ?? {}) },
      }))
    : base.scenarios;
  const activeScenarioId = scenarios.some((s) => s.id === raw.activeScenarioId)
    ? raw.activeScenarioId!
    : scenarios[0]!.id;
  return {
    version: APP_VERSION,
    scenarios,
    activeScenarioId,
    optionalSubjectId:
      raw.optionalSubjectId === "biology" || raw.optionalSubjectId === "higher_math"
        ? raw.optionalSubjectId
        : base.optionalSubjectId,
    targetGPA:
      typeof raw.targetGPA === "number" && raw.targetGPA >= 0 && raw.targetGPA <= 5
        ? raw.targetGPA
        : 5,
  };
}

export function useAnalyzer() {
  const [data, setData] = useState<AppData>(() => createDefaultData());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setData(normalizeData(JSON.parse(stored)));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full or unavailable */
    }
  }, [data, hydrated]);

  const activeScenario =
    data.scenarios.find((s) => s.id === data.activeScenarioId) ?? data.scenarios[0]!;

  const setMark = useCallback(
    (paperId: string, field: "cq" | "mcq" | "practical", value: number | null) => {
      setData((prev) => ({
        ...prev,
        scenarios: prev.scenarios.map((s) =>
          s.id === prev.activeScenarioId
            ? {
                ...s,
                marks: {
                  ...s.marks,
                  [paperId]: {
                    ...(s.marks[paperId] ?? { cq: null, mcq: null, practical: null }),
                    [field]: value,
                  },
                },
              }
            : s,
        ),
      }));
    },
    [],
  );

  const setOptionalSubject = useCallback(
    (id: string) => setData((p) => ({ ...p, optionalSubjectId: id })),
    [],
  );
  const setTargetGPA = useCallback(
    (v: number) => setData((p) => ({ ...p, targetGPA: Math.min(Math.max(v, 0), 5) })),
    [],
  );
  const setActiveScenario = useCallback(
    (id: string) => setData((p) => ({ ...p, activeScenarioId: id })),
    [],
  );
  const addScenario = useCallback((name: string, marks?: MarksMap) => {
    const id = `scenario-${Date.now()}`;
    setData((p) => ({
      ...p,
      scenarios: [...p.scenarios, { id, name, marks: marks ?? createEmptyMarks() }],
      activeScenarioId: id,
    }));
  }, []);
  const duplicateScenario = useCallback((id: string) => {
    setData((p) => {
      const src = p.scenarios.find((s) => s.id === id);
      if (!src) return p;
      const newId = `scenario-${Date.now()}`;
      return {
        ...p,
        scenarios: [
          ...p.scenarios,
          { id: newId, name: `${src.name} copy`, marks: { ...src.marks } },
        ],
        activeScenarioId: newId,
      };
    });
  }, []);
  const renameScenario = useCallback((id: string, name: string) => {
    setData((p) => ({
      ...p,
      scenarios: p.scenarios.map((s) => (s.id === id ? { ...s, name } : s)),
    }));
  }, []);
  const deleteScenario = useCallback((id: string) => {
    setData((p) => {
      if (p.scenarios.length <= 1) return p;
      const scenarios = p.scenarios.filter((s) => s.id !== id);
      return {
        ...p,
        scenarios,
        activeScenarioId:
          p.activeScenarioId === id ? scenarios[0]!.id : p.activeScenarioId,
      };
    });
  }, []);
  const clearActiveMarks = useCallback(() => {
    setData((p) => ({
      ...p,
      scenarios: p.scenarios.map((s) =>
        s.id === p.activeScenarioId ? { ...s, marks: createEmptyMarks() } : s,
      ),
    }));
  }, []);
  const resetAll = useCallback(() => {
    setData(createDefaultData());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);
  const importData = useCallback((raw: unknown) => setData(normalizeData(raw)), []);

  const result = useMemo(
    () => calculateAll(activeScenario.marks, data.optionalSubjectId),
    [activeScenario.marks, data.optionalSubjectId],
  );

  const scenarioResults = useMemo(
    () =>
      data.scenarios.map((s) => ({
        scenario: s,
        result: calculateAll(s.marks, data.optionalSubjectId),
      })),
    [data.scenarios, data.optionalSubjectId],
  );

  return {
    data,
    hydrated,
    activeScenario,
    result,
    scenarioResults,
    setMark,
    setOptionalSubject,
    setTargetGPA,
    setActiveScenario,
    addScenario,
    duplicateScenario,
    renameScenario,
    deleteScenario,
    clearActiveMarks,
    resetAll,
    importData,
  };
}

export type Analyzer = ReturnType<typeof useAnalyzer>;
