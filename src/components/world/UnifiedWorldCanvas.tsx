"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { UnifiedWorldEngine } from "./UnifiedWorldEngine";
import { WorldDestinationId, WORLD_DESTINATIONS, ORDERED_DESTINATIONS } from "./WorldConfig";
import { WorldNavigatorHUD } from "./WorldNavigatorHUD";
import { EntityDetailsPanel } from "../visuals/EntityDetailsPanel";
import { AccessibleGraphFallback } from "../visuals/AccessibleGraphFallback";
import { GraphNode, EntityCategory, ILLUSTRATIVE_GRAPH_NODES } from "@/data/entityGraphData";
import { ServiceItem } from "@/data/services";

interface UnifiedWorldCanvasProps {
  children?: React.ReactNode;
}

export function UnifiedWorldCanvas({ children }: UnifiedWorldCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<UnifiedWorldEngine | null>(null);

  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [activeDestination, setActiveDestination] = useState<WorldDestinationId>("ENTRANCE");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [fallbackCategoryFilter, setFallbackCategoryFilter] = useState<EntityCategory | "ALL">("ALL");

  // Check WebGL and Reduced Motion
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

  // Initialize Unified World Engine
  useEffect(() => {
    if (!hasWebGL || !mountRef.current) return;

    const mount = mountRef.current;
    const engine = new UnifiedWorldEngine(
      mount,
      {
        onDestinationChange: (dest) => setActiveDestination(dest),
        onNodeSelect: (node) => {
          setSelectedNode(node);
          if (node) setSelectedService(null);
        },
        onServiceSelect: (service) => {
          setSelectedService(service);
          if (service) setSelectedNode(null);
        },
      },
      isReducedMotion
    );
    engineRef.current = engine;

    // Resize Observer
    const handleResize = () => {
      if (!mount || !engineRef.current) return;
      engineRef.current.handleResize(mount.clientWidth, mount.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    return () => {
      resizeObserver.disconnect();
      engine.dispose();
      engineRef.current = null;
    };
  }, [hasWebGL, isReducedMotion]);

  // Destination Selection Handler (Scrolls smoothly to section and updates 3D camera)
  const handleSelectDestination = useCallback((destId: WorldDestinationId) => {
    setActiveDestination(destId);
    setSelectedNode(null);
    setSelectedService(null);

    if (engineRef.current) {
      engineRef.current.setDestination(destId);
    }

    const wp = WORLD_DESTINATIONS[destId];
    const elem = document.getElementById(wp.sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Reset Selection
  const handleResetSelection = useCallback(() => {
    setSelectedNode(null);
    setSelectedService(null);
    if (engineRef.current) {
      engineRef.current.resetToOverview();
    }
  }, []);

  // Node Selection Handler
  const handleSelectNode = useCallback((node: GraphNode | null) => {
    setSelectedNode(node);
    if (node) setSelectedService(null);
    if (engineRef.current) {
      if (node) engineRef.current.focusNode(node);
      else engineRef.current.resetToOverview();
    }
  }, []);

  // Service Selection Handler
  const handleSelectService = useCallback((service: ServiceItem | null) => {
    setSelectedService(service);
    if (service) setSelectedNode(null);
    if (engineRef.current) {
      if (service) engineRef.current.focusService(service);
      else engineRef.current.resetToOverview();
    }
  }, []);

  // Scroll Spy to track current section
  useEffect(() => {
    if (typeof window === "undefined") return;

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
              if (engineRef.current) {
                engineRef.current.setDestination(match);
              }
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    ORDERED_DESTINATIONS.forEach((destId) => {
      const el = document.getElementById(WORLD_DESTINATIONS[destId].sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeDestination]);

  if (!hasWebGL) {
    return (
      <div className="w-full min-h-screen bg-[#041F1B] py-20 px-6">
        <AccessibleGraphFallback
          selectedNodeId={selectedNode?.id || null}
          onSelectNode={(nodeId) => {
            const found = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === nodeId) || null;
            handleSelectNode(found);
          }}
          activeCategoryFilter={fallbackCategoryFilter}
          onSelectCategoryFilter={setFallbackCategoryFilter}
        />
        {children}
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#041F1B]">
      {/* Persistent Fullscreen 3D WebGL World Canvas */}
      <div
        ref={mountRef}
        className="fixed inset-0 w-full h-full z-0 select-none cursor-grab active:cursor-grabbing pointer-events-auto"
        role="region"
        aria-label="Agletras Unified 3D Living Intelligence World"
      />

      {/* Floating HUD Destination Waypoint Controller */}
      <WorldNavigatorHUD
        activeDestination={activeDestination}
        hasActiveSelection={Boolean(selectedNode || selectedService)}
        onSelectDestination={handleSelectDestination}
        onResetSelection={handleResetSelection}
      />

      {/* Slide-in Entity Details Inspector Panel */}
      {selectedNode && (
        <aside
          aria-label="Entity Inspection Dossier"
          className="fixed top-20 right-4 sm:right-8 bottom-24 z-50 w-[calc(100%-2rem)] sm:w-96 max-w-sm flex items-start overflow-y-auto pointer-events-auto shadow-2xl"
        >
          <EntityDetailsPanel
            node={selectedNode}
            onClose={() => handleSelectNode(null)}
            onSelectNode={(nodeId) => {
              const found = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === nodeId) || null;
              handleSelectNode(found);
            }}
          />
        </aside>
      )}

      {/* Foreground Content Destination Overlays (Rendered above the 3D world canvas) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
