import React, { useState } from 'react';
import { Reveal } from '../../shared/components/Motion.jsx';

const LIME = '#ccff00';
const GREEN = '#10b981';

const features = [
  { icon: '⚡', label: 'Instant matchmaking', desc: 'Sub-second queue times' },
  { icon: '🛡️', label: 'Anti-cheat built-in', desc: 'Real-time integrity checks' },
  { icon: '🏆', label: 'Verified payouts', desc: 'Instant wallet settlement' },
];

const CTA = () => {
  const [primaryHovered, setPrimaryHovered] = useState(false);

  return (
    <section
      className="section"
      style={{
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw', height: '60vw',
          background: `radial-gradient(circle, ${LIME}0a, transparent 60%)`,
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Glass CTA Card */}
        <div style={{
          borderRadius: 28,
          padding: '64px 56px',
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Inner glow */}
          <div style={{
            position: 'absolute', bottom: '-30%', left: '30%',
            width: '40%', height: '60%',
            background: `radial-gradient(ellipse, ${LIME}10, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M40 0v40M0 0h40' stroke='rgba(255,255,255,0.03)' stroke-width='.5'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }} />

          <div
            style={{
              display: 'grid', gridTemplateColumns: '1.3fr 1fr',
              gap: 48, alignItems: 'center', position: 'relative', zIndex: 1,
            }}
            className="cta-grid"
          >
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 100,
                background: `${LIME}12`, border: `1px solid ${LIME}25`,
                marginBottom: 24,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: LIME,
                  animation: 'pulse-dot 2s infinite',
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: LIME, fontWeight: 600,
                }}>
                  Get started today
                </span>
              </div>

              <Reveal as="h2" style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(34px, 4.5vw, 54px)',
                fontWeight: 700, letterSpacing: '-0.06em',
                lineHeight: 1.0, color: '#ebebeb', marginBottom: 20,
              }}>
                Ready to claim
                <br />
                <span className="gradient-text" style={{ fontStyle: 'italic' }}>
                  your crown?
                </span>
              </Reveal>

              <Reveal as="p" delay={0.08} style={{
                color: 'rgba(235,235,235,0.55)', fontSize: 16,
                lineHeight: 1.75, maxWidth: 440, marginBottom: 32,
              }}>
                Join 200,000+ players already competing on ApexNova.
                Free to start. No credit card required.
              </Reveal>

              {/* CTA Buttons */}
              <Reveal as="div" delay={0.12} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  data-cursor="hover"
                  className="btn-primary"
                  onMouseEnter={() => setPrimaryHovered(true)}
                  onMouseLeave={() => setPrimaryHovered(false)}
                  style={{
                    padding: '16px 36px', fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: primaryHovered
                      ? `0 0 40px ${LIME}50`
                      : `0 0 30px ${LIME}30`,
                  }}
                >
                  Start Playing Free
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  data-cursor="hover"
                  className="btn-secondary"
                  style={{
                    padding: '15px 36px', fontSize: 15,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  Watch Demo
                </button>
              </Reveal>
            </div>

            {/* Right side — Feature highlights */}
            <Reveal as="div" delay={0.15} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {features.map((f, i) => (
                <div key={f.label} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '20px 22px', borderRadius: 18,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${LIME}30`;
                  e.currentTarget.style.background = `${LIME}06`;
                  e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `${LIME}10`, border: `1px solid ${LIME}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700, fontSize: 15, color: '#fff',
                      marginBottom: 2,
                    }}>
                      {f.label}
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11, color: 'rgba(255,255,255,0.35)',
                      letterSpacing: '0.05em',
                    }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}

              {/* Trust badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 18px', borderRadius: 14,
                background: `${GREEN}08`, border: `1px solid ${GREEN}20`,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: GREEN,
                  animation: 'pulse-dot 2s infinite',
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, color: GREEN, letterSpacing: '0.1em',
                  textTransform: 'uppercase', fontWeight: 600,
                }}>
                  200,000+ players trust ApexNova
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default CTA;
