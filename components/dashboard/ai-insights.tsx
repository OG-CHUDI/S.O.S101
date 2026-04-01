'use client';

import { useStudy } from '@/context/study-context';

export default function AIInsights() {
  const { state, fetchInsights } = useStudy();
  const { insights, insightsLoading, insightsError, stats } = state;

  const noSessions = stats.totalSessions === 0;

  return (
    <div className="card" style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '2px' }}>
            AI Insights
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Powered by Claude
          </div>
        </div>
        {!noSessions && (
          <button
            onClick={fetchInsights}
            disabled={insightsLoading}
            className="btn btn-outline"
            style={{ fontSize: '11px', padding: '6px 12px' }}
          >
            {insightsLoading ? (
              <div style={{ width: '12px', height: '12px', border: '1.5px solid var(--text3)', borderTopColor: 'var(--lime)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            ) : '↻'} Refresh
          </button>
        )}
      </div>

      {/* Empty state */}
      {noSessions && (
        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text3)' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🤖</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: 'var(--text2)', marginBottom: '4px' }}>No data yet</p>
          <p style={{ fontSize: '12px' }}>Complete a session to unlock AI insights.</p>
        </div>
      )}

      {/* Loading */}
      {insightsLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div className="ai-dots">
              <div className="ai-dot" />
              <div className="ai-dot" />
              <div className="ai-dot" />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--font-display)' }}>
              Analysing your study habits…
            </span>
          </div>
          {[80, 95, 70].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: '52px', width: `${w}%` }} />
          ))}
        </div>
      )}

      {/* Error */}
      {insightsError && !insightsLoading && (
        <div style={{
          padding: '12px', borderRadius: '8px',
          background: 'rgba(255,69,69,0.08)', border: '1px solid rgba(255,69,69,0.2)',
          fontSize: '12px', color: 'var(--red)',
        }}>
          {insightsError}
        </div>
      )}

      {/* Insights */}
      {!insightsLoading && insights.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {insights.map((ins, i) => (
            <div
              key={ins.id ?? i}
              className={`card-inset insight-${ins.type} anim-fade-up`}
              style={{ padding: '12px 14px', animationDelay: `${i * 80}ms` }}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '17px', flexShrink: 0 }}>{ins.icon}</span>
                <span style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.55 }}>{ins.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prompt to generate */}
      {!noSessions && !insightsLoading && insights.length === 0 && !insightsError && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <button onClick={fetchInsights} className="btn btn-outline" style={{ fontSize: '13px', padding: '10px 20px' }}>
            🤖 Generate Insights
          </button>
          <p style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '8px', fontFamily: 'var(--font-display)' }}>
            Based on {stats.totalSessions} session{stats.totalSessions !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
