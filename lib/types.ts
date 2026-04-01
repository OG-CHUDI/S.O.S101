export interface StudySession {
  id: string;
  completedAt: string; // ISO date string
  duration: number;    // minutes (25 = full pomodoro)
  dayKey: string;      // "YYYY-MM-DD"
}

export interface StudyStats {
  sessionsToday: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  weeklyData: WeeklyDay[];
  lastStudyDate: string | null;
}

export interface WeeklyDay {
  label: string;  // "Mon", "Tue" etc.
  dayKey: string;
  sessions: number;
}

export type TimerMode = 'focus' | 'break';
export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  secondsLeft: number;
  sessionCount: number; // sessions this run
}

export interface AIInsight {
  id: string;
  icon: string;
  text: string;
  type: 'positive' | 'neutral' | 'tip';
}

export interface StudyPlan {
  goal: string;
  timeframe: string;
  subjects: string[];
  generatedAt: string;
  days: StudyPlanDay[];
  totalSessionsPerDay: number;
  notes: string;
}

export interface StudyPlanDay {
  day: string;
  sessions: StudyPlanSession[];
}

export interface StudyPlanSession {
  subject: string;
  duration: string;
  focus: string;
}

export interface SOSState {
  sessions: StudySession[];
  stats: StudyStats;
  insights: AIInsight[];
  insightsLoading: boolean;
  insightsError: string | null;
  plan: StudyPlan | null;
  planLoading: boolean;
  planError: string | null;
}
