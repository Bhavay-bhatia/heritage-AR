'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeCanvas({ meshType = 'pillar', isScanning = false }) {
  const containerRef = useRef(null);
  const isWireframeRef = useRef(true);
  const [wireframeActive, setWireframeActive] = useState(true);

  // References to keep scene objects across renders
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const currentMeshRef = useRef(null);
  const wireframeMeshRef = useRef(null);
  const particleSystemRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Initialize Three.js Scene - Traditional Light Heritage Exhibition Gallery
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 250;

    // Scene with warm ivory parchment studio background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5EFE6);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.2, 6.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Clean any prior children
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Ambient & Directional Warm Sunlight
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.4);
    sunLight.position.set(5, 10, 7);
    scene.add(sunLight);

    const warmFillLight = new THREE.PointLight(0xd97706, 1.0, 10);
    warmFillLight.position.set(-3, 3, 2);
    scene.add(warmFillLight);

    // Particle Scanning Ring - Warm Heritage Saffron/Gold
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xb8860b,
      size: 0.065,
      transparent: true,
      opacity: 0.8,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    particleSystemRef.current = particleSystem;
    scene.add(particleSystem);

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (currentMeshRef.current) {
        currentMeshRef.current.rotation.y += 0.005;
      }
      if (wireframeMeshRef.current) {
        wireframeMeshRef.current.rotation.y += 0.005;
      }
      if (particleSystemRef.current) {
        particleSystemRef.current.rotation.y -= 0.003;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      if (newWidth && newHeight) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update mesh when meshType changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (currentMeshRef.current) {
      scene.remove(currentMeshRef.current);
      if (currentMeshRef.current.geometry) currentMeshRef.current.geometry.dispose();
    }
    if (wireframeMeshRef.current) {
      scene.remove(wireframeMeshRef.current);
      if (wireframeMeshRef.current.geometry) wireframeMeshRef.current.geometry.dispose();
    }

    let geometry;
    if (meshType === 'pillar') {
      geometry = new THREE.CylinderGeometry(0.8, 1.0, 3.2, 16, 8);
    } else if (meshType === 'tablet') {
      geometry = new THREE.BoxGeometry(2.4, 3.0, 0.4, 8, 8, 2);
    } else {
      geometry = new THREE.BoxGeometry(3.2, 2.2, 0.5, 10, 8, 2);
    }

    // Weathered Ancient Granite / Sandstone Solid Material
    const solidMaterial = new THREE.MeshStandardMaterial({
      color: 0x52463B,
      roughness: 0.8,
      metalness: 0.15,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const currentMesh = new THREE.Mesh(geometry, solidMaterial);
    currentMeshRef.current = currentMesh;

    // Bright Luminous Light Wireframe Overlay (Visible from afar)
    const wireframeGeo = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00E5FF, // High-visibility bright light cyan
      linewidth: 2,
      transparent: false,
      opacity: 1.0,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    wireframeMesh.scale.set(1.003, 1.003, 1.003); // Elevate slightly above solid faces
    wireframeMesh.visible = isWireframeRef.current;
    wireframeMeshRef.current = wireframeMesh;

    scene.add(currentMesh);
    scene.add(wireframeMesh);
  }, [meshType]);

  // Handle Scan pulse effect
  useEffect(() => {
    if (isScanning && particleSystemRef.current) {
      particleSystemRef.current.rotation.y += 1.5;
    }
  }, [isScanning]);

  const toggleWireframe = () => {
    const nextState = !isWireframeRef.current;
    isWireframeRef.current = nextState;
    setWireframeActive(nextState);
    if (wireframeMeshRef.current) {
      wireframeMeshRef.current.visible = nextState;
    }
  };

  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 2.2, 6.2);
    }
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="wireframe-canvas-container">
      <div ref={containerRef} id="wireframe-3d-canvas" />
      <div className="canvas-controls-overlay">
        <button
          className="canvas-btn"
          onClick={toggleWireframe}
          style={{
            background: wireframeActive ? '#0099B8' : '#FFFFFF',
            color: wireframeActive ? '#FFFFFF' : '#241C15',
            borderColor: wireframeActive ? '#007A94' : '#E5D9C3',
          }}
        >
          {wireframeActive ? 'Wireframe: ON' : 'Wireframe: OFF'}
        </button>
        <button className="canvas-btn" onClick={resetCamera}>
          Reset View
        </button>
      </div>
    </div>
  );
}
