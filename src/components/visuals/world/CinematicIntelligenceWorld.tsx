"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  GraphNode,
  EntityCategory,
  ILLUSTRATIVE_GRAPH_NODES,
} from "@/data/entityGraphData";
import { WorldVantage } from "./WorldTypes";
import { createIntelligenceObservatory } from "./IntelligenceObservatory";
import { createLivingTreeEnvironment } from "./LivingTreeEnvironment";
import { createIntelligenceAtlas } from "./IntelligenceAtlas";
import { createSpatialPathways } from "./SpatialPathways";
import { WorldInteractionController } from "./WorldInteractionController";
import { WorldVantageControls } from "./WorldVantageControls";
import { AccessibleWorldNavigation } from "./AccessibleWorldNavigation";
import { EntityDetailsPanel } from "../EntityDetailsPanel";
import { AccessibleGraphFallback } from "../AccessibleGraphFallback";
import { Shield } from "lucide-react";

interface CinematicIntelligenceWorldProps {
  className?: string;
  onNodeSelect?: (node: GraphNode | null) => void;
}

export function CinematicIntelligenceWorld({
  className = "",
  onNodeSelect,
}: CinematicIntelligenceWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [activeVantage, setActiveVantage] = useState<WorldVantage>("OVERVIEW");
  const [categoryFilter, setCategoryFilter] = useState<EntityCategory | "ALL">("ALL");
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // References for Three.js engine and subsystems
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controllerRef = useRef<WorldInteractionController | null>(null);
  const atlasRef = useRef<ReturnType<typeof createIntelligenceAtlas> | null>(null);
  const pathwaysRef = useRef<ReturnType<typeof createSpatialPathways> | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const isIntersectingRef = useRef<boolean>(true);

  // Handle node selection from 3D or HTML list
  const handleSelectNode = useCallback(
    (node: GraphNode | null) => {
      setSelectedNode(node);
      if (onNodeSelect) onNodeSelect(node);

      if (atlasRef.current) {
        atlasRef.current.setSelected(node?.id || null);
      }
      if (pathwaysRef.current) {
        pathwaysRef.current.setHighlightedEntity(node?.id || null);
      }
      if (controllerRef.current) {
        if (node) {
          controllerRef.current.focusNode(node);
        } else {
          controllerRef.current.clearSelection();
        }
      }
    },
    [onNodeSelect]
  );

  // Handle switching vantages
  const handleSelectVantage = useCallback((vantage: WorldVantage) => {
    setActiveVantage(vantage);
    setSelectedNode(null);
    if (atlasRef.current) atlasRef.current.setSelected(null);
    if (pathwaysRef.current) pathwaysRef.current.setHighlightedEntity(null);
    if (controllerRef.current) controllerRef.current.setVantage(vantage);
  }, []);

  // Reset overview
  const handleResetOverview = useCallback(() => {
    handleSelectNode(null);
    handleSelectVantage("OVERVIEW");
  }, [handleSelectNode, handleSelectVantage]);

  // Check WebGL availability and motion preference on mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    return () => motionQuery.removeEventListener("change", motionHandler);
  }, []);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!hasWebGL || !mountRef.current) return;

    const mount = mountRef.current;
    const width = mount.clientWidth || 900;
    const height = mount.clientHeight || 640;

    // 1. Scene with Deep Pine Atmospheric Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x041f1b, 0.045);
    sceneRef.current = scene;

    // 2. Camera with 42 degree FOV for cinematic architectural depth
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High Dynamic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    // 4. Lighting Composition
    // Ambient deep forest base fill
    const ambientLight = new THREE.AmbientLight(0x0a2b24, 1.4);
    scene.add(ambientLight);

    // Key warm directional light (simulating high observatory aperture)
    const keyLight = new THREE.DirectionalLight(0xf4f2ea, 2.2);
    keyLight.position.set(5, 9, 4);
    scene.add(keyLight);

    // Secondary cool mint rim light
    const rimLight = new THREE.DirectionalLight(0x2fa885, 1.6);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // 5. Instantiate Environments & Atlas Subsystems
    const observatory = createIntelligenceObservatory();
    scene.add(observatory.group);

    const livingTree = createLivingTreeEnvironment();
    scene.add(livingTree.group);

    const atlas = createIntelligenceAtlas();
    scene.add(atlas.group);
    atlasRef.current = atlas;

    const pathways = createSpatialPathways();
    scene.add(pathways.group);
    pathwaysRef.current = pathways;

    // 6. Interaction Controller
    const controller = new WorldInteractionController(camera, renderer.domElement, {
      onNodeHover: (node) => {
        setHoveredNode(node);
        atlas.setHovered(node?.id || null);
        if (!selectedNode) {
          pathways.setHighlightedEntity(node?.id || null);
        }
      },
      onNodeSelect: (node) => {
        setSelectedNode(node);
        if (onNodeSelect) onNodeSelect(node);
        atlas.setSelected(node?.id || null);
        pathways.setHighlightedEntity(node?.id || null);
      },
      onVantageChange: (v) => {
        setActiveVantage(v);
      },
    });
    controller.isReducedMotion = isReducedMotion;
    controllerRef.current = controller;

    // 7. Pause render loop when scrolled offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersectingRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // 9. Animation Frame Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isIntersectingRef.current) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Update subsystems
      observatory.update(delta, elapsed);
      livingTree.update(delta, elapsed);
      atlas.update(delta, elapsed, camera);
      pathways.update(delta, elapsed);
      controller.update(delta);
      controller.checkHoverIntersection(scene);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      resizeObserver.disconnect();
      observer.disconnect();

      controller.dispose();
      observatory.dispose();
      livingTree.dispose();
      atlas.dispose();
      pathways.dispose();

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mount.contains(rendererRef.current.domElement)) {
          mount.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [hasWebGL, isReducedMotion, onNodeSelect, selectedNode]);

  if (!hasWebGL) {
    return (
      <div className={`w-full ${className}`}>
        <AccessibleGraphFallback
          selectedNodeId={selectedNode?.id || null}
          onSelectNode={(nodeId) => {
            const found = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === nodeId) || null;
            handleSelectNode(found);
          }}
          activeCategoryFilter={categoryFilter}
          onSelectCategoryFilter={setCategoryFilter}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-[#041F1B] border border-[#B7E4D5]/15 shadow-2xl ${className}`}
    >
      {/* Top HUD Controls: Vantage switcher and reset overview */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
        <WorldVantageControls
          activeVantage={activeVantage}
          selectedNodeId={selectedNode?.id || null}
          onSelectVantage={handleSelectVantage}
          onResetView={handleResetOverview}
        />
      </div>

      {/* Main 3D WebGL Canvas Mount Container with Seamless Radial Masking */}
      <div
        ref={mountRef}
        className="w-full h-[580px] sm:h-[660px] lg:h-[740px] select-none cursor-grab active:cursor-grabbing"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
        }}
        role="region"
        aria-label="Agletras 3D Living Intelligence World & Observatory Canvas"
      />

      {/* Floating Hover Tooltip */}
      {hoveredNode && !selectedNode && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-3.5 py-1.5 rounded-xl bg-[#031714]/95 border border-[#B7E4D5]/30 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: hoveredNode.color }}
            />
            <span className="font-semibold text-[#F4F2EA]">{hoveredNode.name}</span>
            <span className="text-[#718E84]">|</span>
            <span className="text-[#B7E4D5]">{hoveredNode.categoryLabel}</span>
          </div>
        </div>
      )}

      {/* Slide-in Entity Details Inspector Panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bottom-4 z-40 max-w-sm flex items-start overflow-y-auto">
          <EntityDetailsPanel
            node={selectedNode}
            onClose={() => handleSelectNode(null)}
            onSelectNode={(nodeId) => {
              const found = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === nodeId) || null;
              handleSelectNode(found);
            }}
          />
        </div>
      )}

      {/* Bottom Status, Methodology Disclaimer, and Accessible Navigation */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#718E84]">
          <div className="flex items-center gap-1.5 bg-[#031714]/85 px-2.5 py-1 rounded-full border border-[#B7E4D5]/15 backdrop-blur-sm pointer-events-auto">
            <Shield size={11} className="text-[#2FA885]" />
            <span>Project Atlas — Demonstration Topology (Fictitious Entities)</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#031714]/85 px-2.5 py-1 rounded-full border border-[#B7E4D5]/15 backdrop-blur-sm pointer-events-auto">
            <span>Drag to Orbit • Click Entity to Inspect</span>
          </div>
        </div>

        {/* Keyboard and Screen Reader Accessible Drawer */}
        <AccessibleWorldNavigation
          selectedNodeId={selectedNode?.id || null}
          onSelectNode={handleSelectNode}
        />
      </div>
    </div>
  );
}
