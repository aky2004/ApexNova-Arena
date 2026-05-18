import React, { useState } from 'react';

const LIME = '#ccff00';
const GREEN = '#10b981';

const navLinks = [
  { label: 'Tournaments', href: '/tournaments' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Profile', href: '/profile' },
  { label: 'About', href: '/about' },
];

const policyLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

const socials = [
  { id: 'x', label: 'Twitter / X', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  )},
  { id: 'discord', label: 'Discord', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 01.079.009c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/></svg>
  )},
  { id: 'yt', label: 'YouTube', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
];

const FooterLink = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      data-cursor="hover"
      style={{
        color: hovered ? '#fff' : 'rgba(235,235,235,0.45)',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "'Space Grotesk', sans-serif",
        transition: 'color 0.25s cubic-bezier(0.4,0,0.2,1)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: LIME, flexShrink: 0 }} />
      )}
      {children}
    </a>
  );
};

const Footer = () => {
  const [emailFocused, setEmailFocused] = useState(false);

  return (
    <footer
      style={{
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Ambient Background Glows ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: '-30%', left: '-10%', width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(204,255,0,0.06), transparent 60%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', top: '-20%', right: '-5%', width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(16,185,129,0.05), transparent 60%)',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* ── Separator line with gradient ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.3), rgba(16,185,129,0.2), transparent)' }} />

      {/* ── Newsletter CTA Banner ── */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          marginTop: 60,
          marginBottom: 56,
          padding: '36px 40px',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: LIME, marginBottom: 10, fontWeight: 600,
            }}>
              ✦ Stay in the loop
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700,
              color: '#fff', letterSpacing: '-0.03em',
            }}>
              Get tournament updates & patch notes
            </div>
          </div>
          <div style={{
            display: 'flex', gap: 10, flex: 1, maxWidth: 420, minWidth: 280,
          }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="email"
                placeholder="your@email.com"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: `1px solid ${emailFocused ? `${LIME}50` : 'rgba(255,255,255,0.1)'}`,
                  background: 'rgba(0,0,0,0.4)',
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: "'Space Grotesk', sans-serif",
                  outline: 'none',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                  boxShadow: emailFocused ? `0 0 0 3px ${LIME}12` : 'none',
                }}
              />
            </div>
            <button
              data-cursor="hover"
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                border: 'none',
                background: LIME,
                color: '#000',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: `0 4px 20px ${LIME}30`,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = `0 6px 28px ${LIME}50`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 20px ${LIME}30`;
              }}
            >
              Subscribe →
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: 48 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: 48,
            alignItems: 'start',
          }}
          className="footer-columns"
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${LIME}, ${GREEN})`,
                display: 'grid', placeItems: 'center',
                boxShadow: `0 4px 16px ${LIME}30`,
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#000' }}>A</span>
              </div>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 20,
                letterSpacing: '-0.04em', color: '#fff',
              }}>
                Apex<span style={{ color: LIME }}>Nova</span>
              </span>
            </div>
            <p style={{
              color: 'rgba(235,235,235,0.4)', fontSize: 14, lineHeight: 1.75,
              fontFamily: "'Space Grotesk', sans-serif", maxWidth: 280, marginBottom: 24,
            }}>
              The ultimate competitive gaming arena. Compete in real-time, climb the ranks, and prove you're the best.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(s => (
                <a
                  key={s.id}
                  href="#"
                  data-cursor="hover"
                  aria-label={s.label}
                  title={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(235,235,235,0.45)',
                    textDecoration: 'none',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${LIME}45`;
                    e.currentTarget.style.color = LIME;
                    e.currentTarget.style.background = `${LIME}10`;
                    e.currentTarget.style.boxShadow = `0 0 16px ${LIME}15`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(235,235,235,0.45)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(235,235,235,0.3)', marginBottom: 20, fontWeight: 600,
            }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
              {navLinks.map(link => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(235,235,235,0.3)', marginBottom: 20, fontWeight: 600,
            }}>
              Legal
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
              {policyLinks.map(link => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* System / Status */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(235,235,235,0.3)', marginBottom: 20, fontWeight: 600,
            }}>
              System
            </div>

            {/* Server Status */}
            <div style={{
              padding: '14px 16px', borderRadius: 12,
              background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: GREEN,
                  animation: 'pulse-dot 2s infinite',
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: GREEN,
                  letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600,
                }}>
                  All Systems Online
                </span>
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(235,235,235,0.25)',
                letterSpacing: '0.08em',
              }}>
                Latency: 12ms · Uptime: 99.9%
              </div>
            </div>

            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(235,235,235,0.2)',
              letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 2,
            }}>
              build 2046.04 · sf / remote
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{
          position: 'relative', zIndex: 1,
          padding: '20px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(235,235,235,0.25)', margin: 0,
          }}>
            © {new Date().getFullYear()} ApexNova Arena. All rights reserved.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: 'rgba(235,235,235,0.2)', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: LIME, opacity: 0.6 }} />
            Crafted with precision
          </div>
        </div>
      </div>

      {/* ── Responsive Styles ── */}
      <style>{`
        @media (max-width: 900px) {
          .footer-columns {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-columns {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
