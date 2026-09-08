'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import ARCamera from '../components/ARCamera';
import StoryTeller from '../components/StoryTeller';
import SafetyDashboard from '../components/SafetyDashboard';
import VaultList from '../components/VaultList';
import RelatableMonuments from '../components/RelatableMonuments';
import HERITAGE_DATA from '../lib/data';

// Dynamically import ThreeCanvas and LeafletMap with SSR disabled for Vercel build safety
const ThreeCanvas = dynamic(() => import('../components/ThreeCanvas'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--terracotta-primary)',
        background: '#FAF6EE',
        borderRadius: '16px',
        fontSize: '0.88rem',
        fontFamily: 'var(--font-serif)',
        fontWeight: 600,
        border: '1.5px solid var(--border-heritage)',
      }}
    >
      Loading 3D Heritage Reconstruction...
    </div>
  ),
});

const LeafletMap = dynamic(() => import('../components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '540px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--terracotta-dark)',
        background: '#FAF6EE',
        borderRadius: '20px',
        fontSize: '1.05rem',
        fontFamily: 'var(--font-serif)',
        fontWeight: 700,
        border: '1.5px solid var(--border-heritage)',
      }}
    >
      Loading Heritage Cartography...
    </div>
  ),
});

export default function Home() {
  const [currentMode, setCurrentMode] = useState('mobile');
  const [currentMobileTab, setCurrentMobileTab] = useState('ar');
  const [selectedArtifactId, setSelectedArtifactId] = useState('hampi-pillar');
  const [isScanning, setIsScanning] = useState(false);

  const selectedArtifact =
    HERITAGE_DATA.scannedArtifacts.find((a) => a.id === selectedArtifactId) ||
    HERITAGE_DATA.scannedArtifacts[0];

  const handleTriggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      alert(
        `✨ Reconstructed 3D Wireframe for ${selectedArtifact.name}!\nHistorical narrative and architectural telemetry unlocked.`
      );
    }, 1200);
  };

  const handleExploreMonument = (monumentId) => {
    const mon = HERITAGE_DATA.mapMonuments.find((m) => m.id === monumentId);
    if (!mon) return;

    alert(
      `🏛️ Monument Selected: ${mon.name}\n\nDynasty: ${mon.dynasty}\n\nHighlights:\n- ${mon.highlights.join(
        '\n- '
      )}\n\nOpening 3D Reconstruction preview in Vault...`
    );

    if (monumentId.includes('hampi')) setSelectedArtifactId('hampi-pillar');
    else if (monumentId.includes('chola') || monumentId.includes('brihadeeswarar'))
      setSelectedArtifactId('chola-inscription');
    else setSelectedArtifactId('ashoka-edict');
  };

  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <Navbar currentMode={currentMode} onSwitchMode={setCurrentMode} />

      {/* VIEW 1: MOBILE APP EXPERIENCE */}
      <main className={`view-container ${currentMode === 'mobile' ? 'active' : ''}`}>
        <div className="mobile-wrapper">
          <div className="phone-frame">
            {/* Phone Notch Header */}
            <div className="phone-notch">
              <div className="notch-camera"></div>
              <div className="notch-speaker"></div>
            </div>

            <div className="phone-content">
              {/* MOBILE TAB 1: WEBXR AR CAMERA & 3D RECONSTRUCTION */}
              {currentMobileTab === 'ar' && (
                <section id="mobile-tab-ar" className="mobile-tab-page active">
                  {/* AR Camera Feed & Reticle */}
                  <ARCamera
                    selectedArtifact={selectedArtifact}
                    onSelectArtifact={setSelectedArtifactId}
                    onTriggerScan={handleTriggerScan}
                    isScanning={isScanning}
                  />

                  {/* 3D Wireframe Reconstruction Card */}
                  <div className="reconstruction-card">
                    <div className="reconstruction-header">
                      <div className="reconstruction-title">
                        <span>✨ Reconstructed: </span>
                        <strong style={{ color: 'var(--terracotta-primary)' }}>{selectedArtifact.name}</strong>
                      </div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--gold-dark)',
                          fontWeight: 700,
                          background: '#FAF6EE',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-heritage)',
                        }}
                      >
                        WebGL 3D
                      </span>
                    </div>

                    <ThreeCanvas meshType={selectedArtifact.meshType} isScanning={isScanning} />
                  </div>

                  {/* Multilingual Voice Narration Story Card */}
                  <StoryTeller artifact={selectedArtifact} />
                </section>
              )}

              {/* MOBILE TAB 2: TOURIST SAFETY & HELPLINES */}
              {currentMobileTab === 'safety' && (
                <section id="mobile-tab-safety" className="mobile-tab-page active">
                  <SafetyDashboard />
                </section>
              )}

              {/* MOBILE TAB 3: SCANNED VAULT */}
              {currentMobileTab === 'vault' && (
                <section id="mobile-tab-vault" className="mobile-tab-page active">
                  <div style={{ padding: '15px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--terracotta-dark)', marginBottom: '12px', fontWeight: 700 }}>
                      📦 Scanned Artifact Vault
                    </h3>
                    <VaultList
                      onSelectArtifact={setSelectedArtifactId}
                      onNavigateToAR={() => setCurrentMobileTab('ar')}
                    />
                  </div>
                </section>
              )}
            </div>

            {/* Phone Bottom Navigation Bar */}
            <nav className="mobile-nav-bar">
              <button
                className={`mobile-tab-btn ${currentMobileTab === 'ar' ? 'active' : ''}`}
                onClick={() => setCurrentMobileTab('ar')}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                AR Camera
              </button>

              <button
                className={`mobile-tab-btn ${currentMobileTab === 'safety' ? 'active' : ''}`}
                onClick={() => setCurrentMobileTab('safety')}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Tourist Safety
              </button>

              <button
                className={`mobile-tab-btn ${currentMobileTab === 'vault' ? 'active' : ''}`}
                onClick={() => setCurrentMobileTab('vault')}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2">
                  <path d="M21 8v13H3V8M1 3h22v5H1z" />
                  <path d="M10 12h4" />
                </svg>
                Scanned Vault
              </button>
            </nav>
          </div>
        </div>
      </main>

      {/* VIEW 2: DESKTOP COMMAND CENTER */}
      <main className={`view-container ${currentMode === 'desktop' ? 'active' : ''}`}>
        <div className="desktop-layout">
          <div className="desktop-grid">
            {/* Left Section: Interactive Leaflet Map */}
            <LeafletMap onSelectMonument={handleExploreMonument} />

            {/* Right Section: Sidebar (Vault & Relatable Recommendations) */}
            <aside className="desktop-sidebar">
              {/* Scanned Vault Panel */}
              <div className="sidebar-card">
                <div className="sidebar-title">
                  <span>🏛️ Scanned Artifacts Vault</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--terracotta-primary)', fontWeight: 700 }}>
                    {HERITAGE_DATA.scannedArtifacts.length} Active Scans
                  </span>
                </div>
                <VaultList
                  onSelectArtifact={(id) => {
                    setSelectedArtifactId(id);
                    setCurrentMode('mobile');
                    setCurrentMobileTab('ar');
                  }}
                />
              </div>

              {/* Relatable Monuments Engine */}
              <div className="sidebar-card">
                <div className="sidebar-title">
                  <span>✨ Relatable Monuments</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', fontWeight: 700 }}>
                    AI Recommendation
                  </span>
                </div>
                <RelatableMonuments
                  currentArtifactId={selectedArtifactId}
                  onExploreMonument={handleExploreMonument}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
