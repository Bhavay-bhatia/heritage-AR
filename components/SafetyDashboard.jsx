'use client';

import React from 'react';
import HERITAGE_DATA from '@/lib/data';

export default function SafetyDashboard() {
  const triggerSOS = () => {
    alert(
      '🚨 SOS PANIC ALERT ACTIVATED!\n\nYour GPS coordinates [15.3350, 76.4600] and safety profile have been broadcasted to the nearest Tourist Police Patrol & Heritage Control Room.'
    );
  };

  return (
    <div className="safety-dashboard">
      {/* Safe Route Card */}
      <div className="safety-card">
        <div className="safety-header">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--gold-light)' }}>
            🗺️ Safest Route Navigation
          </h3>
          <div className="safety-score-pill">96% SAFE CORRIDOR</div>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Hampi Station ➔ Vitthala Temple Complex
        </p>

        <div className="safety-metrics-grid">
          <div className="metric-item">
            <div className="metric-label">Smart Lighting</div>
            <div className="metric-val">94% Covered</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Patrol Frequency</div>
            <div className="metric-val">15 mins</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Safe Checkpoints</div>
            <div className="metric-val">3 Active Posts</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Crowd Density</div>
            <div className="metric-val">Optimal</div>
          </div>
        </div>
      </div>

      {/* Emergency Helpline Directory */}
      <div className="safety-card">
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: '12px' }}>
          🚨 Emergency & Tourist Helplines
        </h3>
        <div className="emergency-grid">
          {HERITAGE_DATA.safetyData.emergencyHelplines.map((c, i) => (
            <a key={i} href={`tel:${c.number.split('/')[0].trim()}`} className="emergency-btn">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#FFF' }}>{c.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                📞 {c.number}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.desc}</div>
            </a>
          ))}
        </div>

        <button className="sos-trigger-btn" onClick={triggerSOS}>
          ⚠️ INSTANT SOS PANIC ALERT
        </button>
      </div>
    </div>
  );
}
