# 🏛️ Heritage XR — WebXR Monument Intelligence & Tourist Safety Platform

> **Preserving Ancient Heritage Through 3D Photogrammetry, Multilingual Oral Storytelling, and Smart Tourist Safety Corridors.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Google Maps](https://img.shields.io/badge/Google_Maps-API-4285F4?style=for-the-badge&logo=googlemaps)](https://developers.google.com/maps)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)

---

## 📌 Project Overview

Millions of ancient historical monuments across India and the globe suffer from severe environmental weathering, stone erosion, and fading inscriptions. Tourists visiting these remote archaeological sites often struggle with:
1. **Visualizing Original Architecture**: Eroded carvings, collapsed columns, and weathered rock edicts are difficult to comprehend without 3D architectural reconstruction.
2. **Language Barriers**: Inability to read classical ancient scripts (Brahmi, Vatteluttu) or understand local historical context in their mother tongue.
3. **Tourist Safety & Security Concerns**: Navigating unfamiliar routes, especially at dusk, lack of clear access to local Tourist Police stations, verified safe pathways, and emergency helplines.

**Heritage XR** is a next-generation WebXR & monument intelligence web application that bridges this gap. It turns every smartphone into an **AI-powered AR scanner**, reconstructing lost 3D wireframe contours in real-time, delivering multilingual spoken oral histories, and providing real-time **Safe Tourist Corridors** with direct integration into **Google Maps** and local police emergency networks.

---

## ✨ Key Features

### 1. 🔍 AI WebXR AR Camera & 3D Wireframe Reconstruction
- **Real-Time Camera Scanner**: Launches the device's environment-facing camera with an interactive targeting reticle, laser scan animation, and live condition telemetry.
- **Three.js WebGL 3D Studio**: Reconstructs damaged monuments (e.g., *Hampi Eroded Sun Pillar*, *Ashokan Brahmi Rock Edict*, *Chola Inscription Slab*) into high-fidelity 3D models with weathered granite textures.
- **Luminous Cyber Wireframe Overlay**: High-visibility glowing cyan grid lines (`0x00E5FF`) that visualize the eroded architectural mesh with zero depth-buffer z-fighting.
- **Interactive OrbitControls**: Rotate, inspect, zoom, and toggle between solid and wireframe mode.

### 2. 📜 Multilingual Oral History Narration Engine
- **Deciphered Ancient Epigraphy**: Decodes ancient Brahmi and Tamil Vatteluttu scripts into compelling narratives.
- **8 Supported Languages**: Listen to oral historical stories narrated in **English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Bengali (বাংলা), Spanish (Español), and French (Français)**.
- **Web Speech API Integration**: Integrated voice synthesizer with audio wave visualizer, pause/resume controls, and language-specific cadence.

### 3. 🛡️ Intelligent Tourist Safety & Police Command System
- **Interactive Destination Selector**: Select any heritage site (*Vitthala Temple Hampi, Brihadeeswarar Thanjavur, Sanchi Stupa, Konark Sun Temple, Ajanta Caves*).
- **Verified Safe Corridor Telemetry**:
  - Live Safety Score index (e.g., `97% SAFE CORRIDOR`).
  - Walking and electric-cart travel time estimates.
  - Smart LED lighting coverage percentage (`96% Illuminated`).
  - Active police patrol frequency (`Every 10 mins by Tourist Police`).
  - AI CCTV surveillance camera density along the trail.
  - Verified checkpoint directory (Police outposts, SOS alarm pillars, first aid booths).
- **Direct Turn-by-Turn Navigation**: One-click **"Open Safest Route in Google Maps"** action for real-time walking directions.
- **Dedicated Local Tourist Police Station Card**:
  - Displays jurisdictional station name, in-charge inspector, badge ID, distance from monument, and station address.
  - One-tap phone calling (`📞 Call Police Station`) and map location link (`📍 Locate on Maps`).
- **Emergency Helpline Directory**: Filterable directory for Police (112), Women Safety (1091), Tourist Helpline (1363), Ambulance (108), and ASI Monument Security.
- **Instant SOS Panic Beacon**: One-tap emergency broadcast that displays live GPS telemetry, dispatches the nearest patrol buggy, and alerts local authorities.

### 4. 🗺️ Google Maps Satellite & Cartography Explorer
- **Google Maps API Engine**: Live, authentic Google Maps integration with toggles for:
  - 🗺️ **Google Streets**: Standard roads, city boundaries, and national highways.
  - ⛰️ **Google Terrain**: Topographical elevation contours and terrain relief.
  - 🛰️ **Google Satellite**: High-resolution aerial imagery with street labels.
- **Custom Teardrop Pins**: Red Google-style pins with 3D monument badges and interactive popups.
- **"Open in Google Maps"**: Direct link to external Google Maps navigation for every mapped monument.


---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Client Components) |
| **UI Library** | [React 18](https://react.dev/) |
| **3D Rendering** | [Three.js](https://threejs.org/) (WebGL, BufferGeometry, OrbitControls) |
| **Cartography** | [Google Maps API](https://developers.google.com/maps) & [Leaflet.js](https://leafletjs.com/) |
| **Styling** | Vanilla CSS3 (Custom Properties, Glassmorphism, Responsive Media Queries) |
| **Speech Audio** | Web Speech API (`SpeechSynthesisUtterance`) |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```
Heritage/
├── app/
│   ├── layout.jsx              # Global root layout with SEO metadata and stylesheets
│   ├── page.jsx                # Main responsive view controller & dynamic imports
│   └── globals.css             # Traditional heritage design system & mobile queries
├── components/
│   ├── Navbar.jsx              # Responsive header with device mode toggle
│   ├── ThreeCanvas.jsx         # Client-side Three.js 3D wireframe reconstruction canvas
│   ├── LeafletMap.jsx          # Interactive Google Maps Streets/Terrain/Satellite map
│   ├── ARCamera.jsx            # WebXR camera feed, targeting reticle & HUD overlay
│   ├── StoryTeller.jsx         # 8-language voice narration via Web Speech API
│   ├── SafetyDashboard.jsx     # Safe routes, local police cards & SOS panic beacon
│   ├── VaultList.jsx           # Scanned historical artifacts vault
│   └── RelatableMonuments.jsx  # AI relatable monuments recommendation engine
├── lib/
│   └── data.js                 # Heritage datasets (artifacts, maps, police stations, helplines)
├── next.config.js              # Next.js configuration & image domains
├── package.json                # Project dependencies & npm scripts
├── vercel.json                 # Vercel deployment configuration
└── README.md                   # Project documentation
```

---