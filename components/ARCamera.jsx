'use client';

import React, { useEffect, useRef, useState } from 'react';
import HERITAGE_DATA from '../lib/data';

export default function ARCamera({ selectedArtifact, onSelectArtifact, onTriggerScan, isScanning }) {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [scanStatus, setScanStatus] = useState('ALIGN TARGET INSIDE RETICLE');

  useEffect(() => {
    let streamInstance = null;

    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          streamInstance = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setHasCamera(true);
          }
        })
        .catch(() => {
          setHasCamera(false);
        });
    } else {
      setHasCamera(false);
    }

    return () => {
      if (streamInstance) {
        streamInstance.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isScanning) {
      setScanStatus('AI EXTRACTING 3D WIREFRAME MESH...');
      const timer = setTimeout(() => {
        setScanStatus('WEBXR 3D MESH RECONSTRUCTED');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  return (
    <>
      <div className="ar-viewport">
        {/* Real camera video feed */}
        <video
          ref={videoRef}
          className="camera-feed"
          autoPlay
          playsInline
          muted
          style={{ display: hasCamera ? 'block' : 'none' }}
        />

        {/* Fallback Viewport if Camera Not Available - Warm Sandstone Motif */}
        {!hasCamera && (
          <div className="camera-fallback">
            <div style={{ fontSize: '3.2rem', marginBottom: '10px' }}>🏛️</div>
            <div style={{ color: 'var(--terracotta-dark)', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
              WEBXR HERITAGE SCANNER
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>
              Target: {selectedArtifact.name}
            </div>
          </div>
        )}

        {/* AR HUD Overlay */}
        <div className="ar-hud-overlay">
          <div className="ar-hud-header">
            <div className="ar-status-badge">
              <span className="status-dot"></span>
              <span id="ar-status-text" style={{ color: isScanning ? 'var(--terracotta-primary)' : 'var(--text-main)' }}>
                {scanStatus}
              </span>
            </div>
            <span
              style={{
                background: '#FFF',
                border: '1.5px solid var(--gold-primary)',
                color: 'var(--gold-dark)',
                padding: '0.3rem 0.75rem',
                borderRadius: '16px',
                fontSize: '0.68rem',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              3D WIREFRAME MESH
            </span>
          </div>

          {/* AR Target Reticle */}
          <div className="ar-reticle">
            <div className="reticle-corner corner-tl"></div>
            <div className="reticle-corner corner-tr"></div>
            <div className="reticle-corner corner-bl"></div>
            <div className="reticle-corner corner-br"></div>
            <div className="laser-scanner"></div>
          </div>

          {/* HUD Footer Information */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              padding: '10px 14px',
              borderRadius: '16px',
              border: '1.5px solid var(--border-heritage)',
              boxShadow: '0 4px 15px rgba(80, 50, 15, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--terracotta-dark)', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                {selectedArtifact.dynasty}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--saffron-accent)', fontWeight: 700 }}>
                {selectedArtifact.condition}
              </span>
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              📍 {selectedArtifact.location}
            </div>
          </div>
        </div>
      </div>

      {/* Target Selector */}
      <div className="sample-selector">
        <label>Select Monument Artifact To Scan:</label>
        <div className="sample-buttons">
          {HERITAGE_DATA.scannedArtifacts.map((art) => (
            <button
              key={art.id}
              className={`sample-btn ${selectedArtifact.id === art.id ? 'active' : ''}`}
              onClick={() => onSelectArtifact(art.id)}
            >
              {art.name.split(' ')[0]} {art.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Trigger AR Scan Button */}
      <button className="btn-scan-ar" onClick={onTriggerScan} disabled={isScanning}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {isScanning ? 'SCANNING MESH IN PROGRESS...' : 'INITIATE HERITAGE 3D SCAN'}
      </button>
    </>
  );
}
