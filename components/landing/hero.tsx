import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ position: 'relative', padding: '100px 24px 80px', textAlign: 'center', overflow: 'hidden' }}>
      <div className="hero-grid" />
      <div className="hero-glow" />

      <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
        <div className="badge badge-lime anim-fade-up" style={{ marginBottom: '24px', display: 'inline-flex' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--lime)', animation: 'pulseLime 2s ease-in-out infinite' }} />
          Pomodoro · AI Insights · Study Planner
        </div>

        <h1 className="anim-fade-up d1" style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(40px, 7vw, 72px)',
          lineHeight: 1.05, letterSpacing: '-0.03em',
          color: 'var(--text)', marginBottom: '20px',
        }}>
          Study smarter.<br />
          <span style={{ color: 'var(--lime)' }}>Stay consistent.</span>
        </h1>

        <p className="anim-fade-up d2" style={{
          fontSize: '17px', color: 'var(--text2)',
          maxWidth: '480px', margin: '0 auto 36px',
          lineHeight: 1.7,
        }}>
          A distraction-free productivity system with Pomodoro sessions, streak tracking,
          and AI that actually understands how you study.
        </p>

        <div className="anim-fade-up d3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/dashboard" className="btn btn-lime" style={{ fontSize: '15px', padding: '13px 30px' }}>
            Start Studying →
          </Link>
          <a href="#features" className="btn btn-ghost" style={{ fontSize: '15px', padding: '13px 30px' }}>
            See features
          </a>
        </div>

        {/* Mock timer preview */}
        <div className="anim-fade-up d4" style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{
            padding: '32px 48px', textAlign: 'center',
            boxShadow: '0 0 60px rgba(200,255,0,0.06)',
            maxWidth: '360px', width: '100%',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '72px', fontWeight: 700,
              color: 'var(--lime)', lineHeight: 1, marginBottom: '16px',
              textShadow: '0 0 40px rgba(200,255,0,0.3)',
            }}>
              25:00
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <div style={{ padding: '8px 20px', background: 'var(--lime)', borderRadius: '8px', color: 'var(--black)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px' }}>
                ▶ Start Focus
              </div>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--lime)', display: 'block' }} />
              <span style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--font-display)' }}>142 students studying now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
