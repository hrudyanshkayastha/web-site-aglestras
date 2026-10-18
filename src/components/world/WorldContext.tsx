"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { WorldDestinationId, WORLD_DESTINATIONS, ORDERED_DESTINATIONS } from "./WorldConfig";
import { ServiceItem, servicesData } from "@/data/services";
import { GraphNode, ILLUSTRATIVE_GRAPH_NODES } from "@/data/entityGraphData";
import { UnifiedWorldEngine } from "./UnifiedWorldEngine";

interface WorldContextType {
  activeDestination: WorldDestinationId;
  setActiveDestination: (dest: WorldDestinationId) => void;
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem | null) => void;
  selectedNode: GraphNode | null;
  setSelectedNode: (node: GraphNode | null) => void;
  methodologyStage: number | null;
  setMethodologyStage: (stage: number | null) => void;
  aboutStage: number | null;
  setAboutStage: (stage: number | null) => void;
  operationalStage: "investigate" | "verify" | "operationalize" | null;
  setOperationalStage: (stage: "investigate" | "verify" | "operationalize" | null) => void;
  focusOperationalStage: (stage: "investigate" | "verify" | "operationalize" | null) => void;
  focusService: (service: ServiceItem | null) => void;
  focusMethodologyStage: (stage: number | null) => void;
  focusAboutStage: (stage: number | null) => void;
  focusNode: (node: GraphNode | null) => void;
  resetToOverview: () => void;
  engine: UnifiedWorldEngine | null;
  setEngine: (engine: UnifiedWorldEngine | null) => void;
  isReducedMotion: boolean;
}

const WorldContext = createContext<WorldContextType | null>(null);

export function WorldProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [engine, setEngine] = useState<UnifiedWorldEngine | null>(null);
  const [activeDestination, setActiveDestination] = useState<WorldDestinationId>("ENTRANCE");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [methodologyStage, setMethodologyStage] = useState<number | null>(null);
  const [aboutStage, setAboutStage] = useState<number | null>(null);
  const [operationalStage, setOperationalStage] = useState<"investigate" | "verify" | "operationalize" | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  // Clear sub-inspector selections whenever route changes
  useEffect(() => {
    setSelectedService(null);
    setSelectedNode(null);
    setMethodologyStage(null);
    setAboutStage(null);

    if (!engine) return;

    // Route-specific camera waypoint choreography
    if (pathname === "/") {
      // Let home scroll spy handle destination, default to entrance
      engine.setDestination("ENTRANCE");
      setActiveDestination("ENTRANCE");
    } else if (pathname === "/services") {
      engine.setDestination("SERVICES");
      setActiveDestination("SERVICES");
    } else if (pathname.startsWith("/services/")) {
      const slug = pathname.replace("/services/", "");
      const foundService = servicesData.find((s) => s.id === slug) || null;
      if (foundService) {
        engine.focusService(foundService);
      } else {
        engine.setDestination("SERVICES");
      }
      setActiveDestination("SERVICES");
    } else if (pathname === "/methodology") {
      engine.setDestination("METHODOLOGY");
      setActiveDestination("METHODOLOGY");
    } else if (pathname === "/research") {
      engine.setDestination("ATLAS");
      setActiveDestination("ATLAS");
    } else if (pathname === "/about") {
      // Intelligence Philosophy Sanctum perspective
      engine.setDestination("ABOUT");
      setActiveDestination("ABOUT");
    } else if (pathname === "/contact") {
      // Grand elevated sanctuary terminus
      engine.setDestination("CONTACT");
      setActiveDestination("CONTACT");
    } else if (pathname === "/terms") {
      engine.setDestination("ENTRANCE");
      setActiveDestination("ENTRANCE");
    }
  }, [pathname, engine]);

  const focusService = useCallback(
    (service: ServiceItem | null) => {
      setSelectedService(service);
      if (service) {
        setSelectedNode(null);
        if (engine) engine.focusService(service);
      } else {
        if (engine) engine.resetToOverview();
      }
    },
    [engine]
  );

  const focusMethodologyStage = useCallback(
    (stage: number | null) => {
      setMethodologyStage(stage);
      if (stage !== null) {
        setSelectedService(null);
        setSelectedNode(null);
        if (engine) engine.focusMethodologyStage(stage);
      } else {
        if (engine) engine.focusMethodologyStage(null);
      }
    },
    [engine]
  );

  const focusAboutStage = useCallback(
    (stage: number | null) => {
      setAboutStage(stage);
      if (stage !== null) {
        setSelectedService(null);
        setSelectedNode(null);
        setMethodologyStage(null);
        if (engine) engine.focusAboutStage(stage);
      } else {
        if (engine) engine.focusAboutStage(null);
      }
    },
    [engine]
  );

  const focusNode = useCallback(
    (node: GraphNode | null) => {
      setSelectedNode(node);
      if (node) {
        setSelectedService(null);
        setMethodologyStage(null);
        setAboutStage(null);
        if (engine) engine.focusNode(node);
      } else {
        if (engine) engine.resetToOverview();
      }
    },
    [engine]
  );

  const focusOperationalStage = useCallback(
    (stage: "investigate" | "verify" | "operationalize" | null) => {
      setOperationalStage(stage);
      if (engine) engine.focusOperationalStage(stage);
    },
    [engine]
  );

  const resetToOverview = useCallback(() => {
    setSelectedService(null);
    setSelectedNode(null);
    setMethodologyStage(null);
    setAboutStage(null);
    setOperationalStage(null);
    if (engine) engine.resetToOverview();
  }, [engine]);

  return (
    <WorldContext.Provider
      value={{
        activeDestination,
        setActiveDestination,
        selectedService,
        setSelectedService,
        selectedNode,
        setSelectedNode,
        methodologyStage,
        setMethodologyStage,
        aboutStage,
        setAboutStage,
        operationalStage,
        setOperationalStage,
        focusOperationalStage,
        focusService,
        focusMethodologyStage,
        focusAboutStage,
        focusNode,
        resetToOverview,
        engine,
        setEngine,
        isReducedMotion,
      }}
    >
      {children}
    </WorldContext.Provider>
  );
}

export function useWorldContext() {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error("useWorldContext must be used within a WorldProvider");
  }
  return context;
}
