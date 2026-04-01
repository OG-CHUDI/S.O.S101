'use client';

import Link from 'next/link';

const FEATURES = [
  { icon: '⏱', title: 'Pomodoro Timer', desc: '25-minute focus sessions with 5-minute breaks. The proven method, perfectly tuned.' },
  { icon: '🔥', title: 'Streak System', desc: 'Build momentum by studying every day. Your streak is your accountability partner.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Daily and weekly session counts, visual charts, and clear progress history.' },
  { icon: '🤝', title: 'Co-Study Mode', desc: 'See how many students are studying alongside you. You are never alone.' },
  { icon: '🤖', title: 'AI Insights', desc: 'Personalized observations about your study patterns — when you\'re best, where to improve.' },
  { icon: '📅', title: 'AI Study Planner', desc: 'Tell the AI your goals and get a structured daily plan with session distribution.' },
];

const STEPS = [
  { n: '01', title: 'Open the dashboard', desc: 'No sign-up needed. Your study space is ready instantly.' },
  { n: '02', title: 'Start a focus session', desc: 'Hit start. 25 minutes of pure focus — timer counts down, distractions stay out.' },
  { n: '03', title: 'Review your progress', desc: 'Every session is logged. AI analyses your data and surfaces useful patterns.' },
  { n: '04', title: 'Plan your next week', desc: 'Use the AI planner to build a realistic schedule around your actual goals.' },
];

export function Features() {
  return (
    <section id="features" style={{ padding: '100px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge badge-lime" style={{ marginBottom: '16px', display: 'inline-flex' }}>Features</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em',
            color: 'var(--text)', marginBottom: '12px',
          }}>
            Built for <span style={{ color: 'var(--lime)' }}>deep work</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '16px', maxWidth: '440px', margin: '0 auto' }}>
            Every feature exists for one reason: helping you get more done.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="card-inset" style={{
              padding: '24px', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px',
                background: 'var(--surface3)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '14px',
              }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--text)', marginBottom: '6px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge badge-lime" style={{ marginBottom: '16px', display: 'inline-flex' }}>How it works</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em', color: 'var(--text)',
          }}>
            From zero to <span style={{ color: 'var(--lime)' }}>focused</span> in 60 seconds
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--lime)', letterSpacing: '0.1em', marginBottom: '16px' }}>{s.n}</div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '22px' }}>
                {['🖥️','▶️','📊','🤖'][i]}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '6px' }}>{s.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <Link href="/dashboard" className="btn btn-lime" style={{ fontSize: '15px', padding: '13px 32px' }}>
            Start Your First Session →
          </Link>
          <p style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '12px', fontFamily: 'var(--font-display)' }}>
            No account needed · Data stays on your device
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 24px' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: 'var(--black)' }}>S</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--text2)' }}>S.O.S</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[['Features','#features'],['How it Works','#how-it-works'],['Dashboard','/dashboard']].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize: '13px', color: 'var(--text3)', textDecoration: 'none', fontFamily: 'var(--font-display)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text3)'}
            >{l}</a>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--font-display)' }}>© {new Date().getFullYear()} S.O.S</p>
      </div>
    </footer>
  );
}
