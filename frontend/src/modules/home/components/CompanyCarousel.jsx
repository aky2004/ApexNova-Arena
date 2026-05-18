import React, { useEffect, useMemo, useState } from 'react';
import { Reveal } from '../../shared/components/Motion.jsx';

const LIME = '#ccff00';
const GREEN = '#10b981';

const DEFAULT_PARTNERS = [
  { id: '1', name: 'HyperForge', tag: 'HF', accent: LIME },
  { id: '2', name: 'SteelVector', tag: 'SV', accent: '#38bdf8' },
  { id: '3', name: 'NeonGrid', tag: 'NG', accent: GREEN },
  { id: '4', name: 'PulseNine', tag: 'P9', accent: '#a78bfa' },
  { id: '5', name: 'CircuitBay', tag: 'CB', accent: LIME },
  { id: '6', name: 'VoidStack', tag: 'VS', accent: '#fb7185' },
  { id: '7', name: 'ArcRaid', tag: 'AR', accent: '#38bdf8' },
  { id: '8', name: 'SignalDrop', tag: 'SD', accent: GREEN },
];

const PartnerChip = ({ name, tag, accent = LIME }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="partner-chip"
      data-cursor="hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 24px',
        borderRadius: 16,
        border: `1px solid ${hovered ? `${accent}40` : 'rgba(255,255,255,0.07)'}`,
        background: hovered
          ? `linear-gradient(135deg, ${accent}08, rgba(255,255,255,0.04))`
          : 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 12px 28px ${accent}15, 0 0 0 1px ${accent}10`
          : '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <span style={{
        width: 42, height: 42, borderRadius: 12,
        background: hovered ? accent : `${accent}15`,
        border: `1px solid ${accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12, fontWeight: 800, letterSpacing: '0.08em',
        color: hovered ? '#000' : accent,
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: hovered ? `0 0 16px ${accent}30` : 'none',
      }}>
        {tag}
      </span>
      <div>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: 15, letterSpacing: '-0.03em',
          color: hovered ? '#fff' : 'rgba(235,235,235,0.7)',
          whiteSpace: 'nowrap',
          transition: 'color 0.3s',
        }}>
          {name}
        </span>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: hovered ? `${accent}90` : 'rgba(255,255,255,0.2)',
          marginTop: 2, transition: 'color 0.3s',
        }}>
          Partner Studio
        </div>
      </div>
    </div>
  );
};

const CompanyCarousel = () => {
  const [partners, setPartners] = useState(DEFAULT_PARTNERS);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/data/partners.json', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setPartners(
            data.map((p, i) => ({
              id: String(p.id ?? i),
              name: p.name,
              tag: p.tag ?? p.name?.slice(0, 2)?.toUpperCase() ?? '??',
              accent: p.accent ?? DEFAULT_PARTNERS[i % DEFAULT_PARTNERS.length].accent,
            }))
          );
        }
      } catch {
        /* keep defaults */
      }
    };
    load();
  }, []);

  const loop = useMemo(() => [...partners, ...partners], [partners]);

  return (
    <section
      aria-label="Partner studios"
      className="company-carousel-section"
      style={{
        paddingTop: 20,
        paddingBottom: 36,
        paddingLeft: 0,
        paddingRight: 0,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="container" style={{
        marginBottom: 24,
        paddingLeft: 'clamp(14px,2.2vw,28px)',
        paddingRight: 'clamp(14px,2.2vw,28px)',
      }}>
        <Reveal as="div" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 18px', borderRadius: 100,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            marginBottom: 8,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: GREEN, opacity: 0.8,
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(235,235,235,0.45)', fontWeight: 600,
            }}>
              Trusted by squads at
            </span>
          </div>
        </Reveal>
      </div>

      <div
        className="partner-marquee-mask"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="partner-marquee-track">
          {loop.map((p, i) => (
            <PartnerChip key={`${p.id}-${i}`} name={p.name} tag={p.tag} accent={p.accent} />
          ))}
        </div>
      </div>

      <style>{`
        .partner-marquee-mask {
          width: 100%;
          overflow: hidden;
        }
        .partner-marquee-track {
          display: flex;
          width: max-content;
          gap: 14px;
          padding: 8px 0 12px;
          animation: partner-marquee 48s linear infinite;
        }
        .partner-marquee-mask:hover .partner-marquee-track {
          animation-play-state: paused;
        }
        @keyframes partner-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-marquee-track { animation: none !important; flex-wrap: wrap; justify-content: center; width: 100% !important; max-width: 900px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
};

export default CompanyCarousel;
