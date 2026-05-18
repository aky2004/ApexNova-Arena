import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from '../../shared/components/ParticleField.jsx';
import { Reveal } from '../../shared/components/Motion.jsx';

const LIME = '#ccff00';
const GREEN = '#10b981';

const INITIAL_LEADERBOARD = [
  { id: '1', name: 'NeonBlade', score: 98240, game: 'Snake', initials: 'NB', bg: '#14532d', change: '+2', pos: true },
  { id: '2', name: 'PixelKing', score: 96120, game: 'Memory Match', initials: 'PK', bg: '#0f172a', change: '+1', pos: true },
  { id: '3', name: 'SwiftAce', score: 95780, game: 'Reaction Test', initials: 'SA', bg: '#134e4a', change: '-1', pos: false },
  { id: '4', name: 'GridMaster', score: 94430, game: 'Tic Tac Toe', initials: 'GM', bg: '#422006', change: '+3', pos: true },
];

const rankMedal = rank => {
  if (rank === 1) return { bg: LIME, color: '#000', shadow: `0 0 20px ${LIME}40` };
  if (rank === 2) return { bg: 'rgba(255,255,255,0.12)', color: '#ebebeb', shadow: 'none' };
  if (rank === 3) return { bg: 'rgba(204,255,0,0.2)', color: LIME, shadow: 'none' };
  return { bg: 'rgba(255,255,255,0.08)', color: 'rgba(235,235,235,0.5)', shadow: 'none' };
};

const formatScore = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Hero = () => {
  const gridRef = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [lastUpdatedId, setLastUpdatedId] = useState(null);

  // Parallax grid effect
  useEffect(() => {
    const handleMouseMove = e => {
      if (!gridRef.current) return;
      const xPct = (e.clientX / window.innerWidth - 0.5) * 15;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 15;
      gridRef.current.style.transform = `translate(${xPct * 0.35}px, ${yPct * 0.35}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Live leaderboard simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(prev => {
        const next = [...prev];
        // Pick a random player to score (favor 2nd, 3rd, 4th to allow overtaking)
        const randIdx = Math.floor(Math.random() * 3) + 1; 
        const target = next[randIdx];
        
        // Add random score burst
        const burst = Math.floor(Math.random() * 800) + 200;
        target.score += burst;
        target.change = `+${Math.floor(burst / 100)}`;
        target.pos = true;

        setLastUpdatedId(target.id);
        
        // Sort descending
        next.sort((a, b) => b.score - a.score);
        return next;
      });

      setTimeout(() => setLastUpdatedId(null), 1000);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 120,
        paddingBottom: 48,
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse 70% 55% at 50% -5%, ${LIME}12 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      <div
        ref={gridRef}
        className="hero-grid"
        style={{
          position: 'absolute', inset: '-12%', zIndex: 0,
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <ParticleField />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-grid-layout">
          {/* Left Column */}
          <div style={{ gridColumn: 'span 12 / span 12', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="hero-left-col">
            <Reveal
              as="div"
              className="font-mono-tech"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '8px 16px', marginBottom: 28, borderRadius: 100,
                border: `1px solid ${LIME}30`,
                background: `${LIME}08`,
                color: 'rgba(235,235,235,0.7)',
                boxShadow: `0 0 24px ${LIME}15`,
              }}
            >
              <span style={{ color: LIME, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: LIME, animation: 'pulse-dot 2s infinite' }} />
                SYSTEM LIVE
              </span>
              · apexnova engine v2.4
            </Reveal>

            <Reveal
              as="h1" delay={0.05}
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 800, color: '#fff', marginBottom: 28,
                letterSpacing: '-0.04em', lineHeight: 1.05,
                textShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
            >
              Compete.<br />
              <span style={{
                background: `linear-gradient(105deg, ${LIME} 0%, #ffffff 70%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', display: 'inline-block',
                filter: `drop-shadow(0 0 20px ${LIME}30)`,
              }}>
                Dominate.
              </span><br />
              Rise to Legend.
            </Reveal>

            <Reveal as="p" delay={0.1} style={{
              fontSize: 18, color: 'rgba(235,235,235,0.6)',
              lineHeight: 1.7, marginBottom: 40, maxWidth: 540, fontWeight: 400,
            }}>
              The ultimate competitive gaming platform. Master Snake, Tic Tac Toe, Reaction Test, and Memory Match. Claim your rank. Win real prizes.
            </Reveal>

            <Reveal as="div" delay={0.14} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}>
              <button type="button" data-cursor="hover" className="btn-primary" style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '16px 36px', fontSize: 16, fontWeight: 700,
                boxShadow: `0 0 30px ${LIME}40`, border: `1px solid ${LIME}`,
                background: `linear-gradient(90deg, ${LIME}, #b3e600)`, color: '#000',
              }}>
                Start Playing
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button type="button" data-cursor="hover" style={{
                padding: '16px 36px', fontSize: 16, fontWeight: 700, borderRadius: 12,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', backdropFilter: 'blur(10px)', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                View Leaderboard
              </button>
            </Reveal>

            <Reveal as="div" delay={0.18}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
                padding: '14px 24px', borderRadius: 20,
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              }}>
                <div style={{ display: 'flex' }}>
                  {['#14532d', '#0f172a', '#134e4a', '#422006'].map((c, i) => (
                    <div key={i} style={{
                      width: 34, height: 34, borderRadius: '50%', background: c,
                      border: '2px solid #060608', marginLeft: i ? -10 : 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: '#ebebeb',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}>
                      {['M', 'A', 'D', 'L'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}>200,000+ players</div>
                  <div style={{ fontSize: 11, color: 'rgba(235,235,235,0.5)', marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>currently active</div>
                </div>
                <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={LIME} style={{ filter: `drop-shadow(0 0 4px ${LIME}80)` }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span style={{ fontSize: 13, color: 'rgba(235,235,235,0.7)', marginLeft: 8, fontWeight: 700 }}>4.9/5</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column - Live Leaderboard */}
          <Reveal as="div" delay={0.12} style={{ gridColumn: 'span 12 / span 12', position: 'relative' }} className="hero-right-col">
            <div style={{
              position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 480, height: 480, background: `radial-gradient(circle, ${LIME}18, transparent 65%)`,
              filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0,
            }} />

            {/* Dark Obsidian Leaderboard Card */}
            <div style={{
              position: 'relative', zIndex: 1, borderRadius: '2rem', padding: 32,
              background: 'rgba(10,10,12,0.6)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              border: `1px solid rgba(255,255,255,0.08)`,
              boxShadow: `0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.05)`,
            }}>
              {/* Inner glow line */}
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: `linear-gradient(90deg, transparent, ${LIME}60, transparent)`,
              }} />

              {/* Floating stat pill 1 */}
              <div className="glass-card float-anim" style={{
                position: 'absolute', top: -16, left: 24, padding: '12px 18px', zIndex: 2,
                background: 'rgba(6,6,8,0.95)', border: `1px solid ${LIME}50`,
                borderRadius: 14, boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 24px ${LIME}20`,
              }}>
                <div className="font-mono-tech" style={{ color: 'rgba(235,235,235,0.5)', marginBottom: 4, fontSize: 10 }}>
                  sys_latency
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 22, color: LIME, textShadow: `0 0 16px ${LIME}60` }}>
                  12ms
                </div>
              </div>

              {/* Floating stat pill 2 */}
              <div className="glass-card float-anim-delay" style={{
                position: 'absolute', bottom: 40, right: -24, padding: '12px 18px', zIndex: 2,
                background: 'rgba(6,6,8,0.95)', border: `1px solid rgba(255,255,255,0.15)`,
                borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
              }}>
                <div className="font-mono-tech" style={{ color: 'rgba(235,235,235,0.5)', marginBottom: 4, fontSize: 10 }}>
                  matchmaking
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, animation: 'pulse-dot 2s infinite', boxShadow: `0 0 12px ${GREEN}` }} />
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, color: '#fff' }}>
                    active
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                  <div>
                    <div className="font-mono-tech" style={{ color: LIME, marginBottom: 4, fontSize: 11, opacity: 0.8 }}>
                      // global_standings
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 22, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.04em', color: '#fff' }}>
                      Live Leaderboard
                    </div>
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
                    background: `${LIME}12`, border: `1px solid ${LIME}30`, borderRadius: 100,
                    fontSize: 10, color: LIME, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.14em', textTransform: 'uppercase', boxShadow: `0 0 20px ${LIME}20`,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: LIME, animation: 'pulse-dot 1s infinite' }} />
                    Live
                  </div>
                </div>

                {/* Animated Leaderboard Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
                  <AnimatePresence>
                    {leaderboard.map((player, idx) => {
                      const rank = idx + 1;
                      const medal = rankMedal(rank);
                      const isHovered = hoveredRow === player.id;
                      const isUpdated = lastUpdatedId === player.id;

                      return (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          key={player.id} 
                          style={{
                            display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px',
                            borderRadius: 16,
                            background: isUpdated ? `${LIME}20` : (isHovered ? `${LIME}08` : (rank === 1 ? `${LIME}06` : 'rgba(255,255,255,0.02)')),
                            border: `1px solid`,
                            borderColor: isUpdated ? LIME : (isHovered ? `${LIME}30` : (rank === 1 ? `${LIME}25` : 'rgba(255,255,255,0.06)')),
                            transform: isHovered || isUpdated ? 'scale(1.02)' : 'scale(1)',
                            zIndex: isUpdated ? 10 : 1,
                            boxShadow: isUpdated ? `0 0 30px ${LIME}40` : 'none',
                          }}
                          onMouseEnter={() => setHoveredRow(player.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <div style={{
                            width: 30, height: 30, borderRadius: '50%', background: medal.bg, color: medal.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13, fontWeight: 800, flexShrink: 0, boxShadow: medal.shadow,
                          }}>
                            {rank}
                          </div>
                          <div style={{
                            width: 38, height: 38, borderRadius: 12, background: player.bg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13, fontWeight: 800, color: '#ebebeb', flexShrink: 0,
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}>
                            {player.initials}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontWeight: 800, fontSize: 15, color: '#fff',
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>
                              {player.name}
                            </div>
                            <div style={{
                              fontSize: 11, color: 'rgba(235,235,235,0.4)', marginTop: 2,
                              fontFamily: "'JetBrains Mono', monospace",
                            }}>
                              {player.game}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <motion.div 
                              key={player.score}
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              style={{ 
                                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, 
                                fontSize: 17, color: isUpdated ? LIME : '#fff',
                                textShadow: isUpdated ? `0 0 16px ${LIME}` : 'none'
                              }}
                            >
                              {formatScore(player.score)}
                            </motion.div>
                            <div style={{
                              fontSize: 12, marginTop: 2, color: player.pos ? GREEN : '#f87171',
                              fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                            }}>
                              {isUpdated ? (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>{player.change}</motion.span>
                              ) : player.change}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <button type="button" data-cursor="hover" style={{
                  width: '100%', marginTop: 20, padding: '16px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(235,235,235,0.8)', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${LIME}50`;
                  e.currentTarget.style.background = `${LIME}08`;
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = `0 0 24px ${LIME}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = 'rgba(235,235,235,0.8)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  Access Full Leaderboard →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (min-width: 1025px) {
          .hero-left-col { grid-column: span 7 / span 7 !important; }
          .hero-right-col { grid-column: span 5 / span 5 !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
