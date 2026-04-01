'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { SOSState, StudySession, AIInsight, StudyPlan } from '@/lib/types';
import { computeStats, loadSessions, saveSessions, nanoid, todayKey } from '@/lib/utils';

const buildInitial = (sessions: StudySession[]): SOSState => ({
  sessions,
  stats: computeStats(sessions),
  insights: [],
  insightsLoading: false,
  insightsError: null,
  plan: null,
  planLoading: false,
  planError: null,
});

type Action =
  | { type: 'COMPLETE_SESSION' }
  | { type: 'SET_INSIGHTS_LOADING' }
  | { type: 'SET_INSIGHTS'; insights: AIInsight[] }
  | { type: 'SET_INSIGHTS_ERROR'; error: string }
  | { type: 'SET_PLAN_LOADING' }
  | { type: 'SET_PLAN'; plan: StudyPlan }
  | { type: 'SET_PLAN_ERROR'; error: string }
  | { type: 'CLEAR_PLAN' };

function reducer(state: SOSState, action: Action): SOSState {
  switch (action.type) {
    case 'COMPLETE_SESSION': {
      const session: StudySession = {
        id: nanoid(),
        completedAt: new Date().toISOString(),
        duration: 25,
        dayKey: todayKey(),
      };
      const sessions = [...state.sessions, session];
      saveSessions(sessions);
      return { ...state, sessions, stats: computeStats(sessions) };
    }
    case 'SET_INSIGHTS_LOADING':
      return { ...state, insightsLoading: true, insightsError: null };
    case 'SET_INSIGHTS':
      return { ...state, insightsLoading: false, insights: action.insights };
    case 'SET_INSIGHTS_ERROR':
      return { ...state, insightsLoading: false, insightsError: action.error };
    case 'SET_PLAN_LOADING':
      return { ...state, planLoading: true, planError: null };
    case 'SET_PLAN':
      return { ...state, planLoading: false, plan: action.plan };
    case 'SET_PLAN_ERROR':
      return { ...state, planLoading: false, planError: action.error };
    case 'CLEAR_PLAN':
      return { ...state, plan: null, planError: null };
    default:
      return state;
  }
}

interface CtxValue {
  state: SOSState;
  completeSession: () => void;
  fetchInsights: () => Promise<void>;
  generatePlan: (goal: string, timeframe: string, subjects: string[]) => Promise<void>;
}

const Ctx = createContext<CtxValue | null>(null);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => buildInitial(loadSessions()));

  // Auto-fetch insights when sessions change and we have some data
  const fetchInsights = useCallback(async () => {
    if (state.sessions.length === 0) return;
    dispatch({ type: 'SET_INSIGHTS_LOADING' });
    try {
      const res = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalSessions: state.stats.totalSessions,
          sessionsToday: state.stats.sessionsToday,
          streak: state.stats.currentStreak,
          weeklyData: state.stats.weeklyData,
          lastStudyDate: state.stats.lastStudyDate,
        }),
      });
      if (!res.ok) throw new Error('Failed to fetch insights');
      const data = await res.json();
      dispatch({ type: 'SET_INSIGHTS', insights: data.insights });
    } catch (e: any) {
      dispatch({ type: 'SET_INSIGHTS_ERROR', error: e.message ?? 'Could not load insights' });
    }
  }, [state.sessions.length, state.stats]);

  const generatePlan = useCallback(async (goal: string, timeframe: string, subjects: string[]) => {
    dispatch({ type: 'SET_PLAN_LOADING' });
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, timeframe, subjects, totalSessions: state.stats.totalSessions }),
      });
      if (!res.ok) throw new Error('Failed to generate plan');
      const data = await res.json();
      dispatch({ type: 'SET_PLAN', plan: data.plan });
    } catch (e: any) {
      dispatch({ type: 'SET_PLAN_ERROR', error: e.message ?? 'Could not generate plan' });
    }
  }, [state.stats.totalSessions]);

  const completeSession = useCallback(() => {
    dispatch({ type: 'COMPLETE_SESSION' });
  }, []);

  return (
    <Ctx.Provider value={{ state, completeSession, fetchInsights, generatePlan }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStudy() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStudy must be used within StudyProvider');
  return ctx;
}
