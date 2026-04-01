'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, TimerStatus } from '@/lib/types';
import { FOCUS_DURATION, BREAK_DURATION, formatTime, getMockActiveStudents } from '@/lib/utils';

interface PomodoroTimerProps {
  onSessionComplete: () => void;
}

const RADIUS = 110;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function PomodoroTimer({ onSessionComplete }: PomodoroTimerProps) {
  const [mode, setMode]           = useState<TimerMode>('focus');
  const [status, setStatus]       = useState<TimerStatus>('idle');
  const [secondsLeft, setSeconds] = useState(FOCUS_DURATION);
  const [sessionCount, setCount]  = useState(0);
  const [students, setStudents]   = useState(getMockActiveStudents());
  const [justCompleted, setJustCompleted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update mock students count every 30s
  useEffect(() => {
    const t = setInterval(() => setStudents(getMockActiveStudents()), 30_000);
    return () => clearInterval(t);
  }, []);

  const totalSeconds = mode === 'focus' ? FOCUS_DURATION : BREAK_DURATION;
  const progress = secondsLeft / totalSeconds;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const handleComplete = useCallback(() => {
    clearInterval(intervalRef.current!);
    setStatus('completed');
    setJustCompleted(true);
    if (mode === 'focus') {
      setCount(c => c + 1);
      onSessionComplete();
      setTimeout(() => {
        setMode('break');
        setSeconds(BREAK_DURATION);
        setStatus('idle');
        setJustCompleted(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setMode('focus');
        setSeconds(FOCUS_DURATION);
        setStatus('idle');
        setJustCompleted(false);
      }, 2500);
    }
  }, [mode, onSessionComplete]);

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) { handleComplete(); return 0; }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [status, handleComplete]);

  const start  = () => setStatus('running');
  const pause  = () => setStatus('paused');
  const reset  = () => {
    setStatus('idle');
    setMode('focus');
    setSeconds(FOCUS_DURATION);
    setJustCompleted(false);
  };

  const isRunning   = status === 'running';
  const isCompleted = status === 'completed';
  const isBreak     = mode === 'break';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>

      {/* Mode tabs */}
      <div style={{
        display: 'flex', gap: '4px',
        background: 'var(--surface2)', borderRadius: '10px', padding: '4px',
        border: '1px solid var(--border)',
      }}>
        {(['focus','break'] as TimerMode[]).map(m => (
          <button key={m} onClick={() => { if (status === 'idle') { setMode(m); setSeconds(m === 'focus' ? FOCUS_DURATION : BREAK_DURATION); }}}
            style={{
              padding: '7px 20px', borderRadius: '7px', border: 'none', cursor: status !== 'idle' ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
              transition: 'all 0.2s',
              background: mode === m ? (m === 'focus' ? 'var(--lime)' : 'var(--orange)') : 'transparent',
              color: mode === m ? 'var(--black)' : 'var(--text3)',
              opacity: status !== 'idle' && mode !== m ? 0.4 : 1,
            }}
          >
            {m === 'focus' ? '⚡ Focus' : '☕ Break'}
          </button>
        ))}
      </div>

      {/* Timer ring */}
      <div className="timer-ring" style={{ width: '280px', height: '280px' }}>
        {isRunning && <div className="pulse-ring" style={{ borderColor: isBreak ? 'rgba(255,140,66,0.3)' : 'var(--lime-glow)' }} />}

        <svg width="280" height="280" viewBox="0 0 280 280">
          <circle className="timer-ring-bg"  cx="140" cy="140" r={RADIUS} strokeWidth="6" fill="none" />
          <circle
            className={`timer-ring-fill${isBreak ? ' break' : ''}`}
            cx="140" cy="140" r={RADIUS} strokeWidth="6" fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>

        {/* Inner content */}
        <div style={{
          position: 'absolute', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '4px',
        }}>
          {isCompleted ? (
            <div style={{ textAlign: 'center', animation: 'scaleIn 0.3s ease' }}>
              <div style={{ fontSize: '40px', marginBottom: '4px' }}>{isBreak ? '✅' : '🎉'}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: isBreak ? 'var(--orange)' : 'var(--lime)' }}>
                {mode === 'focus' ? 'Session complete!' : 'Break over!'}
              </div>
            </div>
          ) : (
            <>
              <div className={`timer-digits${isRunning ? ' running' : ''}`}
                style={{ color: isBreak ? 'var(--orange)' : 'var(--text)' }}>
                {formatTime(secondsLeft)}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: isBreak ? 'var(--orange)' : isRunning ? 'var(--lime)' : 'var(--text3)',
              }}>
                {isRunning ? (isBreak ? 'on break' : 'focusing') : isBreak ? 'break time' : 'ready'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      {!isCompleted && (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {status === 'idle' || status === 'paused' ? (
            <button className="btn btn-lime" onClick={start} style={{ fontSize: '14px', padding: '11px 32px' }}>
              {status === 'paused' ? '▶ Resume' : mode === 'focus' ? '▶ Start Focus' : '▶ Start Break'}
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={pause} style={{ fontSize: '14px', padding: '11px 24px' }}>
              ⏸ Pause
            </button>
          )}
          {status !== 'idle' && (
            <button className="btn btn-ghost" onClick={reset} style={{ fontSize: '13px', padding: '11px 16px' }}>
              ↺
            </button>
          )}
        </div>
      )}

      {/* Session count this run */}
      {sessionCount > 0 && (
        <div style={{ display: 'flex', gap: '6px' }}>
          {Array.from({ length: Math.min(sessionCount, 8) }).map((_, i) => (
            <div key={i} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--lime)', opacity: 0.8,
            }} />
          ))}
          {sessionCount > 8 && <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>+{sessionCount - 8}</span>}
        </div>
      )}

      {/* Co-study indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px',
        background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: '99px',
      }}>
        <span className="co-study-pulse" />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 600, color: 'var(--text2)' }}>
          {students.toLocaleString()} students studying now
        </span>
      </div>
    </div>
  );
}
