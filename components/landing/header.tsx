'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(8,8,8,0.90)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 24px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'var(--lime)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: 800, color: 'var(--black)',
            fontFamily: 'var(--font-display)',
          }}>S</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '18px', color: 'var(--text)', letterSpacing: '-0.01em',
          }}>
            S.O.S <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '13px' }}>study OS</span>
          </span>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['Features', 'How it works'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`}
              style={{
                padding: '7px 14px', color: 'var(--text2)',
                textDecoration: 'none', fontSize: '13px',
                fontFamily: 'var(--font-display)', fontWeight: 500,
                borderRadius: '8px', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; (e.currentTarget as HTMLElement).style.background = 'var(--surface2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text2)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >{l}</a>
          ))}
          <Link href="/dashboard" className="btn btn-lime" style={{ fontSize: '13px', padding: '8px 18px', marginLeft: '4px' }}>
            Start Studying →
          </Link>
        </div>
      </div>
    </header>
  );
}
