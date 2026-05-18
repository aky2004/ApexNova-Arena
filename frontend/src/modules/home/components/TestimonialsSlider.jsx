import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../../shared/components/Motion.jsx';

const LIME = '#ccff00';
const GREEN = '#10b981';

const DEFAULT_SLIDES = [
  {
    id: '1',
    quote: 'Real-time leaderboard updates feel illegal — I climbed three ranks in one session without refreshing once.',
    name: 'Marcus Chen',
    handle: '@neonblade_gg',
    meta: 'Snake · #1 ranked',
    rating: 5,
    accent: LIME,
  },
  {
    id: '2',
    quote: 'Prize rails hit instantly. Brackets are clean, anti-cheat is visible, and the obsidian UI actually matches the hype.',
    name: 'Aria Sullivan',
    handle: '@pixelqueen',
    meta: 'Memory Match · 3× winner',
    rating: 5,
    accent: '#a78bfa',
  },
  {
    id: '3',
    quote: 'The Chess Blitz mode here is incredibly polished. Queue times are instant and matchmaking feels fair every single time.',
    name: 'Dev Patel',
    handle: '@swiftace_g',
    meta: 'Chess Blitz · finalist',
    rating: 5,
    accent: '#38bdf8',
  },
  {
    id: '4',
    quote: 'Private rooms, instant invites, zero drama. This is how casual esports should have worked ten years ago.',
    name: 'Luna Park',
    handle: '@gridmaster',
    meta: 'Tic Tac Toe · elite',
    rating: 5,
    accent: GREEN,
  },
];

const TestimonialsSlider = () => {
  const reduced = useReducedMotion();
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/data/testimonials.json', { cache: 'no-store' });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setSlides(
            data.map((t, i) => ({
              id: String(t.id ?? i),
              quote: t.quote,
              name: t.name,
              handle: t.handle,
              meta: t.meta ?? t.game ?? '',
              rating: typeof t.rating === 'number' ? t.rating : 5,
              accent: t.accent ?? DEFAULT_SLIDES[i % DEFAULT_SLIDES.length]?.accent ?? LIME,
            }))
          );
          setIndex(0);
        }
      } catch {
        /* defaults */
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const len = slides.length;
  const go = useCallback(
    dir => {
      setIndex(i => {
        const n = i + dir;
        if (n < 0) return len - 1;
        if (n >= len) return 0;
        return n;
      });
    },
    [len]
  );

  useEffect(() => {
    if (reduced || len < 2) return;
    const id = setInterval(() => setIndex(i => (i + 1) % len), 6200);
    return () => clearInterval(id);
  }, [len, reduced]);

  const active = useMemo(() => slides[index] ?? slides[0] ?? null, [slides, index]);
  if (!active) return null;

  const accent = active.accent || LIME;

  return (
    <section
      aria-label="Player testimonials"
      className="testimonials-slider-section"
      style={{
        paddingTop: 80,
        paddingBottom: 96,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: '50vw', height: '50vw',
          background: `radial-gradient(circle, ${accent}08, transparent 60%)`,
          filter: 'blur(80px)',
          transition: 'background 0.6s ease',
        }} />
      </div>

      <div className="container" style={{
        position: 'relative', zIndex: 1,
      }}>
        {/* Header */}
        <Reveal as="div" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: `${LIME}10`, border: `1px solid ${LIME}25`,
            marginBottom: 16, boxShadow: `0 0 20px ${LIME}15`,
          }}>
            <span style={{ fontSize: 12 }}>💬</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: LIME, fontWeight: 700,
            }}>
              Player Signal
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            letterSpacing: '-0.04em',
            color: '#ebebeb',
          }}>
            What competitors{' '}
            <span style={{
              background: `linear-gradient(105deg, ${LIME}, #ffffff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 16px ${LIME}30)`,
            }}>
              broadcast
            </span>
          </h2>
        </Reveal>

        {/* Slider Card */}
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={reduced ? false : { opacity: 0, scale: 0.98, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{
                borderRadius: '2rem',
                padding: 'clamp(32px, 5vw, 56px)',
                background: 'rgba(10,10,12,0.6)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: `1px solid rgba(255,255,255,0.08)`,
                minHeight: 260,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)`,
              }}
            >
              {/* Animated top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg, ${accent}, ${accent}40)`,
                transition: 'background 0.5s ease',
                boxShadow: `0 0 20px ${accent}60`,
              }} />

              {/* Large quote mark */}
              <div style={{
                position: 'absolute', top: 20, right: 32,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 160, lineHeight: 1, color: `${accent}08`,
                fontWeight: 800, userSelect: 'none', pointerEvents: 'none',
                transition: 'color 0.5s ease',
              }} aria-hidden>
                "
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
                {Array.from({ length: active.rating }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={accent} aria-hidden style={{ filter: `drop-shadow(0 0 4px ${accent}80)` }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                lineHeight: 1.6,
                color: '#fff',
                fontWeight: 500,
                margin: '0 0 40px',
                letterSpacing: '-0.02em',
                maxWidth: 760,
                position: 'relative', zIndex: 1,
              }}>
                "{active.quote}"
              </blockquote>

              {/* Author */}
              <footer style={{
                display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                justifyContent: 'space-between', gap: 16,
                position: 'relative', zIndex: 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Avatar */}
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: `${accent}15`,
                    border: `2px solid ${accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 800, color: accent,
                    fontFamily: "'Space Grotesk', sans-serif",
                    transition: 'border-color 0.5s',
                    boxShadow: `0 0 16px ${accent}40`,
                  }}>
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>{active.name}</div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11, color: 'rgba(235,235,235,0.4)', marginTop: 4,
                    }}>
                      {active.handle}
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      marginTop: 8, padding: '4px 12px', borderRadius: 100,
                      background: `${accent}10`, border: `1px solid ${accent}30`,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, color: accent,
                      letterSpacing: '0.08em', fontWeight: 700,
                    }}>
                      {active.meta}
                    </div>
                  </div>
                </div>

                {/* Slide counter */}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 48, lineHeight: 1,
                  color: `${accent}15`,
                  fontWeight: 800, userSelect: 'none',
                  transition: 'color 0.5s',
                }} aria-hidden>
                  0{index + 1}
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginTop: 40,
          }}>
            <button
              type="button" data-cursor="hover" aria-label="Previous testimonial"
              onClick={() => go(-1)}
              style={{
                width: 52, height: 52, borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: '#ebebeb', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${accent}40`;
                e.currentTarget.style.background = `${accent}10`;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.color = '#ebebeb';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '0 8px' }}>
              {slides.map((s, i) => (
                <button
                  key={i} type="button" data-cursor="hover"
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                  style={{
                    width: i === index ? 36 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: 'none',
                    cursor: 'pointer',
                    background: i === index ? (s.accent || LIME) : 'rgba(255,255,255,0.15)',
                    boxShadow: i === index ? `0 0 16px ${(s.accent || LIME)}60` : 'none',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              ))}
            </div>

            <button
              type="button" data-cursor="hover" aria-label="Next testimonial"
              onClick={() => go(1)}
              style={{
                width: 52, height: 52, borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: '#ebebeb', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${accent}40`;
                e.currentTarget.style.background = `${accent}10`;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.color = '#ebebeb';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
