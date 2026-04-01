import { StudySession, StudyStats, WeeklyDay } from './types';

export const FOCUS_DURATION = 25 * 60;  // seconds
export const BREAK_DURATION = 5 * 60;

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getDayLabel(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' });
}

/** Build the last 7 days array (oldest → newest) */
export function buildWeeklyData(sessions: StudySession[]): WeeklyDay[] {
  const days: WeeklyDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('en-US', { weekday: 'short' });
    const count = sessions.filter((s) => s.dayKey === key).length;
    days.push({ label, dayKey: key, sessions: count });
  }
  return days;
}

/** Compute full stats from the sessions array */
export function computeStats(sessions: StudySession[]): StudyStats {
  const today = todayKey();
  const sessionsToday = sessions.filter((s) => s.dayKey === today).length;
  const totalSessions = sessions.length;

  // Streak: count consecutive days ending today (or yesterday if none today)
  const uniqueDays = Array.from(new Set(sessions.map((s) => s.dayKey))).sort().reverse();
  let streak = 0;
  let lastStudyDate: string | null = uniqueDays[0] ?? null;

  if (uniqueDays.length > 0) {
    const cursor = new Date();
    // If studied today, start from today; else allow yesterday gap
    const todayStudied = uniqueDays[0] === today;
    if (!todayStudied) {
      // Check if yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yk = yesterday.toISOString().slice(0, 10);
      if (uniqueDays[0] !== yk) {
        streak = 0;
      }
    }

    if (todayStudied || (uniqueDays[0] === (() => { const y = new Date(); y.setDate(y.getDate()-1); return y.toISOString().slice(0,10); })())) {
      for (let i = 0; i < uniqueDays.length; i++) {
        const expected = new Date();
        expected.setDate(expected.getDate() - (todayStudied ? i : i + 1));
        const expectedKey = expected.toISOString().slice(0, 10);
        if (uniqueDays[i] === expectedKey) streak++;
        else break;
      }
    }
  }

  // Longest streak
  let longest = 0;
  let current = 0;
  const allDays = Array.from(new Set(sessions.map((s) => s.dayKey))).sort();
  for (let i = 0; i < allDays.length; i++) {
    if (i === 0) { current = 1; }
    else {
      const prev = new Date(allDays[i - 1] + 'T12:00:00');
      const curr = new Date(allDays[i] + 'T12:00:00');
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) current++;
      else current = 1;
    }
    if (current > longest) longest = current;
  }

  return {
    sessionsToday,
    totalSessions,
    currentStreak: streak,
    longestStreak: Math.max(longest, streak),
    weeklyData: buildWeeklyData(sessions),
    lastStudyDate,
  };
}

const STORAGE_KEY = 'sos_sessions_v2';

export function loadSessions(): StudySession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveSessions(sessions: StudySession[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions)); } catch {}
}

export function nanoid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/** Compact number of active "students" — mock, changes per minute */
export function getMockActiveStudents(): number {
  const base = 97;
  const minute = new Date().getMinutes();
  return base + (minute % 13) * 3 + Math.floor(minute / 5);
}
