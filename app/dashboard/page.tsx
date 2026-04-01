'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useStudy } from '@/context/study-context';
import PomodoroTimer from '@/components/dashboard/pomodoro-timer';
import { StatCards, WeeklyChart } from '@/components/dashboard/session-stats';
import AIInsights from '@/components/dashboard/ai-insights';
import StudyPlanner from '@/components/dashboard/study-planner';

export default function DashboardPage() {
  const { state, completeSession, fetchInsights } = useStudy();

  const handleSessionComplete = useCallback(async () => {
    completeSession();
    // Auto-fetch insights after session
    await fetchInsights();
  }, [completeSession, fetchInsights]);

  const { stats } = state;
  const noSessions = stats.totalSessions === 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--black)' }}>

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
          height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '7px',
              background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: 'var(--black)',
            }}>S</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>
              S.O.S
            </span>
          </Link>

          {/* Streak badge in header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {stats.currentStreak > 0 && (
              <div className="badge badge-lime">
                🔥 {stats.currentStreak} day streak
              </div>
            )}
            {noSessions && (
              <div className="badge" style={{ background: 'var(--surface2)', color: 'var(--text3)', border: '1px solid var(--border)', fontFamily: 'var(--font-display)' }}>
                Start your first session ↓
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main grid ───────────────────────────────────────────── */}
      <main style={{
        flex: 1,
        maxWidth: '1280px', margin: '0 auto', width: '100%',
        padding: '32px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gridTemplateRows: 'auto',
        gap: '20px',
        alignItems: 'start',
      }}>

        {/* ── LEFT COLUMN — Timer + Stats ─────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Timer card */}
          <div className="card anim-fade-up" style={{
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 0 60px rgba(200,255,0,0.04)',
          }}>
            {/* Label */}
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--text3)', marginBottom: '32px',
            }}>
              Focus Session
            </div>

            <PomodoroTimer onSessionComplete={handleSessionComplete} />
          </div>

          {/* Stats */}
          <div className="anim-fade-up d1">
            <StatCards stats={stats} />
          </div>

          {/* Weekly chart */}
          <div className="anim-fade-up d2">
            <WeeklyChart stats={stats} />
          </div>

          {/* Empty state prompt */}
          {noSessions && (
            <div className="card anim-fade-up d3" style={{
              padding: '24px', textAlign: 'center',
              border: '1px dashed var(--border2)',
              background: 'transparent',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚡</div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>
                Ready to focus?
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text3)', lineHeight: 1.6 }}>
                Hit "Start Focus" above to begin your first 25-minute session.
                Your progress will appear here automatically.
              </p>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN — AI panels ────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="anim-fade-up d2">
            <AIInsights />
          </div>
          <div className="anim-fade-up d3">
            <StudyPlanner />
          </div>
        </div>

      </main>
    </div>
  );
}
