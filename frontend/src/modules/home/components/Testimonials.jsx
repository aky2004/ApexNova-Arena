import React, { useState } from 'react';
import { Reveal } from '../../shared/components/Motion.jsx';

const LIME = '#ccff00';
const GREEN = '#10b981';
const BLUE = '#38bdf8';
const PURPLE = '#a78bfa';

const steps = [
  {
    n: '01',
    title: 'Signal-first onboarding',
    body: 'Players enter through latency-checked queues so every first match is representative of live conditions.',
    icon: '📡',
    accent: LIME,
    code: 'queue.init({ latency: "auto", region: "nearest" })',
  },
  {
    n: '02',
    title: 'Bracket integrity',
    body: 'Seeding, rematches, and audit trails are generated as structured events — readable by humans and machines.',
    icon: '🛡️',
    accent: GREEN,
    code: 'bracket.generate({ seed: "elo", audit: true })',
  },
  {
    n: '03',
    title: 'Payout rails',
    body: 'Wins propagate through verified wallets with instant confirmations and dispute windows built in.',
    icon: '⚡',
    accent: BLUE,
    code: 'payout.dispatch({ method: "instant", verify: true })',
  },
];

const pipelineNodes = [
  { label: 'Player Queue', status: 'active' },
  { label: 'Latency Gate', status: 'active' },
  { label: 'ELO Matching', status: 'active' },
  { label: 'Bracket Gen', status: 'active' },
  { label: 'Live Match', status: 'live' },
];

const metrics = [
  { label: 'Avg. Latency', value: '12', unit: 'ms', accent: LIME, icon: '⏱️' },
  { label: 'Uptime (30d)', value: '99.97', unit: '%', accent: GREEN, icon: '🟢' },
  { label: 'Payout Speed', value: '<5', unit: 'min', accent: BLUE, icon: '💸' },
  { label: 'Anti-Cheat', value: '100', unit: '%', accent: PURPLE, icon: '🛡️' },
];

const StepCard = ({ step, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      style={{
        padding: '28px 24px',
        borderRadius: 20,
        background: hovered ? `${step.accent}08` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? `${step.accent}30` : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateX(6px)' : 'translateX(0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent side bar */}
      <div style={{
        position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3,
        background: step.accent,
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity 0.4s',
        borderRadius: 2,
      }} />

      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
        {/* Number badge */}
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: hovered ? step.accent : `${step.accent}12`,
          color: hovered ? '#000' : step.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
          fontWeight: 800, letterSpacing: '0.05em',
          transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: hovered ? `0 0 24px ${step.accent}40` : 'none',
        }}>
          {step.n}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 17, letterSpacing: '-0.03em', color: '#fff', margin: 0,
            }}>
              {step.title}
            </h3>
            <span style={{ fontSize: 15 }}>{step.icon}</span>
          </div>
          <p style={{
            fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)',
            margin: '0 0 12px 0',
          }}>
            {step.body}
          </p>
          {/* Code snippet */}
          <div style={{
            padding: '8px 14px', borderRadius: 10,
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.06)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, color: `${step.accent}90`,
            letterSpacing: '0.02em',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>→ </span>{step.code}
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => (
  <section
    className="section methodology-section"
    style={{
      background: '#060608',
      color: '#fff',
      borderRadius: '2.5rem',
      maxWidth: 1240,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 8,
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.06)',
    }}
  >
    {/* Animated grid background */}
    <div className="methodology-grid-bg" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.25,
      backgroundImage: `linear-gradient(rgba(204,255,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(204,255,0,0.03) 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
    }} />

    {/* Floating ambient orbs */}
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div className="methodology-orb-1" style={{
        position: 'absolute', top: '10%', right: '15%',
        width: 300, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, ${LIME}10, transparent 60%)`,
        filter: 'blur(60px)',
      }} />
      <div className="methodology-orb-2" style={{
        position: 'absolute', bottom: '15%', left: '5%',
        width: 250, height: 250, borderRadius: '50%',
        background: `radial-gradient(circle, ${BLUE}08, transparent 60%)`,
        filter: 'blur(50px)',
      }} />
      <div className="methodology-orb-3" style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 200, height: 200, borderRadius: '50%',
        background: `radial-gradient(circle, ${PURPLE}06, transparent 60%)`,
        filter: 'blur(40px)',
      }} />
    </div>

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 100,
          background: `${LIME}10`, border: `1px solid ${LIME}25`,
          marginBottom: 20,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: LIME, animation: 'pulse-dot 2s infinite',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: LIME, fontWeight: 600,
          }}>
            How It Works
          </span>
        </div>

        <Reveal as="h2" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(30px, 3.5vw, 44px)',
          fontWeight: 700, letterSpacing: '-0.06em',
          lineHeight: 1.1, marginBottom: 16, color: '#fff',
        }}>
          Precision pipelines,{' '}
          <span style={{
            background: `linear-gradient(105deg, ${LIME}, ${GREEN})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            not promises.
          </span>
        </Reveal>

        <Reveal as="p" delay={0.04} style={{
          fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)',
          maxWidth: 520, margin: '0 auto',
        }}>
          Every system is built with competitive integrity at its core — from sub-millisecond queue routing to tamper-proof bracket generation.
        </Reveal>
      </div>

      {/* Live Pipeline Visualization */}
      <Reveal as="div" delay={0.06} style={{ marginBottom: 48 }}>
        <div style={{
          padding: '24px 28px', borderRadius: 20,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: `${LIME}80`, marginBottom: 18, fontWeight: 600,
          }}>
            ✦ Live Pipeline
          </div>

          <div className="pipeline-flow" style={{
            display: 'flex', alignItems: 'center', gap: 0,
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {pipelineNodes.map((node, i) => (
              <React.Fragment key={node.label}>
                <div style={{
                  padding: '10px 18px', borderRadius: 12,
                  background: node.status === 'live'
                    ? `${LIME}18`
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${node.status === 'live' ? `${LIME}40` : 'rgba(255,255,255,0.08)'}`,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, fontWeight: 600,
                  color: node.status === 'live' ? LIME : 'rgba(255,255,255,0.55)',
                  display: 'flex', alignItems: 'center', gap: 8,
                  whiteSpace: 'nowrap',
                  position: 'relative',
                }}>
                  {node.status === 'live' && (
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: LIME, animation: 'pulse-dot 2s infinite',
                    }} />
                  )}
                  {node.status === 'active' && (
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: GREEN, opacity: 0.8,
                    }} />
                  )}
                  {node.label}
                </div>
                {i < pipelineNodes.length - 1 && (
                  <div className="pipeline-connector" style={{
                    width: 36, height: 2, position: 'relative',
                    margin: '0 4px',
                  }}>
                    <div className={`pipeline-pulse pipeline-pulse-${i}`} style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(90deg, transparent, ${LIME}60, transparent)`,
                      borderRadius: 2,
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: 2,
                    }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Metrics + Steps Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 32, alignItems: 'start',
      }} className="methodology-grid">

        {/* Left: Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {steps.map((s, i) => (
            <Reveal as="div" key={s.n} delay={0.08 + i * 0.06}>
              <StepCard step={s} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Right: Metrics + Architecture */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Metric Cards */}
          <Reveal as="div" delay={0.1}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            }}>
              {metrics.map(m => (
                <div key={m.label} data-cursor="hover" style={{
                  padding: '22px 18px', borderRadius: 18,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                  position: 'relative', overflow: 'hidden',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${m.accent}30`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  {/* Subtle accent glow */}
                  <div style={{
                    position: 'absolute', bottom: '-30%', left: '20%', right: '20%', height: '60%',
                    background: `radial-gradient(ellipse, ${m.accent}10, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                  <div style={{ fontSize: 20, marginBottom: 8, position: 'relative' }}>{m.icon}</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em',
                    color: m.accent, position: 'relative',
                    textShadow: `0 0 20px ${m.accent}30`,
                  }}>
                    {m.value}<span style={{ fontSize: 14, opacity: 0.7, marginLeft: 2 }}>{m.unit}</span>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                    marginTop: 6, position: 'relative',
                  }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Terminal-style architecture block */}
          <Reveal as="div" delay={0.15}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {/* Terminal header */}
              <div style={{
                padding: '10px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em', marginLeft: 8,
                }}>
                  apexnova-engine v2.4
                </span>
              </div>

              {/* Terminal body */}
              <div style={{ padding: '18px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: 2 }}>
                <div><span style={{ color: GREEN }}>✓</span> <span style={{ color: 'rgba(255,255,255,0.3)' }}>queue</span> <span style={{ color: 'rgba(255,255,255,0.6)' }}>initialized</span> <span style={{ color: `${LIME}60` }}>12ms</span></div>
                <div><span style={{ color: GREEN }}>✓</span> <span style={{ color: 'rgba(255,255,255,0.3)' }}>elo_match</span> <span style={{ color: 'rgba(255,255,255,0.6)' }}>paired</span> <span style={{ color: `${LIME}60` }}>8ms</span></div>
                <div><span style={{ color: GREEN }}>✓</span> <span style={{ color: 'rgba(255,255,255,0.3)' }}>bracket</span> <span style={{ color: 'rgba(255,255,255,0.6)' }}>generated</span> <span style={{ color: `${LIME}60` }}>3ms</span></div>
                <div><span style={{ color: GREEN }}>✓</span> <span style={{ color: 'rgba(255,255,255,0.3)' }}>anti_cheat</span> <span style={{ color: 'rgba(255,255,255,0.6)' }}>armed</span> <span style={{ color: `${LIME}60` }}>1ms</span></div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ color: LIME }}>▸</span> <span style={{ color: LIME }}>match.start()</span>
                  <span className="terminal-cursor" style={{
                    display: 'inline-block', width: 8, height: 14,
                    background: LIME, marginLeft: 4, verticalAlign: 'middle',
                    opacity: 0.8,
                  }} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Quote card */}
          <Reveal as="div" delay={0.18}>
            <div style={{
              padding: '22px 24px', borderRadius: 18,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              position: 'relative',
            }}>
              {/* Decorative quote */}
              <div style={{
                position: 'absolute', top: 8, right: 16,
                fontSize: 60, lineHeight: 1, color: `${LIME}08`,
                fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
                userSelect: 'none', pointerEvents: 'none',
              }}>"</div>
              <p style={{
                fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
                margin: '0 0 16px 0', fontStyle: 'italic',
                position: 'relative', zIndex: 1,
              }}>
                "We ship obsidian-grade reliability with lime-bright feedback loops. If it doesn't feel industrial, it doesn't ship."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${LIME}, ${GREEN})`,
                  color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  AN
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>ApexNova Labs</div>
                  <div style={{
                    fontSize: 10, color: 'rgba(255,255,255,0.3)',
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.08em',
                  }}>
                    product · competitive
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .methodology-grid { grid-template-columns: 1fr !important; }
      }
      .methodology-orb-1 {
        animation: methodOrb1 12s ease-in-out infinite;
      }
      .methodology-orb-2 {
        animation: methodOrb2 16s ease-in-out infinite;
      }
      .methodology-orb-3 {
        animation: methodOrb3 20s ease-in-out infinite;
      }
      @keyframes methodOrb1 {
        0%, 100% { transform: translate(0, 0); opacity: 0.6; }
        50% { transform: translate(-20px, 15px); opacity: 1; }
      }
      @keyframes methodOrb2 {
        0%, 100% { transform: translate(0, 0); opacity: 0.5; }
        50% { transform: translate(15px, -20px); opacity: 0.8; }
      }
      @keyframes methodOrb3 {
        0%, 100% { transform: translate(0, 0); opacity: 0.4; }
        50% { transform: translate(-10px, 10px); opacity: 0.7; }
      }
      .pipeline-pulse-0 { animation: pipeFlow 2.5s ease-in-out infinite 0s; }
      .pipeline-pulse-1 { animation: pipeFlow 2.5s ease-in-out infinite 0.4s; }
      .pipeline-pulse-2 { animation: pipeFlow 2.5s ease-in-out infinite 0.8s; }
      .pipeline-pulse-3 { animation: pipeFlow 2.5s ease-in-out infinite 1.2s; }
      @keyframes pipeFlow {
        0%, 100% { opacity: 0.15; }
        50% { opacity: 1; }
      }
      .terminal-cursor {
        animation: termBlink 1s step-end infinite;
      }
      @keyframes termBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      @media (max-width: 700px) {
        .pipeline-flow { gap: 8px !important; }
        .pipeline-connector { display: none !important; }
      }
    `}</style>
  </section>
);

export default Testimonials;
