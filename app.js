// Heritage WebXR & Desktop Application Engine

let currentMode = 'mobile';
let currentMobileTab = 'ar';
let selectedSampleId = 'hampi-pillar';
let currentLanguage = 'en';
let isNarrating = false;
let speechUtterance = null;

// Three.js State
let scene, camera, renderer, currentMesh, wireframeMesh, particleSystem, controls;
let isWireframeMode = true;

// Leaflet Map State
let leafletMap = null;
let mapMarkers = [];

// Initialize App on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initCameraStream();
  init3DCanvas();
  loadSampleArtifact(selectedSampleId);
  renderEmergencyHelplines();
  renderVaultLists();
  renderRelatableMonuments('hampi-pillar');
  
  // Delay map init slightly to ensure container is ready
  setTimeout(() => {
    initDesktopMap();
  }, 300);
});

/* ========================================================= */
/* VIEW MODE & NAVIGATION SWITCHERS */
/* ========================================================= */
function switchViewMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));

  if (mode === 'mobile') {
    document.getElementById('view-mobile').classList.add('active');
    document.getElementById('btn-mode-mobile').classList.add('active');
  } else {
    document.getElementById('view-desktop').classList.add('active');
    document.getElementById('btn-mode-desktop').classList.add('active');
    if (leafletMap) {
      leafletMap.invalidateSize();
    }
  }
}

function switchMobileTab(tab) {
  currentMobileTab = tab;
  document.querySelectorAll('.mobile-tab-page').forEach(page => page.style.display = 'none');
  document.querySelectorAll('.mobile-tab-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(`mobile-tab-${tab}`).style.display = 'block';
  document.getElementById(`tab-btn-${tab}`).classList.add('active');
}

/* ========================================================= */
/* CAMERA STREAM (WEBXR MOCK DEMO) */
/* ========================================================= */
function initCameraStream() {
  const videoFeed = document.getElementById('ar-video-feed');
  const fallbackView = document.getElementById('camera-fallback');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoFeed.srcObject = stream;
        videoFeed.style.display = 'block';
        fallbackView.style.display = 'none';
      })
      .catch(err => {
        console.warn('Camera stream permission denied or unavailable. Using WebXR simulated view.', err);
        videoFeed.style.display = 'none';
        fallbackView.style.display = 'flex';
      });
  } else {
    videoFeed.style.display = 'none';
    fallbackView.style.display = 'flex';
  }
}

/* ========================================================= */
/* AR SCANNING & TARGET SELECTION */
/* ========================================================= */
function selectScanSample(sampleId) {
  selectedSampleId = sampleId;
  document.querySelectorAll('.sample-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  loadSampleArtifact(sampleId);
}

function loadSampleArtifact(artifactIdx) {
  const artifact = HERITAGE_DATA.scannedArtifacts.find(a => a.id === artifactIdx) || HERITAGE_DATA.scannedArtifacts[0];
  
  document.getElementById('reconstruct-artifact-name').innerText = artifact.name;
  updateStoryDisplay(artifact);
  render3DMeshForArtifact(artifact.meshType);
  renderRelatableMonuments(artifact.id);
}

function triggerARScanProcess() {
  const statusBadge = document.getElementById('ar-status-text');
  statusBadge.innerText = 'AI EXTRACTING 3D WIREFRAME MESH...';
  statusBadge.style.color = '#F39C12';

  // Pulse 3D canvas particles to simulate scanning
  if (particleSystem) {
    particleSystem.rotation.y += 1.5;
  }

  setTimeout(() => {
    statusBadge.innerText = 'WEBXR 3D MESH RECONSTRUCTED';
    statusBadge.style.color = 'var(--cyan-wireframe)';
    alert(`✨ Reconstructed 3D Wireframe for ${document.getElementById('reconstruct-artifact-name').innerText}! History storytelling unlocked.`);
  }, 1200);
}

/* ========================================================= */
/* THREE.JS 3D WIREFRAME RECONSTRUCTION CANVAS */
/* ========================================================= */
function init3DCanvas() {
  const container = document.getElementById('wireframe-3d-canvas');
  const width = container.clientWidth || 360;
  const height = container.clientHeight || 240;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030712);

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 2, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Orbit Controls
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  }

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xd4af37, 1.2);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0x00f2fe, 1.5, 10);
  pointLight.position.set(-3, 3, 2);
  scene.add(pointLight);

  // Add Particle Scanning Ring
  createScanningParticles();

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    if (currentMesh) {
      currentMesh.rotation.y += 0.006;
    }
    if (wireframeMesh) {
      wireframeMesh.rotation.y += 0.006;
    }
    if (particleSystem) {
      particleSystem.rotation.y -= 0.003;
    }

    if (controls) controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', onCanvasWindowResize);
}

function createScanningParticles() {
  const particleCount = 180;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 2.2 + Math.random() * 0.4;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x00f2fe,
    size: 0.06,
    transparent: true,
    opacity: 0.7
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
}

function render3DMeshForArtifact(type) {
  if (currentMesh) scene.remove(currentMesh);
  if (wireframeMesh) scene.remove(wireframeMesh);

  let geometry;

  if (type === 'pillar') {
    geometry = new THREE.CylinderGeometry(0.8, 1.0, 3.2, 16, 8);
  } else if (type === 'tablet') {
    geometry = new THREE.BoxGeometry(2.4, 3.0, 0.4, 8, 8, 2);
  } else {
    // Wall / Slab
    geometry = new THREE.BoxGeometry(3.2, 2.2, 0.5, 10, 8, 2);
  }

  // Solid Textured Material
  const solidMaterial = new THREE.MeshStandardMaterial({
    color: 0x2A3447,
    roughness: 0.8,
    metalness: 0.2
  });
  currentMesh = new THREE.Mesh(geometry, solidMaterial);

  // Glowing Cyber Wireframe Overlay
  const wireframeGeo = new THREE.WireframeGeometry(geometry);
  const wireframeMat = new THREE.LineBasicMaterial({
    color: 0x00f2fe,
    linewidth: 1.5,
    transparent: true,
    opacity: 0.85
  });
  wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);

  scene.add(currentMesh);
  scene.add(wireframeMesh);

  wireframeMesh.visible = isWireframeMode;
}

function toggleMeshWireframe() {
  isWireframeMode = !isWireframeMode;
  if (wireframeMesh) {
    wireframeMesh.visible = isWireframeMode;
  }
}

function reset3DCamera() {
  camera.position.set(0, 2, 6);
  if (controls) controls.reset();
}

function onCanvasWindowResize() {
  const container = document.getElementById('wireframe-3d-canvas');
  if (!container) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  if (width && height && renderer && camera) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
}

/* ========================================================= */
/* STORYTELLER & MULTILINGUAL VOICE NARRATION */
/* ========================================================= */
function updateStoryDisplay(artifact) {
  const storyBox = document.getElementById('story-text-display');
  const text = artifact.storyText[currentLanguage] || artifact.storyText['en'];
  storyBox.innerText = text;
}

function changeStoryLanguage(langCode) {
  currentLanguage = langCode;
  const artifact = HERITAGE_DATA.scannedArtifacts.find(a => a.id === selectedSampleId) || HERITAGE_DATA.scannedArtifacts[0];
  updateStoryDisplay(artifact);

  if (isNarrating) {
    stopAudioNarration();
    startAudioNarration();
  }
}

function toggleStoryAudio() {
  if (isNarrating) {
    stopAudioNarration();
  } else {
    startAudioNarration();
  }
}

function startAudioNarration() {
  if (!('speechSynthesis' in window)) {
    alert('Browser audio speech synthesis is not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const text = document.getElementById('story-text-display').innerText;
  speechUtterance = new SpeechSynthesisUtterance(text);

  // Map language codes for Web Speech API
  const langMap = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'kn': 'kn-IN',
    'bn': 'bn-IN',
    'es': 'es-ES',
    'fr': 'fr-FR'
  };

  speechUtterance.lang = langMap[currentLanguage] || 'en-US';
  speechUtterance.rate = 0.95; // Slightly slower dramatic pace

  speechUtterance.onstart = () => {
    isNarrating = true;
    document.getElementById('audio-btn-text').innerText = 'Pause Story';
    document.getElementById('audio-visualizer').classList.add('playing');
  };

  speechUtterance.onend = () => {
    stopAudioNarration();
  };

  speechUtterance.onerror = () => {
    stopAudioNarration();
  };

  window.speechSynthesis.speak(speechUtterance);
}

function stopAudioNarration() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isNarrating = false;
  document.getElementById('audio-btn-text').innerText = 'Listen Story';
  document.getElementById('audio-visualizer').classList.remove('playing');
}

/* ========================================================= */
/* TOURIST SAFETY & HELPLINES */
/* ========================================================= */
function renderEmergencyHelplines() {
  const container = document.getElementById('emergency-contacts-container');
  if (!container) return;

  container.innerHTML = HERITAGE_DATA.safetyData.emergencyHelplines.map(c => `
    <a href="tel:${c.number.split('/')[0].trim()}" class="emergency-btn">
      <div style="font-weight: 700; font-size: 0.85rem; color: #FFF;">${c.name}</div>
      <div style="font-size: 0.8rem; color: var(--gold-primary); font-weight: 600;">📞 ${c.number}</div>
      <div style="font-size: 0.7rem; color: var(--text-muted);">${c.desc}</div>
    </a>
  `).join('');
}

function triggerSOSPanicAlert() {
  alert('🚨 SOS PANIC ALERT ACTIVATED!\n\nYour GPS coordinates [15.3350, 76.4600] and safety profile have been broadcasted to the nearest Tourist Police Patrol & Heritage Control Room.');
}

/* ========================================================= */
/* DESKTOP INTERACTIVE MAP BANDWIDTH (LEAFLET.JS) */
/* ========================================================= */
function initDesktopMap() {
  const mapContainer = document.getElementById('desktop-leaflet-map');
  if (!mapContainer || leafletMap) return;

  // Center over South-Central India Monument Cluster
  leafletMap = L.map('desktop-leaflet-map').setView([17.5000, 78.5000], 5);

  // Dark Map Tiles (CartoDB Dark Matter)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap',
    maxZoom: 18
  }).addTo(leafletMap);

  // Add Monument Markers
  renderMapMarkers(HERITAGE_DATA.mapMonuments);
}

function renderMapMarkers(monuments) {
  if (!leafletMap) return;

  // Clear existing markers
  mapMarkers.forEach(m => leafletMap.removeLayer(m));
  mapMarkers = [];

  monuments.forEach(mon => {
    // Custom Gold Glowing Pin Icon
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="
        width: 32px; 
        height: 32px; 
        background: linear-gradient(135deg, #D4AF37, #F39C12); 
        border-radius: 50%; 
        border: 2px solid #FFF; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 14px; 
        box-shadow: 0 0 15px rgba(212,175,55,0.8);
        cursor: pointer;
      ">🏛️</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker(mon.coordinates, { icon: customIcon }).addTo(leafletMap);
    
    const popupContent = `
      <div style="padding: 6px; max-width: 240px;">
        <img src="${mon.image}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
        <h4 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1rem; margin-bottom: 4px;">${mon.name}</h4>
        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 6px;">📍 ${mon.location} | ${mon.dynasty}</p>
        <p style="font-size: 0.78rem; line-height: 1.4; color: #E2E8F0; margin-bottom: 8px;">${mon.summary}</p>
        <button onclick="exploreMonumentDetails('${mon.id}')" style="
          width: 100%; 
          background: linear-gradient(135deg, var(--gold-primary), #B8860B); 
          color: #000; 
          border: none; 
          padding: 6px; 
          border-radius: 8px; 
          font-weight: 700; 
          font-size: 0.75rem; 
          cursor: pointer;
        ">🔍 Explore Relatable History</button>
      </div>
    `;

    marker.bindPopup(popupContent);
    mapMarkers.push(marker);
  });
}

function filterMapMonuments(query) {
  const q = query.toLowerCase().trim();
  const filtered = HERITAGE_DATA.mapMonuments.filter(m => 
    m.name.toLowerCase().includes(q) || 
    m.location.toLowerCase().includes(q) ||
    m.dynasty.toLowerCase().includes(q)
  );

  renderMapMarkers(filtered);
}

function exploreMonumentDetails(monumentId) {
  const mon = HERITAGE_DATA.mapMonuments.find(m => m.id === monumentId);
  if (!mon) return;

  alert(`🏛️ Monument Selected: ${mon.name}\n\nDynasty: ${mon.dynasty}\n\nKey Highlights:\n- ${mon.highlights.join('\n- ')}\n\nOpening 3D Reconstruction preview in Vault...`);
  
  // Switch sample artifact 3D mesh if matched
  if (monumentId.includes('hampi')) loadSampleArtifact('hampi-pillar');
  else if (monumentId.includes('chola') || monumentId.includes('brihadeeswarar')) loadSampleArtifact('chola-inscription');
  else loadSampleArtifact('ashoka-edict');
}

/* ========================================================= */
/* VAULT & RELATABLE MONUMENTS RENDERERS */
/* ========================================================= */
function renderVaultLists() {
  const mobileVault = document.getElementById('mobile-vault-list');
  const desktopVault = document.getElementById('desktop-vault-list');

  const vaultHTML = HERITAGE_DATA.scannedArtifacts.map(art => `
    <div class="vault-item" onclick="loadSampleArtifact('${art.id}'); switchMobileTab('ar');">
      <img src="${art.thumbnail}" class="vault-img" alt="${art.name}">
      <div class="vault-info">
        <h5>${art.name}</h5>
        <p>📍 ${art.location}</p>
        <p style="color: var(--cyan-wireframe); font-size: 0.7rem;">${art.condition}</p>
      </div>
    </div>
  `).join('');

  if (mobileVault) mobileVault.innerHTML = vaultHTML;
  if (desktopVault) desktopVault.innerHTML = vaultHTML;
}

function renderRelatableMonuments(artifactId) {
  const container = document.getElementById('desktop-relatable-container');
  if (!container) return;

  const currentArtifact = HERITAGE_DATA.scannedArtifacts.find(a => a.id === artifactId) || HERITAGE_DATA.scannedArtifacts[0];
  const relatableIds = currentArtifact.relatableIds || ['brihadeeswarar', 'konark-sun'];

  const relatables = HERITAGE_DATA.mapMonuments.filter(m => relatableIds.includes(m.id));

  container.innerHTML = relatables.map(rel => `
    <div class="relatable-card" onclick="exploreMonumentDetails('${rel.id}')" style="cursor: pointer;">
      <img src="${rel.image}" alt="${rel.name}">
      <div class="relatable-content">
        <h6>${rel.name}</h6>
        <p>🏛️ ${rel.dynasty}</p>
        <p style="color: var(--gold-light);">⭐ ${rel.rating} | UNESCO Site</p>
      </div>
    </div>
  `).join('');
}
