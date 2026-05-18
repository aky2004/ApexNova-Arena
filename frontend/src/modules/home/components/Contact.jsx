import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../../shared/components/Motion.jsx';

const LIME = '#ccff00';
const GREEN = '#10b981';

const contactItems = [
  { icon: '📧', label: 'Email', value: 'hello@apexnova.gg', color: LIME },
  { icon: '💬', label: 'Discord', value: 'discord.gg/apexnova', color: '#7c3aed' },
  { icon: '🐦', label: 'Twitter', value: '@ApexNovaGG', color: '#38bdf8' },
  { icon: '📍', label: 'HQ', value: 'San Francisco, CA', color: GREEN },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const inputStyle = (name) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '14px 18px',
    background: focusedField === name ? `${LIME}04` : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focusedField === name ? `${LIME}45` : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 14, color: '#fff', fontSize: 14,
    fontFamily: "'Space Grotesk', sans-serif", outline: 'none',
    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
    boxShadow: focusedField === name ? `0 0 0 3px ${LIME}12` : 'none',
  });

  return (
    <section id="contact" className="section" style={{
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', right: '-5%',
          width: '40vw', height: '40vw',
          background: `radial-gradient(circle, ${LIME}08, transparent 60%)`,
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-5%',
          width: '30vw', height: '30vw',
          background: `radial-gradient(circle, rgba(124,58,237,0.06), transparent 60%)`,
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 60, alignItems: 'start',
        }} className="contact-grid">

          {/* Left info */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 100,
              background: `${LIME}12`, border: `1px solid ${LIME}25`,
              marginBottom: 24,
            }}>
              <span style={{ fontSize: 12 }}>✉️</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: LIME, fontWeight: 600,
              }}>
                Contact Us
              </span>
            </div>

            <Reveal as="h2" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              fontWeight: 700, letterSpacing: '-0.06em', marginBottom: 16,
            }}>
              {"Let's "}
              <span className="gradient-text">Connect</span>
            </Reveal>
            <Reveal as="p" delay={0.08} style={{
              color: 'rgba(255,255,255,0.5)', fontSize: 16,
              lineHeight: 1.75, marginBottom: 48, maxWidth: 420,
            }}>
              Have a question, partnership idea, or feedback? Our team responds within 24 hours.
              We'd love to hear from you.
            </Reveal>

            {/* Contact cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {contactItems.map((item, idx) => (
                <Reveal key={item.label} as="div" delay={0.1 + idx * 0.04}>
                  <div
                    data-cursor="hover"
                    style={{
                      display: 'flex', gap: 14, alignItems: 'center',
                      padding: '18px 16px', borderRadius: 16,
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${item.color}30`;
                      e.currentTarget.style.background = `${item.color}06`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'rgba(235,235,235,0.35)', marginBottom: 4, fontWeight: 600,
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontSize: 13, fontWeight: 600, color: item.color,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right form */}
          <Reveal as="div" delay={0.08} style={{ height: '100%' }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{
                    borderRadius: 24, padding: '80px 40px',
                    background: 'rgba(255,255,255,0.025)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${LIME}30`,
                    textAlign: 'center',
                    boxShadow: `0 0 60px -15px ${LIME}20, inset 0 0 20px ${LIME}05`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    height: '100%', minHeight: 480,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    style={{
                      width: 80, height: 80, borderRadius: '50%',
                      background: `${LIME}12`, border: `2px solid ${LIME}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 28, boxShadow: `0 0 40px ${LIME}40`,
                    }}
                  >
                    <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <motion.polyline
                        points="20 6 9 17 4 12"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 28, fontWeight: 800, marginBottom: 16,
                      color: LIME, textShadow: `0 0 20px ${LIME}50`,
                    }}
                  >
                    Transmission Secured
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.7, maxWidth: 320 }}
                  >
                    Your message has been beamed to ApexNova HQ. We'll deploy a response to your inbox shortly.
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="btn-secondary"
                    style={{ marginTop: 36, padding: '12px 28px', borderRadius: 999, borderColor: `${LIME}40` }}
                    data-cursor="hover"
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  >
                    Deploy Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  style={{
                    borderRadius: 24, padding: '40px',
                    background: 'rgba(255,255,255,0.025)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    minHeight: 480,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Subtle inner glow */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${LIME}60, ${GREEN}40, transparent)`,
                    borderRadius: '24px 24px 0 0',
                  }} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{
                        display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)',
                        marginBottom: 8, fontWeight: 600,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        Full Name
                      </label>
                      <input
                        type="text" name="name" placeholder="Your name"
                        value={form.name} onChange={handleChange} required
                        style={inputStyle('name')}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)',
                        marginBottom: 8, fontWeight: 600,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        Email Address
                      </label>
                      <input
                        type="email" name="email" placeholder="you@example.com"
                        value={form.email} onChange={handleChange} required
                        style={inputStyle('email')}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{
                      display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)',
                      marginBottom: 8, fontWeight: 600,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      Subject
                    </label>
                    <input
                      type="text" name="subject" placeholder="What's this about?"
                      value={form.subject} onChange={handleChange} required
                      style={inputStyle('subject')}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={{
                      display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)',
                      marginBottom: 8, fontWeight: 600,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      Message
                    </label>
                    <textarea
                      name="message" rows={5} placeholder="Tell us more..."
                      value={form.message} onChange={handleChange} required
                      style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <button
                    type="submit" className="btn-primary" data-cursor="hover"
                    disabled={loading}
                    style={{
                      width: '100%', fontSize: 16, padding: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{
                          width: 16, height: 16,
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: 'white', borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'rotateGlow 0.7s linear infinite',
                        }} />
                        Sending...
                      </>
                    ) : '📨 Send Message'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-grid > div:first-child > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
