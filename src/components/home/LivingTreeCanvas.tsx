"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Shield, AlertTriangle, FileText, ChevronRight, X } from "lucide-react";

interface IntelligenceTag {
  id: string;
  code: string;
  label: string;
  category: string;
  status: "FACT" | "INDICATOR" | "MITIGATION";
  confidence: string;
  citation: string;
  finding: string;
  serviceHref: string;
  serviceTitle: string;
  // Normalized percentage coordinates on 3D canvas (desktop)
  xDesktop: number; // percentage (0-100)
  yDesktop: number; // percentage (0-100)
  xMobile: number;
  yMobile: number;
}

const INTELLIGENCE_TAGS: IntelligenceTag[] = [
  {
    id: "tag-1",
    code: "01",
    label: "COMPETITOR_PRICING",
    category: "Business Intelligence",
    status: "FACT",
    confidence: "CONFIRMED [A1]",
    citation: "PUBLIC_REGIONAL_FILINGS & ENTERPRISE_PDFS",
    finding: "Identified unlisted 28% discount tier on competitor's regional enterprise offering, enabling client to adjust tender bid effectively.",
    serviceHref: "/services/business-due-diligence",
    serviceTitle: "Business Due Diligence",
    xDesktop: 15,
    yDesktop: 34,
    xMobile: 8,
    yMobile: 26,
  },
  {
    id: "tag-2",
    code: "02",
    label: "LOOKALIKE_DOMAIN",
    category: "Investigative OSINT",
    status: "INDICATOR",
    confidence: "VERIFIED [B2]",
    citation: "CERTIFICATE_TRANSPARENCY_LOGS",
    finding: "Newly registered typosquat domain imitating client brand discovered with active MX records staging a spear-phishing campaign.",
    serviceHref: "/services/brand-impersonation-research",
    serviceTitle: "Brand Impersonation & Scam Research",
    xDesktop: 78,
    yDesktop: 30,
    xMobile: 52,
    yMobile: 30,
  },
  {
    id: "tag-3",
    code: "03",
    label: "UNDISCLOSED_DIRECTOR",
    category: "Business Due Diligence",
    status: "FACT",
    confidence: "CONFIRMED [A1]",
    citation: "STATUTORY_MCA_REGISTRY",
    finding: "Uncovered 3 undisclosed common directorships connecting proposed acquisition target directly to client's primary regional rival.",
    serviceHref: "/services/osint-investigation",
    serviceTitle: "OSINT Investigation",
    xDesktop: 12,
    yDesktop: 64,
    xMobile: 6,
    yMobile: 68,
  },
  {
    id: "tag-4",
    code: "04",
    label: "EXPOSED_CREDENTIALS",
    category: "Cyber Threat Intelligence",
    status: "MITIGATION",
    confidence: "ACTIONABLE [A1]",
    citation: "PUBLIC_REPOSITORY_TELEMETRY",
    finding: "Live internal staging database credentials committed to public developer repository indexed and flagged prior to unauthorized exploit.",
    serviceHref: "/services/cyber-threat-intelligence",
    serviceTitle: "Cyber Threat Intelligence",
    xDesktop: 82,
    yDesktop: 62,
    xMobile: 50,
    yMobile: 70,
  },
  {
    id: "tag-5",
    code: "05",
    label: "TENURE_DISCREPANCY",
    category: "Recruitment Verification",
    status: "FACT",
    confidence: "CONFIRMED [A1]",
    citation: "CORPORATE_DISCLOSURES & TIMELINES",
    finding: "Candidate's claimed 4-year 'Head of Engineering' role refuted by verified incorporation records showing company ceased operations in 2024.",
    serviceHref: "/services/recruitment-verification",
    serviceTitle: "Recruitment Verification",
    xDesktop: 48,
    yDesktop: 82,
    xMobile: 28,
    yMobile: 84,
  },
];

export function LivingTreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTagId, setActiveTagId] = useState<string | null>("tag-1");
  const [hoveredTagId, setHoveredTagId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // WebGL & reduced-motion check
  useEffect(() => {
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  // Three.js Scene Setup
  useEffect(() => {
    if (!mountRef.current || !hasWebGL) return;

    const container = mountRef.current;
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040d0a, 0.045);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 7.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a2d24, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xb7e4d5, 2.2);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x2fa885, 1.8);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // 4. Materials
    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x052a23,
      roughness: 0.75,
      metalness: 0.2,
    });
    disposables.push(trunkMat);

    const vascularMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x2fa885,
      emissiveIntensity: 0.85,
      roughness: 0.25,
      metalness: 0.3,
    });
    disposables.push(vascularMat);

    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0xb7e4d5,
      emissive: 0x0d5844,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    disposables.push(canopyMat);

    const coreHeartMat = new THREE.MeshStandardMaterial({
      color: 0xf4f2ea,
      emissive: 0xb7e4d5,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.7,
    });
    disposables.push(coreHeartMat);

    // 5. Build Procedural Living Tree Group
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    // Central braided trunk strands (5 intertwined bio-helices)
    const trunkStrands = 5;
    const trunkHeight = 4.2;
    const trunkBaseY = -2.2;

    for (let i = 0; i < trunkStrands; i++) {
      const baseAngle = (i / trunkStrands) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      const steps = 28;

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const y = trunkBaseY + t * trunkHeight;
        const twist = t * Math.PI * 0.8 + baseAngle;
        const radius = 0.3 + Math.pow(t - 0.45, 2) * 1.5;
        const x = Math.cos(twist) * radius;
        const z = Math.sin(twist) * radius;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const trunkGeo = new THREE.TubeGeometry(curve, 32, 0.07, 8, false);
      disposables.push(trunkGeo);
      const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
      treeGroup.add(trunkMesh);

      // Vascular glowing filament on alternating strands
      if (i % 2 === 0) {
        const vascGeo = new THREE.TubeGeometry(curve, 32, 0.022, 6, false);
        disposables.push(vascGeo);
        const vascMesh = new THREE.Mesh(vascGeo, vascularMat);
        vascMesh.scale.set(1.04, 1.0, 1.04);
        treeGroup.add(vascMesh);
      }
    }

    // Branching Neural Canopy Tendrils (7 branches spreading outward)
    const numBranches = 7;
    const foliageNodes: THREE.Mesh[] = [];

    for (let i = 0; i < numBranches; i++) {
      const angle = (i / numBranches) * Math.PI * 2 + (i % 2) * 0.15;
      const points: THREE.Vector3[] = [];
      const steps = 22;

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const y = 0.7 + t * 1.5 - Math.pow(t, 2) * 0.35;
        const r = 0.45 + t * 2.8;
        const branchAngle = angle + Math.sin(t * 2.2) * 0.35;
        const x = Math.cos(branchAngle) * r;
        const z = Math.sin(branchAngle) * r;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const branchGeo = new THREE.TubeGeometry(curve, 22, 0.04, 6, false);
      disposables.push(branchGeo);
      const branchMesh = new THREE.Mesh(branchGeo, trunkMat);
      treeGroup.add(branchMesh);

      const branchVascGeo = new THREE.TubeGeometry(curve, 22, 0.015, 6, false);
      disposables.push(branchVascGeo);
      const branchVascMesh = new THREE.Mesh(branchVascGeo, vascularMat);
      treeGroup.add(branchVascMesh);

      // Node at branch tip
      const tipPos = points[points.length - 1];
      const tipGeo = new THREE.IcosahedronGeometry(0.12, 1);
      disposables.push(tipGeo);
      const tipMesh = new THREE.Mesh(tipGeo, canopyMat);
      tipMesh.position.copy(tipPos);
      treeGroup.add(tipMesh);
      foliageNodes.push(tipMesh);
    }

    // Foundation Roots (6 curling roots)
    const numRoots = 6;
    for (let i = 0; i < numRoots; i++) {
      const angle = (i / numRoots) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      const steps = 18;

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const y = -1.2 - t * 1.0;
        const r = 0.45 + t * 2.6;
        const rootAngle = angle + Math.sin(t * 3.0) * 0.3;
        const x = Math.cos(rootAngle) * r;
        const z = Math.sin(rootAngle) * r;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const rootGeo = new THREE.TubeGeometry(curve, 18, 0.055, 6, false);
      disposables.push(rootGeo);
      const rootMesh = new THREE.Mesh(rootGeo, trunkMat);
      treeGroup.add(rootMesh);

      if (i % 2 === 1) {
        const vascGeo = new THREE.TubeGeometry(curve, 18, 0.016, 6, false);
        disposables.push(vascGeo);
        const vascMesh = new THREE.Mesh(vascGeo, vascularMat);
        treeGroup.add(vascMesh);
      }
    }

    // Central Core Radiance Octahedron
    const coreHeartGeo = new THREE.OctahedronGeometry(0.24, 2);
    disposables.push(coreHeartGeo);
    const coreHeartMesh = new THREE.Mesh(coreHeartGeo, coreHeartMat);
    coreHeartMesh.position.set(0, 0.25, 0);
    treeGroup.add(coreHeartMesh);

    // Inner point light providing warm glow
    const corePointLight = new THREE.PointLight(0xb7e4d5, 3.2, 9, 2);
    corePointLight.position.set(0, 0.25, 0);
    treeGroup.add(corePointLight);

    // 6. Constellation of 220 Floating Intelligence Particles
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.2 + Math.random() * 3.8;

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = (Math.random() - 0.4) * 4.6;
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = 0.5 + Math.random() * 1.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    disposables.push(particleGeo);

    // Particle Material with Soft Circular Point
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const pctx = particleCanvas.getContext("2d");
    if (pctx) {
      const gradient = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(244, 242, 234, 1.0)");
      gradient.addColorStop(0.35, "rgba(52, 211, 153, 0.8)");
      gradient.addColorStop(0.7, "rgba(47, 168, 133, 0.3)");
      gradient.addColorStop(1, "rgba(4, 31, 27, 0)");
      pctx.fillStyle = gradient;
      pctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(particleMat);

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    treeGroup.add(particleSystem);

    // 7. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = nx * 0.45;
      targetY = ny * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;

      // Smooth camera interpolation
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      treeGroup.rotation.y = elapsed * 0.08 + mouseX * 0.8;
      treeGroup.rotation.x = mouseY * 0.5;

      // Breathing bio-luminance
      const pulse = 0.65 + Math.sin(elapsed * 1.6) * 0.3;
      vascularMat.emissiveIntensity = pulse;
      corePointLight.intensity = 2.8 + Math.sin(elapsed * 1.5) * 0.9;
      canopyMat.emissiveIntensity = 0.4 + Math.sin(elapsed * 2.0) * 0.25;

      // Rotate core heart
      coreHeartMesh.rotation.y = elapsed * 0.35;
      coreHeartMesh.rotation.x = elapsed * 0.2;

      // Floating particles gentle orbit
      particleSystem.rotation.y = elapsed * 0.03;

      // Floating foliage nodes
      foliageNodes.forEach((node, idx) => {
        node.scale.setScalar(1.0 + Math.sin(elapsed * 2.2 + idx) * 0.12);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      disposables.forEach((d) => d.dispose());
      particleTexture.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [hasWebGL]);

  const activeTag = INTELLIGENCE_TAGS.find((t) => t.id === activeTagId) || INTELLIGENCE_TAGS[0];

  return (
    <div className="relative w-full h-[540px] md:h-[640px] lg:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#030d0a] via-[#041a15] to-[#030d0a] border border-[#2fa885]/20 shadow-[0_20px_60px_rgba(2,15,11,0.6)]">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(52,211,153,0.12)_0%,transparent_65%)]" />

      {/* Retro-tech pixel scanline texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(rgba(183,228,213,0)_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px]"
      />

      {/* Corner Bracket Accents */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#34d399]/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#34d399]/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#34d399]/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#34d399]/40 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#8da99e] z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
          <span className="text-[#b7e4d5] font-semibold tracking-wider">
            LIVING KNOWLEDGE NETWORK // PROCEDURAL TOPOLOGY
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#5a7d71]">
          <span>EPISTEMIC_CORROBORATION: ACTIVE</span>
          <span>SOURCES: 100% LAWFUL_OSINT</span>
        </div>
      </div>

      {/* Three.js Canvas Mount */}
      {hasWebGL ? (
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Graceful Fallback if WebGL is disabled */
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#041a15]">
          <div className="w-24 h-24 rounded-full bg-[#2fa885]/15 border border-[#34d399]/40 flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-[#34d399]" />
          </div>
          <h3 className="text-xl font-editorial text-[#f4f2ea]">Knowledge Network Topology</h3>
          <p className="text-xs text-[#a1b8b0] max-w-sm mt-1">
            Structured intelligence synthesis across verified public records, corporate networks, and threat telemetry.
          </p>
        </div>
      )}

      {/* Overlaid Interactive Intelligence Tags */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {INTELLIGENCE_TAGS.map((tag) => {
          const isSelected = activeTagId === tag.id;
          const isHovered = hoveredTagId === tag.id;

          return (
            <div
              key={tag.id}
              style={{
                left: `${tag.xDesktop}%`,
                top: `${tag.yDesktop}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-300"
            >
              <button
                type="button"
                onClick={() => setActiveTagId(isSelected ? null : tag.id)}
                onMouseEnter={() => setHoveredTagId(tag.id)}
                onMouseLeave={() => setHoveredTagId(null)}
                aria-label={`Inspect finding: ${tag.label}`}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono tracking-wider transition-all duration-300 backdrop-blur-md shadow-lg ${
                  isSelected
                    ? "bg-[#2fa885] border-[#b7e4d5] text-[#041f1b] font-bold shadow-[0_0_20px_rgba(52,211,153,0.5)] scale-105"
                    : "bg-[#031714]/85 border-[#34d399]/35 text-[#b7e4d5] hover:border-[#34d399] hover:bg-[#073b32]/90 hover:scale-105"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-[#041f1b]" : "bg-[#34d399] animate-pulse"
                  }`}
                />
                <span>[{tag.code} // {tag.label}]</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Finding Inspection Drawer (Tactile Glass & Pixel Card) */}
      {activeTag && (
        <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md z-30 pointer-events-auto">
          <div className="p-5 rounded-2xl bg-[#031511]/92 border border-[#34d399]/40 backdrop-blur-xl shadow-[0_12px_40px_rgba(2,15,11,0.85)] text-left space-y-3.5 relative overflow-hidden transition-all duration-300">
            {/* Ambient edge glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2fa885] via-[#34d399] to-[#b7e4d5]" />

            <div className="flex items-center justify-between border-b border-[#34d399]/15 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-[#2fa885]/20 text-[#34d399] border border-[#34d399]/30">
                  ● {activeTag.confidence}
                </span>
                <span className="text-[10px] font-mono text-[#8da99e]">
                  ID: {activeTag.code}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTagId(null)}
                className="text-[#8da99e] hover:text-[#f4f2ea] p-1 rounded-md transition-colors"
                aria-label="Close details"
              >
                <X size={14} />
              </button>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8da99e] block mb-1">
                Source Citation: {activeTag.citation}
              </span>
              <p className="text-xs md:text-sm text-[#f4f2ea] font-sans leading-relaxed">
                {activeTag.finding}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#34d399]/15">
              <span className="text-[11px] font-mono text-[#b7e4d5]">
                Domain: {activeTag.category}
              </span>
              <Link
                href={activeTag.serviceHref}
                className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#34d399] hover:text-[#b7e4d5] transition-colors"
              >
                <span>Explore Service</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-3 right-6 hidden md:block text-[10px] font-mono text-[#5a7d71] pointer-events-none">
        INTERACTIVE 3D // CLICK TAGS TO INSPECT CITATIONS
      </div>
    </div>
  );
}
