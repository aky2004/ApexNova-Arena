import React, { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gameMedia } from '../../shared/data/gameMedia.js';

const LIME = '#ccff00';
const GREEN = '#10b981';

const DEFAULT_TOURNAMENT_COVER =
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=70';

const tournaments = [
  {
    emoji: '🐍',
    name: 'Snake Championship',
    game: 'Snake',
    players: '2,048 / 4,096',
    prize: '$5,000',
    tagLabel: 'LIVE',
    isLive: true,
    gradStart: 'rgba(204,255,0,0.3)',
    gradEnd: 'rgba(204,255,0,0.02)',
    timeLeft: '2h 14m',
    layout: 'featured',
    accent: LIME,
  },
  {
    emoji: '❌',
    name: 'Tic Tac Toe Masters',
    game: 'Tic Tac Toe',
    players: '512 / 512',
    prize: '$2,000',
    tagLabel: 'FINALS',
    isLive: false,
    gradStart: 'rgba(16,185,129,0.25)',
    gradEnd: 'rgba(16,185,129,0.02)',
    timeLeft: '48m',
    layout: 'stack',
    accent: LIME,
  },
  {
    emoji: '♟️',
    name: 'Chess Blitz Open',
    game: 'Chess Blitz',
    players: '2,000 / 2,048',
    prize: '$10,000',
    tagLabel: 'FINALS',
    isLive: false,
    gradStart: 'rgba(56,189,248,0.25)',
    gradEnd: 'rgba(56,189,248,0.02)',
    timeLeft: '30m',
    layout: 'stack',
    accent: LIME,
  },
  {
    emoji: '🧠',
    name: 'Memory Grand Prix',
    game: 'Memory Match',
    players: '800 / 1,024',
    prize: '$4,200',
    tagLabel: 'OPEN',
    isLive: false,
    gradStart: 'rgba(204,255,0,0.25)',
    gradEnd: 'rgba(204,255,0,0.02)',
    timeLeft: 'Starts in 1d',
    layout: 'banner',
    accent: LIME,
    coverImage:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1600&q=75',
  },
];

function fillPct(playersStr) {
  const [a, b] = playersStr.split('/');
  const cur = parseInt(a.replace(/,/g, ''), 10);
  const max = parseInt(b.trim().replace(/,/g, ''), 10);
  if (!max) return 0;
  return Math.min(100, Math.round((cur / max) * 100));
}

const TournamentCard = ({ t, index, coverUrl, reduced }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pct = fillPct(t.players);
  const src = coverUrl || DEFAULT_TOURNAMENT_COVER;

  const tilt = e => {
    const card = cardRef.current;
    if (!card || reduced) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * 5;
    const ry = ((x - cx) / cx) * -5;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };

  const tiltEnd = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  };

  const statusPill = (
    <div style={{
      position: 'absolute', top: 12, right: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      border: `1px solid ${t.isLive ? `${t.accent}60` : 'rgba(255,255,255,0.15)'}`,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '0.16em',
      fontWeight: 800, color: t.isLive ? t.accent : '#ebebeb', textTransform: 'uppercase',
      boxShadow: t.isLive ? `0 0 20px ${t.accent}30` : 'none',
      transition: 'all 0.3s',
    }}>
      {t.isLive && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.accent, animation: 'pulse-dot 2s infinite' }} />
      )}
      {t.tagLabel}
    </div>
  );

  const timePill = (
    <div style={{
      position: 'absolute', bottom: 12, left: 12, padding: '4px 10px', borderRadius: 999,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'JetBrains Mono',monospace",
      fontSize: 9, letterSpacing: '0.1em', color: 'rgba(235,235,235,0.9)',
    }}>
      ⏱ {t.timeLeft}
    </div>
  );

  const MediaPanel = ({ tall, extraClass = '' }) => (
    <div className={`tournament-media ${extraClass}`.trim()} style={{
      position: 'relative', overflow: 'hidden',
      height: tall ? '100%' : 150, minHeight: 150,
      backgroundColor: '#060608',
    }}>
      <img src={src} alt="" loading="lazy" decoding="async" draggable={false} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', filter: hovered ? 'saturate(1.2) contrast(1.1) scale(1.05)' : 'saturate(1.08) contrast(1.06) scale(1)',
        transition: 'transform 10s ease, filter 0.5s ease',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, rgba(6,6,8,0.1) 0%, rgba(6,6,8,0.9) 100%)`,
        pointerEvents: 'none', transition: 'background 0.5s',
      }} />
      {statusPill}
      {timePill}
      <div style={{
        position: 'absolute', inset: 0, border: `2px solid ${hovered ? `${t.accent}40` : 'transparent'}`,
        transition: 'border-color 0.4s', pointerEvents: 'none', borderRadius: 'inherit',
      }} />
    </div>
  );

  const metaBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, position: 'relative', zIndex: 1, height: '100%' }}>
      <div>
        <div className="font-mono-tech" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.05)',
          color: 'rgba(235,235,235,0.6)', marginBottom: 8, fontSize: 9,
        }}>
          {t.game}
        </div>
        <h3 style={{
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800,
          fontSize: '1.25rem', letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff',
        }}>
          {t.emoji} {t.name}
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <div className="font-mono-tech" style={{ color: 'rgba(235,235,235,0.4)', marginBottom: 4, fontSize: 9 }}>Players</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>{t.players}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="font-mono-tech" style={{ color: 'rgba(235,235,235,0.4)', marginBottom: 4, fontSize: 9 }}>Prize Pool</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: '-0.03em', color: t.accent, textShadow: `0 0 20px ${t.accent}40` }}>{t.prize}</div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 12 }}>
        <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 12 }}>
          <div style={{
            height: '100%', width: `${pct}%`, borderRadius: 999,
            background: `linear-gradient(90deg, ${t.accent}, rgba(255,255,255,0.8))`,
            boxShadow: `0 0 16px ${t.accent}50`,
          }} />
        </div>
        <button type="button" data-cursor="hover" style={{
          width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px', borderRadius: 10, fontWeight: 700, fontSize: 13,
          fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer',
          background: hovered ? t.accent : 'rgba(255,255,255,0.05)',
          color: hovered ? '#000' : '#fff',
          border: `1px solid ${hovered ? t.accent : 'rgba(255,255,255,0.1)'}`,
          boxShadow: hovered ? `0 0 24px ${t.accent}40` : 'none',
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}>
          Join tournament
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );

  const innerFeatured = (
    <div className="tournament-card-inner tournament-card-inner--featured" style={{ display: 'grid', height: '100%' }}>
      <MediaPanel tall extraClass="tournament-media--featured" />
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle, ${t.accent}0a, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
        {metaBlock}
      </div>
    </div>
  );

  const innerStack = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <MediaPanel tall={false} extraClass="tournament-media--stack" />
      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 150, height: 150, background: `radial-gradient(circle, ${t.accent}0a, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
        {metaBlock}
      </div>
    </div>
  );

  const innerBanner = (
    <div className="tournament-card-inner tournament-card-inner--banner" style={{ display: 'grid', height: '100%' }}>
      <MediaPanel tall extraClass="tournament-media--banner" />
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle, ${t.accent}0a, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
        {metaBlock}
      </div>
    </div>
  );

  let inner = innerStack;
  if (t.layout === 'featured') inner = innerFeatured;
  if (t.layout === 'banner') inner = innerBanner;

  return (
    <motion.article
      ref={cardRef} onMouseMove={tilt} onMouseLeave={() => { tiltEnd(); setHovered(false); }} onMouseEnter={() => setHovered(true)}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: index * 0.06 }}
      className={`tournament-card-shell tournament-card-shell--${t.layout}`}
      style={{
        borderRadius: '1.5rem', overflow: 'hidden', height: '100%',
        background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? `${t.accent}40` : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${t.accent}15` : (t.isLive ? `0 0 0 1px ${t.accent}20, 0 12px 30px rgba(0,0,0,0.5)` : '0 12px 30px rgba(0,0,0,0.4)'),
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {inner}
    </motion.article>
  );
};

const Tournaments = () => {
  const reduced = useReducedMotion();
  const byGame = useMemo(() => new Map(gameMedia.map(m => [m.title.toLowerCase(), m.image])), []);

  return (
    <section id="tournaments" className="tournaments-bento-section" style={{
      paddingTop: 80, paddingBottom: 100, width: '100%', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background ambient light */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: 400, height: 400, background: `radial-gradient(circle, ${LIME}08, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: 300, height: 300, background: `radial-gradient(circle, ${GREEN}06, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <header style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100,
            background: `${LIME}10`, border: `1px solid ${LIME}25`, marginBottom: 16,
          }}>
            <span style={{ fontSize: 12 }}>🏆</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: LIME, fontWeight: 600 }}>Tournaments</span>
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 700, letterSpacing: '-0.06em', lineHeight: 1.05, color: '#fff',
          }}>
            Active{' '}
            <span style={{ background: `linear-gradient(105deg, ${LIME} 0%, #ffffff 55%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              tournaments
            </span>
          </h2>
          <p style={{ marginTop: 14, color: 'rgba(235,235,235,0.5)', fontSize: 16, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            Jump into live competitions or register for upcoming events. Real prizes. Real glory.
          </p>
        </header>

        <div className="tournament-bento-grid">
          {tournaments.map((t, i) => (
            <TournamentCard key={t.name} t={t} index={i} coverUrl={t.coverImage ?? byGame.get(t.game.toLowerCase())} reduced={reduced} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <button type="button" data-cursor="hover" style={{
            padding: '14px 32px', borderRadius: 100, background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer', transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}40`; e.currentTarget.style.background = `${LIME}08`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
            Browse all tournaments →
          </button>
        </div>
      </div>

      <style>{`
        .tournament-media--stack { border-radius: 1.5rem 1.5rem 0 0; }
        @media (max-width: 1023px) {
          .tournament-card-inner--featured .tournament-media--featured { border-radius: 1.5rem 1.5rem 0 0; height: 180px; }
          .tournament-card-inner--banner .tournament-media--banner { border-radius: 1.5rem 1.5rem 0 0; height: 180px; }
          .tournament-card-inner--featured { grid-template-columns: 1fr; }
          .tournament-card-inner--banner { grid-template-columns: 1fr; }
        }
        .tournament-bento-grid { display: grid; width: 100%; gap: 20px; grid-template-columns: 1fr; }
        @media (min-width: 1024px) {
          .tournament-bento-grid { grid-template-columns: repeat(4, 1fr); align-items: start; }
          .tournament-card-shell--featured { grid-column: span 2; }
          .tournament-card-shell--stack { grid-column: span 1; }
          .tournament-card-shell--banner { grid-column: span 4; }
          .tournament-card-inner--featured { grid-template-columns: 1fr 1.2fr !important; }
          .tournament-card-inner--featured > div:first-child { border-radius: 1.5rem 0 0 1.5rem !important; }
          .tournament-card-inner--featured > div:last-child { border-radius: 0 1.5rem 1.5rem 0; }
          .tournament-card-inner--banner { grid-template-columns: 1fr 2fr !important; }
          .tournament-card-inner--banner > div:first-child { border-radius: 1.5rem 0 0 1.5rem !important; }
          .tournament-card-inner--banner > div:last-child { border-radius: 0 1.5rem 1.5rem 0; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .tournament-bento-grid { grid-template-columns: repeat(2, 1fr); }
          .tournament-card-shell--featured { grid-column: span 2; }
          .tournament-card-shell--banner { grid-column: span 2; }
        }
      `}</style>
    </section>
  );
};

export default Tournaments;
