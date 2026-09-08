'use client';

import React, { useEffect, useRef, useState } from 'react';
import HERITAGE_DATA from '../lib/data';

const GOOGLE_MAP_LAYERS = {
  streets: {
    name: 'Google Streets',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  },
  terrain: {
    name: 'Google Terrain',
    url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  },
  satellite: {
    name: 'Google Satellite',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps Satellite',
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  },
};

export default function LeafletMap({ onSelectMonument }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const markersRef = useRef([]);
  const [activeLayer, setActiveLayer] = useState('streets');
  const [searchQuery, setSearchQuery] = useState('');
  const [monuments, setMonuments] = useState(HERITAGE_DATA.mapMonuments);

  // Switch Google Maps Layer
  const setGoogleMapLayer = async (layerKey) => {
    if (!mapInstanceRef.current) return;
    const L = (await import('leaflet')).default;
    setActiveLayer(layerKey);

    if (currentTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    }

    const layerConfig = GOOGLE_MAP_LAYERS[layerKey] || GOOGLE_MAP_LAYERS.streets;
    const newTileLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
      subdomains: layerConfig.subdomains,
    }).addTo(mapInstanceRef.current);

    currentTileLayerRef.current = newTileLayer;
  };

  // Initialize Map
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      const L = (await import('leaflet')).default;

      if (isMounted && mapContainerRef.current && !mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [17.5, 78.5],
          zoom: 5,
          zoomControl: false, // Re-add in top-right for Google Maps look
        });

        // Add Google-style zoom control to top-right
        L.control.zoom({ position: 'topright' }).addTo(map);

        // Google Maps Standard Streets Layer
        const initialLayerConfig = GOOGLE_MAP_LAYERS.streets;
        const googleTileLayer = L.tileLayer(initialLayerConfig.url, {
          attribution: initialLayerConfig.attribution,
          maxZoom: initialLayerConfig.maxZoom,
          subdomains: initialLayerConfig.subdomains,
        }).addTo(map);

        currentTileLayerRef.current = googleTileLayer;
        mapInstanceRef.current = map;
        renderPins(L, map, HERITAGE_DATA.mapMonuments);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Function to render monument markers
  const renderPins = (L, map, list) => {
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    list.forEach((mon) => {
      // Google-styled Heritage Pin with shadow
      const customIcon = L.divIcon({
        className: 'custom-google-pin',
        html: `
          <div style="
            position: relative;
            width: 38px; 
            height: 46px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
          ">
            <div style="
              width: 36px;
              height: 36px;
              background: linear-gradient(135deg, #EA4335, #C5221F);
              border: 2px solid #FFFFFF;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="
                transform: rotate(45deg);
                font-size: 15px;
                color: #FFFFFF;
              ">🏛️</span>
            </div>
            <div style="
              width: 8px;
              height: 4px;
              background: rgba(0,0,0,0.3);
              border-radius: 50%;
              margin-top: 2px;
            "></div>
          </div>
        `,
        iconSize: [38, 46],
        iconAnchor: [19, 44],
        popupAnchor: [0, -42],
      });

      const marker = L.marker(mon.coordinates, { icon: customIcon }).addTo(map);

      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        mon.name + ' ' + mon.location
      )}`;

      const popupDiv = document.createElement('div');
      popupDiv.style.padding = '8px';
      popupDiv.style.maxWidth = '260px';
      popupDiv.innerHTML = `
        <img src="${mon.image}" onerror="this.onerror=null; if(this.src.indexOf('/images/')!==-1){this.src=this.src.replace('/images/','images/');}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin-bottom: 8px; border: 1px solid #E5D9C3;" alt="${mon.name}">
        <h4 style="font-family: 'Cinzel', serif; color: #9C3A16; font-size: 1.05rem; font-weight: 700; margin-bottom: 4px;">${mon.name}</h4>
        <p style="font-size: 0.76rem; color: #736352; font-weight: 600; margin-bottom: 6px;">📍 ${mon.location} | ${mon.dynasty}</p>
        <p style="font-size: 0.8rem; line-height: 1.45; color: #241C15; margin-bottom: 10px;">${mon.summary}</p>
      `;

      // Explore 3D Button
      const exploreBtn = document.createElement('button');
      exploreBtn.innerText = '🔍 Reconstruct 3D Mesh';
      exploreBtn.style.width = '100%';
      exploreBtn.style.background = 'linear-gradient(135deg, #9C3A16, #B44A1B)';
      exploreBtn.style.color = '#FFF';
      exploreBtn.style.border = 'none';
      exploreBtn.style.padding = '7px';
      exploreBtn.style.borderRadius = '8px';
      exploreBtn.style.fontWeight = '700';
      exploreBtn.style.fontSize = '0.78rem';
      exploreBtn.style.cursor = 'pointer';
      exploreBtn.style.fontFamily = "'Cinzel', serif";
      exploreBtn.style.marginBottom = '6px';
      exploreBtn.onclick = () => {
        if (onSelectMonument) onSelectMonument(mon.id);
      };
      popupDiv.appendChild(exploreBtn);

      // Open in Google Maps link
      const gmapsLink = document.createElement('a');
      gmapsLink.href = googleMapsUrl;
      gmapsLink.target = '_blank';
      gmapsLink.rel = 'noopener noreferrer';
      gmapsLink.style.display = 'flex';
      gmapsLink.style.alignItems = 'center';
      gmapsLink.style.justifyContent = 'center';
      gmapsLink.style.gap = '6px';
      gmapsLink.style.width = '100%';
      gmapsLink.style.background = '#FFFFFF';
      gmapsLink.style.color = '#1A73E8';
      gmapsLink.style.border = '1.5px solid #DADCE0';
      gmapsLink.style.padding = '6px';
      gmapsLink.style.borderRadius = '8px';
      gmapsLink.style.fontWeight = '600';
      gmapsLink.style.fontSize = '0.76rem';
      gmapsLink.style.textDecoration = 'none';
      gmapsLink.style.cursor = 'pointer';
      gmapsLink.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" stroke-width="2.5">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        Open in Google Maps
      `;
      popupDiv.appendChild(gmapsLink);

      marker.bindPopup(popupDiv);
      markersRef.current.push(marker);
    });
  };

  // Filter markers on search input change
  const handleSearch = async (e) => {
    const q = e.target.value.toLowerCase().trim();
    setSearchQuery(e.target.value);

    const filtered = HERITAGE_DATA.mapMonuments.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.dynasty.toLowerCase().includes(q)
    );
    setMonuments(filtered);

    if (mapInstanceRef.current) {
      const L = (await import('leaflet')).default;
      renderPins(L, mapInstanceRef.current, filtered);
    }
  };

  return (
    <div className="map-card-container">
      {/* Header with Search and Google Map Type Switcher */}
      <div className="map-header">
        <div className="map-title-group">
          <h2>🌐 Heritage Google Maps Cartography</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Google Maps API live satellite & street navigation with historical 3D telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Google Map Mode Buttons */}
          <div
            style={{
              display: 'flex',
              background: '#FFFFFF',
              border: '1.5px solid var(--border-heritage)',
              borderRadius: '20px',
              padding: '3px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <button
              onClick={() => setGoogleMapLayer('streets')}
              style={{
                border: 'none',
                background: activeLayer === 'streets' ? '#1A73E8' : 'transparent',
                color: activeLayer === 'streets' ? '#FFFFFF' : 'var(--text-secondary)',
                padding: '5px 12px',
                borderRadius: '16px',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              🗺️ Streets
            </button>
            <button
              onClick={() => setGoogleMapLayer('terrain')}
              style={{
                border: 'none',
                background: activeLayer === 'terrain' ? '#1A73E8' : 'transparent',
                color: activeLayer === 'terrain' ? '#FFFFFF' : 'var(--text-secondary)',
                padding: '5px 12px',
                borderRadius: '16px',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              ⛰️ Terrain
            </button>
            <button
              onClick={() => setGoogleMapLayer('satellite')}
              style={{
                border: 'none',
                background: activeLayer === 'satellite' ? '#1A73E8' : 'transparent',
                color: activeLayer === 'satellite' ? '#FFFFFF' : 'var(--text-secondary)',
                padding: '5px 12px',
                borderRadius: '16px',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              🛰️ Satellite
            </button>
          </div>

          {/* Search Box */}
          <div className="search-map-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-map-input"
              placeholder="Search monument, dynasty, city..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Map Viewport Container */}
      <div style={{ position: 'relative' }}>
        <div ref={mapContainerRef} id="desktop-leaflet-map" />

        {/* Google Maps Live Telemetry Watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.94)',
            border: '1px solid #DADCE0',
            padding: '4px 10px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: '#3C4043',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle fill="#EA4335" cx="12" cy="9" r="2.5"/>
          </svg>
          <span>Google Maps API Engine</span>
        </div>
      </div>
    </div>
  );
}
