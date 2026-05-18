import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '../../shared/components/Motion.jsx';

const LIME = '#ccff00';
const GREEN = '#10b981';

const stats = [
  { value: 200000, display: '200K+', label: 'Active Players', icon: '👾', color: LIME, sub: 'Growing 12% monthly' },
  { value: 1400, display: '1,400+', label: 'Tournaments Hosted', icon: '🏆', color: GREEN, sub: 'Across 40+ game modes' },
  { value: 8000000, display: '8M+', label: 'Matches Played', icon: '🎮', color: '#38bdf8', sub: '24/7 live matchmaking' },
  { value: 500000, display: '$500K+', label: 'Prize Money Awarded', icon: '💰', color: '#a78bfa', sub: 'Instant verified payouts' },
];

const useCounter = (target, duration = 2000, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
};

const StatCard = ({ stat, started, index }) => {
  const count = useCounter(stat.value, 2200, started);
  const [hovered, setHovered] = useState(false);

  const formatCount = (n, display) => {
    if (display.startsWith('$')) {
      if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M+`;
      if (n >= 1000) return `$${(n / 1000).toFixed(0)}K+`;
      return `$${n}`;
    }
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M+`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K+`;
    return `${n.toLocaleString()}+`;
  };

  return (
    <div
      data-cursor="hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '1.5rem',
        padding: '36px 30px 32px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: hovered
          ? `linear-gradient(170deg, rgba(10,10,12,0.95), rgba(10,10,12,0.85))`
          : 'rgba(10,10,12,0.6)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: `1px solid ${hovered ? `${stat.color}40` : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px ${stat.color}15`
          : '0 12px 30px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Background watermark */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        fontSize: 120, opacity: 0.03, pointerEvents: 'none',
        color: stat.color, lineHeight: 1,
      }}>
        {stat.icon}
      </div>

      {/* Radial glow at bottom */}
      <div style={{
        position: 'absolute', bottom: '-40%', left: '10%', right: '10%', height: '80%',
        background: `radial-gradient(ellipse at center bottom, ${stat.color}12, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'opacity 0.4s',
        opacity: hovered ? 1 : 0.4,
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
        background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />

      {/* Icon */}
      <div style={{
        width: 60, height: 60, borderRadius: 16,
        background: hovered ? stat.color : `${stat.color}12`,
        border: `1px solid ${stat.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
        fontSize: 28,
        color: hovered ? '#000' : stat.color,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: hovered ? `0 0 24px ${stat.color}40` : 'none',
      }}>
        {stat.icon}
      </div>

      {/* Counter */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 44, fontWeight: 800,
        color: '#fff',
        marginBottom: 8,
        letterSpacing: '-0.03em',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{ color: hovered ? '#fff' : stat.color, transition: 'color 0.4s', textShadow: hovered ? `0 0 20px rgba(255,255,255,0.4)` : `0 0 30px ${stat.color}40` }}>
          {started ? formatCount(count, stat.display) : '0'}
        </span>
      </div>

      {/* Label */}
      <div style={{
        color: '#ebebeb', fontSize: 16, fontWeight: 700,
        fontFamily: "'Space Grotesk', sans-serif",
        marginBottom: 8, position: 'relative', zIndex: 1,
      }}>
        {stat.label}
      </div>

      {/* Sub text */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, color: 'rgba(235,235,235,0.4)',
        letterSpacing: '0.05em',
        position: 'relative', zIndex: 1,
      }}>
        {stat.sub}
      </div>
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !started) {
            setStarted(true);
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section
      ref={sectionRef}
      id="leaderboard"
      className="section"
      style={{
        background: 'transparent',
        position: 'relative',
        paddingTop: 80,
        paddingBottom: 96,
      }}
    >
      {/* Floating ambient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '5%', width: 400, height: 400,
          background: `radial-gradient(circle, ${LIME}0a, transparent 60%)`,
          filter: 'blur(80px)', borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '8%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(56,189,248,0.08), transparent 60%)',
          filter: 'blur(80px)', borderRadius: '50%',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Reveal as="div" style={{ display: 'inline-block' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
              borderRadius: 100, background: `${LIME}10`, border: `1px solid ${LIME}25`,
              marginBottom: 16, boxShadow: `0 0 20px ${LIME}15`,
            }}>
              <span style={{ fontSize: 12 }}>📊</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: LIME, fontWeight: 700,
              }}>
                Platform Stats
              </span>
            </div>
          </Reveal>
          <Reveal as="h2" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16,
            color: '#ebebeb',
          }}>
            Numbers That{' '}
            <span style={{
              background: `linear-gradient(105deg, ${LIME}, #ffffff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 16px ${LIME}30)`,
            }}>
              Speak
            </span>
          </Reveal>
          <Reveal as="p" delay={0.08} style={{
            color: 'rgba(235,235,235,0.5)', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7,
          }}>
            Trusted by hundreds of thousands of competitive gamers worldwide.
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }} className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} as="div" delay={i * 0.08}>
              <StatCard stat={s} started={started} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Stats;
