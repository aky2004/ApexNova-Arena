import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../../shared/components/Motion.jsx';

const LIME = '#ccff00';

const features = [
  {
    id: 'leaderboards',
    icon: '🏆',
    tag: 'Live Rankings',
    title: 'Real-time Leaderboards',
    desc: 'Watch rankings shift live as scores come in — no refresh needed, every position update is instant.',
    accent: LIME,
    layout: 'large', // Spans 2 columns
  },
  {
    id: 'performance',
    icon: '🚀',
    tag: 'Speed',
    title: 'Zero Latency Engine',
    desc: 'Optimised payloads deliver a lag-free experience.',
    accent: '#10b981',
    layout: 'small', // Spans 1 column
  },
  {
    id: 'fairplay',
    icon: '🛡️',
    tag: 'Integrity',
    title: 'Fair Play System',
    desc: 'Server-side validation keeps every match honest.',
    accent: '#f59e0b',
    layout: 'small', // Spans 1 column
  },
  {
    id: 'games',
    icon: '🎮',
    tag: 'Game Library',
    title: 'Curated Classics',
    desc: 'Snake, Tic Tac Toe, Memory Match, Chess Blitz.',
    accent: '#a78bfa',
    layout: 'small',
  },
  {
    id: 'global',
    icon: '🌍',
    tag: 'Worldwide',
    title: 'Global Competition',
    desc: 'Climb the planetary leaderboard against elite players.',
    accent: '#38bdf8',
    layout: 'small',
  },
  {
    id: 'tracking',
    icon: '📊',
    tag: 'Analytics',
    title: 'Advanced Performance Tracking',
    desc: 'Personal stats dashboards show score history, win-rates, and progress curves so you can see exactly how you are improving over time.',
    accent: '#fb7185',
    layout: 'large', // Spans 2 columns
  },
];

function FeatureCard({ feature, index }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={feature.id}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      className={`feature-card feature-card--${feature.layout}`}
      style={{
        position: 'relative', borderRadius: 24,
        background: hovered ? `linear-gradient(135deg, rgba(10,10,12,0.9), rgba(10,10,12,0.7))` : 'rgba(10,10,12,0.5)',
        border: `1px solid ${hovered ? `${feature.accent}50` : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        padding: feature.layout === 'large' ? '40px' : '32px 24px',
        display: 'flex', flexDirection: 'column', gap: 16,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 48px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.1), 0 0 0 1px ${feature.accent}20` : '0 10px 30px rgba(0,0,0,0.4)',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orb */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 180, height: 180,
        background: `radial-gradient(circle, ${feature.accent}1a, transparent 70%)`,
        pointerEvents: 'none', transition: 'opacity 0.4s',
        opacity: hovered ? 1 : 0.3,
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
        background: `linear-gradient(90deg, transparent, ${feature.accent}80, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />

      {/* Icon + Tag row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: feature.layout === 'large' ? 12 : 8 }}>
        <div style={{
          width: feature.layout === 'large' ? 64 : 48, 
          height: feature.layout === 'large' ? 64 : 48, 
          borderRadius: 16,
          background: hovered ? feature.accent : `${feature.accent}15`,
          border: `1px solid ${feature.accent}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: feature.layout === 'large' ? 30 : 22, flexShrink: 0,
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: hovered ? `0 0 30px ${feature.accent}50` : 'none',
          color: hovered ? '#000' : feature.accent,
        }}>
          {feature.icon}
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: 100,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: hovered ? feature.accent : 'rgba(235,235,235,0.4)',
          transition: 'all 0.4s',
        }}>
          {feature.tag}
        </div>
      </div>

      <div style={{ flexGrow: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, 
          fontSize: feature.layout === 'large' ? 24 : 18,
          letterSpacing: '-0.03em', color: '#fff', margin: '0 0 12px 0',
        }}>
          {feature.title}
        </h3>
        <p style={{
          fontSize: feature.layout === 'large' ? 16 : 14, 
          lineHeight: 1.6, color: 'rgba(235,235,235,0.5)', margin: 0,
        }}>
          {feature.desc}
        </p>
      </div>

      {/* Decorative large faint icon bottom right */}
      {feature.layout === 'large' && (
        <div style={{
          position: 'absolute', bottom: -20, right: -10, fontSize: 140,
          opacity: hovered ? 0.08 : 0.02, pointerEvents: 'none',
          color: feature.accent, transition: 'opacity 0.4s',
        }}>
          {feature.icon}
        </div>
      )}
    </motion.div>
  );
}

const Features = () => {
  return (
    <section id="features" className="section" style={{ background: 'transparent', position: 'relative', paddingTop: 80, paddingBottom: 100 }}>
      {/* Ambient background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '20%', left: '10%', width: 400, height: 400,
          background: `radial-gradient(circle, ${LIME}08, transparent 60%)`, filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500,
          background: `radial-gradient(circle, #a78bfa08, transparent 60%)`, filter: 'blur(100px)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Reveal as="div" style={{ display: 'inline-block' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
              borderRadius: 100, background: `${LIME}10`, border: `1px solid ${LIME}25`,
              marginBottom: 18, boxShadow: `0 0 20px ${LIME}15`,
            }}>
              <span style={{ fontSize: 12 }}>✨</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: LIME, fontWeight: 700,
              }}>
                Platform Features
              </span>
            </div>
          </Reveal>

          <Reveal as="h2" delay={0.04} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1.05, color: '#fff', marginBottom: 18,
          }}>
            Engineered to{' '}
            <span style={{
              background: `linear-gradient(135deg, ${LIME} 0%, #ffffff 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: `drop-shadow(0 0 16px ${LIME}30)`,
            }}>
              dominate.
            </span>
          </Reveal>

          <Reveal as="p" delay={0.08} style={{
            color: 'rgba(235,235,235,0.5)', fontSize: 18, lineHeight: 1.8, maxWidth: 640, margin: '0 auto',
          }}>
            Every line of code is optimized to keep matches fair, fast, and ruthlessly competitive. No delays, no excuses.
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div className="features-bento-grid">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom badge strip */}
        <Reveal as="div" delay={0.1} style={{
          marginTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
        }}>
          {[
            { label: 'Cloud Synchronized', icon: '☁️' },
            { label: 'Anti-Cheat Protected', icon: '🛡️' },
            { label: '99.9% Uptime', icon: '⚡' },
          ].map(b => (
            <div key={b.label} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px', borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.8)',
              fontSize: 13, color: 'rgba(235,235,235,0.6)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
            }}>
              <span style={{ fontSize: 16 }}>{b.icon}</span>
              {b.label}
            </div>
          ))}
        </Reveal>
      </div>

      <style>{`
        .features-bento-grid { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: 24px; 
          auto-rows: minmax(240px, auto);
        }
        .feature-card--large { grid-column: span 2; min-height: 280px; }
        .feature-card--small { grid-column: span 1; min-height: 240px; }
        
        @media (max-width: 1024px) { 
          .features-bento-grid { grid-template-columns: repeat(2, 1fr); } 
        }
        @media (max-width: 640px) { 
          .features-bento-grid { grid-template-columns: 1fr; } 
          .feature-card--large, .feature-card--small { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
};

export default Features;
