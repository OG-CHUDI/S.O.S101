'use client';

import { useState } from 'react';
import { useStudy } from '@/context/study-context';

export default function StudyPlanner() {
  const { state, generatePlan } = useStudy();
  const { plan, planLoading, planError } = state;

  const [goal,      setGoal]      = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [subjects,  setSubjects]  = useState<string[]>([]);
  const [showForm,  setShowForm]  = useState(!plan);

  const addSubject = () => {
    const t = subjectInput.trim();
    if (t && !subjects.includes(t) && subjects.length < 6) {
      setSubjects(s => [...s, t]);
      setSubjectInput('');
    }
  };

  const removeSubject = (s: string) => setSubjects(prev => prev.filter(x => x !== s));

  const handleGenerate = async () => {
    if (!goal.trim() || !timeframe.trim() || subjects.length === 0) return;
    await generatePlan(goal.trim(), timeframe.trim(), subjects);
    setShowForm(false);
  };

  const canGenerate = goal.trim() && timeframe.trim() && subjects.length > 0;

  return (
    <div className="card" style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '2px' }}>
            AI Study Planner
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Powered by Claude
          </div>
        </div>
        {plan && (
          <button
            onClick={() => { setShowForm(true); }}
            className="btn btn-ghost"
            style={{ fontSize: '11px', padding: '6px 12px' }}
          >
            ✏️ New Plan
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="anim-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Study Goal
            </label>
            <input
              className="input"
              placeholder="e.g. Prepare for final exams"
              value={goal}
              onChange={e => setGoal(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Timeframe
            </label>
            <input
              className="input"
              placeholder="e.g. 2 weeks, 5 days"
              value={timeframe}
              onChange={e => setTimeframe(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Subjects / Topics
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                className="input"
                placeholder="e.g. Calculus"
                value={subjectInput}
                onChange={e => setSubjectInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSubject(); } }}
                style={{ flex: 1 }}
              />
              <button
                onClick={addSubject}
                className="btn btn-ghost"
                style={{ fontSize: '12px', padding: '10px 14px', flexShrink: 0 }}
                disabled={!subjectInput.trim() || subjects.length >= 6}
              >
                + Add
              </button>
            </div>
            {subjects.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                {subjects.map(s => (
                  <div key={s} style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    background: 'var(--lime-dim)', border: '1px solid rgba(200,255,0,0.2)',
                    borderRadius: '99px', padding: '3px 10px',
                    fontFamily: 'var(--font-display)', fontSize: '12px', color: 'var(--lime)',
                  }}>
                    {s}
                    <button onClick={() => removeSubject(s)} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--lime)', fontSize: '12px', padding: '0', lineHeight: 1,
                    }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {planError && (
            <div style={{
              padding: '10px 12px', borderRadius: '8px',
              background: 'rgba(255,69,69,0.08)', border: '1px solid rgba(255,69,69,0.2)',
              fontSize: '12px', color: 'var(--red)',
            }}>
              {planError}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || planLoading}
            className="btn btn-lime"
            style={{ justifyContent: 'center', fontSize: '13px' }}
          >
            {planLoading ? (
              <>
                <div className="ai-dots">
                  <div className="ai-dot" style={{ background: 'var(--black)' }} />
                  <div className="ai-dot" style={{ background: 'var(--black)' }} />
                  <div className="ai-dot" style={{ background: 'var(--black)' }} />
                </div>
                Generating plan…
              </>
            ) : '🤖 Generate Study Plan'}
          </button>
        </div>
      )}

      {/* Plan display */}
      {!showForm && plan && (
        <div className="anim-fade-up">
          {/* Goal header */}
          <div style={{
            padding: '12px 14px', borderRadius: '8px',
            background: 'var(--lime-dim)', border: '1px solid rgba(200,255,0,0.2)',
            marginBottom: '14px',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--lime)', marginBottom: '4px' }}>
              {plan.goal}
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
              <span>⏱ {plan.timeframe}</span>
              <span>📚 {plan.subjects.join(', ')}</span>
              <span>🎯 ~{plan.totalSessionsPerDay}/day</span>
            </div>
          </div>

          {plan.notes && (
            <p style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '14px', fontStyle: 'italic', lineHeight: 1.55 }}>
              {plan.notes}
            </p>
          )}

          {/* Days */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
            {plan.days.map((day, di) => (
              <div key={di} className="card-inset" style={{ padding: '12px 14px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '12px', color: 'var(--text)', marginBottom: '8px',
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  <span>{day.day}</span>
                  <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '11px' }}>
                    {day.sessions.length} session{day.sessions.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {day.sessions.map((s, si) => (
                    <div key={si} style={{
                      display: 'flex', gap: '8px', alignItems: 'center',
                      fontSize: '12px',
                    }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--lime)', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text)', fontWeight: 600, fontFamily: 'var(--font-display)', minWidth: '80px' }}>{s.subject}</span>
                      <span style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>{s.duration}</span>
                      <span style={{ color: 'var(--text2)', flex: 1 }}>— {s.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
