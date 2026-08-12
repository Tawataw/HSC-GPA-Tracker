import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { SubjectId, ScenarioMarks, Scenario, FinalResult, PaperId } from '../types';
import { calculateFinalResult } from '../engine';

interface AppState {
  scenarios: Record<string, Scenario>;
  activeScenarioId: string;
  theme: 'light' | 'dark' | 'system';
}

const defaultMarks: ScenarioMarks = {};

const defaultState: AppState = {
  scenarios: {
    current: { id: 'current', name: 'Current', marks: { ...defaultMarks }, optionalSubject: 'higher_math', targetGpa: 5.0 },
    expected: { id: 'expected', name: 'Expected', marks: { ...defaultMarks }, optionalSubject: 'higher_math', targetGpa: 5.0 },
    safe: { id: 'safe', name: 'Safe', marks: { ...defaultMarks }, optionalSubject: 'higher_math', targetGpa: 5.0 },
    dream: { id: 'dream', name: 'Dream', marks: { ...defaultMarks }, optionalSubject: 'higher_math', targetGpa: 5.0 }
  },
  activeScenarioId: 'current',
  theme: 'system'
};

interface AppContextType {
  state: AppState;
  activeScenario: Scenario;
  result: FinalResult;
  updateMark: (paperId: PaperId, field: 'cq' | 'mcq' | 'practical', value: number | '') => void;
  setOptionalSubject: (subject: SubjectId) => void;
  setTargetGpa: (gpa: number) => void;
  setActiveScenario: (id: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resetData: () => void;
  loadFromSync: (data: AppState) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('hsc_gpa_analyzer_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local storage data');
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('hsc_gpa_analyzer_data', JSON.stringify(state));
  }, [state]);

  const activeScenario = state.scenarios[state.activeScenarioId] || state.scenarios['current'];

  const result = useMemo(() => {
    return calculateFinalResult(activeScenario.marks, activeScenario.optionalSubject);
  }, [activeScenario]);

  const updateMark = (paperId: PaperId, field: 'cq' | 'mcq' | 'practical', value: number | '') => {
    setState(prev => {
      const scenario = prev.scenarios[prev.activeScenarioId];
      const currentMarks = scenario.marks[paperId] || { cq: '', mcq: '', practical: '' };
      return {
        ...prev,
        scenarios: {
          ...prev.scenarios,
          [prev.activeScenarioId]: {
            ...scenario,
            marks: {
              ...scenario.marks,
              [paperId]: { ...currentMarks, [field]: value }
            }
          }
        }
      };
    });
  };

  const setOptionalSubject = (subject: SubjectId) => {
    setState(prev => ({
      ...prev,
      scenarios: {
        ...prev.scenarios,
        [prev.activeScenarioId]: {
          ...prev.scenarios[prev.activeScenarioId],
          optionalSubject: subject
        }
      }
    }));
  };

  const setTargetGpa = (gpa: number) => {
    setState(prev => ({
      ...prev,
      scenarios: {
        ...prev.scenarios,
        [prev.activeScenarioId]: {
          ...prev.scenarios[prev.activeScenarioId],
          targetGpa: gpa
        }
      }
    }));
  };

  const setActiveScenario = (id: string) => {
    setState(prev => ({ ...prev, activeScenarioId: id }));
  };

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setState(prev => ({ ...prev, theme }));
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      setState(defaultState);
    }
  };

  const loadFromSync = (data: AppState) => {
    setState(data);
  };

  return (
    <AppContext.Provider value={{
      state,
      activeScenario,
      result,
      updateMark,
      setOptionalSubject,
      setTargetGpa,
      setActiveScenario,
      setTheme,
      resetData,
      loadFromSync
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
