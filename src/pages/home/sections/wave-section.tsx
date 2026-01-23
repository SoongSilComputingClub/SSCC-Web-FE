import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { NavLink } from 'react-router-dom';

/**
 * OCEAN - Generative Wave Particles
 *
 * A mobile-first, single-file React component rendering a WebGL particle wave background.
 *
 * Features:
 * - Three.js WebGLRenderer with custom BufferGeometry for high performance.
 * - Procedural "glow" texture generation (in-memory, no external assets).
 * - "Mobile-first" grid density: Reduces particle count on small screens.
 * - Dynamic Wave Animation: Summation of sine waves for organic motion.
 * - Visuals: Particles sparkle (brighter) at wave peaks.
 * - Accessibility: Instantly responds to 'prefers-reduced-motion' by slowing animation.
 */

const WaveSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- 1. CONFIGURATION & STATE ---

    // Detect mobile for performance optimization (fewer particles)
    const isMobile = window.innerWidth < 768;

    const CONFIG = {
      // Grid dimensions: Width (cols) x Depth (rows)
      cols: isMobile ? 60 : 120,
      rows: isMobile ? 60 : 100,
      separation: isMobile ? 1.8 : 1.5,
      particleSize: isMobile ? 2.5 : 1.8,
      waveHeight: 3.5,
      baseSpeed: 0.002, // Normal animation speed
      reducedSpeed: 0.0005, // Speed for reduced-motion preference
    };

    // Track motion preference via closure variable to avoid re-initializing the scene
    let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 2. ASSET GENERATION (Procedural) ---

    // Generates a radial gradient texture for soft, glowing particles
    const createParticleTexture = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const center = size / 2;
        const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Core
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)'); // Inner glow
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent edge
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvas);
    };

    // --- 3. SCENE SETUP ---

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // Fog adds cinematic depth, fading distant particles into black
    scene.fog = new THREE.FogExp2(0x000000, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    // Position: Elevated, looking slightly down
    camera.position.set(0, 20, 35);
    camera.lookAt(0, 0, -10);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false, // Disable AA for performance (particles blend naturally)
      alpha: false,
    });

    // Cap pixel ratio at 2 to save battery/performance on high-density screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // --- 4. PARTICLE SYSTEM ---

    const numParticles = CONFIG.cols * CONFIG.rows;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // We only need to store base X and Z since Y is calculated every frame.
    // However, reading from the buffer directly is efficient enough here.

    // Center the grid around (0,0)
    const totalWidth = CONFIG.cols * CONFIG.separation;
    const totalDepth = CONFIG.rows * CONFIG.separation;
    const startX = -totalWidth / 2;
    const startZ = -totalDepth / 2;

    for (let i = 0; i < numParticles; i++) {
      const ix = i % CONFIG.cols;
      const iy = Math.floor(i / CONFIG.cols);

      const x = startX + ix * CONFIG.separation;
      const z = startZ + iy * CONFIG.separation;
      const y = 0; // Initial flat plane

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Initial color (white-ish)
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleTexture = createParticleTexture();
    const material = new THREE.PointsMaterial({
      size: CONFIG.particleSize,
      map: particleTexture,
      vertexColors: true, // Enables per-particle coloring
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending, // Makes overlapping particles brighter
      depthWrite: false, // Crucial for transparent particle sorting
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- 5. ANIMATION LOOP ---

    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Skip heavy work if tab is hidden
      if (document.hidden) return;

      // Adjust time step based on reduced motion preference
      time += reduceMotion ? CONFIG.reducedSpeed : CONFIG.baseSpeed;

      const positions = geometry.attributes.position.array as Float32Array;
      const colors = geometry.attributes.color.array as Float32Array;

      // Update every particle
      for (let i = 0; i < numParticles; i++) {
        const px = positions[i * 3];
        const pz = positions[i * 3 + 2];

        // --- WAVE MATH ---
        // Summation of sine waves for organic "oceanic" surface
        // y = A*sin(B*x + C*t) + ...
        let y = 0;
        y += Math.sin(px * 0.1 + time * 1.2) * 1.0; // Large rolling swell
        y += Math.sin(pz * 0.15 + time * 1.0) * 0.8; // Cross swell
        y += Math.sin((px + pz) * 0.2 + time * 2.5) * 0.3; // Ripples

        // Scale height
        y *= CONFIG.waveHeight / 2;

        // Update Y position
        positions[i * 3 + 1] = y;

        // --- COLOR MATH ---
        // Peaks (high Y) = Bright White. Troughs (low Y) = Dimmer Blue-Grey.
        const heightNorm = (y + CONFIG.waveHeight) / (CONFIG.waveHeight * 2.2); // ~0 to 1
        const intensity = Math.max(0.05, Math.min(1, heightNorm));

        // Non-linear glow (power) makes peaks pop
        const mix = Math.pow(intensity, 1.5);

        // Tint: R=0.2, G=0.4, B=1.0 (Blue) -> to -> R=1, G=1, B=1 (White)
        colors[i * 3] = 0.2 + 0.8 * mix;
        colors[i * 3 + 1] = 0.4 + 0.6 * mix;
        colors[i * 3 + 2] = 0.6 + 0.4 * mix + 0.1; // Ensure blue tint remains
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Subtle Camera Drift (breathing effect)
      if (!reduceMotion) {
        camera.position.x = Math.sin(time * 0.1) * 2;
        camera.lookAt(0, 0, -10);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 6. EVENT HANDLERS ---

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
    };

    window.addEventListener('resize', handleResize);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', handleMotionChange);

    // --- 7. CLEANUP ---

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(frameId);

      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      // Dispose Three.js resources
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-bg-default text-text-default">
      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 block -translate-y-40"
        aria-hidden="true"
      />

      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-left select-none pt-72">
        {/* Title */}
        <h1 className="text-[32px] font-bold text-text-default leading-none">
          SSCC, <br />
          Where Coding Begins.
        </h1>
        <NavLink
          to="/apply"
          className="self-start mt-4 bg-bg-default shrink-0 rounded-full border-[1.5px] border-point px-[12px] py-2 text-[11px] font-semibold text-point"
        >
          지금 바로 지원하기 →
        </NavLink>
      </div>
    </section>
  );
};

export default WaveSection;
