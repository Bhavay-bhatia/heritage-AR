'use client';

import React from 'react';
import HERITAGE_DATA from '@/lib/data';

export default function VaultList({ onSelectArtifact, onNavigateToAR }) {
  const handleClick = (id) => {
    if (onSelectArtifact) onSelectArtifact(id);
    if (onNavigateToAR) onNavigateToAR();
  };

  return (
    <div className="vault-list">
      {HERITAGE_DATA.scannedArtifacts.map((art) => (
        <div key={art.id} className="vault-item" onClick={() => handleClick(art.id)}>
          <img src={art.thumbnail} className="vault-img" alt={art.name} />
          <div className="vault-info">
            <h5>{art.name}</h5>
            <p>📍 {art.location}</p>
            <p style={{ color: 'var(--cyan-wireframe)', fontSize: '0.7rem' }}>{art.condition}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
