'use client';

import { StudyStats } from '@/lib/types';
import { todayKey } from '@/lib/utils';
import { Zap, BookOpen, Flame } from 'lucide-react';

export function StatCards({ stats }: { stats: StudyStats }) {
  const cards = [
    { label: 'Today', value: stats.sessionsToday, icon: Zap, suffix: stats.sessionsToday === 1 ? 'session' : 'sessions' },
    { label: 'Total',  value: stats.totalSessions,  icon: BookOpen, suffix: 'sessions' },
    { label: 'Streak', value: stats.currentStreak,  icon: Flame, suffix: stats.currentStreak === 1 ? 'day' : 'days' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div key={i} className="card-inset" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'center' }}><Icon size={24} strokeWidth={1.5} color="var(--text2)" /></div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700,
              fontSize: '28px', color: c.label === 'Streak' && c.value > 0 ? 'var(--lime)' : 'var(--text)',
              lineHeight: 1, marginBottom: '4px',
            }}>
              {c.value}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {c.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function WeeklyChart({ stats }: { stats: StudyStats }) {
  const today = todayKey();
  const maxSessions = Math.max(...stats.weeklyData.map(d => d.sessions), 1);

  return (
    <div className="card-inset" style={{ padding: '20px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '16px',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>
          This Week
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>
          {stats.weeklyData.reduce((a, d) => a + d.sessions, 0)} sessions
        </span>
      </div>

      <div className="week-bar-wrap">
        {stats.weeklyData.map((day, i) => {
          const isToday = day.dayKey === today;
          const heightPct = day.sessions > 0 ? Math.max((day.sessions / maxSessions) * 100, 12) : 4;
          return (
            <div key={i} className="week-bar-col">
              <div
                className={`week-bar${day.sessions > 0 ? ' has-sessions' : ''}${isToday ? ' today' : ''}`}
                style={{
                  height: `${heightPct}%`,
                  animationDelay: `${i * 60}ms`,
                  opacity: isToday ? 1 : 0.65,
                }}
                title={`${day.label}: ${day.sessions} session${day.sessions !== 1 ? 's' : ''}`}
              />
              <span className="week-bar-label" style={{ color: isToday ? 'var(--lime)' : undefined }}>
                {day.label}
              </span>
            </div>
          );
        })}
      </div>

      {stats.totalSessions === 0 && (
        <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--font-display)' }}>
          Complete your first session to see data
        </div>
      )}
    </div>
  );
}
