"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { WorldProvider, useWorldContext } from "./WorldContext";
import { UnifiedWorldEngine } from "./UnifiedWorldEngine";
import { WorldDestinationId, WORLD_DESTINATIONS, ORDERED_DESTINATIONS } from "./WorldConfig";
import { AccessibleGraphFallback } from "../visuals/AccessibleGraphFallback";
import { EntityDetailsPanel } from "../visuals/EntityDetailsPanel";
import { ILLUSTRATIVE_GRAPH_NODES, EntityCategory } from "@/data/entityGraphData";

function SharedWorldCanvasInner({ children }: { children: React.ReactNode }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const {
    activeDestination,
    setActiveDestination,
    selectedNode,
    setSelectedNode,
    selectedService,
    setSelectedService,
    methodologyStage,
    setMethodologyStage,
    aboutStage,
    setAboutStage,
    engine,
    setEngine,
    isReducedMotion,
  } = useWorldContext();

  const [hasWebGL, setHasWebGL] = useState(true);
  const [fallbackCategoryFilter, setFallbackCategoryFilter] = useState<EntityCategory | "ALL">("ALL");

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Initialize Unified 3D World Engine ONCE at the root layout
  useEffect(() => {
    if (!hasWebGL || !mountRef.current || engine) return;

    const mount = mountRef.current;
    const worldEngine = new UnifiedWorldEngine(
      mount,
      {
        onDestinationChange: (dest) => setActiveDestination(dest),
        onNodeSelect: (node) => {
          setSelectedNode(node);
          if (node) {
            setSelectedService(null);
            setMethodologyStage(null);
            setAboutStage(null);
          }
        },
        onServiceSelect: (service) => {
          setSelectedService(service);
          if (service) {
            setSelectedNode(null);
            setMethodologyStage(null);
            setAboutStage(null);
          }
        },
        onMethodologyStageSelect: (stage) => {
          setMethodologyStage(stage);
          if (stage !== null) {
            setSelectedNode(null);
            setSelectedService(null);
            setAboutStage(null);
          }
        },
        onAboutStageSelect: (stage) => {
          setAboutStage(stage);
          if (stage !== null) {
            setSelectedNode(null);
            setSelectedService(null);
            setMethodologyStage(null);
          }
        },
      },
      isReducedMotion
    );

    setEngine(worldEngine);

    const handleResize = () => {
      if (!mount || !worldEngine) return;
      worldEngine.handleResize(mount.clientWidth, mount.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    return () => {
      resizeObserver.disconnect();
      worldEngine.dispose();
      setEngine(null);
    };
  }, [hasWebGL, isReducedMotion, setEngine]);

  // Home Scroll Spy: Only active when on the homepage ("/")
  useEffect(() => {
    if (pathname !== "/" || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = ORDERED_DESTINATIONS.find(
              (d) => WORLD_DESTINATIONS[d].sectionId === id
            );
            if (match && match !== activeDestination) {
              setActiveDestination(match);
              // Clear destination-specific inspectors on scroll
              setSelectedNode(null);
              setSelectedService(null);

              if (engine) {
                engine.setDestination(match);
              }
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    ORDERED_DESTINATIONS.forEach((destId) => {
      const el = document.getElementById(WORLD_DESTINATIONS[destId].sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname, activeDestination, engine, setActiveDestination, setSelectedNode, setSelectedService]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Persistent Fullscreen 3D WebGL World Canvas */}
      {hasWebGL ? (
        <div
          ref={mountRef}
          className="fixed inset-0 w-full h-full z-0 select-none cursor-grab active:cursor-grabbing pointer-events-auto"
          role="region"
          aria-label="Agletras Unified 3D Living Intelligence World"
        />
      ) : (
        <div className="fixed inset-0 w-full h-full z-0 bg-[#041F1B]">
          <AccessibleGraphFallback
            selectedNodeId={selectedNode?.id || null}
            onSelectNode={(nodeId) => {
              const found = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === nodeId) || null;
              setSelectedNode(found);
            }}
            activeCategoryFilter={fallbackCategoryFilter}
            onSelectCategoryFilter={setFallbackCategoryFilter}
          />
        </div>
      )}

      {/* Page Content Layers (Rendered above the shared 3D canvas) */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export function SharedWorldLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorldProvider>
      <SharedWorldCanvasInner>{children}</SharedWorldCanvasInner>
    </WorldProvider>
  );
}
