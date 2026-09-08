'use client';

import React from 'react';

export default function Navbar({ currentMode, onSwitchMode }) {
  return (
    <header className="top-navbar">
      <div className="brand-logo">
        <div className="brand-icon">🏛️</div>
        <div>
          <h1 className="brand-title">HERITAGE XR</h1>
          <div className="brand-subtitle">AR Monument Reconstruction & Safety</div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="mode-switcher">
        <button
          className={`mode-btn ${currentMode === 'mobile' ? 'active' : ''}`}
          id="btn-mode-mobile"
          onClick={() => onSwitchMode('mobile')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
          </svg>
          <span>Mobile AR</span>
        </button>
        <button
          className={`mode-btn ${currentMode === 'desktop' ? 'active' : ''}`}
          id="btn-mode-desktop"
          onClick={() => onSwitchMode('desktop')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span>Desktop Map</span>
        </button>
      </div>

      {/* Live System Status Badge (Round 1 Hackathon title removed) */}
      <div className="badge-status">
        <div className="pulse-indicator"></div>
        <span>LIVE WEBXR ACTIVE</span>
      </div>
    </header>
  );
}
