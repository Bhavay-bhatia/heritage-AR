# Heritage XR & Monument Intelligence Platform

An AI-powered WebXR 3D Wireframe reconstruction, multilingual story narration, and tourist safety platform built with **Next.js**, **Three.js**, and **Leaflet.js**.

---

## Features

- **WebXR AR Camera Simulation & HUD**: Live camera feed or simulated scanner viewport with targeting reticle and spectral scanning telemetry.
- **Three.js 3D Wireframe Reconstruction**: Interactive 3D mesh rendering for weathered monuments (e.g., Hampi Sun Temple Pillar, Ashoka Rock Edict, Chola Inscription Slab) with orbiting controls and wireframe mode toggle.
- **Multilingual Historic Storytelling**: Web Speech API audio narration across 8 languages (English, Hindi, Tamil, Telugu, Kannada, Bengali, Spanish, French).
- **Tourist Safe Corridor & Helplines**: Real-time safety scores, smart lighting indicators, emergency police/medical contact directory, and instantaneous SOS panic alert.
- **Desktop Command Center & Leaflet Map**: Interactive map with custom gold glowing pins, monument details popups, live search filter, and AI Relatable Monuments engine.

---

## Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## Deploy to Vercel

### Option 1: Deploy via GitHub & Vercel Dashboard (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Heritage WebXR Next.js app"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Open [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect Next.js with all default build settings (`npm run build`). Click **Deploy**!

### Option 2: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the interactive prompts to deploy directly from your terminal.
