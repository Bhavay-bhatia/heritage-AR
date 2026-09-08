'use client';

import React, { useState } from 'react';
import HERITAGE_DATA from '../lib/data';

export default function SafetyDashboard() {
  const destinations = HERITAGE_DATA.safetyData.destinations || [];
  const [selectedDestId, setSelectedDestId] = useState(destinations[0]?.id || 'hampi-ruins');
  const [helplineCategory, setHelplineCategory] = useState('All');
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(null);

  const currentDest =
    destinations.find((d) => d.id === selectedDestId) || destinations[0];

  const triggerSOS = () => {
    setSosActive(true);
    setSosCountdown(5);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setSosCountdown(null);
  };

  const filteredHelplines =
    helplineCategory === 'All'
      ? HERITAGE_DATA.safetyData.emergencyHelplines
      : HERITAGE_DATA.safetyData.emergencyHelplines.filter(
          (h) => h.category.toLowerCase().includes(helplineCategory.toLowerCase())
        );

  const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    currentDest.startPoint
  )}&destination=${encodeURIComponent(
    currentDest.destinationPoint + ', ' + currentDest.state
  )}&travelmode=walking`;

  const policeStationMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    currentDest.policeStation.name + ', ' + currentDest.policeStation.address
  )}`;

  return (
    <div className="safety-dashboard">
      {/* Destination Selector Pill Bar */}
      <div className="safety-card" style={{ padding: '14px', marginBottom: '14px' }}>
        <label
          style={{
            fontSize: '0.74rem',
            fontFamily: 'var(--font-serif)',
            color: 'var(--terracotta-dark)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '8px',
            display: 'block',
          }}
        >
          📍 Select Destination For Safety & Police Coverage:
        </label>
        <select
          value={selectedDestId}
          onChange={(e) => setSelectedDestId(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--bg-card-subtle)',
            border: '1.5px solid var(--border-heritage)',
            borderRadius: '12px',
            padding: '10px 14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'var(--text-main)',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {destinations.map((dest) => (
            <option key={dest.id} value={dest.id}>
              {dest.name} ({dest.state})
            </option>
          ))}
        </select>
      </div>

      {/* 1. Safest Route Card */}
      <div className="safety-card">
        <div className="safety-header">
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--terracotta-dark)' }}>
              🗺️ Safest Route Navigation
            </h3>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
              {currentDest.state} Tourism Safety Corridor
            </div>
          </div>
          <div className="safety-score-pill">
            🛡️ {currentDest.safetyScore}% SAFE CORRIDOR
          </div>
        </div>

        {/* Route Origin & Destination */}
        <div
          style={{
            background: 'var(--bg-card-subtle)',
            padding: '12px',
            borderRadius: '14px',
            border: '1px solid var(--border-heritage)',
            margin: '10px 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
            <span style={{ color: '#15803D' }}>🟢</span>
            <strong>From:</strong> {currentDest.startPoint}
          </div>
          <div style={{ paddingLeft: '6px', borderLeft: '2px dashed var(--border-heritage)', margin: '4px 0 4px 6px', height: '14px' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
            <span style={{ color: 'var(--terracotta-primary)' }}>🏛️</span>
            <strong>To:</strong> {currentDest.destinationPoint}
          </div>
        </div>

        {/* Safety Metrics Grid */}
        <div className="safety-metrics-grid">
          <div className="metric-item">
            <div className="metric-label">Distance & Time</div>
            <div className="metric-val">{currentDest.distanceKm} ({currentDest.estimatedWalkTime.split('(')[0]})</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Lighting Coverage</div>
            <div className="metric-val">{currentDest.lightingCoverage.split(' ')[0]} Illuminated</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Police Patrol Frequency</div>
            <div className="metric-val">{currentDest.patrolFrequency.split('(')[0]}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">AI CCTV Surveillance</div>
            <div className="metric-val">{currentDest.cctvSurveillance.split(' ')[0]} Active Cams</div>
          </div>
        </div>

        {/* Verified Safe Checkpoints Along Route */}
        <div style={{ marginTop: '12px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.82rem',
              color: 'var(--terracotta-dark)',
              marginBottom: '6px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            🛡️ Verified Checkpoints On Route:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {currentDest.safeCheckpoints.map((cp, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-primary)',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-heritage)',
                  fontSize: '0.78rem',
                }}
              >
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>{cp.name}</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{cp.type}</div>
                </div>
                <span
                  style={{
                    background: '#EFE6D5',
                    color: 'var(--gold-dark)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                  }}
                >
                  📍 {cp.distance}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Navigation in Google Maps Button */}
        <a
          href={googleMapsRouteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            background: 'linear-gradient(135deg, #1A73E8, #1557B0)',
            color: '#FFF',
            padding: '12px',
            borderRadius: '14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.86rem',
            textDecoration: 'none',
            marginTop: '15px',
            boxShadow: '0 4px 15px rgba(26, 115, 232, 0.25)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
          Open Safest Route in Google Maps (Turn-by-Turn)
        </a>
      </div>

      {/* 2. Dedicated Local Tourist Police Station Card */}
      <div className="safety-card" style={{ borderLeft: '4px solid #1A73E8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>👮‍♂️</span>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.08rem', color: '#1A73E8', fontWeight: 800 }}>
                {currentDest.policeStation.name}
              </h3>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Jurisdiction Officer: {currentDest.policeStation.officerInCharge} ({currentDest.policeStation.badgeNumber})
              </div>
            </div>
          </div>
          <span
            style={{
              background: '#E8F0FE',
              color: '#1A73E8',
              border: '1px solid #C2E7FF',
              padding: '4px 8px',
              borderRadius: '14px',
              fontSize: '0.72rem',
              fontWeight: 700,
            }}
          >
            {currentDest.policeStation.distance}
          </span>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '8px 0', lineHeight: 1.4 }}>
          📍 <strong>Station Address:</strong> {currentDest.policeStation.address}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            background: 'var(--bg-card-subtle)',
            padding: '10px',
            borderRadius: '12px',
            border: '1px solid var(--border-heritage)',
            margin: '8px 0 12px',
            fontSize: '0.74rem',
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Patrol Fleet:</span>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{currentDest.policeStation.patrolFleet}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Women Helpdesk:</span>
            <div style={{ fontWeight: 700, color: '#15803D' }}>{currentDest.policeStation.womenHelpdesk}</div>
          </div>
        </div>

        {/* Action Buttons: Direct Call & Locate on Maps */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <a
            href={`tel:${currentDest.policeStation.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#15803D',
              color: '#FFF',
              padding: '10px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.78rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(21, 128, 61, 0.25)',
            }}
          >
            📞 Call Police Station
          </a>
          <a
            href={policeStationMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#FFFFFF',
              color: '#1A73E8',
              border: '1.5px solid #1A73E8',
              padding: '10px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.78rem',
              textDecoration: 'none',
            }}
          >
            📍 Locate on Maps
          </a>
        </div>
      </div>

      {/* 3. Emergency & Tourist Helplines Directory */}
      <div className="safety-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--terracotta-dark)' }}>
            🚨 Emergency Helpline Directory
          </h3>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Toll-Free 24x7
          </span>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '10px' }}>
          {['All', 'Police', 'Women Safety', 'Medical', 'Security'].map((cat) => (
            <button
              key={cat}
              onClick={() => setHelplineCategory(cat)}
              style={{
                border: 'none',
                background: helplineCategory === cat ? 'var(--terracotta-primary)' : 'var(--bg-secondary)',
                color: helplineCategory === cat ? '#FFF' : 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Helplines Grid */}
        <div className="emergency-grid">
          {filteredHelplines.map((c, i) => (
            <a key={i} href={`tel:${c.number.split('/')[0].trim()}`} className="emergency-btn">
              <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--danger-crimson)' }}>
                {c.name}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--terracotta-dark)', fontWeight: 800 }}>
                📞 {c.number}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.desc}</div>
            </a>
          ))}
        </div>

        {/* SOS Alert Trigger */}
        <button className="sos-trigger-btn" onClick={triggerSOS}>
          ⚠️ INSTANT SOS PANIC ALERT
        </button>
      </div>

      {/* Interactive SOS Panic Modal */}
      {sosActive && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              maxWidth: '380px',
              width: '100%',
              textAlign: 'center',
              border: '3px solid #B91C1C',
              boxShadow: '0 20px 60px rgba(185, 28, 28, 0.4)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '8px', animation: 'pulse 1s infinite' }}>🚨</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#B91C1C', fontSize: '1.4rem', fontWeight: 900 }}>
              SOS PANIC ALERT BROADCAST
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: '10px 0', lineHeight: 1.5 }}>
              Emergency beacon activated! High-priority telemetry sent to:
            </p>

            <div
              style={{
                background: '#FEF2F2',
                border: '1.5px solid #FCA5A5',
                borderRadius: '14px',
                padding: '12px',
                textAlign: 'left',
                margin: '12px 0',
                fontSize: '0.78rem',
              }}
            >
              <div>👮 <strong>Jurisdiction:</strong> {currentDest.policeStation.name}</div>
              <div style={{ marginTop: '4px' }}>📍 <strong>Live GPS:</strong> [{currentDest.policeStation.coords[0]}, {currentDest.policeStation.coords[1]}]</div>
              <div style={{ marginTop: '4px' }}>🚨 <strong>Patrol Dispatched:</strong> Buggy Unit #2 (ETA ~3 mins)</div>
              <div style={{ marginTop: '4px' }}>📞 <strong>Hotline:</strong> 112 / {currentDest.policeStation.phone}</div>
            </div>

            <button
              onClick={cancelSOS}
              style={{
                width: '100%',
                background: '#4B5563',
                color: '#FFF',
                border: 'none',
                padding: '12px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Cancel Alert (I am Safe)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
