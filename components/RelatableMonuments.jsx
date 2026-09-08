'use client';

import React from 'react';
import HERITAGE_DATA from '@/lib/data';

export default function RelatableMonuments({ currentArtifactId, onExploreMonument }) {
  const currentArtifact =
    HERITAGE_DATA.scannedArtifacts.find((a) => a.id === currentArtifactId) ||
    HERITAGE_DATA.scannedArtifacts[0];

  const relatableIds = currentArtifact.relatableIds || ['brihadeeswarar', 'konark-sun'];
  const relatables = HERITAGE_DATA.mapMonuments.filter((m) => relatableIds.includes(m.id));

  const handleImageError = (e) => {
    const currentSrc = e.target.src;
    if (currentSrc.includes('/images/')) {
      e.target.onerror = null;
      e.target.src = currentSrc.replace('/images/', 'images/');
    }
  };

  return (
    <div className="relatable-grid">
      {relatables.map((rel) => (
        <div
          key={rel.id}
          className="relatable-card"
          onClick={() => onExploreMonument && onExploreMonument(rel.id)}
        >
          <img
            src={rel.image}
            alt={rel.name}
            onError={handleImageError}
          />
          <div className="relatable-content">
            <h6>{rel.name}</h6>
            <p>🏛️ {rel.dynasty}</p>
            <p style={{ color: 'var(--gold-light)' }}>⭐ {rel.rating} | UNESCO Site</p>
          </div>
        </div>
      ))}
    </div>
  );
}
